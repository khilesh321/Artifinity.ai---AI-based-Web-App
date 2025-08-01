import { Upload, Sparkles, FileText } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

function ReviewResume() {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!resume) {
      toast.error("Please upload a PDF resume.");
      return;
    }
    setLoading(true);
    setResult("");
    try {
      const formData = new FormData();
      formData.append("resume", resume);

      const { data } = await axios.post(
        "/api/ai/resume-review",
        formData,
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`
          }
        }
      );
      if (data.success && data.content) {
        setResult(data.content);
      } else {
        toast.error(data.message || "Failed to review resume");
      }
    } catch (err) {
      toast.error("Resume review failed");
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
            <Sparkles className="w-6 text-[#226BFF]" />
            <h1 className="text-xl font-semibold">Resume Review</h1>
          </div>
          <p className="mt-6 text-sm font-medium">Upload Resume (PDF)</p>
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
                  PDF only, max 5MB
                </p>
                {resume && (
                  <span className="mt-2 text-xs text-green-600">
                    {resume.name}
                  </span>
                )}
              </div>
              <input
                id="dropzone-file"
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => setResume(e.target.files[0])}
              />
            </motion.label>
          </div>
          <motion.button
            type="submit"
            disabled={loading || !resume}
            whileHover={{
              scale: 1.01,
              boxShadow: "0 2px 8px rgba(34,107,255,0.10)",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#226BFF] to-[#65ADFF] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer"
          >
            {loading ? (
              <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
            ) : (
              <FileText className="w-5" />
            )}
            Review Resume
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
            <FileText className="w-6 text-[#226BFF]" />
            <h1 className="text-xl font-semibold">Review Result</h1>
          </div>
          {!result ? (
            <div className="flex flex-1 justify-center items-center">
              <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
                <FileText className="w-9 h-9 text-gray-400" />
                <p>Upload a resume to get feedback</p>
              </div>
            </div>
          ) : (
            <div data-lenis-prevent className="flex flex-1 justify-center items-start overflow-y-auto">
              <div className="reset-tw w-full">
                <Markdown>{result}</Markdown>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default ReviewResume;