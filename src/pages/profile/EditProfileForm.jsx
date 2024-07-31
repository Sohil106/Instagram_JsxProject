import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CustomButton from "../../components/shared/CustomButton";
import {
  updateUserData,
  useSelectorProfileState,
} from "../../redux/slices/ProfileSlice";
import { useDispatch } from "react-redux";
import CustomDropdown from "../../components/shared/CustomDropdown";
import CustomSwitch from "../../components/shared/CustomSwitch";

const EditProfileForm = ({user}) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm();

  const disPatch = useDispatch();
  // const { user } = useSelectorProfileState();


  const onSubmit = async (data) => {
    const res =await disPatch(updateUserData(data));
  };

  React.useEffect(() => {
    if (user) {
      setValue("userName", user.userName || "");
      setValue("name", user.name || "");
      setValue("link", user.link || "");
      setValue("bio", user.bio || "");
      setValue("dateOfBirth", user.dateOfBirth ? user.dateOfBirth.substring(0, 10) : "");
      setValue("email", user.email || "");
      setValue("mobile", user.mobile || "");
      setValue("gender", user.gender || "");
      setValue("isPrivate", user.isPrivate ?? false); 
    }
  }, [user, setValue]);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col justify-between gap-4">
        {/* <input type="text" hidden {...register("userId")} value={user.userId} defaultValue={user.userId} /> */}
        <div>
          <div className="font-semibold mb-3">UserName</div>
          <div className="w-full">
            <div className="relative w-full min-w-[200px] h-10">
              <input
                type="text"
                className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                placeholder="john123"
                {...register("userName", {
                  required: true,
                  pattern: /^[a-z][a-z0-9_]{4,19}$/,
                })}
              />
              {/* <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                UserName
              </label> */}
            </div>
          </div>
          {errors.userName && (
            <p className="text-left text-rose-500" role="alert">
              {errors.userName.type === "pattern"
                ? "Invalid UserName"
                : "Required"}
            </p>
          )}
        </div>
        <div>
          <div className="font-semibold mb-3">Name</div>
          <div className="w-full">
            <div className="relative w-full min-w-[200px] h-10">
              <input
                type="text"
                placeholder="Ex: John Doe"
                className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2  text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                {...register("name", {
                  required: true,
                  pattern: /^(?!.*\s.*\s)[a-zA-Z ]{3,20}$/,
                })}
              />
              {/* <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                Name
              </label> */}
            </div>
            {errors.name && (
              <p className="text-left text-rose-500" role="alert">
                {errors.name.type === "pattern" ? "Invalid name" : "Required"}
              </p>
            )}
          </div>
        </div>

        <div>
          <div className="font-semibold mb-3">Website</div>
          <div className="w-full">
            <div className="relative w-full min-w-[200px] h-10">
              <input
                type="text"
                className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2  text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                placeholder="Ex: https://www.instagram.com"
                {...register("link",{
                  pattern:/^(ftp|http|https):\/\/[^""\s]+(?:\/[^""\s]*)?$/,
                })
                }
              />
              {/* <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                Website
              </label> */}
            </div>
            {errors.link && (
              <p className="text-left text-rose-500" role="alert">
                Invalid link
              </p>
            )}
          </div>
        </div>
        <div>
          <div className="font-semibold mb-3">Bio</div>
          <div className="w-full">
            <div className="relative w-full min-w-[200px] ">
              <textarea
                maxLength={150}
                rows={2}
                className="peer w-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                placeholder="type here..."
                {...register("bio",{
                  maxLength: 200,
                })}
                
              />
              {/* <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                Bio
              </label> */}
            </div>
            {errors.bio && (
              <p className="text-left text-rose-500" role="alert">
                Invalid bio
              </p>
            )}
          </div>
        </div>
        <div>
          <div className="font-semibold mb-3">Date of Birth</div>
          <div className="w-full">
            <div className="relative w-full min-w-[200px] h-10">
              <input
                type="date"
                className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                placeholder=""
                // defaultValue={
                //   user.dateOfBirth ? user.dateOfBirth.substring(0, 10) : ""
                // }
                {...register("dateOfBirth", {
                  required: true,
                })}
              />
              {/* <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                Date of Birth
              </label> */}
            </div>
          </div>
        </div>
        <div>
          <div className="font-semibold mb-3">Email</div>
          <div className="w-full">
            <div className="relative w-full min-w-[200px] h-10">
              <input
                type="text"
                className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                placeholder="Ex: johndoe@gmail.com"
                {...register("email", {
                  required: true,
                  pattern: /^[a-z\d\-\.]+@([a-z\d-]+\.)+[a-z\d-]{2,4}$/,
                })}
              />
              {/* <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                Email
              </label> */}
            </div>
            {errors.email && (
              <p className="text-left text-rose-500" role="alert">
                {errors.email.type === "pattern" ? "Invalid Email" : "Required"}
              </p>
            )}
          </div>
        </div>
        <div>
          <div className="font-semibold mb-3">Contact Number</div>
          <div className="w-full">
            <div className="relative w-full min-w-[200px] h-10">
              <input
                type="text"
                className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                placeholder="Ex: 9873241235"
                {...register("mobile", {
                  required: false,
                  pattern: /^[6-9]\d{9}$/,
                })}
              />
              {/* <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                Contact Number
              </label> */}
            </div>
            {errors.mobile && (
              <p className="text-rose-500 text-left">Invalid Phone Number</p>
            )}
          </div>
        </div>
        <div>
        <div className="font-semibold mb-3">Gender</div>
        <div className="relative w-full min-w-[200px] h-10">
                
          <select 
          className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
             {...register("gender")} >
            <option value="" disabled>Select...</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          
          {/* <CustomDropdown
          defaultValue={gender}
          onChange={(selectedGender) => {
            setGender(selectedGender);
            register("gender"); // Register gender field with react-hook-form
          }}
        /> */}
        </div>
        </div>

        <div>
        <div className="font-semibold mb-3">Account</div>
        <CustomSwitch
            name="isPrivate"  // Name of the field in the form
            control={control}  // Control from useForm
            defaultValue={user?.isPrivate ?? false}  // Default value if available
          />
        </div>
        
        <div className="flex justify-end">
          <CustomButton
            type="submit"
            title="Submit"
            className="bg-blue-500 px-12 py-1  rounded-md text-white"
          />
        </div>
      </div>
    </form>
  );
};

export default EditProfileForm;
