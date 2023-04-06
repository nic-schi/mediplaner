<?php
    require "../error.php";
    header('Content-Type: application/json; charset=utf-8');

    $error = new APIError("Anmeldung fehlgeschlagen!", 401);

    // Parameter
    $email = $_GET["email"] ?? null;
    $password = $_GET["password"] ?? null;

    if (isset($email) && isset($password)) {
        $foundUser = null;
        $files = array_diff(scandir("../../data/user"), [".", ".."]);

        foreach ($files as $file) {
            $userRaw = file_get_contents("../../data/user/".$file);
            $user = json_decode($userRaw);

            if (
                $user->email === $email &&
                password_verify($password, $user->password)
            ) {
                $foundUser = $user;
                break;
            }
        }

        if ($foundUser !== null) {
            // print user object
            http_response_code(200);
            echo json_encode($user);
            die();
        }     
    }

    // print error
    echo json_encode($error);

?>