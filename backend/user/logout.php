<?php

require "../API.php";

$API->auth();
$token = $_POST["token"];

if ($token) {
    session_destroy();
    http_response_code(204);   
    die();
}

?>