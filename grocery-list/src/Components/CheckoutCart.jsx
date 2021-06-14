import {useState, useEffect} from 'react'
import groceryItems from '../Data/groceryItems.json'

const CheckoutCart = () =>{
const [cartItems, setCartItems] = useState('');
const [cartItemsAndQuantity, setCartItemsAndQuantity] = useState('');
const [compiledCart, setCompiledCart] = useState('');
const [gross, setGross] = useState(0);
const [net, setNet] = useState(0);

    useEffect(() => {
        return cartItemsAndQuantity != '' ? compileCart() : null
    },[cartItemsAndQuantity]);

    useEffect(() => {
        return compiledCart != '' ? calculateTotal() : null
    },[compiledCart]);

    const handleChange = (e) =>{
        setCartItems({value: e.target.value});
      }

    const compileCart = () =>{
        let grossCartAccumulator = []
        for(let i = 0; i < groceryItems.groceryPrices.length; i++){
            for(let x = 0; x < cartItemsAndQuantity.length; x++){
                if(groceryItems.groceryPrices[i].name === cartItemsAndQuantity[x][0]){
                    grossCartAccumulator.push({
                    'item': groceryItems.groceryPrices[i].name,
                    'quantity': cartItemsAndQuantity[x][1],
                    'price': groceryItems.groceryPrices[i].price,
                    'salesPrice': groceryItems.groceryPrices[i].salesPrice
                })
                }
            }
        }
        setCompiledCart(grossCartAccumulator)
      }

    const calculateTotal = () =>{
        const grossTotal = compiledCart.reduce( ( sum, { price, quantity } ) => sum + (price * quantity) , 0)
            setGross(grossTotal)

        const net = compiledCart.reduce((sum, {item, price, quantity, salesPrice = 0}) => {
            let total = 0
            if (quantity >= 2 && item === "milk") {
                const saleQuantity = 2 * Math.floor(quantity / 2)
                total = ((saleQuantity / 2) * salesPrice) + (price * (quantity - saleQuantity))
            } else if (quantity >= 3 && item === "bread") {
                const saleQuantity = 3 * Math.floor(quantity / 3)
                total = ((saleQuantity / 3) * salesPrice) + (price * (quantity - saleQuantity))
            } else {
                total = (price * quantity)
            }
            return + sum + total
        }, 0)
        setNet(net)
    }

    const handleSubmit = (e) =>{
        const normalizedCart = cartItems.value.split(",").map(el => el.toLowerCase().trim())
        const countedItemsArray = normalizedCart.reduce((allItems, item) => {
            item in allItems ? allItems[item]++ : allItems[item] = 1
          return allItems
        }, {})
        setCartItemsAndQuantity(Object.entries(countedItemsArray))

        e.preventDefault();
      }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <p>Please enter all the items purchased seperated by a comma. </p>
                <input className="checkoutInput" type="text" onChange={handleChange}/>
                <button type="submit" className="myButton"> Checkout </button>
            </form>
            <div>
                <h4>Your Total: ${net}</h4>
                <h4>Your Savings: ${(gross - net).toFixed(2)}</h4>
            </div>
        </div>
    );
}

export default CheckoutCart