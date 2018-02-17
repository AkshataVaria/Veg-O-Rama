// JavaScript source code
function displayItemDescription() {
    this.displaySelectedItemsFromCart();
    getPricing();
    var response;
    var productType;
    var imgSrc;
    var burgerAmt="";
    var parameters = location.search.substring(1).split("&");
    var temp = parameters[0].split("=");
    choice = unescape(temp[1]);

    var response = displaySelectedItem(choice);  

    for (var prop in response) {

        document.getElementById('tblHeader').innerHTML = response[prop].productType;
        document.getElementById('tblHeader').setAttribute('colspan', 3);

        const newRow = document.getElementById('tblDescription').appendChild(document.createElement('tr'));
        const rowId = 'cartRow' + Math.random();
        newRow.setAttribute('id', rowId);

        var divProductImg = document.createElement("img");
        divProductImg.src = response[prop].imageUrl;       
        divProductImg.style.height = "100px";

        newRow.appendChild(divProductImg);
        divProductImg.style.width ="15%"

        var code = response[prop].code;
        const productName = code + "." + response[prop].productName;
        var divProductName = document.createElement("a");
        var textnode = document.createTextNode(productName)

        divProductName.appendChild(textnode);

        const productDescription = response[prop].description;
        var divProductDesc = document.createElement("span");
        var textDesc = document.createTextNode(productDescription)
        divProductDesc.appendChild(textDesc);
        divProductDesc.style.background = "none";

        divProductName.appendChild(divProductDesc);
        newRow.appendChild(divProductName)
        divProductName.href = "javascript:openPopUp('" + code + "')"

        divProductName.style.textDecoration = "none";
        divProductName.style.className = "fontDescription"
        divProductName.style.color = "black";
        divProductName.style.width = "80%";
        var price;
        if (code == 'B1' || code == 'B2' || code == 'B3' || code == 'B4' || code == 'B5' || code == 'B6') {
            price = burgerAmt;
        }
        else {
            price = "$" + response[prop].price;
        }

        var divPrice = document.createElement("span"); /*I have changed this to span because it was inheriting style from #body .content div div and breaking the UI. It is a temporary fix*/
        var textnodePrice = document.createTextNode(price)
        divPrice.appendChild(textnodePrice);
        divPrice.style.background = "none";
        divPrice.className = "fontBold";
        divPrice.style.width = "5%";
        newRow.appendChild(divPrice);

    }
}

//Delete each row,on click of delete icon
function rowDelete(link) {
    var row = link.parentNode;
    var table = row.parentNode;
    table.removeChild(row);
}

//Display items in cart on the right hand side
function displaySelectedItemsFromCart() {
    //Since the user can select any number of items, creating the div's dynamically

    var response = sessionStorage.getItem("vegOramaCart");
    var result = JSON.parse(response);
    //Cartline is an array and will have multiple items, so looping through and fetching values from session to display inside div's.
    if (result) {
        console.log(result);
        result.cartLine.forEach((item, rowNumber) => {
            const newRow = document.getElementById('cartTableContents').appendChild(document.createElement('tr'));
            const rowId = 'cartRow' + rowNumber;
            newRow.setAttribute('id', rowId);
            var code = item.code;

            var btnMinus = document.createElement("img");
            btnMinus.src = "images/edit1.jpg";
            btnMinus.style.width = "15px"
            btnMinus.style.height = "18px";
            newRow.appendChild(btnMinus);

            btnMinus.onclick = function () {
                // decreaseQuantity(item.code)        
                // location.reload();
                openPopUp(code);

            };

            const productName = code + "." + item.productName;
            var divProductName = document.createElement("div");
            var textnode = document.createTextNode(productName)
            divProductName.appendChild(textnode);

            if (item.notes) {
                var notes = "[" + item.notes + "]";
                var divNotes = document.createElement("div");
                var textNotes = document.createTextNode(notes);
                divProductName.appendChild(textNotes);
            }

            newRow.appendChild(divProductName)
            divProductName.style.width = "60%";
            const quantity = item.qty;
            var divQty = document.createElement("div");
            var textnodeQty = document.createTextNode(quantity);
            divQty.appendChild(textnodeQty);
            newRow.appendChild(divQty)
            divQty.style.width = "20%"
            divQty.style.textAlign = "left";

            const price = "$" + item.price;
            var divPrice = document.createElement("div");
            var textnodePrice = document.createTextNode(price)
            divPrice.appendChild(textnodePrice);
            newRow.appendChild(divPrice)
            divPrice.style.width = "20%";
            divQty.style.textAlign = "center";

            var btnCancel = document.createElement("img");
            btnCancel.src = "images/DeleteNew.jpg";
            btnCancel.style.width = "10%"
            btnCancel.style.height = "25px";

            newRow.appendChild(btnCancel);
            btnCancel.style.borderRadius = "8px";

            btnCancel.onclick = function () {

                var rowId = newRow.id;
                deleteCartItem(rowId, item.code)
                rowDelete(this);
                clearCartAndRerender();
            }
        })
    }
    else {

        document.getElementById('dvShowNoitems').innerHTML = "Your bag is empty!";

    }


}
function clearCartAndRerender() {
    $('#cartTableContents tr').remove(); /*Hacky fix*/
    $('#cartPricing tr td div').html('');
    displaySelectedItemsFromCart();
    getPricing();
}
//Pricing options in separate table
function getPricing() {
    var response = sessionStorage.getItem("vegOramaCart");
    var result = JSON.parse(response);
    //Cartline is an array and will have multiple items, so looping through and fetching values from session to display inside div's.
    if (result) {
        const totalprice = "$" + result.totalPrice
     //   var divTotalPrice = document.createElement("div");
        var textnodeTotalPrice = document.createTextNode(totalprice)
        var divTotalPrice = document.getElementById('dvTotalPrice')
        divTotalPrice.appendChild(textnodeTotalPrice);
       
        const salestax = "$" + result.salesTax;   
        var textnodeSalesTax = document.createTextNode(salestax)
        divSalesTax = document.getElementById('dvSalesTax');       
        divSalesTax.appendChild(textnodeSalesTax);


        const finalTotalprice = "$" + result.finalTotal;   
        var textnodeTotalPrice = document.createTextNode(finalTotalprice)        
        divFinalTotalPrice = document.getElementById('dvFinalTotalPrice')
        divFinalTotalPrice.appendChild(textnodeTotalPrice);
        divFinalTotalPrice.className = "fontBold"
    }
}