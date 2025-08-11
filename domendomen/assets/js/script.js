window.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".oxkigoheader");
  const page = document.querySelector(".oxkigopage");

  if (header && page) {
    const headerHeight = header.offsetHeight;
    page.style.paddingTop = headerHeight + "px";
  }

  const swiper = new Swiper(".oxkigoscreenshot__slider", {
    loop: true,
    slidesPerView: 3,
    spaceBetween: 20,
    centeredSlides: true,
    allowTouchMove: false,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    speed: 3000,
    grabCursor: false,
    breakpoints: {
      0: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 4,
      },
      992: {
        slidesPerView: 6,
      },
    },
  });
});

$(".oxkigofaq-item__top").click(function () {
  const content = $(this).siblings(".oxkigofaq-item__content");
  content.slideToggle(400);
  $(this).parent().toggleClass("active");
});

// Cookie Popup Functionality
$(document).ready(function () {
  // Check if user has already accepted cookies
  const cookiesAccepted = localStorage.getItem("cookiesAccepted");

  if (!cookiesAccepted) {
    // Show cookie popup after a short delay
    setTimeout(function () {
      $("#cookiePopup").addClass("show");
    }, 1000);
  }

  // Handle cookie acceptance
  $("#acceptCookies").click(function () {
    localStorage.setItem("cookiesAccepted", "true");
    $("#cookiePopup").removeClass("show");
  });
});

// Smooth anchor scrolling with header offset
$(document).ready(function () {
  $('.oxkigomenu a[href^="#"]').click(function (e) {
    e.preventDefault();

    const target = $(this).attr("href");
    const $targetElement = $(target);

    if ($targetElement.length) {
      const headerHeight = $(".oxkigoheader").outerHeight() || 0;
      const targetOffset = $targetElement.offset().top - headerHeight - 20;

      $("html, body").animate(
        {
          scrollTop: targetOffset,
        },
        800
      );

      $(this).removeClass("active");
      $(".oxkigoheader__menu").removeClass("active");
    }
  });
});

$(document).ready(function () {
  $("#burger").click(function () {
    $(this).toggleClass("active");
    $(".oxkigoheader__menu").toggleClass("active");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const popup = document.getElementById("agePopup");
  const title = document.getElementById("agePopupTitle");
  const btnYes = document.getElementById("ageYes");
  const btnNo = document.getElementById("ageNo");

  if (localStorage.getItem("ageConfirmed")) {
    popup.remove();
    document.body.style.overflow = "";
    return;
  }

  popup.classList.add("show");
  document.body.style.overflow = "hidden";

  fetch("https://ipapi.co/json/")
    .then((res) => res.json())
    .then((data) => {
      let country = data.country_code;
      let requiredAge = 18;
      if (["CA", "KR", "JP"].includes(country)) requiredAge = 19;
      if (["US"].includes(country)) requiredAge = 21;
      title.textContent = `Masz ${requiredAge} lat?`;
    })
    .catch(() => {
      title.textContent = `Czy masz ukończone 18 lat?`;
    });

  btnYes.addEventListener("click", () => {
    localStorage.setItem("ageConfirmed", "true");
   popup.remove();
    document.body.style.overflow = "";
  });

  btnNo.addEventListener("click", () => {
    window.location.href = "";
  });
});
