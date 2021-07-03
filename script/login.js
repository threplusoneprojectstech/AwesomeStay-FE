function DisableBtn(){ document.getElementById("submit-btn").disabled = true }
function EnableBtn(){ document.getElementById("submit-btn").disabled = false }

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
function ValidatePassword(){
    let password = document.getElementById("password-input").value;
    if(password.length < 6){
        document.getElementById("invalid-password").innerHTML = "Password seems to be too short";
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

function LoginCallback(e){
    e.preventDefault();
    ValidateEmail(); 
    ValidatePassword(); 
    DisableBtn();
    if(ValidateEmail() && ValidatePassword() ) EnableBtn();
    else return;
    
    let email = document.getElementById("email-input").value;
    let password = document.getElementById("password-input").value;
    var settings = {
        "url": "https://awesome-stay-api.herokuapp.com/auth/login",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "email":email,
            "password": password
        }),
    };
    // console.log(settings);
    $.ajax(settings).done(function (response) {
        if(response.status == 1){
            window.localStorage.clear();
            res = response["result"];
            console.log(res);
            window.localStorage.setItem("isAuthorized", 1);
            window.localStorage.setItem("token", res["token"]);
            window.localStorage.setItem("email", email);
            window.localStorage.setItem("password", password);
            window.localStorage.setItem("fullName", res["fullName"]);
            window.localStorage.setItem("userId",res["_id"]);
            window.location.href = "../index.html";
        }
        else{
            alert(response.message);
            return;
        }
    });
}

document.getElementById("login-form").addEventListener("submit", LoginCallback);