var cartLine = {
    productName: '',
    code: '',
    productType: '',
    qty: 0, price: 0.0,
    notes: '',
    customOptions: { isVegan: false, isGF: false, isBasmatiRice: false,isBrownRice:false },
    extraOptions: []
}

var cart = {
	cartLine:[],
	totalPrice: 0.0,
	discountInPercentage: 0.0,
	salesTax: 0.00,
    finalTotal: 0.0,
    totalQuantity: 0.0
}

//This single function is alone responsible for display images,item name and description based on menu type
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
    var code = document.getElementById('modalItemCode').innerText;
    var optionalItemCodes = getOptionalMenuItemCodes();
    var extraItemCode = getExtraItems();
    //if (extraItemCode) {
    //    this.addToCart("extraItems");
    //}
    if (optionalItemCodes) {
        optionalItemCodes.forEach(function (code) {
            this.addToCart(code);
        })

        //If burger,get second burger by code and call AddtoCart
    if (code == 'B1' || code == 'B2' || code == 'B3' || code == 'B4' || code == 'B5' || code == 'B6') {
        //If user has not selected second burger,dont let them submit
        var secondBurger = getSecondBurger();
        if (secondBurger.length == 0) {
            alert("Choose second burger");

        }
        else if (secondBurger) {                   
            this.addToCart("BG2");                         
            this.hideModal();              
               
        }
        else {

        }
       
      
    } 
    
    else {// For all other items,except burger
        this.addToCart(code);
        this.hideModal();
        
     }
    }
    clearCartAndRerender();
}
function getExtraItems() {
    
    var optionalMenuItems = [];
    var checkboxes = document.getElementsByName('extraOptions');
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            optionalMenuItems.push(checkboxes[i].id);
        }

    }
    return optionalMenuItems;
}
//Depending on what items user has checked, create an array and push those codes in array
function getOptionalMenuItemCodes()
{
    var optionalMenuItems = [];
    var checkboxes = document.getElementsByName('typeOfAddOn');      
     for (let i = 0; i < checkboxes.length; i++)
      {
         if (checkboxes[i].checked) {
             optionalMenuItems.push(checkboxes[i].id);
         }
     
     }
     return optionalMenuItems;
}

function getVGFCharges() {
    var veganGluItems = [];
    var checkboxes = document.getElementsByName('chkBurgerExtra');
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            veganGluItems.push(checkboxes[i].id);
        }

    }
    return veganGluItems;
}

function getRiceOptions() {
    
    var typeOfRice = [];
    var checkboxes = document.getElementsByName('typeOfRice');
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            typeOfRice.push(checkboxes[i].id);
        }

    }
    return typeOfRice;
}


//Add items to cart depending on the code
function addToCart(code) {	    
   if (menuCard[code]) {       
       var cartLine = new Object();        
       cartLine.customOptions = new Object();
   cartLine.code = code;
   cartLine.productType = menuCard[code].productType;
   cartLine.qty = document.getElementById('modalItemQty').value;
   if (code == "P1" || code == "SA1" | code == "FR1" | code == "FRT1" || code == "LA" || code == "LM" || code == "SMT") {
       cartLine.notes = "";
   }
   else {
       cartLine.notes = document.getElementById('txtNotes').value;
   }
   
   var veganGlutenItems = getVGFCharges();
   var riceOptions = getRiceOptions();
   if (riceOptions) {
       riceOptions.forEach(function (riceCode) {
           if (riceCode == 'Basmati') {
               cartLine.customOptions.isBasmatiRice = true;
           }
           if (riceCode == 'Brown') {
               cartLine.customOptions.isBrownRice = true;
           }

       })
   }


   var extraItems = getExtraItems();
   if (extraItems) {
       cartLine.extraOptions = []
       extraItems.forEach(function (item) {
           cartLine.extraOptions.push(item);
       })

   }
  
       //If vegan or Gluten free,set flag to true
   if (veganGlutenItems) {      
       veganGlutenItems.forEach(function (vGfCode) {
           if (vGfCode == 'V') {               
               cartLine.customOptions.isVegan = true;               
           }
           if (vGfCode == 'GF') {
               cartLine.customOptions.isGF = true;              
           }
          
       })
   }
   
      
   
   if (code == "BG2")
   {
       var burgerCode1 = document.getElementById('modalItemCode').innerText;
       var burgerCode2 = getSecondBurger()
       cartLine.productName ="*"+ menuCard[burgerCode1].productName +"*"+ menuCard[burgerCode2].productName;
       cartLine.price = menuCard[code].price * cartLine.qty;
   }  
   else
   {
       cartLine.productName = menuCard[code].productName;
       cartLine.price = menuCard[code].price * cartLine.qty;
          
   }
   var cartObj ;        
		if(typeof(Storage) !== "undefined") {
			if (sessionStorage.getItem( "vegOramaCart" )) {
				// cart already exists in the memory
				var cartValue = sessionStorage.getItem( "vegOramaCart" );
				cartObj = JSON.parse( cartValue );
				var found = false;
				for (i = 0; i < cartObj.cartLine.length && found == false; i++) {
					if(cartObj.cartLine[i].code == code){
                        cartObj.cartLine[i].qty = parseInt(document.getElementById('modalItemQty').value);
                        cartObj.cartLine[i].notes = document.getElementById('txtNotes').value;
                      
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
            $('#dvShowNoitems').html('');
          
          
           
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
        if (cartObj.cartLine[i].customOptions.isVegan) {
            totalPrice = totalPrice + 1.00;
        }
        if (cartObj.cartLine[i].customOptions.isGF) {
            totalPrice = totalPrice + 1.00;
        }
        if (cartObj.cartLine[i].customOptions.isBasmatiRice) {
            totalPrice = totalPrice + 1.00;
        }
        if (cartObj.cartLine[i].customOptions.isBrownRice) {
            totalPrice = totalPrice + 1.00;
        }
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
       var menuCategory = "Burgers";
       renderExtraOptions(code);
       renderCompleteMealOptions(menuCategory);

    }
    else if (code == 'BP' || code == 'GF' || code == 'OC' || code=='PC'||code=='SM'|| code =='FL' || code=='BC')
    {   
        generateHtmlCustomizedItems(code);
        var menuCategory = "Customized";
        renderExtraOptions(code);
        renderCompleteMealOptions(menuCategory);
    }
    else if (code == 'W1' || code == 'W2' || code == 'W3' || code == 'W4' || code == 'W5' || code == 'W6' || code == 'W7') {
        generateHtmlCustomizedItems(code);      
        renderExtraOptions(code);
        var menuCategory = "Wraps"      
        renderCompleteMealOptions(menuCategory);
    }
    else if (code == 'S1' || code == 'S2') {
        generatePopUpHtmlForGenericItems(code);       
        var vegGluten = document.getElementById('trBurgerExtra');
        vegGluten.style.display = "block";
        var menuCategory = "Bowls";       
        renderCompleteMealOptions(menuCategory);
    }
    else
    {
        generatePopUpHtmlForGenericItems(code);
        var menuCategory = "Common";
        renderExtraOptions(code);
        renderCompleteMealOptions(menuCategory);
    }
  
    
}
function renderVeganGlutenOptions() {

}

function generateHtmlCustomizedItems(code)
{
    generatePopUpHtmlForGenericItems(code);    
    
    var vegGluten = document.getElementById('trBurgerExtra');
    vegGluten.style.display = "block";
    var modal = document.getElementById('trCustomStyle');
    modal.style.display = "block";
   
    var modal1 = document.getElementById('trCustomExtra');
    modal1.style.display = "block";
  
}

function renderExtraOptions(code) {
  
    if (menuCard[code] && menuCard[code].isCustomizable && menuCard[code].extraOptionAvailable) {
        var result = menuCard[code].extraOptions
        if (result) {
            var firstRow = document.createElement('tr');
            firstRow.appendChild(document.createTextNode("Add any of your favorites:"))
            $("#tblPopUp tr:last").after(firstRow);
            firstRow.appendChild(document.createElement('hr'));
            firstRow.setAttribute('id', 'rowDynamic');
            result.forEach((item, rowNumber) => {
           
                const newRow = document.createElement('tr');
                firstRow.appendChild(newRow);
                const rowId = 'extraOptions' + rowNumber;
                newRow.setAttribute('id', rowId);

                var checkbox = document.createElement('input');
                checkbox.type = "checkbox";
                checkbox.name = "extraOptions";
                checkbox.value = item.type;
                checkbox.id =   item.type;
               
                var label = document.createElement('label')
                label.htmlFor = item.type;

                label.appendChild(document.createTextNode(item.type));
                label.style.width = "120px";
                newRow.appendChild(checkbox);
                newRow.appendChild(label);

                
                newRow.className = "ExtraStyle";
                newRow.appendChild(document.createElement('br'))

            })
        }

    }
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

function renderCompleteMealOptions(menuCategory)
{
    
    if (menuSuggestions[menuCategory]) {
        var firstRow = document.createElement('div');
        firstRow.appendChild(document.createTextNode("Complete your meal options:"));
        $("#tblPopUp tr:last").after(firstRow);
        firstRow.appendChild(document.createElement('hr'));
       
        menuSuggestions[menuCategory].forEach(function (menuItemCode, rowNumber) {
            if (menuCard[menuItemCode]) {
               
                const newRow = document.createElement('tr');              
                const rowId = 'typeOfAddOn' + rowNumber;
                newRow.setAttribute('id', rowId);

                var checkbox = document.createElement('input');
                checkbox.type = "checkbox";
                checkbox.name = "typeOfAddOn";
                checkbox.value = menuCard[menuItemCode].price;
                checkbox.id =  menuCard[menuItemCode].code;
            
               
                var label = document.createElement('label')
                label.htmlFor = rowId + menuCard[menuItemCode].productName;
                var labelText = menuCard[menuItemCode].productName +" "+  "+" + " "+ "$" + menuCard[menuItemCode].price
                label.appendChild(document.createTextNode(labelText));
                label.style.width = "120px";


                firstRow.appendChild(newRow);
                
                newRow.appendChild(checkbox);
                checkbox.setAttribute("onchange", "addExtraCharges(this)");
                newRow.appendChild(label);
                newRow.className = "ExtraStyle";
                newRow.appendChild(document.createElement('br'))
               

            }


        })
    }

}
function generatePopUpHtmlForGenericItems(code)
{
    var modal = document.getElementById('myModal');
    modal.style.display = "block";
  
    if (menuCard[code]) {
        document.getElementById('modalItemName').innerHTML  = code +"."+ menuCard[code].productName;
        document.getElementById('modalItemDesc').innerHTML = menuCard[code].description;
        document.getElementById('modalItemCode').innerHTML = code;   
        document.getElementById('modalItemPrice').innerHTML = '$' + menuCard[code].price;
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
    clearPopUpValues();
  
}
function clearPopUpValues() {
   
    $("#myModal").find('input:radio, input:checkbox').prop('checked', false);
    document.getElementById('modalItemQty').value = 1;
    $('#rowDynamic').remove();
    $("#tblPopUp").innerHTML = '';  
    $('#txtNotes').val('');
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

function getSecondBurger() {
  
    var rdSecondBurger = document.querySelector('input[name="rdBurgerType"]:checked').id;   
    return rdSecondBurger;
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
    var count = 0;
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
    var typeOfCheckbox = document.getElementsByName('typeOfRice')
    for (i = 0; i < typeOfCheckbox.length; i++) {
        if (typeOfCheckbox[i].checked) {
            count += 1;
        }
    }
    if (count > 1) {

        $('#chooseMax1').show();
    }
}
