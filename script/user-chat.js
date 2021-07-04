function BuildChatHistory(){
    const email = window.localStorage.getItem("email");
    console.log(email);

    var settings = {
        "url": "https://awesome-stay-api.herokuapp.com/chat/get",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "email":email
        }),
    };

    $.ajax(settings).done(function (response) {
        if(response.status == 1){
            let result = response.result;
            console.log(result["chats"]);
            let chatArr = result["chats"];
            let doc = document.getElementById("chatbox-container-master")
            chatArr.forEach(element => {
                if(element["isUser"] === 1){
                    doc.innerHTML += BuildUserBubble(element["message"]);
                }
                else{
                    doc.innerHTML += BuildAdminBubble(element["message"]);
                }
            });
        }
        else{
            alert(response.message);
        }
    });
}

function BuildUserBubble(msg){
    let bubble = `
    <div class="col"></div>
    <div class="col user">
        <div class="right-chat">
            <p>${msg}</p>
        </div>
        <div class="left-chat">
            <div class="img-chat"></div>
            <label for="">User</label>
        </div>
    </div>
    `
    return bubble
}
function BuildAdminBubble(msg){
    let bubble = `
    <div class="col admin">
        <div class="left-chat">
            <div class="img-chat"></div>
            <label for="">Admin</label>
        </div>
        <div class="right-chat">
            <p>${msg}</p>
        </div>
    </div>
    <div class="col"></div>
    `
    return bubble;
}

BuildChatHistory();

function SendchatCallback(e){
    e.preventDefault();
    if(document.getElementById("chat-input-box").value == "") {alert("input cannot be empty"); return;}
    
    let msg = document.getElementById("chat-input-box").value;
    let email = window.localStorage.getItem("email");
    var settings = {
        "url": "https://awesome-stay-api.herokuapp.com/chat/send",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "email":email,
            "message":msg,
            "isUser":1
        }),
    };
    // console.log(settings);
    $.ajax(settings).done(function (response) {
        if(response.status == 1){
            // let res = response;
            document.getElementById("chatbox-container-master").innerHTML=""
            BuildChatHistory();
            return;
        }
        else{
            alert(response.message);
            return;
        }
    });
}
function rebuilChat(){
    document.getElementById("chatbox-container-master").innerHTML=""
    BuildChatHistory();
}

document.getElementById("submit-chat").addEventListener("submit", SendchatCallback);
setInterval(rebuilChat, 20000);