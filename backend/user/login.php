<?php

require "../API.php";

$API->forceMethod("POST");
$params = $API->params(["email", "password"]);

// Hole alle Benutzer
$foundUser = null;
$files = $API->getFiles("../../data/user");

// Prüfe ob das Passwort gültig ist und ob der Benutzer die korrekten Anmeldedaten angegeben hat.
foreach ($files as $file) {
    // Hole benutzerobjekt
    $userRaw = file_get_contents("../../data/user/".$file);
    $user = json_decode($userRaw, true);

    // Prüfen auf Gültigkeit
    if (
        $user["email"] === $params["email"] &&
        password_verify($params["password"], $user["password"])
    ) {
        $foundUser = $user;
        break;
    }
}

if ($foundUser !== null) {
    // Generiere token
    $user["token"] = $userDAO->generateToken();

    // Speicher Benutzer in der Session
    unset($_SESSION["user"]);
    unset($user["password"]);
    $_SESSION["user"] = $user;

    // gebe Benutzerobjekt aus
    $API->print($user);
}     

// Fehlerausgabe
$API->addError("login", "Anmeldung fehlgeschlagen!");
$API->printErrors(422);

?>