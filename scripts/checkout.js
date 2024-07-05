import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
//import '../data/cart-class.js'
//import "../data/backend-practice.js";

/*
loadProducts(() => {
    renderOrderSummary();
    renderPaymentSummary();
})
 */
//NOTE: Can only use await when we are inside an async function. 
async function loadPage() { // async makes a function return a promise.
    console.log('load page');
    try {
        await loadProductsFetch(); // await lets us write asynchronous code like normal code
        
        //NOTE: Async await can only be used with promises, not with callbacks. 
        await new Promise((resolve, reject) => { //reject is a function, and it helps us create an error in the future. 
            // throw 'error2';
            loadCart(() => {
                //reject('error3');
                resolve(); //run resolve once loadCart is finished.
            });
        });
    } catch(error) {
        console.log("Unexpected Error!")
    }
    renderOrderSummary();
    renderPaymentSummary();
}
loadPage();



/*

//NOTE: Run multiple promises at the SAME TIME using Promise.all(), it will wait for all of the promises to finish. 
Promise.all([
    loadProductsFetch(), //returns a promise here
    new Promise((resolve) => {
        loadCart(() => {
            resolve(); //run resolve once loadCart is finished.
        });
    })
]).then((values) => {
        console.log(values);
        renderOrderSummary();
        renderPaymentSummary();
})

*/