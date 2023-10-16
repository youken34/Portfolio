function all(element) {
  return document.getElementsByClassName(element);
}

function $(element) {
  return document.getElementById(element);
}
function className(element) {
  return document.querySelector(element);
}

window.addEventListener("DOMContentLoaded", function () {
  if (document.documentElement.clientWidth > 748) {
    Array.from(all("inpLock")).forEach((element, index, array) =>
      index != 0 ? (element.checked = true) : (element.checked = false)
    );
  } else {
    slideByScrollMobile();
  }
});

function reset(text, preview, dotContainer, containerPreview, imagePreview) {
  Array.from(text).forEach((element) => {
    if (element.classList.contains("active")) {
      element.classList.remove("active");
    }
  });
  Array.from(preview).forEach((element) => {
    if (element.classList.contains("active")) {
      element.classList.remove("active");
    }
    element.style.border = "none";
  });
  Array.from(dotContainer).forEach((element) => {
    element.style.setProperty("--after-width", "0px");
    element.style.setProperty("--transition-delay", "0s");
  });
  Array.from(containerPreview).forEach((element) => {
    element.style.border = "calc(0.40vw) solid #fff";
  });
  Array.from(imagePreview).forEach((element) => {
    element.style.borderRight = "calc(0.40vw) solid #fff";
  });
}

function lockAnimation(number) {
  Array.from(all("inpLock")).forEach((element, index, array) =>
    index <= number ? (element.checked = false) : (element.checked = true)
  );
}
function lockAnimationMobile(timeLineHeight, timeout) {
  setTimeout(function () {
    var lastLockerChecked = -1;
    Array.from(all("inpLock")).forEach((element, index, array) =>
      timeLineHeight >= element.parentElement.offsetTop || index == 0
        ? (element.checked = false)
        : (element.checked = true)
    );
    Array.from(all("inpLock")).forEach((element) =>
      element.checked == false ? lastLockerChecked++ : undefined
    );
    applyProperties(lastLockerChecked);
  }, timeout);
}

function vwToPixels(vw) {
  const vwInPixels = window.innerWidth;
  const pixels = (vw * vwInPixels) / 100;
  return pixels;
}

var currentSlide = 0;
var carouselImage = className(".carousel-image");
var carouselText = className(".carousel");
const dotContainer = all("slide");
var timeline = className(".timeline");
var text = all("text");
var containerPreview = all("container-preview");
var imagePreview = all("img-preview");
var preview = all("preview");

let canExecute = true;

function slide(number, previousNumber, direction) {
  if (canExecute && document.documentElement.clientWidth > 748) {
    canExecute = false;
    lockAnimation(currentSlide);
    applyPropertiesLargeDevice(number, previousNumber, direction);

    // Set a timeout to reset the flag after a certain interval (e.g., 1000 milliseconds or 1 second)
    setTimeout(() => {
      currentSlide = number;
      canExecute = true;
    }, 200);
  }
}

function applyPropertiesLargeDevice(number, previousNumber, direction) {
  applyProperties(number);

  switch (previousNumber) {
    case 0:
      document.documentElement.style.setProperty("--slide-depart", "0%");
      document.documentElement.style.setProperty("--slide-stop-by", "5%");
      break;
    case 1:
      document.documentElement.style.setProperty("--slide-depart", "-33.4%");
      document.documentElement.style.setProperty("--slide-stop-by", "-28.4%");
      break;
    case 2:
      document.documentElement.style.setProperty("--slide-depart", "-66.7%");
      document.documentElement.style.setProperty("--slide-stop-by", "-71.7%");
      break;
  }

  switch (number) {
    case 0:
      document.documentElement.style.setProperty("--slide-destination", "0%");
      carouselImage.style.transform = "translateY(0%)";
      carouselText.style.transform = "translateY(0px)";
      timeline.style.setProperty("--before-height", "calc(12vw)");
      break;
    case 1:
      document.documentElement.style.setProperty(
        "--slide-destination",
        "-33.4%"
      );
      carouselImage.style.transform = "translateY(-33.4%)";
      carouselText.style.transform = "translateY(calc(9vw))";
      timeline.style.setProperty("--before-height", "calc(21vw)");
      break;
    case 2:
      document.documentElement.style.setProperty(
        "--slide-destination",
        "-66.7%"
      );
      carouselImage.style.transform = "translateY(-66.7%)";
      carouselText.style.transform = "translateY(calc(16.5vw))";
      timeline.style.setProperty("--before-height", "calc(30vw)");
      break;
  }
  carouselImage.classList.toggle("active");
}

function applyProperties(number) {
  reset(text, preview, dotContainer, containerPreview, imagePreview);

  dotContainer[number].style.setProperty("--after-width", "calc(8.2vw)");
  dotContainer[number].style.setProperty("--transition-delay", "0.5s");
  text[number].classList.add("active");
  containerPreview[number].style.border = "calc(0.40vw) solid #00bfe7";
  imagePreview[number].style.borderRight = "calc(0.40vw) solid #00bfe7";
  preview[number].style.border = "calc(0.40vw) solid #075c6d";
}

let timeoutId;

window.addEventListener("resize", function () {
  clearTimeout(timeoutId);

  Array.from(dotContainer).forEach((element) => {
    element.style.setProperty("--transition-delay", "0s");
    element.style.setProperty("--transition-duration", "0s");
  });

  timeline.style.setProperty("--timeline-transition", "0s");
  carouselText.style.setProperty("--carousel-transition", "0s");

  timeoutId = setTimeout(function () {
    Array.from(dotContainer).forEach((element) => {
      element.style.setProperty("--transition-duration", "0.5s");
    });
    timeline.style.setProperty("--timeline-transition", "0.5");
    carouselText.style.setProperty("--carousel-transition", "1s");
  }, 500);
});

function initTimelinePosition(callback, timeout) {
  var initialTimelinePosition;

  setTimeout(function () {
    initialTimelinePosition =
      timeline.getBoundingClientRect().top + window.scrollY;
    callback(initialTimelinePosition);
  }, timeout);
}

function slideByScrollMobile(timeout = 200) {
  initTimelinePosition(function (initialTimelinePosition) {
    var timelineBeforeHeight = window.pageYOffset - initialTimelinePosition;
    var timelineSetHeight = timelineBeforeHeight + vwToPixels(45);
    if (timelineBeforeHeight > -50) {
      if (timelineSetHeight <= $("counter").clientHeight) {
        timeline.style.setProperty(
          "--before-height",
          `calc(${timelineSetHeight}px)`
        );
      }
    } else {
      timeline.style.setProperty("--before-height", `calc(22vw)`);
      // Permet à la timeline de ne pas aller plus haut que le premier cadenas
    }

    lockAnimationMobile(timelineSetHeight);
  }, timeout);
}

function slideByScroll(e) {
  if (document.documentElement.clientWidth > 748) {
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
}

function handleScrollDown() {
  if (currentSlide < 2) {
    currentSlide++;
    slide(currentSlide, currentSlide - 1, false);
  }
}

function handleScrollUp() {
  if (currentSlide > 0) {
    currentSlide--;
    slide(currentSlide, currentSlide + 1, true);
  }
}

$("counter").onwheel = slideByScroll;
document.body.onwheel = function () {
  if (document.documentElement.clientWidth < 748) {
    slideByScrollMobile();
  }
};

document.body.addEventListener("touchstart", function (e) {
  if (document.documentElement.clientWidth < 748) {
    slideByScrollMobile();
  }
});

document.body.addEventListener("touchmove", function (e) {
  if (document.documentElement.clientWidth < 748) {
    slideByScrollMobile();
  }
});

/* Resize function */
let over765 = document.documentElement.clientWidth > 748 ? true : false;
window.addEventListener("resize", function () {
  if (document.documentElement.clientWidth > 748 && over765 == false) {
    timeline.style.setProperty("--before-height", "calc(12vw)");
    slide(0);
    over765 = true;
  } else if (document.documentElement.clientWidth < 748) {
    if (over765 == true) {
      carouselImage.style.transform = "translateY(0%)";
      timeline.style.setProperty("--before-height", "calc(22vw)");
      carouselText.style.transform = "translateY(calc(0vw))";
      lockAnimation(0);
      over765 = false;
    }
    slideByScrollMobile(0);
  }
});

// Animation de slide pouvant être amélioré ?

// Height mal généré pour timeline au lancement de la page ?
// Espace blanc sur la droite
// mauvais positionement de la section projet
