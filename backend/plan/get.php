<?php

require "../API.php";

$API->forceMethod("GET");
$API->auth();
$params = $API->params(["id"]);

// Hole plan & gebe zurück
$plan = $planDAO->get($params["id"]);
$API->print($plan);


?>