"use client"
import styles from "./order.module.css"
import { useState } from "react";

import rmvImg from "../image/Vector (12).png";
import eyesImg from "../image/Vector (14).png"
import Image from 'next/image';

export default function Orders() {
    const [showDelete, setShowDelete]=useState(false)



    const closeModal = () => {
        setShowDelete(false)
        // document.body.style.overflow = "auto"
    }
    const cancel =()=>{
        setShowDelete(false)
    }
    const showRmvPage =()=>{
      setShowDelete(!showDelete)
    }
    return (
        <>
        {showDelete && (
                <>

                    <div className={styles.backfon} onClick={closeModal}></div>
                    <div className={styles.countainerDiv}>
                        <div className={styles.deleteDiv}>
                            <h1>Are you sure it’s deleted ?</h1>
                            <p>Attention! If you delete this product, it will not come back...</p>
                            <div className={styles.deleteBtn}>
                                <button onClick={cancel}>
                                    Cancel
                                </button>
                                <button >
                                    Delete
                                </button>
                            </div>

                        </div>
                    </div>
                </>
            

        )}
        
            <section>
                <div className={styles.head}>
                    <h1 >Orders</h1>
                </div>
                <div>
                <div className={styles.tableDiv}>
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
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
                            

                                <tr>
                                    <td>100</td>
                                    <td>1931</td>
                                    <td>25 Dec 2021</td>
                                    <td>29 Eve Street, 543 Evenue Road, Ny 87876  </td>
                                    <td>$249.7</td>
                                    <td>Cash On Delivery</td>
                                    <td>994-51-410-3130</td>
                                    <td>
                                        <button >
                                            <Image src={eyesImg} alt="eyes" width={20} height={20} />
                                        </button>
                                        <button onClick={showRmvPage}>
                                            <Image src={rmvImg} alt="Remove" width={20} height={20} />
                                        </button>
                                    </td>
                                </tr>
                                
                                
                        
                        </tbody>
                    </table>
                </div>


                </div>
            </section>

        </>
    )
}