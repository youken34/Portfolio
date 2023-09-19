function all(element) {
  return document.getElementsByClassName(element);
}

function $(element) {
  return document.getElementById(element);
}

function reset(dots, text, preview, dotContainer) {
  Array.from(dots).forEach((element) => {
    element.style.backgroundColor = "#00bfe7";
    element.style.border = "calc(1vw * 0.3) solid #fff";
  });
  Array.from(text).forEach((element) => {
    if (element.classList.contains("active")) {
      element.classList.remove("active");
    }
  });
  Array.from(preview).forEach((element) => {
    if (element.classList.contains("active")) {
      element.classList.remove("active");
    }
  });
  Array.from(dotContainer).forEach((element) => {
    element.style.setProperty("--after-width", "0px");
    element.style.setProperty("--transition-delay", "0s");
  });
}
var currentSlide = 0;
function slide(number) {
  currentSlide = number;
  const dots = all("dot");
  const dotContainer = all("slide");
  var carouselImage = all("carousel-image")[0];
  var timeline = all("timeline")[0];
  var carouselText = all("carousel")[0];
  var text = all("text");
  var preview = all("preview");

  reset(dots, text, preview, dotContainer);

  dots[number].style.backgroundColor = "#fff";
  dots[number].style.border = "calc(1vw * 0.3) solid #00bfe7";
  dotContainer[number].style.setProperty("--after-width", "calc(7.77vw)");
  dotContainer[number].style.setProperty("--transition-delay", "0.5s");

  text[number].classList.add("active");
  preview[number].classList.add("active");

  switch (number) {
    case 0:
      carouselImage.style.transform = "translateY(0%)";
      carouselImage.style.setProperty("--after-transform", "translateX(0%)");
      carouselText.style.transform = "translateY(0px)";
      timeline.style.setProperty("--before-height", "calc(12vw)");
      break;
    case 1:
      carouselImage.style.transform = "translateY(-33.4%)";
      carouselText.style.transform = "translateY(calc(8vw))";
      timeline.style.setProperty("--before-height", "calc(21vw)");
      break;
    case 2:
      carouselImage.style.transform = "translateY(-66.7%)";
      carouselText.style.transform = "translateY(calc(17vw))";
      timeline.style.setProperty("--before-height", "calc(30vw)");
      break;
  }
}

function slideByScroll(e) {
  if (
    (currentSlide !== 2 && e.deltaY > 0) ||
    (currentSlide !== 0 && e.deltaY < 0)
  ) {
    e.preventDefault();
  }

  if (e.deltaY > 0) {
    handleScrollDown();
  } else if (e.deltaY < 0) {
    handleScrollUp();
  }
}

function handleScrollDown() {
  if (currentSlide < 2) {
    currentSlide++;
    slide(currentSlide);
  }
}

function handleScrollUp() {
  if (currentSlide > 0) {
    currentSlide--;
    slide(currentSlide);
  }
}

$("counter").onwheel = slideByScroll;

$("counter").addEventListener("touchstart", function (e) {
  startY = e.touches[0].clientY;
});

$("counter").addEventListener("touchmove", function (e) {
  if (startY === null) {
    return;
  }

  var deltaY = e.touches[0].clientY - startY;

  if (deltaY > 50) {
    // You can adjust this threshold
    handleScrollUp();
    startY = null;
  } else if (deltaY < -50) {
    // You can adjust this threshold
    handleScrollDown();
    startY = null;
  }
});
