const routes = [];
const route = (pfad, datei) => {
    routes.push({
        "pfad": pfad,
        "datei": datei
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

const clearNavItems = () => {
    // Entferne alle Active-Klassen von den Navitems
    const navItems = document.getElementById("navitems");
    [...navItems.children].forEach(item => {
        item.classList.remove("active");
    });
}

const activateNavitem = (pfad) => {
    clearNavItems();
    
    // Setze die Active-Klasse für das Aktive Navitem
    let navItem = document.getElementById(pfad);
    navItem.classList.add("active");
};

const router = async () => {
    let app = document.getElementById("app");
    let url = ("/" + window.location.hash.slice(1)) || "/";
    let route = routes.find((item) => item.pfad === url);

    if (route != undefined) {
        showLoader();

        let response = await fetch("seiten/" + route.datei);
        if (response.status === 200) {
            activateNavitem(route.pfad);

            let text = await response.text();
            app.innerHTML = text;

            toggleNavItems("hide");
            hideLoader();
        }
    }
    console.log(url, routes, route)
} 

window.addEventListener("hashchange", router);

window.addEventListener("load", (event) => {
    route("/", "startseite.php");
    route("/impressum", "impressum.php");
    route("/plan", "plan.php");
});
window.addEventListener("load", router);