<?php

require "../API.php";

// Parameter
$username = $_POST["username"] ?? null;
$email = $_POST["email"] ?? null;
$password = $_POST["password"] ?? null;

// Validierung
// Felder ausgefüllt
if ($username == null || empty($username)) {
    $API->addError("username.empty", "Benutzername darf nicht leer sein!");
}
if ($email == null || empty($email)) {
    $API->addError("email.empty", "E-Mail-Adresse darf nicht leer sein!");
}
if ($password == null || empty($password)) {
    $API->addError("password.empty", "Passwort darf nicht leer sein!");
}

// E-Mail bereits vorhanden
$users = $API->getFiles("../../data/user");

foreach ($users as $file) {
    $userRaw = file_get_contents("../../data/user/".$file);
    $user = json_decode($userRaw);

    if ($user->email === $email) {
        $API->addError("email.used", "E-Mail-Adresse bereits vorhanden!");
        break;
    }
}

if (!$API->hasErrors()) {
    // Registrieren erfolgreich
    // Höchste User-ID raussuchen
    $id = "user-0";
    if (count($users) > 0) {
        $id = max($users);
    } 
    $idSplit = explode("-", $id);
    $newUserID = intval($idSplit[1]) + 1;
    $newUserFileName = $idSplit[0]."-".$newUserID.".json";

    $user = (object) [
        "id" => $newUserID,
        "name" => $username,
        "email" => $email,
        "password" => password_hash($password, PASSWORD_DEFAULT),
    ];

    file_put_contents("../../data/user/".$newUserFileName, json_encode($user, JSON_PRETTY_PRINT));

    // generiere token
    $token = bin2hex(openssl_random_pseudo_bytes(64));
    $user = (array) $user;
    $user["token"] = $token;

    // Speicher Benutzer in der Session
    unset($_SESSION["user"]);
    unset($user["password"]);
    $user = (object) $user;
    $_SESSION["user"] = $user;

    $API->print($user, 201);
} else {
    // Gebe fehler aus
    $API->printErrors(422);
}

?>