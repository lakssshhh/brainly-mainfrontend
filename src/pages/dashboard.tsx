import { useEffect, useState } from "react";
import Button from "../components/button";
import { Card } from "../components/card";
import { CreateContentModal } from "../components/CreateContentModal";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Sidebar } from "../components/sidebar";
import { useContent } from "../hooks/useContent";
import { BACKEND_URL } from "../config";
import axios from "axios";

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const { contents, refresh } = useContent();

  useEffect(() => {
    refresh();
  }, [modalOpen]);

  const filteredContents = contents.filter((content) => {
    if (activeCategory === "all") {
      return true;
    }
    return content.type === activeCategory;
  });

  return (
    <div>
      <Sidebar onSelectCategory={(category) => setActiveCategory(category)} />

      <div className="p-4 ml-72 min-h-screen bg-gray-100 border-slate-200">
        <CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)} />

        <div className="flex justify-end gap-4">
          <Button
            onClick={() => setModalOpen(true)}
            variant="secondary"
            text="Add Content"
            startIcon={<PlusIcon />}
          />
          <Button
            onClick={async () => {
              const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
                share: true
              }, {
                headers: {
                  "Authorization": localStorage.getItem("token")
                }
              });
              const shareUrl = `https://brainly-mainfrontend.vercel.app/share/${response.data.hash}`;
              alert(shareUrl);
            }}
            variant="primary"
            text="Share brain"
            startIcon={<ShareIcon />}
          />
        </div>

        <div className="flex gap-4 flex-wrap mt-8">
          {filteredContents.map(({ type, link, title }) => (
            <Card key={link} type={type} link={link} title={title} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;