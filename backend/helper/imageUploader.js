import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CloudinaryName,
  api_key: process.env.CloudinaryApi_key,
  api_secret: process.env.CloudinaryApi_secret,
});

export default cloudinary;
