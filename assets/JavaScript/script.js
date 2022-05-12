const wipeDiv = document.querySelector('.wipe');

function wipe() {
    wipeDiv.className = 'wipe start-wipe';
    setTimeout(function() {wipeDiv.className = 'wipe'}, 3000);
}

document.querySelector('.my-name').addEventListener('click', wipe);