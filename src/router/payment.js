const express = require('express');
const authentication = require('../middlewares/auth');
const PaymentRouter = express.Router();
const { paymentCreation } = require('../controllers/paymentController');

PaymentRouter.post('/payment/creation', authentication,paymentCreation);

module.exports = PaymentRouter;
