$(document).ready(function () {
    document.onkeydown = function(e){
        console.log(e)
        document.getElementById("h1").innerText = e.keyCode
    }
})

