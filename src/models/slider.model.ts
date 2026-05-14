import mongoose, { Document, Schema } from "mongoose";

export interface ISlider extends Document {
  title: string;
  subtitle?: string;
  offerText?: string;
  buttonText: string;
  link: string;
  image: string;
  mobileImage?: string;
  order: number;
  isActive: boolean;
}

const sliderSchema = new Schema<ISlider>(
  {
    title: {
      type: String,
      required: [true, "Slider title is required"],
      trim: true,
    },

    subtitle: {
      type: String,
      default: "",
    },

    offerText: {
      type: String,
      default: "",
    },

    buttonText: {
      type: String,
      default: "Shop Now",
    },

    link: {
      type: String,
      required: [true, "Slider link is required"],
      default: "/products",
    },

    image: {
      type: String,
      required: [true, "Slider image is required"],
    },

    mobileImage: {
      type: String,
      default: "",
    },

    order: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Slider = mongoose.model<ISlider>("Slider", sliderSchema);

export default Slider;