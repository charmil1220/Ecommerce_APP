import Link from "next/link";
import React ,{useEffect} from "react";
import { HiOutlineLockClosed } from "react-icons/hi";
import Router from "next/router";

const Forgot = () => {
  const router = Router
  useEffect(()=>{
    if(localStorage.getItem('token')){
      router.push('/')
    }

  })
  return (
    <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Forgot Password
          </h2>
          <div className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link href={"/Login"}>
              <div
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Login
              </div>
            </Link>
          </div>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Email address"
              />
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
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Forgot;
