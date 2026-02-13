from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import pandas as pd
import numpy as np
import io

from app.model_loader import load_model

app = FastAPI(title="Exoplanet Detection API", version="1.0.0")

# CORS (for frontend integration)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # later restrict to frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model
model, threshold = load_model()

@app.get("/")
def root():
    return {"status": "Backend running 🚀"}

def _ensure_feature_count(X: np.ndarray) -> np.ndarray:
    expected = getattr(model, "n_features_in_", None)
    if expected is None:
        return X

    if X.shape[1] > expected:
        return X[:, :expected]

    if X.shape[1] < expected:
        pad = expected - X.shape[1]
        return np.hstack([X, np.zeros((X.shape[0], pad))])

    return X


# ==============================
# CSV FILE PREDICTION ENDPOINT
# ==============================
@app.post("/predict-csv")
async def predict_csv(file: UploadFile = File(...)):
    content = await file.read()
    if not content:
        raise HTTPException(status_code=400, detail="Empty CSV")

    try:
        df = pd.read_csv(io.BytesIO(content))
    except Exception:
        df = pd.read_csv(io.BytesIO(content), header=None)

    df = df.apply(pd.to_numeric, errors="coerce").fillna(0.0)

    X = df.to_numpy(dtype=float)
    X = _ensure_feature_count(X)

    try:
        proba = model.predict_proba(X)[:, 1]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    labels = (proba >= threshold).astype(int)

    out = df.copy()
    out["pred_probability"] = proba
    out["pred_label"] = labels

    stream = io.StringIO()
    out.to_csv(stream, index=False)
    stream.seek(0)

    filename = f"predictions_{file.filename}"

    return StreamingResponse(
        iter([stream.getvalue()]),
        media_type="text/csv",
        headers={
            "Content-Disposition": f'attachment; filename="{filename}"'
        }
    )
