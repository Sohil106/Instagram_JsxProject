import "../login/login.css";
import CustomInput from "../../components/shared/CustomInput";
import CustomButton from "../../components/shared/CustomButton";
import { useForm } from "react-hook-form";
import { IoLockClosedOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import {
  resetLinkData,
  useSelectorUserState,
} from "../../redux/slices/AuthSlice";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AllRoutes } from "../../constants/Routes";

const ResetLink = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");
  const disPatch = useDispatch();
  const { isError, ErrorMessage, SuccessMessage, success } =
    useSelectorUserState();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm <
  FormInputs >
  {
    mode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: "",
      passwordsMatch: true,
    },
  };

  const [passwordLength1, setPasswordLength1] = useState(0);
  const [showPassword1, setShowPassword1] = useState(false);
  const [passwordLength2, setPasswordLength2] = useState(0);
  const [showPassword2, setShowPassword2] = useState(false);

  const handlePasswordChange1 = (event) => {
    setPasswordLength1(event.target.value.length);
  };

  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };

  const handlePasswordChange2 = (event) => {
    setPasswordLength2(event.target.value.length);
  };

  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  // const watchPassword = watch("password");

  // useEffect(() => {
  //   const confirmPasswordValue = watch("confirmPassword");
  //   const match = watchPassword === confirmPasswordValue;
  //   setValue("passwordsMatch", match);
  // }, [watchPassword, setValue]);

  const onSubmit = (data) => {
    const FormData = {
      token: token,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };
    const res = disPatch(resetLinkData(FormData));

    if (success) {
      navigate(AllRoutes.Login);
    }
  };
  return (
    <div className="flex justify-center am:mt-12">
      <form className="container-fluid" onSubmit={handleSubmit(onSubmit)}>
        <div className="login_content sm:border-2  mx-auto mt-5 sm:px-12">
          <div className="flex justify-center pt-7 pb-4 ">
            <div className="rounded-full border-2 border-black">
              <IoLockClosedOutline className="text-9xl p-3" />
            </div>
          </div>
          <div className="font-semibold text-lg text-center">
            Trouble logging in?
          </div>
          <div className="py-3 text-gray-400 text-center">
            Your password must be at least 6 characters and should include a
            combination of numbers,letters and special characters.
          </div>
          <div className="text-center mt-2 relative">
            <CustomInput
              label="Password"
              placeholder="ex: John@123"
              type={showPassword1 ? "text" : "password"}
              control={control}
              onKeyUp={handlePasswordChange1}
              className=""
              {...register("password", {
                required: true,
                pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[a-z])(?=.*\W).{7,15}$/,
              })}
            />
            {errors.password && (
              <p className="text-left text-rose-500" role="alert">
                Invalid Password
              </p>
            )}
            {passwordLength1 > 0 && (
              <button
                type="button"
                onClick={togglePasswordVisibility1}
                className="password-toggle-btn absolute right-3 top-4"
              >
                {showPassword1 ? "Hide" : "Show"}
              </button>
            )}
          </div>
          <div className="text-center mt-2 relative">
            <CustomInput
              label="Confirm Password"
              placeholder="ex: John@123"
              type={showPassword2 ? "text" : "password"}
              control={control}
              onKeyUp={handlePasswordChange2}
              className=""
              {...register("confirmPassword", {
                required: true,
                validate: (value) => value === watch("password"),
                pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[a-z])(?=.*\W).{7,15}$/,
              })}
            />
            {errors.confirmPassword && (
              <p className="text-left text-rose-500" role="alert">
                {errors.confirmPassword.type === "validate"
                  ? "Passwords do not match"
                  : "Invalid Password"}
              </p>
            )}
            {passwordLength2 > 0 && (
              <button
                type="button"
                onClick={togglePasswordVisibility2}
                className="password-toggle-btn absolute right-3 top-4"
              >
                {showPassword2 ? "Hide" : "Show"}
              </button>
            )}
          </div>
          <div className="flex justify-center mt-2">
            <CustomButton
              type="submit"
              title="Reset Password"
              className="custom_signin_btn"
              route=""
              disable={!isValid}
            />
          </div>
          <div className="text-slate-900 mt-2 mb-7 text-center">
            can't reset your password?
          </div>

          <div className="login__ordiv">
            <div className="login__dividor"></div>
            <div className="login__or">OR</div>
            <div className="login__dividor"></div>
          </div>
          <CustomButton
            type="submit"
            title="Create new account"
            className="font-semibold mt-3 mb-12 pb-12 text-center w-full"
            route="/signup"
          />
        </div>
        <div className="singup_link_content sm:border-x-2 sm:border-b-2 border-t-0 mx-auto text-center py-3">
          <div>
            <CustomButton
              type="button"
              title="Back to login"
              className="font-semibold"
              route="/"
            />
            {/* <span className="text-sky-500 font-semibold">Sign up</span> */}
          </div>
        </div>
      </form>
      <div className="mb-12"></div>
    </div>
  );
};
export default ResetLink;
