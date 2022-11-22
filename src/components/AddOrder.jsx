import { useState, useRef } from 'react'
import { addOrder } from '../services/orders'
import toast, { Toaster } from 'react-hot-toast';

const AddOrder = ({ setOrders }) => {

    const [name, setName] = useState(null)
    const [quantity, setQuantity] = useState(null)
    const [location, setLocation] = useState(null)
    const [amount, setAmount] = useState(null)
    const [phoneNumber, setPhoneNumber] = useState(null)
    const [order, setOrder] = useState(null)
    const [deliveryType, setDeliveryType] = useState(null)

    const formRef = useRef()

    const [loading, setLoading] = useState(false)

    async function handleAdd(e) {
        e.preventDefault()
        setLoading(true)

        if (deliveryType === null) {
            toast.error('Could not add Order - Check if all fields are entered properly')
            setLoading(false)
            return
        }

        const data = {
            name,
            quantity,
            location,
            amount: deliveryType === 0 ? amount : amount + 100,
            phoneNumber,
            deliveryType,
            order
        }

        const res = await addOrder(data)
        if (res.success) {
            setOrders(prevOrders => [...prevOrders, { ...data, paid: 0 }])
            toast.success('Order Added')

            formRef.current.reset()
            setName(null)
            setQuantity(null)
            setLocation(null)
            setAmount(null)
            setPhoneNumber(null)
            setOrder(null)
            setDeliveryType(null)
        }
        else
            toast.error('Could not add Order - Check if all fields are entered properly')
        setLoading(false)
    }

    return (
        <>
            <div> <Toaster /></div>
            <form ref={formRef} onSubmit={handleAdd} style={{ maxWidth: '800px', margin: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'start', flexWrap: 'wrap', gap: '1rem' }}>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <label>Customer Name</label>
                    <input type="text" onChange={(e) => setName(e.target.value)} />
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <label>Quantity</label>
                    <input type="text" onChange={(e) => setQuantity(parseInt(e.target.value))} />
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>

                    <label>Address/Location</label>
                    <input type="text" onChange={(e) => setLocation(e.target.value)} />
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <label>Price</label>
                    <input type="text" onChange={(e) => setAmount(parseInt(e.target.value))} />
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <label>Phone Number</label>
                    <input type="text" onChange={(e) => setPhoneNumber(e.target.value)} />
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <label>Delivery Type</label>
                    <select onChange={e => setDeliveryType(e.target.value)}>
                        <option disabled={true} selected={true} >Choose Delivery Type</option>
                        <option value={0}>Customer Will Pickup</option>
                        <option value={1}>Home Delivery</option>
                    </select>
                </div>

                <label>Order Details</label>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <textarea rows="4" cols="50" onChange={(e) => setOrder(e.target.value)} />
                </div>
            </form>
            <button disabled={loading} onClick={handleAdd} style={{ display: 'flex', padding: '0.5rem 3rem', backgroundColor: '#b6e1ff', border: '1px solid blue', cursor: 'pointer', margin: ' 1rem auto' }}>
                {loading ? 'Please Wait...' : 'Submit'}
            </button>
        </>
    )
}

export default AddOrder