import os
import numpy as np
import librosa
import tensorflow as tf
import joblib
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load model and label encoder
model = tf.keras.models.load_model("model.h5")
encoder = joblib.load("label_encoder.pkl")
class_names = list(encoder.classes_)

print("✅ Loaded model and encoder!")
print("Classes:", class_names)
print("Model input shape:", model.input_shape)

def extract_features(file_path, max_len=128):
    audio, sr = librosa.load(file_path, sr=None)  # same as training
    mfccs = librosa.feature.mfcc(y=audio, sr=sr, n_mfcc=40)
    if mfccs.shape[1] < max_len:
        mfccs = np.pad(mfccs, ((0,0),(0,max_len-mfccs.shape[1])), mode='constant')
    else:
        mfccs = mfccs[:, :max_len]
    return mfccs

@app.route("/predict-audio", methods=["POST"])
def predict_audio():
    try:
        if "audio" not in request.files:
            return jsonify({"error": "No audio file uploaded"}), 400
        
        audio_file = request.files["audio"]
        name = request.form.get("name", "Unknown")
        age = request.form.get("age", "N/A")

        # Save temporarily
        audio_path = "temp.wav"
        audio_file.save(audio_path)

        # Extract features (same as training)
        mfccs = extract_features(audio_path, max_len=128)

        # Reshape to match model input
        input_data = mfccs.reshape(1, 40, 128, 1)

        # Predict
        prediction = model.predict(input_data)
        predicted_index = int(np.argmax(prediction))
        confidence = float(np.max(prediction)) * 100
        status = class_names[predicted_index]

        return jsonify({
            "status": status,
            "confidence": round(confidence, 2),
            "name": name,
            "age": age
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
