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
        echo json_encode($objekt);
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

    function auth($die=true) {
        $token = $_REQUEST["token"] ?? null;
        $user = $_SESSION["user"] ?? null;

        if (
            isset($token) &&
            !empty($token) &&
            isset($user) &&
            !empty($user) &&
            $token === $user->token
        ) {
            $userFound = false;
            $users = array_diff(scandir("../../data/user"), [".", ".."]);

            foreach ($users as $file) {
                $userRaw = file_get_contents("../../data/user/".$file);
                $searchUser = json_decode($userRaw);

                if (
                    $searchUser->email === $user->email &&
                    $searchUser->name === $user->name &&
                    $searchUser->id === $user->id
                ) {
                    $userFound = true;
                    break;
                }
            }

            if ($userFound) {
                return;
            }
        }
        session_destroy();
        $this->addError("auth", "Authentifizierung fehlgeschlagen!");
        $this->printErrors(401, $die);
    }

}

session_start();
header('Content-Type: application/json; charset=utf-8');
$API = new API();

?>