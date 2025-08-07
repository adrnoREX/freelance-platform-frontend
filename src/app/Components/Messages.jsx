// "use client";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import moment from "moment";
// import newRequest from "../client/components/newRequest";
// import Navbar from "../client/components/Navbar";
// import Footer from "./Footer";

// const Messages = () => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const queryClient = useQueryClient();

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("currentUser"));
//     setCurrentUser(user);
//   }, []);

//   const { isLoading, error, data } = useQuery({
//     queryKey: ["conversations"],
//     queryFn: () => newRequest.get(`/conversations`).then((res) => res.data),
//     enabled: !!currentUser,
//   });

//   const mutation = useMutation({
//     mutationFn: (id) => newRequest.put(`/conversations/${id}`),
//     onSuccess: () => {
//       queryClient.invalidateQueries(["conversations"]);
//     },
//   });

//   const handleRead = (id) => {
//     mutation.mutate(id);
//   };

//   if (!currentUser) return null;

//   const conversations = Array.isArray(data) ? data : [];

//   return (
//     <>
//       <Navbar />
//       <div className="flex justify-center">
//         {isLoading ? (
//           "loading"
//         ) : error ? (
//           "error"
//         ) : (
//           <div className="w-full max-w-[1400px] py-12 px-4">
//             <div className="flex justify-between items-center mb-6">
//               <h1 className="text-2xl font-semibold">Messages</h1>
//             </div>

//             <div className="overflow-x-auto">
//               <table className="w-full border-collapse">
//                 <thead>
//                   <tr className="text-left border-b">
//                     <th className="py-3">
//                       {/* {currentUser.role === "freelancer"
//                         ? "client"
//                         : "freelancer"} */}
//                     </th>
//                     <th className="py-3">Last Message</th>
//                     <th className="py-3">Date</th>
//                     <th className="py-3">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {conversations.length === 0 ? (
//                     <tr>
//                       <td
//                         colSpan="4"
//                         className="text-center py-12 text-gray-500"
//                       >
//                         <div className="flex flex-col items-center gap-4">
//                           <img
//                             src="/message.png"
//                             alt="No Messages"
//                             className="w-20 h-20 opacity-60"
//                           />
//                           <p className="text-lg font-medium">No messages yet</p>
//                           <Link
//                             href="messages/new"
//                             className="mt-2 inline-block bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
//                           >
//                             Start Conversation
//                           </Link>
//                         </div>
//                       </td>
//                     </tr>
//                   ) : (
//                     conversations.map((c) => {
//                       const isUnread =
//                         (currentUser.role && !c.readBySeller) ||
//                         (!currentUser.role && !c.readByBuyer);

//                       return (
//                         <tr
//                           key={c._id}
//                           className={`h-[100px] border-b ${
//                             isUnread ? "bg-green-100/20" : ""
//                           }`}
//                         >
//                           <td className="px-4 font-medium">
//                             {currentUser.role
//                               ? c.buyerId.displayName
//                               : c.sellerId.displayName}
//                           </td>
//                           <td className="px-4 text-gray-600">
//                             <Link
//                               href={`/messages/${c._id}?to=${currentUser.role ? c.buyerId._id : c.sellerId._id}`}
//                               className="text-blue-600 hover:underline"
//                             >
//                               {c?.lastMessage?.substring(0, 100) ||
//                                 "No message"}
//                               ...
//                             </Link>
//                           </td>
//                           <td className="px-4 text-gray-600">
//                             {moment(c.updatedAt).fromNow()}
//                           </td>
//                           <td className="px-4">
//                             {isUnread && (
//                               <button
//                                 onClick={() => handleRead(c.id)}
//                                 className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
//                               >
//                                 Mark as Read
//                               </button>
//                             )}
//                           </td>
//                         </tr>
//                       );
//                     })
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Messages;
