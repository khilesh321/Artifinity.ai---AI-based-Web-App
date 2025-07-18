import { Upload, Sparkles, FileText } from "lucide-react";
import { useState } from "react";

function ReviewResume() {
  const [resume, setResume] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResume(file);
      setFileName(file.name);
    }
  };

  return (
    <div className="h-full overscroll-y p-6 flex items-start flex-wrap gap-4 text-slate-70">
      {/* left column */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // Handle form submission
        }}
        className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-green-600"></Sparkles>
          <h1 className="text-xl font-semibold">Review Resume</h1>
        </div>

        <p className="mt-6 text-sm font-medium">Upload Resume</p>
        <div className="mt-2 flex justify-center items-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100"
          >
            <div className="flex flex-col justify-center items-center pt-5 pb-6">
              <Upload className="w-10 h-10 mb-3 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and
                drop
              </p>
              <p className="text-xs text-gray-500">PDF, DOC, DOCX (MAX. 5MB)</p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>

        {fileName && (
          <div className="mt-4 text-sm text-gray-600">
            <strong>Selected file:</strong> {fileName}
          </div>
        )}

        <button className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-green-500 to-green-700 text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer">
          <FileText className="w-5" />
          Review Resume
        </button>
      </form>
      {/* right column */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 flex flex-col min-h-96 max-h-[600px]">
        <div className="flex items-center gap-3">
          <FileText className="w-6 text-green-600"></FileText>
          <h1 className="text-xl font-semibold">Result</h1>
        </div>

        <div className="flex flex-1 justify-center items-center">
          <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
            <Upload className="w-9 h-9 text-gray-400" />
            <p>Upload your resume to see the review</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewResume;