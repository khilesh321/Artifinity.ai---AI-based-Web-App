import { Edit, Sparkles } from "lucide-react"
import { useState } from "react"

function WriteArticle() {
  const articleLength = [
    { label: "Short (500+ words)", value: 500 },
    { label: "Medium (1000+ words)", value: 1000 },
    { label: "Long (1500+ words)", value: 1500 },
  ]

  const [selectedLength, setSelectedLength] = useState(articleLength[0]);
  const [input, setInput] = useState("");
  return (
    <div className="h-full overscroll-y p-6 flex items-start flex-wrap gap-4 text-slate-70">
      {/* left column */}
      <form onSubmit={(e) => {
          e.preventDefault();
          // Handle form submission
        }} className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#4A7AFF]"></Sparkles>
          <h1 className="text-xl font-semibold">Article Configuration</h1>
        </div>
        
        <p className="mt-6 text-sm font-medium">Article Topic</p>

        <input onChange={(e) => setInput(e.target.value)} type="text" className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300" placeholder="Enter article topic" required />

        <p className="mt-4 text-sm font-medium">Article Content</p>
        
        <div className="mt-3 flex gap-3 flex-wrap sm:max-w-9/11">
          {articleLength.map((item, index) => (
            <span onClick={() => setSelectedLength(item)} key={index} className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${selectedLength.value === item.value ? "bg-blue-50 text-blue-700" : "border-gray-300 text-gray-500"}`}>{item.label}</span>
          ))}
        </div>
        <br />

        <button className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#226BFF] to-[#65ADFF] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer">
          <Edit className="w-5"/>
          Generate Article
        </button>
      </form>
      {/* right column */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 flex flex-col min-h-96 max-h-[600px]">
        <div className="flex items-center gap-3">
          <Edit className="w-6 text-[#4A7AFF]"></Edit>
          <h1 className="text-xl font-semibold">Generated Article</h1>
        </div>

        <div className="flex flex-1 justify-center items-center">
          <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
            <Edit className="w-9 h-9 text-gray-400" />
            <p>Enter a topic to generate an article</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WriteArticle