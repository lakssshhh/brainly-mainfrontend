import { type ReactElement } from "react";

export function SidebarItem({ text, icon, onClick }: {
    text: string;
    icon: ReactElement;
    onClick: () => void;
}) {
    return (
        <div 
            className="flex text-gray-700 dark:text-gray-300 py-2 items-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 rounded max-w-48 pl-4 transition-all duration-150" 
            onClick={onClick}
        >
            <div className="pr-2">
                {icon}
            </div>
            <div className="p-2">
                {text}
            </div>
        </div>
    );
}