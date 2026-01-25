import numpy as np

def preprocess_lightcurve(values: np.ndarray) -> np.ndarray:
    x = np.array(values, dtype=np.float32)

    # Normalize (z-score) like you did before
    mean = x.mean()
    std = x.std() + 1e-8
    x = (x - mean) / std

    # Model expects 2D (samples, features)
    return x.reshape(1, -1)
