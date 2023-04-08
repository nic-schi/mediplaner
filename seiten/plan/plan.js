/**
 * Holt einen Plan vom Backend mit der angegebenen ID
 * 
 * @param {int} id Die ID 
 * @returns Response
 */
async function getPlan(id) {
    let data = new FormData();
    data.append("id", id);
    
    let response = await fetch("backend/plan/get.php", {
        method: "POST",
        body: data,
        headers: getAuthHeader()
    });

    return response;
}

getPlan(currentUser.id).then(res => res.json()).then(plan => {
    let planElem = document.getElementById("plan");
    let days = plan.days;
    let times = plan.times;

    plan.medications.forEach(medi => {
        let dayClass = days[medi.day];
        let timeClass = times[medi.time];

        let element = planElem.querySelector(".day."+dayClass + "." + timeClass);

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
        }
    });

    hideLoader("page-loader");
});