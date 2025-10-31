//?? Earlier Code :-

function placedOrder(Callback) {
  console.log("Payment is in progress");

  setTimeout(() => {
    console.log("Payment is received and order placed");
    Callback();
  }, 3000);
}

function preparingOrder(callback) {
  console.log("Food preparation Started");
  setTimeout(() => {
    console.log("Food prepared");
    // pickUpOrder()  // Never hardcode a callback function
    callback();
  }, 3000);
}

function pickUpOrder() {
  console.log("Delivery boy is on way to pickup order");

  setTimeout(() => {
    console.log("I have picked up the order");
  }, 3000);
}

function deliverOrder() {
  console.log("Your order is on the way.");

  setTimeout(() => {
    console.log("Your order is delivered successfully");
  }, 3000);
}


placedOrder(() => {
  preparingOrder(() => {
    pickUpOrder(() => {
      deliverOrder();
    })
  })
})


//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 1) Issues in Callback Hell :-

//? a) Readability

// How?
// --> Let's say we have generated a orderDetails object created when the order is put to Cart and going for payment
// --> It will create the details regarding the order

const orderDetails = {
  orderId: 123123,
  food: ["Pizza", "biryani", "coke"],
  cost: 620,
  customer_name: "Hrithik",
  customer_location: "Dwarka",
  restaurant_location: "Delhi"
}

// --> Now we will use & add more details fro this "orderDetails" table in between our methods



//?? Small example :-

//* For placedOrder()
// --> Use the orderDetails object in placedOrder()
// --> Print the total cost while printing payment in progress
// --> After the payment is completed, add a property "paymentStatus" as true in objectDetails

// --> Pass the objectDetails in the preparingOrder() so that it can use it

orderDetails = {
  orderId: 123123,
  food: ["Pizza", "biryani", "coke"],
  cost: 620,
  customer_name: "Hrithik",
  customer_location: "Dwarka",
  restaurant_location: "Delhi"
}

function placedOrder(orderDetails, Callback) {
  console.log(`Payment ${orderDetails.cost} is in progress`);

  setTimeout(() => {
    console.log("Payment is received and order placed");
    orderDetails.paymentStatus = true;
    Callback(orderDetails);
  }, 3000);
}


function preparingOrder(orderDetails, callback) {
  console.log("Food preparation Started");
  setTimeout(() => {
    console.log("Food prepared");
    // pickUpOrder()  // Never hardcode a callback function
    callback();
  }, 3000);
}

placedOrder(orderDetails, (orderDetails) => {
  preparingOrder(orderDetails, (orderDetails) => {
    pickUpOrder(orderDetails);
  })
})


//?? Question?
// --> While calling the callback of placedOrder() we are passing just one argument
// --> But in the preparingOrder() there are two parameters


//?? Solution :-
// --> The callback of placedOrder() refers to the arrow function inside placedOrder() call & not preparingOrder() itself.

// --> Inside the arrow function, we call the preparingOrder()

// --> That arrow function only needs one parameter hence we passed just one argument inside callback()

// --> On the other side, the preparingOrder() definition has two parameters (one object and one callback)
// --> Hence, while calling preparingOrder() inside arrow function we pass one object and one callback as argument.


//************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */

//?? 2) Full example :-

//--> In addition to the previous example, pass the objectDetails in the preparingOrder() so that it can use it

//--> In preparingOrder(), mention the Food while printing that "Food started preparing"
//--> Introduce a token_no property to the orderDetails object to identify the delivery guy


//--> In pickUpOrder(), mention the restaurant_location while printing to pick up th order
//--> Introduce a received property to the orderDetails and mark it as true


//--> In the deliverOrder(), mention the delivery_location while printing that the order is on the way
//--> Introduce a delivered property to the orderDetails and mark it as true


// Solution :-

orderDetails = {
  orderId: 123123,
  food: ["Pizza", "biryani", "coke"],
  cost: 620,
  customer_name: "Hrithik",
  customer_location: "Dwarka",
  restaurant_location: "Delhi"
}


function placedOrder(orderDetails, Callback) {
  console.log(`Payment ${orderDetails.cost} is in progress`);

  setTimeout(() => {
    console.log("Payment is received and order placed");
    orderDetails.paymentStatus = true;
    Callback(orderDetails);
  }, 3000);
}

function preparingOrder(orderDetails, callback) {
  console.log(`Food preparation Started of ${orderDetails.food}`);
  setTimeout(() => {
    console.log("Food prepared");
    orderDetails.token = 123321;
    callback(orderDetails);
  }, 3000);
}

function pickUpOrder(orderDetails, callback) {
  console.log(`Delivery boy is on way to pickup order from ${orderDetails.restaurant_location}`);

  setTimeout(() => {
    console.log("I have picked up the order");
    callback(orderDetails);
  }, 3000);
}

function deliverOrder(orderDetails) {
  console.log(`Your order is on the way to ${orderDetails.customer_location}`);

  setTimeout(() => {
    console.log("Your order is delivered successfully");
  }, 3000);
}


placedOrder(orderDetails, (orderDetails) => {
  preparingOrder(orderDetails, (orderDetails) => {
    pickUpOrder(orderDetails, (orderDetails) => {
      deliverOrder(orderDetails);
    })
  })
})

// Very hard to read


//*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */

//?? 3) How hard to debug?

// --> It is very hard to debug
// --> If one of the function encounters an error, it will be very hard to know which one
// --> This is because every function is dependent on the other


//*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */

//?? 4) How inversion of control?

// --> Let's say one function preparingOrder() is handled by a different team
// --> Let's say they forget to call the callback function or some new guy removed the callback
// --> Then rest of the functions down their will never be called

// --> This is because the dependency of getting called by a function is based on the previous function
// --> Hence the dependency of calling one team's function is dependent on other team