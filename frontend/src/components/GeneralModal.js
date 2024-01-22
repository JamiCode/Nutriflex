import React, { useState } from "react";

const GeneralModal = ({
  title,
  message,
  onCancel,
  onConfirm,
  showModal,
  yesOrNo,
}) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none ${
        showModal ? "" : "hidden"
      }`}
    >
      <div className="relative w-auto max-w-md mx-auto my-6">
        {/* Modal content */}
        <div className="relative flex flex-col w-full bg-black border-0 rounded-lg shadow-lg outline-none focus:outline-none">
          {/* Header */}
          <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 className="text-3xl font-semibold">{title}</h3>
            <button
              className="p-1 ml-auto bg-transparent border-0 text-white opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={onCancel}
            >
              <span className="bg-transparent text-white opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          {/* Body */}
          <div className="relative p-6 flex-auto">
            <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
              {message}
            </p>
          </div>
          {/* Footer */}
          <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button
              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={onCancel}
            >
              {yesOrNo ? "No" : "Close"}
            </button>
            <button
              className="bg-green-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => {
                // Perform the confirm action
                onConfirm();
              }}
            >
              {yesOrNo ? "Yes" : "Confirm"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralModal;
