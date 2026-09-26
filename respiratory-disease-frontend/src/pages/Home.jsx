import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaLungs, FaHeartbeat, FaRobot, FaFileMedicalAlt } from "react-icons/fa";

export default function Home() {
  const features = [
    {
      icon: <FaLungs size={40} className="mx-auto text-pink-400 mb-3" />,
      title: "Real-Time Monitoring",
      desc: "Capture lung and heart sounds instantly using a smart stethoscope connected to your device.",
    },
    {
      icon: <FaRobot size={40} className="mx-auto text-green-400 mb-3" />,
      title: "AI-Powered Detection",
      desc: "Detect wheezes, crackles, arrhythmias and more using deep learning on respiratory sound datasets.",
    },
    {
      icon: <FaFileMedicalAlt size={40} className="mx-auto text-yellow-400 mb-3" />,
      title: "Accessible Reports",
      desc: "View diagnosis results with confidence levels and store patient records securely for reference.",
    },
    {
      icon: <FaHeartbeat size={40} className="mx-auto text-indigo-900 mb-3" />,
      title: "Early Alerts",
      desc: "Receive notifications if abnormal patterns are detected in lung or heart sounds for faster intervention.",
    },
  ];

  const workflow = [
    {
      step: "1",
      title: "Sound Acquisition",
      desc: "Record lung and heart sounds using a digital stethoscope connected to ESP32 microcontroller.",
    },
    {
      step: "2",
      title: "Audio Processing",
      desc: "Preprocess audio with Python and Librosa to extract features like MFCCs, spectrograms, and frequency patterns.",
    },
    {
      step: "3",
      title: "AI Analysis",
      desc: "Feed the processed features into a trained neural network using TensorFlow/Keras to detect abnormalities.",
    },
    {
      step: "4",
      title: "Results & Reports",
      desc: "Display detection results with confidence levels, generate downloadable patient reports, and store history for future reference.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-700 to-indigo-700 text-white px-6 py-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-yellow-300">
          Smart Stethoscope Health Monitor
        </h1>
        <p className="text-lg md:text-xl text-pink-100 mb-6">
          Detect respiratory and cardiovascular diseases early with real-time audio analysis powered by AI.
        </p>
        <Link
          to="/upload"
          className="inline-block mt-4 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:from-green-500 hover:to-blue-600 transition-transform transform hover:scale-105"
        >
          Start Diagnosis
        </Link>
      </motion.div>

      {/* Feature Section */}
      <div className="max-w-6xl mx-auto mt-20 grid md:grid-cols-4 gap-8 text-center">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            className="bg-white/20 p-6 rounded-2xl shadow-xl hover:bg-white/30 transition"
          >
            {f.icon}
            <h3 className="text-xl font-bold mb-2 text-gradient-to-r from-pink-400 to-yellow-300">{f.title}</h3>
            <p className="text-indigo-100 text-sm">{f.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Workflow Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto mt-24 text-center"
      >
        <h2 className="text-3xl font-bold mb-8 text-yellow-300">How It Works</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {workflow.map((w) => (
            <motion.div
              key={w.step}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: parseInt(w.step) * 0.2 }}
              className="bg-white/20 p-6 rounded-xl shadow-lg text-left"
            >
              <div className="text-pink-300 font-bold text-2xl mb-2">{w.step}</div>
              <h3 className="text-xl font-semibold mb-2">{w.title}</h3>
              <p className="text-indigo-100">{w.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Footer */}
      <div className="mt-20 text-center text-sm text-pink-200">
        &copy; 2025 Smart Health Monitor | Developed for respiratory diagnostics education and awareness.
      </div>
    </div>
  );
}
