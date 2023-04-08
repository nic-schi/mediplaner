<?php

require "../API.php";

// Parameter
$email = $_POST["email"] ?? null;
$password = $_POST["password"] ?? null;

if (
    isset($email) && 
    isset($password) &&
    !empty($email) &&
    !empty($password)
) {
    $foundUser = null;
    $files = $API->getFiles("../../data/user");

    foreach ($files as $file) {
        $userRaw = file_get_contents("../../data/user/".$file);
        $user = json_decode($userRaw, true);

        if (
            $user["email"] === $email &&
            password_verify($password, $user["password"])
        ) {
            $foundUser = $user;
            break;
        }
    }

    if ($foundUser !== null) {
        // generiere token
        $token = bin2hex(openssl_random_pseudo_bytes(64));
        $user["token"] = $token;

        // Speicher Benutzer in der Session
        unset($_SESSION["user"]);
        unset($user["password"]);
        $user = (object) $user;
        $_SESSION["user"] = $user;

        // gebe Benutzerobjekt aus
        $API->print($user);
    }     
}

$API->addError("login", "Anmeldung fehlgeschlagen!");
$API->printErrors(422);

?>