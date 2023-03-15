<?php
    function isActive(array $urls) {
        $currentURL = $_SERVER["REQUEST_URI"];
        foreach ($urls as $url) {
            if (str_ends_with($currentURL, $url)) {
                echo "active";
                return;
            }
        }
    }
?>

<nav>
    <a class="logo-container" href="index.php">
        <img src="images/favicon/favicon.svg" class="logo" />
        <span class="name">Mediplaner</span>
    </a>
    <div class="items">
        <a href="index.php" class="item <?php isActive(["index.php"]); ?>">
            Startseite
        </a>
        <a href="plan.php" class="item <?php isActive(["plan.php"]); ?>">
            Mein Plan
        </a>
        <a href="impressum.php" class="item <?php isActive(["impressum.php"]); ?>">
            Impressum
        </a>
    </div>
</nav>