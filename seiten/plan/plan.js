
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
    console.log(plan);
    hideLoader("page-loader");
});