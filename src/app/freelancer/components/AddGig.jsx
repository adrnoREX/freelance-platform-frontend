"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast"

const AddGig = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [skills, setSkills] = useState(""); 
  const [price, setPrice] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [revisionNumber, setRevisionNumber] = useState("");
  const [tags, setTags] = useState(""); 
  const [cover, setCover] = useState(null);
  const [images, setImages] = useState([]);
  const [shortTitle, setShortTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [features, setFeatures] = useState(""); 

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("deliveryTime", deliveryTime);
    formData.append("revisionNumber", revisionNumber);

    
    const skillArray = skills.split(",").map((s) => s.trim());
    const tagArray = tags.split(",").map((s) => s.trim());
    const featureArray = features.split(",").map((s) => s.trim());

    formData.append("skills", JSON.stringify(skillArray));
    formData.append("tags", JSON.stringify(tagArray));
    formData.append("features", featureArray.join(","));

    
    formData.append("shortTitle", shortTitle);
    formData.append("shortDesc", shortDesc);

   
    if (cover) {
      formData.append("cover", cover);
    }

    
    images.forEach((img) => {
      formData.append("images", img);
    });

    
    formData.append(
      "profile",
      JSON.stringify({
        title: shortTitle,
        description: shortDesc,
        experience: "3 years",
      })
    );

    const user = JSON.parse(localStorage.getItem("currentUser"));
    try {

      
      const token = user.token;

      const res = await axios.post("http://localhost:8800/api/gig/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }, withCredentials: true,
      });

    toast.success("Gig added sucessfully!")

      console.log("Gig Created:", res.data);
      setTimeout(() => {
          router.push("/client/gigs"); 
      }, 1000);
    } catch (err) {
      console.error("Error creating gig:", err);
      alert("Failed to create gig. Check console.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Add New Gig</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Title</label>
          <input
            type="text"
            placeholder="Title"
            className="w-full border mt-1 rounded p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            placeholder="Description"
            className="w-full border mt-1 rounded p-2"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Category</label>
          <input
            type="text"
            placeholder="Category (e.g., Design)"
            className="w-full border mt-1 rounded p-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Skills</label>
          <input
            type="text"
            placeholder="Skills (comma separated)"
            className="w-full border mt-1 rounded p-2"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Price</label>
          <input
            type="number"
            placeholder="Price"
            className="w-full border  mt-1 rounded p-2"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Delivery Time</label>
          <input
            type="number"
            placeholder="Delivery Time (in days)"
            className="w-full border mt-1 rounded p-2"
            value={deliveryTime}
            onChange={(e) => setDeliveryTime(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Revision Number</label>
          <input
            type="number"
            placeholder="Revision Number"
            className="w-full border mt-1 rounded p-2"
            value={revisionNumber}
            onChange={(e) => setRevisionNumber(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Tags</label>
          <input
            type="text"
            placeholder="Tags (comma separated)"
            className="w-full border mt-1 rounded p-2"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        <div>
          <label>Cover Image:</label>
          <input
            type="file"
            accept="image/*"
            className="border w-full rounded p-2 mt-2 file:px-2 file:rounded file:mr-2 file:ml-1 file:border-blue-500 file:border"
            onChange={(e) => setCover(e.target.files[0])}
            required
          />
        </div>

        <div>
          <label>Gallery Images:</label>
          <input
            type="file"
            accept="image/*"
            className="border w-full rounded p-2 mt-2 file:px-2 file:rounded file:mr-2 file:ml-1 file:border-blue-500 file:border"
            multiple
            onChange={(e) => setImages(Array.from(e.target.files))}
          />
        </div>

        <div className="flex justify-center mt-6 mb-10">
          <button
            type="submit"
            className="bg-black items-center mx-auto text-white px-4 py-2 rounded"
          >
            Submit Gig
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddGig;
