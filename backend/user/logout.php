<?php

require "../API.php";

$API->auth();

session_destroy();
$API->print(null, 204);

?>