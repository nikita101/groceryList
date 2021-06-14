import groceryItems from '../Data/groceryItems.json'

const StoreInventoryList = () =>{
    return <div>
        <h1>Available Grocery Items</h1>
        <ul>
    {groceryItems.groceryPrices.map((item, index) => {
        return <>
        <li className="groceryListItem">
            {(item.name).toUpperCase()}: ${item.price}
            {item.name === "milk" ? " or 2 for $5" : null}
            {item.name === "bread" ? " or 3 for $6" : null}
        </li>
        </>
    })}
    </ul>
    </div>
}

export default StoreInventoryList