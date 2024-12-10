//header click
const navLinks = document.querySelectorAll('header nav ul li .nav-item');

navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        // Loại bỏ màu đỏ và đặt trắng cho tất cả các mục
        navLinks.forEach(otherLink => {
            otherLink.classList.remove('text-my-red');
            otherLink.classList.add('text-white');
        });

        // Thêm màu đỏ cho mục được nhấn
        event.currentTarget.classList.add('text-my-red');
        event.currentTarget.classList.remove('text-white');
    });
});


//count
function countUpNumbers() {
    const numberElements = document.querySelectorAll('.scope-number');

    numberElements.forEach(numberElement => {
        let targetNumber = parseInt(numberElement.textContent);
        let currentNumber = 0;

        const intervalId = setInterval(() => {
            currentNumber++;
            numberElement.textContent = currentNumber;

            if (currentNumber >= targetNumber) {
                clearInterval(intervalId);
            }
        }, 10);
    });
}

countUpNumbers()
setInterval(countUpNumbers, 12000)

//infinite loop
const config = {
  scrollerSpeed: 3, // seconds
  scrollerTransitionSpeed: 2, // seconds, must be <= scrollerSpeed
};

function updateScrollerItemsViewable() {
  return window.innerWidth >= 1024 ? 4 : 3;
}

function initializeScroller(containerSelector, groupClass) {
  const container = document.querySelector(containerSelector);
  const articles = Array.from(container.children);

  // Clone elements to enable infinite scroll
  const scrollerItemsHTML = articles.map(article => article.outerHTML).join('');
  container.innerHTML = scrollerItemsHTML;

  // Wrap items in a specific group class to avoid conflicts
  const wrapper = document.createElement('div');
  wrapper.className = groupClass;
  wrapper.innerHTML = container.innerHTML;
  container.innerHTML = '';
  container.appendChild(wrapper);

  const scrollerGroup = container.querySelector(`.${groupClass}`);
  return { container, scrollerGroup };
}

function setupScroller(scroller, itemsViewable) {
  const { container, scrollerGroup } = scroller;

  const scrollerWidth = container.offsetWidth;
  const itemWidth = scrollerWidth / itemsViewable;
  const scrollerCount = scrollerGroup.children.length;

  Array.from(scrollerGroup.children).forEach(article => {
    article.style.width = `${itemWidth}px`;
    article.style.transition = `margin ${config.scrollerTransitionSpeed}s`;
  });
  scrollerGroup.style.width = `${scrollerCount * itemWidth}px`;

  scroller.itemWidth = itemWidth;
  scroller.leftMargin = -itemWidth;
}

function startScroller(scroller) {
  const { scrollerGroup } = scroller;

  function rotate() {
    const firstChild = scrollerGroup.firstElementChild;
    firstChild.style.marginLeft = `${scroller.leftMargin}px`;

    setTimeout(() => {
      firstChild.style.marginLeft = '0';
      scrollerGroup.appendChild(firstChild);
    }, config.scrollerTransitionSpeed * 1000);
  }

  scroller.interval = setInterval(rotate, config.scrollerSpeed * 1000);
}

function resetScroller(scroller, itemsViewable) {
  clearInterval(scroller.interval);
  setupScroller(scroller, itemsViewable);
  startScroller(scroller);
}

function initializeResponsiveScroller() {
  const itemsViewable = updateScrollerItemsViewable();

  resetScroller(scroller1, itemsViewable);
  resetScroller(scroller2, itemsViewable);
}

// Initialize scrollers with unique group classes
let scroller1 = initializeScroller('.scrollerContainer', 'scrollerGroup');
let scroller2 = initializeScroller('.scrollerContainer-02', 'scrollerGroup-02');

// On DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeResponsiveScroller();

  // Debounce resize to avoid frequent updates
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => initializeResponsiveScroller(), 200);
  });
});
