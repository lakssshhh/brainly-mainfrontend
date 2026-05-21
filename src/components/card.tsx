import { useEffect } from "react";
import { ShareIcon } from "../icons/ShareIcon";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}

export function Card({ title, link, type }: CardProps) {
  useEffect(() => {
    if (type === "twitter" && !document.getElementById("twitter-script")) {
      const script = document.createElement("script");
      script.id = "twitter-script";
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [type]);

  const safeTitle = typeof title === "string" ? title : "Unknown Title";
  const safeLink = typeof link === "string" ? link : "";

  return (
    <div>
      <div className="p-4 bg-white rounded-md border-gray-200 max-w-72 border min-h-48 min-w-72">
        <div className="flex justify-between">
          <div className="flex items-center text-md">
            <div className="text-gray-500 pr-2">
              {safeLink ? (
                <a href={safeLink} target="_blank" rel="noopener noreferrer">
                  <ShareIcon />
                </a>
              ) : (
                <ShareIcon />
              )}
            </div>
            {safeTitle}
          </div>

          <div className="flex item">
            <div className="pr-2 text-gray-500">
              <ShareIcon />
            </div>
            <div className="text-gray-500">
              <ShareIcon />
            </div>
          </div>
        </div>

        <div className="pt-8">
          {type === "youtube" && safeLink && (
            <iframe
              className="w-full"
              width="560"
              height="315"
              src={safeLink.replace("watch", "embed").replace("?v=", "/")}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}
          
          {type === "twitter" && safeLink && (
            <div>
              <blockquote className="twitter-tweet">
                <a href={safeLink.replace("x.com", "twitter.com")}></a> 
              </blockquote>
            </div>
          )}

          {!safeLink && (
             <div className="text-gray-400 text-sm italic">Invalid or missing link data</div>
          )}
        </div>
      </div>
    </div>
  );
}