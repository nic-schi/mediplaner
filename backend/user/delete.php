<?php

require "../API.php";

$API->forceMethod("DELETE");
$API->auth();

// Lösche Benutzerobjekt & Planobjekt des Benutzers
$user = $userDAO->getCurrent();
$deletedU = @unlink("../../data/user/user-".$user["id"].".json");
$deletedP = @unlink("../../data/plan/plan-".$user["id"].".json");

// Wenn gelöscht, dann Zerstöre die PHP-Session
if ($deletedU && $deletedP) {
    session_destroy();
    $API->print(null, 204);
}

// Fehlerausgabe
$API->addError("delete", "Löschen fehlgeschlagen!");
$API->printErrors(400);

?>