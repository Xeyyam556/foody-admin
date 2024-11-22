'use client'
import style from "./admin/login/loginn.module.css"
import "./admin/login/admin.css"
import Image from 'next/image'
import loginImg from './admin/login/image/Background.png'
import { useCallback, useEffect, useRef, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Alert } from "@mui/material"

export default function Login() {
    const [error, setError] = useState({
        username: '',
        password: ''
    })
    const [alertt, setAlertt] = useState(false)
    const [success, setSuccess] = useState('success')
    const [refreshToken, setRefreshToken] = useState('')
    const [accessToken, setAccessToken] = useState('')
    const userName = useRef()
    const password = useRef()
    const router = useRouter()
    useEffect(() => {
        localStorage.setItem('refresh_token', refreshToken)
        localStorage.setItem('access_token', accessToken)
    }, [refreshToken, accessToken])
    const signInBtn = useCallback(async (e) => {
        e.preventDefault()
        let errors = {}
        if (!userName.current.value.trim()) {
            errors.username = 'The username provided is incorrect. Please try again.'
        }
        if (!password.current.value.trim()) {
            errors.password = 'The password provided is incorrect. Please try again.'
        }
        if (Object.keys(errors).length === 0) {
            try {
                const response = await axios.post('/api/auth/signin', {
                    email: userName.current.value,
                    password: password.current.value
                })
                console.log(response)

                password.current.value = ''
                userName.current.value = ''
                setError({
                    username: '',
                    password: ''
                })
                if (response.status == 200 && !response.data.user.username) {
                    setSuccess('success')
                    setAlertt(true);
                    setAccessToken(response.data.user.access_token)
                    setRefreshToken(response.data.user.refresh_token)
                    setTimeout(() => {
                        router.push('/admin/panel/dashboard')
                        setAlertt(false);
                    }, 2000);
                    setError({
                        username: '',
                        password: ''
                    })
                    password.current.value = ''
                    userName.current.value = ''

                } else {
                    setSuccess('error')
                    setAlertt(true);
                    setTimeout(() => {
                        setAlertt(false);
                    }, 2000);
                    setError({
                        username: '',
                        password: ''
                    })
                    password.current.value = ''
                    userName.current.value = ''

                    console.error('Login failed:', response);
                }

            } catch (err) {
                setSuccess('error')
                setAlertt(true);
                setTimeout(() => {
                    setAlertt(false);
                }, 2000);
                password.current.value = ''
                userName.current.value = ''
                console.error(err)
            }

        } else {
            setError(errors)
        }
    }, [router])
    return (
        <>
            <div className={style.container}>
                <div className={style.form}>
                    <h1>Welcome admin</h1>
                    <form>
                        <input placeholder='Username' ref={userName} type='text' />
                        {error.username ? <p>{error.username}</p> : null}
                        <input placeholder='Password' ref={password} type='password' />
                        {error.password ? <p>{error.password}</p> : null}
                        <button onClick={signInBtn}>sign in</button>
                    </form>
                </div>
                <div className={style.imgDiv}>
                    <Image className={style.img} src={loginImg} alt="login" />
                </div>
            </div>
            <Alert className={style.alert} style={{ display: alertt ? 'block' : 'none' }} variant="filled" severity={success}>{success == 'success' ? 'Succesfully' : "Unsuccesfully"}</Alert>
        </>
    )
}