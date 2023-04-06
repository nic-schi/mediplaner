
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