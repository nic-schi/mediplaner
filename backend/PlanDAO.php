<?php 

/**
 * Repräsentiert ein DAO-Objekt des Plans. 
 * Stellt funktionen zur Speicherung des Planobjektes zur Verfügung.
 */
class PlanDAO {

    /**
     * Gibt ein Planobjekt zurück.
     * 
     * @param $id   Die ID des Planobjektes
     * 
     * @return array der gefundene Plan
     */
    public function get($id): array {
        $plans = $this->getAll();
        $foundPlan = current(array_filter($plans, function($plan) use ($id) {
            return $id == $plan["id"];
        }));
        return $foundPlan;
    }

    /**
     * Erstellt ein neues Planobjekt.
     * 
     * @param $owner    Die User-ID des Besitzers
     * @param $id       Die ID des neuen Objektes. null=Automatisch ermitteln
     * 
     * @return array der Plan welcher erstellt wurde
     */
    public function create($owner, $id=null): array {
        $newId = $id ?? $this->getNewID();
        $currentTime = date("Y-m-d\TH:i:s");
        
        // Baue neues Objekt
        $plan = [
            "id" => $newId,
            "owner" => $owner,
            "updated_at" => $currentTime,
            "created_at" => $currentTime,
            "days" => $this->getDays(),
            "times" => $this->getTimes(),
            "medications" => []
        ];

        // Speicher objekt ab
        $fileName = "plan-".$newId.".json";
        @file_put_contents("../../data/plan/".$fileName, json_encode($plan, JSON_PRETTY_PRINT));

        return $plan;
    }

    /**
     * Aktualisiert ein vorhandenes Planobjekt.
     * 
     * @param $newPlan  Das neue Planobjekt
     * 
     * @return array Das aktualisierte Planobjekt
     */
    public function update($newPlan) {
        $fileName = "plan-".$newPlan["id"].".json";
        @file_put_contents("../../data/plan/".$fileName, json_encode($newPlan, JSON_PRETTY_PRINT));

        return $newPlan;
    }

    /**
     * Generiert eine neue Plan-ID. 
     * Nutzt dazu die Dateinamen aus dem Datenordner.
     * 
     * @return int die neue ID
     */
    public function getNewID() {
        $plans = $this->getAll();
        $length = count($plans);
        if ($length > 0) {
            return $plans + 1;
        }
        return 1;
    }

    /**
     * Gibt alle Planobjekte zurück welche aktuell vorhanden sind.
     * 
     * @return array alle Planobjekte
     */
    private function getAll(): array {
        $plans = $GLOBALS["API"]->getFiles("../../data/plan");

        // Hole content als JSON-Objekt
        array_walk($plans, function(&$value) {
            $value = json_decode(@file_get_contents("../../data/plan/".$value), true);
        });

        return $plans;
    }

    /**
     * Gibt alle Zeiten zurück, welche im Plan vorhanden sein können.
     * 
     * @return array Alle Zeiten
     */
    public function getTimes(): array { 
        return [
            "morning",
            "dinner",
            "evening",
            "night"
        ];
    }

    /**
     * Gibt alle Tage zurück, welche im Plan vorhanden sein können.
     * 
     * @return array Alle Tage
     */
    public function getDays(): array {
        return [
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
            "sunday"
        ];
    }
}

$planDAO = new PlanDAO();

?>