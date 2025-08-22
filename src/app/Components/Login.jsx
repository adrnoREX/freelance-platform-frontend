"use client";
import axios from "axios";
import React, { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const fileInputRef = useRef(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
  });
  const [file, setFile] = useState(null);

  
  const clearLoginFields = () => {
    setUsername("");
    setPassword("");
    setError(null);
  };

  
  const resetJoinForm = () => {
    setUser({
      username: "",
      email: "",
      password: "",
      img: "",
      country: "",
    });
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8800/api/auth/login",
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );

      localStorage.setItem("currentUser", JSON.stringify(res.data));
      
      toast.success("Login successful!");
      clearLoginFields();
      document.getElementById("login_modal")?.close();
      setTimeout(() => {
        router.push("/client/gigs");
      }, 1000);
    } catch (err) {
      console.log("Login error", err);
      if (err.response) {
        const message =
          err.response.data?.message || "Login failed. Please try again.";
        setError(message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  const handleJoinSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("username", user.username);
    data.append("email", user.email);
    data.append("password", user.password);
    data.append("country", user.country);
    if (file) data.append("img", file);

    try {
      await axios.post("http://localhost:8800/api/auth/register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Signup successful");
      document.getElementById("join_modal")?.close();
      resetJoinForm();
    } catch (err) {
      console.log("Signup error", err);
      toast.error("Signup failed! Please try again.");
    }
  };

  return (
    <div>
      <div
        className="hover:underline cursor-pointer  sm:pb-0 pb-4"
        onClick={() => document.getElementById("login_modal")?.showModal()}
      >
        Sign in
      </div>

      <dialog id="login_modal" className="modal">
        <div className="modal-box p-0 rounded-xl max-w-[120vh] max-h-[100vh]">
          <form>
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-1 top-1"
              onClick={(e) => {
                e.preventDefault();
                clearLoginFields();
                document.getElementById("login_modal")?.close();
              }}
            >
              ✕
            </button>

            <div className="flex">
              <img
                src="/login1.jpg"
                alt="login illustration"
                className="max-h-[90vh] max-w-[120vh] sm:block hidden mt-0.4"
              />

              <div className="flex flex-col sm:mx-18 mt-40 mx-6 text-start">
                <h3 className="font-bold text-2xl sm:w-80 mb-2">
                  Sign in to your account
                </h3>

                <div className="flex flex-col w-80">
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border-b-1 w-67 outline-0 mb-4 p-2 px-8"
                  />

                  <span className="absolute pt-3 px-1">
                    <FaUser />
                  </span>

                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-b-1 w-67 outline-0 mb-6 p-2 px-8"
                  />

                  <span className="absolute pt-17 px-1">
                    <FaLock />
                  </span>

                  <button
                    onClick={handleLoginSubmit}
                    className="w-68 h-8 bg-black border text-white rounded cursor-pointer hover:bg-gray-900"
                  >
                    Login
                  </button>

                  {error && (
                    <div className="text-gray-500 text-sm mt-2">
                      {typeof error === "string"
                        ? error
                        : error.message || "Login failed"}
                    </div>
                  )}

                  <div className="mb-10 mx-3 mt-4">
                    Don&apos;t have an account?{" "}
                    <span
                      className="text-blue-500 underline cursor-pointer"
                      onClick={() => {
                        document.getElementById("login_modal")?.close();
                        document.getElementById("join_modal")?.showModal();
                      }}
                    >
                      Join here
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default Login;
