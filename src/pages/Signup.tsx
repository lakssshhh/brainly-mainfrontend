import { useRef } from "react";
import Button from "../components/button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup(){
    const usernameRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();
    
    async function Signup(){
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            data: {
                username,
                password
            }
        });
        navigate("/signin");
    }

    return (
        <div className="h-screen w-screen bg-gray-200 dark:bg-gray-900 flex justify-center items-center relative transition-colors duration-200">
            <button 
                onClick={() => document.documentElement.classList.toggle('dark')}
                className="absolute top-4 right-4 p-2 rounded-lg bg-gray-300 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-medium text-sm transition-all shadow-md active:scale-95"
            >
                <span className="block dark:hidden">🌙 Dark Mode</span>
                <span className="hidden dark:block">☀️ Light Mode</span>
            </button>

            <div className="bg-white dark:bg-gray-800 rounded-xl min-w-72 p-8 shadow-xl transition-colors duration-200">
                <h2 className="text-xl font-bold text-center mb-6 text-gray-800 dark:text-white">Create Account</h2>
                <div className="space-y-4">
                    <Input ref={usernameRef} placeholder="Username"/>
                    <Input ref={passwordRef} placeholder="Password"/>
                </div>
                <div className="flex justify-center pt-6">
                    <Button onClick={Signup} loading={false} variant="secondary" text="Signup" fullWidth={true}/>
                </div>
            </div>
        </div>
    );
}

