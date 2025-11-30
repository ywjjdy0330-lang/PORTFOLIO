document.addEventListener("DOMContentLoaded", function () {
  // 1. 요소 선택
  const tabLinks = document.querySelectorAll("#portfolio .left nav ul li a");
  const tabLis = document.querySelectorAll("#portfolio .left nav ul li");
  const tabContents = document.querySelectorAll(".pf_item");
  const arrow = document.querySelector("#portfolio .left nav .arrow");
  const navUl = document.querySelector("#portfolio .left nav ul");

  // 2. 탭 활성화 함수
  function activateTab(index) {
    // 2-1. 모든 메뉴의 active 클래스 제거
    tabLis.forEach((li) => li.classList.remove("active"));

    // 2-2. 클릭한 메뉴에 active 클래스 추가
    const activeLi = tabLis[index];
    activeLi.classList.add("active");

    // 2-3. 본문 컨텐츠 교체 (모두 숨기고 해당 인덱스만 보임)
    tabContents.forEach((content) => (content.style.display = "none"));
    
    // a태그의 href값(예: #bbq)을 가져와서 아이디로 매칭
    const targetId = tabLinks[index].getAttribute("href").substring(1);
    const targetContent = document.getElementById(targetId);
    if (targetContent) {
      targetContent.style.display = "flex";
    }

    // 2-4. 화살표 위치 이동 로직
    moveArrow(activeLi);
  }

  // 3. 화살표 이동 계산 함수
  function moveArrow(targetLi) {
    // ul의 상단 여백이나 위치 고려
    // 화살표 top = (li의 ul 내 위치) + (ul의 시작 위치 보정) + (중앙 정렬 값)
    
    // 간단하게 offsetTop을 사용 (li가 relative 부모 기준 어디에 있는지)
    // ul의 padding-top 등이 있다면 감안해야 함. 여기서는 offsetTop이 가장 확실함.
    
    // ul이 nav 안에 있으므로, li의 offsetTop에 ul의 offsetTop을 더해줌
    const topPosition = targetLi.offsetTop + navUl.offsetTop;
    
    // 화살표 높이의 절반만큼 빼서 중앙 정렬 (화살표 크기 고려)
    // li 높이의 절반을 더해서 텍스트 중앙에 오게 함
    const centerAdjust = (targetLi.offsetHeight / 2) - (arrow.offsetHeight / 2);
    
    arrow.style.top = `${topPosition + centerAdjust}px`;
  }

  // 4. 클릭 이벤트 등록
  tabLinks.forEach((link, index) => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // a태그 페이지 점프 방지
      activateTab(index); // 탭 활성화 실행
    });
  });

  // 5. 초기 실행 (첫 번째 탭 활성화)
  // 페이지 로드 시 첫 번째 메뉴(BBQ)가 선택된 상태로 시작
  activateTab(0);
  
  // (선택사항) 브라우저 리사이즈 시 화살표 위치 재조정
  window.addEventListener('resize', () => {
      const activeLi = document.querySelector("#portfolio .left nav ul li.active");
      if(activeLi) moveArrow(activeLi);
  });
});

// [js/index.js 통합 최종본]

document.addEventListener("DOMContentLoaded", function () {
  // 1. 요소 선택
  const tabLinks = document.querySelectorAll("#portfolio .left nav ul li a");
  const tabLis = document.querySelectorAll("#portfolio .left nav ul li");
  const tabContents = document.querySelectorAll(".pf_item");
  const arrow = document.querySelector("#portfolio .left nav .arrow");
  const navUl = document.querySelector("#portfolio .left nav ul");

  // 햄버거 메뉴 관련 요소
  const hamburger = document.querySelector(".hamburger");
  const mobileNav = document.querySelector(".mobile_nav");
  const mobileLinks = document.querySelectorAll(".mobile_nav a"); 

  // 2. 탭 활성화 함수
  function activateTab(index) {
    tabLis.forEach((li) => li.classList.remove("active"));
    const activeLi = tabLis[index];
    activeLi.classList.add("active");

    tabContents.forEach((content) => (content.style.display = "none"));
    
    // href="#bbq" 같은 값에서 id 추출
    const targetHref = tabLinks[index].getAttribute("href");
    if(targetHref.startsWith("#")) {
        const targetId = targetHref.substring(1);
        const targetContent = document.getElementById(targetId);
        if (targetContent) {
            targetContent.style.display = "flex";
        }
    }

    // 화살표 이동 (약간의 딜레이)
    setTimeout(() => moveArrow(activeLi), 50);
  }

  // 3. 화살표 이동 계산 함수 (반응형 대응)
  function moveArrow(targetLi) {
    const isResponsive = window.innerWidth <= 1024; // 태블릿, 모바일 기준

    // 공통 로직 (세로 리스트 기준)
    const topPosition = targetLi.offsetTop + navUl.offsetTop;
    const centerAdjust = (targetLi.offsetHeight / 2) - (arrow.offsetHeight / 2);
    
    // top 위치 적용
    arrow.style.top = `${topPosition + centerAdjust}px`;

    // left/right 위치 보정 (필요시)
    if (isResponsive) {
       // 모바일에서는 CSS가 right 값을 제어하므로 JS는 관여 안 함 (또는 필요시 추가)
    } 
  }

  // 4. 포트폴리오 탭 클릭 이벤트
  tabLinks.forEach((link, index) => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); 
      activateTab(index); 
    });
  });

  // 5. 햄버거 버튼 클릭 이벤트
  if(hamburger) {
      hamburger.addEventListener("click", function() {
        this.classList.toggle("active"); // 햄버거 애니메이션
        mobileNav.classList.toggle("active"); // 메뉴 등장
      });
  }

  // 6. 모바일 메뉴 링크 클릭 시 닫기
  mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        mobileNav.classList.remove("active");
    });
  });

  // 7. 초기 실행
  activateTab(0);
  
  // 리사이즈 시 화살표 재조정
  window.addEventListener('resize', () => {
      const activeLi = document.querySelector("#portfolio .left nav ul li.active");
      if(activeLi) moveArrow(activeLi);
  });
});