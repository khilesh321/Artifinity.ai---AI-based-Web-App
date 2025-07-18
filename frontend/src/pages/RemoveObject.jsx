import { Upload, Sparkles, Wand } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function RemoveObject() {
  const [image, setImage] = useState(null);
  const [objectName, setObjectName] = useState("");

  return (
    <AnimatePresence>
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
          onSubmit={(e) => {
            e.preventDefault();
            // Handle form submission
          }}
          className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 text-[#DC2626]"></Sparkles>
            <h1 className="text-xl font-semibold">Remove Object</h1>
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
                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" onChange={(e) => setImage(e.target.files[0])} />
            </motion.label>
          </div>
    
          <p className="mt-6 text-sm font-medium">Object to remove</p>
          <input
              type="text"
              placeholder="e.g., person, car, tree"
              value={objectName}
              onChange={(e) => setObjectName(e.target.value)}
              className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
          />
    
          <motion.button
            whileHover={{ scale: 1.01, boxShadow: "0 2px 8px rgba(239,68,68,0.10)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#EF4444] to-[#DC2626] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer"
          >
            <Wand className="w-5"/>
            Remove Object
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
            <Wand className="w-6 text-[#DC2626]"></Wand>
            <h1 className="text-xl font-semibold">Result</h1>
          </div>
    
          <div className="flex flex-1 justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <Upload className="w-9 h-9 text-gray-400" />
              <p>Upload an image to see the result</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default RemoveObject