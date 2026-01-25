import os
import joblib

def load_model():
    base_dir = os.path.dirname(os.path.dirname(__file__))  # project root
    model_path = os.path.join(base_dir, "models", "exoplanet_model.pkl")

    obj = joblib.load(model_path)

    # If saved as dict: {"model":..., "threshold":...}
    if isinstance(obj, dict) and "model" in obj:
        return obj["model"], obj.get("threshold", 0.5)

    # If saved as model only
    return obj, 0.5
