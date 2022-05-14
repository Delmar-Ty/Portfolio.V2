const wipeDiv = document.querySelector('.wipe');
const formInputs = document.querySelectorAll('.form-input');

//Triggers the animation used to mask the changing of
function wipe() {
    wipeDiv.className = 'wipe start-wipe';
    setTimeout(function() {wipeDiv.className = 'wipe'}, 3000);
}

document.querySelector('.my-name').addEventListener('click', wipe);


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

formInputs.forEach(function(el) {
    el.addEventListener('focus', function() {
        this.nextElementSibling.style.transform = 'translateY(-150%)';
    });
});