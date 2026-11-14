// 1. 모바일 메뉴 열기/닫기
const toggle = document.querySelector(".menu-toggle");
const navList = document.querySelector(".nav ul");

toggle.addEventListener("click", () => {
  const isOpen = navList.classList.toggle("open");
  toggle.setAttribute("aria-expanded", isOpen);
});

navList.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navList.classList.remove("open");
    toggle.setAttribute("aria-expanded", false);
  });
});

// 2. 스크롤하면 헤더에 그림자 + 현재 섹션 메뉴 강조
const header = document.querySelector("header");
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 10);

  let current = "";
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 100) current = section.id;
  });
  navList.querySelectorAll("a").forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
});

// 3. 메뉴 탭 (전체 / 커피 / 디저트)
const tabs = document.querySelectorAll(".tab");
const items = document.querySelectorAll(".menu-item");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    const filter = tab.dataset.filter;
    items.forEach((item) => {
      item.classList.toggle("hidden", filter !== "all" && item.dataset.category !== filter);
    });
  });
});

// 4. 지금 영업 중인지 표시 (월요일 휴무, 평일 08~21시, 주말 10~22시)
const status = document.querySelector(".open-status");
const now = new Date();
const day = now.getDay(); // 0=일, 1=월, ... 6=토
const hour = now.getHours();
const isWeekend = day === 0 || day === 6;
const [openHour, closeHour] = isWeekend ? [10, 22] : [8, 21];
const isOpen = day !== 1 && hour >= openHour && hour < closeHour;

status.textContent = isOpen ? "● 지금 영업 중이에요" : "● 지금은 영업 시간이 아니에요";
status.classList.add(isOpen ? "open" : "closed");

// 5. 스크롤하면 요소가 부드럽게 나타나기
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// 6. 푸터 연도 자동 표시
document.querySelector("#year").textContent = now.getFullYear();
