// GenerateImages.jsx
import { Image, Sparkles } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

function GenerateImages() {
  const imageStyles = [
    "Realistic",
    "Cartoon",
    "Anime",
    "Abstract",
    "Ghibli",
    "Cyberpunk",
    "Fantasy",
    "3D",
    "Pixel Art",
    "Low Poly",
  ];
  const [selectedStyle, setSelectedStyle] = useState(imageStyles[0]);
  const [input, setInput] = useState("");
  const [publish, setPublish] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setImageUrl("");
    try {
      const prompt = `Generate an image in ${selectedStyle} style: ${input}`;
      const { data } = await axios.post(
        "/api/ai/generate-image",
        {
          prompt,
          publish,
        },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );
      if (data.success) {
        setImageUrl(data.content);
      } else {
        toast.error(data.message || "Failed to generate image");
      }
    } catch (err) {
      toast.error(err.message || "Image generation failed");
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
        className="h-full overscroll-y p-6 flex items-start flex-wrap gap-4 text-slate-70"
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
            <Sparkles className="w-6 text-[#16A34A]" />
            <h1 className="text-xl font-semibold">Image Generation</h1>
          </div>
          <p className="mt-6 text-sm font-medium">Image Prompt</p>
          <input
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
            placeholder="Enter a prompt to generate an image"
            required
          />
          <p className="mt-4 text-sm font-medium">Image Style</p>
          <div className="mt-3 flex gap-3 flex-wrap sm:max-w-9/11">
            {imageStyles.map((item, index) => (
              <motion.span
                whileHover={{ backgroundColor: "#f3f4f6" }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ borderRadius: "9999px" }}
                onClick={() => setSelectedStyle(item)}
                key={index}
                className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${
                  selectedStyle === item
                    ? "bg-green-50 text-green-700"
                    : "border-gray-300 text-gray-500"
                }`}
              >
                {item}
              </motion.span>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-4">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={publish}
                onChange={() => setPublish(!publish)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-green-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
            <p className="text-sm font-medium">Make this image public</p>
          </div>
          <motion.button
            type="submit"
            disabled={loading || !input}
            whileHover={{
              scale: 1.01,
              boxShadow: "0 2px 8px rgba(0,173,37,0.10)",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#00AD25] to-[#04FF50] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer"
          >
            {loading ? (
              <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
            ) : (
              <Image className="w-5" />
            )}
            Generate Image
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
            <Image className="w-6 text-[#16A34A]" />
            <h1 className="text-xl font-semibold">Generated Image</h1>
          </div>
          {!imageUrl ? (
            <div className="flex flex-1 justify-center items-center">
              <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
                <Image className="w-9 h-9 text-gray-400" />
                <p>Enter a prompt to generate an image</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-1 justify-center items-center mt-3">
              <img
                src={imageUrl}
                alt="Generated"
                className="h-full w-full rounded-lg border border-gray-200 shadow"
                style={{ objectFit: "contain" }}
              />
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default GenerateImages;