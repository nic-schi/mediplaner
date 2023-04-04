
/**
 * Gibt den CSS-Style eines Elementes zurück.
 * 
 * @param {*} element Das Element
 * @param {*} name Der Name der CSS-Eigenschaft
 * @returns 
 */
function getStyle(element, name) {
    return element.currentStyle ? element.currentStyle[name] : window.getComputedStyle ? window.getComputedStyle(element, null).getPropertyValue(name) : null;
}
