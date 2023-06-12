<?php

require "../API.php";

$API->forceMethod("POST");
$API->auth();
$params = $API->params(["id", "day", "time", "medications"]);

// Hole aktuelles Datum und angesprochenes Planobjekt
$currentTime = date("Y-m-d\TH:i:s");
$plan = $planDAO->get($params["id"]);

// Finde den Index der Tag- und Zeitwerte heraus
$dayIndex = array_search($params["day"], $planDAO->getDays());
$timeIndex = array_search($params["time"], $planDAO->getTimes());

// Neue Medikamente holen
$plan["updated_at"] = $currentTime;
$newMedications = json_decode($params["medications"], true);

// Alte Einträge entfernen
$deletedMedi = array_filter($plan["medications"], function($value) use ($dayIndex, $timeIndex) {
    return $value["day"] <> $dayIndex || $value["time"] <> $timeIndex;
});
$plan["medications"] = $deletedMedi;

// Neue Einträge hinzufügen
for ($i=0; $i < count($newMedications); $i++) {
    $plan["medications"][] = [
        "amount" => $newMedications[$i]["amount"],
        "unit" => $newMedications[$i]["unit"],
        "name" => $newMedications[$i]["name"],
        "day" => $dayIndex,
        "time" => $timeIndex
    ];
}
$plan["medications"] = array_values($plan["medications"]);

// Änderungen abspeichern
$planDAO->update($plan);
$API->print($plan);

?>