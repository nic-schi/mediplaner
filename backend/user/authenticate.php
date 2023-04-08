<?php

require "../API.php";

$API->auth();

$user = $_SESSION["user"];
unset($user->password);
$API->print($user, 200);

?>