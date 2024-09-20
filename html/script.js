setInterval(() => {
    change();
}, 5000);

change();

let last_update = new Date();
setInterval(() => {
    let t = ((5000 - (new Date().getTime() - last_update)) / 1000).toFixed(2);
    document.querySelector(".reload").innerText = t;
}, 11);

function change() {
    fetch("/files/", { method: "get" })
        .then((data) => data.text())
        .then((data) => {
            document.querySelector(".dir_structure").innerHTML = data;
            last_update = new Date().getTime();
        });
}

document
    .querySelector("body > form > button")
    .addEventListener("click", async () => {
        let files = document.querySelector("body > form > input#files");
        let pass = document.querySelector("body > form > input#pass");

        let formData = new FormData();
        formData.append("pass", pass.value);
        for (let i = 0; i < files.files.length; i++) {
            formData.append("files", files.files[i]);
        }

        let headersList = {
            Accept: "*/*",
        };

        let bodyContent = formData;

        let response = await fetch("/upload", {
            method: "POST",
            body: bodyContent,
            headers: headersList,
        });

        let data = await response.json();
        alert(data["message"]);
        change();
    });
