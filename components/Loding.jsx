import { AiOutlineLoading } from "react-icons/ai";
export default function Loading() {
  return (
    <div className="flex justify-center align-middle min-w-[100vw] min-h-[100vh]">
      <AiOutlineLoading size={60} className="animate-spin h-fit" />
    </div>
  );
}
