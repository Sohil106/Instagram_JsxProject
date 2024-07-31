import React, { useState, useRef, useEffect } from 'react';

const CustomDropdown = ({ defaultValue, onChange, }) => {
    const [selectedOption, setSelectedOption] = useState(defaultValue);
    const [customValue, setCustomValue] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
  
    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setDropdownOpen(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
  
    const handleOptionChange = (e) => {
      console.log('Event:', e);
      console.log(e.target.value);
      setSelectedOption(e.target.value);
      setDropdownOpen(false); 
      onChange(e.target.value); 
    };
  
    const handleCustomInputChange = (e) => {
      setCustomValue(e.target.value);
      setSelectedOption(e.target.value);
      onChange(e.target.value); 
    };

    // const  handleDropDownchange = () => {
    //   onChange(e.target.value); 
    // }
  
    const toggleDropdown = () => {
      setDropdownOpen(!dropdownOpen);
    };
  
    return (
      <div>
        <div className="font-semibold mb-3">Gender</div>
        <div className="w-full relative" ref={dropdownRef}>
          <input
            type="text"
            className="peer w-full h-10 bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900 cursor-pointer"
            placeholder="Select Gender"
            value={selectedOption}
            readOnly
            onClick={toggleDropdown} 
            // onChange={handleDropDownchange}
          />
          {dropdownOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200">
              {/* Radio buttons for Male and Female */}
              <label className="block px-4 py-2 cursor-pointer">
                <input
                  type="radio"
                  value="Male"
                  checked={selectedOption === 'Male'}
                  onChange={handleOptionChange}
                />
                Male
              </label>
              <label className="block px-4 py-2 cursor-pointer">
                <input
                  type="radio"
                  value="Female"
                  checked={selectedOption === 'Female'}
                  onChange={handleOptionChange}
                />
                Female
              </label>
              {/* Input field for custom value */}
              <label className="block px-4 py-2 cursor-pointer">
                Custom:
                <input
                  type="text"
                  value={customValue}
                  onChange={handleCustomInputChange}
                  className="ml-2 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-gray-500"
                />
              </label>
            </div>
          )}
        </div>
      </div>
    );
  };

  export default CustomDropdown;