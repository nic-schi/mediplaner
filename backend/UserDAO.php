<?php 

/**
 * Repräsentiert ein DAO-Objekt des Users. 
 * Stellt funktionen zur Speicherung des Userobjektes zur Verfügung.
 */
class UserDAO {

    /**
     * Erstellt ein neues Userobjekt.
     * 
     * @param $email    Die Email des Benutzers
     * @param $username Der Username des Benutzers
     * @param $password Das Passwort des Benutzers
     * 
     * @return array das Userobjekt welches erstellt wurde (ohne Passwort)
     */
    public function create($email, $username, $password): array {
        $newID = $this->getNewID();
        $currentTime = date("Y-m-d\TH:i:s");

        // Baue Userobjekt
        $user = [
            "id" => $newID,
            "name" => $username,
            "email" => $email,
            "password" => password_hash($password, PASSWORD_DEFAULT),
            "created_at" => $currentTime,
            "updated_at" => $currentTime
        ];
    
        // Speicher Objekt ab
        $fileName = "user-".$newID.".json";
        @file_put_contents("../../data/user/".$fileName, json_encode($user, JSON_PRETTY_PRINT));
        
        // Gebe Userobjekt ohne password zurück
        unset($user["password"]);
        return $user;
    }

    /**
     * Prüft ob eine Benutzeremail bereits vorhanden ist.
     * 
     * @param $email Die zu prüfunde Email
     * 
     * @return bool
     */
    public function emailExists($email): bool {
        return current(array_filter($this->getAll(), function($user) use ($email) {
            return $user["email"] == $email;
        })) !== false;
    }

    /**
     * Generiert eine neue User-ID. 
     * Nutzt dazu die Dateinamen aus dem Datenordner.
     * 
     * @return int die neue ID
     */
    public function getNewID() {
        $users = $this->getAll();
        $length = count($users);
        if ($length > 0) {
            return $length + 1;
        }
        return 1;
    }

    /**
     * Gibt den aktuellen angemeldeten Benutzer zurück.
     * Nutzt dabei die PHP-Session.
     * 
     * @return array Aktuell angemeldeter Benutzer
     */
    public function getCurrent(): array {
        return $_SESSION["user"];
    }

    /**
     * Generiert einen neuen Authentifizierungstoken für den Benutzer
     * 
     * @return string Authentifizierungstoken
     */
    public function generateToken(): string {
        return bin2hex(openssl_random_pseudo_bytes(64));
    }

    /**
     * Gibt alle Userobjekte zurück welche aktuell vorhanden sind.
     * 
     * @return array alle Userobjekte
     */
    private function getAll(): array {
        $users = $GLOBALS["API"]->getFiles("../../data/user");

        // Hole content als JSON-Objekt
        array_walk($users, function(&$value) {
            $value = json_decode(@file_get_contents("../../data/user/".$value), true);
        });

        return $users;
    }

}

$userDAO = new UserDAO();

?>