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

    public function printErrors($status=401, $die=true) {
        $this->print($this->errors, $status, $die);
    }

    public function print($objekt, $status=200, $die=true) {
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
        $method = $_SERVER['REQUEST_METHOD'];
        
        switch ($method) {
            case 'GET':
                $params = $_GET;
                break;
            case 'POST':
                $params = $_POST;
                break;
            case 'DELETE':
                $params = $_POST;
                break;
            case 'PUT':
                $params = $_POST;
                break;
            default:
                $params = $_REQUEST;
                break;
        }

        $missing = false;
        foreach ($requiredParams as $item) {
            if (!isset($params[$item])) {
                $this->addError($item.".missing", "Anfrageparameter ".$item." fehlt!");
                $missing = true;
            }
        }

        if ($missing) {
            $this->printErrors();
            return;
        }
        
        return $params;
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
            $token === $user["token"]
        ) {
            return;
        }
        
        session_destroy();
        $this->addError("auth", "Authentifizierung fehlgeschlagen!");
        $this->printErrors(401, $die);
    }

    public function getFiles($folder) {
        return array_values(array_diff(scandir($folder), [".", ".."]));
    }
}

session_start();
header('Content-Type: application/json; charset=utf-8');

$API = new API();
global $API;

require "PlanDAO.php";
require "UserDAO.php";

?>