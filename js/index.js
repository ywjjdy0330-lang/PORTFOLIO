$(document).ready(function () {
  // ==========================================
  // 1. 변수 설정
  // ==========================================
  const $navItems = $("#portfolio .left nav ul li");
  const $navLinks = $("#portfolio .left nav ul li a");
  const $pfItems = $(".pf_item");
  const $arrow = $("#portfolio .left nav .arrow");
  const $hamburger = $(".hamburger");
  const $mobileNav = $(".mobile_nav");
  const $mobileLinks = $(".mobile_nav a");

  // ==========================================
  // 2. 탭 & 화살표 기능
  // ==========================================
  function moveArrow($targetLi) {
    const topPos = $targetLi.position().top + ($targetLi.outerHeight() / 2) - ($arrow.outerHeight() / 2);
    $arrow.stop().animate({ top: topPos }, 0);
  }

  $navLinks.on("click", function (e) {
    e.preventDefault();
    const $thisLi = $(this).parent("li");
    const targetId = $(this).attr("href");

    $thisLi.addClass("active").siblings().removeClass("active");
    $(targetId).css("display", "flex").siblings(".pf_item").hide();
    moveArrow($thisLi);
  });

  $navItems.eq(0).find("a").trigger("click");

  let resizeTimer;
  $(window).on("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      const $activeLi = $("#portfolio .left nav ul li.active");
      if ($activeLi.length) moveArrow($activeLi);
    }, 200);
  });

  // ==========================================
  // 3. 모바일 햄버거 메뉴
  // ==========================================
  $hamburger.on("click", function () {
    $(this).toggleClass("active");
    $mobileNav.toggleClass("active");
  });

  $mobileLinks.on("click", function () {
    $hamburger.removeClass("active");
    $mobileNav.removeClass("active");
  });

  // ==========================================
  // 4. 픽셀 아트 애니메이션 (PORTFOLIO)
  // ==========================================
  const charMap = {
    P: [[1, 1, 1, 1, 0], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 1, 1, 1, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0]],
    O: [[0, 1, 1, 1, 0], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [0, 1, 1, 1, 0]],
    R: [[1, 1, 1, 1, 0], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 1, 1, 1, 0], [1, 0, 1, 0, 0], [1, 0, 0, 1, 0], [1, 0, 0, 0, 1]],
    T: [[1, 1, 1, 1, 1], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0]],
    F: [[1, 1, 1, 1, 1], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 1, 1, 1, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0]],
    L: [[1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 1, 1, 1, 1]],
    I: [[0, 1, 1, 1, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 1, 1, 1, 0]]
  };

  const textString = "PORTFOLIO";
  const $dotContainer = $(".b_dot");

  $dotContainer.empty();
  const $textWrapper = $("<div>").addClass("pixel-text-container");

  $.each(textString.split(""), function (i, char) {
    const charGrid = charMap[char];
    if (!charGrid) return;
    const $charDiv = $("<div>").addClass("pixel-char");
    $.each(charGrid, function (rowIdx, row) {
      $.each(row, function (colIdx, col) {
        if (col === 1) {
          const randomX = (Math.random() - 0.5) * 2000;
          const randomY = (Math.random() - 0.5) * 2000;
          $("<div>").addClass("pixel-dot").css({ "--rx": randomX + "px", "--ry": randomY + "px" }).appendTo($charDiv);
        } else {
          $("<div>").appendTo($charDiv);
        }
      });
    });
    $textWrapper.append($charDiv);
  });
  $dotContainer.append($textWrapper);

  setTimeout(function () {
    $(".pixel-dot").each(function () {
      const $dot = $(this);
      setTimeout(function () {
        $dot.addClass("active");
      }, Math.random() * 500);
    });
  }, 100);

  // ==========================================
  // 5. 배너 텍스트 타이핑 효과
  // ==========================================
  const $typingTarget = $(".b_text h2");
  const typingText = "Web Publisher <br> Portfolio Ver 1.0.0";
  
  $typingTarget.html("").addClass("typing-cursor");

  let i = 0;
  function typeWriter() {
    if (i < typingText.length) {
      if (typingText.charAt(i) === "<") {
        let tag = "";
        while (typingText.charAt(i) !== ">") {
          tag += typingText.charAt(i);
          i++;
        }
        tag += ">";
        $typingTarget.html($typingTarget.html() + tag);
        i++;
      } else {
        $typingTarget.html($typingTarget.html() + typingText.charAt(i));
        i++;
      }
      setTimeout(typeWriter, 50);
    } else {
    }
  }

  setTimeout(typeWriter, 1000);

  // ==========================================
  // 6. TOP 버튼 기능 (기존 코드 유지)
  // ==========================================
  const $topBtn = $("#top");
  
  $topBtn.hide();

  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 300) {
      $topBtn.fadeIn();
    } else {
      $topBtn.fadeOut();
    }
  });
});