import { IButtonProps } from "types";

const CustomButton = ({ children, onclick, className }: IButtonProps) => {
  const defaultClassName =
    "w-max border border-borderColor hover:text-[#464646] pr-4 pl-4 p-1 transition duration-400";
  const combinedClassName = className
    ? `${defaultClassName} ${className}`
    : defaultClassName;
  return (
    <button
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
      }}
      onClick={onclick}
      className={combinedClassName}
    >
      {children}
    </button>
  );
};

export default CustomButton;
