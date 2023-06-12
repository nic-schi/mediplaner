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

    /**
     * Gibt alle Fehler aus.
     * 
     * @param $status   Der HTTP-Statuscode
     * @param $die      Ob der PHP-Prozess gestoppt werden soll
     */
    public function printErrors($status=401, $die=true) {
        $this->print($this->errors, $status, $die);
    }

    /**
     * Gibt ein Objekt als JSON-String aus.
     * 
     * @param $objekt   Das Objekt welches ausgegeben werden soll
     * @param $status   Der HTTP-Statuscode
     * @param $die      Ob der PHP-Prozess gestoppt werden soll
     */
    public function print($objekt, $status=200, $die=true) {
        if ($objekt !== null) {
            echo json_encode($objekt);
        }
        http_response_code($status);
        if ($die) {
            die();
        }
    }

    /**
     * Fügt einen Fehler hinzu.
     * 
     * @param $id       Die ID wozu der Fehler gehört
     * @param $message  Die Nachricht des Fehlers
     */
    function addError($id, $message) {
        $this->errors[$id] = new APIError($id, $message);
    }

    /**
     * Gibt zurück ob Fehler bereits hinzugefügt wurden.
     * 
     * @return bool 
     */
    function hasErrors(): bool {
        return count($this->errors)>0;
    }

    /**
     * Forciert die API dazu, nur eine bestimmte Request-Methode anzunehmen.
     * Gültige Methoden sind POST, GET, PUT und DELETE
     * 
     * @param $forcedMethod Die Methode welche forciert werden soll
     */
    function forceMethod($forcedMethod) {
        $method = $_SERVER['REQUEST_METHOD'];
        
        if ($method !== $forcedMethod) {
            $this->addError("method", "Falsche Anfragemethode! ".$forcedMethod." erwartet.");
            $this->printErrors(405);
            return;
        }
    }

    /**
     * Prüft, ob die angegebenen Anfrageparameter vorhanden sind. Ist dies der Fall werden diese zurückgegeben.
     * 
     * @param $requiredParams Die Anfrageparameter welche vorhanden sein sollen
     * 
     * @return array Die Anfrageparameter und deren Werte
     */
    function params($requiredParams) {
        $method = $_SERVER['REQUEST_METHOD'];
        
        // Überprüfe Methode
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
            default:
                $params = $_REQUEST;
                break;
        }

        // Prüfe nach fehlenden Anfrageparametern
        $missing = false;
        foreach ($requiredParams as $item) {
            if (!isset($params[$item])) {
                $this->addError($item.".missing", "Anfrageparameter ".$item." fehlt!");
                $missing = true;
            }
        }

        // Wenn fehlen, dann gebe Fehler aus
        if ($missing) {
            $this->printErrors();
            return;
        }
        
        return $params;
    }

    /**
     * Prüft ob eine gültige Authentifizierung vorhanden ist.
     * Vergleicht den Token aus dem Anfrageheader und der PHP-Session.
     * 
     * @param $die  Gibt an ob der PHP-Prozess gestoppt wird, nachdem die Authentifizierung fehlschlug
     */
    function auth($die=true) {
        $header = getallheaders();
        $token = $header["auth"] ?? null;
        $user = $_SESSION["user"] ?? null;

        // Prüfe nach gültigem Token
        if (
            isset($token) &&
            !empty($token) &&
            isset($user) &&
            !empty($user) &&
            $token === $user["token"]
        ) {
            return;
        }
        
        // Fehlgeschlagen
        session_destroy();
        $this->addError("auth", "Authentifizierung fehlgeschlagen!");
        $this->printErrors(401, $die);
    }

    /**
     * Gibt alle Dateien aus einem Ordner zurück.
     * 
     * @param $folder   Der Pfad zum Ordner
     */
    public function getFiles($folder) {
        return array_values(array_diff(scandir($folder), [".", ".."]));
    }
}

// Setup
session_start();
header('Content-Type: application/json; charset=utf-8');

$API = new API();
global $API;

// Importiere DAO-Objekte
require "PlanDAO.php";
require "UserDAO.php";

?>