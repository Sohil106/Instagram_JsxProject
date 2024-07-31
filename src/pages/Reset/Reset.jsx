import "../login/login.css";
import CustomInput from "../../components/shared/CustomInput";
import CustomButton from "../../components/shared/CustomButton";
import { useForm } from "react-hook-form";
import { IoLockClosedOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { reset, useSelectorUserState } from "../../redux/slices/AuthSlice";

const Reset = ({}) => {
  const disPatch = useDispatch();
  const { isError,ErrorMessage,SuccessMessage,success } = useSelectorUserState();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors,isValid},
  } = useForm({mode:'onChange'});

  const onSubmit = (data) => {
    const FormData = {
      value: data.email,
      link: "https://da73-14-99-103-154.ngrok-free.app/resetlink"
    }
    const res = disPatch(reset(FormData));
  };
  return (
    <div className="flex justify-center am:mt-12">
      <form className="container-fluid" onSubmit={handleSubmit(onSubmit)}>
        <div className="login_content sm:border-2  mx-auto mt-5 sm:px-12">
          <div className="flex justify-center pt-7 pb-4 ">
            <div className="rounded-full border-2 border-black">
              <IoLockClosedOutline className="text-9xl p-3"/>
            </div>
          </div>
          <div className="font-semibold text-lg text-center">Trouble logging in?</div>
          <div className="py-3 text-gray-400 ">
            Enter your email,phone, or username and We'll send you a link to get back into your account
          </div>
          <div className="text-center">
            <CustomInput
              label="Email,phone number or username"
              placeholder="Email,phone number or username"
              // name="email"
              type="text"
              control={control}
              disabled={false}
              className=""
              {...register("email", { required: true, pattern: /^(?:[a-z\d\-\.]+@([a-z\d-]+\.)+[a-z\d-]{2,4}|[6-9]\d{9}|[a-z][a-z0-9_]{4,19})$/})}
            />
            {errors.email && (
              <p className="text-left text-rose-500" role="alert">
                {errors.email.type === "pattern"
                  ? "Invalid Mobile Number,userName or email"
                  : ""}
              </p>
            )}
          {isError && (<div className="alert text-rose-500">{ErrorMessage}</div>)}
          {success && (<div className="alert text-green-600">{SuccessMessage}</div>)}

          </div>
          <div className="flex justify-center mt-2">
            <CustomButton
              type="submit"
              title="Send login link"
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
export default Reset;
