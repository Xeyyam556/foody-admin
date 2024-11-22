"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import styles from "./product.module.css";
import editImg from "../image/Vector (11).png";
import rmvImg from "../image/Vector (12).png";
import Image from 'next/image';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect, useState, useRef } from 'react';
import Slider from "react-slick";
import axios from 'axios';
import cloudImg from "../image/Vector (13).png";
import spinGif from "../image/spin2.gif"
export default function Product() {
    const [products, setProducts] = useState([]);
    const [showEdit, setShowEdit] = useState(false);
    const [addImg, setAddImg] = useState(null);
    const [showDelete, setShowDelete] = useState(false);
    const [deleteId, setDeleteId] = useState("");
    const [selectedValue, setSelectedValue] = useState('');
    const [editProductId, setEditProductId] = useState("");
    const [editProduct, setEditProduct] = useState({});
    const [getRestaurant, setGetRestaurant] = useState([]);
    const nameRef = useRef();
    const desRef = useRef();
    const priceRef = useRef();
    const [selectedRestaurant, setSelectedRestaurant] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [spin,setSpin]=useState(true)
    useEffect(() => {
        if (selectedRestaurant === '') {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(products.filter(product => product.rest_id === selectedRestaurant));
        }
    }, [selectedRestaurant, products]);
    

    const handleRestaurantChange = (e) => {
        setSelectedRestaurant(e.target.value);
    };
    
    

    const fetchRestaurants = async () => {
        const response = await axios.get("/api/restuarants");
        setGetRestaurant(response.data.result.data);
        setSpin(false)
    };

    useEffect(() => {
        setSpin(false)
        fetchRestaurants();
    }, []);

    useEffect(() => {
        if (getRestaurant.length > 0) {
            setSelectedValue(getRestaurant[0]?.id || '');
        }
    }, [getRestaurant]);

    const putProduct = async () => {
        await axios.put(`/api/products/${editProductId}`, {
            name: nameRef.current.value,
            description: desRef.current.value,
            rest_id: selectedValue,
            price: priceRef.current.value,
            img_url: addImg,
        });
        setShowEdit(false);
        fetchProduct();
    };

    useEffect(() => {
        if (editProduct && showEdit) {
            nameRef.current.value = editProduct.name || "";
            desRef.current.value = editProduct.description || "";
            priceRef.current.value = editProduct.price || "";
            setSelectedValue(editProduct.rest_id || '');
            setAddImg(editProduct.img_url || "");
        }
    }, [editProduct, showEdit]);

    const deleteProduct = async () => {
        await axios.delete(`/api/products/${deleteId}`);
        setShowDelete(false);
        fetchProduct();
    };

    const showRmvPage = (id) => {
        setShowDelete(!showDelete);
        setDeleteId(id);
    };

    const cancel = () => {
        setShowDelete(false);
    };

    const fileInputRef = useRef(null);

    const closeModal = () => {
        setShowEdit(false);
        setAddImg("");
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

    const showEditPage = (id) => {
        setEditProductId(id);
        setEditProduct(products.find(product => product.id === id));
        setShowEdit(true);
    };

    const fetchProduct = async () => {
        setSpin(true)

        const response = await axios.get("/api/products");
        setProducts(response.data.result.data);
        setSpin(false); 
    };

    useEffect(() => {
        
        fetchProduct();
    }, []);

    return (
        <>
         {spin && (
                <div className={styles.spinnerContainer} >
                    <Image  className={styles.spinner} src={spinGif} alt="Loading..." width={400} height={400} />
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
                                <button onClick={deleteProduct}>Delete</button>
                            </div>
                        </div>
                    </div>
                </>
            )}
            {showEdit && (
                <>
                    <div className={styles.backfon} onClick={closeModal}></div>
                    <div className={`${styles.productCountainer} ${showEdit ? styles.open : styles.close}`}>
                        <div className={styles.imgCountainer}>
                            <button className={styles.productCLoseBtn} onClick={closeModal}>X</button>
                            <h1>Edit product</h1>
                            <div className={styles.addImage}>
                                <div className={styles.productWriting}>
                                    <p>Upload your product image</p>
                                    {addImg ? <Image src={addImg} width={130} height={130} alt='img' /> : null}
                                </div>
                                <div className={styles.addDiv}>
                                    <input
                                        ref={fileInputRef}
                                        style={{ display: 'none' }}
                                        type='file'
                                        onChange={handleImageChange}
                                    />
                                    <div className={styles.uploadImg}>
                                        <Image onClick={handleImageClick} src={cloudImg} width={130} height={130} alt='img' className={styles.Image} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.addWriting}>
                            <p>Edit your Product description and necessary information</p>
                            <form>
                                <div className={styles.formDiv}>
                                    <label>Name</label>
                                    <input type="text" ref={nameRef} />
                                    <label>Description</label>
                                    <input type="text" ref={desRef} />
                                    <label>Price</label>
                                    <input type="number" ref={priceRef} />
                                    <label>Restaurants</label>
                                    <select value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)}>
                                        {getRestaurant.map((restaurant) => (
                                            <option key={restaurant.id} value={restaurant.id}>
                                                {restaurant.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div className={styles.productBtn}>
                            <button onClick={closeModal}>Cancel</button>
                            <button onClick={putProduct}>Update Product</button>
                        </div>
                    </div>
                </>
            )}
            <section>
           
                <div className={styles.countainer}>
                    <div className={styles.head}>
                        <h1 className={styles.mLAuto}>Products</h1>
                        <select 
                            className={styles.mLAuto}
                            value={selectedRestaurant}
                            onChange={handleRestaurantChange}
                        >
                            <option value='' className={styles.options}>All Restaurants</option>
                            {getRestaurant.map((restaurant) => (
                                <option key={restaurant.id} value={restaurant.id}>
                                    {restaurant.name}
                                </option>
                            ))}
                        </select>   
                    </div>
                    <div className={styles.headBox}>
                        {filteredProducts.map((product) => (
                            <div key={product.id} className={styles.box}>
                                <div className={styles.foodImg}>
                                    <Image src={product.img_url} width={150} height={150} alt="food" />
                                </div>
                                <div className={styles.food}>
                                    <h1>{product.name}</h1>
                                    <p className={styles.name}>{product.description}</p>
                                    <div className={styles.foodAbout}>
                                        <p className={styles.MLAuto}>${product.price}</p>
                                        <button className={styles.MLAuto} onClick={() => showEditPage(product.id)}>
                                            <Image src={editImg} alt="edit" />
                                        </button>
                                        <button className={styles.MLAuto} onClick={() => showRmvPage(product.id)}>
                                            <Image src={rmvImg} alt="remove" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
