// Part 1 - Smooth scrolling
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        const section = document.querySelector(link.getAttribute('href'));
        if (section) {
            event.preventDefault();
            section.scrollIntoView({ behavior: 'smooth' });
            navLinks.forEach((item) => item.classList.remove('active'));
            link.classList.add('active');
        }
    });
});

// Part 2 - Project filters
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        filterButtons.forEach((item) => item.classList.remove('active'));
        button.classList.add('active');

        const category = button.dataset.filter;
        projectCards.forEach((card) => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Part 3 - Mobile menu
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', navMenu.classList.contains('active'));
});

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
    });
});

// Part 4 - Animate skill bars when scrolling to the skills section
const skillBars = document.querySelectorAll('.skill-progress');
const skillsSection = document.querySelector('#skills');
let skillsAnimated = false;

function animateSkills() {
    if (skillsAnimated) return;

    const sectionTop = skillsSection.getBoundingClientRect().top;
    if (sectionTop < window.innerHeight - 100) {
        skillBars.forEach((bar) => {
            bar.style.width = bar.style.getPropertyValue('--skill-level');
        });
        skillsAnimated = true;
    }
}

window.addEventListener('scroll', animateSkills);
animateSkills();

// Part 5 - Contact form validation
const contactForm = document.querySelector('#contact-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');
const formStatus = document.querySelector('#form-status');
const inputs = [nameInput, emailInput, messageInput];

function showError(input, message) {
    const oldError = input.parentElement.querySelector('.error-message');
    if (oldError) oldError.remove();

    if (message) {
        const errorText = document.createElement('span');
        errorText.classList.add('error-message');
        errorText.textContent = message;
        input.parentElement.appendChild(errorText);
        input.classList.add('error');
        input.classList.remove('success');
    } else {
        input.classList.remove('error');
        input.classList.add('success');
    }
}

function validateInput(input) {
    const value = input.value.trim();
    let error = '';

    if (input === nameInput && value.length < 2) {
        error = 'Please enter your name.';
    } else if (input === emailInput && !/^\S+@\S+\.\S+$/.test(value)) {
        error = 'Please enter a valid email.';
    } else if (input === messageInput && value.length < 10) {
        error = 'Message should be at least 10 characters.';
    }

    showError(input, error);
    return error === '';
}

inputs.forEach((input) => {
    input.addEventListener('input', () => {
        validateInput(input);
        formStatus.textContent = '';
    });
});

contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let isValid = true;

    inputs.forEach((input) => {
        if (!validateInput(input)) isValid = false;
    });

    if (isValid) {
        formStatus.textContent = 'Form is valid! This is just a demo, so no message was sent.';
        contactForm.reset();
        inputs.forEach((input) => input.classList.remove('success'));
    } else {
        formStatus.textContent = 'Please fix the errors above.';
    }
});
