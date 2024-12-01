import React, { useState } from "react";
import FileBase64 from "react-file-base64";

function Hero() {
  const [state, setState] = useState({
    confirmation: "",
    isLoading: "",
    files: "",
    Invoice: "",
    Amount: "",
    InvoiceDate: "",
    Vendor: "",
    Description: "",
  });

  function handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setState((prevState) => ({
      ...prevState,
      confirmation: "Uploading...",
    }));
  }

  async function getFiles(files) {
    setState((prevState) => ({
      ...prevState,
      isLoading: "Extracting data",
      files: files,
    }));

    const UID = Math.round(1 + Math.random() * (1000000 - 1));

    const data = {
      fileExt: "png",
      imageID: UID,
      folder: UID,
      img: files[0].base64,
    };

    setState((prevState) => ({
      ...prevState,
      confirmation: "Processing...",
    }));

    await fetch("https://feeb6yrl7e.execute-api.ap-southeast-2.amazonaws.com/Production", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const targetImage = UID + ".png";
    const response = await fetch("https://feeb6yrl7e.execute-api.ap-southeast-2.amazonaws.com/Production/ocr", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ targetImage }),
    });

    setState((prevState) => ({
      ...prevState,
      confirmation: "Process completed successfully",
    }));

    const OCRBody = await response.json();
    console.log("OCRBody", OCRBody);

    setState((prevState) => ({
      ...prevState,
      Amount: OCRBody.body[0],
      Invoice: OCRBody.body[1],
      InvoiceDate: OCRBody.body[2],
    }));
  }

  const processing = state.confirmation;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h3 className="text-red-500 text-lg">{processing}</h3>
          <h6 className="text-gray-700 font-medium">Upload Invoice</h6>
          <p className="text-sm text-gray-500">PNG, JPG</p>
          

          {/* Drag and Drop Area */}
          <div>
          <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center">
          {state.preview ? (
              <img
                src={state.preview}
                alt="Preview"
                className="w-full h-40 object-cover rounded-md"
              />
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4-4m0 0l4 4m-4-4v12"
                  />
                </svg>
                <p className="text-sm text-blue-500 mt-2">Or Drag It Here</p>
              </>
            )}
          
            <FileBase64
              multiple={true}
              onDone={(files) => getFiles(files)}
              className="mt-4"
            />
          </div>

          <div>
            <label htmlFor="Invoice" className="block text-gray-700">
              Invoice
            </label>
            <input
              type="text"
              name="Invoice"
              id="Invoice"
              required
              value={state.Invoice}
              onChange={handleChange}
              className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          </div>


          <div>
            <label htmlFor="Amount" className="block text-gray-700">
              Amount ($)
            </label>
            <input
              type="text"
              name="Amount"
              id="Amount"
              required
              value={state.Amount}
              onChange={handleChange}
              className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="InvoiceDate" className="block text-gray-700">
              Date
            </label>
            <input
              type="text"
              name="InvoiceDate"
              id="InvoiceDate"
              required
              value={state.InvoiceDate}
              onChange={handleChange}
              className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="Vendor" className="block text-gray-700">
              Vendor
            </label>
            <input
              type="text"
              name="Vendor"
              id="Vendor"
              required
              value={state.Vendor}
              onChange={handleChange}
              className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="Description" className="block text-gray-700">
              Description
            </label>
            <input
              type="text"
              name="Description"
              id="Description"
              required
              value={state.Description}
              onChange={handleChange}
              className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 mt-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Hero;
