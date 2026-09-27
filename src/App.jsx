import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Scanner from './components/Scanner';
import ResultPanel from './components/ResultPanel';
import VerificationLog from './components/VerificationLog';
import Particles from './components/Particles';
import { loadStudentData } from './utils/csvParser';
import { warmUpSpeech } from './utils/speech';
import { useVerification } from './hooks/useVerification';
import './App.css';

export default function App() {
  const [studentDB, setStudentDB] = useState({});
  const [loading, setLoading] = useState(true);

  const { result, verifiedSet, log, verify } = useVerification(studentDB);

  // Load CSV data on mount
  useEffect(() => {
    async function init() {
      try {
        const data = await loadStudentData();
        setStudentDB(data);
        console.log(`✅ Loaded ${Object.keys(data).length} students`);
      } catch (err) {
        console.error('Failed to load student data:', err);
      }
      setLoading(false);
    }

    warmUpSpeech();
    init();
  }, []);

  // Stable callback for scanner
  const handleScan = useCallback((code) => {
    verify(code);
  }, [verify]);

  const totalStudents = Object.keys(studentDB).length;

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading student database...</p>
      </div>
    );
  }

  return (
    <>
      <Particles />
      <Header total={totalStudents} verified={verifiedSet.size} />
      <main id="main-content">
        <Scanner onScan={handleScan} />
        <ResultPanel result={result} />
      </main>
      <VerificationLog log={log} />
    </>
  );
}
