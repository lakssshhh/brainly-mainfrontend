export function Input({placeholder,ref}:{ref?:any;placeholder:string}){
    return<div>
        <input placeholder={placeholder} type={"text"}className="px-4 py-2 border border-gray-300 rounded m-2" ref={ref}>
        </input>
    </div>
}