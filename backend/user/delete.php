<?php

require "../API.php";

$API->forceMethod("DELETE");
$API->auth();

$user = $_SESSION["user"];
$deletedU = @unlink("../../data/user/user-".$user["id"].".json");
$deletedP = @unlink("../../data/plan/plan-".$user["id"].".json");

if ($deletedU && $deletedP) {
    session_destroy();
    $API->print(null, 204);
}

$API->addError("delete", "Löschen fehlgeschlagen!");
$API->printErrors(400);

?>