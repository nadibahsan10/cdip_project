// components/Modal.js
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

const Modal = ({ message, onClose }) => {
  const router = useRouter();
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-auto shadow-lg ">
        <h3 className="text-xl font-bold text-green-500 text-center">
          {message}
        </h3>
        <div className="mt-4 text-center">
          <Link
            href="/"
            onClick={() => {
              onClose();
              router.push("/");
            }}
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
          >
            Close
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Modal;
