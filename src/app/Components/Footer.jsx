"use client";
import React from "react";

function Footer() {
  return (
    <>
      <hr className="border-y-1 border-y-gray-200" />
      <div className="flex flex-wrap sm:flex-row flex-col max-w-340 mt-14 mx-auto sm:text-start text-center justify-between">
        <div className="flex flex-col mb-8 sm:mb-4">
          <h1 className="mb-4 font-bold">Categories</h1>
          <section className="mb-2">Graphics & Design</section>
          <section className="mb-2">Digital Marketing</section>
          <section className="mb-2">Writing & Translation</section>
          <section className="mb-2">Video & Animation </section>
          <section className="mb-2">Music & Audio </section>
          <section className="mb-2">Programming & Tech</section>
          <section className="mb-2">AI Services</section>
          <section className="mb-2">Consulting</section>
          <section className="mb-2">Data</section>
          <section className="mb-2">Business</section>
          <section className="mb-2">Personal Growth & Hobbies</section>
          <section className="mb-2">Photography</section>
          <section className="mb-2">Finance</section>
          <section className="mb-2">End-to-End Projects</section>
          <section className="mb-2">Service Catalog</section>
        </div>
        <div className="flex flex-col mb-8 sm:mb-4">
          <h1 className="mb-4 font-bold">For Clients</h1>
          <section className="mb-2">How Freelancer Works</section>
          <section className="mb-2">Customer Success Stories</section>
          <section className="mb-2">Trust & Safety</section>
          <section className="mb-2">Quality Guide</section>
          <section className="mb-2">Freelancer Learn - Online Courses</section>
          <section className="mb-2">Guides</section>
          <section className="mb-2">Freelancer Answers</section>
        </div>
        <div className="flex flex-col mb-8 sm:mb-4">
          <h1 className="mb-4 font-bold">For Freelancers</h1>
          <section className="mb-2">Become a Freelancer</section>
          <section className="mb-2">Become an Agency</section>
          <section className="mb-2">Feelancer Equity Program</section>
          <section className="mb-2">Community HUb</section>
          <section className="mb-2">Forum</section>
          <section className="mb-2">Events</section>
        </div>
        <div className="flex flex-col mb-8 sm:mb-4">
          <h1 className="mb-4 font-bold">About</h1>
          <section className="mb-2">Press & News</section>
          <section className="mb-2">Partnerships</section>
          <section className="mb-2">Privacy Policy</section>
          <section className="mb-2">Terms of Service</section>
          <section className="mb-2">Intellectual Property Claims</section>
          <section className="mb-2">Investor Relations</section>
          <section className="mb-2">Contact Sales</section>
        </div>
        <div className="flex flex-col mb-8 sm:mb-4">
          <h1 className="mb-4 font-bold">Support</h1>
          <section className="mb-2">Help & Support</section>
          <section className="mb-2">Trust & Safety</section>
          <section className="mb-2">Selling on Freelancer</section>
          <section className="mb-2">Buying on Freelancer</section>
        </div>
      </div>

      <div className="max-w-339 mx-21 ">
        <hr className="border-t-2 border-y-gray-300 mb-8" />
      </div>

      <div className="flex flex-col sm:flex-row sm:gap-6 sm:max-w-328 max-w-100 text-center mx-auto mb-20 ">
        <div className="text-3xl font-bold -mt-3">Freelancer
        <span className="font-bold text-[#1dbf73]">.</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:gap-180 gap-2 items-center sm:items-start">
          <div className="text-sm">© Freelancer International Ltd. 2025</div>
          <div className="flex flex-row gap-4 justify-center mt-2 sm:mt-0">
            <img src="/tik-tok.png" className="w-4 h-4" alt="TikTok" />
            <img src="/instagram.png" className="w-4 h-4" alt="Instagram" />
            <img src="/linkedin.png" className="w-4 h-4" alt="LinkedIn" />
            <img src="/facebook.png" className="w-4 h-4" alt="Facebook" />
            <img src="/pinterest.png" className="w-4 h-4" alt="Pinterest" />
            <img src="/twitter.png" className="w-4 h-4" alt="Twitter" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
