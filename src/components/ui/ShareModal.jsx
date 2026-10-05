import React, { useState } from 'react';
import { X, Copy, Check, Share2, MessageCircle } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export default function ShareModal({ isOpen, onClose, article }) {
  const { addToast } = useToast();
  const [copied, setCopied] = useState(false);

  if (!isOpen || !article) return null;

  const currentUrl = window.location.href;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    addToast('Article link copied to clipboard', 'share');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(`"${article.title}" via The Horizon`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(currentUrl)}`, '_blank');
  };

  const handleShareLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`, '_blank');
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`Check out this story: ${article.title} - ${currentUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white dark:bg-[#111726] rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-red-600" />
            <h3 className="font-serif-headline text-lg font-bold text-zinc-900 dark:text-white">
              Share Dispatch
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <h4 className="font-serif-headline text-base font-bold text-zinc-900 dark:text-white line-clamp-2 mb-1">
              {article.title}
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              By {article.author?.name} • {article.readTime}
            </p>
          </div>

          {/* Social share options */}
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={handleShareTwitter}
              className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors text-xs font-semibold text-zinc-700 dark:text-zinc-300"
            >
              <svg className="w-4 h-4 fill-current text-zinc-800 dark:text-zinc-200" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <span>X / Twitter</span>
            </button>
            <button
              onClick={handleShareLinkedIn}
              className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors text-xs font-semibold text-zinc-700 dark:text-zinc-300"
            >
              <svg className="w-4 h-4 fill-current text-blue-600" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
              <span>LinkedIn</span>
            </button>
            <button
              onClick={handleShareWhatsApp}
              className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors text-xs font-semibold text-zinc-700 dark:text-zinc-300"
            >
              <MessageCircle className="w-4 h-4 text-emerald-500" />
              <span>WhatsApp</span>
            </button>
          </div>

          {/* Copy Direct URL */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Direct Article Link
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={currentUrl}
                className="flex-grow px-3 py-2 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 focus:outline-hidden"
              />
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 rounded-lg text-xs font-semibold transition-colors shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
