"use client"
import styles from "./offer.module.css"
import rmvImg from "../image/Vector (12).png";
import editImg from "../image/Vector (11).png";
import Image from 'next/image';
import foodImg from '../image/image (1).png'
import { use, useEffect, useRef, useState } from "react";
import cloudImg from "../image/Vector (13).png"
import axios from "axios";
import Category from "../category/page";
import imgCloudd from "../image/Vector (13).png"
import spinGif from '../image/spin2.gif'


export default function Offer() {
    const [showDelete, setShowDelete] = useState(false)
    const [showOffer, setShowOffer] = useState(false)
    const [editOfferID, setEditOfferId] = useState([])
    const [deleteId, setDeleteId] = useState("")
    const [addImg, setAddImg] = useState(null);
    const [offers, setOffers] = useState([])
    const [showEdit, setShowEdit] = useState(false)
    const [editOffer, setEditOffer] = useState([])
    const [spin, setSpin]=useState(true)


    const fileInputRef = useRef(null);
    const titleRef = useRef()
    const desRef = useRef()
    const nameRef = useRef();
    const cuisineRef = useRef();

    const showEditPage = async (id) => {
        setEditOfferId(id)

        setShowEdit(!showEdit)
        await fetchEdit(id)
        nameRef.current.value = editOffer.name || "";
        cuisineRef.current.value = editOffer.description || "";
        setAddImg(editOffer.img_url || "");


    }
    const putOffer = async () => {
        await axios.put(`/api/offer/${editOfferID}`, {
            name: nameRef.current.value,
            description: cuisineRef.current.value,
            img_url: addImg
        }
        )
        getOffer()
        setShowEdit(false)
    }
    const fetchEdit = async (id) => {
        const response = await axios.get(`/api/offer/${id}`)

        setEditOffer(response.data.result.data),
        setSpin(false)
    }
    useEffect(() => {
        if (editOffer && showEdit) {
            nameRef.current.value = editOffer.name || "";
            cuisineRef.current.value = editOffer.description || "";
            setAddImg(editOffer.img_url || "");
        }
    }, [editOffer]);
    const deleteOffer = async () => {
        console.log(deleteId, "delete")
        await axios.delete(`/api/offer/${deleteId}`)
        getOffer()
        setShowDelete(false)

    }

    const createOffer = async () => {
        await axios.post("/api/offer", {
            name: titleRef.current.value,
            description: desRef.current.value,
            img_url: addImg
        })
        setShowOffer(false)
        titleRef.current.value = null
        desRef.current.value = null
        setAddImg("")
        getOffer()

    }
    const getOffer = async () => {
    
        const response = await axios.get("/api/offer")
        setOffers(response.data.result.data)
        setSpin(false)
    }
    useEffect(() => {
        getOffer()
    })

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
        setAddImg("")
    }
    const addOfferShowPage = () => {
        setShowOffer(!showOffer)
    }


    const closeModal = () => {
        setShowOffer(false)
        setShowEdit(false)
        setAddImg("")

        // document.body.style.overflow = "auto"
    }
    const cancel = () => {
        setShowDelete(false)
    }
    const showRmvPage = (id) => {
        setShowDelete(!showDelete)
        setDeleteId(id)
    }
    return (
        <>
          {spin && (
                <div className={styles.spinnerContainer} >
                    <Image  className={styles.spinner} src={spinGif} alt="Loading..." width={400} height={400} />
                </div>
            )}
        
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
                                    {addImg ? <Image src={addImg} width={100} height={100} alt='img' /> : null}

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
                                    <input type="text" ref={titleRef} />
                                    <label>Description</label>
                                    <input type="text" ref={desRef} />


                                </div>
                            </form>
                        </div>
                        <div className={styles.productBtn}>
                            <button onClick={closeProduct}>Cancel</button>
                            <button onClick={createOffer}>Create Product</button>
                        </div>
                    </div>
                </>
            )}
            {showEdit && (
                <>
                    <div className={styles.backfonEdit} onClick={closeModal}></div>
                    <div className={`${styles.productCountainerEdit} ${showEdit ? styles.open : styles.close}`}>
                        <div className={styles.imgCountainer}>
                            <button className={styles.productCLoseBtnEdit} onClick={closeModal}>X</button>
                            <h1>Upload image</h1>
                            <div className={styles.addImage}>
                                <div className={styles.productWritingEdit}>
                                    <p>Upload your product image</p>
                                    {addImg ? <Image src={addImg} width={120} height={120} alt='img' /> : null}
                                </div>
                                <div className={styles.addDivEdit}>
                                    <input ref={fileInputRef} style={{ display: 'none' }} type='file' onChange={handleImageChange}></input>
                                    <div className={styles.uploadImgEdit}>
                                        <Image onClick={handleImageClick} src={imgCloudd} width={130} height={130} alt='img' className={styles.Image} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.addWritingEdit}>
                            <p>Edit your Product description and necessary information</p>
                            <form>
                                <div className={styles.formDivEdit}>
                                    <label>Name</label>
                                    <input type="text" ref={nameRef} />
                                    <label>Description</label>
                                    <input type="text" ref={cuisineRef} />

                                </div>
                            </form>
                        </div>
                        <div className={styles.productBtnEdit}>
                            <button onClick={closeModal}>Cancel</button>
                            <button onClick={putOffer}>Edit Restaurant</button>
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
                                <button onClick={deleteOffer} >
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

                                {offers.map((offer, index) => (
                                    <tr className={styles.trr} key={index}>
                                        <td>{index}</td>
                                        <td><Image src={offer.img_url} alt="food" width={50} height={50} /></td>
                                        <td>{offer.name}</td>
                                        <td className={styles.tdDescription}>{offer.description}</td> {/* Burada className əlavə edilir */}
                                        <td>
                                            <button onClick={() => showEditPage(offer.id)}>
                                                <Image src={editImg} alt="Edit" width={20} height={20} />
                                            </button>
                                            <button onClick={() => showRmvPage(offer.id)}>
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

        </>)
}