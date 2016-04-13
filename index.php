<!DOCTYPE html>
<?php
session_start();
$_SESSION['user'] = $_SESSION['user'] = session_id();
?>
<html>

<head>
  <title>aspectj函数调用匹配</title>
  <meta charset="utf-8" />
  <link type="text/css" rel="stylesheet" href="index.css">
</head>

<body>
  <div id="div_container">
    <div class="div_column" id="div_codeConsole">
      <textarea id="textarea_code" spellcheck="false" placeholder="请将被追踪的java代码粘贴到这儿，注意需要把public class的命名必须为Main。" wrap="hard" cols="20"></textarea>
      <ul id="ul_console">
        <li>aspectj% </li>
      </ul>
    </div>
    <div class="div_column">
      <textarea id="textarea_input" spellcheck="false" placeholder="java代码执行时的输入"></textarea>
      <div class="div_bottons">
        <button id="button_clear_code">清除代码</button>
        <button id="button_clear_input">清除输入</button>
        <button id="button_begin_trace">开始追踪</button>
      </div>
      <datalist id="datalist_fun">
      </datalist>
      <div id="div_tomatch">
        <input id="input_fun" list="datalist_fun" placeholder="输入要匹配的函数序列，每行一个函数" />
      </div>
      <div class="div_bottons">
        <button id="button_clearmatch">清除函数</button>
        <button id="button_match">开始匹配</button>
      </div>
    </div>
    <div class="div_column">
      <span id="call_title">函数调用关系</span>
      <ul id="ul_call">
      </ul>
      <div class="div_bottons">
        <button class="button_case">用例1</button>
        <button class="button_case">用例2</button>
        <button class="button_case">用例3</button>
      </div>
    </div>
  </div>
  <div id="div_about">
    高恒东，任振川，张成，张秋鸿，赵仲印 2016-04-13
  </div>
<div id="div_toast"><span id="span_toast">nihao</span></div>
  <script type="text/javascript" src="index.js"></script>
</body>

</html>
<!-- 表单换行问题 -->
<!--+被吞掉问题-->
