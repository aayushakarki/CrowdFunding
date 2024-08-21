import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {ethers} from "ethers";
import { useStateContext } from '../context';
import { money } from '../assets';
import { CustomButton, FormField, Loader} from '../components';
import { checkIfImage } from '../utils';

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign } = useStateContext();
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '', 
    deadline: '',
    category: '',
    image: '',
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }

  // make it async since smart contract tx cost time
  const handleSubmit = async (e) => {
    // the default browser behaviour is to refresh the page after
    // form submission but we dont want to do that
    e.preventDefault();
    checkIfImage(form.image, async (exists) => {
      if(exists) {
        setIsLoading(true)
        await createCampaign({ ...form, target: ethers.utils.parseUnits(form.target, 18),
          category: form.category  // Ensure the category is passed
        })
        setIsLoading(false);
        navigate('/');
      } else {
        alert('Provide valid image URL')
        setForm({ ...form, image: '' });
      }
    })
    console.log(form);

  }
  
  return (
    <>
    {/* Back to Dashboard Button */}
    <button
        onClick={() => navigate("/")}
        className="flex items-center text-white mt-5 mb-5 text-[18px] text-[#A5A6AB]" // Use Tailwind classes for size and color
      >
        &#8592; {/* Unicode character for left arrow */}
        <span className="ml-2">Back to Dashboard</span>
      </button>
      
    <div className="bg-[#000000] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4 bg-[#000000]">
    {isLoading && <Loader/>}
    <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#1dc071] rounded-[10px]">
      <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Start a Campaign</h1>
    </div>
    <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
    <div className="flex flex-wrap gap-[40px]">
      <FormField
      labelName="Your Name *"
      placeholder="Name"
      inputType="text"
      value={form.name}
      handleChange={(e) => handleFormFieldChange('name', e)}
      />

      <FormField
        labelName="Campaign Title *"
        placeholder="Write a title"
        inputType="text"
        value={form.title}
        handleChange={(e) => handleFormFieldChange('title', e)}
      />

      </div>
      <FormField
        isTextArea
        labelName="Story *"
        placeholder="Write your story"
        inputType="text"
        value={form.description}
        handleChange={(e) => handleFormFieldChange('description', e)}
      />
      <div className="flex flex-wrap gap-[40px]">
      <FormField
      labelName="Goal *"
      placeholder="ETH 0.50"
      inputType="text"
      value={form.target}
      handleChange={(e) => handleFormFieldChange('target', e)}
      />

      <FormField
        labelName="End Date *"
        placeholder="End Date"
        inputType="date"
        value={form.deadline}
        handleChange={(e) => handleFormFieldChange('deadline', e)}
      />

      <FormField
        labelName="Campaign Category *"
        placeholder="Select a category"
        inputType="select"
        handleChange={(e) => handleFormFieldChange('category', e)}
        options={[
          { value: '', label: 'Select a category' },
          { value: 'health', label: 'Health' },
          { value: 'education', label: 'Education' },
          { value: 'humanitarian', label: 'Humanitarian' },
          { value: 'technology', label: 'Technology and Innovation' },
          { value: 'emergency', label: 'Emergency & Disaster Relief' },
        ]}
        value={form.category}
      />

      </div>
      <FormField 
            labelName="Campaign image *"
            placeholder="Place image URL of your campaign"
            inputType="url"
            value={form.image}
            handleChange={(e) => handleFormFieldChange('image', e)}
      />
      <div className="flex justify-center items-center mt-[20px]">
            <CustomButton 
              btnType="submit"
              title="Submit new campaign"
              styles="bg-[#1dc071]"
            />
          </div>
    </form>

    </div>
    </>
  )
}

export default CreateCampaign
