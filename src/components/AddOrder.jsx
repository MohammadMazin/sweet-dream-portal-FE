import { useState } from 'react'
import { addOrder } from '../services/orders'

const AddOrder = ({ setOrders }) => {

    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState(null)
    const [location, setLocation] = useState('')
    const [amount, setAmount] = useState(null)
    const [phoneNumber, setPhoneNumber] = useState('')
    const [order, setOrder] = useState('')

    const [loading, setLoading] = useState(false)

    async function handleAdd(e) {
        e.preventDefault()
        setLoading(true)
        const data = {
            name,
            quantity,
            location,
            amount: amount * quantity,
            phoneNumber,
            order
        }

        const res = await addOrder(data)
        if (res.success) {
            setOrders(prevOrders => [...prevOrders, { ...data, paid: 0 }])
            alert('Order Added')
        }
        else
            alert('Could not add order')
        setLoading(false)
    }

    return (
        <>
            <form onSubmit={handleAdd} style={{ maxWidth: '800px', margin: 'auto', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
                <div>
                    <label>Customer Name</label>
                    <input type="text" onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label>Quantity</label>
                    <input type="text" onChange={(e) => setQuantity(parseInt(e.target.value))} />
                </div>

                <div>

                    <label>Address/Location</label>
                    <input type="text" onChange={(e) => setLocation(e.target.value)} />
                </div>

                <div>

                    <label>Price</label>
                    <input type="text" onChange={(e) => setAmount(parseInt(e.target.value))} />
                </div>

                <div>

                    <label>Phone Number</label>
                    <input type="text" onChange={(e) => setPhoneNumber(e.target.value)} />
                </div>

                <div>

                    <label>Order</label>
                    <input type="text" onChange={(e) => setOrder(e.target.value)} />
                </div>
            </form>
            <button disabled={loading} onClick={handleAdd} style={{ display: 'flex', padding: '0.5rem 3rem', backgroundColor: '#b6e1ff', border: '1px solid blue', cursor: 'pointer', margin: ' 1rem auto' }}>
                {loading ? 'Please Wait...' : 'Submit'}
            </button>
        </>
    )
}

export default AddOrder