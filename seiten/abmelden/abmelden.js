(async() => {
    let response = await logout();

    if (response.status === 204) {
        removeCurrentUser();
        resetNav();
        addMessage(MessageType.GOOD, "Bis bald!");
    }
    window.location.href = "#";
})();