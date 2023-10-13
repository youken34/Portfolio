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
function lockAnimationMobile(timeLineHeight, timeout) {
  setTimeout(function () {
    Array.from(all("inpLock")).forEach((element, index, array) =>
      timeLineHeight >= element.parentElement.offsetTop || index == 0
        ? (element.checked = false)
        : (element.checked = true)
    );
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

function slide(number) {
  if (document.documentElement.clientWidth > 748) {
    currentSlide = number;
    const dotContainer = all("slide");
    var timeline = className(".timeline");
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
    // Array.from(dotContainer).forEach((element) => {
    //   element.style.setProperty("--transition-delay", "0");
    // });
  }
}

function initTimelinePosition(callback, timeout) {
  var timeline = document.querySelector(".timeline");
  var initialTimelinePosition;

  setTimeout(function () {
    initialTimelinePosition =
      timeline.getBoundingClientRect().top + window.scrollY;
    callback(initialTimelinePosition);
  }, timeout);
}

function slideByScrollMobile(timeout = 200) {
  var timeline = document.querySelector(".timeline");
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
    slide(currentSlide);
  }
}

function handleScrollUp() {
  if (currentSlide > 0) {
    currentSlide--;
    slide(currentSlide);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  if (document.documentElement.clientWidth < 748) {
    slideByScrollMobile();
  }
});

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
  var timeline = document.querySelector(".timeline");
  if (document.documentElement.clientWidth > 748 && over765 == false) {
    timeline.style.setProperty("--before-height", "calc(12vw)");
    lockAnimation(0);
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

// Mauvais affichage border radius
// Lock::after qui doit changer ses dimensions quand resize
// Animation de slide pouvant être amélioré

// Height mal généré pour timeline au lancement de la page ?
// Espace blanc sur la droite
// mauvais positionement de la section projet
