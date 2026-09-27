import { useState, useCallback, useRef } from 'react';
import { speak } from '../utils/speech';

/**
 * Custom hook for student verification logic.
 * Manages verification state, debouncing, and voice announcements.
 */
export function useVerification(studentDB) {
  const [result, setResult] = useState({ state: 'idle', student: null, regNo: '' });
  const [verifiedSet, setVerifiedSet] = useState(new Set());
  const [log, setLog] = useState([]);
  const isProcessingRef = useRef(false);
  const lastCodeRef = useRef('');
  const lastTimeRef = useRef(0);

  const verify = useCallback((code) => {
    const now = Date.now();

    // Debounce: same code within 3 seconds
    if (code === lastCodeRef.current && (now - lastTimeRef.current) < 3000) return;
    // Debounce: any scan within processing window
    if (isProcessingRef.current) return;

    isProcessingRef.current = true;
    lastCodeRef.current = code;
    lastTimeRef.current = now;

    // Clean scanned code — extract reg number
    let regNo = code.trim().replace(/"/g, '');
    const regMatch = regNo.match(/\b(2026\d{4})\b/);
    if (regMatch) regNo = regMatch[1];

    const student = studentDB[regNo];

    if (!student) {
      setResult({ state: 'error', student: null, regNo });
      flashScreen('error');
      speak('Invalid registration number. Student not found.');
    } else if (verifiedSet.has(regNo)) {
      setResult({ state: 'already', student, regNo });
      speak(`${student.name} has already been verified.`);
    } else {
      setVerifiedSet(prev => {
        const next = new Set(prev);
        next.add(regNo);
        return next;
      });
      setResult({ state: 'verified', student, regNo });
      flashScreen('success');
      speak(`${student.name} is verified. Welcome to Avionics 2026 Session. All the best for your exam!`);

      const timeStr = new Date().toLocaleTimeString('en-IN', {
        hour: '2-digit', minute: '2-digit', second: '2-digit'
      });
      setLog(prev => [{ student, time: timeStr, status: 'success' }, ...prev]);
    }

    setTimeout(() => { isProcessingRef.current = false; }, 2000);
  }, [studentDB, verifiedSet]);

  return { result, verifiedSet, log, verify };
}

function flashScreen(type) {
  const overlay = document.createElement('div');
  overlay.className = `flash-overlay ${type}`;
  document.body.appendChild(overlay);
  setTimeout(() => overlay.remove(), 1000);
}
