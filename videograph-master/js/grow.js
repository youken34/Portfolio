/* Adobe zoom functions */

function grow(image, numberFlex) {
  if (window.innerWidth > 992) {
    const body = document.body;
    var flex = document.getElementsByClassName("flex")[numberFlex];
    switch (image) {
      case "clean":
        var clicked = false;
        var element = document.getElementById("clean");
        if (element.style.transform === "scale(1)") {
          undo();
          element.style.transform = "scale(1.7)";
          element.style.zIndex = "2";
        } else {
          element.style.transform = "scale(1)";
          element.style.zIndex = "1";
        }
        break;
      case "castel":
        var element = document.getElementById("castel");
        if (element.style.transform === "scale(1)") {
          undo();
          element.style.transform = "scale(1.7)";
          element.style.zIndex = "2";
        } else {
          element.style.transform = "scale(1)";
          element.style.zIndex = "1";
        }
        break;
    }
  }
}

function undo() {
  var flex = document.querySelectorAll(".mix");
  flex.forEach((element) => {
    element.style.transform = "scale(1)";
    element.style.zIndex = "1";
  });
}
