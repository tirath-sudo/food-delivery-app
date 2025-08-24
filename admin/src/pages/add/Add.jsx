import React, { useState } from "react";

const Add = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !price || !image) {
      alert("Please fill all fields!");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", image);
      formData.append("title", title);
      formData.append("price", price);

      const res = await fetch(
        "https://your-backend.onrender.com/api/food/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      console.log("Response:", data);

      if (data.imageUrl) {
        alert("Food item added successfully!");
        setTitle("");
        setPrice("");
        setImage(null);
        setPreview("");
      } else {
        alert("Upload failed! Check backend response.");
      }
    } catch (err) {
      console.error("Error uploading:", err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-container">
      <h2 className="add-title">Add Food Item</h2>
      <form className="add-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Food Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="add-input"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="add-input"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="add-input"
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="add-preview"
          />
        )}

        <button type="submit" className="add-button" disabled={loading}>
          {loading ? "Uploading..." : "Add Item"}
        </button>
      </form>
    </div>
  );
};

export default Add;
