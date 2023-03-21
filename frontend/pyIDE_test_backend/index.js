// packages 
var express = require('express')
var app = express()
var path = require('path')
var serveIndex = require('serve-index')

// Python server related
const { spawn } = require('child_process');
const PYTHON = process.env.PYTHON || 'python';

//ports
var port = process.env.PORT || 8081

var options = {
    dotfiles: 'ignore',
    extensions: ['htm', 'html', 'json']
}

app.use('/', express.static('./pub_html', options))
app.use('/files', serveIndex('./pub_html/files', { 'icons': true }))
app.use('/', function (req, res, next) {
    console.log(req.method, 'request: ', req.url, JSON.stringify(req.body))
    next()
})

//CORS setting
const cors = require('cors');

app.use(cors({
    origin: '*'
}));

// file system
const fs = require('fs');

// parsing body
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// template engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.send('index')
})

app.post('/postCode', (req, res) => {
    let code = req.body.code;
    let stdin = req.body.stdin;
    let send_json_data = new Object();
    let outputString = "";
    try {


        fs.writeFile("test.py", code.toString(), (err) => {
            if (err)
                console.log(err);
            else {
                console.log("File written successfully\n");
                console.log("The written has the following contents:");
                console.log(fs.readFileSync("test.py", "utf8"));

                var dataToSend;
                // spawn new child process to call the python script
                const python = spawn(PYTHON, ['test.py']);
                // collect data from script
                python.stdout.on('data', function (data) {
                    console.log('Pipe data from python script ...');
                    dataToSend = data.toString();

                    console.log('stdout: ' + data);

                    send_json_data.returnValue = data.toString();
                    res.write(JSON.stringify(send_json_data));
                    // scriptOutput+=data;
                }); 
                python.stderr.on('data', function (err) {
                    console.log('stderr:' + err);
                    dataToSend = err.toString();



                    send_json_data.returnValue = err.toString();
                    res.send(JSON.stringify(send_json_data));
                    // res.end();
                    // scriptOutput+=data;
                });

                // in close event we are sure that stream from child process is closed
                python.on('close', (code) => {
                    console.log(`child process close all stdio with code = ${code}`);
                    python.stderr.on('data', err => {
                        console.log('stderr:' + err);
                        dataToSend = err.toString();



                        send_json_data.returnValue = err.toString();
                        res.write(JSON.stringify(send_json_data));
                        res.end();




                    })
                    // send data to browser
                    // let send_ojg = new Object();
                    // send_ojg.returnValue = dataToSend
                    // let dataToSendJson = JSON.stringify(send_ojg);
                    // console.log(dataToSendJson)
                    // res.write(send_ojg)
                    // // res.json(send_ojg)
                    // res.write(JSON.stringify(send_json_data));

                    res.end();
                    // res.send(dataToSendJson)
                });
            }
        });

    } catch (error) {
        console.log('stderr:' + error);
        dataToSend = error.toString();


        send_json_data.returnValue = error.toString();
        res.send(JSON.stringify(send_json_data));

    }
})

app.post('/postCodeR', (req, res) => {
    let code = req.body.code;

    fs.writeFile("test.py", code.toString(), (err) => {
        if (err)
            console.log(err);
        else {
            console.log("File written successfully\n");
            console.log("The written has the following contents:");
            console.log(fs.readFileSync("test.py", "utf8"));

            var dataToSend;
            // spawn new child process to call the python script
            const python = spawn(PYTHON, ['test.py']);
            // collect data from script
            python.stdout.on('data', function (data) {
                console.log('Pipe data from python script ...');
                dataToSend = data.toString();
            });
            // in close event we are sure that stream from child process is closed
            python.on('close', (code) => {
                console.log(`child process close all stdio with code ${code} =`);
                // send data to browser
                let send_ojg = new Object();
                send_ojg.returnValue = dataToSend
                let dataToSendJson = JSON.stringify(send_ojg);
                console.log(dataToSendJson)
                res.send(dataToSendJson)
            });
        }
    });
})

app.get('/test', (req, res) => {
    res.send('test');
})
app.post('/ping', function (req, res) {
    res.send(req.body)
})

app.listen(port, function () {
    console.log(`app running on port ${port}`)
})