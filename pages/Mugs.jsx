import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Product from "@/models/Product";
import mongoose from "mongoose";

const Mugs = ({ products }) => {
  console.log(products);
  return (
    <div>
      <section className="text-gray-600 body-font ">
          <div className="container min-h-screen px-20 py-25 mx-auto ">
            <div className="flex flex-wrap -m-4 items-start pt-5">
            {Object.keys(products).length === 0 && (
              <p className="m-10">
                Sorry all the Mugs are currently out of stock
              </p>
            )}
            {Object.keys(products).map((item) => {
              return (
                <div key={products[item]._id} className="lg:w-1/4 md:w-1/2 p-4 w-full cursor-pointer">
                  <Link href={'/product/wear-thecode'}>
                    <div className="block relative h-48 rounded overflow-hidden">
                      <Image alt="ecommerce" className="object-cover object-top w-full h-full block" src={products[item].img} height="421" width="261"/>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Mugs</h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].title} </h2>
                      <p className="mt-1">₹{products[item].price}</p>
                    </div>
                  </Link>
                </div>
                );
            })}  
            </div>
          </div>
      </section>
    </div>
  )
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
  }
  await mongoose.connect(process.env.MONGO_URI);
  let products = await Product.find({ category: "mugs" });
  let mugs = {};
  for (let item of products) {
    if (item.title in mugs) {
      if (
        !mugs[item.title].color.includes(item.color) &&
        item.availabelQty > 0
      ) {
        mugs[item.title].color.push(item.color);
      }
      if (
        !mugs[item.title].size.includes(item.size) &&
        item.availabelQty > 0
      ) {
        mugs[item.title].size.push(item.size);
      }
    } else {
      mugs[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availabelQty > 0) {
        mugs[item.title].color = [item.color];
        mugs[item.title].size = [item.size];
      }
    }
  }
  return {
    props: { products: JSON.parse(JSON.stringify(mugs)) },
  };
}

export default Mugs
