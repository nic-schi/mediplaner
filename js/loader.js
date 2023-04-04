let loader;
window.addEventListener("load", () => {
    loader = document.getElementById("loader");
});

/**
 * Zeigt den Loader an
 */
const showLoader = () => {
    loader.classList.add("show");
    loader.classList.remove("animateHide");
}

/**
 * Versteckt den Loader
 */
const hideLoader = () => {
    loader.classList.add("animateHide");
}