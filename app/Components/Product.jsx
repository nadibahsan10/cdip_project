import React from "react";
import Image from "next/image";
const Product = ({ url, title, description, price }) => {
  console.log(url);
  return (
    <div className="bg-white flex flex-col  items-center justify-center px-10  drop-shadow-xl h-auto">
      <div className=" relative h-52  w-52">
        <Image src={"" + url + ""} fill={true}></Image>
      </div>
      <h1 className="text-slate-700">{title}</h1>
      <h1 className="text-3xl">{price}</h1>
      <br />
      <p>{description}</p>
      <div className="flex gap-2">
        <button className="bg-sky-800 text-sm px-5 py-3 rounded-lg text-white font-semibold">
          BUY NOW
        </button>
        <button className="bg-white text-sm px-5 py-3 rounded-lg border-sky-800 border ring-2 ring-inset ring-sky-800  text-sky-800 font-semibold">
          Add To Cart
        </button>
      </div>
      <br />
    </div>
  );
};

export default Product;
