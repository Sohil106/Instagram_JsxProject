import "../login/login.css";
import CustomButton from "../../components/shared/CustomButton";
import { useForm } from "react-hook-form";
import birthdayLogo from "../../assets/images/birthdayLogo.png";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login, signup, useSelectorUserState } from "../../redux/slices/AuthSlice";
import { useNavigate } from "react-router-dom";
import { AllRoutes } from "../../constants/Routes";


const SignUpStep2 = ({ prevStep, formData }) => {
  const navigate = useNavigate();
  const disPatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm();

  const { isError,ErrorMessage  } = useSelectorUserState();

  const onSubmit = async (data) => {
    const { year, month, date } = data;
    const formattedData = {
      dateOfBirth: `${year}-${month}-${date}`
    };
    const Data = {...formData,...formattedData};
    const registerData = {
      name: Data.name ,
      userName: Data.userName,
      dateOfBirth: Data.dateOfBirth,
      email:Data.email,
      mobile:Data.phoneNo,
      password:Data.password
    }
    const res = await disPatch(signup(registerData));

    if(res.payload.isSuccess){
      navigate(AllRoutes.Login);
    }
  
  };
  
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [date, setDate] = useState(new Date().getDate().toString().padStart(2,'0'));
  const [year, setYear] = useState(new Date().getFullYear());

  const getDaysInMonth = (month, year) => {
    const isLeapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);

    const daysInMonth = [
      31,
      isLeapYear ? 29 : 28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];
    return Array.from(Array(daysInMonth[month - 1]), (_, i) => i + 1);
  };

  const days = getDaysInMonth(month, year);

  const handleMonthChange = (event) => {
    setMonth(parseInt(event.target.value));
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(parseInt(event.target.value));
  };

  return (
    <form
      className="login_content sm:border-2  mx-auto sm:px-12"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex justify-center pt-7 pb-4 ">
        <img src={birthdayLogo} alt="" width={250} className="mx-auto" draggable="false" />
      </div>
      <div className="text-black font-semibold text-lg mb-3 text-center">
        Add Your Birthday
      </div>
      <div className="text-center mb-4 ">
        <p>This won't be a part of your public profile.</p>
        <p className="text-sky-500 font-semibold">
          Why do I need to provide my birthday?
        </p>
      </div>
      <div className="flex justify-center gap-2 mt-2 mb-5">
        <div className="rounded border-2">
          <select 
          className="p-2 outline-0"
            style={{ minWidth: 90 }}
            value={month}
            {...register("month")}
            onChange={handleMonthChange}
          >
            <option className="" value="01">
              January
            </option>
            <option className="" value="02">
              February
            </option>
            <option className="" value="03">
              March
            </option>
            <option className="" value="04">
              April
            </option>
            <option className="" value="05">
              May
            </option>
            <option className="" value="06">
              June
            </option>
            <option className="" value="07">
              July
            </option>
            <option className="" value="08">
              August
            </option>
            <option className="" value="09">
              September
            </option>
            <option className="" value="10">
              October
            </option>
            <option className="" value="11">
              November
            </option>
            <option className="" value="12">
              December
            </option>
          </select>
        </div>
        <div className="rounded border-2">
          <select
          className="p-2 outline-0 overflow-y-scroll no-scrollbar"
            style={{ minWidth: 60 }}
            value={date}
            {...register("date")}
            onChange={handleDateChange}
          >
            {days.map((day) => {
              let day1 = day.toString();
              if(day > 0 && day < 10 ){
                day1 = "0" + day
              }
              return (
              <option key={day1} value={day1}>
                {day1}
              </option>
              )
})}
          </select>
        </div>
        <div className="rounded border-2">
          <select
          className="p-2 outline-0 overflow-y-scroll no-scrollbar"
            style={{ minWidth: 60 }}
            value={year}
            {...register("year")}
            onChange={handleYearChange}
          >
            {Array.from(
              Array(101),
              (_, i) => new Date().getFullYear() - 100 + i
            ).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* <div className="text-center">
          <input
            type="month"
            defaultValue=""
            {...register("birthDate", { required: true })}
            aria-invalid={errors.birthDate ? "true" : "false"}
          />
          {errors.birthDate?.type === "required" && (
            <p className="text-rose-500" role="alert">
              Date is required
            </p>
          )}
        </div> */}
      </div>

      {isError && (<div className="text-center text-rose-500 mb-4">{ErrorMessage}</div>)}
      <div className="pb-4 text-gray-600">
        You need to enter the date you were born
      </div>
      <div className="pb-4 text-gray-600">
        Use your own birthday,even if this account is for a business,a pet, or
        something
      </div>
      <CustomButton
        type="submit"
        title="Next"
        className="custom_signin_btn mb-4"
        route=""
        disable={!isValid}
      />
      <CustomButton
        type="button"
        title="Go back"
        className="text-sky-500 font-semibold mb-7 text-center w-full"
        route=""
        clickHandler={prevStep}
      />
    </form>
  );
};

export default SignUpStep2;
