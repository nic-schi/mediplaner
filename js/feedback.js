const FeedbackType = {
    VALID: "valid",
    INVALID: "invalid"
};

/**
 * Fügt ein Feedback zum angegebenen Element hinzu.
 * Es sollte sich entweder um ein HTMLInputElement oder ein HTMLFormElement handeln.
 * 
 * @param {HTMLInputElement | HTMLFormElement} input Das Element
 * @param {FeedbackType} type Der Typ des Feedbacks [FeedbackType.VALID, FeedbackType.INVALID]
 * @param {string} text Der Text des Feedbacks
 */
function addFeedback(input, type, text) {
    let parent = input.parentElement;
    let feedback = getFeedbackElement(type, text);

    if (parent != null && input.constructor.name === "HTMLInputElement") {
        // Input-spezifisches Feedback
        // Wird unter einem Input-Feld platziert
        let feedbackContainer = findFeedbackChild(parent);

        if (feedbackContainer !== input) {
            if (text !== null && text !== undefined) {
                feedbackContainer.appendChild(feedback);
            }
            
            if (!input.classList.contains(type)) {
                input.classList.add(type);
            }
        }
    } else if (input.constructor.name === "HTMLFormElement") {
        // Grundlegendes Feedback
        // Wird unter dem Formular platziert
        let feedbackContainer = findFeedbackChild(input);
        feedbackContainer.appendChild(feedback);
    }
}

/**
 * Löscht sämtliches Feedback innerhalb eines Elementes.
 * 
 * @param {HTMLElement} elem Das Element
 */
function clearFeedback(elem) {
    let children = [...elem.children];
    if (children.length !== 0) {
        children.forEach((child) => {
            for (let key in FeedbackType) {
                if (FeedbackType.hasOwnProperty(key)) {
                    if (child.classList.contains(FeedbackType[key])) {
                        child.classList.remove(FeedbackType[key]);
                    }
                }
            }

            if (child.classList.contains("feedback")) {
                child.innerHTML = "";
            } else {
                clearFeedback(child);
            }
        });
    }    
}

/**
 * Durchsucht ein HTMLElement bis das Feedback-Kind gefunden wird.
 *  
 * @param {HTMLElement} parent Das Elternelement 
 * @returns Das Element, was das Feedback enthält
 */
function findFeedbackChild(parent) {
    let feedbackContainer = null;
    [...parent.children].forEach((child) => {
        if (child.classList.contains("feedback")) {
            feedbackContainer = child;
        }
    });
    return feedbackContainer;
}

/**
 * Baut ein Feedback-Element aus dem angegebenen Typ und Text.
 * 
 * @param {FeedbackType} type 
 * @param {string} text 
 * @returns Das Feedback-Element
 */
function getFeedbackElement(type, text) {
    let feedback = document.createElement("div");
    feedback.className = type;
    feedback.innerHTML = text;
    return feedback;
}