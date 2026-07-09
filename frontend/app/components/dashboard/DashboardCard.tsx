
import { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  bg: string;
}

export default function DashboardCard({title,value,icon: Icon,color,bg,}: Props) {


  return (
    <div
      className="
      bg-white
      rounded-2xl
      border
      p-6
   
    "
    >
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center ${bg}`}
      >
        <Icon className={`w-5 h-5 ${color}`} />
      </div>

      <h2 className="text-3xl text-black font-bold mt-6">
        {value}
      </h2>

      <p className="text-gray-500 text-sm mt-1">
        {title}
      </p>
    </div>
  );
}