import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  ArrowRight, 
  CheckCircle2, 
  Rss, 
  Globe2,
  ShieldCheck,
  Award
} from 'lucide-react';
import { CATEGORIES } from '../../data/mockArticles';
import { useToast } from '../../context/ToastContext';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { addToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Please enter a valid email address', 'info');
      return;
    }
    setIsSubscribed(true);
    addToast('Subscribed to The Horizon Daily Briefing', 'success');
    setEmail('');
  };

  return (
    <footer className="bg-zinc-950 text-zinc-300 border-t border-zinc-800 transition-colors mt-20">
      {/* Newsletter Section */}
      <div className="border-b border-zinc-800/80 bg-zinc-900/60 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center lg:text-left">
            <span className="text-[11px] font-mono tracking-widest text-red-500 uppercase font-semibold">
              The Daily Intelligence Briefing
            </span>
            <h3 className="font-serif-headline text-2xl sm:text-3xl font-bold text-white mt-1 mb-2">
              Frontier Thinking in Your Inbox Every Morning
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Curated analyses of technological shifts, macroeconomic turning points, and cultural essays. Zero spam, uncompromised signal.
            </p>
          </div>

          <div className="w-full max-w-md">
            {isSubscribed ? (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-950/60 border border-emerald-800/80 text-emerald-300 text-sm animate-in fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>You are subscribed. Watch your inbox tomorrow at 6:00 AM UTC.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-grow">
                  <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full pl-10 pr-4 py-3 bg-zinc-800/80 border border-zinc-700/80 rounded-xl text-white placeholder-zinc-500 text-sm focus:outline-hidden focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shrink-0 shadow-lg shadow-red-900/30"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
            <p className="text-[11px] text-zinc-500 mt-2 text-center lg:text-left">
              By subscribing you agree to our Terms of Service &amp; Privacy Policy. One-click unsubscribe.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link to="/" className="inline-block mb-3">
              <h2 className="font-serif-headline text-2xl font-black tracking-tight text-white">
                THE HORIZON
              </h2>
              <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase block">
                Independent Editorial Journal
              </span>
            </Link>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6 max-w-sm">
              Dedicated to rigorous journalism, investigative depth, and elegant visual storytelling across frontiers of science, society, and human ambition.
            </p>

            <div className="flex items-center gap-3 text-zinc-400">
              <a href="#twitter" onClick={(e) => { e.preventDefault(); alert("Follow @TheHorizonJournal on X / Twitter"); }} className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 hover:text-white transition-colors" aria-label="Twitter">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#linkedin" onClick={(e) => { e.preventDefault(); alert("The Horizon on LinkedIn"); }} className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 hover:text-white transition-colors" aria-label="LinkedIn">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>
              <a href="#github" onClick={(e) => { e.preventDefault(); alert("Source repository: Modern News & Digital Magazine Platform"); }} className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 hover:text-white transition-colors" aria-label="GitHub">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                </svg>
              </a>
              <a href="#rss" onClick={(e) => { e.preventDefault(); alert("RSS Feed available at /feed.xml"); }} className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 hover:text-white transition-colors" aria-label="RSS Feed">
                <Rss className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-white mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Front Page</Link>
              </li>
              <li>
                <Link to="/search" className="hover:text-white transition-colors">Search Archive</Link>
              </li>
              <li>
                <Link to="/bookmarks" className="hover:text-white transition-colors">Saved Stories</Link>
              </li>
              <li>
                <Link to="/preferences" className="hover:text-white transition-colors">Reading Preferences</Link>
              </li>
            </ul>
          </div>

          {/* Categories Links */}
          <div>
            <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-white mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {CATEGORIES.slice(0, 5).map(cat => (
                <li key={cat.id}>
                  <Link to={`/category/${cat.id}`} className="hover:text-white transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Standards */}
          <div>
            <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-white mb-4">
              Journalism
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-400">
              <li>
                <a href="#about" onClick={(e) => { e.preventDefault(); alert("The Horizon is an independent digital news and magazine platform."); }} className="hover:text-white transition-colors">About Us</a>
              </li>
              <li>
                <a href="#standards" onClick={(e) => { e.preventDefault(); alert("Our editorial standards mandate strict fact-checking and primary source verification."); }} className="hover:text-white transition-colors">Editorial Code</a>
              </li>
              <li>
                <a href="#privacy" onClick={(e) => { e.preventDefault(); alert("We respect reader privacy: zero third-party behavioral trackers."); }} className="hover:text-white transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => { e.preventDefault(); alert("Contact our newsroom: newsroom@thehorizonjournal.com"); }} className="hover:text-white transition-colors">Contact Editors</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 mt-10 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-mono">
          <div>
            © 2026 THE HORIZON PUBLISHING GROUP. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Powered by React &amp; Tailwind CSS</span>
            <span>Local Storage Enabled</span>
            <span>Accessibility Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
