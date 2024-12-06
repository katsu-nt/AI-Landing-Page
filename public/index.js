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