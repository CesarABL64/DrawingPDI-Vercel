import { useState } from 'react';
import HomePage from './pages/HomePage';
import AnalysisPage from './pages/AnalysisPage';

function App() {
  const [analysisResult, setAnalysisResult] = useState(null);

  if (analysisResult) {
    return (
      <AnalysisPage
        result={analysisResult}
        onReset={() => setAnalysisResult(null)}
      />
    );
  }

  return <HomePage onAnalysisStart={setAnalysisResult} />;
}

export default App;