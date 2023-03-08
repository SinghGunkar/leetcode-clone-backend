/**
 * index.js
 * 
 * Alvin Tsang
 */

// imports
const express = require('express');
const file_upload = require('express-fileupload');
const path = require('path');
const cp = require('child_process');
const os = require('os');
const fs = require('fs');

// constants
const app = express();
const PUBLIC_PATH = path.join(__dirname, '/testing/public')
const UPLOAD_PATH = path.join(__dirname, '/code/main.py')

// parsing body
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(file_upload());

// log each request
app.use((req, res, next) => {
    console.log(`\n${req.method} request: ${req.url} ${JSON.stringify(req.body)}`);
    next()
})


// check if file is being run in testing mode
if (process.argv[2] === "1") {
    console.warn("Server is running in testing mode");

    // path to public files for users to view
    app.use(express.static(PUBLIC_PATH));
   
    // specific endpoints for testing
    app.get("/", (req, res) => {
        console.log("root file");
        res.sendFile(PUBLIC_PATH + "/index.html");
    });
}



// general endpoints

/**
 * User submits code in the form of a textarea
 */
app.post("/submit-text", (req, res) => {
    console.log("Text submission logged");
    let text = req.body.text;
    // write text code to file
    fs.writeFile(UPLOAD_PATH, text, err => {
        if (err) {
            console.error(err);
            res.send(500);
            return;
        }
    });
    // execute code
    if (os.platform() === 'win32'){
        cp.exec(`python3 ${UPLOAD_PATH}`, (error, stdout, stderr) => {
            if (error) {
                errorMessage = error.message 
                console.log(`error: ${errorMessage}`);
                res.status(400).send(errorMessage);
            } else if (stderr) {
                console.log(`stderr: ${stderr}`);
                res.status(400).send(stderr);
            } else {
                console.log(`stdout: ${stdout}`);
                res.status(200).send(stdout);
            }
        });
    }
    else{
        console.log(`Can't run on ${os.platform}, ${os.release}`);
        res.sendStatus(500);
    }
});


/**
 * User submits code in the form of a file
 */
app.post("/submit-file", (req, res) => {
    // parse file
    let file = req.files.upload

    if (file.name.split(".")[1] !== "py") { // check if file is a python file
        res.status(400).send("File must have a .py extension");
        return;
    }
    console.log(`${file.name} file submission logged`);

    // save file data to UPLOAD_PATH
    file.mv(UPLOAD_PATH, (err) => {
        if (err) {
            res.status(500).send(err);
            return;
        }   
    });

    if (os.platform() === 'win32'){
        cp.exec(`python3 ${UPLOAD_PATH}`, (error, stdout, stderr) => {
            if (error) {
                errorMessage = error.message 
                console.log(`error: ${errorMessage}`);
                res.status(400).send(errorMessage);
            } else if (stderr) {
                console.log(`stderr: ${stderr}`);
                res.status(400).send(stderr);
            } else {
                console.log(`stdout: ${stdout}`);
                res.status(200).send(stdout);
            }
        });
    }
    else{
        console.log(`Can't run on ${os.platform}, ${os.release}`);
        res.sendStatus(500);
    }
});




app.listen(5000, () => {
    console.log("App is running on port 5000");
});


