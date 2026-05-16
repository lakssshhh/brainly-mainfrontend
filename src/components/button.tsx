import type { ReactElement } from "react";

interface ButtonProps{
    variant: "primary"|"secondary",
    text:string;
    startIcon?:ReactElement;
    onClick?:()=>void;
    fullWidth?:boolean;
    loading?:boolean;
    
}

const variantClasses={
    "primary":"bg-[#DDE4FE] text-[#5B63D3] ",
    "secondary":"bg-[#4242D9]  text-white "
};
const defaultStyles="px-4 py-2 rounded-md font-light flex items-center cursor-pointer ";

export default function({variant,text,startIcon,onClick,fullWidth,loading}:ButtonProps){

    return<button onClick={onClick} className= {variantClasses[variant]+ " "+ defaultStyles + (fullWidth ? " w-full flex justify-center items-center" : "")+ (loading ? " opacity-70 cursor-" : " ")} disabled={loading}>
         {startIcon}
         {text} 
    </button>

}