if (isLoggedIn()) {
    let usernameFeld = document.getElementById("username");
    let emailFeld = document.getElementById("email");

    usernameFeld.value = currentUser.name;
    emailFeld.value = currentUser.email;
    
    hideLoader("page-loader");
}

addConfirm("delete-acc-confirm", async () => {
    let formular = document.getElementById("profil-formular");
    clearFeedback(formular);

    let response = await deleteUserAccount();
    
    if (response.status === 204) {
        removeCurrentUser();
        redirect("");
        addMessage(MessageType.GOOD, "Dein Benutzerkonto wurde erfolgreich gelöscht!");
    } else {
        let error = await response.json();

        addFeedback(formular, FeedbackType.INVALID, error["delete"].message);

        return true;
    }
    return false;
});