import Button from "../components/button";
import { Input } from "../components/Input";
import { useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function Signup(){
    const usernameRef=useRef<HTMLInputElement | null>(null);
    const passwordRef=useRef<HTMLInputElement | null>(null);
    const navigate=useNavigate();
    
    async function Signup(){
        const username=usernameRef.current?.value;
        const password=passwordRef.current?.value;
        await axios.post(`${BACKEND_URL}/api/v1/signup`,{
            data:{
                username,
                password
            }
        })
        navigate("/signin")
        alert("User signed up successfully")
        

    }
    
    return <div className="h-screen w-screen bg-gray-200  flex
    justify-center items-center">
        <div className="bg-white rounded-xl min-w-48 p-8">
            <Input ref={usernameRef} placeholder="Username"/>
            <Input ref={passwordRef} placeholder="Password"/>
            <div className="flex justify-center pt-4">
            <Button onClick={Signup} loading={false} variant="secondary" text="Signup" fullWidth={true}/>
            </div>

    </div>
    </div>
}
