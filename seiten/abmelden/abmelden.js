(async() => {
    let response = await logout();

    if (response.status === 204) {
        removeCurrentUser();
        resetNav();
    }
    window.location.href = "#";
})();