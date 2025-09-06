import React, { useEffect, useState, useContext } from 'react';
import "./CartPage.css";
import remove from '../../assets/remove.png';
import defaultUserImg from '../../assets/user.webp';
import Table from '../Common/Table';
import QuantityInput from '../SingleProduct/QuantityInput';
import UserContext from '../../contexts/UserContext';
import CartContext from '../../contexts/CartContext';

const CartPage = () => {
  const [subtotal, setSubtotal] = useState(0);
  const user = useContext(UserContext);  
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  useEffect(() => {
    let total = 0;
    cart.forEach(item => {
      total += item.product.price * item.quantity;
    });
    setSubtotal(total);
  }, [cart]);

  return (
    <section className='align_center cart_page'>
      <div className="align_center user_info">
        <img
          src={
            user?.profilePic
              ? `http://localhost:5000/profile/${user.profilePic}`
              : defaultUserImg
          }
          alt="user profile"
        />
        <div>
          <p className="user_name">Name: {user?.name || "Guest"}</p>
          <p className="user_email">Email: {user?.email || "guest@example.com"}</p>
        </div>
      </div>

      <Table headings={["Item", "Price", "Quantity", "Total", "Remove"]}>
        <tbody>
          {cart.map(({ product, quantity }) => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td>${product.price}</td>
              <td className="align_center table_quantity_input">
                <QuantityInput
                  quantity={quantity}
                  stock={product.stock}
                  setQuantity={(newQty) => addToCart(product, newQty)} // ✅ update qty
                />
              </td>
              <td>${quantity * product.price}</td>
              <td>
                <img
                  src={remove}
                  alt="remove icon"
                  className="cart_remove_icon"
                  onClick={() => removeFromCart(product._id)} // ✅ remove item
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <table className="cart_bill">
        <tbody>
          <tr>
            <td>Subtotal</td>
            <td>${subtotal}</td>
          </tr>
          <tr>
            <td>Shipping Charge</td>
            <td>$5</td>
          </tr>
          <tr className="cart_bill_final">
            <td>Total</td>
            <td>${subtotal + 5}</td>
          </tr>
        </tbody>
      </table>

      <button className="search_button checkout_button">Checkout</button>
    </section>
  );
};

export default CartPage;
