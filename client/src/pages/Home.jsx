import React, { useState, useEffect } from "react";
import { useStateContext } from "../context";
import { DisplayCampaigns } from "../components";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Campaigns");
  const { contract, getCampaigns, searchQuery } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [contract]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesCategory =
      selectedCategory === "All Campaigns" ||
      campaign.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearchQuery = campaign.title
      .toLowerCase()
      .startsWith(searchQuery.toLowerCase());
    return matchesCategory && matchesSearchQuery;
  });

  return (
    <div>
      <div className="flex space-x-4 mb-4 overflow-auto no-scrollbar">
        <button
          className={`py-2 px-4 rounded-[10px] font-epilogue font-medium text-[14px] transition-transform duration-300 ${
            selectedCategory === "All Campaigns"
              ? "bg-[#15192D] text-green-500"
              : "bg-[#000000] text-[#b2b3bd] hover:bg-[#4b4b61] hover:text-green-500 scale-105"
          }`}
          onClick={() => handleCategoryClick("All Campaigns")}
        >
          All Campaigns
        </button>
        <button
          className={`py-2 px-4 rounded-[10px] font-epilogue font-medium text-[14px] transition-transform duration-300 ${
            selectedCategory === "Health"
              ? "bg-[#15192D] text-green-500"
              : "bg-[#000000] text-[#b2b3bd] hover:bg-[#15192D] hover:text-green-500 scale-105"
          }`}
          onClick={() => handleCategoryClick("Health")}
        >
          Health
        </button>
        <button
          className={`py-2 px-4 rounded-[10px] font-epilogue font-medium text-[14px] transition-transform duration-300 ${
            selectedCategory === "Education"
              ? "bg-[#15192D] text-green-500"
              : "bg-[#000000] text-[#b2b3bd] hover:bg-[#15192D] hover:text-green-500 scale-105"
          }`}
          onClick={() => handleCategoryClick("Education")}
        >
          Education
        </button>
        <button
          className={`py-2 px-4 rounded-[10px] font-epilogue font-medium text-[14px] transition-transform duration-300 ${
            selectedCategory === "Humanitarian"
              ? "bg-[#15192D] text-green-500"
              : "bg-[#000000] text-[#b2b3bd] hover:bg-[#15192D] hover:text-green-500 scale-105"
          }`}
          onClick={() => handleCategoryClick("Humanitarian")}
        >
          Humanitarian
        </button>
        <button
          className={`py-2 px-4 rounded-[10px] font-epilogue font-medium text-[14px] transition-transform duration-300 ${
            selectedCategory === "Technology and Innovation"
              ? "bg-[#15192D] text-green-500"
              : "bg-[#000000] text-[#b2b3bd] hover:bg-[#15192D] hover:text-green-500 scale-105"
          }`}
          onClick={() => handleCategoryClick("Technology and Innovation")}
        >
          Technology and Innovation
        </button>
        <button
          className={`py-2 px-4 rounded-[10px] font-epilogue font-medium text-[14px] transition-transform duration-300 ${
            selectedCategory === "Emergency and Disaster Relief"
              ? "bg-[#15192D] text-green-500"
              : "bg-[#000000] text-[#b2b3bd] hover:bg-[#15192D] hover:text-green-500 scale-105"
          }`}
          onClick={() => handleCategoryClick("Emergency and Disaster Relief")}
        >
          Emergency and Disaster Relief
        </button>
      </div>

      <DisplayCampaigns
        title={selectedCategory}
        isLoading={isLoading}
        campaigns={filteredCampaigns}
      />
    </div>
  );
};

export default Home;
