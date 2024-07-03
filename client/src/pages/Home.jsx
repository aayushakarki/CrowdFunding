import React, { useState, useEffect } from 'react';
import { useStateContext } from '../context';
import { DisplayCampaigns } from "../components";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const { contract, getCampaigns, searchQuery } = useStateContext();
  
  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  }
  
  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [contract]);

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.title.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  return (
    <DisplayCampaigns 
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={filteredCampaigns}
    />
  )
}

export default Home;
