"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./restaurant.module.css";
import imgCloudd from "../image/Vector (13).png";
import editImg from "../image/Vector (11).png";
import rmvImg from "../image/Vector (12).png";
import Image from 'next/image';
import axios from 'axios';
import spinGif from '../image/spin2.gif'
export default function Restaurants() {

    const [showRestaurants, setShowRestaurants] = useState(false);
    const [addImg, setAddImg] = useState(null);
    const [getCategory, setGetCategory] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    const [restuarantss, setRestaurantss] = useState([]);
    const [deleteId, setDeleteId] = useState("");
    const [spin,setSpin]=useState(true)
    const [showEdit, setShowEdit] = useState(false);
    const [editRestaurantId, setEditRestaurantId] = useState("");
    const [editRestaurant, setEditRestaurant] = useState({});
    const [showDelete, setShowDelete] = useState(false);

    const fileInputRef = useRef();
    const nameRef = useRef();
    const dPRef = useRef();
    const dMRef = useRef();
    const addrressRef = useRef();
    const cuisineRef = useRef();

    // Fetch restaurants from API and apply filter
    const fetchRestaurants = async (categoryId) => {
        const response = await axios.get(`/api/restuarants`);
        const allRestaurants = response.data.result.data;
        // Filter restaurants based on selected category
        setSpin(false)
        if (categoryId) {
            setRestaurantss(allRestaurants.filter(restaurant => restaurant.category_id === categoryId));
        } else {
            setRestaurantss(allRestaurants);
        }
    };

    const putRestaurant = async () => {
        await axios.put(`/api/restuarants/${editRestaurantId}`, {
            name: nameRef.current.value,
            cuisine: cuisineRef.current.value,
            img_url: addImg,
            address: addrressRef.current.value,
            delivery_min: dMRef.current.value,
            delivery_price: dPRef.current.value,
            category_id: selectedValue
        });
        fetchRestaurants(selectedValue);
        setShowEdit(false);
    };
    const fetchEdit = async (id) => {
        const response = await axios.get(`/api/restuarants/${id}`);
        setEditRestaurant(response.data.result.data);
        setSpin(false)
    };

    useEffect(() => {
        fetchRestaurants(selectedValue);
    }, [selectedValue]);

    useEffect(() => {
        if (editRestaurant && showEdit) {
            nameRef.current.value = editRestaurant.name || "";
            cuisineRef.current.value = editRestaurant.cuisine || "";
            dMRef.current.value = editRestaurant.delivery_min || "";
            dPRef.current.value = editRestaurant.delivery_price || "";
            addrressRef.current.value = editRestaurant.address || "";
            setSelectedValue(editRestaurant.category_id || '');
            setAddImg(editRestaurant.img_url || "");
        }
    }, [editRestaurant, showEdit]);

    const showEditPage = async (id) => {
        setEditRestaurantId(id);
        setShowEdit(true);
        await fetchEdit(id);
    };

    const deleteRestaurants = async () => {
        await axios.delete(`/api/restuarants/${deleteId}`);
        fetchRestaurants(selectedValue);
        setShowDelete(false);
    };

    const createRestuarants = async () => {
        await axios.post("/api/restuarants", {
            name: nameRef.current.value,
            category_id: selectedValue,
            img_url: addImg,
            cuisine: cuisineRef.current.value,
            address: addrressRef.current.value,
            delivery_min: dMRef.current.value,
            delivery_price: dPRef.current.value
        });
        fetchRestaurants(selectedValue);
        nameRef.current.value = "";
        addrressRef.current.value = "";
        dPRef.current.value = "";
        dMRef.current.value = "";
        cuisineRef.current.value = "";
        setAddImg("");
        setShowRestaurants(false);
    };

    const fetchCategory = async () => {
        const response = await axios.get("/api/category");
        setGetCategory(response.data.result.data);
        setSpin(false)
    };

    useEffect(() => {
        fetchCategory();
    }, []);

    useEffect(() => {
        if (getCategory.length > 0) {
            setSelectedValue(getCategory[0]?.id || '');
        }
    }, [getCategory]);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const showRmvPage = (id) => {
        setShowDelete(true);
        setDeleteId(id);
    };

    const cancel = () => {
        setShowDelete(false);
    };

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

    const close = () => {
        setShowRestaurants(false);
        setShowEdit(false);
        setAddImg("");
    };

    return (
        <>
          {spin && (
                <div className={styles.spinnerContainer} >
                    <Image  className={styles.spinner} src={spinGif} alt="Loading..." width={400} height={400} />
                </div>
            )}
            {showEdit && (
                <>
                    <div className={styles.backfonEdit} onClick={close}></div>
                    <div className={`${styles.productCountainerEdit} ${showEdit ? styles.open : styles.close}`}>
                        <div className={styles.imgCountainer}>
                            <button className={styles.productCLoseBtnEdit} onClick={close}>X</button>
                            <h1>Upload image</h1>
                            <div className={styles.addImage}>
                                <div className={styles.productWritingEdit}>
                                    <p>Upload your product image</p>
                                    {addImg ? <Image src={addImg} width={130} height={130} alt='img' /> : null}
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
                                    <label>Cuisine</label>
                                    <input type="text" ref={cuisineRef} />
                                    <label>Delivery Price $</label>
                                    <input type="number" ref={dPRef} />
                                    <label>Delivery Min</label>
                                    <input type="number" ref={dMRef} />
                                    <label>Address</label>
                                    <input type="text" ref={addrressRef} />
                                    <label>Category</label>
                                    <select value={selectedValue} onChange={handleChange}>
                                        {getCategory.map(category => (
                                            <option key={category.id} value={category.id}>{category.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div className={styles.productBtnEdit}>
                            <button onClick={close}>Cancel</button>
                            <button onClick={putRestaurant}>Edit Restaurant</button>
                        </div>
                    </div>
                </>
            )}
            {showDelete && (
                <>
                    <div className={styles.backfon1} onClick={close}></div>
                    <div className={styles.countainerDiv1}>
                        <div className={styles.deleteDiv}>
                            <h1>Are you sure you want to delete?</h1>
                            <p>Attention! If you delete this restaurant, it will not come back...</p>
                            <div className={styles.deleteBtn}>
                                <button onClick={cancel}>Cancel</button>
                                <button onClick={deleteRestaurants}>Delete</button>
                            </div>
                        </div>
                    </div>
                </>
            )}
            {showRestaurants && (
                <>
                    <div className={styles.backfon} onClick={close}></div>
                    <div className={`${styles.productCountainer} ${showRestaurants ? styles.open : styles.close}`}>
                        <button onClick={close} className={styles.x}>X</button>
                        <h1 className={styles.edit}>Add Restaurant</h1>
                        <div className={styles.addImg}>
                            <div className={styles.productWriting}>
                                <p>Upload your product image</p>
                                {addImg ? <Image src={addImg} width={110} height={110} alt='img' /> : null}
                            </div>
                            <div className={styles.addDiv}>
                                <input ref={fileInputRef} style={{ display: 'none' }} type='file' onChange={handleImageChange}></input>
                                <div className={styles.uploadImg}>
                                    <Image onClick={handleImageClick} src={imgCloudd} width={130} height={130} alt='img' className={styles.Image} />
                                </div>
                            </div>
                        </div>
                        <div className={styles.addWriting}>
                            <p>Edit your Restaurant information</p>
                            <form>
                                <div className={styles.formDiv}>
                                    <label>Name</label>
                                    <input className={styles.inputt} type="text" ref={nameRef} />
                                    <label>Cuisine</label>
                                    <input type="text" ref={cuisineRef} />
                                    <label>Delivery Price $</label>
                                    <input type="number" ref={dPRef} />
                                    <label>Delivery Min</label>
                                    <input type="number" ref={dMRef} />
                                    <label>Address</label>
                                    <input type="text" ref={addrressRef} />
                                    <label>Category</label>
                                    <select value={selectedValue} onChange={handleChange}>
                                        {getCategory.map(category => (
                                            <option key={category.id} value={category.id}>{category.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div className={styles.productBtn}>
                            <button onClick={close}>Cancel</button>
                            <button onClick={createRestuarants}>Add Restaurant</button>
                        </div>
                    </div>
                </>
            )}
            <section className={styles.select}>
                <div className={styles.head}>
                    <h1 className={styles.mLAuto}>Restaurants</h1>
                    <select className={styles.mLAuto} value={selectedValue} onChange={handleChange}>
                        <option value=''>Category type</option>
                        {getCategory.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                    <button className={styles.mLAuto} onClick={() => setShowRestaurants(true)}>+ Add Restaurant</button>
                </div>
                <div className={styles.countainerDiv}>
                    {restuarantss.map((restaurant, index) => (
                        <div key={index} className={styles.box}>
                            <div className={styles.img}>
                                <Image src={restaurant.img_url} height={50} width={50} alt="img" />
                            </div>
                            <div className={styles.info}>
                                <h1 className={styles.name}>{restaurant.name}</h1>
                                <h2 className={styles.name} >{restaurant.cuisine}</h2>
                            </div>
                            <div className={styles.otherImg}>
                                <button onClick={() => showRmvPage(restaurant.id)}>
                                    <Image src={rmvImg} alt="img" />
                                </button>
                                <button onClick={() => showEditPage(restaurant.id)}>
                                    <Image src={editImg} alt="img" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
