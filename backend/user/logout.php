<?php

require "../API.php";

$API->forceMethod("POST");
$API->auth();

session_destroy();
$API->print(null, 204);

?>