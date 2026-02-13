import os
import joblib

def load_model():
    """
    Supports:
    1) bundle = {"model": model, "threshold": 0.5}
    2) plain model object saved directly
    """
    model_path = os.path.join(os.path.dirname(__file__), "..", "models", "exoplanet_model.pkl")
    model_path = os.path.abspath(model_path)

    obj = joblib.load(model_path)

    # Case 1: bundle dict
    if isinstance(obj, dict) and "model" in obj:
        model = obj["model"]
        threshold = float(obj.get("threshold", 0.5))
        return model, threshold

    # Case 2: plain model
    return obj, 0.5
