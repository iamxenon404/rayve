import Image from "next/image";

export default function TheLab() {
  return (
    <div className="pt-32 pb-20 bg-brand-black min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl mb-24">
          <span className="text-brand-accent text-xs font-bold uppercase tracking-[0.4em]">Philosophy</span>
          <h1 className="text-6xl md:text-8xl font-display font-bold uppercase tracking-tighter mt-4">
            The <span className="text-outline-white text-transparent">Lab</span>
          </h1>
          <p className="mt-8 text-zinc-400 leading-relaxed text-lg">
            Rayve is a multi-disciplinary design studio focused on the intersection of industrial utility and modern silhouettes. Every piece is engineered for the void.
          </p>
        </div>

        {/* Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 relative aspect-[4/5] bg-zinc-900 overflow-hidden">
            <Image src="/lab-1.jpg" alt="Process" fill className="object-cover grayscale hover:grayscale-0 transition duration-700" />
          </div>
          <div className="md:col-span-5 space-y-8 md:pl-12">
            <h3 className="text-2xl font-display font-bold uppercase">01. Materials</h3>
            <p className="text-zinc-500 text-sm leading-loose">
              We source heavyweight organic cottons and technical nylons from sustainable mills. Quality isn't a goal; it's the baseline.
            </p>
          </div>
        </div>

        {/* Reverse Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mt-32">
          <div className="md:col-span-5 order-2 md:order-1 space-y-8 md:pr-12 text-right">
            <h3 className="text-2xl font-display font-bold uppercase">02. Construction</h3>
            <p className="text-zinc-500 text-sm leading-loose">
              Double-stitched seams, reinforced stress points, and custom-developed hardware. Built to last through the noise.
            </p>
          </div>
          <div className="md:col-span-7 order-1 md:order-2 relative aspect-[4/5] bg-zinc-900 overflow-hidden">
            <Image src="/lab-2.jpg" alt="Craft" fill className="object-cover grayscale hover:grayscale-0 transition duration-700" />
          </div>
        </div>
      </div>
    </div>
  );
}