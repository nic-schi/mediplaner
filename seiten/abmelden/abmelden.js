(async() => {
    // Logge benutzer aus
    let response = await logout();

    if (response.status === 204) {
        removeCurrentUser();
        resetNav();
        addMessage(MessageType.GOOD, "Bis bald!");
    }
    redirect("");
})();