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
    const targetVal = e.target.value;
    if (targetVal === 'other') {
        otherJobRole.hidden = false;
    } else {
        otherJobRole.hidden = true;
    }

})