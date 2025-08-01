import { Hash, Sparkles } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import toast from "react-hot-toast";
import Markdown from "react-markdown";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

function BlogTitles() {
  const blogCategories = ["Technology", "Health", "Lifestyle", "Finance", "Travel", "Food", "Education", "Entertainment", "Fashion", "Sports"];

  const [selectedCategory, setSelectedCategory] = useState(blogCategories[0]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const {getToken} = useAuth();
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const prompt = `Generate a blog title for the keyword ${input} in the category of ${selectedCategory}.`;
      const {data} = await axios.post("/api/ai/generate-blog-title", { prompt }, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      if(data.success) {
        setContent(data.content);
      }
    } catch (e) {
      toast.error("Failed to generate title");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ type: "spring", stiffness: 80, damping: 18 }}
        className="h-full mt-20 overscroll-y p-6 flex items-start flex-wrap gap-4 text-slate-70"
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
            <Sparkles className="w-6 text-[#8E37EB]" />
            <h1 className="text-xl font-semibold">AI Title Generator</h1>
          </div>
          <p className="mt-6 text-sm font-medium">Blog Topic</p>
          <input
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
            placeholder="Enter blog topic"
            required
          />
          <p className="mt-4 text-sm font-medium">Blog Category</p>
          <div className="mt-3 flex gap-3 flex-wrap sm:max-w-9/11">
            {blogCategories.map((item, index) => (
              <motion.span
                key={index}
                onClick={() => setSelectedCategory(item)}
                className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${
                  selectedCategory === item
                    ? "bg-purple-50 text-purple-700"
                    : "border-gray-300 text-gray-500"
                }`}
                whileHover={{ backgroundColor: "#f3f4f6" }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {item}
              </motion.span>
            ))}
          </div>
          <br />
          <motion.button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#C341F6] to-[#8E37EB] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer"
            whileHover={{
              scale: 1.01,
              boxShadow: "0 2px 8px rgba(195,65,246,0.10)",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
          >
            {loading ? <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
            : <Hash className="w-5" />}
            Generate Titles
          </motion.button>
        </motion.form>
        {/* right column */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.18 }}
          className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 flex flex-col min-h-96"
        >
          <div className="flex items-center gap-3">
            <Hash className="w-6 text-[#8E37EB]" />
            <h1 className="text-xl font-semibold">Generated Titles</h1>
          </div>
          {!content ? (<div className="flex flex-1 justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <Hash className="w-9 h-9 text-gray-400" />
              <p>Enter a topic to generate blog titles</p>
            </div>
          </div>): (
            <div data-lenis-prevent className="mt-3 h-full overflow-y-scroll text-sm text-slate-600">
              <div className="reset-tw">
                <Markdown>{content}</Markdown>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default BlogTitles