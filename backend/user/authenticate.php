<?php

require "../API.php";

$API->auth();

$token = $_POST["token"];
$user = $_SESSION["user"];

if (
    isset($token) &&
    !empty($token) &&
    $token === $user->token
) {
    unset($user->password);
    $API->print($user, 200);
}

?>