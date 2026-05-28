import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import axios from "axios";
import { Card } from "../components/card";
import { BACKEND_URL } from "../config";

interface ContentItem {
    type: "twitter" | "youtube";
    link: string;
    title: string;
}

export function SharedBrain() {
    const { hash } = useParams<{ hash: string }>(); 
    const [contents, setContents] = useState<ContentItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchSharedContent() {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/brain/${hash}`);
                console.log("BACKEND RESPONSE:", response.data);
          
                setContents(response.data.contents || []);
            } catch (e) {
                console.error("Fetch error:", e);
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        if (hash) {
            fetchSharedContent();
        }
    }, [hash]);

    if (loading) return <div className="p-8 text-center text-gray-500">Loading brain...</div>;
    if (error) return <div className="p-8 text-center text-red-500">This brain link is invalid or no longer shared.</div>;

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-8 transition-colors duration-200">
            <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">
                Shared Brain
            </h1>
            
            <div className="flex gap-4 flex-wrap">
              
                {contents?.map(({ type, link, title }) => (
                    <Card key={link} type={type} link={link} title={title} />
                ))}
                
                {(!contents || contents.length === 0) && (
                    <p className="text-gray-500">This brain is currently empty.</p>
                )}
            </div>
        </div>
    );
}