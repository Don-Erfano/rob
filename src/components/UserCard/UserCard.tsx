import { FC, useState } from "react";
import { UserCardProps } from "@/components/UserCard/interface";
import { Icon } from "@iconify/react";

const UserCard: FC<UserCardProps> = ({
  user_name,
  camera_name,
  image_data,
  score,
  id,
  last_seen,
  onEdit,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user_name);

  const handleEditClick = () => {
    setIsEditing(true);
    onEdit?.();
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div
      className={`transition-transform duration-500 transform ${
        isEditing ? "rotate-y-180" : "rotate-y-0"
      } w-80 h-auto bg-white rounded-3xl shadow-md p-6 flex flex-col items-center space-y-4`}
    >
      {!isEditing ? (
        <>
          <div className=" justify-start rounded-xl overflow-hidden">
            <img
              src={image_data}
              alt="User"
              width={150}
              height={100}
              className="object-cover"
            />
          </div>
          <div className="text-left w-full space-y-2">
            <div className="flex items-center justify-start space-x-2 ">
              <p className="text-gray-500 text-lg font-bold">User name:</p>
              <p className="text-md text-black font-normal">{name}</p>
            </div>
            <div className="flex items-center justify-start space-x-2 ">
              <p className="text-gray-500 text-lg font-bold">User Id:</p>
              <p className="text-md text-black font-normal">{id}</p>
            </div>
            <div className="flex items-center justify-start space-x-2 ">
              <p className="text-gray-500 text-lg font-bold">Camera name:</p>
              <p className="text-md text-black font-normal">{camera_name}</p>
            </div>
            <div className="flex items-center justify-start space-x-2 ">
              <p className="text-gray-500 text-lg font-bold">Score:</p>
              <p className="text-md text-black font-normal">{score}</p>
            </div>
            <div className="flex items-center justify-start space-x-2 ">
              <p className="text-gray-500 text-lg font-bold">Last Seen:</p>
              <p className="text-md text-black font-normal">{last_seen}</p>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              className="border border-black rounded-xl px-4 py-2 flex items-center gap-1 hover:bg-gray-100 cursor-pointer"
              onClick={handleEditClick}
            >
              <Icon icon="mdi:pencil-outline" className="text-black size-5" />
              <p className="text-sm text-black "> Edit</p>
            </button>
            <button
              className="border border-black rounded-xl px-4 py-2 flex items-center gap-1 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                console.log("Delete clicked");
                onDelete?.();
              }}
            >
              <Icon
                icon="mdi:trash-can-outline"
                className="text-black size-5"
              />
              <p className="text-sm text-black"> Delete</p>
            </button>
          </div>
        </>
      ) : (
        <div className="w-full flex flex-col gap-4 rotate-y-180">
          <label className="text-black text-md ">Edit user name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default UserCard;
