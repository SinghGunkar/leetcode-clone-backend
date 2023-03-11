module.exports = class Logger {
    constructor(){
        this.text_log = [];
    }
    // append to text_log
    add(text) {
        this.text_log.push(text + "\n");
    }
    // stringify log message
    createLog() {
        return this.text_log.join("");
    }
}