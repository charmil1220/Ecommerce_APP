import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  AiOutlineShoppingCart,
  AiFillCloseCircle,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";

const Navbar = ({
  user,
  logout,
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  subTotal,
}) => {
  const [dropdown, setDropdown] = useState(false);

  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else if (!ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };
  const ref = useRef();
  return (
    <div className="flex flex-col md:flex-row md:justify-start justify-center items-center my-2  sticky top-0 bg-white z-10">
      <div className="logo mr-auto md:mx-5 cursor-pointer">
        <Link href={"/"} legacyBehavior>
          <Image
            width={300}
            height={60}
            src="/LogoWithSlogon2.png"
            alt="Logo"
          />
        </Link>
      </div>
      <div className="nav">
        <ul className="flex space-x-6 font-bold md:text-md py-2">
          <Link href={"/Tshirts"} legacyBehavior>
            <li className="cursor-pointer">T-shirts</li>
          </Link>
          <Link href={"/Hoodies"} legacyBehavior>
            <li className="cursor-pointer">Hoodies</li>
          </Link>
          <Link href={"/Stickers"} legacyBehavior>
            <li className="cursor-pointer">Stickers</li>
          </Link>
          <Link href={"/Mugs"} legacyBehavior>
            <li className="cursor-pointer">Mugs</li>
          </Link>
        </ul>
      </div>
      <div className="flex cursor-pointer  cart absolute right-0 top-4 mx-5 ">
        <div
          onMouseOver={() => {
            setDropdown(true);
          }}
          onMouseLeave={() => {
            setDropdown(false);
          }}
        >
        <a className="flex md:mr-5 md:space-x-4">{user.value && (<MdAccountCircle className="text-xl  md:text-2xl mx-2" />)}</a>
        {dropdown && (
            <div onMouseOver={() => {setDropdown(true);}} onMouseLeave={() => {setDropdown(false);}} className="absolute right-8 bg-pink-500 top-6 py-4 rounded-md px-5 w-36">
            <ul>
                <Link href={"/Myaccount"} legacyBehavior><a><li className="py-2 cursor-pointer hover:text-white">My Account</li></a></Link>
                <Link href={"/Orderr"} legacyBehavior><a><li className="py-2 cursor-pointer hover:text-white">Orders</li></a></Link>
                <li onClick={logout} className="py-2 cursor-pointer hover:text-white">Logout</li>
              </ul>

              
            </div>
          )}
          </div>
          
        
        
        
        {!user.value && (
          <Link href={"/Login"} legacyBehavior>
            <a>
              <button className=" bg-pink-600 px-2 py-1 mx-2 rounded-md text-sm text-white">
                Login
              </button>
            </a>
          </Link>
        )}
        <AiOutlineShoppingCart
          onClick={toggleCart}
          className=" text-xl md:text-3xl cursor-pointer"
        />
        
      </div>

      <div
        ref={ref}
        className={`w-72 h-[100vh] overflow-y-scroll z-50 sideCart absolute top-0 right-0 bg-pink-100 px-8 py-10 transform transition-transform ${
          Object.keys(cart).length !== 0 ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <h2 className="font-bold text-xl text-center">Shopping Cart</h2>
        <span
          onClick={toggleCart}
          className="absolute top-5 right-2 cursor-pointer text-2xl text-pink-500"
        >
          <AiFillCloseCircle />
        </span>
        <ol className="list-decimal">
          {Object.keys(cart).length == 0 && (
            <div className="my-4 text-base">Cart is Empty</div>
          )}
          {Object.keys(cart).map((k) => {
            return (
              <li key={k}>
                <div className="item flex my-5">
                  <div className="w-2/3">{cart[k].name}</div>
                  <div className="w-1/3 flex items-center justify-center text-lg">
                    <AiFillMinusCircle
                      onClick={() => {
                        removeFromCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].variant
                        );
                      }}
                      className="cursor-pointer text-pink-500"
                    />
                    <span className="mx-2">{cart[k].qty}</span>
                    <AiFillPlusCircle
                      onClick={() => {
                        addToCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].variant
                        );
                      }}
                      className="cursor-pointer text-pink-500"
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        <div className="my-4">Subtotal : ₹{subTotal}</div>
        <div className="flex">
          <Link href={"/Checkout"} legacyBehavior>
            <button className="flex mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-lg">
              <BsFillBagCheckFill className="m-1" />
              Check Out
            </button>
          </Link>
          <button
            onClick={clearCart}
            className="flex mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-lg"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
