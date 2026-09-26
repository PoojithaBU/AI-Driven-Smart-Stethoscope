import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import ChatbotWidget from "../components/ChatbotWidget";

export default function Result() {
  const location = useLocation();
  const {
    status = "Normal",
    confidence = 95,
    name = "John Doe",
    age = "30",
  } = location.state || {};

  const isNormal = status.toLowerCase() === "normal";

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-700 to-purple-700 flex items-center justify-center px-6 relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white text-center text-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-indigo-700 mb-4">Diagnosis Result</h2>

        <p className="text-md font-medium text-gray-600 mb-2">
          Patient: <span className="font-semibold">{name}</span> | Age: <span className="font-semibold">{age}</span>
        </p>

        <motion.div
          className={`mt-6 mx-auto p-6 w-48 h-48 flex items-center justify-center rounded-full text-2xl font-bold ${
            isNormal ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {status}
        </motion.div>

        <p className="mt-4 text-lg text-gray-700">
          Confidence Score: <span className="font-semibold">{confidence}%</span>
        </p>

        <Link
          to="/upload"
          className="mt-8 inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full font-semibold transition"
        >
          Test Another File
        </Link>
      </motion.div>

      {/* 💬 Chatbot Floating Assistant */}
      <ChatbotWidget />
    </div>
  );
}
