// "use client";
// import React, { useState } from "react";
// import Link from "next/link";
// import { useQuery } from "@tanstack/react-query";
// import newRequest from "./newRequest";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// const GigCard = ({ item }) => {
//   console.log("GigCard item:", item);

//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const handleNext = (e) => {
//     e.preventDefault();
//     if (item.cover && currentImageIndex < item.cover.length - 1) {
//       setCurrentImageIndex((prev) => prev + 1);
//     }
//   };

//   const handlePrev = (e) => {
//     e.preventDefault();
//     if (item.cover && currentImageIndex > 0) {
//       setCurrentImageIndex((prev) => prev - 1);
//     }
//   };

//   const {
//     data: freelancer,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["freelancer", item.userId],
//     queryFn: () =>
//       newRequest.get(`/freelancer/${item.userId}`).then((res) => res.data),
//   });

//   const averageRating =
//     item.starNumber > 0 ? Math.round(item.totalStars / item.starNumber) : 0;

//   return (
//     <Link href={`/client/gigs/${item._id}`} className="w-full">
//       <div className=" relative w-full max-w-[300px] bg-white rounded-lg shadow hover:shadow-md border cursor-pointer transition-all duration-300">
//         <img
//           src={
//             item.cover && item.cover.length > 0
//               ? `http://localhost:8800/uploads/${encodeURIComponent(
//                   item.cover[currentImageIndex]
//                 )}`
//               : "/noimage.jpg"
//           }
//           alt={`gig-${item._id}`}
//           className="w-full h-[200px] object-cover rounded-t-lg"
//         />

//         {currentImageIndex > 0 && (
//           <button
//             onClick={handlePrev}
//             className="absolute left-3 top-30 -translate-y-1/2 bg-white shadow rounded-full p-1 hover:bg-gray-100 z-10"
//           >
//             <ChevronLeft size={20} />
//           </button>
//         )}

//         {item.cover.length > 1 && currentImageIndex < item.cover.length - 1 && (
//           <button
//             onClick={handleNext}
//             className="absolute right-3 top-30 -translate-y-1/2 bg-white shadow rounded-full p-1 hover:bg-gray-100 z-10"
//           >
//             <ChevronRight size={20} />
//           </button>
//         )}

//         <div className="p-4">
//           {isLoading ? (
//             <p className="text-sm text-gray-400">Loading user...</p>
//           ) : error ? (
//             <p className="text-sm text-red-500">Failed to load user</p>
//           ) : (
//             <div className="flex items-center gap-2 mb-2">
//               <span className="text-sm font-medium">{freelancer.displayName}</span>
//             </div>
//           )}

//           <p className="text-sm text-gray-700 mb-3 truncate">{item.desc}</p>

//           <div className="flex items-center gap-1 text-yellow-500 text-sm mb-2">
//             <img src="/star.png" alt="star" className="w-4 h-4" />
//             <span>{!isNaN(averageRating) ? averageRating : "0"}</span>
//           </div>
//         </div>

//         <hr className="border-gray-200" />

//         <div className="flex items-center justify-between px-4 py-3">
//           <img src="/heart.png" alt="heart" className="w-5 h-5" />
//           <div className="text-right">
//             <span className="text-[10px] text-gray-400">STARTING AT</span>
//             <h2 className="text-md font-bold text-gray-800">${item.price}</h2>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default GigCard;

"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import newRequest from "./newRequest";
import { ChevronLeft, ChevronRight } from "lucide-react";

const GigCard = ({ item }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNext = (e) => {
    e.preventDefault();
    if (item.cover && currentImageIndex < item.cover.length - 1) {
      setCurrentImageIndex((prev) => prev + 1);
    }
  };

  const handlePrev = (e) => {
    e.preventDefault();
    if (item.cover && currentImageIndex > 0) {
      setCurrentImageIndex((prev) => prev - 1);
    }
  };

  const {
    data: freelancer,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["freelancer", item.userId],
    queryFn: () =>
      newRequest.get(`/freelancer/${item.userId}`).then((res) => res.data),
  });

  const averageRating =
    item.starNumber > 0 ? Math.round(item.totalStars / item.starNumber) : 0;

  return (
    <Link href={`/client/gigs/${item._id}`} className="block">
      <div className="relative w-full bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group">
        {/* Gig Image */}
        <div className="relative">
          <img
            src={
              item.cover && item.cover.length > 0
                ? `http://localhost:8800/uploads/${encodeURIComponent(item.cover[currentImageIndex])}`
                : "/noimage.jpg"
            }
            alt={`gig-${item._id}`}
            className="w-full h-[220px] sm:h-[200px] object-cover rounded-t-xl transition duration-300 group-hover:scale-105"
          />

          {/* Prev Button */}
          {/* {currentImageIndex > 0 && (
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow z-10"
            >
              <ChevronLeft size={18} />
            </button>
          )} */}

          {/* Next Button */}
          {/* {item.cover.length > 1 && currentImageIndex < item.cover.length - 1 && (
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow z-10"
            >
              <ChevronRight size={18} />
            </button>
          )} */}
        </div>

        {/* Gig Content */}
        <div className="p-4">
          {/* Freelancer Name */}
          {isLoading ? (
            <p className="text-sm text-gray-400">Loading user...</p>
          ) : error ? (
            <p className="text-sm text-red-500">Failed to load user</p>
          ) : (
            <p className="text-sm font-semibold text-gray-800 mb-1">{freelancer.displayName}</p>
          )}

          {/* Gig Description */}
          <p className="text-sm text-gray-600 mb-2 truncate">{item.desc}</p>

          {/* Rating */}
          <div className="flex items-center gap-1 text-yellow-500 text-sm mb-3">
            <img src="/star.png" alt="star" className="w-4 h-4" />
            <span>{!isNaN(averageRating) ? averageRating : "0"}</span>
          </div>
        </div>

        <div className="border-t px-4 py-3 flex items-center justify-between">
          <img src="/heart.png" alt="heart" className="w-5 h-5 opacity-60 hover:opacity-100" />
          <div className="text-right">
            <span className="text-xs text-gray-400">STARTING AT</span>
            <h2 className="text-md font-bold text-gray-800">${item.price}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
