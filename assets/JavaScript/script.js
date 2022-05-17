const wipeDiv = document.querySelector('.wipe');
const formInputs = document.querySelectorAll('.form-input');
const homeButton = document.querySelector('.home-button');
const toggleButton = {
    button: document.querySelector('.arrow-button'),
    toggled: false,
    default: document.querySelector('.arrow-button').className,
    animating: false
}
let animationPlaying = false;

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

let currentPage;

if (sessionStorage.getItem('currentPage') === null || sessionStorage.getItem('currentPage') === undefined) {
    sessionStorage.setItem('currentPage', 'homePage');
    page.homePage.style.display = 'block';
    page.aboutPage.style.display = 'none';
    page.workPage.style.display = 'none';
    page.contactPage.style.display = 'none';
    homeButton.style.display = 'none';
    currentPage = sessionStorage.getItem('currentPage');
} else {
    currentPage = sessionStorage.getItem('currentPage');
    page[currentPage].style.display = 'block';
    if (currentPage !== 'homePage') {
        homeButton.style.display = 'block';
    } else {
        homeButton.style.display = 'none';
    }
    for (const thing in page) {
        if (thing !== currentPage) {
            page[thing].style.display = 'none';
        }
    }
}

//Triggers the animation used to mask the changing of
function wipe() {
    animationPlaying = true;
    wipeDiv.className = 'wipe start-wipe';
    setTimeout(function() {
        wipeDiv.className = 'wipe';
        animationPlaying = false;
        }, 3000);
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
        if (element === 'homeButton') {
            wipe();
            setTimeout(function() {
                page[current].style.display = 'none';
                page.homePage.style.display = 'block';
                homeButton.style.display = 'none';
                currentPage = 'homePage';
                sessionStorage.setItem('currentPage', currentPage);
            }, 1500);
        } else {
            wipe();
            setTimeout(function() {
                page[current].style.display = 'none';
                page[element].style.display = 'block';
                homeButton.style.display = 'block';
                currentPage = element;
                sessionStorage.setItem('currentPage', currentPage);
            }, 1500);
        }
}

//Event listener for each navigation button which includes the home button (my name in the corner)
homeButton.addEventListener('click', function() {
    if (!animationPlaying) {
        navigate('homeButton', currentPage);
    }
});
navMenu.aboutPage.addEventListener('click', function() {
    if (!animationPlaying) {
        navigate('aboutPage', currentPage);
    }
});
navMenu.workPage.addEventListener('click', function() {
    if (!animationPlaying) {
        navigate('workPage', currentPage);
    }
});
navMenu.contactPage.addEventListener('click', function() {
    if (!animationPlaying) {
        navigate('contactPage', currentPage);
    }
});

//Toggle the animation for the name on the home page
toggleButton.button.addEventListener('click', function() {
    if (!toggleButton.animating) {
        toggleButton.animating = true;
        setTimeout(function() {toggleButton.animating = false}, 1000);
        if (toggleButton.toggled) {
            toggleButton.toggled = false;
            toggleButton.button.className = `${toggleButton.default} off`;
        } else {
            toggleButton.toggled = true;
            toggleButton.button.className = `${toggleButton.default} on`;
        }
    }
});