// Wenn eingeloggt, dann platziere den Benutzernamen und die Email in die Navbar.
if (isLoggedIn()) {
    let usernameFeld = document.getElementById("username");
    let emailFeld = document.getElementById("email");

    usernameFeld.value = currentUser.name;
    emailFeld.value = currentUser.email;
    
    hideLoader("page-loader");
}

// Füge ein Confirm hinzu, falls der Benutzeraccount gelöscht werden soll.
addConfirm("delete-acc-confirm", async () => {
    let formular = document.getElementById("profil-formular");
    clearFeedback(formular);

    // Lösche Benutzeraccount
    let response = await deleteUserAccount();
    
    if (response.status === 204) {
        // Weiterleiten & abmelden
        removeCurrentUser();
        redirect("");
        addMessage(MessageType.GOOD, "Dein Benutzerkonto wurde erfolgreich gelöscht!");
    } else {
        // Fehlerausgabe
        let error = await response.json();
        addFeedback(formular, FeedbackType.INVALID, error["delete"].message);

        return true;
    }
    return false;
});