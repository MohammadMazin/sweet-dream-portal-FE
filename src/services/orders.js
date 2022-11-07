import axios from "axios";
import { dbUrl } from "../global";

const baseUrl = `${dbUrl}orders/`

export const getAllOrders = async() => {
    const response = await axios.get(`${baseUrl}`)
    return response.data
}

export const addOrder = async(data) => {
    const response = await axios.post(`${baseUrl}add`, data)
    return response.data
}
export const setOrderAsPaid = async(data) => {
    const response = await axios.post(`${baseUrl}paid`, data)
    return response.data
}

export const deleteOrder = async(data) => {
    const response = await axios.post(`${baseUrl}delete`, data)
    return response.data
}