<?php

require "../API.php";

$API->forceMethod("GET");
$API->auth();
$params = $API->params(["id"]);
$user = $userDAO->getCurrent();

// Hole plan
$plan = $planDAO->get($params["id"]);
$API->print($plan);


?>