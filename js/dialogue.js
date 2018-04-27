// Hole den Dialog
var overlay = document.getElementById('dialogue');

// Hole den Button um den Dialog zu öffnen
var helpbutton = document.getElementById("help");

// Hole das Element zum Schließen des Dialogs
var closing = document.getElementsByClassName("close")[0];

// Öffne den Dialog 
helpbutton.onclick = function() {
    overlay.style.display = "block";
}

// Schließe den Dialog
closing.onclick = function() {
    overlay.style.display = "none";
}

// Dialog schließen, falls User neben den Dialog klickt
window.onclick = function(event) {
    if (event.target == overlay) {
        overlay.style.display = "none";
    }
}