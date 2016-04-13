<?php
error_reporting(E_ERROR | E_PARSE);
session_start();
$op = $_POST['op'];
if ($op == 'compile') {
    $code = $_POST['code'];
    if(!file_exists("output/".$_SESSION['user'])){
      mkdir("output/".$_SESSION['user']);
    }
    $MainFile = fopen('output/'.$_SESSION['user'].'/Main.java', 'w') or die('Unable to open file!');
    fwrite($MainFile, $code);
    fclose($MainFile);
    $bash_compile = 'lib/ajc -1.8 -d output/'.$_SESSION['user'].' -cp lib/aspectjrt.jar lib/Trace.aj output/'.$_SESSION['user'] .'/Main.java 2>&1';
    $output = shell_exec($bash_compile);
    echo $output;
} elseif ($op == 'run') {
    $input = $_POST['input'];
    $bash_run = 'echo "'.$input.'" | java -cp lib/aspectjrt.jar:output/'.$_SESSION['user'].' Main 2>&1';
    $output = shell_exec($bash_run);
    echo $output;
} elseif ($op == 'gettrace') {
    $trace = fopen('output/'.$_SESSION['user'].'/trace.txt', 'r') or die('Unable to open file!');
    echo fread($trace, filesize('output/'.$_SESSION['user'].'/trace.txt'));
    fclose($trace);
}
