var settings = {
    "url": "https://awesome-stay-api.herokuapp.com/chat/getall",
    "method": "GET",
    "timeout": 0,
    "headers": {
        "Content-Type": "application/json"
    }
};

$.ajax(settings).done(function (response) {
    if(response.status == 1){
        let result = response.result;
        console.log(result);
        let doc = document.getElementById("sec-chat");
        result.forEach(element => {
            doc.innerHTML+= ContainerBuilder(element["userEmail"]);
        });
    }
    else{
        alert(response.message);
    }
});

function ContainerBuilder(email){
    return `
    <div class="container">
        <a href="" style="text-decoration: none;"><div class="list-container">
            <div class="list-img"></div>
            <div class="list-desc">
                <h3 class="status">3 July 2021 - 5 July 2021</h3>
                <h1 class="name" style="color: black; font-size:20px;">The Highland Park Resort Bogor</h1>
            </div>
            <div style="text-decoration: none;">
                3 <i class="fas fa-male"></i>
            </div>
        </div></a>
    </div>
    `
}