// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFunding {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string category;
        string image;
        address[] donators;
        uint256[] donations;
    }

    mapping(uint256 => Campaign) public campaigns;

    uint256 public numberOfCampaigns = 0;
    address public owner;

    event CampaignCreated(uint256 id, address owner, string title, uint256 target, uint256 deadline, string category);
    event DonationReceived(uint256 campaignId, address donor, uint256 amount);
    event CampaignDeleted(uint256 id);

    constructor() {
        owner = msg.sender;
    }

    function createCampaign(address _owner, string memory _title, string memory _description, 
        uint256 _target, uint256 _deadline, string memory _category, string memory _image) public returns (uint256) {
        
        require(_deadline > block.timestamp, "Deadline should be a date in the future.");

        Campaign storage campaign = campaigns[numberOfCampaigns];
        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.category = _category;
        campaign.image = _image;

        emit CampaignCreated(numberOfCampaigns, _owner, _title, _target, _deadline, _category);

        numberOfCampaigns++;

        return (numberOfCampaigns - 1);
    }

    function donateToCampaign(uint256 _id) public payable { 
        require(_id < numberOfCampaigns, "Campaign ID does not exist.");

        Campaign storage campaign = campaigns[_id];
        require(block.timestamp < campaign.deadline, "Campaign deadline has passed.");

        campaign.donators.push(msg.sender);
        campaign.donations.push(msg.value);

        (bool sent,) = payable(campaign.owner).call{value: msg.value}("");
        require(sent, "Failed to send Ether");

        campaign.amountCollected += msg.value;

        emit DonationReceived(_id, msg.sender, msg.value);
    }

    function deleteCampaign(uint256 _id) public {
        require(_id < numberOfCampaigns, "Campaign ID does not exist.");

        Campaign storage campaignToDelete = campaigns[_id];
        require(msg.sender == campaignToDelete.owner, "Only the owner can delete the campaign.");

        if (_id < numberOfCampaigns - 1) {
            Campaign storage lastCampaign = campaigns[numberOfCampaigns - 1];
            campaigns[_id] = lastCampaign;
        }

        delete campaigns[numberOfCampaigns - 1];
        numberOfCampaigns--;

        emit CampaignDeleted(_id);
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);
        for (uint256 i = 0; i < numberOfCampaigns; i++) {
            allCampaigns[i] = campaigns[i];
        }
        return allCampaigns;
    }
}
