//?? 1) What is a callback function?

//--> A function which is passed as argument to some other function is called Callback function
//--> The function that calls the Callback function as argument is called Higher Order Function.

function A(callback) {
  console.log("From A");
  callback()
}

function B() {
  console.log("I am B");
}

A(B);      // passing function B as argument

// A = Higher Order Function
// b = Callback function

//*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//? 2) Core Nature of JS :-

// --> JS is single threaded
// --> It completes its tasks in synchronize fashion

// --> It waits for nothing and doesn't block your code
// --> It will pass all the asynchronous code (e.g :- setTimeout(), fetch()) to Event Loop


console.log("A");
console.log("B");
setTimeout(() => {
  console.log("C");
}, 3000);
console.log("D");
console.log("E");


//OUTPUT :-
// A
// B
// D
// E
// C



//**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */

//?? 3) Callback Hell :-

// --> Will be going through first thought principle

//?? Scenario :-
// --> Will be building a mini Zomato :-


//?? Case 1 :-
// --> Some user added some foods to the cart
// --> Once order placed
// --> Take the user to payment gateway
// --> After 3s the payment clears
// --> Tell user that payment cleared and order placed

function placedOrder() {
  console.log("Payment is in progress");

  setTimeout(() => {
    console.log("Payment is received and order placed");
  }, 3000);
}

placedOrder();



//*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 4) Case 2 :-

// --> After the order placed then only
// --> Notify restaurant that these order is placed
// --> Start preparation for that
// --> After 3s the order is prepared


//?? Wrong approach :-

function placedOrder() {
  console.log("Payment is in progress");

  setTimeout(() => {
    console.log("Payment is received and order placed");
  }, 3000);
}


function preparingOrder() {
  console.log("Food preparation Started");
  setTimeout(() => {
    console.log("Food prepared");
  }, 3000);
}

placedOrder()
preparingOrder()


// OUTPUT :-
// Payment is in progress
// Food preparation Started
// Payment is received and order placed
// Food prepared

//?? Food preparation started before payment received

//?? Why?
// --> Because JS pushed the setTimeOut() in the Event loop
// --> It started executing all the synchronous tasks first


//****************************** */


//?? Correct Approach :-

// --> preparingOrder() should be called after the tasks of placedOrder() are done
// --> Pass the preparingOrder() as a callback to the placedOrder()
// --> Call the preparingOrder() inside the setTimeout() of placedOrder()

function placedOrder(Callback) {
  console.log("Payment is in progress");

  setTimeout(() => {
    console.log("Payment is received and order placed");
    Callback();
  }, 3000);
}

function preparingOrder() {
  console.log("Food preparation Started");
  setTimeout(() => {
    console.log("Food prepared");
  }, 3000);
}

placedOrder(preparingOrder);

// OUTPUT :-
// Payment is in progress
// Payment is received and order placed
// Food preparation Started
// Food prepared


//*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 5) Case 3 :-

// --> One the order is prepared, tell the delivery guy to pick up the order
// --> Delivery boy should be on the way
// --> After 3 seconds, the order should be picked up

//? Function :-

function pickUpOrder() {
  console.log("Delivery boy is on way to pickup order");

  setTimeout(() => {
    console.log("I have picked up the order");
  }, 3000);
}


//?? Wrong approach :-
// --> Just like above pass the pickUpOrder() as callback to preparingOrder()
// --> Call the pickUpOrder() inside the setTimeout() of preparingOrder()

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


// While calling (Gives an error this way):-
placedOrder(preparingOrder(pickUpOrder));  // Give an error


//?? Why?
// --> This is because preparingOrder(pickUpOrder) is itself a function call, which will return undefined
// --> Later in the placedOrder() while calling callback()
// --> We will get error while calling undefined()



//***************************************** */


//?? Correct Approach (Passing callback inside callback):-
// --> Don't pass the callback function as an expression directly inside its higher order function
// --> Instead pass an arrow function inside the higher order function
// --> Inside that arrow function, call the callback function

placedOrder(() => {
  preparingOrder();
})


//?? How is this working?
// --> Consider the callback as a function expression

const callback = () => {
  preparingOrder();
}

// Hence, calling the callback(), will call the preparingOrder() also



//?? NOTE :-
// --> Through this way we can form a hierarchy

A(() => {
  B(() => {
    C(() => {
      D();
    })
  })
})


// e.g:-
placedOrder(() => {
  preparingOrder(() => {
    pickUpOrder();
  });
})



//*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? 6) Case 4 :-

// --> Now once the order is picked up, we want the delivery guy to deliver it
// --> After 3s he will deliver the order


// Correct Approach :-

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

function pickUpOrder(callback) {
  console.log("Delivery boy is on way to pickup order");

  setTimeout(() => {
    console.log("I have picked up the order");
    callback();
  }, 3000);
}

function deliverOrder(callback) {
  console.log("Your order is on the way.");

  setTimeout(() => {
    console.log("Your order is delivered successfully");
    callback();
  }, 3000);
}


placedOrder(() => {
  preparingOrder(() => {
    pickUpOrder(() => {
      deliverOrder();
    })
  })
})


//******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************** */


//?? Callback Hell :-

// --> It is JS asynchronous programming where multiple callbacks are deeply nested within each other.
// --> Each callback tries to also act as a higher order function simultaneously

//?? Why is it happening :-
// --> Because of asynchronous task


//?? Issues :-
// a) Readability
// b) Hard to debug
// c) Inversion of Control