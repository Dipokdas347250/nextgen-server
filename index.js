const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config();

const Contact = require("./models/contact");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    console.log(
      "MongoDB Connected"
    )
  )
  .catch((err) =>
    console.log(err)
  );

// Contact API
app.post(
  "/api/contact",
  async (req, res) => {
    try {
      const {
        name,
        email,
        phone,
        message,
      } = req.body;

      // Validation
      if (
        !name ||
        !email ||
        !phone ||
        !message
      ) {
        return res
          .status(400)
          .json({
            message:
              "Fill in all fields.",
          });
      }

      // Save to MongoDB
      const newContact =
        new Contact({
          name,
          email,
          phone,
          message,
        });

      await newContact.save();

      res.status(201).json({
        message:
          "Message sent successfully",
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);
// Get All Contacts API
app.get("/api/contact", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server Running on ${PORT}`
  );
});