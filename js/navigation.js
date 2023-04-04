const routes = [];

/**
 * Definiert eine Route.
 * 
 * @param {*} pfad Der Pfad der Route
 * @param {*} datei Der Pfad der Datei
 * @param {*} titel Der Titel der Seite
 */
const route = (pfad, datei, titel) => {
    routes.push({
        "pfad": pfad,
        "datei": datei,
        "titel": titel
    });
}

/**
 * Ändert den Zustand der Navitems und kann mit dem Statusparameter gesteuert werden.
 * - ändert von Versteckt zu Angezeigt.
 * - ändert von Angezeigt zu Versteckt.
 * 
 * @param {*} status hide oder show
 */
const toggleNavItems = (status) => {
    let hamburger = document.getElementById("hamburger");
    let hDisplay = getStyle(hamburger, "display");
    if (
        hDisplay !== "none"
    ) {
        let navItems = document.getElementById("navitems");
                
        if (status === "hide" || navItems.classList.contains("responsive")) {
            navItems.classList.remove("responsive");
        } else {
            navItems.classList.add("responsive");
        }
    }
}

/**
 * Entfernt die Active-Klassen der Navigationsitems.
 */
const clearNavItems = () => {
    const navItems = document.getElementById("navitems");
    [...navItems.children].forEach(item => {
        item.classList.remove("active");
    });
}

/**
 * Aktiviert ein Navigationsitem mit Hilfe des angegebenen Pfades.
 * 
 * @param {*} pfad Der Pfad der Datei
 */
const activateNavitem = (pfad) => {
    clearNavItems();
    
    // Setze die Active-Klasse für das Aktive Navitem
    let navItem = document.getElementById(pfad);
    navItem.classList.add("active");
};

/**
 * Definiert den JavaScript-Router.
 */
const router = async () => {
    let app = document.getElementById("app");
    let url = ("/" + window.location.hash.slice(1)) || "/";
    let route = routes.find((item) => item.pfad === url);

    if (route != undefined) {
        showLoader();

        let response = await fetch("seiten/" + route.datei);
        if (response.status === 200) {
            activateNavitem(route.pfad);

            document.title = route.titel + " | Mediplaner";

            let text = await response.text();
            app.innerHTML = text;

            toggleNavItems("hide");
            hideLoader();
        }
    }
    console.log(url, routes, route)
} 

// Events
window.addEventListener("hashchange", router);
window.addEventListener("load", (event) => {
    route("/", "startseite.php", "Startseite");
    route("/impressum", "impressum.php", "Impressum");
    route("/plan", "plan.php", "Mein Plan");

    document.getElementById("hamburger").addEventListener("click", () => toggleNavItems());
    document.getElementById("/").addEventListener("click", () => activateNavitem("/"));
    document.getElementById("/plan").addEventListener("click", () => activateNavitem("/plan"));
    document.getElementById("/impressum").addEventListener("click", () => activateNavitem("/impressum"));
});
window.addEventListener("load", router);