let loader;
window.addEventListener("load", () => {
    loader = document.getElementById("loader");
});

const showLoader = () => {
    loader.classList.add("show");
    loader.classList.remove("animateHide");
}

const hideLoader = () => {
    loader.classList.add("animateHide");
}