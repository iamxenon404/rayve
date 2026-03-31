import Link from "next/link";

export default function EditorialBento() {
  return (
    <section className="max-w-7xl mx-auto px-6 pb-24">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-auto md:h-[600px]">
        {/* Visual Tile */}
        <div className="md:col-span-8 relative rounded-3xl overflow-hidden bg-zinc-900 group min-h-[400px]">
          <div className="absolute inset-0 bg-[url('/lookbook.jpg')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          <div className="absolute bottom-10 left-10">
            <h3 className="text-3xl font-display font-bold uppercase tracking-tighter mb-4">The Lab: Phase 1</h3>
            <Link href="/the-lab" className="bg-white text-black px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-brand-accent transition-colors">
              Enter Lab
            </Link>
          </div>
        </div>
        {/* Info Tile */}
        <div className="md:col-span-4 bg-zinc-900 rounded-3xl p-10 flex flex-col justify-between border border-white/5">
          <div className="space-y-6">
            <div className="w-12 h-1 bg-brand-accent" />
            <h4 className="text-xl font-bold uppercase tracking-tight">Built for the Void</h4>
            <p className="text-zinc-500 text-sm leading-relaxed uppercase tracking-tight">
              Experimental silhouettes. Small batch runs. Each piece is a statement in structural design.
            </p>
          </div>
          <p className="text-[8px] text-zinc-600 uppercase tracking-[0.3em]">Studio 001 // Archive</p>
        </div>
      </div>
    </section>
  );
}