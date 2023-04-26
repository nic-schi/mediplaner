<?php 

class PlanDAO {

    public function get($id, $die=true): array {
        $plans = $this->getAll();
        $foundPlan = current(array_filter($plans, function($plan) use ($id) {
            return $id == $plan["id"];
        }));
        return $foundPlan;
    }

    public function create($owner, $id=null): array {
        $newId = $id ?? $this->getNewID();
        $currentTime = date("Y-m-d\TH:i:s");
        $plan = [
            "id" => $newId,
            "owner" => $owner,
            "updated_at" => $currentTime,
            "created_at" => $currentTime,
            "days" => $this->getDays(),
            "times" => $this->getTimes(),
            "medications" => []
        ];
        $fileName = "plan-".$newId.".json";
        @file_put_contents("../../data/plan/".$fileName, json_encode($plan, JSON_PRETTY_PRINT));
        return $plan;
    }

    public function update($newPlan) {
        $fileName = "plan-".$newPlan["id"].".json";
        @file_put_contents("../../data/plan/".$fileName, json_encode($newPlan, JSON_PRETTY_PRINT));
        return $newPlan;
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
        array_walk($plans, function(&$value) {
            $value = json_decode(@file_get_contents("../../data/plan/".$value), true);
        });
        return $plans;
    }

    public function getTimes(): array { 
        return [
            "morning",
            "dinner",
            "evening",
            "night"
        ];
    }

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