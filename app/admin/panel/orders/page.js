"use client"
import styles from "./order.module.css"
import { useCallback, useEffect, useState } from "react";

import rmvImg from "../image/Vector (12).png";
import eyesImg from "../image/Vector (14).png"
import Image from 'next/image';
import axios from "axios";
import spinGif from '../image/spin2.gif'

export default function Orders() {
    const [showDelete, setShowDelete] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [order, setOrder] = useState([]);
    const [selectedOrderProducts, setSelectedOrderProducts] = useState([]); // Specific order's products
    const [selectedOrderId, setSelectedOrderId] = useState(null); // Selected order's ID
    const [spin, setSpin] = useState(true);

    let authorization;
    if (typeof window !== 'undefined') {
        authorization = localStorage.getItem('access_token');
    }

    const fetchOrder = async () => {
        setSpin(true); // Set loading to true before making the API call
        const response = await axios.get('/api/order', {
            headers: {
                Authorization: `Bearer ${authorization}`
            }
        });
        setOrder(response);
        setSpin(false); // Set loading to false after the data is fetched
    };

    useEffect(() => {
        fetchOrder();
    }, []);

    const deleteOrder = useCallback(async () => {
        if (!selectedOrderId) return;
        console.log("Selected order ID:", selectedOrderId);

        try {
            await axios.delete('/api/order', {
                headers: {
                    Authorization: `Bearer ${authorization}`
                },
                data: {
                    order_id: selectedOrderId
                }
            });
            setShowDelete(false);
            await fetchOrder(); // Refresh order list after deletion
        } catch (error) {
            console.error('Error deleting order:', error.response?.data || error.message);
        }
    }, [selectedOrderId]);

    const closeModal = () => {
        setShowDelete(false);
        setIsOpen(false);
    };

    const cancel = () => {
        setShowDelete(false);
    };

    const showRmvPage = (id) => {
        setSelectedOrderId(id); // Set the selected order ID
        setShowDelete(true);
    };

    const allInfo = (id) => {
        setSelectedOrderId(id); // Set the selected order ID for viewing
        const orderData = order.data?.result.data.find((o) => o.id === id); // Find the specific order
        setSelectedOrderProducts(orderData ? orderData.products : []); // Set products for the selected order
        setIsOpen(true);
    };

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    return (
        <>
            {spin && (
                <div className={styles.spinnerContainer} >
                    <Image className={styles.spinner} src={spinGif} alt="Loading..." width={400} height={400} />
                </div>
            )}
            {showDelete && (
                <>
                    <div className={styles.backfon} onClick={closeModal}></div>
                    <div className={styles.countainerDiv}>
                        <div className={styles.deleteDiv}>
                            <h1>Are you sure it’s deleted?</h1>
                            <p>Attention! If you delete this product, it will not come back...</p>
                            <div className={styles.deleteBtn}>
                                <button onClick={cancel}>Cancel</button>
                                <button onClick={deleteOrder}>Delete</button>
                            </div>
                        </div>
                    </div>
                </>
            )}

            <section className={styles.orderSection}>
                <div className={styles.backfon} onClick={closeModal} style={{ display: isOpen ? 'block' : 'none' }}></div>

                <div style={{ display: isOpen ? 'block' : 'none' }} className={styles.allInfoDiv}>
                    <table className={styles.allInfoTable}>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price $</th>
                                <th>Count</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedOrderProducts.map((product, index) => (
                                <tr key={index}>
                                    <td><Image alt="sos" width={40} height={40} src={product.img_url} /></td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.count}</td>
                                    <td>{product.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className={styles.head}>
                    <h1>Orders</h1>
                </div>
                <div className={styles.divv}>
                    <div className={styles.tableDiv}>
                    
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Customer ID</th>
                                        <th>Time</th>
                                        <th>Delivery Address</th>
                                        <th>Amount</th>
                                        <th>Payment Method</th>
                                        <th>Contact</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.data?.result.data?.map((orders, index) => (
                                        <tr key={index}>
                                            <td className={styles.td}>{index + 1}</td>
                                            <td className={styles.td}>{orders.customer_id}</td>
                                            <td className={styles.td}>{new Date(orders.created * 1000).toLocaleDateString()}</td>
                                            <td className={styles.td}>{orders.delivery_address}</td>
                                            <td className={styles.td}>{orders.amount}</td>
                                            <td className={styles.td}>{orders.payment_method === 0 ? 'Cash On Delivery' : 'Pay at the door by credit card'}</td>
                                            <td className={styles.td}>{orders.contact}</td>
                                            <td>
                                                <button onClick={() => allInfo(orders.id)}>
                                                    <Image src={eyesImg} alt="View Details" width={20} height={20} />
                                                </button>
                                                <button onClick={() => showRmvPage(orders.id)}>
                                                    <Image src={rmvImg} alt="Remove" width={20} height={20} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                    </div>
                </div>
            </section>
        </>
    );
}
