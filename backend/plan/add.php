<?php

require "../API.php";

$API->forceMethod("POST");
$API->auth();
$params = $API->params(["id", "day", "time", "amount", "unit", "name"]);
$user = $userDAO->getCurrent();

$currentTime = date("Y-m-d\TH:i:s");
$plan = $planDAO->get($params["id"]);

$plan["updated_at"] = $currentTime;
$plan["medications"][] = [
    "amount" => intval($params["amount"]),
    "unit" => $params["unit"],
    "name" => $params["name"],
    "day" => array_search($params["day"], $planDAO->getDays()),
    "time" => array_search($params["time"], $planDAO->getTimes())
];

$planDAO->update($plan);
$API->print($plan);

?>