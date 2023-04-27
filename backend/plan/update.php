<?php

require "../API.php";

$API->forceMethod("POST");
$API->auth();
$params = $API->params(["id", "day", "time", "medications"]);

$currentTime = date("Y-m-d\TH:i:s");
$plan = $planDAO->get($params["id"]);

$dayIndex = array_search($params["day"], $planDAO->getDays());
$timeIndex = array_search($params["time"], $planDAO->getTimes());

$plan["updated_at"] = $currentTime;
$newMedications = json_decode($params["medications"], true);

$j = 0;
for ($i=0; $i < count($plan["medications"]); $i++) {
    if (
        $plan["medications"][$i]["day"] == $dayIndex &&
        $plan["medications"][$i]["time"] == $timeIndex
    ) {
        $plan["medications"][$i] = [
            "name" => $newMedications[$j]["name"],
            "unit" => $newMedications[$j]["unit"],
            "amount" => $newMedications[$j]["amount"],
            "time" => $timeIndex,
            "day" => $dayIndex
        ];
        $plan["medications"][$i]["day"] = $dayIndex;
        $plan["medications"][$i]["time"] = $timeIndex;
        $j++;
    }
}

$planDAO->update($plan);
$API->print($plan);

?>