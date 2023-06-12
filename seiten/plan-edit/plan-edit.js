var days = getDays();
var times = getTimes();
var units = getUnits();

// Hole plan und platziere alle Medikamente im Formular
getPlan(currentUser.id).then(res => res.json()).then(plan => {
    let params = getParams();
    let day = params.get("day");
    let time = params.get("time");

    let dayIndex = Object.keys(days).findIndex(key => key === day);
    let timeIndex = Object.keys(times).findIndex(key => key === time);

    // Hole nur die nötigen Medikamente
    let medications = plan["medications"].filter(medi => {
        return medi.day === dayIndex && medi.time === timeIndex;
    });

    if (medications.length <= 0) {
        redirect("plan");
        return;
    }

    // Platziere metadaten
    document.getElementById("day").innerHTML = days[day];
    document.getElementById("time").innerHTML = times[time];

    // Füge Einheiten hinzu
    let unitElem = document.querySelector("#medications .medicament.copy .unit");
    addToSelect(units, unitElem);

    // Platziere medikamente
    let mediContainer = document.getElementById("medications");
    let medicamentCopy = document.querySelector("fieldset.medicament.copy");
    medicamentCopy.classList.remove("copy");

    medications.forEach((medi, index) => {
        let mediElem = medicamentCopy.cloneNode(true);

        // Platziere Metadaten zum Medikament
        mediElem.querySelector(".mediname").innerHTML = medi.name;

        // Platziere Werte & ID's
        // Einheit
        let unitElem = mediElem.querySelector(".unit");
        unitElem.value = medi.unit;
        unitElem.id = `unit-${index}`;
        mediElem.querySelector(".unit-label").htmlFor = `unit-${index}`;

        // Menge/Anzahl
        let amountElem = mediElem.querySelector(".amount");
        amountElem.value = medi.amount;
        amountElem.id = `amount-${index}`;
        mediElem.querySelector(".amount-label").htmlFor = `amount-${index}`;

        // Name
        let nameElem = mediElem.querySelector(".name");
        nameElem.value = medi.name;
        nameElem.id = `name-${index}`;
        mediElem.querySelector(".name-label").htmlFor = `name-${index}`;

        // Name change listener
        nameElem.addEventListener("input", (e) => {
            mediElem.querySelector(".mediname").innerHTML = e.target.value;
        });

        // Delete
        mediElem.querySelector(".delete-button").addEventListener("click", () => mediElem.remove());

        mediContainer.append(mediElem);
    });
    medicamentCopy.remove();
    addArrowsToNumberInputs();

    hideLoader("page-loader");
});

document.getElementById("plan-edit-formular").addEventListener("submit", async (e) => {
    e.preventDefault();
    let rawData = new FormData(e.target);
    let data = [];
    let splitIndex = 3;
    
    // Baue rohdaten um und extrahiere diese in das data-Array
    let rawDataEntries = [...rawData.entries()];
    for (let i = 0; i < rawDataEntries.length; i += splitIndex) {
        let slice = rawDataEntries.slice(i, i + splitIndex);
        data.push(Object.fromEntries(new Map(slice)));
    }
    
    // Validierung
    clearFeedback(e.target);
    let error = false;

    data.forEach((medi, index) => {
        let amountFeld = document.getElementById(`amount-${index}`);
        let unitFeld = document.getElementById(`unit-${index}`);
        let nameFeld = document.getElementById(`name-${index}`);
        
        // Anzahl/Menge angegeben
        if (medi.amount.length <= 0) {
            error = true;
            addFeedback(amountFeld, FeedbackType.INVALID, "Bitte geben Sie einen Anzahl/Menge an!");
        } else if (isNaN(medi.amount)) {
            // Keine Zahl
            error = true;
            addFeedback(amountFeld, FeedbackType.INVALID, "Bitte geben Sie eine Zahl an!");
        } else {
            medi.amount = parseInt(medi.amount);
        }

        // Einheit angegeben
        if (medi.unit === "_none") {
            error = true;
            addFeedback(unitFeld, FeedbackType.INVALID, "Bitte geben Sie eine Einheit an!");
        } else if (!Object.keys(units).includes(medi.unit)) {
            // Einheit gültig
            error = true;
            addFeedback(unitFeld, FeedbackType.INVALID, "Üngültige Eingabe!");
        }

        // Name/Bezeichnung
        if (medi.name.length <= 0) {
            error = true;
            addFeedback(nameFeld, FeedbackType.INVALID, "Bitte geben Sie eine Bezeichnung an!");
        }
    });

    if (!error) {
        let params = getParams();
        let day = params.get("day");
        let time = params.get("time");

        // Aktualisere die Medikamente
        let response = await updateMedicaments(currentUser.id, day, time, JSON.stringify(data));
        
        if (response.status == 200) {        
            addFeedback(e.target, FeedbackType.VALID, "Änderungen abgespeichert!");
        }
    }
});