import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { favicon, sun } from "../assets";
import { navlinks } from "../constants";
import { useDisconnect } from "@thirdweb-dev/react";

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  // template string
  // box surrounding the icon
  <div
    className={`w-[48px] h-[48px] rounded-[10px] 
  ${isActive && isActive === name && "bg-[#15192D]"} flex justify-center
  items-center ${!disabled && "cursor-pointer"} ${styles} hover:bg-[#15192D] hover:scale-105 transition-transform duration-200`}
    onClick={handleClick}
  >
    {/* icons are originally green
       if the icon is not selected we set it */}
    {!isActive ? (
      <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
    ) : (
      <img
        src={imgUrl}
        alt="fund_logo"
        className={`w-1/2 h-1/2
         ${isActive !== name && "grayscale"}`}
      />
    )}
  </div>
);
const Sidebar = () => {
  // The useNavigate hook returns a navigate function that allows you to programmatically
  // navigate to different pages within your application.
  // Essentially, it provides a way to navigate to different routes without relying on <Link>
  // components or history.push().
  const navigate = useNavigate();
  const disconnect = useDisconnect();

  // isActive state variable is declared
  // State variables are part of a component's state, which means they trigger
  // re-renders when their values change, causing React to update the UI accordingly.
  const [isActive, setIsActive] = useState("dashboard");
  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <Link to="/">
        <Icon styles="w-[60px] h-[60px] bg-[#000000] rounded-full" imgUrl={favicon} />
      </Link>
      <div
        className="flex-1 flex flex-col justify-between items-center 
      bg-[#000000] rounded-[20px] w-[76px] py-4 mt-7"
      >
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if (!link.disabled) {
                  if (link.name === 'logout') {
                    disconnect();
                  } else {
                    setIsActive(link.name);
                    navigate(link.link);
                  }
                }
              }}
            />
          ))}
        </div>
        <Icon styles="bg-[#000000]" imgUrl={sun} />
      </div>
    </div>
  );
};

export default Sidebar;


// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { favicon, sun } from "../assets";
// import { navlinks } from "../constants";
// import { useDisconnect } from "@thirdweb-dev/react";

// const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
//   // template string
//   // box surrounding the icon
//   <div
//     className={`w-[48px] h-[48px] rounded-[10px] 
//   ${isActive && isActive === name && "bg-[#2c2f33]"} flex justify-center
//   items-center ${!disabled && "cursor-pointer"} ${styles} hover:shadow-secondary hover:scale-105 transition-transform duration-200`}
//     onClick={handleClick}
//   >
//     {/* icons are originally green
//        if the icon is not selected we set it */}
//     {!isActive ? (
//       <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
//     ) : (
//       <img
//         src={imgUrl}
//         alt="fund_logo"
//         className={`w-1/2 h-1/2
//          ${isActive !== name && "grayscale"}`}
//       />
//     )}
//   </div>
// );
// const Sidebar = () => {
//   // The useNavigate hook returns a navigate function that allows you to programmatically
//   // navigate to different pages within your application.
//   // Essentially, it provides a way to navigate to different routes without relying on <Link>
//   // components or history.push().
//   const navigate = useNavigate();
//   const disconnect = useDisconnect();

//   // isActive state variable is declared
//   // State variables are part of a component's state, which means they trigger
//   // re-renders when their values change, causing React to update the UI accordingly.
//   const [isActive, setIsActive] = useState("dashboard");
//   return (
//     <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
//       <Link to="/">
//         <Icon styles="w-[60px] h-[60px] bg-[#2c2f32] rounded-full" imgUrl={favicon} />
//       </Link>
//       <div
//         className="flex-1 flex flex-col justify-between items-center 
//       bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12"
//       >
//         <div className="flex flex-col justify-center items-center gap-3">
//           {navlinks.map((link) => (
//             <Icon
//               key={link.name}
//               {...link}
//               isActive={isActive}
//               handleClick={() => {
//                 if (!link.disabled) {
//                   if (link.name === 'logout') {
//                     disconnect();
//                   } else {
//                     setIsActive(link.name);
//                     navigate(link.link);
//                   }
//                 }
//               }}
//             />
//           ))}
//         </div>
//         <Icon styles="bg-[#1c1c24]" imgUrl={sun} />
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
