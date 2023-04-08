<?php

require "../API.php";
$API->auth();
$params = $API->params(["id"]);

$user = $_SESSION["user"];

// Suche plan
$plan = @file_get_contents("../../data/plan/plan-".$params["id"].".json");
if ($plan) {
    echo $plan;
} else {
    $API->print(null, 404);
}

?>