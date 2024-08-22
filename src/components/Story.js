import { giveLike } from "@/services/interactions";
import { useState } from "react";
import Avatar from "./Avatar";

export default function Story({ story }) {
  const [likes, setLikes] = useState(story.Likes);
  const [isLiked, setIsLiked] = useState(false);

  const handleClickLike = () => {
    giveLike(story.IdHistoria)
      .then((response) => {
        if (response.error) {
          alert(response.error);
          return;
        }
        setLikes(likes + 1);
        setIsLiked(!isLiked);
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="block md:w-3/5 rounded-lg shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] bg-white shadow-secondary-1 dark:bg-surface-dark text-surface text-black mx-5">
      <div className="relative overflow-hidden bg-cover bg-no-repeat">
        <img
          className="rounded-t-lg"
          src="/pet-story.avif"
          alt=""
        />
      </div>
      <div className="p-6 flex flex-col gap-2">
        <Avatar nombre={story.NombreCompleto} className="hover:scale-105 cursor-pointer" />
        <p className="mb-4 text-base">{story.Descripcion}</p>
        <div className="flex justify-between items-end cursor-pointer">
          <p className="text-xs text-surface/75 text-black">{story.FechaPublicacion}</p>
          <div className="flex items-end">
            <svg
              className={`w-8 h-6 transition-transform duration-300 hover:scale-150 ${isLiked ? 'fill-[#ed4956] stroke-[#ed4956]' : 'fill-none stroke-[#ed4956]'
                }`}
              onClick={handleClickLike}
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              stroke-width="50"
            >
              <path d="M180-475q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29Zm180-160q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29Zm240 0q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29Zm180 160q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM266-75q-45 0-75.5-34.5T160-191q0-52 35.5-91t70.5-77q29-31 50-67.5t50-68.5q22-26 51-43t63-17q34 0 63 16t51 42q28 32 49.5 69t50.5 69q35 38 70.5 77t35.5 91q0 47-30.5 81.5T694-75q-54 0-107-9t-107-9q-54 0-107 9t-107 9Z" />
            </svg>
            <p className="text-xs text-surface/75">{likes} paws</p>
          </div>
        </div>
      </div>
    </div>
  );
}
