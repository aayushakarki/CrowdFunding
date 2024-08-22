import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { favicon } from "../assets";
import { navlinks } from "../constants";
import { useDisconnect, useContract } from "@thirdweb-dev/react";
import { useStateContext } from "../context";

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div
    className={`w-[48px] h-[48px] rounded-[10px] 
  ${isActive && isActive === name && "bg-[#15192D]"} flex justify-center
  items-center ${!disabled && "cursor-pointer"} ${styles} hover:bg-[#15192D] hover:scale-105 transition-transform duration-200`}
    onClick={handleClick}
  >
    {!isActive ? (
      <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
    ) : (
      <img
        src={imgUrl}
        alt="fund_logo"
        className={`w-1/2 h-1/2 ${isActive !== name && "grayscale"}`}
      />
    )}
  </div>
);

const Sidebar = () => {
  const navigate = useNavigate();
  const disconnect = useDisconnect();
  const { address, contract } = useStateContext();

  const [isActive, setIsActive] = useState("dashboard");
  const [isContractCreator, setIsContractCreator] = useState(false);

  useEffect(() => {
    const checkContractCreator = async () => {
      if (contract && address) {
        try {
          const owner = await contract.call("getOwner"); // Fetch the owner address
          setIsContractCreator(owner.toLowerCase() === address.toLowerCase());
        } catch (error) {
          console.error("Error fetching contract owner:", error);
        }
      }
    };

    checkContractCreator();
  }, [contract, address]);

  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <Link to="/">
        <Icon
          styles="w-[60px] h-[60px] bg-[#000000] rounded-full"
          imgUrl={favicon}
        />
      </Link>
      <div
        className="flex-1 flex flex-col justify-between items-center 
      bg-[#000000] rounded-[20px] w-[76px] py-4 mt-7"
      >
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks
            .filter((link) => {
              if (link.name === "withdraw") {
                return isContractCreator;
              }
              return true;
            })
            .map((link) => (
              <Icon
                key={link.name}
                {...link}
                isActive={isActive}
                handleClick={() => {
                  if (!link.disabled) {
                    if (link.name === "logout") {
                      disconnect();
                    } else {
                      setIsActive(link.name);
                      navigate(link.link);
                    }
                  }
                }}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
