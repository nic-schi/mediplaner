let loader;
window.addEventListener("load", () => {
    loader = document.getElementById("loader");
});

/**
 * Zeigt den Loader an
 */
function showLoader() {
    loader.classList.add("show");
    loader.classList.remove("animateHide");
}

/**
 * Versteckt den Loader
 */
function hideLoader() {
    loader.classList.add("animateHide");
}