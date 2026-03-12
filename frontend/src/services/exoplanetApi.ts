import { API_BASE_URL } from '../config/api';

/**
 * GET /  —  Health check.
 * Returns { status: string }
 */
export async function checkBackendHealth(): Promise<{
  online: boolean;
  status: string;
}> {
  try {
    const res = await fetch(`${API_BASE_URL}/`, { method: 'GET' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return { online: true, status: data.status ?? 'OK' };
  } catch {
    return { online: false, status: 'Offline' };
  }
}

/**
 * POST /predict-csv  —  Upload a CSV and receive predictions.
 * @param file  The .csv File to upload
 * @returns     The raw Blob (text/csv) returned by the backend
 */
export async function predictCsv(file: File): Promise<Blob> {
  const form = new FormData();
  form.append('file', file);

  const res = await fetch(`${API_BASE_URL}/predict-csv`, {
    method: 'POST',
    body: form,
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => 'Unknown error');
    throw new Error(detail || `Prediction failed (HTTP ${res.status})`);
  }

  return res.blob();
}

/**
 * Parse the prediction CSV blob into structured rows.
 */
export interface PredictionRow {
  pred_probability: number;
  pred_label: number;
}

export function parsePredictionCsv(text: string): PredictionRow[] {
  const lines = text.trim().split('\n');
  if (lines.length < 2) return [];

  const headers = lines[0].split(',');
  const probIdx = headers.indexOf('pred_probability');
  const labelIdx = headers.indexOf('pred_label');

  if (probIdx === -1 || labelIdx === -1) return [];

  return lines.slice(1).map(line => {
    const cols = line.split(',');
    return {
      pred_probability: parseFloat(cols[probIdx]),
      pred_label: parseInt(cols[labelIdx], 10),
    };
  });
}
