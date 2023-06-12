
// Hole plan und platziere alle Medikamente im Plan
getPlan(currentUser.id).then(res => res.json()).then(plan => {
    let planElem = document.getElementById("plan");
    let days = plan.days;
    let times = plan.times;

    // Platziere Medikamente
    plan.medications.forEach(medi => {
        let dayClass = days[medi.day];
        let timeClass = times[medi.time];

        // Hole das Element welches einen Tag und eine Zeit repräsentiert
        let element = planElem.querySelector(`.day.${dayClass}.${timeClass}`);

        if (element) {
            // Hole medikamenten element & platziere Wert, Einheit und Name
            let container = element.querySelector(".medications");
            
            let mediElement = document.createElement("div");
            mediElement.className = "medicament";

            // Wert/Anzahl & Einheit
            let amountElement = document.createElement("div");
            amountElement.className = "value";
            amountElement.innerText = medi.amount + getUnitDisplay(medi.unit, medi.amount);

            // Name
            let nameElement = document.createElement("div");
            nameElement.className = "name";
            nameElement.innerText = medi.name;

            // Füge elemente hinzu
            mediElement.append(amountElement);
            mediElement.append(nameElement);
            
            container.append(mediElement);

            // Zeige den Edit-Button an
            let editButton = element.querySelector("button.edit");
            editButton.style.display = "block";
        }
    });

    // Platziere listener für die Buttons
    plan.days.forEach((day) => {
        plan.times.forEach((time) => {
            let element = planElem.querySelector(`.day.${day}.${time}`);
            
            let params = new URLSearchParams();
            params.append("day", day);
            params.append("time", time);

            // Add
            let addButton = element.querySelector("button.add");
            addButton.addEventListener("click", () => {
                redirect("plan-add", params);
            });

            // Edit
            let editButton = element.querySelector("button.edit");
            editButton.addEventListener("click", () => {
                redirect("plan-edit", params);
            });
        });
    });

    // Platziere metadaten
    document.getElementById("plan-created-at")

    hideLoader("page-loader");
});