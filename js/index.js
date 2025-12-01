$(document).ready(function () {
  // ==========================================
  // 1. 변수 설정 (제이쿼리 객체로 캐싱)
  // ==========================================
  const $navItems = $("#portfolio .left nav ul li");
  const $navLinks = $("#portfolio .left nav ul li a");
  const $pfItems = $(".pf_item");
  const $arrow = $("#portfolio .left nav .arrow");
  const $hamburger = $(".hamburger");
  const $mobileNav = $(".mobile_nav");
  const $mobileLinks = $(".mobile_nav a");

  // ==========================================
  // 2. 탭 & 화살표 기능 (핵심!)
  // ==========================================
  function moveArrow($targetLi) {
    // 모바일(1024px 이하)에서는 화살표 움직임 계산 안 함
    if ($(window).width() <= 1024) return;

    // 화살표 위치 계산 (jQuery의 position() 사용하면 훨씬 간단함)
    // li의 위치값 + (li 높이 절반 - 화살표 높이 절반) = 중앙 정렬
    const topPos = $targetLi.position().top + ($targetLi.outerHeight() / 2) - ($arrow.outerHeight() / 2);

    $arrow.stop().animate({ top: topPos }, 300); // 부드럽게 이동
  }

  $navLinks.on("click", function (e) {
    e.preventDefault(); // 링크 이동 막기

    const $thisLi = $(this).parent("li"); // 클릭한 a 태그의 부모 li
    const targetId = $(this).attr("href"); // #bbq, #starbucks 등

    // 1) 탭 활성화 (형제들은 active 제거)
    $thisLi.addClass("active").siblings().removeClass("active");

    // 2) 내용 보여주기 (형제들은 숨김)
    // css('display', 'flex')를 줘서 레이아웃 유지
    $(targetId).css("display", "flex").siblings(".pf_item").hide();

    // 3) 화살표 이동
    moveArrow($thisLi);
  });

  // 초기화: 첫 번째 탭 강제 클릭 효과
  $navItems.eq(0).find("a").trigger("click");

  // 화면 크기 바뀔 때 화살표 위치 재조정 (디바운싱 적용)
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

  // 모바일 메뉴 링크 클릭 시 닫기
  $mobileLinks.on("click", function () {
    $hamburger.removeClass("active");
    $mobileNav.removeClass("active");
  });

  // ==========================================
  // 4. 픽셀 아트 애니메이션 (PORTFOLIO 글자)
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

  // 기존 내용 비우기
  $dotContainer.empty();

  const $textWrapper = $("<div>").addClass("pixel-text-container");

  // 글자 생성 루프
  $.each(textString.split(""), function (i, char) {
    const charGrid = charMap[char];
    if (!charGrid) return;

    const $charDiv = $("<div>").addClass("pixel-char");

    $.each(charGrid, function (rowIdx, row) {
      $.each(row, function (colIdx, col) {
        if (col === 1) {
          const randomX = (Math.random() - 0.5) * 2000;
          const randomY = (Math.random() - 0.5) * 2000;

          $("<div>")
            .addClass("pixel-dot")
            .css({ "--rx": randomX + "px", "--ry": randomY + "px" })
            .appendTo($charDiv);
        } else {
          $("<div>").appendTo($charDiv);
        }
      });
    });
    $textWrapper.append($charDiv);
  });

  $dotContainer.append($textWrapper);

  // 애니메이션 시작 (순차적으로 active 클래스 추가)
  setTimeout(function () {
    $(".pixel-dot").each(function () {
      const $dot = $(this);
      setTimeout(function () {
        $dot.addClass("active");
      }, Math.random() * 500);
    });
  }, 100);
});

// 스크롤 이벤트: 300px 이상 내렸을 때만 #top 버튼 보여주기
$(window).on("scroll", function () {
  if ($(this).scrollTop() > 300) {
    $("#top").fadeIn();
  } else {
    $("#top").fadeOut();
  }
});

// 초기 상태: 숨김 (CSS에서 #top { display: none; } 추가하거나 JS로 처음에 숨김)
$("#top").hide();