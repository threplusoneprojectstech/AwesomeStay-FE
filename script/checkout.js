// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()

function ItemBuilder(itemName, price, itemId){
  return `
    <li class="list-group-item d-flex justify-content-between lh-sm">
        <div>
            <h6 class="my-0">${itemName}</h6>
            <small class="text-muted">Rp. ${price}</small>
        </div>
        <span class="text-muted"><a href="./details.html?iid=${itemId}">Details</a></span>
    </li>
  `
}

const urlParams = new URLSearchParams(window.location.search);
const trxId = urlParams.get('trx');
var TotalPrice = 0;
var settings = {
  "url": "https://awesome-stay-api.herokuapp.com/transaction/getspecific",
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
      res = response["result"];
      document.getElementById("itcountspan-blue").innerHTML = res.orders.length;
      res.orders.forEach(element => {
        var set = {
          "url": "https://awesome-stay-api.herokuapp.com/product/getdetails",
          "method": "POST",
          "timeout": 0,
          "headers": {
              "Content-Type": "application/json"
          },
          "data": JSON.stringify({
              "id":element
          }),
        };
        $.ajax(set).done(function(response){
          if(response.status == 1){
            result = response["result"];
            let itemName = result["productName"];
            let price = result["price"];
            let item_id = result["_id"];
            let doc = document.getElementById("itemlist-view");
            TotalPrice += price;
            document.getElementById("strongprice").innerHTML = "Rp. " + parseInt(TotalPrice);
            doc.innerHTML = doc.innerHTML+=ItemBuilder(itemName, price, item_id);
          }
          else{
            console.log(response);
          }
        })
      });
  }
  else{
    alert(response.message);
    return;
  }
});
