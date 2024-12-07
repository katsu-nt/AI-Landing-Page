//header click
const navLinks = document.querySelectorAll('header nav ul li a');

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
// Number of items viewable at one time 
var scrollerItemsViewable = 4;
// Scroller speed in seconds
var scrollerSpeed = 3;
// Transition speed - must be <= scrollerSpeed
var scrollerTransitionSpeed = 2;

// Rebuild the element list to remove white space
var scrollerItemsEl = '';
$('.scrollerContainer > article').each(function(index) {
  //console.log( index + ": " + $( this ).text() );
  scrollerItemsEl += $(this).prop('outerHTML');
});
$('.scrollerContainer').html(scrollerItemsEl);

// Wrap items in a box that is as wide as the all the elements combined.
// This prevents the items from wrapping if wider than the scroller width
$('.scrollerContainer > article').wrapAll('<div class="scrollerGroup" />');
var scrollerCount = $('.scrollerContainer .scrollerGroup > article').length;
var scrollerItemWidth = parseInt($('.scrollerContainer').css('width')) / scrollerItemsViewable;
$('.scrollerContainer .scrollerGroup > article').css('width', scrollerItemWidth + 'px');
$('.scrollerContainer .scrollerGroup').css('width',scrollerCount * scrollerItemWidth + 'px');
$('.scrollerContainer .scrollerGroup > article').css('transition', 'margin ' + scrollerTransitionSpeed + 's');

// Set Starting Values
var scrollerLeftMargin = '-' + scrollerItemWidth + 'px';
var scrollerFirstItem = true;

scrollerAnimate(scrollerSpeed);

function scrollerAnimate(speed) {
  setInterval(scrollerRotate, speed * 1000);
}

function scrollerRotate() {
  if (scrollerFirstItem) {
    scrollerFirstItem = false;
  } else {
    $('.scrollerContainer .scrollerGroup').append($('.scrollerContainer .scrollerGroup article:first-child'));
  }
  $('.scrollerContainer .scrollerGroup > article').css('margin-left', '0');
  $('.scrollerContainer .scrollerGroup > article:first-child').css('margin-left', scrollerLeftMargin);
}




//loop-2
var scrollerItemsEl01 = '';
$('.scrollerContainer-02 > article').each(function(index) {
  //console.log( index + ": " + $( this ).text() );
  scrollerItemsEl01 += $(this).prop('outerHTML');
});
$('.scrollerContainer-02').html(scrollerItemsEl01);

// Wrap items in a box that is as wide as the all the elements combined.
// This prevents the items from wrapping if wider than the scroller width
$('.scrollerContainer-02 > article').wrapAll('<div class="scrollerGroup-02" />');
var scrollerCount01 = $('.scrollerContainer-02 .scrollerGroup-02 > article').length;
var scrollerItemWidth01 = parseInt($('.scrollerContainer').css('width')) / scrollerItemsViewable;
$('.scrollerContainer-02 .scrollerGroup-02 > article').css('width', scrollerItemWidth01 + 'px');
$('.scrollerContainer-02 .scrollerGroup-02').css('width',scrollerCount01 * scrollerItemWidth01 + 'px');
$('.scrollerContainer-02 .scrollerGroup-02 > article').css('transition', 'margin ' + scrollerTransitionSpeed + 's');

// Set Starting Values
var scrollerLeftMargin01 = '-' + scrollerItemWidth01 + 'px';
var scrollerFirstItem01 = true;

scrollerAnimate01(scrollerSpeed);

function scrollerAnimate01(speed) {
  setInterval(scrollerRotate01, speed * 1000);
}

function scrollerRotate01() {
  if (scrollerFirstItem01) {
    scrollerFirstItem01 = false;
  } else {
    $('.scrollerContainer-02 .scrollerGroup-02').append($('.scrollerContainer-02 .scrollerGroup-02 article:first-child'));
  }
  $('.scrollerContainer-02 .scrollerGroup-02 > article').css('margin-left', '0');
  $('.scrollerContainer-02 .scrollerGroup-02 > article:first-child').css('margin-left', scrollerLeftMargin01);
}
