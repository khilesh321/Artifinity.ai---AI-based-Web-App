import { Hash, Sparkles } from "lucide-react"
import { useState } from "react"

function BlogTitles() {
  const blogCategories = ["Technology", "Health", "Lifestyle", "Finance", "Travel", "Food", "Education", "Entertainment", "Fashion", "Sports"];

  const [selectedCategory, setSelectedCategory] = useState(blogCategories[0]);
  const [input, setInput] = useState("");
  return (
    <div className="h-full overscroll-y p-6 flex items-start flex-wrap gap-4 text-slate-70">
      {/* left column */}
      <form onSubmit={(e) => {
          e.preventDefault();
          // Handle form submission
        }} className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#8E37EB]"></Sparkles>
          <h1 className="text-xl font-semibold">AI Title Generator</h1>
        </div>
        
        <p className="mt-6 text-sm font-medium">Blog Topic</p>

        <input onChange={(e) => setInput(e.target.value)} type="text" className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300" placeholder="Enter blog topic" required />

        <p className="mt-4 text-sm font-medium">Blog Category</p>
        
        <div className="mt-3 flex gap-3 flex-wrap sm:max-w-9/11">
          {blogCategories.map((item, index) => (
            <span onClick={() => setSelectedCategory(item)} key={index} className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${selectedCategory === item ? "bg-purple-50 text-purple-700" : "border-gray-300 text-gray-500"}`}>{item}</span>
          ))}
        </div>
        <br />

        <button className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#C341F6] to-[#8E37EB] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer">
          <Hash className="w-5"/>
          Generate Titles
        </button>
      </form>
      {/* right column */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 flex flex-col min-h-96">
        <div className="flex items-center gap-3">
          <Hash className="w-6 text-[#8E37EB]"></Hash>
          <h1 className="text-xl font-semibold">Generated Titles</h1>
        </div>

        <div className="flex flex-1 justify-center items-center">
          <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
            <Hash className="w-9 h-9 text-gray-400" />
            <p>Enter a topic to generate blog titles</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogTitles