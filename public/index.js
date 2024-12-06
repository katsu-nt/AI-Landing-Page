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
setInterval(countUpNumbers,11000)