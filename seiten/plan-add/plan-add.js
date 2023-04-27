var days = getDays();
var times = getTimes();
var units = getUnits();

(() => {
    let params = getParams();
         
    // Füge Zeiten hinzu
    let timeElem = document.getElementById("time");
    addToSelect(times, timeElem, params.get("time"));

    // Füge Tage hinzu
    let dayElem = document.getElementById("day");
    addToSelect(days, dayElem, params.get("day"));

    // Füge Einheiten hinzu
    let unitElem = document.getElementById("unit");
    addToSelect(units, unitElem);
    
    addArrowsToNumberInputs();
    hideLoader("page-loader");
})();

document.getElementById("plan-add-formular").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Hole Felder
    let data = new FormData(e.target);

    let day = data.get("day");
    let time = data.get("time");
    let amount = data.get("amount");
    let unit = data.get("unit");
    let name = data.get("name");

    let inputs = e.target.elements;
    let dayFeld = inputs.namedItem("day");
    let timeFeld = inputs.namedItem("time");
    let amountFeld = inputs.namedItem("amount");
    let unitFeld = inputs.namedItem("unit");
    let nameFeld = inputs.namedItem("name");

    // Validierung
    clearFeedback(e.target);
    let error = false;

    // Tag angegeben?
    if (day == "_none") {
        error = true;
        addFeedback(dayFeld, FeedbackType.INVALID, "Bitte geben Sie ein Tag an!");
    } else if (!Object.keys(days).includes(day)) {
        // Tag gültig
        error = true;
        addFeedback(dayFeld, FeedbackType.INVALID, "Üngültige Eingabe!");
    }

    // Zeitpunkt angegeben?
    if (time == "_none") {
        error = true;
        addFeedback(timeFeld, FeedbackType.INVALID, "Bitte geben Sie einen Zeitpunkt an!");
    } else if (!Object.keys(times).includes(time)) {
        // Zeitpunkt gültig
        error = true;
        addFeedback(timeFeld, FeedbackType.INVALID, "Üngültige Eingabe!");
    }

    // Anzahl/Menge angegeben
    if (amount.length <= 0) {
        error = true;
        addFeedback(amountFeld, FeedbackType.INVALID, "Bitte geben Sie einen Anzahl/Menge an!");
    } else if (isNaN(amount)) {
        // Keine Zahl
        error = true;
        addFeedback(amountFeld, FeedbackType.INVALID, "Bitte geben Sie eine Zahl an!");
    }

    // Einheit angegeben
    if (unit === "_none") {
        error = true;
        addFeedback(unitFeld, FeedbackType.INVALID, "Bitte geben Sie eine Einheit an!");
    } else if (!Object.keys(units).includes(unit)) {
        // Einheit gültig
        error = true;
        addFeedback(unitFeld, FeedbackType.INVALID, "Üngültige Eingabe!");
    }

    // Name/Bezeichnung
    if (name.length <= 0) {
        error = true;
        addFeedback(nameFeld, FeedbackType.INVALID, "Bitte geben Sie eine Bezeichnung an!");
    }

    if (!error) {
        // Validierung überlebt
        let response = await addMedicamentToPlan(
            currentUser.id,
            day,
            time,
            amount,
            unit,
            name
        );

        if (response.status === 200) {
            addFeedback(e.target, FeedbackType.VALID, "Medikament Erfolgreich hinzugefügt!");
        }
    }
});