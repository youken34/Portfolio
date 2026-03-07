/* Main page title animation */

function titleAnimation() {
  const viewportWidth = document.documentElement.clientWidth;
  var limitPixels = [];
  switch (true) {
    case viewportWidth >= 1000:
      limitPixels = [1100, 1850];
      break;
    case viewportWidth >= 750:
      limitPixels = [1200, 1800];
      break;
    case viewportWidth >= 559:
      limitPixels = [1400, 1900];
      break;
    case viewportWidth >= 465:
      limitPixels = [1700, 2000];
      break;
    default:
      limitPixels = [2020, 2380];
      break;
  }
  if (this.window.scrollY >= limitPixels[0]) {
    $("skills").classList.add("animate");
    if (this.window.scrollY >= limitPixels[1]) {
      $("projects").classList.add("animate");
    } else {
      $("projects").classList.remove("animate");
    }
  } else {
    $("skills").classList.remove("animate");
  }
}

window.addEventListener("scroll", function () {
  titleAnimation();
});
window.addEventListener("load", function () {
  titleAnimation();
});