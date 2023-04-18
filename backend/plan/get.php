<?php

require "../API.php";

$API->auth();
$params = $API->params(["id"]);
$user = $userDAO->getCurrent();

// Hole plan
$plan = $planDAO->get($params["id"]);
echo json_encode($plan);


?>