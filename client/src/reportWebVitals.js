// src/reportWebVitals.js
import { onCLS, onFID, onLCP, onTTFB, onINP } from 'web-vitals';

export function reportWebVitals(onPerfEntry) {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    onCLS(onPerfEntry);
    onFID(onPerfEntry);
    onLCP(onPerfEntry);
    onTTFB(onPerfEntry);
    onINP(onPerfEntry);
  }
}
