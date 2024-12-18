import React from "react";
import Image from "next/image";
import Product from "./Components/Product";

const page = async () => {
  const data = await fetch("http://localhost:3000/api/products");
  const products = await data.json();
  console.log(products);
  return (
    <main>
      <div className="flex items-center justify-center   px-80">
        <div
          style={{ height: "600px" }}
          className=" w-screen mt-3 grid grid-rows-2 gap- grid-cols-4 gap-2"
        >
          <div className="row-span-2 relative col-span-3 bg-red-600">
            <Image
              src="/cover1.jpg"
              fill={true}
              alt="This Is The Photo of Something I have Created"
            ></Image>
          </div>
          <div className="col-span-1 border border-gray-600 relative bg-blue-600">
            <Image
              src="/cover2.jpg"
              fill={true}
              alt="This Is The Photo of Something I have Created"
            ></Image>
          </div>
          <div className="col-span-1 border border-gray-600 relative bg-purple-600">
            <Image
              src="/cover3.jpg"
              fill={true}
              alt="This Is The Photo of Something I have Created"
            ></Image>
          </div>
        </div>
      </div>
      <div className=" mt-4">
        <div className="text-center">
          <h1 className="text-3xl">Feature Categories</h1>
          <p className="text-slate-500">Get your desired product</p>
        </div>
        <div className="grid grid-cols-4 mt-2 w-screen px-32  gap-4">
          <div className="h-72 bg-slate-200 flex items-center justify-center">
            <h1 className="text-3xl">SmartPhones</h1>
          </div>
          <div className="h-72 bg-slate-200 flex items-center justify-center">
            <h1 className="text-3xl">Headphones</h1>
          </div>
          <div className="h-72 bg-slate-200 flex items-center justify-center">
            <h1 className="text-3xl">Accessories</h1>
          </div>
          <div className="h-72 bg-slate-200 flex items-center justify-center">
            <h1 className="text-3xl">Charger</h1>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className="text-center">
          <h1 className="text-3xl">Feature Products</h1>
          <p className="text-slate-500">BEST DEALS</p>
        </div>
        <div className="grid grid-cols-5 mt-5 gap-10 px-20">
          {products.products.map((product) => {
            return (
              <Product
                key={product.id}
                url={product.fileUrl}
                title={product.title}
                price={product.price}
                description={product.description}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default page;
