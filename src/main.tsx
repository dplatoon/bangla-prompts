import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const root = createRoot(document.getElementById("root")!);
root.render(<App />);

// Dispatch event for prerender to capture fully rendered HTML
// This signals that the React app has finished initial rendering
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    // Small delay to ensure React hydration is complete
    setTimeout(() => {
      document.dispatchEvent(new Event('app-rendered'));
    }, 100);
  });
}
