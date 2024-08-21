import React from 'react';
import { useNavigate } from 'react-router-dom';
import { loader } from '../assets';
import FundCard from './FundCard';
import { daysLeft } from '../utils';

const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();

  const campaignsWithDaysLeft = campaigns.map(campaign => ({
    ...campaign,
    remainingDays: daysLeft(campaign.deadline),
    category: campaign.category || 'Education'
  }));

  const sortedCampaigns = campaignsWithDaysLeft.sort((a, b) => a.remainingDays - b.remainingDays);

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };

  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">{title} ({campaigns.length})</h1>
      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
        )}
        {!isLoading && sortedCampaigns.length > 0 && sortedCampaigns.map((campaign, index) => (
          <FundCard
            key={campaign.id || index + 1}
            {...campaign}
            handleClick={() => handleNavigate(campaign)}
          />
        ))}
      </div>
    </div>
  );
};

export default DisplayCampaigns;