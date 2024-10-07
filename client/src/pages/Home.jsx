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
    try {
      const data = await getCampaigns();
      console.log("Fetched campaigns:", data); // Log the data to verify

      setCampaigns(data);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    } finally {
      setIsLoading(false);
    }
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
        {["All Campaigns", "Health", "Education", "Humanitarian", "Technology and Innovation", "Emergency and Disaster Relief"].map((category) => (
          <button
            key={category}
            className={`py-2 px-4 rounded-[10px] font-epilogue font-medium text-[14px] transition-transform duration-300 ${
              selectedCategory === category
                ? "bg-[#15192D] text-green-500"
                : "bg-[#000000] text-[#b2b3bd] hover:bg-[#15192D] hover:text-green-500 scale-105"
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
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