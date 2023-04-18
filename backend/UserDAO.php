<?php 

class UserDAO {

    public function create($email, $username, $password): array {
        $newID = $this->getNewID();
        $currentTime = date("Y-m-d\TH:i:s");

        $user = [
            "id" => $newID,
            "name" => $username,
            "email" => $email,
            "password" => password_hash($password, PASSWORD_DEFAULT),
            "created_at" => $currentTime,
            "updated_at" => $currentTime
        ];
    
        $fileName = "user-".$newID.".json";
        @file_put_contents("../../data/user/".$fileName, json_encode($user, JSON_PRETTY_PRINT));
        
        unset($user["password"]);
        return $user;
    }

    public function emailExists($email): bool {
        return current(array_filter($this->getAll(), function($user) use ($email) {
            return $user["email"] == $email;
        })) !== false;
    }

    public function getNewID() {
        $users = $this->getAll();
        $length = count($users);
        if ($length > 0) {
            return $length + 1;
        }
        return 1;
    }

    public function getCurrent(): array {
        return $_SESSION["user"];
    }

    public function generateToken(): string {
        return bin2hex(openssl_random_pseudo_bytes(64));
    }

    private function getAll(): array {
        $users = $GLOBALS["API"]->getFiles("../../data/user");
        array_walk($users, function(&$value) {
            $value = json_decode(@file_get_contents("../../data/user/".$value), true);
        });
        return $users;
    }

}

$userDAO = new UserDAO();

?>