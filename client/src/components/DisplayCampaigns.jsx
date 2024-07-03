import React from 'react';
import { useNavigate } from 'react-router-dom';
import { loader } from '../assets';
import FundCard from './FundCard';
import { daysLeft } from '../utils';

const quickSort = (array, left = 0, right = array.length - 1) => {
  if (left >= right) return array;

  const pivotIndex = partition(array, left, right);
  quickSort(array, left, pivotIndex - 1);
  quickSort(array, pivotIndex + 1, right);

  return array;
};

const partition = (array, left, right) => {
  const pivot = array[right];
  let i = left - 1;

  for (let j = left; j < right; j++) {
    if (array[j].remainingDays < pivot.remainingDays) {
      i++;
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  [array[i + 1], array[right]] = [array[right], array[i + 1]];
  return i + 1;
};

const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();

  const campaignsWithDaysLeft = campaigns.map(campaign => ({
    ...campaign,
    remainingDays: daysLeft(campaign.deadline)
  }));

  const sortedCampaigns = quickSort(campaignsWithDaysLeft);

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
