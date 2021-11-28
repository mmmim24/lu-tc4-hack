const functions = require("firebase-functions")
const cors = require("cors")
const express = require("express")
const admin = require("firebase-admin");


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyASF-QkdPWpN3TZDlDoJkjzHhBYiTP8cFc",
	authDomain: "practice-management-system.firebaseapp.com",
	projectId: "practice-management-system",
	storageBucket: "practice-management-system.appspot.com",
	messagingSenderId: "589602959389",
	appId: "1:589602959389:web:f8a411da634636157856f4",
};


admin.initializeApp(functions.config().firebase)

/* Express with CORS & automatic trailing '/' solution */
const app3 = express()
app3.use(cors({ origin: true }))


const SSLCommerzPayment = require('sslcommerz-lts');
const { response } = require("express");
// 'store_id': 'milit612a94857784c', 
//     'store_pass': 'milit612a94857784c@ssl', 
    
const store_id = 'milit612a94857784c'
const store_passwd = 'milit612a94857784c@ssl'
const is_live = false //true for live, false for sandbox

const port = 3030

//sslcommerz init
app3.get('/init', async (req, res) => {
    
    const tran_id = Math.random()*10000000000000000;

    const data = {
        total_amount: 100,
        currency: 'BDT',
        tran_id: tran_id, // use unique tran_id for each api call
        success_url: 'http://localhost:3030/success',
        fail_url: 'http://localhost:3030/fail',
        cancel_url: 'http://localhost:3030/cancel',
        ipn_url: 'http://localhost:5002/practice-management-system/us-central1/api3',
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: 'Customer Name',
        cus_email: 'customer@example.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    let apiResponse;
    // try {
    sslcz.init(data).then( apiResponse => {
        console.log('Redirecting to: ', apiResponse["GatewayPageURL"])
    
        response.send(
            "GatewayPageURL" + apiResponse["GatewayPageURL"]
        )
    } )
    // } catch(e) {
        // console.log(e)
    // }
    // let GatewayPageURL = apiResponse
    
})


app3.get("*", async (request, response) => {
    try {
        const db = admin.firestore();
        const gg = await db.collection("users").get()
        console.log(gg.docs.length);
        response.send(
            "asdbahsbdasgd"
        )
    }catch(e){
        console.log(e)
    }
})


// not as clean, but a better endpoint to consume
const api3 = functions.https.onRequest((request, response) => {
    if (!request.path) {
      request.url = `/${request.url}` // prepend '/' to keep query params if any
    }
    return app3(request, response)
  })
  


module.exports = {
  api3,
}