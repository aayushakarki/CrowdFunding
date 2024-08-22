// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFunding {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;         // target amount to achieve
        uint256 deadline;
        uint256 amountCollected;
        string category;       // Add category field
        string image;
        address[] donators;
        uint256[] donations;
    }

    // In Solidity, "mapping" is a data structure used to associate a key with a value. 
    // It's similar to a hash table or dictionary in other programming languages.
    mapping(uint256 => Campaign) public campaigns;

    uint256 public numberOfCampaigns = 0; // "public" keyword is visibility modifier, it specifies visibility of function

    // a function declared "public" can be called from outside the contract
    // and can be accessed by any other contract or externally owned account (EOA) 
    // on the Ethereum blockchain.
    // this func. returns ID of the created campaign
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
        campaign.category = _category; // Store the category
        campaign.image = _image;

        numberOfCampaigns++;

        return (numberOfCampaigns - 1);
    }

    // The payable keyword indicates that this function can receive Ether. 
    // Users can send Ether to this function when they call it.
    // The amount of Ether (in Wei) sent with the transaction is accessible    
    // within the function via the msg.value variable.
    function donateToCampaign(uint256 _id) public payable { 
        require(_id < numberOfCampaigns, "Campaign ID does not exist.");

        Campaign storage campaign = campaigns[_id];
        require(block.timestamp < campaign.deadline, "Campaign deadline has passed.");

        campaign.donators.push(msg.sender);
        campaign.donations.push(msg.value);

        (bool sent,) = payable(campaign.owner).call{value: msg.value}("");
        require(sent, "Failed to send Ether");

        campaign.amountCollected += msg.value;
    }

    function getDonators(uint256 _id) public view returns (address[] memory, uint256[] memory) {
        require(_id < numberOfCampaigns, "Campaign ID does not exist.");

        // In Solidity, when you declare a variable with the storage keyword, 
        // you're creating a reference to a storage slot rather than creating a 
        // new copy of the data. So, when you modify a variable declared with storage, 
        // you're directly modifying the data in storage, which reflects on the global state.

        // the local variable campaign is a pointer to a slot on global campaigns
        Campaign storage campaign = campaigns[_id];
        return (campaign.donators, campaign.donations);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);
        // allCampaigns is array of elements of type Campaign[] structures
        // the size of array is equal to numberOfCampaigns
        for (uint256 i = 0; i < numberOfCampaigns; i++) {
            allCampaigns[i] = campaigns[i];
        }

        return allCampaigns;
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
    }
}
