import mongoose, { Document, Schema } from "mongoose";

interface ProductImage {
  url: string;
  alt?: string;
  isPrimary?: boolean;
}

interface ProductVariant {
  color: {
    name: string;
    hexCode: string;
  };
  size: string;
  sku: string;
  price: number;
  stock: number;
  images: ProductImage[];
}

interface ProductSpecification {
  key: string;
  value: string;
}

export interface IProduct extends Document {
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: string;
  brand?: string;
  basePrice: number;
  discountPrice?: number;
  images: ProductImage[];
  variants: ProductVariant[];
  specifications: ProductSpecification[];
  tags: string[];
  rating: number;
  reviewCount: number;
  totalSold: number;
  isFeatured: boolean;
  status: "active" | "inactive" | "draft";
}

const productSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
    },

    slug: {
      type: String,
      required: [true, "Product slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Product description is required"],
    },

    shortDescription: {
      type: String,
      required: [true, "Short description is required"],
    },

    category: {
      type: String,
      required: [true, "Category is required"],
    },

    brand: {
      type: String,
      default: "",
    },

    basePrice: {
      type: Number,
      required: [true, "Base price is required"],
      min: 0,
    },

    discountPrice: {
      type: Number,
      default: null,
    },

    images: [
      {
        url: {
          type: String,
          required: true,
        },
        alt: {
          type: String,
          default: "",
        },
        isPrimary: {
          type: Boolean,
          default: false,
        },
      },
    ],

    variants: [
      {
        color: {
          name: {
            type: String,
            required: true,
          },
          hexCode: {
            type: String,
            required: true,
          },
        },

        size: {
          type: String,
          required: true,
        },

        sku: {
          type: String,
          required: true,
        },

        price: {
          type: Number,
          required: true,
          min: 0,
        },

        stock: {
          type: Number,
          required: true,
          min: 0,
        },

        images: [
          {
            url: String,
            alt: String,
            isPrimary: Boolean,
          },
        ],
      },
    ],

    specifications: [
      {
        key: String,
        value: String,
      },
    ],

    tags: [String],

    rating: {
      type: Number,
      default: 0,
    },

    reviewCount: {
      type: Number,
      default: 0,
    },

    totalSold: {
      type: Number,
      default: 0,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["active", "inactive", "draft"],
      default: "active",
    },
  },
  { timestamps: true }
);

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;