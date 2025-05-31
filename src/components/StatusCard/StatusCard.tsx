import { FC } from "react";
import { StatusCardProps } from "@/components/StatusCard/interface";

const StatusCard: FC<StatusCardProps> = ({
  card_title,
  total,
  start_adornment,
  onClick,
}) => {
  return (
    <div
      className="bg-white w-100 h-50 flex items-center justify-center px-20 rounded-2xl cursor-pointer hover:bg-gray-100/90"
      onClick={onClick}
    >
      <div className="flex space-x-10 items-center justify-center">
        {start_adornment}
        <div className=" items-center justify-center text-slate-950 ">
          <h1 className="text-[48px] font-bold">{total}</h1>
          <p className="whitespace-nowrap">{card_title}</p>
        </div>
      </div>
    </div>
  );
};
export default StatusCard;
