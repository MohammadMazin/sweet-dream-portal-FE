import { deleteOrder, setOrderAsPaid } from '../services/orders'
import toast, { Toaster } from 'react-hot-toast';


const Order = ({ index, data, setOrders }) => {
    const { name, quantity, location, amount, paid, phoneNumber, deliveryType, order, _id } = data
    const orderId = _id

    async function handleDelete() {
        const res = await deleteOrder({ _id })
        if (res.success) {
            setOrders(prevOrders => {
                console.log(prevOrders.filter(order => order._id != orderId))
                return prevOrders.filter(order => order._id != orderId)
            }
            )
            toast.success('Order Deleted')
        }
        else
            toast.error('Could Not Delete Order!')
    }

    async function handlePaid(paid) {
        const res = await setOrderAsPaid({ _id, paid })
        if (res.success) {
            setOrders(prevOrders => {
                const index = prevOrders.findIndex(order => order._id === _id)
                console.log(index)
                prevOrders[index].paid = paid
                return [...prevOrders]
            })
            toast.success(`Order Set as ${paid === 0 ? 'Not Paid' : 'Paid'}`)
        }
        else
            toast.error('Could not Change Order Status')
    }

    function paidStatus() {
        switch (paid) {
            case 0:
                return 'Not Paid'
            case 1:
                return 'Paid'
        }
    }

    return (
        <>
            <div><Toaster /></div>
            <div style={{ width: 'max-content', margin: 'auto', maxWidth: '800px', backgroundColor: paid === 0 ? '#ffc9c9' : '#7fff94', padding: '1rem', marginBottom: '1rem', borderRadius: '1rem' }}>
                <p><b>Customer Name:</b> {name}</p>
                <p><b>Phone Number:</b> {phoneNumber}</p>
                <p><b>Quantity:</b> {quantity}</p>
                <p><b>Location:</b> {location}</p>
                <p><b>Amount:</b> {amount}</p>
                <p><b>Delivery Type: </b> {deliveryType === 0 ? 'Customer Will Pickup' : 'Home Delivery'}</p>
                <h4>Payment Status:<span style={{ color: paid === 0 ? 'red' : 'green', }}> {paidStatus()}</span></h4>
                <p><b>Order Details:</b> {order}</p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button style={{ padding: '0.5rem 0' }} onClick={handleDelete}>Delete Order</button>
                    {paid === 0 ?
                        <button style={{ padding: '0.5rem 0' }} onClick={() => handlePaid(1)}>Mark Order as Complete</button>
                        :
                        <button style={{ padding: '0.5rem 0' }} onClick={() => handlePaid(0)}>Mark Order as Incomplete</button>
                    }
                </div>
                <button style={{ width: '100%', marginTop: '1rem', padding: '0.5rem 0' }} onClick={handleDelete}>Edit Order</button>
            </div>
        </>
    )
}

export default Order