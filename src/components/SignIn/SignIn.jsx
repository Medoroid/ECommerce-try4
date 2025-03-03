import axios from 'axios'
import { useFormik } from 'formik'
import  { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from "yup"
import { ColorRing } from 'react-loader-spinner'
import { UserContext } from '../../Context/UserContext/UserContext'
import { CartContext } from '../../Context/CartContext/CartContext'
export default function SignIn() {
 let {getCardItems}= useContext(CartContext)
  let {setUserLogin} = useContext(UserContext)
  let validation = Yup.object().shape({
    email: Yup.string().required("Enter your email").email("Enter a valid email that includes @"),
    password: Yup.string().required("Enter password").matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"),
  })
let [apiError ,setAbiError] = useState(null)
let [isLoadind , setLoading] = useState(false)
// عمل انتقال تلقائى
let  navigate = useNavigate()
 function handleSubmit(values) {
      setLoading(true)
      axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      // الدنيا تمام
      .then((respones)=>{
        setLoading(false)
        getCardItems()
       if(respones.data.message == "success"){
        console.log("success")
        localStorage.setItem("userToken", respones?.data?.token )
        setUserLogin(respones?.data?.token)
        navigate('https://youtu.be/CNisYGc4P6U?si=SWgqZqikMB58UIRU')
      }
    console.log(respones.data.token)
    })
      // fi error
      .catch((response)=>{
        setLoading(false)
        // console.log(response?.response?.data?.message)
        setAbiError(response?.response?.data?.message)
        console.log(apiError)
      })
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validation,
    onSubmit: handleSubmit,
  })

  useEffect(() => {
    // Code here
    return () => {
      // Cleanup code here
    }
  }, [])

  return <>
    <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
      <div className="relative z-0 w-full mb-5 group">
        <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "/>
        <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
      </div>
      {formik.errors.email && formik.touched.email ? <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:text-red-400" role="alert">
        <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span className="sr-only">Info</span>
        <div>
          <span className="font-medium">{formik.errors.email}</span>
        </div>
      </div> : null}

      <div className="relative z-0 w-full mb-5 group">
        <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "/>
        <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
      </div>
      {formik.errors.password && formik.touched.password ? <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:text-red-400" role="alert">
        <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span className="sr-only">Info</span>
        <div>
          <span className="font-medium">{formik.errors.password}</span>
        </div>
      </div> : null}
      <button type="submit" className="bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
      {isLoadind?   <ColorRing
        visible={true}
        height="20"
        width="20"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        /> : 'Submit'}
      </button>
    </form>
  </>
}