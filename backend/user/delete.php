<?php

require "../API.php";

$API->auth();
$user = $_SESSION["user"];

$filename = "user-".$user->id.".json";
$folder = "../../data/user/";

$deleted = unlink($folder.$filename);

if ($deleted) {
    session_destroy();
    $API->print(null, 204);
}

$API->addError("delete", "Löschen fehlgeschlagen!");
$API->printErrors(400);

?>