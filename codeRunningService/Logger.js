const fs = require('fs');


module.exports = class Logger {;
    constructor(log_path){
        this.text_log = [];
        this.log_path = log_path;
    }

    add(text) {
        this.text_log.push(text + "\n");
    }

    writeToLog() {
        let file = fs.createWriteStream(this.log_path);
        file.on('error', (err) => { 
            console.error("ERROR: Can not write to log");
            return false; 
        });
        this.text_log.forEach((line) => { 
            file.write(line); 
        });
        file.end();
        return true;
    }
    
}