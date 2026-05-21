import { SidebarItem } from "./sidebarItem";
import { Twitter } from "../icons/Twitter";
import {  YoutubeIcon } from "../icons/YoutubeIcon";
import { Logo } from "../icons/Logo";
interface SidebarProps {
    onSelectCategory: (category: string) => void;
}

export function Sidebar({onSelectCategory}:SidebarProps){
    return <div className="h-screen bg-white border-slate-200 w-72 fixed left-0 top-0 pl-6">
        <div className="pt-4 text-2xl font-bold flex items-center">
            <div className="pr-2 text-blue-800">
            <Logo/>
            </div>
            Brainly
        </div>
        <div className="pt-8 pl-4 ">
            <SidebarItem onClick={() => onSelectCategory("twitter")} text="Twitter" icon={<Twitter/>}/>
            <SidebarItem onClick={() => onSelectCategory("youtube")} text="YouTube" icon={<YoutubeIcon/>}/>

        </div>
    </div>
}
