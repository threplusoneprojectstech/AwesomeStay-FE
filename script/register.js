function DisableBtn(){ document.getElementById("submit-btn").disabled = true }
function EnableBtn(){ document.getElementById("submit-btn").disabled = false }
function ValidateName(){
    let fullName = document.getElementById("name-input").value;
    if(fullName.length <= 5){
        document.getElementById("invalid-name").innerHTML = "Name length must be more than 5";
        document.getElementById("invalid-name").style.color = "red";
        DisableBtn();
        return false;
    }
    else{
        document.getElementById("invalid-name").innerHTML = "_";
        document.getElementById("invalid-name").style.color = "rgba(255, 248, 248, 0.9)";
        EnableBtn();
        return true;
    }
}
function ValidateEmail(){
    let email = document.getElementById("email-input").value;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(email.toLowerCase())){
        document.getElementById("invalid-email").innerHTML = "Email format is invalid";
        document.getElementById("invalid-email").style.color = "red";
        DisableBtn();
        return false;
    }
    else{
        document.getElementById("invalid-email").innerHTML = "_";
        document.getElementById("invalid-email").style.color = "rgba(255, 248, 248, 0.9)";
        EnableBtn();
        return true;
    }
}
function ValidatePhone(){
    let phone = document.getElementById("phone-input").value;
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if(!re.test(phone)){
        document.getElementById("invalid-phone").innerHTML = "Phone format is invalid";
        document.getElementById("invalid-phone").style.color = "red";
        DisableBtn();
        return false;
    }
    else{
        document.getElementById("invalid-phone").innerHTML = "_";
        document.getElementById("invalid-phone").style.color = "rgba(255, 248, 248, 0.9)";
        EnableBtn();
        return true;
    }
}
function ValidatePassword(){
    let password = document.getElementById("password-input").value;
    if(password.length < 6){
        document.getElementById("invalid-password").innerHTML = "Password length must be more than 6";
        document.getElementById("invalid-password").style.color = "red";
        DisableBtn();
        return false;
    }
    else{
        document.getElementById("invalid-password").innerHTML = "_";
        document.getElementById("invalid-password").style.color = "rgba(255, 248, 248, 0.9)";
        EnableBtn();
        return true;
    }
}
function ValidatePassword2(){
    let password = document.getElementById("password-input").value;
    let password1 = document.getElementById("password2-input").value;
    if(password1 !== password){
        document.getElementById("invalid-password2").innerHTML = "Password does not match";
        document.getElementById("invalid-password2").style.color = "red";
        DisableBtn();
        return false;
    }
    else{
        document.getElementById("invalid-password2").innerHTML = "_";
        document.getElementById("invalid-password2").style.color = "rgba(255, 248, 248, 0.9)";
        EnableBtn();
        return true;
    }
}

function RegisterCallback(e){
    e.preventDefault();
    ValidateName();ValidateEmail();ValidatePhone();
    ValidatePassword(); ValidatePassword2();
    DisableBtn();
    if(ValidateName() && ValidateEmail() && ValidatePhone() &&
        ValidatePassword() && ValidatePassword2() ) EnableBtn();
    else return;
    
    let fullName = document.getElementById("name-input").value;
    let email = document.getElementById("email-input").value;
    let phone = document.getElementById("phone-input").value;
    let password = document.getElementById("password-input").value;
    var settings = {
        "url": "https://awesome-stay-api.herokuapp.com/auth/register",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "fullName": fullName,
            "email":email,
            "phone":phone,
            "debit":"",
            "password": password
        }),
    };
    console.log(settings);
    $.ajax(settings).done(function (response) {
        if(response.status == 1){
            window.localStorage.clear();
            // console.length(response);
            alert(response.message);
            window.location.href = "../index.html";
        }
        else{
            alert(response.message);
        }
    });
}

document.getElementById("regist-form").addEventListener("submit", RegisterCallback);