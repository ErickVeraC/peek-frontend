import PropTypes from "prop-types";
import { IoIosAddCircleOutline } from "react-icons/io";

const SquareButton = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`bg-white p-2 text-slate-900 rounded-3xl shadow-md size-28 md:size-44  flex flex-col gap-2 items-center text-sm md:text-lg  justify-center ${className}`}
      {...props}
    >
      <IoIosAddCircleOutline className="text-4xl" />
      {children}
    </button>
  );
};

SquareButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default SquareButton;
