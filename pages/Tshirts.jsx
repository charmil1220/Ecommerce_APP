import React from "react";
import Image from "next/image";
import Link from "next/link";
import Product from "@/models/Product";
import mongoose from "mongoose";

const Tshirts = ({ products }) => {
  console.log(products)
  return (
    <div>
      <section className="text-gray-600 body-font ">
        <div className="container  px-20 py-25  mx-auto ">
          <div className=" flex flex-wrap -m-4 content-normal pt-5 ">
            {Object.keys(products).map((item) => {
              return (
                <Link key={products[item]._id} href={`/product/${products[item].slug}`}>
                  <div className="p-4 w-full mr-2 ml-2 cursor-pointer ">
                    <div className="block relative h-48 rounded overflow-hidden">
                      <Image
                        alt="ecommerce"
                        className="object-cover object-top w-full h-full block"
                        src={products[item].img}
                        height="421"
                        width="261"
                        priority={true}
                      />
                    </div>
                    <div className="mt-4">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        T-shirts
                      </h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">
                        {products[item].title}
                      </h2>
                      <p className="mt-1">₹499</p>
                      <div className="mt-1">
                      {products[item].size.includes('S') && <span className="border border-gray-600 px-1 mx-1">S</span>}
                      {products[item].size.includes('M') && <span className="border border-gray-600 px-1 mx-1">M</span>}
                      {products[item].size.includes('L') && <span className="border border-gray-600 px-1 mx-1">L</span>}
                      {products[item].size.includes('XL') && <span className="border border-gray-600 px-1 mx-1">XL</span>}
                      {products[item].size.includes('XXL') && <span className="border border-gray-600 px-1 mx-1">XXL</span>}
                       
                      </div>
                      {products[item].color.includes('red') && <button className="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {products[item].color.includes('blue') && <button className="border-2 border-gray-300 ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {products[item].color.includes('black') && <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
                      {products[item].color.includes('yellow') && <button className="border-2 border-gray-300 ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none"></button>}

                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
  }
  await mongoose.connect(process.env.MONGO_URI);
  let products = await Product.find({category:'tshirts'});
  let tshirts = {}
    for(let item of products){
      if(item.title in tshirts){
        if(!tshirts[item.title].color.includes(item.color) && item.availabelQty > 0){
          tshirts[item.title].color.push(item.color)

        }
        if(!tshirts[item.title].size.includes(item.size) && item.availabelQty > 0){
          tshirts[item.title].size.push(item.size)

        }

      }
      else{
        tshirts[item.title] = JSON.parse(JSON.stringify(item))
        if(item.availabelQty > 0){
          tshirts[item.title].color=[item.color]
          tshirts[item.title].size=[item.size]

        }
      }

    }
  return {
    props: { products: JSON.parse(JSON.stringify(tshirts)) },
  };
}

export default Tshirts;
