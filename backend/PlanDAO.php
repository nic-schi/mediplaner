<?php 

class PlanDAO {

    public function get($id, $die=true): array|null {
        $folder = "../../data/plan";
        $plans = $GLOBALS["API"]->getFiles($folder);
        $foundPlan = array_search("plan-".$id.".json", $plans);

        if (!$foundPlan) {
            $GLOBALS["API"]->addError("plan.not-found", "Plan wurde nicht gefunden!");
            $GLOBALS["API"]->printErrors(404, $die);
        }

        $planPath = $folder."/".$plans[$foundPlan]; 
        return json_decode(@file_get_contents($planPath), true);
    }

    public function create($owner, $id=null): array {
        $newId = $id ?? $this->getNewID();
        $plan = [
            "id" => $newId,
            "owner" => $owner,
            "days" => [
                "monday",
                "tuesday",
                "wednesday",
                "thursday",
                "friday",
                "saturday",
                "sunday"
            ],
            "times" => [
                "morning",
                "dinner",
                "evening",
                "night"
            ],
            "medications" => []
        ];
        $fileName = "plan-".$newId.".json";
        @file_put_contents("../../data/plan/".$fileName, json_encode($plan, JSON_PRETTY_PRINT));
        return $plan;
    }

    public function getNewID() {
        $plans = $this->getAll();
        $length = count($plans);
        if ($length > 0) {
            return $plans + 1;
        }
        return 1;
    }

    private function getAll(): array {
        $plans = $GLOBALS["API"]->getFiles("../../data/plan");
        array_walk($plans, function(&$value, $key) {
            $value = json_decode(@file_get_contents("../../data/plan/".$value), true);
        });
        return $plans;
    }

}

$planDAO = new PlanDAO();

?>