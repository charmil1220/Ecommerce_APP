import React,{ useEffect, useState } from "react"; 
import { HiOutlineLockClosed } from "react-icons/hi";
import Link from 'next/link'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "next/router";



const Login = () => {
  const router = Router
  const [email,setEmail] = useState()
  const [password,setPassword] = useState()
  


  useEffect(()=>{
    if(localStorage.getItem('token')){
      router.push('/')
     
    }

  })

  const handleChange = (e)=>{
    if(e.target.name == 'email'){
      setEmail(e.target.value)
    }
    else if(e.target.name == 'password'){
      setPassword(e.target.value)
    }

  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    const data = {email, password}
    let res = await fetch("http://localhost:3000/api/login",{
      method:"post",
      headers:{
        'Content-Type':'application/json',

      },
      body : JSON.stringify(data)

    })
    let response = await res.json()
    console.log(response)
    setEmail('') 
    setPassword('')
    if(response.success){   
      localStorage.setItem('token',response.token)
      notify();
      setTimeout(()=>{
      router.push("http://localhost:3000")

      },2000);
    }
    else{
      toast.error(response.error, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      }
  }
  const notify = () =>
  toast.success("You are logged IN", {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
 
  return (
    <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
           
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <div className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link href={'/Signup'}><div
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </div>
            </Link>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6"  method="POST">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                onChange={handleChange}
                value={email||""}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                onChange={handleChange}
                value={password||""}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            

            <div className="text-sm">
              <Link href={'/Forgot'}><div
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </div>
              </Link>
            </div>
          </div>

          <div>
            <button
              
              type="submit"
              className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <HiOutlineLockClosed
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              Sign in
            </button>
            <ToastContainer
                  position="top-center"
                  autoClose={400}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
