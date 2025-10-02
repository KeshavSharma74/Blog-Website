import streamifier from "streamifier";
import cloudinary from "../config/cloudinary.js";

export const uploadFromBuffer = (buffer, folder = process.env.CLOUDINARY_UPLOAD_FOLDER || "blog_images") => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, transformation: [{ width: 1600, crop: "limit" }] },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

export default uploadFromBuffer;
