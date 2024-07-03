import React from 'react';

const CountBox = ({ title, value }) => {
  return (
    <div className="flex flex-col items-center w-[250px]">
      <h4 className="font-epilogue font-bold text-[30px] text-white p-3 bg-[#15192D] rounded-t-[10px] w-full text-center truncate">
        {value}
      </h4>
      <p className="font-epilogue font-normal text-[16px] text-[#808191] bg-[#000000] px-3 py-2 w-full rounded-b-[10px] text-center">
        {title}
      </p>
    </div>
  );
};

export default CountBox;
