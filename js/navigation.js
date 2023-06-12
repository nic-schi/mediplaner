var routes = [];

/**
 * Gibt die Parameter aus der URL wieder
 * 
 * @returns {URLSearchParams} Instanz URLSearchParams
 */
function getParams() {
    return new URLSearchParams(window.location.hash.split("?")[1]);
}

/**
 * Prüft ob die Parameter angegeben wurden
 * 
 * @param {object} required Benötigte Parameter
 */
function checkParams(required) {
    let currentParams = getParams();

    if (currentParams !== null) {
        for (const [name, value] of Object.entries(required)) {
            let type = value.constructor.name;

            if (currentParams.has(name)) {
                let paramValue = currentParams.get(name);
                
                // Prüft auf Parameter mit Arraywerten
                if (type === "Array") {
                    if (!value.includes(paramValue.toLocaleLowerCase())) {
                        return false;
                    }   
                }
            } else {
                return false;
            }
        }
        return true;
    }
    return false;
}

/**
 * Definiert eine Route.
 * 
 * @param {string} path Der Pfad der Route
 * @param {string} navitemID Die ID des Navitems
 * @param {string} folder Der Pfad des Ordners
 * @param {string} title Der Titel der Seite
 * @param {boolean} auth Gibt an mit welcher Berechtigung die Seite besucht werden darf. true=Nur Authentifiziert;false=Nur Unauthentifiziert;undefined=Beides
 */
function route(path, navitemID, folder, title, auth) {
    let navitem = document.getElementById(navitemID);
    
    if (navitem && !navitem.classList.contains("noeffects")) {
        navitem.addEventListener("click", () => activateNavitem(navitemID));
    }

    routes.push({
        "path": path,
        "navitem": navitemID,
        "folder": folder,
        "title": title,
        "auth": auth
    });
}

/**
 * Ändert den Zustand der Navitems und kann mit dem Statusparameter gesteuert werden.
 * - ändert von Versteckt zu Angezeigt.
 * - ändert von Angezeigt zu Versteckt.
 * 
 * @param {string} status hide oder show
 */
function toggleNavItems(status) {
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
function clearNavItems() {
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
 * @param {string} navitemID Die ID des Navitems
 */
function activateNavitem(navitemID) {
    clearNavItems();
    
    // Setze die Active-Klasse für das Aktive Navitem
    let navItem = document.getElementById(navitemID);
    if (navItem) {
        navItem.classList.add("active");
    }
};

/**
 *  Löscht evtl. vorhandene Skripte und CSS-Dateien die Seitenspezifisch geladen werden
 * 
 * @param {string} type Der Typ der Datei [js, css]
 */
function deletePageFile(type) {
    let cssElem = document.getElementById("pageCSS");
    let jsElem = document.getElementById("pageJS");

    if (type === "css" && cssElem) { cssElem.remove(); }
    if (type === "js" && jsElem) { jsElem.remove(); }
}

/**
 * Definiert den JavaScript-Router.
 */
async function router() {
    let app = document.getElementById("app");
    let url = (("/" + window.location.hash.slice(1)) || "/").split("?")[0];
    let route = routes.find((item) => item.path === url);

    if (route != undefined) {
        showLoader("page-loader");
        toggleNavItems("hide");

        // Prüfe Authentifizikation
        if (route.auth !== undefined) {
            if (
                (route.auth && !isLoggedIn()) ||
                (!route.auth && isLoggedIn())
            ) {
                redirect("");
                return;
            }
        }
        
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
        let response = await fetch(folder + route.folder + ".php", {
            method: "GET"
        });

        if (response.status === 200) {
            activateNavitem(route.navitem);

            document.title = route.title + " | Mediplaner";

            let text = await response.text();
            app.innerHTML = text;

            // Lade Javascript-Datei
            await loadJS(jsFile).then(
                () => console.log(jsFile + " geladen!"),
                () => deletePageFile("js")
            );
        } else {
            redirect("");
        }
    }
    console.log("Seite \"" + url + "\" geladen!");
}

/**
 * Setzt die Navigation zurück und zeigt alle Items so an, wie es gewollt ist.
 * Nutzt dazu die Authentifizikation.
 */
function resetNav() {
    routes.forEach((route) => {
        navitem = document.getElementById(route.navitem);

        if (navitem && route.auth !== undefined) {
            if (route.auth === isLoggedIn()) {
                navitem.classList.remove("hidden");
            } else {
                navitem.classList.add("hidden");
            }
        }
    });
}

/**
 * Registriert alle Routen die die Seite besitzt.
 * Eine Route repräsentiert eine Webseite in der Website
 */
function registerRoutes() {
    route("/",              "navitem-startseite",       "startseite",       "Startseite");
    route("/impressum",     "navitem-impressum",        "impressum",        "Impressum");
    route("/kontakt",       "navitem-kontakt",          "kontakt",          "Kontakt");
    route("/anmelden",      "navitem-anmelden",         "anmelden",         "Anmelden",                     false);
    route("/registrieren",  "navitem-registrieren",     "registrieren",     "Registrieren",                 false);
    route("/abmelden",      "navitem-abmelden",         "abmelden",         "Wird abgemeldet...",           true);
    route("/profil",        "navitem-profil",           "profil",           "Profil",                       true);

    route("/plan",          "navitem-plan",             "plan",             "Mein Plan",                    true);
    route("/plan-add",      "navitem-plan",             "plan-add",         "Eintrag hinzufügen",           true);
    route("/plan-edit",      "navitem-plan",             "plan-edit",         "Eintrag bearbeiten",           true);
}

/**
 * Löst ein Redirect aus, welcher die Webseite wechselt
 * 
 * @param {string} path 
 * @param {URLSearchParams} params 
 */
function redirect(path, params) {
    let url = `#${path}`;
    if (params && params.toString() != "") {
        url += `?${params.toString()}`;
    }

    resetNav();
    placeUserName();
    window.location.hash = url;
}

// Events
window.addEventListener("hashchange", router);
window.addEventListener("load", () => {
    // Verstecke/Zeige Navigationsitems an
    // -> basiert auf Authentifizikation
    resetNav();

    document.getElementById("hamburger").addEventListener("click", () => toggleNavItems());
});

// Wenn außerhalb vom Nav geklickt wird, dann wird dieser versteckt.
document.addEventListener("click", (event) => {
    let clickedOutside = typeof event.composedPath === 'function' &&  !event.composedPath().includes(document.getElementById("nav"));
    if (clickedOutside) {
        toggleNavItems("hide");
    }
});