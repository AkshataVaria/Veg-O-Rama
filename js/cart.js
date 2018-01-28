var menuCard = {

    'B1': {
        'productName': 'Peanut Crusted Cajun BlackBean Burger',
        'productType': 'Burger',
        'price': '2.50',
        'description': 'Hand Made patty seared on the grill with black beans, spanish peanuts, rice flour for crunch & our house cajun spice blend.'
    },
    'B2': {
        'productName': 'Mean Green Protein Pea Burger',
        'productType': 'Burger',
        'price': '2.50',
        'description': 'Hand made patty seared on the grill and packed with protein from loads of green peas dusted with a savory spice blend'
    },
    'B3': {
        'productName': 'Golden Crunchy Potato Burger',
        'productType': 'Burger',
        'price': '2.00',
        'description': 'A classic from the streets of India.. potatoes, a protein flour blend and secret spices make up this craveable, crunchy street food delight.'
    },
    'B4': {
        'productName': 'The Love Seed Beet them All Burger',
        'productType': 'Burger',
        'price': '2.00',
        'description': 'Fresh shredded beets, roasted sunflower seeds, flax seed, buck wheat, chickpea flour and just the right spice'
    },
    'B5': {
        'productName': 'Golden Crunchy Bird\'s Nest Burger',
        'productType': 'Burger',
        'price': '2.50',
        'description': 'A sell out every rock show we ever set up at.. think coleslaw deepfried in a healthy chickpea flour base with cajun spice.'
    },
    'B6': {
        'productName': 'Tamarind BBQ Jackfruit Sandwich',
        'productType': 'Burger',
        'price': '2.50',
        'description': 'Never had jackfruit'
    },
    'W1': {
        'productName': 'Butter Paneer',
        'productType': 'Wraps',
        'price': '5.50',
        'description':''
    },
    'W2' : {
    	'productName': 'Spicy Manchurian',
        'productType' : 'Wraps',
        'price': '5.50',
        'description': ''
    },
    'W3' : {
    	'productName': 'Grilled Fajitas',
        'productType' : 'Wraps',
        'price': '5.50',
        'description': ''
    },
    'W4' : {
    	'productName': 'Falafel',
    	'productType' : 'Wraps',
        'price': '5.50',
        'description': ''
    },
    'W5' : {
    	'productName': 'Orange Chicken',
        'productType' : 'Wraps',
        'price': '5.50',
        'description': ''
    },
    'W6' : {
    	'productName': 'Butter Chicken',
        'productType' : 'Wraps',
        'price': '5.50',
        'description': ''

    },
    'W6' : {
    	'productName': 'Butter Chicken',
        'productType' : 'Wraps',
        'price': '5.50',
        'description': ''
    },
    'W7' : {
    	'productName': 'Philly Chicken',
    	'productType' : 'Wraps',
        'price': '5.50',
        'description': ''
    }, 
    'S1' : {
  		'productName': 'Classic Italian Veg-O-Rama Sub',
  		'productType' : 'Subs',
        'price': '5',
        'description': ''
 	},
 	'S2' : {
  		'productName': 'Vegetarian \'Meat Ball\' Masterpiece',
  		'productType' : 'Subs',
            'price': '5',
            'description': ''
 	},

 	'BR1' : {
  		'productName': 'Paneer',
  		'productType' : 'Breakfast',
            'price': '5',
            'description': ''
 	},
	'BR2' : {
		'productName': 'Amazng indian Tomato \'Omelette\'',
 		'productType' : 'Breakfast',
            'price': '5',
            'description': ''
 	},

 	'BR3' : {
  		'productName': 'Cheesy Hashbrowns and Toast',
  		'productType' : 'Breakfast',
            'price': '5',
            'description': ''
 	},
 	'BR4' : {
  		'productName': 'Chutney Sandwich',
  		'productType' : 'Breakfast',
            'price': '5',
            'description': ''
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
    alert("added");
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
	}
}

function hideModal(){
	var modal = document.getElementById('myModal');
	 modal.style.display = "none";
}