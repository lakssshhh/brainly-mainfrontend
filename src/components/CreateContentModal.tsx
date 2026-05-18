import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import Button from "./button";
import { Input } from "./Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useContent } from "../hooks/useContent";   
const ContentType = {
    Youtube: "youtube",
    Twitter: "twitter",
} as const;
type ContentTypeType = (typeof ContentType)[keyof typeof ContentType];

type CreateContentModalProps = {
  open: boolean;
  onClose: () => void;
};

export function CreateContentModal({ open, onClose }: CreateContentModalProps) {
    const titleRef= useRef<HTMLInputElement>(null);
    const linkRef= useRef<HTMLInputElement>(null);
    const [type,setType]=useState<ContentTypeType>(ContentType.Youtube);
    
    const {refresh} = useContent();
    async function addContent(){
        if (!titleRef.current || !linkRef.current) {
            return;
        }

        const title = titleRef.current.value;
        const link = linkRef.current.value;

        await axios.post(`${BACKEND_URL}/api/v1/content`,{
            link,
            type,
            title


        },{
            headers:{
                "Authorization":localStorage.getItem("token")
            }
        })
        onClose();
        refresh();

    }
    return (
  <div>
    {open && (
      
      <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center">
        
        <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60"></div>
        
        <div className="flex flex-col justify-center relative z-10">
          <div className="bg-white p-4 rounded opacity-100">
            <div className="flex justify-end">
              <div onClick={onClose} className="cursor-pointer">
                <CrossIcon />
              </div>
            </div>
            
            <div>
              <Input ref={titleRef} placeholder={"Title"} />
              <Input ref={linkRef} placeholder={"Link"} />
            </div>

            <div>
              <h1> Type</h1>
              <div className="flex gap-1 p-4">
                <div className="flex-1">
                  <Button
                    text="Youtube"
                    variant={type === ContentType.Youtube ? "primary" : "secondary"}
                    onClick={() => setType(ContentType.Youtube)}
                  />
                </div>
                <div className="flex-1">
                  <Button
                    text="Twitter"
                    variant={type === ContentType.Twitter ? "primary" : "secondary"}
                    onClick={() => setType(ContentType.Twitter)}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <Button onClick={addContent} variant="secondary" text="Submit" />
            </div>
          </div>
        </div>

      </div>
    )}
  </div>
);
}