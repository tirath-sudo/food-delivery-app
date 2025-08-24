import React, { useState } from "react";

const Add = () => {
  const [foodName, setFoodName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  // Handle file selection
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", foodName);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("category", category);
      if (image) {
        formData.append("image", image);
      }

      const res = await fetch("http://localhost:5000/api/food/add", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        alert("Food added successfully!");
        setFoodName("");
        setPrice("");
        setDescription("");
        setCategory("");
        setImage(null);
      } else {
        alert("Failed to add food.");
      }
    } catch (err) {
      console.error("Error uploading food:", err);
    }
  };

  return (
    <div className="add-container">
      <h2>Add New Food Item</h2>
      <form onSubmit={handleSubmit} className="add-form">
        <div>
          <label>Food Name:</label>
          <input
            type="text"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <button type="submit">Add Food</button>
      </form>
    </div>
  );
};

export default Add;
