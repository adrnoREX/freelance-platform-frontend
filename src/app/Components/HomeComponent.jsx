"use client";
import React, { useRef } from "react";
import Navbar from "./Navbar.jsx";
import Searchbar from "./Searchbar.jsx";
import Services from "./Services.jsx";
import Footer from "./Footer.jsx";
import { useRouter } from "next/navigation";

function HomeComponent() {
  const router = useRouter();
  const searchbarRef = useRef(); // create a ref to control Searchbar

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
          className="w-full sm:max-h-[90vh] object-cover"
        />

        <div className="sm:-mt-[70vh] -mt-[22vh] z-10 text-center px-4 sm:px-0">
          <h1 className="text-white text-2xl sm:text-4xl lg:text-6xl font-extralight drop-shadow-md">
            Hire the Best Freelancers
          </h1>
          <h2 className=" text-white text-xl sm:text-3xl drop-shadow-md">
            for your project
          </h2>

          <p className="sm:mt-4 text-white text-sm sm:text-base max-w-xl mx-auto">
            Connect with talented professionals in design, development,
            marketing, and more.
          </p>

          <div className="mt-6 mx-20">
            <Searchbar ref={searchbarRef} onSearch={handleSearch} />
            <div className="flex pt-4 text-white gap-4">
              Popular: 
              <section
                className="border px-2 rounded-2xl cursor-pointer"
                onClick={() => handlePopularClick("Web Development")}
              >
                Web Development
              </section>
              <section
                className="border px-2 rounded-2xl cursor-pointer"
                onClick={() => handlePopularClick("AI Development")}
              >
                AI Development
              </section>
              <section
                className="border px-2 rounded-2xl cursor-pointer"
                onClick={() => handlePopularClick("Logo Design")}
              >
                Logo Design
              </section>
            </div>
          </div>
        </div>

        {/* Trusted Companies */}
        <div className="flex sm:mt-42 sm:text-base text-white text-sm sm:gap-5 gap-2">
          <section className=" text-base ">Trusted by:</section>
          <img src="google.png" alt="" className="w-18 h-18 -mt-6" />
          <img src="netflix.png" alt="" className="w-16 h-16 -mt-5" />
          <img src="meta.png" alt="" className="w-8 h-8 -mt-1" />
          <img src="p&g.png" alt="" className="w-8 h-8 -mt-1" />
          <img src="paypal.png" alt="" className="w-20 h-20 -mt-7" />
          <img src="payoneer.png" alt="" className="w-20 h-20 -mt-7" />
        </div>
      </div>

      <div className="sm:mt-10  mt-5 ">
        <Services />
      </div>
      {/* <div className="mt-14 sm:mx-auto mx-12 text-center mb-60 sm:w-250 w-25">
        <h1 className="font-bold text-xl sm:mx-0 mx-30">Steps</h1>
        <div className="flex flex-col sm:flex-row text-center sm:gap-50 gap-2 sm:mt-14 mt-8">
          <section className="sm:w-100 sm:mb-0 mb-8 w-80 bg-base-200 rounded-2xl shadow-2xl p-4">
            <h2 className="text-center font-bold text-lg mb-2">1. Sign Up</h2>
            Create your free account in just a few clicks. Whether you're a
            client looking for skilled professionals or a freelancer offering
            services, getting started is easy. Just provide your name, email,
            and set a password - you're in!
          </section>
          <section className="sm:w-100 sm:mb-0 mb-4 w-80 bg-base-200 rounded-2xl shadow-2xl p-4">
            <h2 className="font-bold text-lg mb-2">
              2. Post a Project or Browse Services
            </h2>
            As a client, describe your project needs any specific requirements.
            Or simply browse through available service listings across
            categories to find the right match instantly. <br /> As a
            freelancer, you can list your services or respond to posted projects
            that match your skills.
          </section>
        </div>
        <div className="flex flex-col sm:flex-row text-center sm:gap-50 gap-2 sm:mt-24 mt-6">
          <section className="sm:w-100 sm:mb-0 mb-8 w-80 bg-base-200 rounded-2xl shadow-2xl p-4">
            <h2 className="text-center font-bold text-lg mb-2">
              3. Connect & Collaborate
            </h2>
            Start communicating directly through our secure messaging system.
            Share files, ask questions, and align on the project scope. Our
            platform makes collaboration smooth and transparent.
          </section>
          <section className="sm:w-100 sm:mb-0 mb-4 w-80 bg-base-200 rounded-2xl shadow-2xl p-4">
            <h2 className="text-center font-bold text-lg mb-2">
              4. Complete the Work & Get Results
            </h2>
            Freelancers deliver the work, and clients can request revisions if
            needed. Once approved, the payment is processed securely. Both
            parties can leave reviews to help build trust within the community.
          </section>
        </div> */}
      {/* </div> */}
      <div className="flex max-w-screen w-full bg-sky-100 mt-20">

        <div className=" px-70 mb-8 text-gray-500  space-y-2">
          <h1 className="pt-20 text-3xl text-black">A whole world of freelancer at your fingertips </h1>
          <h2 className="font-bold mt-6">🌍 Global Access</h2>
          <section className="">Instantly connect with expert freelancers across the globe for any project, anytime, anywhere.</section>
          <h2 className="font-bold">🎨 Diverse Talent Pool</h2>
          <section className="">Access a vast talent pool in design, tech, marketing, writing, and much more easily.</section>
          <h2 className="font-bold">⚡ On-Demand Services</h2>
          <section className="">Hire professionals on-demand, manage tasks efficiently, and get quality results without leaving home.</section>
          <h2 className="font-bold">📱 Convenience & Flexibility</h2>
          <section className=" pb-20">Flexible work solutions tailored to your needs, all from the convenience of your fingertips.</section>
        </div>
        <div>
          <video 
          src="/video1.mp4"
          loop
          autoPlay
          controls
          muted 
          playsInline
          className="relative -mx-34 pt-35 max-h-[200vh] object-cover"
          />

        </div>
      </div>
      <Footer />
    </>
  );
}

export default HomeComponent;