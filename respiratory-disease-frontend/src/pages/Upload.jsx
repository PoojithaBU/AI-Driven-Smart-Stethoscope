import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !name || !age) {
      return alert("Please fill in all fields and select a file.");
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("age", age);
    formData.append("audio", file);

    try {
      const response = await fetch("http://localhost:5000/predict-audio", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        navigate("/result", {
          state: {
            status: result.status,
            confidence: result.confidence,
            name: result.name,
            age: result.age,
          },
        });
      } else {
        alert("Error: " + result.error);
      }
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute z-0 w-auto min-w-full min-h-full max-w-none object-cover"
      >
        <source src="/bg1-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Form Container */}
      <div className="relative z-10 w-full max-w-2xl p-8"> {/* increased max width and padding */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/90 rounded-2xl shadow-2xl p-10 backdrop-blur-md border border-white/20"
        >
          <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
            Patient Information & Audio Upload
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.input
              type="text"
              placeholder="Patient Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-6 py-4 border-2 border-indigo-400 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-900 font-medium shadow-lg hover:shadow-xl transition-all"
              whileFocus={{ scale: 1.03, boxShadow: "0 0 20px rgba(99,102,241,0.5)" }}
            />

            <motion.input
              type="number"
              placeholder="Patient Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-6 py-4 border-2 border-indigo-400 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-900 font-medium shadow-lg hover:shadow-xl transition-all"
              whileFocus={{ scale: 1.03, boxShadow: "0 0 20px rgba(99,102,241,0.5)" }}
            />

            <motion.input
              type="file"
              accept="audio/wav"
              onChange={handleChange}
              className="block w-full text-sm text-indigo-900 file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-purple-400 file:to-indigo-500 file:text-white hover:file:from-purple-500 hover:file:to-indigo-600 shadow-lg transition-all"
              whileTap={{ scale: 0.97 }}
            />

            {file && (
              <p className="text-indigo-800 text-center animate-pulse">
                Selected: <span className="font-semibold">{file.name}</span>
              </p>
            )}

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05, backgroundColor: "#6366f1" }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-4 px-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all"
            >
              Upload & Diagnose
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
