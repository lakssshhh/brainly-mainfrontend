import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Assuming you use react-router
import axios from "axios";
import { Card } from "../components/card";
import { BACKEND_URL } from "../config";

export function SharedBrain() {
    // Grab the unique hash from the URL
    const { hash } = useParams(); 
    const [contents, setContents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        // Fetch the public brain data using the hash
        async function fetchSharedContent() {
            try {
                // Notice: No Authorization header needed here, this is a public route!
                const response = await axios.get(`${BACKEND_URL}/api/v1/brain/${hash}`);
                setContents(response.data.contents);
            } catch (e) {
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        fetchSharedContent();
    }, [hash]);

    if (loading) return <div className="p-8 text-center text-gray-500">Loading brain...</div>;
    if (error) return <div className="p-8 text-center text-red-500">This brain link is invalid or no longer shared.</div>;

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-8 transition-colors duration-200">
            <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">
                Shared Brain
            </h1>
            
            <div className="flex gap-4 flex-wrap">
                {contents.map(({ type, link, title }) => (
                    // Reusing your existing Card component!
                    <Card key={link} type={type} link={link} title={title} />
                ))}
                
                {contents.length === 0 && (
                    <p className="text-gray-500">This brain is currently empty.</p>
                )}
            </div>
        </div>
    );
}