/**
 * Holt einen Plan vom Backend mit der angegebenen ID
 * 
 * @param {int} id Die ID 
 * @returns Response
 */
async function getPlan(id) {
    let params = new URLSearchParams();
    params.append("id", id);
    
    let response = await fetch("backend/plan/get.php?" + params.toString(), {
        method: "GET",
        headers: getAuthHeader()
    });

    return response;
}

getPlan(currentUser.id).then(res => res.json()).then(plan => {
    let planElem = document.getElementById("plan");
    let days = plan.days;
    let times = plan.times;

    // Platziere Medikamente
    plan.medications.forEach(medi => {
        let dayClass = days[medi.day];
        let timeClass = times[medi.time];

        let element = planElem.querySelector(`.day.${dayClass}.${timeClass}`);

        if (element) {
            let container = element.querySelector(".medications");
            
            let mediElement = document.createElement("div");
            mediElement.className = "medicament";

            let amountElement = document.createElement("div");
            amountElement.className = "amount";
            amountElement.innerText = medi.amount + medi.unit;

            let nameElement = document.createElement("div");
            nameElement.className = "name";
            nameElement.innerText = medi.name;

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
            
            // Add
            let addButton = element.querySelector("button.add");
            addButton.addEventListener("click", () => {
                let params = new URLSearchParams();
                params.append("day", day);
                params.append("time", time);

                redirect("plan-add", params);
            });

            // Edit
            let editButton = element.querySelector("button.edit");
            editButton.addEventListener("click", () => {
                console.log("test edit");
            });
        });
    });

    hideLoader("page-loader");
});