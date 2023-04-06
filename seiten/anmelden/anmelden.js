var form = document.getElementById("anmelden-formular");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Hole Felder
    let inputs = e.target.elements;
    let emailFeld = inputs.namedItem("email");
    let passwordFeld = inputs.namedItem("password");

    let email = emailFeld.value;
    let password = passwordFeld.value;

    // Validierung
    clearFeedback(e.target);
    let error = false;

    // Email leer
    if (email.length <= 0) {
        addFeedback(emailFeld, FeedbackType.INVALID, "E-Mail-Adresse darf nicht leer sein!");
    } else {
        // Email üngültig anhand von regex-expression
        let emailValid = /\S+@\S+\.\S+/.test(email);
        if (!emailValid) {
            addFeedback(emailFeld, FeedbackType.INVALID, "E-Mail-Adresse üngültig!");
        }   
    }

    // Password leer
    if (password.length <= 0) {
        addFeedback(passwordFeld, FeedbackType.INVALID, "Password darf nicht leer sein!");
    }

    if (!error) {
        // Validierung überlebt
        // Anmeldung prüfen
        if (await login(email, password)) {
            // Anmeldung erfolgreich
            resetNav();
            placeUserName();
            window.location.hash = '#plan';
        } else {
            // Anmeldung fehlgeschlagen
            addFeedback(e.target, FeedbackType.INVALID, "Anmeldung fehlgeschlagen!");
        }
    }
});

/**
 * Loggt den Benutzer ein.
 * 
 * @param {string} email Die E-Mail-Adresse des Benutzers 
 * @param {string} password Das Passwort des Benutzers
 * @returns Eingeloggt?
 */
async function login(email, password) {
    let params = new URLSearchParams();
    params.set("email", email);
    params.set("password", password);

    let response = await fetch("backend/user/login-user.php?" + params.toString(), {
        method: "GET"
    });
    
    if (response.status === 200) {
        let user = await response.json();
        
        setCurrentUser(user);
        placeUserName();

        return true;
    }

    return false;
}