import React, { useState,useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import "./PaymentGateway.css";

const PaymentGateway = () => {
  const { getTotalCartAmount } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      alert("Payment Successful!");
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="payment-container">
      <h2>Payment Gateway</h2>
      <p>Total Amount: ₹{totalAmount}</p>
      <div className="input-group">
        <label>Card Number</label>
        <input
          type="text"
          placeholder="1234 5678 9012 3456"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
      </div>
      <div className="input-row">
        <div className="input-group">
          <label>Expiry Date</label>
          <input
            type="text"
            placeholder="MM/YY"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>CVV</label>
          <input
            type="text"
            placeholder="123"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
          />
        </div>
      </div>
      <div className="input-group">
        <label>Cardholder Name</label>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <button onClick={handlePayment} disabled={isProcessing}>
        {isProcessing ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
};

export default PaymentGateway;
