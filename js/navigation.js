const routes = [];
const route = (pfad, datei) => {
    routes.push({
        "pfad": pfad,
        "datei": datei
    });
}

const router = async () => {
    let app = document.getElementById("app");
    let url = ("/" + window.location.hash.slice(1)) || "/";
    let route = routes.find((item) => item.pfad === url);

    if (route != undefined) {
        let response = await fetch("seiten/" + route.datei);
        if (response.status === 200) {
            let text = await response.text();
            app.innerHTML = text;
        }
    }
    console.log(url, routes, route)
} 

window.addEventListener("hashchange", router);

window.addEventListener("load", (event) => {
    route("/", "startseite.php");
    route("/impressum", "impressum.php");
    route("/plan", "plan.php");
});
window.addEventListener("load", router);