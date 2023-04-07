<?php

    require "../API.php";

    $API->auth();

    $token = $_POST["token"] ?? null;
    $user = $_SESSION["user"] ?? null;

    if (
        isset($token) &&
        !empty($token) &&
        isset($user) &&
        !empty($user) &&
        $token === $user->token
    ) {
        
        
        unset($user->password);
        $API->print($user, 200);
    }
?>