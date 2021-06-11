import React, {useState} from 'react'

const CheckoutCart = () =>{
const [cartItems, setCartItems] = useState('');

    const handleChange = (e) =>{
        setCartItems({value: e.target.value});
      }

    const handleSubmit = (e) =>{
        console.log(cartItems)
        e.preventDefault();
      }

    return (
        <form onSubmit={handleSubmit}>
            <p>Please enter all the items purchased seperated by a comma. </p>
            <input className="checkoutInput" type="text" onChange={handleChange}/>

            <button type="submit" className="myButton"> Checkout </button>
        </form>
    );
}

export default CheckoutCart