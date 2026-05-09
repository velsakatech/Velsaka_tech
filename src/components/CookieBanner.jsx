import { useEffect, useState } from "react";
import { Cookie, X } from "lucide-react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookiesAccepted");
    if (!accepted) setVisible(true);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setVisible(false);
  };

  const rejectCookies = () => {
    localStorage.setItem("cookiesAccepted", "false");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-0 w-full z-50 flex justify-center px-4">
      
      <div className="w-full max-w-2xl 
        bg-slate-900/80 backdrop-blur-md 
        border border-white/10 
        rounded-xl shadow-xl 
        p-4 flex flex-col sm:flex-row items-center justify-between gap-4">

        {/* Text */}
        <div className="flex items-center gap-2 text-center sm:text-left">
          <Cookie className="w-4 h-4 text-slate-300" />
          <p className="text-sm text-slate-300">
            We use cookies to improve your experience and performance.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">

          <button
            onClick={rejectCookies}
            className="px-4 py-1.5 text-xs rounded-md 
            text-slate-300 border border-white/10 
            hover:bg-white/5 transition flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            Reject
          </button>

          <button
            onClick={acceptCookies}
            className="px-4 py-1.5 text-xs rounded-md 
            bg-gradient-to-r from-indigo-600 to-blue-600 
            text-white hover:from-indigo-500 hover:to-blue-500 
            transition shadow-md"
          >
            Accept
          </button>

        </div>
      </div>
    </div>
  );
}