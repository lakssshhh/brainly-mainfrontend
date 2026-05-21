import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export interface ContentItem {
    type: "twitter" | "youtube";
    link: string;
    title: string;
}

export function useContent() {
    const [contents, setContent] = useState<ContentItem[]>([]);

    function refresh() {
        axios.get(`${BACKEND_URL}/api/v1/content`, {
            headers: {
                "Authorization": localStorage.getItem("token") || ""
            }
        })
        .then((response) => {
            setContent(response.data.content);
        })
        .catch((error) => {
            console.error("Failed to fetch content:", error);
        });
    }

    useEffect(() => {
        refresh();
        const interval = setInterval(() => {
            refresh();
        }, 10 * 1000);

        return () => clearInterval(interval);
    }, []);

    return { contents, refresh };
}