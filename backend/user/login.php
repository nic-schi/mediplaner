<?php

require "../API.php";

// Parameter
$params = $API->params(["email", "password"]);

$foundUser = null;
$files = $API->getFiles("../../data/user");

foreach ($files as $file) {
    $userRaw = file_get_contents("../../data/user/".$file);
    $user = json_decode($userRaw, true);

    if (
        $user["email"] === $params["email"] &&
        password_verify($params["password"], $user["password"])
    ) {
        $foundUser = $user;
        break;
    }
}

if ($foundUser !== null) {
    // generiere token
    $user["token"] = $userDAO->generateToken();

    // Speicher Benutzer in der Session
    unset($_SESSION["user"]);
    unset($user["password"]);
    $_SESSION["user"] = $user;

    // gebe Benutzerobjekt aus
    $API->print($user);
}     

$API->addError("login", "Anmeldung fehlgeschlagen!");
$API->printErrors(422);

?>