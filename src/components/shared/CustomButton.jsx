import { Link } from "react-router-dom";

const CustomButton = ({
  type = "button",
  title,
  clickHandler,
  route,
  className = "",
  disable = false,
}) => {
  return (
    <button  type={type} className={className} onClick={clickHandler ?? null} disabled={disable}>
      {route ? <Link to={route}>{title}</Link> : <span>{title}</span>}
    </button>
  );
};

export default CustomButton;
