const MessageType = {
    GOOD: "GOOD",
    BAD: "BAD"
};

/**
 * Fügt eine Nachricht dem Body-Element hinzu.
 * Diese nachricht verschwindet nach der angegeben Zeit, 
 * kann aber auch vorher schon per Klick geschlossen werden.
 * 
 * @param {string} type Der Typ der Nachricht: [GOOD, BAD]
 * @param {string} text Der Text der in der Nachicht enthalten sein soll.
 * @param {integer} time Zeit wie lange die Nachricht halten soll. undefined=unendlich
 */
function addMessage(type, text, time=5000) {
    let messageContainer = document.getElementById("messages");
    let message = document.createElement("div");
    message.classList.add("message");
    message.classList.add(type);

    // Füge Text hinzu
    let textElement = document.createElement("div");
    textElement.classList.add("text");
    textElement.innerHTML = text;
    message.append(textElement);

    // Füge Close hinzu
    let closeElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    closeElement.classList.add("close");
    closeElement.setAttributeNS(null, "fill", "#000000");
    closeElement.setAttributeNS(null, "width", "800px");
    closeElement.setAttributeNS(null, "height", "800px");
    closeElement.setAttributeNS(null, "viewBox", "0 0 24 24");

    let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttributeNS(null, "d", "M16 8L8 16M8 8L16 16");
    path.setAttributeNS(null, "stroke", "currentColor");
    path.setAttributeNS(null, "stroke-width", "2");
    path.setAttributeNS(null, "stroke-linecap", "round");
    closeElement.append(path);
    closeElement.addEventListener("click", () => removeMessage(message));
    message.appendChild(closeElement);

    // Füge Timeout hinzu
    if (time !== null) {
        setTimeout(() => removeMessage(message), time);
    }

    messageContainer.prepend(message);
}

/**
 * Entfernt eine Nachricht aus dem Body-element.
 * Leitet eine Animation ein.
 * 
 * @param {HTMLDivElement} message Das Nachrichtenelement 
 */
function removeMessage(message) {
    message.classList.add("hide");

    // Entferne das Element nach der Animation
    setTimeout(() => {
        message.remove();
    }, 300);
}