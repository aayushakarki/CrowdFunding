import React, { useContext, createContext, useState } from "react";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0x2a4c36acC154b38A555Ce23F5A8A05660c914B5f"
    // "0xfDBd25E3DE1676Cc17f9Fe07e98c60A694914299"
  );
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );
  const { mutateAsync: deleteCampaign } = useContractWrite(
    contract,
    "deleteCampaign"
  );

  const address = useAddress();
  const connect = useMetamask();
  const [searchQuery, setSearchQuery] = useState("");

  const publishCampaign = async (form) => {
    try {
      const deadlineInSeconds = Math.floor(
        new Date(form.deadline).getTime() / 1000
      );
      const data = await createCampaign({
        args: [
          address, // owner
          form.title, // title
          form.description, // description
          form.target,
          deadlineInSeconds,
          form.category,
          form.image,
        ],
      });

      console.log("Contract call success", data);
    } catch (error) {
      console.log("Contract call failure", error);
    }
  };

  const getCampaigns = async () => {
    const currentTime = Math.floor(Date.now() / 1000);
    const campaigns = await contract.call("getCampaigns");
    const parsedCampaigns = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(
        campaign.amountCollected.toString()
      ),
      category: campaign.category,
      image: campaign.image,
      pId: i,
    }));

    const activeCampaigns = parsedCampaigns.filter(
      (campaign) => campaign.deadline >= currentTime
    );
    return activeCampaigns;
  };

  const donate = async (pId, amount) => {
    const data = await contract.call("donateToCampaign", [pId], {
      value: ethers.utils.parseEther(amount),
    });

    return data;
  };

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter(
      (campaign) => campaign.owner === address
    );

    return filteredCampaigns;
  };

  const getDonations = async (pId) => {
    const donations = await contract.call("getDonators", [pId]);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString()),
      });
    }

    return parsedDonations;
  };

  const removeCampaign = async (pId) => {
    try {
      await deleteCampaign({
        args: [pId],
      });
      console.log(`Campaign ${pId} deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting campaign ${pId}:`, error);
    }
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        deleteCampaign: removeCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
