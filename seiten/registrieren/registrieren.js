var form = document.getElementById("registrieren-formular");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Hole Felder
    let inputs = e.target.elements;
    let usernameFeld = inputs.namedItem("username");
    let emailFeld = inputs.namedItem("email");
    let passwordFeld = inputs.namedItem("password");
    let passwordRFeld = inputs.namedItem("password-repeat");

    let username = usernameFeld.value;
    let email = emailFeld.value;
    let password = passwordFeld.value;
    let passwordR = passwordRFeld.value;

    // Validierung
    clearFeedback(e.target);
    let error = false;

    // Benutzername leer
    if (username.length <= 0) {
        error = true;
        addFeedback(usernameFeld, FeedbackType.INVALID, "Benutzername darf nicht leer sein!");
    }

    // Email leer
    if (email.length <= 0) {
        error = true;
        addFeedback(emailFeld, FeedbackType.INVALID, "E-Mail-Adresse darf nicht leer sein!");
    } else {
        // Email üngültig anhand von regex-expression
        let emailValid = /\S+@\S+\.\S+/.test(email);
        if (!emailValid) {
            error = true;
            addFeedback(emailFeld, FeedbackType.INVALID, "E-Mail-Adresse üngültig!");
        }   
    }

    // Passwort leer
    if (password.length <= 0) {
        error = true;
        addFeedback(passwordFeld, FeedbackType.INVALID, "Passwort darf nicht leer sein!");
    }

    // Passwort wiederholen stimmt überein
    if (password !== passwordR) {
        error = true;
        addFeedback(passwordRFeld, FeedbackType.INVALID, "Passwörter stimmen nicht überein!")
    }

    if (!error) {
        // Validierung überlebt
        // Registrierung prüfen
        let response = await register(username, email, password);
        let data = await response.json();

        if (response.status === 200) {
            let user = data;
        } else {
            let errors = data.errors;

            if (errors["email.used"]) {
                addFeedback(emailFeld, FeedbackType.INVALID, errors["email.used"].message);
            }
        }
    }
});

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

    let response = await fetch("backend/user/register-user.php", {
        method: "POST",
        body: data
    });
    return response;
}