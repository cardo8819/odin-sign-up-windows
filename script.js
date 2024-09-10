const imageWrapperImg = document.querySelectorAll("#image-wrapper .background-img");
console.log(imageWrapperImg)
const imageWrapper = document.querySelector("#image-wrapper");
const authorLink = document.querySelector(".author-link");
let imageIndex = 0;
var authorData = [
    {
        name: "Jacob Mejicanos",
        href: "https://unsplash.com/@jacobmejicanos"
    },
    {
        name: "Zulmaury Saavedra",
        href: "https://unsplash.com/@zulmaury"
    },
    {
        name: "Ayo Ogunseinde",
        href: "https://unsplash.com/@armedshutter"
    }
];

/// image display loop
function changeImage() {
    imageWrapperImg[imageIndex].classList.remove("showing");
    imageIndex++;
    if (imageIndex >= imageWrapperImg.length) {
        imageIndex = 0;
    }
    authorLink.textContent = authorData[imageIndex].name;
    authorLink.href = authorData[imageIndex].href;
    imageWrapperImg[imageIndex].classList.add("showing");
    
}


setInterval(() => {
    const computedStyle = window.getComputedStyle(imageWrapper);
    if (computedStyle.display !== "none") {
        changeImage();
    }
}, 5000);

const signUpForm = document.querySelector("#sign-up-form");
const fullName = document.querySelector("#full-name");
const fullNameError = document.querySelector(".name");
const email = document.querySelector("#email");
const emailError = document.querySelector(".email");
const phoneError = document.querySelector(".phone");
const phone = document.querySelector("#phone");
const password = document.querySelector("#password");
const passwordSecurityBtn = document.querySelector(".eye")
const confirmPassword = document.querySelector("#confirm-password");
const confirmPasswordError = document.querySelector(".confirm-password")
const emailValidRegex = /^\s*[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\s*$/g;
const phoneValidRegex = /^\s*0\d{10}/g;
const passwordError1 = document.querySelector(".line1");
const passwordError2 = document.querySelector(".line2");
const passwordError3 = document.querySelector(".line3");
const inputs = [fullName, email, phone, password, confirmPassword];
let eye = false;

function toggleSecurityBtn() {
    eye = !eye;
    passwordSecurityBtn.textContent = eye ? "visibility" : "visibility_off";
    password.type = eye ? "text" : "password";
}

passwordSecurityBtn.addEventListener("click", toggleSecurityBtn);

inputs.forEach((item) => {
    item.addEventListener("focusin", (e) => {

        const selectedInput = e.target.id;
        if (selectedInput !== "password" && eye) {
            eye = false;
            passwordSecurityBtn.textContent = "visibility_off";
            password.type = "password";
        }
        if (selectedInput === "email") {
            email.style.borderBottom = "2px solid grey";
            email.classList.remove("invalid");
            emailError.style.opacity = "0";
        }
        else if (selectedInput === "full-name") {
            fullName.style.borderBottom = "2px solid grey";
            fullName.classList.remove("invalid");
            fullNameError.style.opacity = "0";
        }
        else if (selectedInput === "phone") {
            phone.style.borderBottom = "2px solid grey";
            phone.classList.remove("invalid");
            phoneError.style.opacity = "0";
        }
        else if (selectedInput === "password") {
            passwordError1.style.opacity = "1";
            passwordError2.style.opacity = "1";
            passwordError3.style.opacity = "1";
            password.style.borderBottom = "2px solid grey";
        }

    })
    item.addEventListener("focusout", () => {
        validateInput(item.id);
    })
})

function validateInput(input) {
    switch (input) {
        case "full-name":
            if (fullName.value.length > 0 && fullName.value.length < 3) {
                fullNameError.style.opacity = "1";
                fullName.style.borderBottom = "2px solid red";
                fullName.classList.add("invalid");
            }
        case "email":
            if (email.value.length > 0 && !emailValidRegex.test(email.value)) {
                emailError.style.opacity = "1";
                email.style.borderBottom = "2px solid red";
                email.classList.add("invalid");
            }
            if (emailValidRegex.test(email.value)) {
                emailError.style.opacity = "0";
            }
            break;
        case "phone":
            if (phone.value.length > 0 && !phoneValidRegex.test(phone.value)) {
                phoneError.style.opacity = "1";
                phone.style.borderBottom = "2px solid red";
                phone.classList.add("invalid");
            }
            if (phoneValidRegex.test(phone.value)) {
                phoneError.style.opacity = "0";
            }
            break;
        case "password":
            passwordError1.style.opacity = "0";
            passwordError2.style.opacity = "0";
            passwordError3.style.opacity = "0";
            if (password.classList.contains("invalid")) {
                password.style.borderBottom = "2px solid red"
            }
            break;
    }
}

password.addEventListener("input", () => {
    const passwordConditionsTest = {
        "lengthValid": false,
        "numberValid": false,
        "upperCaseValid": false
    }
    const passwordValue = password.value;

    if (passwordValue.length >= 7 && passwordValue.length < 21) {
        passwordError1.style.color = "green";
        passwordConditionsTest.lengthValid = true;
    }
    else {
        passwordError1.style.color = "red";
        passwordConditionsTest.lengthValid = false;
    }
    if (/\d+/.test(password.value)) {
        passwordError3.style.color = "green";
        passwordConditionsTest.numberValid = true;
    }
    else {
        passwordError3.style.color = "red";
        passwordConditionsTest.numberValid = false;
    }
    if (/[A-Z]+/.test(password.value)) {
        passwordError2.style.color = "green";
        passwordConditionsTest.upperCaseValid = true;
    }
    else {
        passwordError2.style.color = "red";
        passwordConditionsTest.upperCaseValid = false
    }

    const allTrue = Object.values(passwordConditionsTest).every(value => value === true);

    if (allTrue) {
        password.classList.remove("invalid");
    } else {
        password.classList.add("invalid");
    }
})
///form validation
const submit = (e) => {
    e.preventDefault();
    if (confirmPassword.value !== password.value) {
        confirmPasswordError.style.opacity = "1";
        confirmPasswordError.style.color = "red";
        confirmPassword.classList.add("invalid");
    }
    else if (password.classList.contains("invalid")) {
        passwordError1.style.opacity = "1";
        passwordError2.style.opacity = "1";
        passwordError3.style.opacity = "1";
        password.style.borderBottom = "2px solid red";

    }
    else {
        confirmPassword.classList.remove("invalid");
        confirmPasswordError.style.opacity = "0";
    };
    const isFormInvalid = inputs.some((input) => input.classList.contains("invalid"));

    if (isFormInvalid) {
        console.log("Form not submitted");
        e.preventDefault();
    } else {
        setTimeout(() => {
            console.log("form submitted")
            window.location.reload();
        }, 3000);
    }

}

signUpForm.addEventListener("submit", submit);