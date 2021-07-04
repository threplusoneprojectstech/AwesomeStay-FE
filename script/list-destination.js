var CartItems = []
var OrderList = []
var DestItems = []
var AddOnItems = []
function disabledest(){
    var d = document.getElementsByClassName("btn-dest-add")
    console.log(d)
    for(var i=0; i<d.length; i++){
        console.log(i)
        d[i].disabled = true;
    }
}
function AddDestinationCallback(id_val){
    let doc = document.getElementById("stuffs-list");
    DestItems.forEach(element=>{
        if(element.key == id_val){
            doc.innerHTML += `<p>> [Destination] ${element.name}</p>`
            disabledest();
            OrderList.push(element.key)
            return;
        }
    });
    
}
function AddAdonCallback(id_val){
    let doc = document.getElementById("stuffs-list");
    AddOnItems.forEach(element=>{
        if(element.key == id_val){
            doc.innerHTML += `<p>> [AddOn] ${element.name}</p>`
            OrderList.push(element.key)
            return;
        }
    });
    document.getElementById("btn-dest-add").disabled = true;
}
function DestinationBuilder(thumbnailUrl, title, price, location, id){
    return `
    <div class="card">
        <img class="card-img-top" src="${thumbnailUrl}" alt="Card image cap" />
        <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <img class="rating" src="../assets/images/common/rating/5.png"/> (5.0)
            <br>
            <div class="card-text">
                <div class="price">
                    Rp. ${price}/night
                </div>
                <br>
                <p class="card-text-sub">Location</p>
                <b><div class="location">
                    ${location}
                </div></b>
                <br>
                <button type="button" id="btn-dest-add" class="btn btn-x btn-dest-add" value="${id}" onclick="AddDestinationCallback(this.value)" > Add </button>
            </div>
        </div>
    </div>
    `
}
function AddOnBuilder(thumbnailUrl, title, price, id){
    return `
    <div class="card">
        <img class="card-img-top" src="${thumbnailUrl}" alt="Card image cap" />
        <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <br>
            <div class="card-text">
                <div class="price">
                    Rp. ${price}/pax
                </div>
                <br>
                <button type="button" class="btn btn-x" value="${id}" onclick="AddAdonCallback(this.value)" id="btn-maj"> Add </button>
            </div>
        </div>
    </div>
    `
}

var settings = {
    "url": "https://awesome-stay-api.herokuapp.com/product/getpages",
    "method": "POST",
    "timeout": 0,
    "headers": {
        "Content-Type": "application/json"
    },
    "data": JSON.stringify({
        "pageNumber":1,
        "pageSize":30
    }),
};
// console.log(settings);
$.ajax(settings).done(function (response) {
    if(response.status == 1){
        let items = response.result.items;
        let doc = document.getElementById("destination-container-box");
        let doc2 = document.getElementById("addon-container-box");
        items.forEach(element => {
            if(element.facility[0] !== "addon"){
                let this_id = element._id;
                let name = element.productName
                DestItems.push({"key":this_id, "name":name});
                doc.innerHTML+=DestinationBuilder(
                    element.thumbnailUrl,
                    element.productName,
                    element.price,
                    element.location,
                    element._id
                )
            }
            else{
                let this_id = element._id;
                let name = element.productName
                AddOnItems.push({"key":this_id, "name":name});
                doc2.innerHTML+=AddOnBuilder(
                    element.thumbnailUrl,
                    element.productName,
                    element.price,
                    element._id
                )
            }
        });
    }
    else{
        
        alert(response.message);
        return;
    }
});

function InsertTrans(){
    if(OrderList.length == 0){
        alert("no item selected");
        return;
    }
    var maketransset = {
        "url": "https://awesome-stay-api.herokuapp.com/transaction/insert",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "email":"admincreate@gmail.com",
            "orders":OrderList
        }),
    };
    $.ajax(maketransset).done(function (response) {
        if(response.status == 1){
            let _txid = response.result._id;
            // let url = "http://127.0.0.1:5500/pages/checkout.html?trx="+_txid;
            let url = "https://awesome-stay.netlify.app/pages/checkout.html?trx="+_txid;
            document.getElementById("finalize-section").innerHTML += ("<br><br><br><br><h3>" +url+ "</h3>");
            let d = document.getElementsByClassName("btn")
            for(let i=0; i<d.length; i++) d[i].disabled=true;
        }
        else{
            alert(response.message);
            return;
        }
    });
}