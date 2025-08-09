"use client";
import React, { useRef } from "react";
import Navbar from "./Navbar.jsx";
import Searchbar from "./Searchbar.jsx";
import Services from "./Services.jsx";
import Footer from "./Footer.jsx";
import { useRouter } from "next/navigation";

function HomeComponent() {
  const router = useRouter();
  const searchbarRef = useRef();

  const handleSearch = (query) => {
    const matchedCategories = [
      "Graphics & Design",
      "Web Development",
      "Video Editing",
      "AI Development",
      "Digital Marketing",
      "Software Development",
      "App Development",
      "Logo Design",
      "Search Engine Optimization"
    ];

    const matched = matchedCategories.find(
      (cat) => cat.toLowerCase() === query.toLowerCase().trim()
    );

    if (matched) {
      router.push(`/client/gigs?category=${encodeURIComponent(matched)}`);
    } else {
      alert("Category not found. Try again.");
    }
  };

  const handlePopularClick = (category) => {
    if (searchbarRef.current) {
      searchbarRef.current.setQueryExternally(category);
    }
  };

  return (
    <>
      <Navbar />
      <div className="relative flex flex-col items-center justify-center">
        <video
          src="/video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full sm:max-h-[90vh] max-h-[50vh] object-cover"
        />

        <div className="sm:-mt-[70vh] -mt-[25vh] z-10 text-center px-4 sm:px-0">
          <h1 className="text-white text-xl sm:text-4xl lg:text-6xl font-extralight drop-shadow-md leading-tight">
            Hire the Best Freelancers
          </h1>
          <h2 className="text-white text-lg sm:text-3xl drop-shadow-md">
            for your project
          </h2>

          <p className="sm:mt-4 text-white text-sm sm:text-base max-w-xl mx-auto">
            Connect with talented professionals in design, development,
            marketing, and more.
          </p>

          <div className="mt-6 mx-4 sm:mx-20">
            <Searchbar ref={searchbarRef} onSearch={handleSearch} />
            <div className="flex flex-wrap justify-center sm:justify-start pt-4 text-white gap-2 sm:gap-4 text-sm sm:text-base">
              <span className="w-full sm:w-auto text-center sm:text-left">Popular:</span>
              <section
                className="border px-2 py-1 rounded-2xl cursor-pointer"
                onClick={() => handlePopularClick("Web Development")}
              >
                Web Development
              </section>
              <section
                className="border px-2 py-1 rounded-2xl cursor-pointer"
                onClick={() => handlePopularClick("AI Development")}
              >
                AI Development
              </section>
              <section
                className="border px-2 py-1 rounded-2xl cursor-pointer"
                onClick={() => handlePopularClick("Logo Design")}
              >
                Logo Design
              </section>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center sm:mt-30 mt-4 sm:text-white text-black text-xs sm:text-sm sm:gap-5 gap-2 ">
          <section className="text-sm sm:text-base">Trusted by:</section>
          <img src="google.png" alt="" className="w-12 sm:w-18 h-auto" />
          <img src="netflix.png" alt="" className="w-10 sm:w-16 h-auto" />
          <img src="meta.png" alt="" className="w-6 sm:w-8 h-auto" />
          <img src="p&g.png" alt="" className="w-6 sm:w-8 h-auto" />
          <img src="paypal.png" alt="" className="w-14 sm:w-20 h-auto" />
          <img src="payoneer.png" alt="" className="w-14 sm:w-20 h-auto" />
        </div>
      </div>

      <div className="sm:mt-10 mt-5 px-4 sm:px-0">
        <Services />
      </div>

      <div className="flex flex-col sm:flex-row max-w-screen w-full bg-sky-100 mt-20">
        <div className="px-6 sm:px-70 mb-8 text-gray-500 space-y-2">
          <h1 className="pt-10 sm:pt-20 text-2xl sm:text-3xl text-black">
            A whole world of freelancer at your fingertips
          </h1>
          <h2 className="font-bold mt-6">🌍 Global Access</h2>
          <section>Instantly connect with expert freelancers across the globe for any project, anytime, anywhere.</section>
          <h2 className="font-bold">🎨 Diverse Talent Pool</h2>
          <section>Access a vast talent pool in design, tech, marketing, writing, and much more easily.</section>
          <h2 className="font-bold">⚡ On-Demand Services</h2>
          <section>Hire professionals on-demand, manage tasks efficiently, and get quality results without leaving home.</section>
          <h2 className="font-bold">📱 Convenience & Flexibility</h2>
          <section className="pb-10 sm:pb-20">Flexible work solutions tailored to your needs, all from the convenience of your fingertips.</section>
        </div>
        <div className="px-4 sm:px-0">
          <video
            src="/video1.mp4"
            loop
            autoPlay
            controls
            muted
            playsInline
            className="w-full sm:mt-30 mt-0 sm:-mx-30 -mx-0 max-h-[40vh] sm:max-h-[200vh] object-cover"
          />
        </div>
      </div>

      <Footer />
    </>
  );
}

export default HomeComponent;