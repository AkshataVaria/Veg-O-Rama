var cartLine  = {
	productName : '',
	code: '',
	productType: '',
	qty :0,
	price : 0.0,
    notes :''
}

var cart = {
	cartLine:[],
	totalPrice: 0.0,
	discountInPercentage: 0.0,
	salesTax: 0.00,
    finalTotal: 0.0,
    totalQuantity: 0.0
}

//This singlr function is alone responsible for display images,item name and description based on menu type
function displaySelectedItem(menuType) {
    var itemsArray = [];   
    if (menuCategory[menuType]) {
        menuCategory[menuType].forEach(function (menuItemCode)  {
            var item = menuCard[menuItemCode]
            itemsArray.push(item);
        })
    }
    return itemsArray;
}




//After clicking Add to cart from pop up, fetch the menu item code, and other item code if any and call AddtoCart function
function getItemCode(){
    var code = document.getElementById('modalItemCode').innerText;  //If burger,get second burger by code and call AddtoCart
    if (code == 'B1' || code == 'B2' || code == 'B3' || code == 'B4' || code == 'B5' || code == 'B6') {
        //If user has not selected second burger,dont let them submit
        var getSecondBurger = addSecondBurgerPrice();
        if (getSecondBurger.length == 0) {
            alert("Choose secoond burger");

        }
        else if (getSecondBurger) {
            getSecondBurger.forEach(function (secBurgerCode) {
                this.addToCart(code);
                this.addToCart(secBurgerCode);
                this.hideModal();
              
            })
        }
        else {

        }
       
      
    } 
    
    else {// For all other items,except burger
        this.addToCart(code);
        this.hideModal();
       
      
    }
    var optionalItemCodes = getOptionalMenuItemCodes();
    if (optionalItemCodes) {
        optionalItemCodes.forEach(function (code) {
            this.addToCart(code);
        })


    }
    clearCartAndRerender();

}
//Depending on what items user has checked, create an array and push those codes in array
function getOptionalMenuItemCodes()
{
    var optionalMenuItems = [];
    var checkboxes = document.getElementsByName('typeOfAddOn');    
  
     for (let i = 0; i < checkboxes.length; i++)
      {
             if (checkboxes[i].checked)
               {
                   if(checkboxes[i].id=="chkPopper"){
                      optionalMenuItems.push("P1");
                   }
                   else if(checkboxes[i].id =="chkSamosa"){
                      optionalMenuItems.push("SA1")
                   }
                   else if(checkboxes[i].id =="chkFries"){
                    optionalMenuItems.push("FR1")
                 }
                 else if(checkboxes[i].id =="chkFritters"){
                    optionalMenuItems.push("FRT1")
                 }
               } 
     
     }
     return optionalMenuItems;
}


//Add items to cart depending on the code
function addToCart(code){	   
    if(menuCard[code]){       
   var cartLine = new Object();        
    cartLine.code = code;
    cartLine.productName = menuCard[code].productName;
    cartLine.productType = menuCard[code].productType;
    cartLine.qty = document.getElementById('modalItemQty').value;
    cartLine.price = menuCard[code].price;
    cartLine.notes = document.getElementById('txtNotes').value;
    var cartObj ;         
     
   
		if(typeof(Storage) !== "undefined") {
			if (sessionStorage.getItem( "vegOramaCart" )) {
				// cart already exists in the memory
				var cartValue = sessionStorage.getItem( "vegOramaCart" );
				cartObj = JSON.parse( cartValue );
				var found = false;
				for (i = 0; i < cartObj.cartLine.length && found == false; i++) {
					if(cartObj.cartLine[i].code == code){
                        cartObj.cartLine[i].qty = parseInt(cartObj.cartLine[i].qty) + parseInt(document.getElementById('modalItemQty').value);
                        cartObj.cartLine[i].notes = document.getElementById('txtNotes').value
						found = true; 
					}
				}

				if(!found){
					cartObj.cartLine.push(cartLine);
				}

				// Calculate Total Price , Sales Tax and Other Parameters
			} else {

				// create new object 
				cartObj = new Object();
                cartObj.cartLine = [cartLine];
                
                
            }

			cartObj = calculateTotalPrice(cartObj);
			var jsonStr = JSON.stringify( cartObj );
            sessionStorage.setItem("vegOramaCart", jsonStr);
            $('#dvShowNoitems').innerHTML = " ";
          
          
           
		} else {
			// error browser not supported
		}
    }
   
}


function navigate() {
    location.assign("checkOut.html");
}

function calculateTotalPrice(cartObj) {
    var totalPrice = 0.0;
    var totalQuantity = 0;
	for (i = 0; i < cartObj.cartLine.length ; i++) {
        totalPrice = cartObj.cartLine[i].price * cartObj.cartLine[i].qty + Number(totalPrice);
        totalQuantity = totalQuantity + cartObj.cartLine[i].qty;
	}
	cartObj.totalPrice = Number(totalPrice).toFixed(2); 
	cartObj.salesTax = (totalPrice * 0.06).toFixed(2) ; 
    cartObj.finalTotal = (Number(cartObj.totalPrice) + Number(cartObj.salesTax)).toFixed(2); 
    cartObj.totalQuantity = Number(totalQuantity).toFixed(2); 
	return cartObj; 

}
function removeFromTheCart(code) {
    var totalPrice = 0.0;
    var totalQuantity = 0;
    var cartValue = sessionStorage.getItem("vegOramaCart");
    var cartObj;
    cartObj = JSON.parse(cartValue);
    for (i = 0; i < cartObj.cartLine.length; i++)
    {
        if (cartObj.cartLine[i].code == code) {
            cartObj.cartLine.splice(cartObj.cartLine[i], 1);
            cartObj = calculateTotalPrice(cartObj);
           
        }
        else {
            delete cartObj;
        }
    }
  
    var jsonStr = JSON.stringify(cartObj)
    sessionStorage.setItem("vegOramaCart", jsonStr);
   

}

function decreaseQuantity(code) {
    var cartValue = sessionStorage.getItem("vegOramaCart");
    var cartObj;
    
    cartObj = JSON.parse(cartValue);
    var totalPrice = 0.0;
    var totalQuantity = 0;
    for (i = 0; i < cartObj.cartLine.length; i++) {
        if (cartObj.cartLine[i].code == code) {
            cartObj.cartLine[i].qty = cartObj.cartLine[i].qty - 1;
            cartObj = calculateTotalPrice(cartObj);
        }
        
    }
    var jsonStr = JSON.stringify(cartObj)
    sessionStorage.setItem("vegOramaCart", jsonStr);



}

function deleteCartItem(rowId, code) {
    var cartValue = sessionStorage.getItem("vegOramaCart");
    var cartObj;
    cartObj = JSON.parse(cartValue);
    for (i = 0; i < cartObj.cartLine.length; i++) {
        if (cartObj.cartLine[i].code == code) {
            cartObj.cartLine = cartObj.cartLine.splice(cartObj.cartLine[i], i);
            cartObj = calculateTotalPrice(cartObj);

        }
        else {
            delete cartObj;
        }
    }

    var jsonStr = JSON.stringify(cartObj)
    sessionStorage.setItem("vegOramaCart", jsonStr);
    
  
}

//Generate different HTML depending on the type of item
function openPopUp(code) {
   
    if(code == 'B1' || code=='B2'|| code == 'B3' || code=='B4' || code=='B5'||code=='B6')
    {   

       generateHtmlForBurgerPopUp(code);
        
    }
    else if (code == 'BP' || code == 'GF' || code == 'OC' || code=='PC'||code=='SM'|| code =='FL' || code=='BC')
    {   
       generateHtmlCustomizedItems(code);
    }
    else
    {
        generatePopUpHtmlForGenericItems(code);
       
    }
  
    
}


function generateHtmlCustomizedItems(code)
{
    generatePopUpHtmlForGenericItems(code);    
    var modal = document.getElementById('trCustomStyle');
    modal.style.display = "block";
   
    var modal1 = document.getElementById('trCustomExtra');
    modal1.style.display = "block";
}
function generateHtmlForBurgerPopUp(code)
{
    generatePopUpHtmlForGenericItems(code); 
    var burgerAdd = document.getElementById('modalBurgerLine'); 
    burgerAdd.style.display = "block";

    var burgerFirstExtra = document.getElementById('trBurgerFirst');
    burgerFirstExtra.style.display = "block";

    var burgerFirstCmtLbl = document.getElementById('trBurgerFirstCommentLabel');
    burgerFirstCmtLbl.style.display = "block";

    var burgerFirstComment = document.getElementById('trTxtFirstComment');
    burgerFirstComment.style.display = "block";


   
    var modal = document.getElementById('trBurgerItems');
    modal.style.display = "block";
    var modal1 = document.getElementById('trBurgerExtra');
    modal1.style.display = "block";
    

    
}
function generatePopUpHtmlForGenericItems(code)
{
    var modal = document.getElementById('myModal');
    modal.style.display = "block";
  
    if (menuCard[code]) {
      

        document.getElementById('modalItemName').innerHTML  = code +"."+ menuCard[code].productName;
        document.getElementById('modalItemDesc').innerHTML = menuCard[code].description;
        document.getElementById('modalItemCode').innerHTML = code;   
        if (code == 'B1' || code == 'B2' || code == 'B3' || code == 'B4' || code == 'B5' || code == 'B6') {

            document.getElementById('modalItemPrice').innerHTML = '$5.49'

        }
        else {
            document.getElementById('modalItemPrice').innerHTML = '$' + menuCard[code].price;
        }
        //Not sure about implementation yet,so commented
        //if (code == 'W1' || code == 'W2' || code == 'W3' || code == 'W4' || code == 'W5' || code == 'W6' || code =='W7') {
        //    if (menuCard[code] && menuCard[code].isCustomizable && menuCard[code].extraOptionAvailable) {
        //        var result = menuCard[code].extraOptions
        //        if (result) {
        //            const newRow = document.getElementById('tblPopUp').appendChild(document.createElement('tr'));
        //            result.forEach((item, colNumber) => {                       
        //                const column = newRow.appendChild(document.createElement('td'));
                       
        //                const colId = 'extraOptions' + colNumber;
        //                column.setAttribute('id', colId);
                    
        //                var checkbox = document.createElement('input');
        //                checkbox.type = "checkbox";
        //                checkbox.name = "extraOptions";
        //                checkbox.value = item.type;
        //                checkbox.id = colId + item.type;
        //                checkbox.style.width = "30px";
        //                var label = document.createElement('label')
        //                label.htmlFor = colId + item.type;
                       
        //                label.appendChild(document.createTextNode(item.type));
        //                label.style.width = "30px";
        //                column.appendChild(checkbox);
        //                column.appendChild(label);
                      
        //                newRow.appendChild(column);
        //                newRow.className = "ExtraStyle";
                      
        //            })
        //        }
                
        //    }
        //}
          
        
    }
    setPriceAddToBagBtn();
 
}
function setPriceAddToBagBtn()
{
    document.getElementById('btnAddToBag').value = "Add to bag:" + document.getElementById('modalItemPrice').innerHTML;
  
    
}
function hideModal(){
	var modal = document.getElementById('myModal');
	 modal.style.display = "none";
}

function incrementValue()
{
    var originalPrice;
    var result;
    var value = parseInt(document.getElementById('modalItemQty').value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    document.getElementById('modalItemQty').value = value;
    var itemName = document.getElementById('modalItemName').innerText; //Get the original price based on the code of item name in the header
    var code = itemName.split('.')[0]
    originalPrice = menuCard[code].price;
    result = (originalPrice * value).toFixed(2); 
    setCurrentPrice(result);
    setPriceAddToBagBtn();
}
function decrementValue()
{
    var currentPrice;
    var value = parseInt(document.getElementById('modalItemQty').value, 10);
    value = isNaN(value) ? 0 : value;
	if(value!=1){
        value--;
        document.getElementById('modalItemQty').value = value;
        var itemName = document.getElementById('modalItemName').innerText;
        var code = itemName.split('.')[0]
        originalPrice = menuCard[code].price;
        currentPrice = getCurrentItemPrice();
        result = (currentPrice - originalPrice).toFixed(2);
        setCurrentPrice(result);
        setPriceAddToBagBtn();
	}
   
}

function calculateBowlPrice(element) {
    var currentPrice;
        if (element.checked && element.id == "rdBowl") {
            currentPrice = getCurrentItemPrice();
            currentPrice = (currentPrice + parseFloat(element.value)).toFixed(2);
            setCurrentPrice(currentPrice)
        }

        else if (element.id == "rdWrap" || element.id == "rdPizza") {

            currentPrice = parseFloat(element.value).toFixed(2);
            setCurrentPrice(currentPrice)

        }
        else {
            currentPrice = getCurrentItemPrice();
        }
    
    setPriceAddToBagBtn();
}

function addSecondBurgerPrice() {
    var secondBurgerSelected = [];
    var currentPrice;
    var rdSecondBurger = document.getElementsByName('rdBurgerType');
    for (var i = 0, len = rdSecondBurger.length; i < len; i++) {
        if ((rdSecondBurger[i].checked) && (rdSecondBurger[i].id == "B3" || rdSecondBurger[i].id == "B4")) {
            currentPrice = getCurrentItemPrice();
            currentPrice = (currentPrice + 2.00).toFixed(2);
            setCurrentPrice(currentPrice)
            secondBurgerSelected.push(rdSecondBurger[i].id)


        }
        else if ((rdSecondBurger[i].checked) && (rdSecondBurger[i].id == "B1" || rdSecondBurger[i].id == "B2" || rdSecondBurger[i].id == "B5" || rdSecondBurger[i].id == "B6")) {

            currentPrice = getCurrentItemPrice();
            currentPrice = (currentPrice + 2.50).toFixed(2);
            setCurrentPrice(currentPrice)
            secondBurgerSelected.push(rdSecondBurger[i].id)
        }
        else {

        }

    }
    setPriceAddToBagBtn();
    return secondBurgerSelected;
}
 function setCurrentPrice(currentPrice) {
    document.getElementById('modalItemPrice').innerHTML = '$' + currentPrice
 
}
function getCurrentItemPrice() {
    var currentPrice;
    var res; 
    currentPrice = document.getElementById('modalItemPrice').innerHTML;
    res = currentPrice.replace("$", "");
    currentPrice = Number(res);
    return currentPrice;

}
function addExtraCharges(element)
{
    var currentPrice;
    if (element.checked) {

        currentPrice = getCurrentItemPrice();
        currentPrice = (currentPrice + parseFloat(element.value)).toFixed(2);
        setCurrentPrice(currentPrice);
        setPriceAddToBagBtn();
    }
    else {
        currentPrice = getCurrentItemPrice();
        currentPrice = (currentPrice - parseFloat(element.value)).toFixed(2);
        setCurrentPrice(currentPrice);
        setPriceAddToBagBtn();
    }
}
