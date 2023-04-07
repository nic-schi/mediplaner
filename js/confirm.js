
function addConfirm(confirmWrapperID, onConfirm) {
    let confirmWrapper = document.getElementById(confirmWrapperID);
    if (confirmWrapper) {
        let original = confirmWrapper.querySelector(".original");
        let confirmContainer = confirmWrapper.querySelector(".confirm-container");
        let confirmButton = confirmContainer.querySelector(".confirm");
        let abortButton = confirmContainer.querySelector(".abort");

        original.addEventListener("click", () => {
            original.style.display = "none";
            confirmContainer.style.display = "flex";
        });
        confirmButton.addEventListener("click", () => {
            let call = onConfirm.call(onConfirm);
            if (call) {
                original.style.display = "block";
                confirmContainer.style.display = "none";
            }
        });
        abortButton.addEventListener("click", () => {
            original.style.display = "block";
            confirmContainer.style.display = "none";
        });
    }
}