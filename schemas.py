from pydantic import BaseModel
from typing import List

class LightCurveInput(BaseModel):
    flux: List[float]
