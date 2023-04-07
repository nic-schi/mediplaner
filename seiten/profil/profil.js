
if (isLoggedIn()) {
    let usernameFeld = document.getElementById("username");
    let emailFeld = document.getElementById("email");

    usernameFeld.value = currentUser.name;
    emailFeld.value = currentUser.email;
}