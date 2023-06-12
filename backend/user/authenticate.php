<?php

require "../API.php";

$API->forceMethod("GET");

// Authentifiziert den Aktuellen Benutzer
$API->auth();

// Gebe aktuelles Benutzerobjekt zurück
$user = $userDAO->getCurrent();
unset($user->password);
$API->print($user, 200);

?>