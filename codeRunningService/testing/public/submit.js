window.onload = () => {
    let data = localStorage.getItem('data');
    if (data !== null) {
        document.getElementById("output").innerHTML = localStorage.getItem("data");
        localStorage.removeItem("data");     

    }
}

function submit_expected() {
    document.getElementById("output").innerHTML = ""
    let formData = new FormData();
    let file = $("#expected-upload")[0].files[0];
    formData.append("expected-upload", file)
    $.ajax({
        method: "POST",
        url: "/expected-file",
        processData: false,  // tell jQuery not to process the data
        contentType: false,  // tell jQuery not to set contentType
        data: formData,
        success: function(data) {                              
            console.log("File is submitted");

            let results = data.split("\n")
            localStorage.setItem("data", results.join("<br>"));
            window.location.reload();
        },
        error: function(xhr, status, error) {
            console.error("File could not be submitted!");
            let results = xhr.responseText.split("\n")
            localStorage.setItem("data", results.join("<br>"));
            window.location.reload();
        }
    });   

}





function submit_file() {
    document.getElementById("output").innerHTML = ""
    let formData = new FormData();
    let file = $("#upload")[0].files[0];
    formData.append("upload", file)
    $.ajax({
        method: "POST",
        url: "/submit-file",
        processData: false,  // tell jQuery not to process the data
        contentType: false,  // tell jQuery not to set contentType
        data: formData,
        success: function(data) {                              
            console.log("File is submitted");

            let results = data.split("\n")
            localStorage.setItem("data", results.join("<br>"));
            window.location.reload();
        },
        error: function(xhr, status, error) {
            console.error("File could not be submitted!");
            let results = xhr.responseText.split("\n")
            localStorage.setItem("data", results.join("<br>"));
            window.location.reload();
        }
    });   



}

function submit_text() {
    document.getElementById("output").innerHTML = ""
    $.ajax({
        method: "POST",
        url: "/submit-text",
        data: "text=" + $("#text").val().replaceAll("+", "%2B"), // "+"" is a special char and needs to 
        success: function(data) {                                // be explicitly stated with "%2B"
            console.log("File is submitted");

            let results = data.split("\n")
            localStorage.setItem("data", results.join("<br>"));
            window.location.reload();
        },
        error: function(xhr, status, error) {
            console.error("File could not be submitted!");
            let results = xhr.responseText.split("\n")
            localStorage.setItem("data", results.join("<br>"));
            window.location.reload();
        }
    });   
}