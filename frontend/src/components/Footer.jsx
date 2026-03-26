function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="section-shell flex flex-col gap-4 text-sm text-slate-500 dark:text-slate-400 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-slate-800 dark:text-slate-100">About Project</p>
          <p>AI Resume Analyzer is a polished frontend for ATS checks, AI rewrites, and export workflows.</p>
        </div>
        <p>Credits: Designed and built with React, Tailwind, Axios, and Framer Motion.</p>
      </div>
    </footer>
  );
}

export default Footer;
