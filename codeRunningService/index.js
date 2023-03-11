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
const Logger = require('./Logger')

// constants
const app = express();
const PUBLIC_PATH = path.join(__dirname, '/testing/public')
const UPLOAD_PATH = path.join(__dirname, '/code/main.py')
const ER_PATH = path.join(__dirname, '/code/er.txt')

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
    let log = new Logger(); // list of strings to be logged in log.txt
    log.add("Text submission received");

    let text = req.body.text;
    console.log(text)
    
    // write text code to file
    log.add("Writing text to file...");
    fs.writeFile(UPLOAD_PATH, text, err => {
        if (err) {
            log.add(err);
            // write to log and return
            res.status(500).send(log.createLog());
            return;
        } else {
            log.add("File write successful");
        }
    });
    // execute code
    log.add("Executing file...");
    cp.exec(`python3 ${UPLOAD_PATH}`, (error, stdout, stderr) => {
        if (error) {
            log.add(`error: ${error.message }`)
            res.status(400).send(log.createLog())
        } else if (stderr) {
            log.add(`stderr: ${stderr}`);
            res.status(400).send(log.createLog())
        } else {
            log.add(`stdout: ${stdout}`);
            res.status(200).send(stdout);
        }
    });
});


/**
 * User submits code in the form of a file
 */
app.post("/submit-file", (req, res) => {
    let log = new Logger();
    // parse file
    let file = req.files.upload
    log.add("File submission received!")

    if (file.name.split(".")[1] !== "py") { // check if file is a python file
        log.add("File must have a .py extension")
        res.status(400).send(log.createLog());
        return;
    }
    log.add(`${file.name} file submission logged`);

    // save file data to UPLOAD_PATH
    file.mv(UPLOAD_PATH, (err) => {
        if (err) {
            log.add(err);
            res.status(500).send(log.createLog());
            return;
        }   
    });

    // execute code
    log.add("Executing file...");
    cp.exec(`python3 ${UPLOAD_PATH}`, (error, stdout, stderr) => {
        if (error) {
            log.add(`error: ${error.message }`)
            res.status(400).send(log.createLog())
        } else if (stderr) {
            log.add(`stderr: ${stderr}`);
            res.status(400).send(log.createLog())
        } else {
            log.add(`stdout: ${stdout}`);
            res.status(200).send(stdout);
        }
    });
});



/**
 * User submits expected values in a .txt file
 */
app.post("/expected-file", (req, res) => {
    let log = new Logger();
    // parse file
    let file = req.files.upload
    log.add("File submission received!")

    if (file.name.split(".")[1] !== "txt") { // check if file is a python file
        log.add("Expected results file must have a .txt extension")
        res.status(400).send(log.createLog());
        return;
    }
    log.add(`${file.name} file submission logged`);

    // save file data to UPLOAD_PATH
    file.mv(ER_PATH, (err) => {
        if (err) {
            log.add(err);
            res.status(500).send(log.createLog());
            return;
        }  
        else {
            res.status(200).send("File uploaded");
        } 
    });
});







app.listen(5000, () => {
    console.log("App is running on port 5000");
});



