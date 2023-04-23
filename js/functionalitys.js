
/**
 * Gibt den CSS-Style eines Elementes zurück.
 * 
 * @param {HTMLElement} element Das Element
 * @param {string} name Der Name der CSS-Eigenschaft
 * @returns 
 */
function getStyle(element, name) {
    return element.currentStyle ? element.currentStyle[name] : window.getComputedStyle ? window.getComputedStyle(element, null).getPropertyValue(name) : null;
}

/**
 * Lädt eine Javascript-Datei
 * 
 * @param {string} url Die URL der Datei
 */
function loadJS(url) {
    return new Promise((resolve, reject) => {
        let scriptTag = document.createElement('script');
        scriptTag.src = url;
        scriptTag.type = "text/javascript";
        scriptTag.lang = "javascript";
        scriptTag.id = "pageJS";
    
        scriptTag.onload = (e) => resolve(e);
        scriptTag.onerror = (e) => reject(e);
    
        document.body.appendChild(scriptTag);
    });
};

/**
 * Lädt eine CSS-Datei
 * 
 * @param {string} url 
 * @returns 
 */
function loadCSS(url) {
    return new Promise((resolve, reject) => {
        let link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.id = "pageCSS";
        link.href = url;

        link.onload = (e) => resolve(e);
        link.onerror = (e) => reject(e);
        
        let head = document.querySelector("script");
        head.parentNode.insertBefore(link, head);
    });
}

/**
 * Macht alle Inputfelder innerhalb des Elementes nicht bearbeitbar
 * 
 * @param {HTMLElement} elem Das Element
 */
function lockForm(elem) {
    let children = [...elem.children];
    children.forEach((child) => {
        let type = child.constructor.name;
        if (
            type === "HTMLInputElement" ||
            type === "HTMLTextAreaElement" ||
            type === "HTMLButtonElement"
        ) {
            child.disabled = true;
        } else {
            lockForm(child);
        }
    });
}

/**
 * @returns Alle Tage im Plan
 */
function getDays() {
    return {
        "monday":       "Montag",
        "tuesday":      "Dienstag",
        "wednesday":    "Mittwoch",
        "thursday":     "Donnerstag",
        "friday" :      "Freitag",
        "saturday" :    "Samstag",
        "sunday":       "Sonntag"
    };
}

/**
 * @returns Alle Zeiten im Plan
 */
function getTimes() {
    return {
        "morning":  "Morgens",
        "dinner":   "Mittags",
        "evening":  "Abends",
        "night":    "Nachts"
    };
}

/**
 * @returns Alle Einheiten im Plan
 */
function getUnits() {
    return {
        "μg":           "μg (Mikrogramm)",
        "mg":           "mg (Milligramm)",
        "g":            "g (Gramm)",
        "ml":           "ml (Milliliter)",
        "needle":       "Spritze/n",
        "capsule":      "Kapsel/n",
        "pill":         "Tablette/n",
        "halfpill":     "Halbe Tablette/n",
        "quarterpill":  "Viertel Tablette/n",
        "drop":         "Tropfen",
        "plaster":      "Pflaster",
        "spray":        "Hub",
        "bag":          "Beutel",
        "uvula":        "Zäpfchen",
        "ie":           "IE (Internationale Einheiten)"
    };
}

/**
 * Fügt jedem auf der Website gefundenen Formularelement mit dem Typ "number" zwei Pfeile hinzu, welchen das Input steuern.
 */
function addArrowsToNumberInputs() {
    let inputs = document.querySelectorAll("input[type='number']");
    inputs.forEach((input) => {
        let min = input.getAttribute("min");
        let max = input.getAttribute("max");
        let step = input.getAttribute("step") ?? "1";
        step = parseInt(step);

        let numberArrows = document.createElement("div");
        numberArrows.className = "number-arrows";

        const checkForEmpty = (value, setValue) => {
            if (
                value === "" || 
                value === null || 
                value === undefined ||
                isNaN(value)
            ) {
                return setValue;
            } else {
                return value;
            }
        };

        // Up
        let upElem = document.createElement("div");
        upElem.className = "up";
        upElem.innerHTML = "▲"
        upElem.addEventListener("click", () => {
            let newValue = parseInt(input.value) + (1 * step);
            newValue = checkForEmpty(newValue, min ? parseInt(min) : 0);

            if (max && parseInt(max) < newValue) {
                newValue = max;
            } 
            input.value = newValue;
        });

        // Down
        let downElem = document.createElement("div");
        downElem.className = "down";
        downElem.innerHTML = "▼"
        downElem.addEventListener("click", () => {
            let newValue = parseInt(input.value) - (1 * step);
            newValue = checkForEmpty(newValue, max ? parseInt(max) : 0);

            if (min && parseInt(min) > newValue) {
                newValue = min;
            } 
            input.value = newValue;
        });

        numberArrows.append(upElem);
        numberArrows.append(downElem);

        input.parentNode.append(numberArrows);
    });
}