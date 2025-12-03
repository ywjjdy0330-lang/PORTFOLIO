$(function () {
  // 1. 초기화 & 전역 설정
  $(".box.s2, .box.s3, .box.s4").attr("data-aos-anchor", ".box.s1");

  AOS.init({ duration: 1000, once: true });

  const $navItems = $("#portfolio .left nav ul li");
  const $arrow = $("#portfolio .left nav .arrow");
  const $hamburger = $(".hamburger");
  const $mobileNav = $(".mobile_nav");
  const $topBtn = $("#top").hide();

  // 2. 탭 & 화살표
  function moveArrow($target) {
    if (!$target.length) return;
    const topPos = $target.position().top + $target.outerHeight() / 2 - $arrow.outerHeight() / 2;
    $arrow.css("top", topPos);
  }

  $navItems.on("click", "a", function (e) {
    e.preventDefault();
    const $li = $(this).parent();
    const targetId = $(this).attr("href");

    $li.addClass("active").siblings().removeClass("active");
    $(targetId).css("display", "flex").siblings(".pf_item").hide();
    moveArrow($li);
  });

  // 초기 실행 및 리사이즈 이벤트
  $navItems.first().find("a").trigger("click");
  let resizeTimer;
  $(window).on("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => moveArrow($navItems.filter(".active")), 200);
  });

  // 3. 모바일 메뉴
  $hamburger.on("click", function () {
    $(this).add($mobileNav).toggleClass("active");
  });
  $(".mobile_nav a").on("click", () => $hamburger.add($mobileNav).removeClass("active"));

  // 4. 픽셀 아트 (데이터 압축)
  const charMap = {
    P: ["11110", "10001", "10001", "11110", "10000", "10000", "10000"],
    O: ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
    R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
    T: ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
    F: ["11111", "10000", "10000", "11110", "10000", "10000", "10000"],
    L: ["10000", "10000", "10000", "10000", "10000", "10000", "11111"],
    I: ["01110", "00100", "00100", "00100", "00100", "00100", "01110"]
  };

  const $dotContainer = $(".b_dot").empty();
  const $textWrapper = $("<div>").addClass("pixel-text-container");

  "PORTFOLIO".split("").forEach(char => {
    const grid = charMap[char] || [];
    const $charDiv = $("<div>").addClass("pixel-char");

    grid.forEach(row => {
      [...row].forEach(col => {
        if (col === "1") {
          const rand = (n) => (Math.random() - 0.5) * n;
          $("<div>").addClass("pixel-dot")
            .css({ "--rx": `${rand(2000)}px`, "--ry": `${rand(2000)}px` })
            .appendTo($charDiv);
        } else {
          $("<div>").appendTo($charDiv);
        }
      });
    });
    $textWrapper.append($charDiv);
  });

  $dotContainer.append($textWrapper);

  // 픽셀 애니메이션 시작
  setTimeout(() => {
    $(".pixel-dot").each(function () {
      setTimeout(() => $(this).addClass("active"), Math.random() * 500);
    });
  }, 100);

  // 5. 타이핑 효과 (HTML 태그 처리 간소화)
// 5. 타이핑 효과 (수정됨: 딜레이 추가)
  const $typingTarget = $(".b_text h2").addClass("typing-cursor");
  const text = "Web Publisher <br> Portfolio Ver 1.0.0";
  let idx = 0;

  function type() {
    if (idx < text.length) {
      // <br> 태그 감지 시 한번에 처리
      if (text.substring(idx).startsWith("<br>")) {
        $typingTarget.html($typingTarget.html() + "<br>");
        idx += 4;
      } else {
        $typingTarget.html($typingTarget.html() + text.charAt(idx++));
      }
      setTimeout(type, 50); // 글자 타이핑 속도
    }
  }

  // ▲ 위쪽의 PORTFOLIO 픽셀 애니메이션이 얼추 끝난 뒤 시작하도록 
  // 2000ms (2초) 딜레이를 주었습니다. 숫자를 조절해 타이밍을 맞추세요.
  setTimeout(type, 1000);

  // 6. TOP 버튼 & 이메일 복사
  $(window).on("scroll", function () {
    $(this).scrollTop() > 300 ? $topBtn.fadeIn() : $topBtn.fadeOut();
  });

  $(".info_i .row:nth-child(2) dd").css("cursor", "pointer").on("click", async function () {
    const email = "ywjjdy0330@gmail.com";
    try {
      await navigator.clipboard.writeText(email);
      alert(`이메일이 복사되었습니다: ${email}`);
    } catch (err) {
      console.error("복사 실패:", err);
    }
  });

  // 7. 헤더 메뉴 스크롤 스파이 (Scroll Spy)
  const $headerLinks = $("header .header_i nav ul li a");
  const $sections = $("section");

  $(window).on("scroll", function () {
    const currentPos = $(this).scrollTop() + 100;

    $sections.each(function () {
      const top = $(this).offset().top;
      const bottom = top + $(this).outerHeight();
      const id = $(this).attr("id");

      if (currentPos >= top && currentPos < bottom) {
        $headerLinks.removeClass("active");
        $headerLinks.filter(`[href="#${id}"]`).addClass("active");
      }
    });
  });

  // 8. 스크롤 시 헤더 숨김/표시 (Smart Header)
  let lastScrollTop = 0;
  const $header = $("header");

  $(window).on("scroll", function() {
    let currentScroll = $(this).scrollTop();

    // 스크롤을 내리고 있고 & 현재 위치가 헤더 높이보다 아래라면 -> 숨김
    if (currentScroll > lastScrollTop && currentScroll > 80) {
      $header.addClass("hide");
    } 
    // 스크롤을 올리고 있거나 & 최상단에 도달했다면 -> 보임
    else {
      $header.removeClass("hide");
    }

    // 현재 스크롤 위치를 '이전 위치'로 저장 (다음 번 비교를 위해)
    lastScrollTop = currentScroll;
  });
});