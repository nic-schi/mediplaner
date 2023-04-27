var currentUser = null;

window.addEventListener("load", async () => {
    let token = localStorage.getItem("token");
    registerRoutes();

    if (token != null) {
        let response = await authenticate(token);

        if (response.status === 200) {
            // Benutzerobjekt wird in currentUser abgespeichert
            let user = await response.json();
            currentUser = user;

            resetNav();
            placeUserName();
        } else {
            // Benutzer abmelden und token verwerfen
            removeCurrentUser();
            redirect("");
        }
    }
    hideLoader("full-loader");
    router();
});

/**
 * Gibt Header-Informationen mit einer Authentifizierung zurück, welche bei der Fetch-API eingesetzt werden kann
 * 
 * @param {HeadersInit} headers Header, wo die Authentifizierung hinzugefügt werden soll
 * @returns Der Header mit der Authentifizierung
 */
function getAuthHeader(headers) {
    let newHeaders = new Headers(headers);
    let token = localStorage.getItem("token");
    newHeaders.append("auth", token);
    return newHeaders;
}

/**
 * Platziert den Usernamen und das Profile-Bild des aktuellen Benutzers.
 */
function placeUserName() {
    if (isLoggedIn()) {
        document.getElementById("username-text").innerText = currentUser.name;
        document.getElementById("profile-picture").innerText = currentUser.name.substring(0,1).toUpperCase();
    }
}

/**
 * Setzt das aktuelle Benutzerobjekt
 * 
 * @param {*} user Das Benutzerobjekt 
 */
function setCurrentUser(user) {
    currentUser = user;
    localStorage.setItem("token", user.token);
}

/**
 * Entfernt das aktuelle Benutzerobjekt
 */
function removeCurrentUser() {
    currentUser = null;
    localStorage.removeItem("token");
}

/**
 * Prüft ob der Client eingeloggt ist.
 * 
 * @returns Eingeloggt? 
 */
function isLoggedIn() {
    return currentUser !== null;
}