//header click
const navLinks = document.querySelectorAll('header nav ul li .nav-item');

navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        navLinks.forEach(otherLink => otherLink.classList.remove('text-my-red'));
        navLinks.forEach(otherLink => otherLink.classList.remove('text-white'));
        navLinks.forEach(otherLink => otherLink.classList.add('text-white'));
        event.target.classList.add('text-my-red');
        event.target.classList.remove('text-white');
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
        }, 100);
    });
}

countUpNumbers()
setInterval(countUpNumbers, 11000)

//infinite loop
// Configurations
const config = {
  scrollerSpeed: 3, // seconds
  scrollerTransitionSpeed: 2, // seconds, must be <= scrollerSpeed
};

function updateScrollerItemsViewable() {
  if (window.innerWidth >= 1024) {
    return 4;
  } else {
    return 3;
  }
}

function initializeScroller(containerSelector, groupClass) {
  const $container = $(containerSelector);
  const $articles = $container.find('> article');

  // Clone elements to enable infinite scroll
  const scrollerItemsHTML = $articles.map((_, el) => $(el).prop('outerHTML')).get().join('');
  $container.html(scrollerItemsHTML);

  // Wrap items in a specific group class to avoid conflicts
  $container.find('> article').wrapAll(`<div class="${groupClass}" />`);
  const $scrollerGroup = $container.find(`.${groupClass}`);

  return { $container, $scrollerGroup };
}

function setupScroller(scroller, itemsViewable) {
  const { $container, $scrollerGroup } = scroller;

  const scrollerWidth = $container.width();
  const itemWidth = scrollerWidth / itemsViewable;
  const scrollerCount = $scrollerGroup.find('> article').length;

  $scrollerGroup.find('> article').css({
    width: `${itemWidth}px`,
    transition: `margin ${config.scrollerTransitionSpeed}s`,
  });
  $scrollerGroup.css('width', `${scrollerCount * itemWidth}px`);

  scroller.itemWidth = itemWidth;
  scroller.leftMargin = -itemWidth;
}

function startScroller(scroller) {
  const { $scrollerGroup } = scroller;

  function rotate() {
    const $first = $scrollerGroup.find('> article:first-child');
    $first.css('margin-left', `${scroller.leftMargin}px`);

    setTimeout(() => {
      $first.css('margin-left', '0');
      $scrollerGroup.append($first);
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

// On document ready
$(document).ready(() => {
  initializeResponsiveScroller();

  // Debounce resize to avoid frequent updates
  let resizeTimeout;
  $(window).resize(() => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => initializeResponsiveScroller(), 200);
  });
});
