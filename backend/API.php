<?php

/**
 * Stellt einen einzelnen API-Fehler dar.
 * Besitzt immer eine ID, die aussagt, wo der Error zu gehört 
 * und eine Nachricht die den Fehler beschreibt.
 */
class APIError {
    public $id;
    public $message;

    function  __construct($id="", $message=null) {
        $this->id = $id;
        $this->message = $message;
    }
}

/**
 * Stellt eine API-Schnittstelle dar.
 * Kann mehrere fehler beeinhalten.
 */
class API {
    public $errors = [];

    function printErrors($status=401, $die=true) {
        $this->print($this->errors, $status, $die);
    }

    function print($objekt, $status=200, $die=true) {
        if ($objekt !== null) {
            echo json_encode($objekt);
        }
        http_response_code($status);
        if ($die) {
            die();
        }
    }

    function addError($id, $message) {
        $this->errors[$id] = new APIError($id, $message);
    }

    function hasErrors(): bool {
        return count($this->errors)>0;
    }

    function params($requiredParams) {
        foreach ($requiredParams as $item) {
            if (!isset($_POST[$item])) {
                $this->addError("error", "Fehlende Anfrageparameter!");
                $this->printErrors();
                return;
            }
        }
        return $_POST;
    }

    function auth($die=true) {
        $header = getallheaders();
        $token = $header["auth"] ?? null;
        $user = $_SESSION["user"] ?? null;

        if (
            isset($token) &&
            !empty($token) &&
            isset($user) &&
            !empty($user) &&
            $token === $user->token
        ) {
            if ($this->getUser($user->id) !== null) {
                return;
            }
        }
        
        session_destroy();
        $this->addError("auth", "Authentifizierung fehlgeschlagen!");
        $this->printErrors(401, $die);
    }

    function getFiles($folder) {
        return array_diff(scandir($folder), [".", ".."]);
    }

    private function getObject($path, $id) {
        $plans = $this->getFiles($path);

        foreach ($plans as $file) {
            $planRaw = file_get_contents($path."/".$file);
            $plan = json_decode($planRaw);
        
            if ($plan->id === $id) {
                return $plan;
            }
        }
        return null;
    }

    function getUser($id) {
        return $this->getObject("../../data/user", $id);
    }

}

session_start();
header('Content-Type: application/json; charset=utf-8');
$API = new API();

?>