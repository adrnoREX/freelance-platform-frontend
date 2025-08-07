// "use client";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { useParams, useSearchParams } from "next/navigation";
// import newRequest from "../client/components/newRequest";
// import { useRouter } from "next/navigation";
// import Navbar from "../client/components/Navbar";

// const Message = () => {
//   const params = useParams();
//   const searchParams = useSearchParams();
//   const conversationId = params.id;
//   const toId = searchParams.get("to");
//   const gigId = searchParams.get("gigId");
//   const router = useRouter();
//   const [currentUser, setCurrentUser] = useState(null);
//   const queryClient = useQueryClient();

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("currentUser"));
//     setCurrentUser(user);
//   }, []);

//   const {
//     isLoading: loadingConversation,
//     error: conversationError,
//     data: conversationData,
//   } = useQuery({
//     queryKey: ["messages", conversationId],
//     queryFn: () =>
//       newRequest.get(`/messages/${conversationId}`).then((res) => res.data),
//     enabled: !!conversationId,
//     refetchOnWindowFocus: false,
//     refetchInterval: 3000,
//   });

//   const messages = conversationData?.messages || [];
//   const conversationInfo = conversationData?.conversation;

//   console.log("Fetched messages:", conversationData);
//   console.log("conversationId being fetched:", conversationId);
//   const mutation = useMutation({
//     mutationFn: ({ conversationId, to, desc }) => {
//       const payload = conversationId
//         ? { conversationId, desc }
//         : { to, desc, gigId };
//       return newRequest.post("/messages", payload);
//     },
//     onSuccess: (data, variables) => {
//       if (variables.conversationId) {
//         queryClient.invalidateQueries(["messages", variables.conversationId]);
//       } else {
//         const newId = data.conversationId;
//         if (newId) {
//           router.push(`/message/${newId}?to=${toId}&gigId=${gigId}`);
//         }
//       }
//     },
//     onError: (error) => {
//       console.error(
//         "Message send failed:",
//         error.response?.data || error.message
//       );
//     },
//   });

//   const isOwnMessage = (m) => {
//     const messageUserId =
//       typeof m.userId === "object" ? m.userId._id : m.userId;
//     return messageUserId === currentUser._id;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const desc = e.target[0].value.trim();

//     if (!desc) return;

//     if (conversationId) {
//       mutation.mutate({ conversationId, desc });
//     } else if (toId && gigId) {
//       mutation.mutate({ to: toId, desc, gigId });
//     }

//     e.target[0].value = "";
//   };

//   if (!currentUser) return null;
//   if (!currentUser || loadingConversation)
//     return <p>Loading conversation...</p>;

//   const buyerId =
//     typeof conversationData?.buyerId === "object"
//       ? conversationData.buyerId._id
//       : conversationData?.buyerId;

//   const sellerId =
//     typeof conversationData?.sellerId === "object"
//       ? conversationData.sellerId._id
//       : conversationData?.sellerId;

//   const isParticipant =
//     currentUser &&
//     (currentUser._id === buyerId || currentUser._id === sellerId);

//   // const isParticipant =
//   //   conversationData?.buyerId?._id === currentUser._id ||
//   //   conversationData?.sellerId?._id === currentUser._id;

//   if (!isParticipant) {
//     return (
//       <>
//         <Navbar />
//         {/* <div className="w-full max-w-[1200px] my-12 px-4 text-red-500">
//           Access Denied: You are not a participant of this conversation.
//         </div> */}
//         <div className="flex justify-center">
//           <div className="w-full max-w-[1200px] my-12 px-4">
//             <span className="text-sm text-gray-600 font-light">
//               <Link href="/messages" className="text-blue-600 hover:underline">
//                 Messages
//               </Link>{" "}
//               &gt; Conversation
//             </span>

//             {loadingConversation ? (
//               <p>Loading...</p>
//             ) : conversationError ? (
//               <p className="text-red-500">Error loading messages</p>
//             ) : messages.length > 0 ? (
//               <div className="my-8 p-6 flex flex-col gap-5 h-[500px] overflow-y-scroll">
//                 {conversationData.map((m) => {
//                   console.log("Message item:", m);
//                   const own = isOwnMessage(m);
//                   return (
//                     <div
//                       key={m._id}
//                       className={`flex gap-5 max-w-[600px] text-lg ${
//                         own ? "flex-row-reverse self-end" : "self-start"
//                       }`}
//                     >
//                       <img
//                         src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
//                         alt="user"
//                         className="w-10 h-10 rounded-full object-cover"
//                       />
//                       <p
//                         className={`max-w-[500px] px-5 py-4 rounded-2xl font-light ${
//                           own
//                             ? "bg-blue-600 text-white rounded-bl-none"
//                             : "bg-gray-100 text-gray-700 rounded-tr-none"
//                         }`}
//                       >
//                         {m.desc}
//                       </p>
//                     </div>
//                   );
//                 })}
//               </div>
//             ) : (
//               <div className="my-8 p-6 text-gray-400">
//                 No messages you send today kindly see the messages section for
//                 the last message and continue from there.
//               </div>
//             )}

//             <hr className="border border-gray-200 mb-5" />

//             <form
//               className="flex items-center justify-between gap-4"
//               onSubmit={handleSubmit}
//             >
//               <textarea
//                 placeholder="Write a message"
//                 className="w-4/5 h-24 p-3 border border-gray-300 rounded-lg resize-none"
//               />
//               <button
//                 type="submit"
//                 className="bg-green-500 text-white font-medium py-4 px-6 rounded-lg w-28 hover:bg-green-600"
//               >
//                 Send
//               </button>
//             </form>
//           </div>
//         </div>
//       </>
//     );
//   }
// };

// export default Message;

