var currentUser = null;

window.addEventListener("load", () => {
    let user = localStorage.getItem("currentUser");

    if (user != null) {
        let jsonuser = JSON.parse(user);
        currentUser = jsonuser;

        placeUserName();
    }
});

/**
 * Platziert den Usernamen und das Profile-Bild des aktuellen Benutzers.
 */
function placeUserName() {
    document.getElementById("username").innerText = currentUser.name;
    document.getElementById("profile-picture").innerText = currentUser.name.substring(0,1).toUpperCase();
}

/**
 * Setzt das aktuelle Benutzerobjekt
 * 
 * @param {*} user Das Benutzerobjekt 
 */
function setCurrentUser(user) {
    currentUser = user;
    localStorage.setItem("currentUser", user)
}

/**
 * Entfernt das aktuelle Benutzerobjekt
 */
function removeCurrentUser() {
    currentUser = null;
    localStorage.removeItem("currentUser");
}

/**
 * Prüft ob der Client eingeloggt ist.
 * 
 * @returns Eingeloggt? 
 */
function isLoggedIn() {
    return currentUser !== null;
}
