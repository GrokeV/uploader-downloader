const path = require("path");
const fs = require("fs");
const colors = require("colors");

function upload(file, root) {
    let name = crypto.randomUUID().substring(0, 5) + "-" + file["name"];
    fs.copyFile(
        path.join(file["path"]),
        path.join(
            root,
            name
        ),
        (err) => {
            if (err) console.log((`${err}`).red);
            else console.log(`Created file: ${name}`.green);
        }
    );
}

module.exports = upload;
