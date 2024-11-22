"use client"
import { usePathname } from "next/navigation";
import styles from "./layout.module.css"
import Link from "next/link"
import Image from 'next/image';
import adminImg from "./image/admin.png"
import dashboardImg from "./image/Vector (2).png"
import productImg from "./image/Vector (3).png"
import restaurantsImg from "./image/Vector (4).png"
import categoryImg from "./image/Vector (5).png"
import ordersImg from "./image/Vector (6).png"
import offerImg from "./image/Vector (7).png"
import logoutImg from "./image/Vector (8).png"
import image from "./image/109618.png"
import { useState, useEffect, useRef, use } from "react";
import fileImg from "./image/Vector (10).png"
import cloudImg from "./image/Vector (13).png"
import axios from "axios";

export default function AdminLayout({ children }) {

    const [addImg, setAddImg] = useState(null);
    const fileInputRef = useRef(null);
    const nameRef = useRef(null)
    const desRef = useRef(null)
    const priceRef = useRef(null)
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [showPage, setShowPage] = useState(false)
    const [selectedRestaurant, setSelectedRestaurant] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [getRestaurant, setGetRestaurant] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');



    useEffect(() => {
        // Filter products based on the selected restaurant type
        if (selectedRestaurant === '') {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(products.filter(product => product.rest_id === selectedRestaurant));
        }
    }, [selectedRestaurant, products]);
    const handleRestaurantChange = (e) => {
        setSelectedRestaurant(e.target.value);
    };
    const fetchProduct = async () => {
        const response = await axios.get("/api/products");
        setProducts(response.data.result.data);
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchRestaurants = async () => {
        const response = await axios.get("/api/restuarants");
        setGetRestaurant(response.data.result.data);
    };

    useEffect(() => {
        fetchRestaurants();
    }, []);

    useEffect(() => {
        if (getRestaurant.length > 0) {
            setSelectedValue(getRestaurant[0]?.id || '');
        }
    }, [getRestaurant]);

    const createProduct = async () => {
        console.log(nameRef.current.value, desRef.current.value, addImg, priceRef.current.value, "salam")

        await axios.post("/api/products", {
            name: nameRef.current.value,
            description: desRef.current.value,
            price: priceRef.current.value,
            img_url: addImg,
            rest_id: selectedRestaurant

        })
        nameRef.current.value = "";
        desRef.current.value = "";
        priceRef.current.value = "";
        setAddImg("")
        setShowPage(false)
        fetchProduct(selectedValue)



    }
    const cancel=()=>{
        setIsOpen(false)
    }


    const closeModal = () => {
        setIsOpen(false)
        setShowPage(false)
        setAddImg("");
    }

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

    const productPage = () => {
        setShowPage(!showPage)
    }
    const toggleMenu = () => {
        setIsOpen(!isOpen);
        // document.body.style.overflow = "hidden"

    };


    const closeMenu = () => {
        setIsOpen(false)
            // document.body.style.overflow = "auto"

    }
    const closeProduct = () => {
        setShowPage(false)
    }

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 600);
        };

        handleResize(); // İlk render sırasında çağır

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);




    return (
        <>

            {showPage && (
                <>
                    <div className={styles.backfon} onClick={closeModal}></div>

                    <div className={`${styles.productCountainer} ${isOpen ? styles.open : styles.close}}`}>
                        <div className={styles.imgCountainer}>
                            <button className={styles.productCLoseBtn} onClick={closeProduct}>X</button>
                            <h1>Add product</h1>
                            <div className={styles.addImage}>
                                <div className={styles.productWriting}>

                                    <p>Upload your product image</p>
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

                            <p> Add your Product description and necessary information</p>
                            <form>
                                <div className={styles.formDiv}>
                                    <label>Name</label>
                                    <input type="text" ref={nameRef} />
                                    <label>Description</label>
                                    <input type="text" ref={desRef} />
                                    <label>Price</label>
                                    <input type="number" ref={priceRef} />
                                    <label>Restaurants</label>
                                    <select value={selectedRestaurant} onChange={handleRestaurantChange}>
                                        <option value="">Restaurant type</option>
                                        {getRestaurant.map(restaurant => (
                                            <option key={restaurant.id} value={restaurant.id}>
                                                {restaurant.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div className={styles.productBtn}>
                            <button onClick={closeProduct}>Cancel</button>
                            <button onClick={createProduct}>Create Product</button>
                        </div>
                    </div>
                </>
            )}
            <header>

                <div className={styles.headCountainer}>
                    <div className={styles.hamburger} onClick={toggleMenu}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>

                    <p className={styles.mLAuto}>Foody<span>.</span></p>
                    <button className={styles.mLAuto} onClick={productPage}>
                        {isMobile ? "+" : "+ ADD PRODUCT"}
                    </button>



                    <Image alt="dashboard" src={adminImg} />
                    <p className={styles.mLAuto}>Admin</p>

                </div>
            </header>

            <main >
                <div className={styles.backfonHam} onClick={closeModal} style={{ display: isOpen ? "block" : "none" }} ></div>

                <div className={styles.bodyDiv}>
                    <div className={styles.bodyCountainer}>
                        <nav>
                            <div className={styles.divCountainer}>


                                <ul className={styles.ul}>
                                    <li className={pathname === '/admin/panel/dashboard' && styles.activeLink} >
                                        <Image className={styles.img} src={dashboardImg} alt="admin/panel/dashboard" /><Link onClick={cancel}  href={"./dashboard"} className={styles.link}>Dashboard</Link>
                                    </li>
                                    <li className={pathname === '/admin/panel/product' && styles.activeLink}>
                                        <Image className={styles.img} src={productImg} alt="admin/panel/product" /><Link onClick={cancel} href={"./product"} className={styles.link}>Product</Link>
                                    </li>
                                    <li className={pathname === '/admin/panel/restaurants' && styles.activeLink}>
                                        <Image className={styles.img} src={restaurantsImg} alt="admin/panel/restaurants" /><Link onClick={cancel}  href={"./restaurants"} className={styles.link}> Restaurants</Link>
                                    </li>
                                    <li className={pathname === '/admin/panel/category' && styles.activeLink}>
                                        <Image className={styles.img} src={categoryImg} alt="admin/panel/category" /><Link onClick={cancel}  href={"./category"} className={styles.link}> Category</Link>
                                    </li>
                                    <li className={pathname === '/admin/panel/orders' && styles.activeLink}>
                                        <Image className={styles.img} src={ordersImg} alt="admin/panel/orders" /><Link onClick={cancel}  href={"./orders"} className={styles.link}> Orders</Link>
                                    </li>
                                    <li className={pathname === '/admin/panel/orders-history' && styles.activeLink}>
                                        <Image className={styles.img} src={ordersImg} alt="admin/panel/orders-history" /><Link onClick={cancel}  href={"./orders-history"} className={styles.link}>History</Link>
                                    </li>
                                    <li  onClick={cancel} className={pathname === '/admin/panel/offer' && styles.activeLink}>
                                        <Image className={styles.img} src={offerImg} alt="admin/panel/offer" /><Link  href={"./offer"} className={styles.link}> Offer</Link>
                                    </li>
                                    <li>
                                        <Image className={styles.img} src={logoutImg} alt="admin/panel/logout" /> <Link href={"/"} className={styles.link}> Logout</Link>
                                    </li>

                                </ul>



                            </div>

                            <div className={`${styles.menuItems} ${isOpen ? styles.open : styles.close}`}>
                                <div className={styles.btn}>
                                    <button onClick={closeMenu} className={styles.closeBtn} >
                                        X
                                    </button>
                                </div>

                                <ul>


                                    <li className={pathname === '/admin/panel/dashboard' && styles.activeLink} >
                                        <Image className={styles.img} src={dashboardImg} alt="admin/panel/dashboard" /><Link onClick={cancel} href={"./dashboard"} className={styles.link}>Dashboard</Link>
                                    </li>

                                    <li className={pathname === '/admin/panel/product' && styles.activeLink}>
                                        <Image className={styles.img} src={productImg} alt="admin/panel/product" /><Link onClick={cancel} href={"./product"} className={styles.link}>Product</Link>
                                    </li>
                                    <li className={pathname === '/admin/panel/restaurants' && styles.activeLink}>
                                        <Image className={styles.img} src={restaurantsImg} alt="admin/panel/restaurants" /><Link onClick={cancel} href={"./restaurants"} className={styles.link}> Restaurants</Link>
                                    </li>
                                    <li className={pathname === '/admin/panel/category' && styles.activeLink}>
                                        <Image className={styles.img} src={categoryImg} alt="admin/panel/category" /><Link onClick={cancel} href={"./category"} className={styles.link}> Category</Link>
                                    </li>
                                    <li className={pathname === '/admin/panel/orders' && styles.activeLink}>
                                        <Image className={styles.img} src={ordersImg} alt="admin/panel/orders" /><Link onClick={cancel} href={"./orders"} className={styles.link}> Orders</Link>
                                    </li>
                                    <li className={pathname === '/admin/panel/orders-history' && styles.activeLink}>
                                        <Image className={styles.img} src={ordersImg} alt="admin/panel/orders-history" /><Link onClick={cancel}  href={"./orders-history"} className={styles.link}>History</Link>
                                    </li>
                                    <li className={pathname === '/admin/panel/offer' && styles.activeLink}>
                                        <Image className={styles.img} src={offerImg} alt="admin/panel/offer" /><Link onClick={cancel} href={"./offer"} className={styles.link}> Offer</Link>
                                    </li>
                                    <li>
                                        <Image className={styles.img} src={logoutImg} alt="admin/panel/logout" /> <Link href={"/"} className={styles.link}> Logout</Link>
                                    </li>

                                </ul>

                            </div>

                        </nav>

                    </div>

                    <div>
                        {children}
                    </div>
                </div>
            </main>


        </>
    )
}
