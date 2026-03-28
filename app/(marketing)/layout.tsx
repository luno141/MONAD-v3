export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-[#050510] text-[#eef3ff] flex flex-col font-mono selection:bg-[#00FFFF] selection:text-black">
      {/* Global scanlines overlay */}
      <div className="scanlines" />
      
      {/* Content wrapper taking into account the fixed navbar later */}
      <div className="relative z-20 flex flex-col flex-grow">
        {children}
      </div>
    </div>
  );
}
