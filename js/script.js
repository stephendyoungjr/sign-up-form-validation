//selects name input and focuses on it
const nameInput = document.getElementById('name');
nameInput.focus();


//Job Role Section 

//select title by id for ascending changes
const title = document.getElementById('title');
const otherJobRole = document.getElementById('other-job-role');

//other job role hidden set to true, making it hidden by defualt unless changed
otherJobRole.hidden = true;


//Add event listener for title change by target
title.addEventListener('change', (e) => {
// Target value is set to event target value 
    const targetVal = e.target.value;
//if target value is the 'other', do this 
    if (targetVal === 'other') {
// make other job roles visible by setting hidden to false
        otherJobRole.hidden = false;
    } else {
// if it does not equal 'other', hide other roles by setting hidden to true
        otherJobRole.hidden = true;
    }
})

//T-Shirt Selection Information

//Set variable to designs
const design = document.getElementById('design');
//Set variable to colors
const color = document.getElementById('color');

// color options becomes all color options, as the children are several different colors
const colorOptions = color.children;

//setting color variable to disabled 
color.disabled = true;

//adding event listener for design change
design.addEventListener('change', (e) => {
color.disabled = false;
//for loop cycles through color options
for(let i = 0; i< colorOptions.length; i++){
    //sets option to iterated color options, helps keep code clean and less redudant
    const option = colorOptions[i];
    //sets targetValue to value of actual target
    const targetValue = e.target.value;
    //color data is the value of the data-theme attribute
    const colorData = option.getAttribute('data-theme');
    //If target value is equal to color data
    if(targetValue === colorData){
    // show and make it selected
        option.hidden = false;
        option.setAttribute('selected', '');
        //if not true
    } else {
        //hide and do not select
         option.hidden = true;
         option.removeAttribute('selected');

    }


}

})


//Register for Activities Section

// get all activities
const activities = document.getElementById('activities');
//select the checkboxes within activities
const activitiesCheckboxes = activities.querySelectorAll('input[type="checkbox"]');
// get cost for actiivites 
const total = document.getElementById('activities-cost');
// provide total cost of all selected activities
let calculatedTotal = 0;

// add event listener 
activities.addEventListener('change', (e) => {
    // Cleaner code, less redundant with checkbox = e.target
    const checkbox = e.target;
    // turn cost into a int 
    const cost = parseInt(checkbox.getAttribute('data-cost'));

    if (checkbox.checked) {
        calculatedTotal += cost;
    } else {
        calculatedTotal -= cost;
    }

    total.textContent = `Total: $${calculatedTotal}`;
});


//Payment Information Section

//payment option set to variable
const paymentOptions = document.getElementById('payment');
//credit card option
const creditCard = document.getElementById('credit-card');
//paypal option
const paypal = document.getElementById('paypal');
paypal.hidden = true;

//bitcoin option
const bitcoin = document.getElementById('bitcoin');
bitcoin.hidden = true;

//payment option event listener, set credit card as default 
paymentOptions.children[1].setAttribute('selected','');
paymentOptions.addEventListener('change', (e) => {
creditCard.hidden = true;
paypal.hidden = true;
bitcoin.hidden = true;


const selectedPayment = document.getElementById(e.target.value);
selectedPayment.hidden = false;


})

//Form Validation

const email = document.getElementById('email');
const cardNumber = document.getElementById('cc-num');
const zip = document.getElementById('zip');
const cvv = document.getElementById('cvv');
const form = document.querySelector('form');

//helper function to add/remove valid/not-valid classes and show/hide the hint span
const markValidation = (parentElement, isvalid) => {
if(isvalid){
    parentElement.classList.add('valid');
    parentElement.classList.remove('not-valid');
    parentElement.lastElementChild.hidden = true;
} else {
    parentElement.classList.add('not-valid');
    parentElement.classList.remove('valid');
    parentElement.lastElementChild.hidden = false;
}
}

//helper functions to test each required field, each returns true or false

//name cannot have blanks, so trim 

const nameIsValid = () => {
return nameInput.value !== '';
}

//email myust have @ and domain 

const emailIsValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.value);
};


//at least one activity must be checked
function activitiesIsValid() {
    return Array.prototype.some.call(activitiesCheckboxes, (checkbox) => checkbox.checked);
}

//card number must be between 13-16 digits
function ccNumIsValid() {
    return /^\d{13,16}$/.test(cardNumber.value);
}

//zip code should be 5 digits 
function zipIsValid() {
    return /^\d{5}$/.test(zip.value);
}

//cvv has to be 3 digits
function cvvIsValid() {
    return /^\d{3}$/.test(cvv.value);
}

//checks whether credit card is the currently selected payment method
function isPayingWithCreditCard() {
    return paymentOptions.value === 'credit-card';
}

//listen for form submit
form.addEventListener('submit', (e) => {

    //test name field
    const nameValueValid = nameIsValid();
    console.log(nameInput.value);
    console.log(nameValueValid);
    markValidation(nameInput.parentElement, nameValueValid);
    if (!nameValueValid) {
        e.preventDefault();
    }

    //test email field
    const emailValueValid = emailIsValid();
    markValidation(email.parentElement, emailValueValid);
    if (!emailValueValid) {
        e.preventDefault();
    }

    //test activities section
    const activitiesValueValid = activitiesIsValid();
    markValidation(activities, activitiesValueValid);
    if (!activitiesValueValid) {
        e.preventDefault();
    }

    //only test credit card fields if credit card is the selected payment method
    if (isPayingWithCreditCard()) {

        const ccNumValueValid = ccNumIsValid();
        markValidation(cardNumber.parentElement, ccNumValueValid);
        if (!ccNumValueValid) {
            e.preventDefault();
        }

        const zipValueValid = zipIsValid();
        markValidation(zip.parentElement, zipValueValid);
        if (!zipValueValid) {
            e.preventDefault();
        }

        const cvvValueValid = cvvIsValid();
        markValidation(cvv.parentElement, cvvValueValid);
        if (!cvvValueValid) {
            e.preventDefault();
        }
    }
});


//Accessibility Section

console.log(activitiesCheckboxes);

//loop over each activity checkbox to add focus/blur listeners
for (let i = 0; i < activitiesCheckboxes.length; i++) {
    const checkbox = activitiesCheckboxes[i];

    //when checkbox is focused, add "focus" class to its parent label
    checkbox.addEventListener('focus', () => {
        checkbox.parentElement.classList.add('focus');
    });

    //when checkbox loses focus, remove "focus" class from its parent label
    checkbox.addEventListener('blur', () => {
        checkbox.parentElement.classList.remove('focus');
    });
}

