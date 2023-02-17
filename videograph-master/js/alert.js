var ALERT_TITLE = "This project is still in progress";
var ALERT_BUTTON_TEXT = "Ok";

if (document.getElementById) {
    window.alert = function (txt) {
        createCustomAlert(txt);
    }
}

function createCustomAlert(txt) {
    d = document;

    if (d.getElementById("modalContainer")) return;

    mObj = d.getElementsByTagName("body")[0].appendChild(d.createElement("div"));
    mObj.id = "modalContainer";
    mObj.style.height = d.documentElement.scrollHeight + "px";

    alertObj = mObj.appendChild(d.createElement("div"));
    alertObj.id = "alertBox";
    if (d.all && !window.opera) alertObj.style.top = document.documentElement.scrollTop + "px";
    alertObj.style.left = (d.documentElement.scrollWidth - alertObj.offsetWidth) / 2 + "px";
    alertObj.style.visiblity = "visible";


    h1 = alertObj.appendChild(d.createElement("h1"));
    h1.appendChild(d.createTextNode(ALERT_TITLE));
    alertObj.innerHTML += "<image src='https://media.tenor.com/EYX1u_zeHXYAAAAM/loading-progress-bar.gif'></image>";

    msg = alertObj.appendChild(d.createElement("p"));
    //msg.appendChild(d.createTextNode(txt));
    msg.innerHTML = txt;

    btn = alertObj.appendChild(d.createElement("a"));
    btn.id = "closeBtn";
    btn.appendChild(d.createTextNode(ALERT_BUTTON_TEXT));
    btn.href = "#";
    btn.focus();
    btn.onclick = function () {
        document.body.style.display = "block";
        removeCustomAlert(); return false;
    }

    alertObj.style.display = "block";

}

function removeCustomAlert() {
    nav = document.getElementsByTagName("nav")[0].style.filter = "blur(0px)";
    document.getElementsByTagName("nav")[1].style.filter = "blur(0px)";
    document.getElementsByTagName("nav")[2].style.filter = "blur(0px)";
    document.getElementsByTagName("body")[0].removeChild(document.getElementById("modalContainer"));
}


function display(string) {
    var ElementDisplayed = "";
    switch (string) {
        case "s":
            ElementDisplayed = document.getElementsByClassName('sanofi');
            hide(ElementDisplayed);
            return;
        case 'i':
            ElementDisplayed = document.getElementById('implid-back');
            ElementDisplayed = ElementDisplayed.getElementsByClassName('team__item__text');
            hide(ElementDisplayed);
            return;
    }

}

function hide(ElementDisplayed) {
    for (var i = 0; i < ElementDisplayed.length; i++) {
        ElementDisplayed[i].style.display = 'none';
    }
}