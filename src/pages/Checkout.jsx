import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../redux/cartSlice';
import '../styles/checkout.css';
import Alert from '../components/Alert';

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [form, setForm] = useState({
    fullName: '',
    street: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const totalAmount = cartItems.reduce(
    (total, item) => total + (Number(item.price) || 0) * (Number(item.qty) || 1),
    0
  );

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');

    if (!userInfo?.token) {
      navigate('/login');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify({
          products: cartItems.map((item) => ({
            product: item.productId || item._id,
            qut: Number(item.qty) || 1,
            price: Number(item.price) || 0,
          })),
          totalAmount,
          address: form,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Unable to place order');
      }

      dispatch(clearCart());
      setOrderPlaced(true);
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (orderPlaced) {
    return (
      <main className="checkout-page">
        <div className="container checkout-success">
          <p className="checkout-eyebrow">SHOPNEST CHECKOUT</p>
          <h1>Order placed successfully</h1>
          <p>Thank you for shopping with us. We will prepare your order for delivery.</p>
          <Link to="/" className="btn btn-primary">Continue shopping</Link>
        </div>
      </main>
    );
  }

  if (cartItems.length === 0) {
    return (
      <main className="checkout-page">
        <div className="container checkout-success">
          <h1>Your cart is empty</h1>
          <p>Add products before checking out.</p>
          <Link to="/" className="btn btn-primary">Browse products</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="container checkout-container">
        <div className="checkout-heading">
          <p className="checkout-eyebrow">SHOPNEST CHECKOUT</p>
          <h1>Delivery details</h1>
          <p>Tell us where to send your order.</p>
        </div>

        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={handleSubmit}>
            <label>Full name<input name="fullName" value={form.fullName} onChange={handleChange} required /></label>
            <label>Street address<input name="street" value={form.street} onChange={handleChange} required /></label>
            <div className="checkout-form-row">
              <label>City<input name="city" value={form.city} onChange={handleChange} required /></label>
              <label>Postal code<input name="postalCode" value={form.postalCode} onChange={handleChange} required /></label>
            </div>
            <label>Country<input name="country" value={form.country} onChange={handleChange} required /></label>
            {error && <div className="checkout-error"><Alert>{error}</Alert></div>}
            <button type="submit" className="btn btn-primary checkout-submit" disabled={submitting}>
              {submitting ? 'Placing order...' : 'Place order'}
            </button>
          </form>

          <aside className="checkout-summary">
            <h2>Order summary</h2>
            {cartItems.map((item) => (
              <div className="checkout-summary-row" key={item._id}>
                <span>{item.name} x {Number(item.qty) || 1}</span>
                <strong>${((Number(item.price) || 0) * (Number(item.qty) || 1)).toFixed(2)}</strong>
              </div>
            ))}
            <div className="checkout-total">
              <span>Total</span>
              <strong>${totalAmount.toFixed(2)}</strong>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
