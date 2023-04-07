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
            resetNav();
            window.location.href = "#";
        }
    }
    hideLoader("full-loader");
    router();
});

/**
 * Authentifiziert den Benutzer und prüft somit, ob der token gültig ist
 * 
 * @param {string} token Der Token
 */
async function authenticate(token) {
    let data = new FormData();
    data.append("token", token);

    let response = await fetch("backend/user/authenticate.php", {
        method: "POST",
        body: data
    });

    return response;
}

/**
 * Platziert den Usernamen und das Profile-Bild des aktuellen Benutzers.
 */
function placeUserName() {
    document.getElementById("username-text").innerText = currentUser.name;
    document.getElementById("profile-picture").innerText = currentUser.name.substring(0,1).toUpperCase();
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

/**
 * Registriert einen neuen Benutzer
 * 
 * @param {string} username Benutzername
 * @param {string} email E-Mail-Adresse
 * @param {string} password Passwort
 * @returns Response
 */
async function register(username, email, password) {
    let data = new FormData();
    data.append("username", username);
    data.append("email", email);
    data.append("password", password);

    let response = await fetch("backend/user/register.php", {
        method: "POST",
        body: data
    });
    
    return response;
}

/**
 * Loggt den Benutzer ein.
 * 
 * @param {string} email Die E-Mail-Adresse des Benutzers 
 * @param {string} password Das Passwort des Benutzers
 * @returns Response
 */
async function login(email, password) {
    let data = new FormData();
    data.append("email", email);
    data.append("password", password);

    let response = await fetch("backend/user/login.php", {
        method: "POST",
        body: data
    });

    return response;
}

/**
 * Loggt den Benutzer aus.
 */
async function logout() {
    let data = new FormData();
    data.append("token", currentUser.token);

    let response = await fetch("backend/user/logout.php", {
        method: "POST",
        body: data
    });

    return response;
}

/**
 * Löscht den Benutzeraccount des aktuellen angemeldeten Benutzers
 */
async function deleteUserAccount() {
    let data = new FormData();
    data.append("token", currentUser.token);

    let response = await fetch("backend/user/delete.php", {
        method: "POST",
        body: data
    });

    return response;
}