<?php

    function isActive($url) {
        $currentURL = $_SERVER["SCRIPT_NAME"];
        echo str_ends_with($currentURL, $url) ? "active" : "";
    }

?>

<nav>
    <a class="logo-container" href="/">
        <img src="images/favicon.svg" class="logo" />
        <span class="name">Mediplaner</span>
    </a>
    <div class="items">
        <a href="/" class="item <?php isActive("index.php"); ?>">
            Startseite
        </a>
    </div>
</nav>