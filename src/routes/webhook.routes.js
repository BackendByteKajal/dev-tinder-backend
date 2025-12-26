const express=require('express');
const { PaymentController } = require('../controllers');

const webhookRouter=express.Router()

webhookRouter.post('/payment',PaymentController.verifyPayment)

module.exports=webhookRouter;