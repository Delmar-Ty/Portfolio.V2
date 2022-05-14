const wipeDiv = document.querySelector('.wipe');
const formInputs = document.querySelectorAll('.form-input');
const homeButton = document.querySelector('.home-button');

//Creates a way to easily access all the navigation buttons and for convenience has the same names as the page variable
const navMenu = {
    aboutPage: document.querySelector('.about'),
    workPage: document.querySelector('.work'),
    contactPage: document.querySelector('.contact')
}

//Allows a way to easily access each section tag used for the different 'pages'
const page = {
    homePage: document.querySelector('.home-page'),
    aboutPage: document.querySelector('.about-me'),
    workPage: document.querySelector('.my-work'),
    contactPage: document.querySelector('.contact-me')
}
let currentPage = 'homePage';

//Triggers the animation used to mask the changing of
function wipe() {
    wipeDiv.className = 'wipe start-wipe';
    setTimeout(function() {wipeDiv.className = 'wipe'}, 3000);
}

//Creates the transitions for the form inputs based on whether the form input is blank or not and positions the placeholder elements accordingly
formInputs.forEach(function(el) {
    el.addEventListener('blur', function() {
        let content = this.value;
        if (content.length > 0) {
            this.nextElementSibling.style.transform = 'translateY(-150%)';
        } else if (content.length === 0) {
            this.nextElementSibling.style.transform = 'translateY(0%)';
        }
    });
});

//Adding the event listener for each form input
formInputs.forEach(function(el) {
    el.addEventListener('focus', function() {
        this.nextElementSibling.style.transform = 'translateY(-150%)';
    });
});

//Navigation Functionality
//'element' is the target element aka the navigation button clicked which can either be the 'homeButton' or one of the property names in the 'page' variable
//'current' is the current page that has one of the property names in the 'page' variable
function navigate(element, current) {
    console.log(element, current);
        if (element === 'homeButton') {
            wipe();
            setTimeout(function() {
                page[current].style.display = 'none';
                page.homePage.style.display = 'block';
                homeButton.style.display = 'none';
                currentPage = 'homePage';
            }, 1500);
        } else {
            wipe();
            setTimeout(function() {
                page[current].style.display = 'none';
                page[element].style.display = 'block';
                homeButton.style.display = 'block';
                currentPage = element;
            }, 1500);
        }
}

//Event listener for each navigation button which includes the home button (my name in the corner)
homeButton.addEventListener('click', function() {
    navigate('homeButton', currentPage);
});
navMenu.aboutPage.addEventListener('click', function() {
    navigate('aboutPage', currentPage);
});
navMenu.workPage.addEventListener('click', function() {
    navigate('workPage', currentPage);
});
navMenu.contactPage.addEventListener('click', function() {
    navigate('contactPage', currentPage);
});