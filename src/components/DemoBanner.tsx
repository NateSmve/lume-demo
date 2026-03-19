export default function DemoBanner() {
  return (
    <div className="bg-amber-900/30 border-b border-amber-800/40 text-amber-200 text-xs text-center py-2 px-4">
      <span className="font-semibold">[DEMO]</span> This is a fictional brand
      built as a portfolio piece by{" "}
      <a
        href="https://smve.cloud"
        className="underline hover:text-amber-100 transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        SMVE Web Dev
      </a>
      . No real products are sold here.
    </div>
  );
}
