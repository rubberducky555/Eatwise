const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

/* -------------------------
   MongoDB Connection
-------------------------- */
mongoose.connect(
  "mongodb+srv://eatwiseUser:EatWise123@cluster0.ejqhntm.mongodb.net/eatwise?retryWrites=true&w=majority"
)

  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.error("MongoDB error ❌", err));

/* -------------------------
   User Schema
-------------------------- */
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,

  name: String,
  age: Number,
  diseases: [String],

  profileCompleted: { type: Boolean, default: false }
});


const User = mongoose.model("User", userSchema);

/* -------------------------
   SIGNUP ROUTE
-------------------------- */
app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      email,
      password: hashedPassword
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Signup failed" });
  }
});

/* -------------------------
   LOGIN ROUTE (FIXED)
-------------------------- */
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      success: true,
      profileCompleted: user.profileCompleted
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
});
/* -------------------------
   SAVE USER DETAILS
-------------------------- */
app.post("/details", async (req, res) => {
  try {
    const { email, name, age, diseases } = req.body;

    await User.findOneAndUpdate(
      { email },
      {
        name,
        age,
        diseases,
        profileCompleted: true
      }
    );

    res.json({ success: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to save details" });
  }
});

/* -------------------------
   Server Start
-------------------------- */
app.listen(PORT, () =>
  console.log(`EatWise server running on port ${PORT} 🍏`)
);