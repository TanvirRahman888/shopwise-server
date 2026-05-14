import { Request, Response } from "express";
import Slider from "../models/slider.model";

export const createSlider = async (req: Request, res: Response) => {
  try {
    const slider = await Slider.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Slider created successfully",
      slider,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create slider",
    });
  }
};

export const getSliders = async (req: Request, res: Response) => {
  try {
    const sliders = await Slider.find().sort({ order: 1, createdAt: -1 });

    return res.json({
      success: true,
      count: sliders.length,
      sliders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to get sliders",
    });
  }
};

export const getActiveSliders = async (req: Request, res: Response) => {
  try {
    const sliders = await Slider.find({ isActive: true }).sort({
      order: 1,
      createdAt: -1,
    });

    return res.json({
      success: true,
      count: sliders.length,
      sliders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to get active sliders",
    });
  }
};

export const updateSlider = async (req: Request, res: Response) => {
  try {
    const slider = await Slider.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!slider) {
      return res.status(404).json({
        success: false,
        message: "Slider not found",
      });
    }

    return res.json({
      success: true,
      message: "Slider updated successfully",
      slider,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update slider",
    });
  }
};

export const deleteSlider = async (req: Request, res: Response) => {
  try {
    const slider = await Slider.findByIdAndDelete(req.params.id);

    if (!slider) {
      return res.status(404).json({
        success: false,
        message: "Slider not found",
      });
    }

    return res.json({
      success: true,
      message: "Slider deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete slider",
    });
  }
};