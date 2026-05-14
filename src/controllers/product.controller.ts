import { Request, Response } from "express";
import Product from "../models/product.model";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create product",
    });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const {
      search,
      category,
      minPrice,
      maxPrice,
      rating,
      sort = "newest",
      page = 1,
      limit = 8,
    } = req.query;

    const query: any = {
      status: "active",
    };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    if (category) {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query.basePrice = {};

      if (minPrice) {
        query.basePrice.$gte = Number(minPrice);
      }

      if (maxPrice) {
        query.basePrice.$lte = Number(maxPrice);
      }
    }

    if (rating) {
      query.rating = { $gte: Number(rating) };
    }

    let sortOption: any = { createdAt: -1 };

    if (sort === "price-low") {
      sortOption = { basePrice: 1 };
    }

    if (sort === "price-high") {
      sortOption = { basePrice: -1 };
    }

    if (sort === "rating") {
      sortOption = { rating: -1 };
    }

    if (sort === "best-selling") {
      sortOption = { totalSold: -1 };
    }

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const products = await Product.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNumber);

    const total = await Product.countDocuments(query);

    return res.json({
      success: true,
      products,
      pagination: {
        total,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(total / limitNumber),
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to get products",
    });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    const id = Array.isArray(idParam) ? idParam[0] : idParam;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product ID or slug is required",
      });
    }

    const isMongoId = /^[0-9a-fA-F]{24}$/.test(id);

    const product = isMongoId
      ? await Product.findById(id)
      : await Product.findOne({ slug: id });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.json({
      success: true,
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to get product",
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update product",
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete product",
    });
  }
};
