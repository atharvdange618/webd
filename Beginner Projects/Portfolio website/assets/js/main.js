/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    })
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.getElementsByClassName('skills__content'),
    skillsHeader = document.querySelectorAll('.skills__header')


function toggleSkills() {
    let itemClass = this.parentNode.className

    for (i = 0; i < skillsContent.length; i++) {
        skillsContent[i].className = 'skills__content skills__close'
    }
    if (itemClass === 'skills__content skills__close') {
        this.parentNode.className = 'skills__content skills__open'
    }
}

skillsHeader.forEach((el) => {
    el.addEventListener('click', toggleSkills)
})

/*==================== QUALIFICATION TABS ====================*/
// Get references to the qualification buttons and content sections
const tabs = document.querySelectorAll('.qualification__button[data-target]');
const contentSections = document.querySelectorAll('.qualification__content[data-content]');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Get the target content ID from the clicked tab
        const targetContentId = tab.getAttribute('data-target');

        // Hide all content sections
        contentSections.forEach(section => {
            section.classList.remove('qualification__active');
        });

        // Show the content section corresponding to the clicked tab
        const targetContent = document.querySelector(targetContentId);
        if (targetContent) {
            targetContent.classList.add('qualification__active');
        }

        // Remove the 'qualification__active' class from all tabs
        tabs.forEach(t => {
            t.classList.remove('qualification__active');
        });

        // Add the 'qualification__active' class to the clicked tab
        tab.classList.add('qualification__active');
    });
});

// Set the default active state (you can choose which section to show by default)
tabs[0].click(); // This will make the "Education" tab active by default

/*==================== SERVICES MODAL ====================*/


/*==================== PORTFOLIO SWIPER  ====================*/


/*==================== TESTIMONIAL ====================*/


/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/


/*==================== CHANGE BACKGROUND HEADER ====================*/


/*==================== SHOW SCROLL UP ====================*/


/*==================== DARK LIGHT THEME ====================*/ 