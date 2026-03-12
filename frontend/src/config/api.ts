/**
 * Centralized API configuration.
 * Reads the base URL from the VITE_API_BASE_URL environment variable
 * and falls back to localhost for local development.
 */

const rawBase = import.meta.env.VITE_API_BASE_URL as string | undefined;

export const API_BASE_URL: string = rawBase
  ? rawBase.replace(/\/+$/, '')           // trim trailing slashes
  : 'http://localhost:8000';              // fallback for local dev

export default API_BASE_URL;
