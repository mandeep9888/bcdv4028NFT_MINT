import axios from "axios";
import { useState } from "react";
import { Contract, Signer, ethers } from "ethers";
import { ToastContainer } from "react-toastify";
import { errorToast, successToast, warnToast } from "../Toaster";
import $ from "jquery";
import "../../src/App.css";
import AlphaApes from "../artifacts/contracts/MyNFT.sol/AlphaApes.json";


const JWT = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzZDg3ZmNhYy1iOWJiLTQ2ZGYtOTM0OS1hZDkwNTFkZmQ0ZjciLCJlbWFpbCI6InNoYWFuOTg4OEBvdXRsb29rLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIzMGQ0ZTkxZWI1MDJkNTBjZTNlOCIsInNjb3BlZEtleVNlY3JldCI6IjQzZDUzZGNhOTQ5YzM3OTE0ZTVjMGEzMWM1MTM5NDQ1YTM3MDgxY2UzNTU4ZTFiMGE0NWM3ODI4M2MzODA2NmYiLCJpYXQiOjE2OTYzODI1MzZ9.YaQyeT0VCFuI7-ZWjgol530lnrok6BhVBhq0buQ_lb8`;
const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
// const contractAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";

const provider = new ethers.providers.Web3Provider(window.ethereum);

// get the end user
const signer = provider.getSigner();

// get the smart contract
const contract = new ethers.Contract(contractAddress, AlphaApes.abi, signer);
const contentId = "QmNknrvav9RQWV4ARe8YAdmLknHWDKeK9VaCLUizSvqQYz";
// const metadataURI = `${contentId}/${`tokenId`}.json`;
const imageURI = `https://gateway.pinata.cloud/ipfs/${contentId}`;

const FileUpload = () => {

  const [balance, setBalance] = useState();
  const [ShowData, setShowData] = useState([]);
  const [selectedFile, setSelectedFile] = useState();

  console.log(ShowData);

  const getBalance = async () => {
    const [account] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(account);
    setBalance(ethers.utils.formatEther(balance));
  };

 
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // const handleSubmission = async () => {
  //   const formData = new FormData();

  //   formData.append("file", selectedFile);

  //   const metadata = JSON.stringify({
  //     name: selectedFile.name,
  //   });
  //   formData.append("pinataMetadata", metadata);

  //   const options = JSON.stringify({
  //     cidVersion: 0,
  //   });
  //   formData.append("pinataOptions", options);

  //   try {
  //     const res = await axios.post(
  //       "https://api.pinata.cloud/pinning/pinFileToIPFS",
  //       formData,
  //       {
  //         maxBodyLength: "Infinity",
  //         headers: {
  //           "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
  //           Authorization: JWT,
  //         },
  //       }
  //     );
  //     console.log(res.data);
  //     mintToken();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleSubmission = async () => {
    const formData = new FormData();

    formData.append("file", selectedFile);

    const metadata = JSON.stringify({
      name: selectedFile.name,
    });
    formData.append("pinataMetadata", metadata);

    const options = JSON.stringify({
      cidVersion: 0,
    });
    formData.append("pinataOptions", options);

    try {
      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          maxBodyLength: "Infinity",
          headers: {
            "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
            Authorization: JWT,
          },
        }
      );
      console.log(res.data);
      mintToken();
    } catch (error) {
      console.log(error);
    }
  };

  const getData = () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzZDg3ZmNhYy1iOWJiLTQ2ZGYtOTM0OS1hZDkwNTFkZmQ0ZjciLCJlbWFpbCI6InNoYWFuOTg4OEBvdXRsb29rLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIzMGQ0ZTkxZWI1MDJkNTBjZTNlOCIsInNjb3BlZEtleVNlY3JldCI6IjQzZDUzZGNhOTQ5YzM3OTE0ZTVjMGEzMWM1MTM5NDQ1YTM3MDgxY2UzNTU4ZTFiMGE0NWM3ODI4M2MzODA2NmYiLCJpYXQiOjE2OTYzODI1MzZ9.YaQyeT0VCFuI7-ZWjgol530lnrok6BhVBhq0buQ_lb8",
      },
    };

    fetch("https://api.pinata.cloud/data/pinList", options)
      .then((response) => response.json())
      .then((response) => {
        successToast("Content has been retrieved!");
        setShowData(response.rows);
      })
      .catch((err) => console.error(err));
  };

  //Faccing ISue here.....
  // const mintToken = async () => {
  //   const connection = contract.connect(signer);
  //   const addr = connection.address;
  //   const result = await contract.payToMint(addr, metadataURI, {
  //     value: ethers.utils.parseEther("0.05"),
  //   });

  //   await result.wait();
  // };

  const mintToken = async () => {
    const connection = contract.connect(signer);
    const addr = connection.address;
    const result = await contract.payToMint(addr, imageURI, {
      value: ethers.utils.parseEther("0.05"),
    });
    successToast("Token Minted!");
    await result.wait();
  };

  return (
    <>
      <div className="text-center p-4">
        <h3>NFT miniting !!!</h3>
        <p>
          {/* <i>Check Logs if anything is not working...!</i> */}
        </p>
        <hr />
        <div>
          {balance === undefined ? (
            ""
          ) : (
            <h5 className="card-title">You have {balance}</h5>
          )}
          <button className="btn btn-success me-4" onClick={() => getBalance()}>
            Show My Eth Balance
          </button>
          <button onClick={() => getData()} className="btn btn-warning">
            Show My NFTs
          </button>
          <div className="mt-5 d-flex justify-content-center align-items-center flex-column ">
            <div>
              <label class="form-label">Select File</label>
              <input type="file" onChange={changeHandler} className="me-2" />
            </div>
            {selectedFile === undefined ? (
              ""
            ) : (
              <button
                className="btn btn-danger mt-3"
                onClick={handleSubmission}
              >
                Mint Your NFT
              </button>
            )}
          </div>
          <div className="d-flex gap-3  justify-content-center flex-wrap w-100">
            {ShowData.map((data, idx) => {
              console.log("dataaaa", data);
              return (
                <>
                  <div className="box d-flex flex-column text-start" id={idx}>
                    <p>
                      <b>File Name:</b>
                      {data.metadata.name}
                    </p>
                    <p>
                      <b>IPFS Hash:</b>
                      <br />
                      {data.ipfs_pin_hash}
                    </p>
                    <p>
                      <b>size : </b>
                      {data.size}
                    </p>
                    <img
                      src={`https://gateway.pinata.cloud/ipfs/${data.ipfs_pin_hash}`}
                      className="w-25 h-25"
                    />
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
   
  // return (
  //   <>
  //     <div className="card">
  //       <div className="card-body">
  //         <h1>Check logs and network Tab</h1>
  //         <h5 className="card-title">Your Balance: {balance}</h5>
  //         <button className="btn btn-success me-4" onClick={() => getBalance()}>
  //           Show My Balance
  //         </button>
  //         <button onClick={() => getData()} className="btn btn-danger">
  //           Show Uploads
  //         </button>
  //       </div>
  //     </div>
  //     <br />
  //     <label class="form-label">Choose File</label>
  //     <input type="file" onChange={changeHandler} className="me-2" />
  //     <button className="btn btn-success" onClick={handleSubmission}>
  //       Submit
  //     </button>
  //     <br />
  //     {ShowData?.map((e, index) => {
  //       <div className="text-black">
  //         <p className="text-black">{index + 1}</p>;
  //         <p>IPFS HASh : {e?.ipfs_pin_hash}</p>;
  //       </div>;
  //     })}
  //     {/* <button className="btn btn-primary" onClick={mintToken}>
  //       Mint
  //     </button> */}
  //   </>
  // );
};

export default FileUpload;
