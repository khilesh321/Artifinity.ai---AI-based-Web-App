// RemoveBackground.jsx
import { Upload, Sparkles, Eraser } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

function RemoveBackground() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState("");
  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.error("Please upload an image.");
      return;
    }
    setLoading(true);
    setResultUrl("");
    try {
      const formData = new FormData();
      formData.append("image", image);

      const { data } = await axios.post(
        "/api/ai/remove-image-background",
        formData,
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`
          }
        }
      );
      if (data.success) {
        setResultUrl(data.content);
      } else {
        toast.error(data.message || "Failed to remove background");
      }
    } catch (err) {
      toast.error("Background removal failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ type: "spring", stiffness: 80, damping: 18 }}
        className="h-full mt-15 overscroll-y p-6 flex items-start flex-wrap gap-4 text-slate-70"
      >
        {/* left column */}
        <motion.form
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.1 }}
          onSubmit={onSubmitHandler}
          className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 text-[#EA580C]" />
            <h1 className="text-xl font-semibold">Remove Background</h1>
          </div>
          <p className="mt-6 text-sm font-medium">Upload Image</p>
          <div className="mt-2 flex justify-center items-center w-full">
            <motion.label
              whileHover={{ backgroundColor: "#f3f4f6" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{ borderRadius: "0.5rem" }}
              htmlFor="dropzone-file"
              className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100"
            >
              <div className="flex flex-col justify-center items-center pt-5 pb-6">
                <Upload className="w-10 h-10 mb-3 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF and other image formats
                </p>
                {image && (
                  <span className="mt-2 text-xs text-green-600">
                    {image.name}
                  </span>
                )}
              </div>
              <input
                id="dropzone-file"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </motion.label>
          </div>
          <motion.button
            type="submit"
            disabled={loading || !image}
            whileHover={{
              scale: 1.01,
              boxShadow: "0 2px 8px rgba(249,115,22,0.10)",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer"
          >
            {loading ? (
              <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
            ) : (
              <Eraser className="w-5" />
            )}
            Remove Background
          </motion.button>
        </motion.form>
        {/* right column */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.18 }}
          className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 flex flex-col min-h-96 max-h-[600px]"
        >
          <div className="flex items-center gap-3">
            <Eraser className="w-6 text-[#EA580C]" />
            <h1 className="text-xl font-semibold">Result</h1>
          </div>
          {!resultUrl ? (
            <div className="flex flex-1 justify-center items-center">
              <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
                <Upload className="w-9 h-9 text-gray-400" />
                <p>Upload an image to see the result</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-1 justify-center items-center">
              <img
                src={resultUrl}
                alt="No background"
                className="max-h-80 rounded-lg border border-gray-200 shadow"
                style={{ objectFit: "contain" }}
              />
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default RemoveBackground;