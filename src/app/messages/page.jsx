// "use client"
// import React from 'react'
// import Messages from '../Components/Messages'

// function page() {
//   return (
//     <>
//     <Messages />
//     </>
//   )
// }

// export default page

"use client";
import { useParams } from "next/navigation";
import Message from "../Components/Message";
 // adjust import path if needed

const MessagePage = () => {
  const params = useParams();
  const { id } = useParams();
  console.log("Params:", params); // ✅ CHECK WHAT THIS LOGS

  return (
    <div>
      <Message />
    </div>
  );
};

export default MessagePage;