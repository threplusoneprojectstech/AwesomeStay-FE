const urlParams = new URLSearchParams(window.location.search);
const trxId = urlParams.get('iid');
var settings = {
    "url": "https://awesome-stay-api.herokuapp.com/product/getdetails",
    "method": "POST",
    "timeout": 0,
    "headers": {
        "Content-Type": "application/json"
    },
    "data": JSON.stringify({
        "id":trxId
    }),
  };

$.ajax(settings).done(function (response) {
    if(response.status == 1){
        let res = response.result;
        console.log(res);
        document.getElementById("productName").innerHTML = res["productName"]
        document.getElementById("rating").innerHTML = res["rating"]+`<img src="../assets/images/common/rating/5.png" alt="" srcset="">`
        document.getElementById("location").innerHTML = res["location"]
        document.getElementById("thumbnail").innerHTML = res["thumbnailUrl"]
        let doc = document.getElementById("more-pict")
        for(let i=0; i<res.morePictureUrl.length; i++){
            if(i==3) break;
            doc.innerHTML += `<img src="${res.morePictureUrl[i]}" class ="my-1" alt="">`
        }
        document.getElementById("description").innerHTML = res["description"]
        let doc2 = document.getElementById("facilities")
        res.facility.forEach(element => {
            doc2.innerHTML+= (element+"<br>")
        });
        if(res.facility.length<=1) doc2.innerHTML+="<br><br>"
        let doc3 = document.getElementById("reviews");
        res.userReview.forEach(element=>{
            doc3.innerHTML+= (`<div class="review">${element}</div>`)
        });
    }
    else{
        alert(response.message);
    }
});