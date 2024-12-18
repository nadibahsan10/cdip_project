"use client";
import React, { useState } from "react";

const Page = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    file: null,
  });
  const [preview, setPreview] = useState();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm((prev) => {
      return { ...prev, file };
    });
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("file", form.file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert("Product added successfully!");
        console.log("data:", data);
      } else {
        alert(data.error || "Upload Failed");
      }
    } catch (error) {
      console.log("Error:", error);
      alert("An error occurred during the upload.");
    }
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="h-auto w-[650px] bg-white rounded-lg shadow-xl p-8 flex flex-col gap-6"
      >
        <h1 className="text-2xl font-semibold text-gray-800 text-center">
          Add Product
        </h1>

        <div className="flex flex-col gap-4">
          {/* File Upload */}
          <label className="block">
            <span className="block text-sm font-medium text-gray-600 mb-2">
              Upload Image
            </span>
            <input
              accept="image/*"
              onChange={handleFileChange}
              type="file"
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-gray-300 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
            />
          </label>
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-lg"
            />
          )}

          {/* Title */}
          <label className="block">
            <span className="block text-sm font-medium text-gray-600 mb-2">
              Title
            </span>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              placeholder="Enter product title"
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </label>

          {/* Price */}
          <label className="block">
            <span className="block text-sm font-medium text-gray-600 mb-2">
              Price
            </span>
            <input
              name="price"
              type="number"
              onChange={handleChange}
              placeholder="Enter product price"
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </label>

          {/* Description */}
          <label className="block">
            <span className="block text-sm font-medium text-gray-600 mb-2">
              Description
            </span>
            <textarea
              name="description"
              onChange={handleChange}
              placeholder="Enter product description"
              rows="4"
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-blue-200"
            ></textarea>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default Page;
