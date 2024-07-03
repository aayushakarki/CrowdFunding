import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const address = "0x4e4e72E5Ce3B8B5ed46Ba9d638BF6b79585abfdf";
  const apiKey = "MHGIXDVXQG8YAWJAWE698ANMBAG2CW1E8B";
  const url = `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setTransactions(response.data.result);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  }, [url]);

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-white mt-5 mb-5 text-[18px] text-[#A5A6AB]" // Use Tailwind classes for size and color
      >
        &#8592; {/* Unicode character for left arrow */}
        <span className="ml-2">Go Back</span>
      </button>
      <h1 className="bg-[#000000] text-[20px] text-[#EDEDED] text-bold">
        Transactions
      </h1>
      <table className="min-w-full bg-[#000000] text-[#EDEDED]">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">From</th>
            <th className="py-2 px-4 border-b">To</th>
            <th className="py-2 px-4 border-b">Value</th>
            <th className="py-2 px-4 border-b">Block</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.hash}>
              <td className="py-2 px-4 border-b">{tx.from}</td>
              <td className="py-2 px-4 border-b">{tx.to}</td>
              <td className="py-2 px-4 border-b">{tx.value}</td>
              <td className="py-2 px-4 border-b">{tx.blockNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
