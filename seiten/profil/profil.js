if (isLoggedIn()) {
    let usernameFeld = document.getElementById("username");
    let emailFeld = document.getElementById("email");

    usernameFeld.value = currentUser.name;
    emailFeld.value = currentUser.email;
}

addConfirm("delete-acc-confirm", async () => {
    let formular = document.getElementById("profil-formular");
    clearFeedback(formular);

    let response = await deleteUserAccount();
    
    if (response.status === 204) {
        removeCurrentUser();
        resetNav();
        window.location.href = "#";
    } else {
        let error = await response.json();

        addFeedback(formular, FeedbackType.INVALID, error["delete"].message);

        return true;
    }
    return false;
});