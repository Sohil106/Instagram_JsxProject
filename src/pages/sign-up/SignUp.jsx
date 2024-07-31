import "../login/login.css";
import playStore from "../../assets/images/play.png";
import appStore from "../../assets/images/app.png";
import CustomButton from "../../components/shared/CustomButton";
import { AllRoutes } from "../../constants/Routes";
import LoginFooter from "../../components/shared/LoginFooter";
import SignUpStep1 from "./SignUpStep1";
import SignUpStep2 from "./SignUpStep2";
import { useState } from "react";


 
const SignUp = () => {

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    phoneNo:'',
    name:'',
    userName:'',
    password:'',
  });

  const nextStep = (data) => {
    setFormData(data);
    setStep(step + 1);
    console.log(data)
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <SignUpStep1 nextStep={nextStep} formData={formData} />;
      case 2:
        return <SignUpStep2 prevStep={prevStep} formData={formData}/>;
      default:
        return null;
    }
  };
  
  return (
    <>
    <div className="flex justify-center sm:mt-12">
      <div className="container-fluid" >
        {renderStep()}
        <div className="singup_link_content sm:border-2 mx-auto text-center mt-3 py-7">
          <div>
            Have an account?{" "}
            <CustomButton
              type="button"
              title="Log in"
              className="text-sky-500 font-semibold"
              route={AllRoutes.Login}
            />
          </div>
        </div>
        <div className="text-center mt-2 pb-5">
          <div className="py-3">Get the app</div>
          <div className="flex justify-center gap-2">
            <img src={playStore} width="150px" draggable="false"/>
            <img src={appStore} width="150px" draggable="false"/>
          </div>
        </div>
      </div>
    </div>
    <div className="mb-12 "></div>
      <div className="text-center">
        <LoginFooter />
      </div>
    </>
    
  );
};

export default SignUp;
