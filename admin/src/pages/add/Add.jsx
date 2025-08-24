import React, { useState } from "react";
import "./Add.css"; // keep your existing styling

const Add = () => {
  const [foodDetails, setFoodDetails] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    imageUrl: "", // Cloudinary URL
  });
  const [loading, setLoading] = useState(false);

  // Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);
      const res = await fetch(
        "https://your-backend.onrender.com/api/food/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      if (data.imageUrl) {
        setFoodDetails((prev) => ({ ...prev, imageUrl: data.imageUrl }));
      }
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://your-backend.onrender.com/api/food/add",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(foodDetails),
        }
      );

      const data = await res.json();
      if (data.success) {
        alert("Food item added successfully!");
        setFoodDetails({
          name: "",
          description: "",
          price: "",
          category: "",
          imageUrl: "",
        });
      }
    } catch (error) {
      console.error("Error adding food item:", error);
    }
  };

  return (
    <div className="add-container">
      <h2>Add New Food Item</h2>
      <form className="add-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Food Name"
          value={foodDetails.name}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={foodDetails.description}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={foodDetails.price}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={foodDetails.category}
          onChange={handleChange}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          required
        />

        {loading && <p>Uploading image...</p>}
        {foodDetails.imageUrl && (
          <img
            src={foodDetails.imageUrl}
            alt="Uploaded Preview"
            className="preview-img"
          />
        )}

        <button type="submit" className="submit-btn">
          Add Food
        </button>
      </form>
    </div>
  );
};

export default Add;
