// Adjust import path

import { Toaster } from "react-hot-toast";
import AddGig from "../components/AddGig";

export default function Page() {
  return(
  <>
      <AddGig />
      <Toaster position="top-center" />
    </>
  )
}
