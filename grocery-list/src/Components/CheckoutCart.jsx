import react from 'react'

const CheckoutCart = () =>{

    const onSubmit= ()=>{

    }

    return (
        <form>
            <p>Please enter all the items purchased seperated by a comma. </p>
            <input className="checkoutInput" type="text"/>
            <button type="submit" className="myButton"> Checkout </button>
        </form>
    )
}

export default CheckoutCart