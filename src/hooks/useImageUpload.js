export const useImageUpload = () => {
    const cloudinaryKey = import.meta.env.VITE_CLOUDINARY_NAME;
    const uploadImage = async (file, preset = "profile") => {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", preset);
        formData.append("folder", "user_uploads"); 
  
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudinaryKey}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
  
        const data = await response.json();
        return data.secure_url;
      } catch (error) {
        console.log(error);
      }
    };
    return { uploadImage };
  };
  