class PaymentSaveDto {
  orderId;
  userId;
  status;
  amount;
  amountDue;
  attempts;
  razorpayCreatedAt;
  currency;
  entity;
  notes;
  constructor(razorPayOrderDetail) {
    this.orderId = razorPayOrderDetail.id;
    this.userId = razorPayOrderDetail.userId;
    this.status = razorPayOrderDetail.status;
    this.amount = razorPayOrderDetail.amount;
    this.amountDue = razorPayOrderDetail.amount_due;
    this.attempts = razorPayOrderDetail.attempts;
    this.razorpayCreatedAt = razorPayOrderDetail.created_at;
    this.currency = razorPayOrderDetail.currency;
    this.entity = razorPayOrderDetail.entity;
    this.notes = razorPayOrderDetail.notes;
  }
}
module.exports = PaymentSaveDto;
