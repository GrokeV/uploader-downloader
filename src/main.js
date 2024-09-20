const dree = require("dree");
const express = require("express");
const bodyParser = require("body-parser");
const colors = require("colors");
const dotenv = require("dotenv");
const formData = require("express-form-data");
const path = require("path");
const upload = require("./upload");
// const multer = require("multer");
dotenv.config();

//* initialize variables
const port = process.env.PORT == undefined ? 8080 : process.env.PORT;
const passcode = process.env.PASSCODE;

const files_path = path.join(__dirname, "../files/");
const html_path = path.join(__dirname, "../html/");

const app = express();

// Set up storage for uploaded files
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "files/");
//     },
//     filename: (req, file, cb) => {
//         cb(null, crypto.randomUUID().substring(0, 5) + "-" + file.originalname);
//     },
// });

// Create the multer instance
// const upload = multer({ storage: storage });

app.use(formData.parse());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("*", (req, res, next) => {
    console.log(req.method.yellow, req.originalUrl.yellow, req.ip.blue);
    next();
});

app.use(express.static(html_path));

app.get("/files/", (req, res) => {
    const tree = dree.scan(files_path);

    const options = {
        followLinks: true,
        symbols: dree.DEFAULT_SYMBOLS,
    };

    const string = dree
        .parseTree(tree, options)
        .replace(/(^[ ])/gm, "<br> ")
        .replace(/([ ])/g, "&nbsp;");
    res.send(string);
});

app.get("/files/*", (req, res) => {
    res.sendFile(path.join(files_path, req.params[0]));
});

app.post("/upload", (req, res) => {
    const { pass } = req.body;
    console.log(req.body);
    // console.log(req.files["files"]["path"], req.files);
    if (pass === passcode) {
        if (req.files["files"]["path"] == undefined) {
            for (let i = 0; i < req.files["files"].length; i++) {
                // console.log(req.files["files"][0], files_path)
                upload(req.files["files"][i], files_path);
            }
        } else {
            upload(req.files["files"], files_path);
        }
        res.json({ message: "File uploaded successfully!" });
    } else res.json({ message: "Error: Wrong passcode" });
});

//* start express
app.listen(port, () => {
    console.log(
        colors.black(`Starting local server http://localhost:${port}`).bgGreen
    );
});
