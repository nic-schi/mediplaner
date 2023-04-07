/**
 * Zeigt einen Loader an
 * 
 * @param {string} id 
 */
function showLoader(id) {
    let loader = document.getElementById(id);

    if (loader) {
        loader.classList.add("show");
        loader.classList.remove("animateHide");
    }
}

/**
 * Versteckt den Loader
 * 
 * @param {string} id 
 */
function hideLoader(id) {
    let loader = document.getElementById(id);

    if (loader) {
        loader.classList.add("animateHide");
    }
}