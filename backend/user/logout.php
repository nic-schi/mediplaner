<?php

require "../API.php";

$API->forceMethod("POST");
$API->auth();

// Melde benutzer ab
session_destroy();
$API->print(null, 204);

?>