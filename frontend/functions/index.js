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


admin.initializeApp(firebaseConfig)

/* Express with CORS & automatic trailing '/' solution */
const app3 = express()
// app3.use(cors({ origin: true }))


const SSLCommerzPayment = require('sslcommerz-lts');
const { app } = require("firebase-admin");
    
const store_id = 'milit612a94857784c'
const store_passwd = 'milit612a94857784c@ssl'
const is_live = false //true for live, false for sandbox

//sslcommerz init
// app3.get('/init', async (req, res) => {
app3.get('/init', async (req, res) => {
    
    const tran_id = Math.random()*10000000000000000;
    const amount = 100;

    const data = {
        total_amount: amount,
        currency: 'BDT',
        tran_id: tran_id, // use unique tran_id for each api call
        success_url: 'http://localhost:3030/success?tran_id'+tran_id,
        fail_url: 'http://localhost:3030/fail?tran_id'+tran_id,
        cancel_url: 'http://localhost:3030/cancel?tran_id'+tran_id,
        ipn_url: 'http://pretty-grasshopper-26.loca.lt/practice-management-system/us-central1/api3',
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
    // try {
    // sslcz.init(data).then( apiResponse => {
    //     console.log('Redirecting to: ', apiResponse["GatewayPageURL"])
    
    //     res.send(
    //         "GatewayPageURL" + apiResponse["GatewayPageURL"]
    //     )

    // } )
    // } catch(e) {
        // console.log(e)
    // }
    // let GatewayPageURL = apiResponse
    
    const apiResponse = await sslcz.init(data)
    console.log('Redirecting to: ', apiResponse["GatewayPageURL"])

    const db = admin.firestore();
    await db.collection("transactions").doc(tran_id.toString()).set({
        tran_id: tran_id,
        amount: amount
    })

    res.send({
        "tran_id": tran_id,
        "GatewayPageURL": apiResponse["GatewayPageURL"]
    })

})



app3.post("*", async (request, response) => {
    // console.log(request);
    const val_id = request.body.val_id;
    const tran_id = request.body.tran_id;
    const amount = request.body.amount;
    const db = admin.firestore();


    const tranRef = await db.collection("transactions").doc(tran_id).get()


    if( tranRef.exists && tranRef.data().amount == amount ) {
        await db.collection("transactions")
            .doc(tran_id)
            .update({
                status: "success",
            })
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