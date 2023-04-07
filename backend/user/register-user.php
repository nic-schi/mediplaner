<?php
    require "../error.php";
    header('Content-Type: application/json; charset=utf-8');

    $errors = new APIErrors();

    // Parameter
    $username = $_POST["username"] ?? null;
    $email = $_POST["email"] ?? null;
    $password = $_POST["password"] ?? null;

    // Validierung
    // Felder ausgefüllt
    if ($username == null || empty($username)) {
        $errors->add("username.empty", "Benutzername darf nicht leer sein!");
    }
    if ($email == null || empty($email)) {
        $errors->add("email.empty", "E-Mail-Adresse darf nicht leer sein!");
    }
    if ($password == null || empty($password)) {
        $errors->add("password.empty", "Passwort darf nicht leer sein!");
    }
    
    // E-Mail bereits vorhanden
    $users = array_diff(scandir("../../data/user"), [".", ".."]);

    foreach ($users as $file) {
        $userRaw = file_get_contents("../../data/user/".$file);
        $user = json_decode($userRaw);

        if ($user->email === $email) {
            $errors->add("email.used", "E-Mail-Adresse bereits vorhanden!");
            break;
        }
    }

    if (!$errors->empty()) {
        // Registrieren erfolgreich
        // Höchste User-ID raussuchen    
        $id = max($users);
        $idSplit = explode("-", $id);
        $newUserID = intval($idSplit[1]) + 1;
        $newUserFileName = $idSplit[0]."-".$newUserID.".json";

        file_put_contents("../../data/user/".$newUserFileName, json_encode(((object) [
            "id" => $newUserID,
            "name" => $username,
            "email" => $email,
            "password" => password_hash($password, PASSWORD_DEFAULT),
        ]), JSON_PRETTY_PRINT));
    } else {
        // Gebe fehler aus
        echo json_encode($errors);
    }

?>