import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import cloudinary from "../config/cloudinary";

// File filter function to allow only images
const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true); // ✅ Accept file
  } else {
    cb(new Error("❌ Invalid file type! Only images are allowed."), false);
  }
};

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "portfolio",
      format: file.mimetype.split("/")[1],
      public_id: `${Date.now()}-${file.originalname.replace(/\s/g, "_")}`,
      quality: "auto",
      fetch_format: "auto",
    };
  },
});


export const upload = multer({ storage, fileFilter });
