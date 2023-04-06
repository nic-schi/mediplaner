const routes = [];

/**
 * Definiert eine Route.
 * 
 * @param {string} path Der Pfad der Route
 * @param {string} folder Der Pfad des Ordners
 * @param {string} title Der Titel der Seite
 */
const route = (path, folder, title) => {
    document.getElementById(path).addEventListener("click", () => activateNavitem(path));
    routes.push({
        "path": path,
        "folder": folder,
        "title": title
    });
}

/**
 * Ändert den Zustand der Navitems und kann mit dem Statusparameter gesteuert werden.
 * - ändert von Versteckt zu Angezeigt.
 * - ändert von Angezeigt zu Versteckt.
 * 
 * @param {string} status hide oder show
 */
const toggleNavItems = (status) => {
    let hamburger = document.getElementById("hamburger");
    let hDisplay = getStyle(hamburger, "display");

    if (hDisplay !== "none") {
        let navItems = [...document.getElementsByClassName("navitems")];
        
        navItems.forEach(element => {
            if (
                status === "hide" || 
                element.classList.contains("responsive")
            ) {
                element.classList.remove("responsive");
            } else {
                element.classList.add("responsive");
            }
        });
    }
}

/**
 * Entfernt die Active-Klassen der Navigationsitems.
 */
const clearNavItems = () => {
    let navItems = [...document.getElementsByClassName("navitems")];
    navItems.forEach(item => {
        [...item.children].forEach(elem => {
            elem.classList.remove("active");
        });
    });
}

/**
 * Aktiviert ein Navigationsitem mit Hilfe des angegebenen Pfades.
 * 
 * @param {string} path Der Pfad der Datei
 */
const activateNavitem = (path) => {
    clearNavItems();
    
    // Setze die Active-Klasse für das Aktive Navitem
    let navItem = document.getElementById(path);
    navItem.classList.add("active");
};

/**
 *  Löscht evtl. vorhandene Skripte und CSS-Dateien die Seitenspezifisch geladen werden
 * 
 * @param {string} type Der Typ der Datei [js, css]
 */
const deletePageFile = (type) => {
    let cssElem = document.getElementById("pageCSS");
    let jsElem = document.getElementById("pageJS");

    if (type === "css" && cssElem) { cssElem.remove(); }
    if (type === "js" && jsElem) { jsElem.remove(); }
}

/**
 * Definiert den JavaScript-Router.
 */
const router = async () => {
    let app = document.getElementById("app");
    let url = ("/" + window.location.hash.slice(1)) || "/";
    let route = routes.find((item) => item.path === url);

    if (route != undefined) {
        showLoader();
        toggleNavItems("hide");
        
        let folder = "seiten/" + route.folder + "/";
        let jsFile = folder + route.folder + ".js";
        let cssFile = folder + route.folder + ".css";

        // Entferne Seitenspezifische Skripte/Styles
        deletePageFile("js");
        deletePageFile("css");

        // Lade CSS-Datei
        await loadCSS(cssFile).then(
            () => console.log(cssFile + " geladen!"),
            () => deletePageFile("css")
        );

        // Lade PHP-Datei der Seite
        let response = await fetch(folder + route.folder + ".php");

        if (response.status === 200) {
            activateNavitem(route.path);

            document.title = route.title + " | Mediplaner";

            let text = await response.text();
            app.innerHTML = text;

            hideLoader();

            // Lade Javascript-Datei
            await loadJS(jsFile).then(
                () => console.log(jsFile + " geladen!"),
                () => deletePageFile("js")
            );
        }
    }
    console.log("Seite " + url + " geladen!");
} 

// Events
window.addEventListener("hashchange", router);
window.addEventListener("load", (event) => {
    // Registriere routen
    route("/", "startseite", "Startseite");
    route("/impressum", "impressum", "Impressum");
    route("/plan", "plan", "Mein Plan");
    route("/kontakt", "kontakt", "Kontakt");
    route("/anmelden", "anmelden", "Anmelden");
    route("/registrieren", "registrieren", "Registrieren");

    document.getElementById("hamburger").addEventListener("click", () => toggleNavItems());
});
window.addEventListener("load", router);

document.addEventListener("click", (event) => {
    let clickedOutside = typeof event.composedPath === 'function' &&  !event.composedPath().includes(document.getElementById("nav"));
    if (clickedOutside) {
        toggleNavItems("hide");
    }
});