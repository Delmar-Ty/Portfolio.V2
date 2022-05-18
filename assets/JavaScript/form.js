const emailReg = /(\w+@)(\w+)([-\.]\w+)?\.(org|net|com)/;
const nameReg = /([a-zA-Z]+\s*)+/;
const specialReg = /[\+\*\?\^\$\\\[\]\{\}\(\)\|\/#%!&<>`~_=;:'"@0-9]+/g;
const form = {
    name: document.querySelector('.form-name'),
    email: document.querySelector('.form-email'),
    submit: document.querySelector('.form-submit'),
    msg: document.querySelector('#message'),
    valid: {
        nameValid: false,
        emailValid: false,
        msgValid: false
    },
    invalid: {
        nameInvalid: document.querySelector('.name-invalid'),
        emailInvalid: document.querySelector('.email-invalid'),
        msgInvalid: document.querySelector('.msg-invalid')
    }
}

//Validation Function
function validate(input) {
    if (input === 'name') {
        if (!form.name.value.match(specialReg) && form.name.value.match(nameReg)) {
            form.valid.nameValid = true;
            form.invalid.nameInvalid.style.opacity = 0;
        } else {
            form.valid.nameValid = false;
            form.invalid.nameInvalid.style.opacity = 1;
        }
    } else if (input === 'email') {
        if (form.email.value.match(emailReg)) {
            form.valid.emailValid = true;
            form.invalid.emailInvalid.style.opacity = 0;
        } else {
            form.valid.emailValid = false;
            form.invalid.emailInvalid.style.opacity = 1;

        }
    } else if (input === 'msg') {
        if (form.msg.value.length > 0) {
            form.valid.msgValid = true;
            form.invalid.msgInvalid.style.opacity = 0;
        } else {
            form.valid.msgValid = false;
            form.invalid.msgInvalid.style.opacity = 1;

        }
    }
}

form.name.addEventListener('blur', function() {
    validate('name');
});

form.email.addEventListener('blur', function() {
    validate('email');
});

form.msg.addEventListener('blur', function() {
    validate('msg');
});

form.submit.addEventListener('click', function() {
    if (form.valid.nameValid && form.valid.emailValid && form.valid.msgValid) {
        //Send the email
        Email.send({
            SecureToken : 'b3848527-4f24-459c-ab30-34b216c4b922',
            To : 'reliablesource13@gmail.com',
            From : 'dschro206@west-mec.org',
            Subject : `${form.name.value} is trying to contact you!`,
            Body : `I am ${form.name.value} and my email is ${form.email.value}
            
            ${form.msg.value}`
        }).then(() => {
            alert('Email Sent 😊');
            location.reload();
        }).catch(err => {
            alert(err);
            location.reload();
        });
    } else {
        //Inform the user of an invalid form
    }
});