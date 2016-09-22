/*function*/
var MyShuttle = function(link, content, onDone, isGet) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            onDone(xhr.responseText);
        }
    };
    if (isGet) {
        xhr.open("get", link + '?' + content, true);
        xhr.send();
    } else {
        xhr.open("POST", link, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(content);
    }
};
/*tomatch*/
(function() {
    var div_tomatch = document.getElementById("div_tomatch");
    var input_fun = document.getElementById("input_fun");
    var createNext = function(noNext) {
        if (noNext) {
            var tmp = document.createElement("input");
            tmp.setAttribute("list", "datalist_fun");
            div_tomatch.appendChild(tmp);
            tmp.onfocus = function() {
                createNext(this.nextElementSibling == null);
            };
            tmp.onkeypress = function(e) {
                if (e.which == 13) {
                    createNext(this.nextElementSibling == null);
                    this.nextElementSibling.focus();
                }
            }
        }
    };
    input_fun.onfocus = function() {
        createNext(this.nextElementSibling == null);
    };
    input_fun.onkeypress = function(e) {
        if (e.which == 13) {
            createNext(this.nextElementSibling == null);
            this.nextElementSibling.focus();
        }
    }
    div_tomatch.getList = function() {
        var r = [];
        for (var i = 0; i < div_tomatch.children.length; i++) {
            if (div_tomatch.children[i].value != "") {
                r.push(div_tomatch.children[i].value);
            }
        }
        return r;
    };
    div_tomatch.clearAll = function() {
        for (var i = 0; i < div_tomatch.children.length; i++) {
            div_tomatch.children[i].value = "";
        }
    };
})();
/*get element*/
var button_clear_code = document.getElementById("button_clear_code");
var button_clear_input = document.getElementById("button_clear_input");
var button_begin_trace = document.getElementById("button_begin_trace");
var textarea_code = document.getElementById("textarea_code");
var textarea_input = document.getElementById("textarea_input");
var ul_call = document.getElementById("ul_call");
var ul_console = document.getElementById("ul_console");
var button_clearmatch = document.getElementById("button_clearmatch");
var datalist_fun = document.getElementById("datalist_fun");
var button_match = document.getElementById("button_match");
/*set event*/
button_clear_code.onclick = function() {
    textarea_code.value = "";
};
button_clear_input.onclick = function() {
    textarea_input.value = "";
};
button_clearmatch.onclick = function() {
    div_tomatch.clearAll();
};
var simConsole = {
    /*
    c:command
    o:output
    n:newLine
    */
    c: function(text) {
        ul_console.removeChild(ul_console.lastChild);
        var li = document.createElement("li");
        li.innerHTML = "aspectj% " + text;
        ul_console.appendChild(li);
    },
    o: function(text) {
        ul_console.removeChild(ul_console.lastChild);
        var s = text.split("\n");
        for (var i = 0; i < s.length; i++) {
            var li = document.createElement("li");
            li.innerHTML = s[i];
            ul_console.appendChild(li);
        }
    },
    n: function() {
        var li = document.createElement("li");
        li.innerHTML = "aspectj% ";
        ul_console.appendChild(li);
    },
    CMD: {
        "compile": "lib/ajc -1.8 -d output -cp lib/aspectjrt.jar lib/Trace.aj output/Main.java",
        "run": "java -cp lib/aspectjrt.jar:output/ Main"
    }
};
button_begin_trace.onclick = function() {
    ul_console.innerHTML = "";
    ul_call.innerHTML = "";
    datalist_fun.innerHTML = "";
    simConsole.n();
    simConsole.c(simConsole.CMD.compile);
    MyShuttle("deal.php", "op=compile&code=" + encodeURIComponent(textarea_code.value), function(rep1) {
        simConsole.n();
        if (rep1 == "") {
            simConsole.c(simConsole.CMD.run);
            MyShuttle("deal.php", "op=run&input=" + encodeURIComponent(textarea_input.value), function(rep2) {
                simConsole.n();
                simConsole.o(rep2);
                MyShuttle("deal.php", "op=gettrace", function(rep3) {
                    simConsole.n();
                    dealFunSeq(rep3)
                })
            })
        } else {
            simConsole.o(rep1);
            simConsole.n();
        }
    });
};

function dealFunSeq(rep3) {
    var lis = rep3.split("\n");
    var fragli = document.createDocumentFragment();
    var optionArray = [];
    var fragop = document.createDocumentFragment();
    for (var i = 0; i < lis.length - 1; i++) {
        var li = document.createElement("li");
        li.innerHTML = lis[i].trim();
        optionArray.push(lis[i].trim());
        fragli.appendChild(li);
    }
    optionArrayNoDuplicates = optionArray.filter(function(item, pos) {
        return optionArray.indexOf(item) == pos;
    });
    for (var i = 0; i < optionArrayNoDuplicates.length; i++) {
        var option = document.createElement("option");
        option.innerHTML = optionArrayNoDuplicates[i];
        fragop.appendChild(option);
    }
    ul_call.appendChild(fragli);
    datalist_fun.appendChild(fragop);
};

function seqMatch(list) {

    var matched = [];
    for (var k = 0; k < ul_call.children.length; k++) {
        ul_call.children[k].classList.remove("match");
    }
    var i = 0,
        j = 0;
    for (i = 0; i < list.length; i++) {
        if (matched.length > 0) {
            j = matched[matched.length - 1] + 1;
        } else {
            j = 0;
        }
        for (; j < ul_call.children.length; j++) {
            if (list[i] == ul_call.children[j].innerHTML) {
                matched.push(j);
                break;
            }
        }
        if (j == ul_call.children.length) {
            break;
        }
    }
    if (i < list.length || list.length == 0) {
        matched = [];
    }
    return matched;
}
button_match.onclick = function() {
    var list = div_tomatch.getList();
    var matched = seqMatch(list);
    if (matched.length > 0) {
        showToast("指定序列匹配成功");
        for (var k = 0; k < matched.length; k++) {
            ul_call.children[matched[k]].classList.add("match");
        }
    } else {
        showToast("指定序列未能匹配");
    }

};
/*toast*/
var div_toast = document.getElementById("div_toast");
var span_toast = document.getElementById("span_toast");

function showToast(msg) {
    span_toast.innerHTML = msg;
    div_toast.classList.add("show");
    setTimeout(function() {
        span_toast.classList.add("show");
    }, 100);
    setTimeout(function() {
        span_toast.classList.remove("show");
    }, 800);
    setTimeout(function() {
        div_toast.classList.remove("show");
    }, 1200);
}
/*user case*/
var caseList = [{
    "name": "饱了么",
    "file": "baoleme.java"
}, {
    "name": "fun1234",
    "file": "fun1234.java"
}, {
    "name": "求组合数",
    "file": "combine.java"
}];
var button_case = document.getElementsByClassName("button_case");
for (var i = 0; i < button_case.length; i++) {
    button_case[i].innerHTML = "用例[" + caseList[i].name + "]";
    (function(j) {
        button_case[i].onclick = function() {
            MyShuttle("case/" + caseList[j].file, "", function(res) {
                textarea_code.value = res;
            }, true);
            showToast("用例[" + caseList[j].name + "]已加载");
        }
    })(i);
}