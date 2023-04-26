<?php

require "../API.php";

$API->forceMethod("GET");
$API->auth();

$user = $_SESSION["user"];
unset($user->password);
$API->print($user, 200);

?>