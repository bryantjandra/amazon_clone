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

//NOTE: Run multiple promises at the SAME TIME using Promise.all(), it will wait for all of the promises to finish. 
Promise.all([
    loadProductsFetch, //returns a promise here
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