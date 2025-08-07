"use client";
import React from "react";
import FreelancerSetup from "../components/FreelancerSetup";
import { Toaster } from "react-hot-toast";

const ClientGigsPage = () => {
  return (
    <>
      <FreelancerSetup />
      <Toaster position="top-center" />
    </>
  );
};

export default ClientGigsPage;
