"use client"
import styles from "./offer.module.css"
import rmvImg from "../image/Vector (12).png";
import editImg from "../image/Vector (11).png";
import Image from 'next/image';
import foodImg from '../image/image (1).png'
import { useRef, useState } from "react";
import cloudImg from "../image/Vector (13).png"


export default function Offer() {
    const [showDelete, setShowDelete] = useState(false)
    const [showOffer, setShowOffer] = useState(false)
    const [addImg, setAddImg] = useState(null);
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                setAddImg(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageClick = () => {
        fileInputRef.current.click();
    };
    const closeProduct = () => {
        setShowOffer(false)
    }
    const addOfferShowPage = () => {
        setShowOffer(!showOffer)
    }


    const closeModal = () => {
        setShowOffer(false)
        // document.body.style.overflow = "auto"
    }
    const cancel = () => {
        setShowDelete(false)
    }
    const showRmvPage = () => {
        setShowDelete(!showDelete)
    }
    return (
        <>
            {showOffer && (
                <>
                    <div className={styles.backfon} onClick={closeModal}></div>

                    <div className={`${styles.productCountainer} ${showOffer ? styles.open : styles.close}}`}>
                        <div className={styles.imgCountainer}>
                            <button className={styles.productCLoseBtn} onClick={closeProduct}>X</button>
                            <h1>Add Offer</h1>
                            <div className={styles.addImage}>
                                <div className={styles.productWriting}>

                                    <p>Upload image</p>
                                    {addImg ? <Image src={addImg} width={130} height={130} alt='img' /> : null}

                                </div>

                                <div className={styles.addDiv} >
                                    <input ref={fileInputRef}
                                        style={{ display: 'none' }} type='file' onChange={handleImageChange}></input>
                                    <div className={styles.uploadImg}>
                                        <Image onClick={handleImageClick} src={cloudImg} width={130} height={130} alt='img' className={styles.Image} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.addWriting}>

                            <p>
                                Add your Offer information</p>
                            <form>
                                <div className={styles.formDiv}>
                                    <label>Title</label>
                                    <input type="text" />
                                    <label>Description</label>
                                    <input type="text" />


                                </div>
                            </form>
                        </div>
                        <div className={styles.productBtn}>
                            <button onClick={closeProduct}>Cancel</button>
                            <button>Create Product</button>
                        </div>
                    </div>
                </>
            )}
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
                    <h1 className={styles.mLAuto}>Offers</h1>


                    <button onClick={addOfferShowPage} className={styles.mLAuto}>+ Add Offer</button>

                </div>
                <div>
                    <div className={styles.tableDiv}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Description</th>

                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>


                                <tr>
                                    <td>100</td>
                                    <td><Image src={foodImg} alt="food" /></td>

                                    <td>Do you like Pizza at Pap...</td>
                                    <td>Yummy this pizza but...</td>

                                    <td>
                                        <button >
                                            <Image src={editImg} alt="EDit" width={20} height={20} />
                                        </button>
                                        <button onClick={showRmvPage} >
                                            <Image src={rmvImg} alt="Remove" width={20} height={20} />
                                        </button>
                                    </td>
                                </tr>



                            </tbody>
                        </table>
                    </div>

                </div>
            </section>

        </>)
}