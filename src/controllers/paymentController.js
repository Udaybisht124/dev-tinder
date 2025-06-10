const express = require("express");
const paymentModel = require("../models/payments");
const RazorpayInstance = require('../utils/razorpay');

const paymentCreation = async ()=>{
      try {
    const order = await RazorpayInstance.orders.create({
      amount: 50000, //here amount is 500 rupees
      currency: 'INR',
      receipt: 'receipt#1',
      notes: {
        firstName: 'value1', 
        LastName: 'value2',
      }    
    })

    //store the response data to database
    const payment = new Payment({
      order_id: order.id,
      user_id: req.user._id,
      amount: order.amount,
      currency: order.currency,
      status: order.status,
      notes: order.notes
    })

    const savedPayment = await payment.save()

    res.status(200).json({ success: true, message: "Order created successfully", data: savedPayment });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Order creation failed", error: error.message });
  }
}



module.exports = { paymentCreation}