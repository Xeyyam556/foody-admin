"use client"
import styles from "./category.module.css"
import Image from 'next/image';
import imgCloudd from "../image/Vector (13).png"
import { useState, useRef, useEffect, } from "react"
import editImg from "../image/Vector (11).png";
import rmvImg from "../image/Vector (12).png";
import axios from 'axios';

export default function Category() {
    const [showCategory, setShowCategory] = useState(false)
    const [addImg, setAddImg] = useState(null);
    const [showEdit, setShowEdit] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [deleteId, setDeleteId] = useState("")
    const [categorys, setCategorys] = useState([])
    const [editCategory, setEditCategory] = useState([])
    const [editCategoryId, setEditCategoryId] = useState([])

    const inputName = useRef();
    const inputDes = useRef();
    const addName = useRef()
    const addSlug = useRef()



    const deleteCategory = async () => {
        // console.log(deleteId)
        await axios.delete(`/api/category/${deleteId}`)
        getCategory()
        setShowDelete(false)

    }


    const createCategory = async () => {


        await axios.post("/api/category", {
            name: addName.current.value,
            slug: addSlug.current.value,
            img_url: addImg

        } )

        getCategory()
        addName.current.value = null
        addSlug.current.value = null
        setAddImg("")
        setShowCategory(false)

    }
    const showRmvPage = (id) => {
        setShowDelete(!showDelete)
        setDeleteId(id)
    }
    const cancel = () => {
        setShowDelete(false)
    }

    const fileInputRef = useRef(null);


    const close = () => {
        setShowCategory(false)
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
    const putCategory = async () => {
        await axios.put(`/api/category/${editCategoryId}`, {
            name: inputName.current.value,
            slug: inputDes.current.value,
            img_url: addImg
        }
        )
        getCategory()
        setShowEdit(false)
    }

    const closeModal = () => {
        setShowEdit(false)
        setShowCategory(false)
        // document.body.style.overflow = "auto"
    }

    const handleImageClick = () => {
        fileInputRef.current.click();
    };
    const fetchEdit = async () => {
        const response = await axios.get(`/api/category/${editCategoryId}`)

        setEditCategory(response.data.result.data)
         


    }
    // console.log(editCategory)
    useEffect(() => {
        if (editCategory && showEdit) {
            inputName.current.value = editCategory.name || "";
            inputDes.current.value = editCategory.slug || "";
            setAddImg(editCategory.img_url || "");
        }
    }, [editCategory]);

    const showEditPage = async (id) => {
        setEditCategoryId(id)

        setShowEdit(!showEdit)
        await fetchEdit()
        // console.log(editCategory, "salam")
        inputName.current.value = editCategory.name || "";
        inputDes.current.value = editCategory.slug || "";
        setAddImg(editCategory.img_url || "");

        // document.body.style.overflow = "hidden"
    }
    // console.log(categorys)
    const addRestaurants = () => {
        setShowCategory(!showCategory)
    }

   
    
    const getCategory = async () => {
        const response = await axios.get("/api/category")
        setCategorys(response.data.result.data)
        // console.log(response)

    }
    useEffect(() => {
        getCategory()
    }, [])
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
                                <button onClick={deleteCategory}>
                                    Delete
                                </button>
                            </div>

                        </div>
                    </div>
                </>
            )}
            {showEdit && (
                <>
                    <div className={styles.backfon} onClick={closeModal}></div>

                    <div className={`${styles.productCountainer} ${showEdit ? styles.open : styles.close}}`}>
                        <div className={styles.imgCountainer}>
                            <button className={styles.productCLoseBtn} onClick={closeModal}>X</button>
                            <h1>Edit product</h1>
                            <div className={styles.addImage}>
                                <div className={styles.productWriting}>

                                    <p>Upload your product image</p>
                                    {addImg ? <Image src={addImg} width={130} height={130} alt='img' /> : null}
                                </div>

                                <div className={styles.addDiv} >
                                    <input ref={fileInputRef}
                                        style={{ display: 'none' }} type='file' onChange={handleImageChange}></input>
                                    <div className={styles.uploadImg}>
                                        <Image onClick={handleImageClick} src={imgCloudd} width={130} height={130} alt='img' className={styles.Image} />

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.addWriting}>

                            <p>
                                Edit your Product description and necessary information</p>
                            <form>
                                <div className={styles.formDiv}>
                                    <label>Name</label>
                                    <input type="text" ref={inputName} />
                                    <label>slug</label>
                                    <input type="text" ref={inputDes} />

                                </div>
                            </form>
                        </div>
                        <div className={styles.productBtn}>
                            <button onClick={closeModal}>Cancel</button>
                            <button onClick={putCategory}>Edit Category</button>
                        </div>
                    </div>
                </>
            )}
            {showCategory && (
                <>
                    <div className={styles.backfon} onClick={closeModal}></div>

                    <div className={`${styles.productCountainer} ${showCategory ? styles.open : styles.close}}`}>
                        <button onClick={close} className={styles.x}>X</button>
                        <h1 className={styles.edit}>Add Category </h1>
                        <div className={styles.addImg}>
                            <div className={styles.upImg}>
                                <p>Upload Image</p>
                                {addImg ? <Image src={addImg} width={100} height={100} alt='img' /> : null}
                            </div>
                            <div className={styles.addDiv} >
                                <input ref={fileInputRef}
                                    style={{ display: 'none' }} type='file' onChange={handleImageChange}></input>
                                <div className={styles.uploadImg}>
                                    <Image onClick={handleImageClick} src={imgCloudd} width={130} height={130} alt='img' className={styles.Image} />
                                </div>
                            </div>

                        </div>
                        <div className={styles.addWriting}>
                            <p>

                                Add your Offer information</p>

                            <form>
                                <div className={styles.formDiv}>
                                    <label>Name</label>
                                    <input className={styles.inputt} ref={addName} type="text" />
                                    <label>Slug</label>
                                    <input type="text" ref={addSlug} />



                                </div>
                            </form>

                        </div>
                        <div className={styles.productBtn}>
                            <button onClick={close}>Cancel</button>
                            <button onClick={() => createCategory()}>Create Category</button>
                        </div>

                    </div>
                </>
            )}
            <section>
                <div className={styles.head}>
                    <h1 className={styles.mLAuto}>Category</h1>


                    <button className={styles.mLAuto} onClick={addRestaurants}>+ Add Category</button>

                </div>
                <div className={styles.tableDiv}>
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Slug</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {categorys.map((category, index) => (

                                <tr>
                                    <td>{index}</td>
                                    <td><Image src={category.img_url} alt="img" width={50} height={50} /></td>
                                    <td>{category.name}</td>
                                    <td>{category.slug}</td>
                                    <td>
                                        <button onClick={() => showEditPage(category.id)}>
                                            <Image src={editImg} alt="Edit" width={20} height={20} />
                                        </button>
                                        <button onClick={() => showRmvPage(category.id)}>
                                            <Image src={rmvImg} alt="Remove" width={20} height={20} />
                                        </button>
                                    </td>
                                </tr>
                                
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    )
}