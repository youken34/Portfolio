var buttons = document.querySelectorAll(".owl-dots button");
var firstThreeButtons = Array.from(buttons).slice(0, 3);
var [firstButton, secondButton, thirdButton] = firstThreeButtons;

var animation = VANTA.DOTS({
  el: "#vanta",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.0,
  minWidth: 200.0,
  scale: 1.0,
  scaleMobile: 1.0,
  color: 0x00bfe7,
  color2: 0x00bfe7,
  backgroundColor: 0x100028,
});

firstButton.addEventListener("click", function () {
  animation.destroy();
  animation = VANTA.DOTS({
    el: "#vanta",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.0,
    minWidth: 200.0,
    scale: 1.0,
    scaleMobile: 1.0,
    color: 0x00bfe7,
    color2: 0x00bfe7,
    backgroundColor: 0x100028,
  });
});

secondButton.addEventListener("click", function () {
  animation.destroy();
  animation = VANTA.CELLS({
    el: "#vanta",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.0,
    minWidth: 200.0,
    scale: 1.0,
    color1: 0x100538,
    color2: 0x100538,
  });
});

thirdButton.addEventListener("click", function () {
  animation.destroy();
  animation = VANTA.FOG({
    el: "#vanta",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.0,
    minWidth: 200.0,
    highlightColor: 0x3c0098,
    midtoneColor: 0x7f88cc,
    lowlightColor: 0x0,
    baseColor: 0x110131,
  });
});
