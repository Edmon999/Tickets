const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      requried: true,
      ref: "User",
    },
    product: {
      type: String,
      requried: [true, "Please select a product"],
      enum: ["iPhone", "Macbook Pro", "iPad"],
    },
    description: {
      type: String,
      requried: [true, "Please enter a description off the issue"],
    },
    status: {
      type: String,
      requried: [true, "Please enter a description off the issue"],
      enum: ["new", "open", "closed"],
      default: "true",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ticket", ticketSchema);
