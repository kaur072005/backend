const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB Atlas connect
mongoose.connect("mongodb+srv://formuser:iGFu6vtTHdLq54Nt@testdb.8rbiqb6.mongodb.net/?retryWrites=true&w=majority&appName=testdb")
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch(err => console.log("❌ Error:", err));

// ✅ Schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const User = mongoose.model("User", UserSchema);

// ✅ API route
app.post("/api/form", async (req, res) => {
  const { name, email } = req.body;
  const user = new User({ name, email });
  await user.save();
  res.json({ message: "Data saved to MongoDB Atlas!" });
});

// ✅ Get all users
app.get("/api/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.listen(5000, () => console.log("🚀 Backend running on http://localhost:5000"));
