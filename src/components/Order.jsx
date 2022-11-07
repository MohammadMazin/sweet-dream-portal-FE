import React from 'react'
import { deleteOrder, setOrderAsPaid } from '../services/orders'

const Order = ({ data, setOrders }) => {
    const { name, quantity, location, amount, paid, phoneNumber, order, _id } = data

    async function handleDelete() {

        const res = await deleteOrder({ _id })
        if (res.success) {
            setOrders(prevOrders => {
                console.log(prevOrders.filter(order => order._id != _id))
                return prevOrders.filter(order => order._id != _id)
            }
            )
            alert('Order Deleted')
        }
        else
            alert('Could not delete order')
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
            alert('Order set as Paid')
        }
        else
            alert('Could not delete order')
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
        <div style={{ margin: 'auto', maxWidth: '800px', backgroundColor: paid === 0 ? '#ffc9c9' : '#7fff94', padding: '1rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <div>
                    <p><b>Customer Name:</b> {name}</p>
                    <p><b>Phone Number:</b> {phoneNumber}</p>
                    <p><b>Quantity:</b> {quantity}</p>
                </div>
                <div>
                    <p><b>Location:</b> {location}</p>
                    <p><b>Amount:</b> {amount}</p>
                </div>
                <div>
                    <h4>Payment Status:<span style={{ color: paid === 0 ? 'red' : 'green', }}> {paidStatus()}</span></h4>
                </div>
            </div>
            <p><b>Order:</b> {order}</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button onClick={handleDelete}>Delete Order</button>
                {paid === 0 ?
                    <button onClick={() => handlePaid(1)}>Mark Order as Complete</button>
                    :
                    <button onClick={() => handlePaid(0)}>Mark Order as Incomplete</button>
                }
            </div>
            <hr />
        </div>
    )
}

export default Order