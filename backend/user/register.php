<?php

require "../API.php";

$API->forceMethod("POST");
$params = $API->params(["email", "username", "password"]);

// Validierung
// Felder ausgefüllt
if (empty($params["username"])) {
    $API->addError("username.empty", "Benutzername darf nicht leer sein!");
}
if (empty($params["email"])) {
    $API->addError("email.empty", "E-Mail-Adresse darf nicht leer sein!");
}
if (empty($params["password"])) {
    $API->addError("password.empty", "Passwort darf nicht leer sein!");
}

// E-Mail bereits vorhanden
if ($userDAO->emailExists($params["email"])) {
    $API->addError("email.used", "E-Mail-Adresse bereits vorhanden!");
}

if (!$API->hasErrors()) {
    // User kreieren
    $user = $userDAO->create($params["email"], $params["username"], $params["password"]);
    $plan = $planDAO->create($user["id"], $user["id"]);

    // generiere token
    $user["token"] = $userDAO->generateToken();

    // Speicher Benutzer in der Session
    unset($_SESSION["user"]);
    $_SESSION["user"] = $user;

    // Registrieren erfolgreich
    $API->print($user, 201);
} 

// Gebe fehler aus
$API->printErrors(422);

?>