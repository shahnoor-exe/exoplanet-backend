import os
import joblib

def load_model():
    root = os.path.dirname(os.path.dirname(__file__))
    model_path = os.path.join(root, "models", "exoplanet_model.pkl")
    obj = joblib.load(model_path)

    if isinstance(obj, dict) and "model" in obj:
        return obj["model"], obj.get("threshold", 0.5)

    return obj, 0.5
