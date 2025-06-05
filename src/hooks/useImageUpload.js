export const useImageUpload = () => {
  const cloudinaryKey = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);
      formData.append("folder", "user_uploads");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudinaryKey}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (!data.secure_url) throw new Error("Upload failed");
      return data.secure_url;
    } catch (error) {
      console.log("Image upload error:", error);
      return null;
    }
  };

  return { uploadImage };
};