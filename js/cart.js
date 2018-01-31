var menuCard = {

    'B1': {
        'productName': 'Peanut Crusted Cajun BlackBean Burger',
        'productType': 'Burger',
        'price': '2.50',
        'description': 'Hand Made patty seared on the grill with black beans, spanish peanuts, rice flour for crunch & our house cajun spice blend.',
        'code':'B1'
    },
    'B2': {
        'productName': 'Mean Green Protein Pea Burger',
        'productType': 'Burger',
        'price': '2.50',
        'description': 'Hand made patty seared on the grill and packed with protein from loads of green peas dusted with a savory spice blend',
        'code': 'B2'
    },
    'B3': {
        'productName': 'Golden Crunchy Potato Burger',
        'productType': 'Burger',
        'price': '2.00',
        'description': 'A classic from the streets of India.. potatoes, a protein flour blend and secret spices make up this craveable, crunchy street food delight.',
        'code': 'B3'
    },
    'B4': {
        'productName': 'The Love Seed Beet them All Burger',
        'productType': 'Burger',
        'price': '2.00',
        'description': 'Fresh shredded beets, roasted sunflower seeds, flax seed, buck wheat, chickpea flour and just the right spice',
        'code': 'B4'
    },
    'B5': {
        'productName': 'Golden Crunchy Bird\'s Nest Burger',
        'productType': 'Burger',
        'price': '2.50',
        'description': 'A sell out every rock show we ever set up at.. think coleslaw deepfried in a healthy chickpea flour base with cajun spice.',
        'code': 'B5'
    },
    'B6': {
        'productName': 'Tamarind BBQ Jackfruit Sandwich',
        'productType': 'Burger',
        'price': '2.50',
        'description': 'Never had jackfruit',
        'code': 'B6'
    },
    'W1': {
        'productName': 'Butter Paneer',
        'productType': 'Wraps',
        'price': '5.50',
        'description': 'Wrap',
        'code': 'W1'
    },
    'W2' : {
    	'productName': 'Spicy Manchurian',
        'productType' : 'Wraps',
        'price': '5.50',
        'description': 'Wrap',
        'code': 'W2'
    },
    'W3' : {
    	'productName': 'Grilled Fajitas',
        'productType' : 'Wraps',
        'price': '5.50',
        'description': 'Wrap',
        'code': 'W3'
    },
    'W4' : {
    	'productName': 'Falafel',
    	'productType' : 'Wraps',
        'price': '5.50',
        'description': 'Wrap',
        'code': 'W4'
    },
    'W5' : {
    	'productName': 'Orange Chicken',
        'productType' : 'Wraps',
        'price': '5.50',
        'description': 'Wrap',
        'code': 'W5'
    },
    'W6' : {
    	'productName': 'Butter Chicken',
        'productType' : 'Wraps',
        'price': '5.50',
        'description': 'Wrap',
        'code': 'W6'

    },
    'W7' : {
    	'productName': 'Butter Chicken',
        'productType' : 'Wraps',
        'price': '5.50',
        'description': 'Wrap',
        'code': 'W7'
    },
    'W8' : {
    	'productName': 'Philly Chicken',
    	'productType' : 'Wraps',
        'price': '5.50',
        'description': 'Wrap',
        'code': 'W8'
    }, 
    'S1' : {
  		'productName': 'Classic Italian Veg-O-Rama Sub',
  		'productType' : 'Subs',
        'price': '5',
        'description': 'Lots of cheese, banana peppers, tomatoes and our house vinagrette toasted on a hoagie',
        'code':'S1'
 	},
 	'S2' : {
  		'productName': 'Vegetarian \'Meat Ball\' Masterpiece',
  		'productType' : 'Subs',
            'price': '5',
            'description': '4 Crispy Golden \'Meat Balls\' slathered in BBQ sauce & Swiss Cheese toasted on a hoagie',
            'code':'S2'
 	},

 	'BR1' : {
  		'productName': 'Paneer',
  		'productType' : 'Breakfast',
            'price': '5',
            'description': 'Breakfast',
            'code': 'BR1'
 	},
	'BR2' : {
		'productName': 'Amazng indian Tomato \'Omelette\'',
 		'productType' : 'Breakfast',
        'price': '5',
        'description': 'Breakfast',
        'code': 'BR2'
 	},

 	'BR3' : {
  		'productName': 'Cheesy Hashbrowns and Toast',
  		'productType' : 'Breakfast',
            'price': '5',
            'description': 'Breakfast',
            'code': 'BR3'
 	},
 	'BR4' : {
  		'productName': 'Chutney Sandwich',
  		'productType' : 'Breakfast',
            'price': '5',
            'description': 'Breakfast',
            'code': 'BR4'
 	}

	

}

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
function displayBurgers() {  
        var burgerArray = [];
        var b1 = menuCard.B1;     
        burgerArray.push(b1);
        var b2 = menuCard.B2;
        burgerArray.push(b2);
        var b3 = menuCard.B3;
        burgerArray.push(b3);
        var b4 = menuCard.B4;
        burgerArray.push(b4);
        var b5 = menuCard.B5;
        burgerArray.push(b5);
        return burgerArray;
}
function displaySubs() {
    var subArray = [];
    var sub1 = menuCard.S1;
    subArray.push(sub1);
    var sub2 = menuCard.S2;
    subArray.push(sub2);
    return subArray;

}
function displayBowls() {
    var bowlArray = [];
    var s1 = menuCard.S1;
    bowlArray.push(s1);
    var s2 = menuCard.S2;
    bowlArray.push(s2);
    return bowlArray;

}
function displayWraps() {
    var wrapArray = [];
    var wrap1 = menuCard.W1;
    wrapArray.push(wrap1);
    var wrap2 = menuCard.W2;
    wrapArray.push(wrap2);
    var wrap3 = menuCard.W3;
    wrapArray.push(wrap3);
    var wrap4 = menuCard.W4;
    wrapArray.push(wrap4);
    var wrap5 = menuCard.W5;
    wrapArray.push(wrap5);
    var wrap6 = menuCard.W6;
    wrapArray.push(wrap6);
    var wrap7 = menuCard.W7;
    wrapArray.push(wrap7);
    var wrap8 = menuCard.W8;
    wrapArray.push(wrap8);
    return wrapArray;
}
function displayBreakfastItems()
{
    var bfArray = [];
    var bfItem1 = menuCard.BR1;
    bfArray.push(bfItem1);
    var bfItem2 = menuCard.BR2; 
    bfArray.push(bfItem2);
    var bfItem3 = menuCard.BR3;
    bfArray.push(bfItem3);
    var bfItem4 = menuCard.BR4;
    bfArray.push(bfItem4);
    return bfArray;
}
function addToCart(code){	    
	if(menuCard[code]){
		var cartLine = new Object();
		cartLine.code = code;
		cartLine.productName = menuCard[code].productName;
		cartLine.productType = menuCard[code].productType;
		cartLine.qty = 1;
		cartLine.price = menuCard[code].price;
		var cartObj ; 
		if(typeof(Storage) !== "undefined") {
			if (sessionStorage.getItem( "vegOramaCart" )) {
				// cart already exists in the memory
				var cartValue = sessionStorage.getItem( "vegOramaCart" );
				cartObj = JSON.parse( cartValue );
				var found = false;
				for (i = 0; i < cartObj.cartLine.length && found == false; i++) {
					if(cartObj.cartLine[i].code == code){
						cartObj.cartLine[i].qty = cartObj.cartLine[i].qty + 1; 
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
	cartObj.totalPrice = Number(totalPrice); 
	cartObj.salesTax = (totalPrice * 0.06).toFixed(2) ; 
    cartObj.finalTotal = Number(cartObj.totalPrice) + Number(cartObj.salesTax); 
    cartObj.totalQuantity = Number(totalQuantity);
    document.getElementById('dvQuantity').innerHTML = "(" + cartObj.totalQuantity + ")"; //Everytime user clicks add to cart, dvQuantity is updated with the quantity
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
            cartObj.cartLine.splice(cartObj.cartLine[i], 1);
            cartObj = calculateTotalPrice(cartObj);

        }
        else {
            delete cartObj;
        }
    }

    var jsonStr = JSON.stringify(cartObj)
    sessionStorage.setItem("vegOramaCart", jsonStr);
    document.getElementById('cartTable').remove('rowId');
}

function openPopUp(code) {
	var modal = document.getElementById('myModal');
	modal.style.display = "block";
	if(menuCard[code]){
		document.getElementById('modalItemName').innerHTML  = menuCard[code].productName;
		document.getElementById('modalItemDesc').innerHTML  = menuCard[code].description;
		document.getElementById('modalItemPrice').innerHTML = '$' + menuCard[code].price;
		document.getElementById('modalItemCode').innerHTML = code;
	}
}

function hideModal(){
	var modal = document.getElementById('myModal');
	 modal.style.display = "none";
}

function incrementValue()
{
    var value = parseInt(document.getElementById('modalItemQty').value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    document.getElementById('modalItemQty').value = value;
}
function decrementValue()
{
    var value = parseInt(document.getElementById('modalItemQty').value, 10);
    value = isNaN(value) ? 0 : value;
	if(value!=1){
		value--;
	}
    document.getElementById('modalItemQty').value = value;
}

function addExtraCharges(element){
	if(element.checked) {
		var currentPrice = document.getElementById('modalItemPrice').innerHTML ;
		var res = currentPrice.replace("$", "");
		currentPrice = Number(res);
		currentPrice = (currentPrice + 1).toFixed(2) ;
		document.getElementById('modalItemPrice').innerHTML  = '$'+currentPrice;
	} else {
		var currentPrice = document.getElementById('modalItemPrice').innerHTML ;
		var res = currentPrice.replace("$", "");
		currentPrice = Number(res);
		currentPrice =(currentPrice - 1).toFixed(2) ;
		document.getElementById('modalItemPrice').innerHTML  = '$'+currentPrice;
	}
}