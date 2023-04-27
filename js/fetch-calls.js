/**
 * Holt einen Plan vom Backend mit der angegebenen ID
 * 
 * @param {int} id Die ID 
 * @returns Response
 */
async function getPlan(id) {
    let params = new URLSearchParams();
    params.append("id", id);
    
    let response = await fetch("backend/plan/get.php?" + params.toString(), {
        method: "GET",
        headers: getAuthHeader()
    });

    return response;
}

/**
 * Holt einen Plan vom Backend mit der angegebenen ID
 * 
 * @param {int} id Die ID 
 * @param {string} day Der Tag
 * @param {string} time Der Zeitpunkt
 * @param {int} amount Die Menge/Anzahl
 * @param {string} unit Die Einheit
 * @param {string} name Die Bezeichnung
 * @returns Response
 */
async function addMedicamentToPlan(id, day, time, amount, unit, name) {
    let data = new FormData();
    data.append("id", id);
    data.append("day", day);
    data.append("time", time);
    data.append("amount", amount);
    data.append("unit", unit);
    data.append("name", name);
    
    let response = await fetch("backend/plan/add.php", {
        method: "POST",
        body: data,
        headers: getAuthHeader()
    });

    return response;
}

/**
 * Updated die Medikamente eines Eintrages zu dem dazugehörigen Tag und Zeit.
 * 
 * @param {int} id Die ID 
 * @param {string} day Der Tag
 * @param {string} time Der Zeitpunkt
 * @param {array} medications Alle geänderten Medikamentendaten
 * @returns Response
 */
async function updateMedicaments(id, day, time, medications) {
    let data = new FormData();
    data.append("id", id);
    data.append("day", day);
    data.append("time", time);
    data.append("medications", medications);

    let response = await fetch("backend/plan/update.php", {
        method: "POST",
        body: data,
        headers: getAuthHeader()
    });

    return response;
}

/**
 * Authentifiziert den Benutzer und prüft somit, ob der token gültig ist
 */
async function authenticate() {
    let response = await fetch("backend/user/authenticate.php", {
        method: "GET",
        headers: getAuthHeader()
    });

    return response;
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
    let response = await fetch("backend/user/logout.php", {
        method: "POST",
        headers: getAuthHeader()
    });

    return response;
}

/**
 * Löscht den Benutzeraccount des aktuellen angemeldeten Benutzers
 */
async function deleteUserAccount() {
    let response = await fetch("backend/user/delete.php", {
        method: "DELETE",
        headers: getAuthHeader()
    });

    return response;
}