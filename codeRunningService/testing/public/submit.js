window.onload = () => {
    let data = localStorage.getItem('data');
    if (data !== null) {
        // document.getElementById("output").innerHTML = ""
        document.getElementById("output").innerHTML = localStorage.getItem("data");
        localStorage.removeItem("data");     

    }
}

// function submit_file() {

        // }

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