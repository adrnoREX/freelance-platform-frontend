import Image from "next/image";
import HomeComponent from "./Components/HomeComponent";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <div className="">
      <HomeComponent/>
      <Toaster position="top-center" />
    </div>
  );
}
