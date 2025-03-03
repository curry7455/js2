var fname = document.querySelector("#first-name");
var fnerror = document.querySelector("#fn-error");
var lname = document.querySelector("#last-name");
var lnerror = document.querySelector("#ln-error");
var email = document.querySelector("#email");
var emailerror = document.querySelector("#email-error");
var phone = document.querySelector("#phone");
var phoneerror = document.querySelector("#phone-error");

var submit = document.querySelector(`input[type="button"]`);
var fvalidate = /^[a-zA-Z\-]+$/;
var evalidate = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
var pvalidate = /^(\+?\d{1,3})?[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

submit.addEventListener(`click`, (e) => {
    let correct = 0;

    if (!fvalidate.test(fname.value)) {
        fnerror.style.color = `red`;
        fnerror.innerHTML = `Must be a first name.`;
        console.log("error");
    } else {
        fnerror.innerHTML = ``;
        correct += 1;
    }

    if (!fvalidate.test(lname.value)) {
        lnerror.style.color = `red`;
        lnerror.innerHTML = `Must be a last name.`;
    } else {
        lnerror.innerHTML = ``;
        correct += 1;
    }

    if (!evalidate.test(email.value)) {
        emailerror.style.color = `red`;
        emailerror.innerHTML = `Must be a valid email.`;
        console.log("invalid email");
    } else {
        emailerror.innerHTML = ``;
        correct += 1;
    }

    if (!pvalidate.test(phone.value)) {
        phoneerror.style.color = `red`;
        phoneerror.innerHTML = `Must be a valid phone number.`;
    } else {
        phoneerror.innerHTML = ``;
        correct += 1;
    }

    console.log(correct);

    if (correct === 4) {
        var person = {
            fname: fname.value,
            lname: lname.value,
            email: email.value,
            phone: phone.value
        };

        document.querySelector("#form").style.display = `none`;
        document.querySelector("#confirmation").style.display = `block`;
        document.querySelector("#info").innerText = 
            `${person.fname} ${person.lname} \n ${person.email} \n ${person.phone}`;
    }
});
console.log(submit);
