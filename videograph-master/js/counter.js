function all(element) {
  return document.getElementsByClassName(element);
}

function $(element) {
  return document.getElementById(element);
}

window.addEventListener("DOMContentLoaded", function () {
  Array.from(all("inpLock")).forEach((element, index, array) =>
    index != 0 ? (element.checked = true) : (element.checked = false)
  );
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
    element.style.border = "calc(0.16vw) solid #fff";
  });
  Array.from(imagePreview).forEach((element) => {
    element.style.borderRight = "calc(0.16vw) solid #fff";
  });
}

function lockAnimation(number) {
  Array.from(all("inpLock")).forEach((element, index, array) =>
    index <= number ? (element.checked = false) : (element.checked = true)
  );
}
function lockAnimationMobile(timeLineHeight) {
  // console.log("test ---------------");
  Array.from(all("inpLock")).forEach((element, index, array) =>
    timeLineHeight >= element.parentElement.offsetTop || index == 0
      ? (element.checked = false)
      : (element.checked = true)
  );
  // Array.from(all("inpLock")).forEach((element, index, array) =>
  //   console.log(
  //     timeLineHeight >= element.parentElement.offsetTop || index == 0,
  //     element.checked,
  //     timeLineHeight,
  //     element.parentElement.offsetTop
  //   )
  //);
}

function vwToPixels(vw) {
  const vwInPixels = window.innerWidth;

  const pixels = (vw * vwInPixels) / 100;
  return pixels;
}

var currentSlide = 0;
var carouselImage = all("carousel-image")[0];

function slide(number) {
  if (window.innerWidth > 765) {
    currentSlide = number;
    const dotContainer = all("slide");
    var timeline = all("timeline")[0];
    var carouselText = all("carousel")[0];
    var text = all("text");
    var preview = all("preview");
    var containerPreview = all("container-preview");
    var imagePreview = all("img-preview");

    reset(text, preview, dotContainer, containerPreview, imagePreview);
    lockAnimation(currentSlide);

    dotContainer[number].style.setProperty("--after-width", "calc(8.2vw)");
    dotContainer[number].style.setProperty("--transition-delay", "0.5s");
    text[number].classList.add("active");
    containerPreview[number].style.border = "calc(0.16vw) solid #00bfe7";
    imagePreview[number].style.borderRight = "calc(0.16vw) solid #00bfe7";
    preview[number].style.border = "calc(0.16vw) solid #075c6d";

    switch (number) {
      case 0:
        carouselImage.style.transform = "translateY(0%)";
        carouselImage.style.setProperty("--after-transform", "translateX(0%)");
        carouselText.style.transform = "translateY(0px)";
        timeline.style.setProperty("--before-height", "calc(12vw)");
        break;
      case 1:
        carouselImage.style.transform = "translateY(-33.4%)";
        carouselText.style.transform = "translateY(calc(9vw))";
        timeline.style.setProperty("--before-height", "calc(21vw)");
        break;
      case 2:
        carouselImage.style.transform = "translateY(-66.7%)";
        carouselText.style.transform = "translateY(calc(16.5vw))";
        timeline.style.setProperty("--before-height", "calc(30vw)");
        break;
    }
  }
}

var initialTimelinePosition;

function initTimelinePosition() {
  var timeline = document.querySelector(".timeline");
  initialTimelinePosition =
    timeline.getBoundingClientRect().top + window.scrollY;
}

var timeline = document.querySelector(".timeline");
function slideByScrollMobile(vw = 32) {
  console.log("second function");

  var timelineBeforeHeight = window.pageYOffset - initialTimelinePosition;
  timelineSetHeight = timelineBeforeHeight + vwToPixels(vw);

  if (timelineBeforeHeight > 0) {
    if (timelineSetHeight <= $("counter").clientHeight) {
      timeline.style.setProperty(
        "--before-height",
        `calc(${timelineSetHeight}px)`
      );
    } else {
      timeline.style.setProperty("--before-height", `100%`);
    }
  } else {
    timeline.style.setProperty("--before-height", `calc(20vw)`);
  }
  lockAnimationMobile(timelineSetHeight);
}

if (document.documentElement.clientWidth < 765) {
  document.addEventListener("DOMContentLoaded", initTimelinePosition);

  // Listen for scroll events and update the timeline
  document.addEventListener("scroll", slideByScroll);
  document.addEventListener("DOMContentLoaded", slideByScroll);
}
// Initialize the initialTimelinePosition when the page loads

function slideByScroll(e) {
  if (window.innerWidth > 765) {
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
  } else {
    switch (true) {
      case document.documentElement.clientWidth < 575.5:
        var value = 32;
        break;
      case document.documentElement.clientWidth < 500:
        var value = 27;
        break;
      default:
        var value = 35;
        break;
    }
    console.log("first function", value);
    slideByScrollMobile(value);
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
    handleScrollUp();
    startY = null;
  } else if (deltaY < -50) {
    handleScrollDown();
    startY = null;
  }
});

/* Resize function */
let over765 = document.documentElement.clientWidth > 748 ? true : false;
window.addEventListener("resize", function () {
  if (document.documentElement.clientWidth > 748 && over765 == false) {
    timeline.style.setProperty("--before-height", "calc(12vw)");
    over765 = true;
  } else {
    carouselImage.style.transform = "translateY(0%)";
    timeline.style.setProperty("--before-height", "calc(22vw)");
    over765 = false;
  }
  lockAnimation(0);
});
