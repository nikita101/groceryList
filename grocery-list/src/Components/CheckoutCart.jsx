import {useState, useEffect} from 'react'
import groceryItems from '../Data/groceryItems.json'

const CheckoutCart = () =>{
const [cartItems, setCartItems] = useState('');
const [cartItemsAndQuantity, setCartItemsAndQuantity] = useState('');
const [compiledCart, setCompiledCart] = useState('');
const duplicateCounts = {};

    useEffect(() => {
        return cartItemsAndQuantity != '' ? compileCart() : null
    },[cartItemsAndQuantity]);

    useEffect(() => {
        return compiledCart != '' ? calculateGrossTotal() : null
    },[compiledCart]);

    const handleChange = (e) =>{
        setCartItems({value: e.target.value});
      }

    const compileCart = () =>{
        let grossCartAccumulator = []
        for(let i = 0; i < groceryItems.groceryPrices.length; i++){
            for(let x = 0; x < cartItemsAndQuantity.length; x++){
                if(groceryItems.groceryPrices[i].name === cartItemsAndQuantity[x][0]){
                    grossCartAccumulator.push({'item': groceryItems.groceryPrices[i].name,
                    'quantity': cartItemsAndQuantity[x][1],
                    'price': groceryItems.groceryPrices[i].price})
                }
            }
        }
        setCompiledCart(grossCartAccumulator)
      }

    const calculateGrossTotal = () =>{
        const grossTotal = compiledCart.reduce( ( sum, { price, quantity } ) => sum + (price * quantity) , 0)
        console.log(grossTotal)
    }

    const handleSubmit = (e) =>{
        const normalizedCart = cartItems.value.split(",").map(el => el.toLowerCase().trim())
        const countedItemsArray = normalizedCart.reduce((allItems, item) => {
            item in allItems ? allItems[item]++ : allItems[item] = 1
          return allItems
        }, {})
        setCartItemsAndQuantity(Object.entries(countedItemsArray))


        normalizedCart.filter((item, index)=>normalizedCart.indexOf(item) != index).forEach(function (x) { duplicateCounts[x] = (duplicateCounts[x] || 0) + 1; })

        if (duplicateCounts && Object.keys(duplicateCounts).length === 0 && duplicateCounts.constructor === Object){
            // duplicateCounts.forEach(function (item) { console.log(item) })
            }
        e.preventDefault();
      }

      // display the cart
    //   for (let [key, value] of Object.entries(cartItemsAndQuantity)) {
    //     console.log(key + ':' + value);
    //   }
    // or
    // compiledCart.reduce((accumulator, currentValue,) => {
    //     console.log(currentValue.item, currentValue.price * currentValue.quantity)
    // }, {})

    return (
        <form onSubmit={handleSubmit}>
            <p>Please enter all the items purchased seperated by a comma. </p>
            <input className="checkoutInput" type="text" onChange={handleChange}/>

            <button type="submit" className="myButton"> Checkout </button>
        </form>
    );
}

export default CheckoutCart