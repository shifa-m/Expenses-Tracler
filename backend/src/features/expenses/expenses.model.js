import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, 
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0.01, "Amount must be greater than 0"],
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  { timestamps: true }
);


expenseSchema.index({ user: 1, date: -1 });

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
