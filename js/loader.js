/**
 * Zeigt einen Loader an
 * 
 * @param {string} id Die ID des Loaders
 */
function showLoader(id) {
    let loader = document.getElementById(id);

    if (loader) {
        loader.classList.add("show");
        loader.classList.remove("animateHide");
    }
}

/**
 * Versteckt einen Loader
 * 
 * @param {string} id Die ID des Loaders
 */
function hideLoader(id) {
    let loader = document.getElementById(id);

    if (loader) {
        loader.classList.add("animateHide");
    }
}