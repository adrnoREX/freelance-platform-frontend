import Image from "next/image";
import HomeComponent from "./Components/HomeComponent";
// import Navbar from "./Components/navbar";
import { Toaster } from "react-hot-toast";
// import AuthModals from "./Components/AuthModals";

export default function Home() {
  return (
    <div className="">
      {/* <Navbar/> */}
      <HomeComponent/>
      <Toaster position="top-center" />
      {/* <AuthModals/> */}
      
    </div>
  );
}
