import cloudinary from "../config/cloudinary";

cloudinary.uploader
  .upload("./test.png", { folder: "portfolio" })
  .then((result) => {
    console.log("Upload success:", result);
    console.log("File path:", result.secure_url);
  })
  .catch((error) => console.error("Upload error:", error));
