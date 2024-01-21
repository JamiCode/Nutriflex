import { useState } from "react";
import { Dialog } from "@headlessui/react";
import ClipLoader from "react-spinners/ClipLoader";

export default function FeedBackModal({
  isOpen,
  onClose,
  message,
  isLoading,
  isSuccess,
  responseErrorMessage,
}) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-auto"
      unmount
    >
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-gray-800 text-white p-6 rounded-md shadow-md w-96">
          <Dialog.Title className="text-xl font-bold mb-4">
            {isLoading
              ? "Updating New Tasks"
              : isSuccess
              ? "New Tasks Assigned Successfully"
              : "Request Error"}
            <div>
              <ClipLoader
                color={"red"}
                loading={isLoading}
                size={30}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          </Dialog.Title>
          <Dialog.Description className="mb-4">
            {isLoading
              ? "Generating workout plan. This process might take some time, so please be patient."
              : isSuccess
              ? "Your request has been processed successfully."
              :responseErrorMessage }
          </Dialog.Description>

          <div className="flex justify-end">
            {!isSuccess && (
              <button
                onClick={() => onClose()}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 mr-2 rounded"
              >
                Close
              </button>
            )}
            {!isLoading && (
              <button
                onClick={() => window.location.reload(true)} // Add your deactivate logic here
                className={`${
                  isSuccess
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-red-500 hover:bg-red-600"
                } text-white px-4 py-2 rounded`}
              >
                {isSuccess ? "Continue" : "Retry"}
              </button>
            )}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
