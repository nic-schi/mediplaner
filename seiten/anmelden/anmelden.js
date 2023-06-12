hideLoader("page-loader");

document.getElementById("anmelden-formular").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Hole Felder
    let data = new FormData(e.target);

    let inputs = e.target.elements;
    let emailFeld = inputs.namedItem("email");
    let passwordFeld = inputs.namedItem("password");

    let email = data.get("email");
    let password = data.get("password");

    // Validierung
    clearFeedback(e.target);
    let error = false;

    // Email leer
    if (email.length <= 0) {
        error = true;
        addFeedback(emailFeld, FeedbackType.INVALID, "E-Mail-Adresse darf nicht leer sein!");
    } else {
        // Email üngültigkeit prüfen anhand von regex-ausdruck
        let emailValid = /\S+@\S+\.\S+/.test(email);
        if (!emailValid) {
            error = true;
            addFeedback(emailFeld, FeedbackType.INVALID, "E-Mail-Adresse üngültig!");
        }   
    }

    // Password leer
    if (password.length <= 0) {
        error = true;
        addFeedback(passwordFeld, FeedbackType.INVALID, "Password darf nicht leer sein!");
    }

    if (!error) {
        // Validierung überlebt
        // Anmeldung prüfen
        let response = await login(email, password);
        let content = await response.json();
            
        // Anmeldung erfolgreich
        if (response.status === 200) {
            setCurrentUser(content);
            redirect("profil");
            addMessage(MessageType.GOOD, "Willkommen zurück!");
        } else {
            // Anmeldung fehlgeschlagen
            addFeedback(e.target, FeedbackType.INVALID, content["login"].message);
        }
    }
});