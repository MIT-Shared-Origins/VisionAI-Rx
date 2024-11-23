import React, { useState } from 'react'
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
    
        const date = {
          fileExt: "png",
          imageID: UID,
          folder: UID,
          img: files[0].base64,
        };
    
        setState((prevState) => ({
          ...prevState,
          confirmation: "Processing...",
        }));
    
        await fetch(
          "https://feeb6yrl7e.execute-api.ap-southeast-2.amazonaws.com/Production",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(date),
          }
        );
    
        const targetImage = UID + ".png";
        const response = await fetch(
          "https://31gv9av7oe.execute-api.us-west-1.amazonaws.com/Production/ocr",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(targetImage),
          }
        );
    
        setState((prevState) => ({
          ...prevState,
          confirmation: "",
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
    
              <div className="form-group">
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
                  className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                />
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
                  className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
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
                  className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
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
                  className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
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
                  className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
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

export default Hero
