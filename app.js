const form = document.querySelector(".contact-form")
const submit = document.querySelector("#submit")
const nameerror = document.querySelector("#name-error")
const emailerror = document.querySelector("#email-error")
const companyerror = document.querySelector("#company-error")
const messageerror = document.querySelector("#message-error")
const resetbutton = document.querySelector("#reset")
submit.addEventListener('click', e => {
    e.preventDefault()
    const ifNameValid=validateName();
    const ifEmailValid= validateEmail();
    const ifCompanyValid=validateCompanyName()
    const ifMessageValid=validateMessage()
    if (ifNameValid && ifEmailValid && ifCompanyValid && ifMessageValid) {
        var hash = CryptoJS.MD5(form.email.value)
        document.cookie = "email" + "=" + hash
        localStorage.setItem("email", hash);
        sessionStorage.setItem("email", hash);
        console.log(document.cookie)
        alert("The form has been submitted");
    }
})
form.full_name.addEventListener('keyup', e => {
    validateName()
})
form.email.addEventListener('keyup', e => {
    validateEmail()
})
form.company.addEventListener('keyup', e => {
    validateCompanyName()
})
form.message.addEventListener('keyup', e => {
    validateMessage()
})
resetbutton.addEventListener('click', e => {
    sessionStorage.removeItem("email")
    localStorage.removeItem("email")
    deleteAllCookies()
})
function deleteAllCookies() {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    console.log(document.cookie)
};
function validateName() {
    const username = form.full_name.value
    const usernamepattern = /^[A-Za-z ]+$/
    var nameerrormessage = ""
    if (username === "" || username === null) {
        nameerrormessage = "Name is required"
    }
    if (username.length > 0 && usernamepattern.test(username) === false) {
        nameerrormessage = "Name cannot contain number"
    }
    if (nameerrormessage.length > 0) {
        nameerror.innerHTML = nameerrormessage
        nameerror.style.display = "block";
        return false
    }
    else {
        nameerror.style.display = "none";
        return true
    }
}
function validateEmail() {
    const email = form.email.value
    const emailpattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    var emailerrormessage = ""
    if (email === '' || email == null || email.length <= 0) {
        emailerrormessage = "Email is required"
    }
    if (email.length > 0 && emailpattern.test(String(email).toLowerCase()) === false) {
        emailerrormessage = "Incorrect Email format"
    }
    if (emailerrormessage.length > 0) {
        emailerror.innerHTML = emailerrormessage
        emailerror.style.display = "block";
        return false
    }
    else {
        emailerror.style.display = "none";
        return true
    }
}
function validateCompanyName() {
    const comapany = form.company.value
    var companyerrormessage = ""
    if (comapany === '' || comapany == null || comapany.length <= 0) {
        companyerrormessage = "Comapany name is required"
    }
    if (companyerrormessage.length > 0) {
        companyerror.innerHTML = companyerrormessage
        companyerror.style.display = "block";
        return false
    }
    else {
        companyerror.style.display = "none";
        return true
    }
}

function validateMessage() {
    const message = form.message.value
    var messageerrormessage = ""
    if (message === '' || message == null || message.length <= 0) {
        messageerrormessage = "Message is required"
    }
    if (message.length > 0 && message.length < 20) {
        messageerrormessage = "Please lengthen the message to 20 characters or more "
    }
    if (messageerrormessage.length > 0) {
        messageerror.innerHTML = messageerrormessage
        messageerror.style.display = "block";
        return false
    }
    else {
        messageerror.style.display = "none";
        return true
    }
}