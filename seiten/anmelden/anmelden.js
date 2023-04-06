var form = document.getElementById("anmelden-formular");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Hole Felder
    let inputs = e.target.elements;
    let emailFeld = inputs.namedItem("email");
    let passwordFeld = inputs.namedItem("password");

    let email = emailFeld.value;
    let password = passwordFeld.value;

    // Anmeldedaten
    let realEmail = "nichlas@email.de";
    let realPassword = "password";

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
        if (
            password === realPassword &&
            email === realEmail
        ) {
            // Anmeldung erfolgreich
            window.location.hash = '#plan';
        } else {
            // Anmeldung fehlgeschlagen
            addFeedback(e.target, FeedbackType.INVALID, "Anmeldung fehlgeschlagen!");
        }
    }
});