import { useEffect, useState } from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import { checkBackendHealth } from '../services/exoplanetApi';

const BackendStatus = () => {
  const [online, setOnline] = useState<boolean | null>(null);
  const [statusText, setStatusText] = useState('Checking...');

  const poll = async () => {
    const { online: isUp, status } = await checkBackendHealth();
    setOnline(isUp);
    setStatusText(status);
  };

  useEffect(() => {
    poll();
    const id = setInterval(poll, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-inter animate-fade-in">
      {online === null ? (
        <>
          <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
          <span className="text-yellow-300">Connecting...</span>
        </>
      ) : online ? (
        <>
          <Wifi className="w-3 h-3 text-emerald-400" />
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50" />
          <span className="text-emerald-300">{statusText}</span>
        </>
      ) : (
        <>
          <WifiOff className="w-3 h-3 text-red-400" />
          <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
          <span className="text-red-300">Backend Offline</span>
        </>
      )}
    </div>
  );
};

export default BackendStatus;
