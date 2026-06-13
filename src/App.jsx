

import { useEffect, useMemo, useRef, useState } from "react";

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      {children}
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const categories = ["All", "Essentials", "Denim", "Outerwear", "Accessories"];

  const products = useMemo(
    () => [
      {
        name: "Monogram Tee",
        category: "Essentials",
        price: "$68",
        img: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1000&q=80",
      },
      {
        name: "Straight Denim",
        category: "Denim",
        price: "$128",
        img: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1000&q=80",
      },
      {
        name: "Oversized Shirt",
        category: "Essentials",
        price: "$96",
        img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80",
      },
      {
        name: "Tailored Overcoat",
        category: "Outerwear",
        price: "$240",
        img: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80",
      },
      {
        name: "Leather Belt",
        category: "Accessories",
        price: "$54",
        img: "pr.jpg",
      },
      {
        name: "Fragrance Edit",
        category: "Accessories",
        price: "$88",
        img:  "/hero-look.jpg"
      },
    ],
    []
  );

  const filtered =
    category === "All" ? products : products.filter((p) => p.category === category);

  return (
    <div className="bg-[#0b0b0b] text-white overflow-x-hidden">
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 w-full z-[60] transition-all duration-500 ${
          scrolled
            ? "bg-black/85 backdrop-blur-md border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <a
            href="#hero"
            className="text-lg md:text-xl uppercase tracking-[0.45em] font-semibold"
          >
            Noir Atelier
          </a>

          <div className="hidden md:flex items-center gap-10 text-[10px] uppercase tracking-[0.35em] text-white/70">
            <a href="#collections" className="hover:text-white transition">
              Collections
            </a>
            <a href="#edit" className="hover:text-white transition">
              The Edit
            </a>
            <a href="#lookbook" className="hover:text-white transition">
              Lookbook
            </a>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-[10px] uppercase tracking-[0.35em] border border-white/15 px-4 py-2"
          >
            Menu
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden px-6 pb-6 flex flex-col gap-4 text-[10px] uppercase tracking-[0.35em] bg-black/95 border-t border-white/10">
            <a href="#collections" onClick={() => setMenuOpen(false)}>
              Collections
            </a>
            <a href="#edit" onClick={() => setMenuOpen(false)}>
              The Edit
            </a>
            <a href="#lookbook" onClick={() => setMenuOpen(false)}>
              Lookbook
            </a>
          </div>
        )}
      </nav>

      {/* HERO VIDEO */}
      <section id="hero" className="relative min-h-screen w-full overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/model.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/5 to-black/80" />

        <div className="relative z-10 min-h-screen max-w-7xl mx-auto px-6 pt-28 flex flex-col justify-center">
          <Reveal>
            <p className="text-[10px] md:text-xs uppercase tracking-[0.55em] text-white/55 mb-6">
              New Season / 2026
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="text-5xl md:text-8xl font-serif italic leading-[0.92] max-w-4xl">
              Minimal
              <br />
              luxury for the
              <br />
              modern man.
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="max-w-2xl mt-8 text-white/70 text-sm md:text-lg leading-relaxed">
              Elevated essentials, sharp tailoring, and monochrome confidence —
              a premium fashion experience designed to feel timeless.
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div className="flex flex-col md:flex-row gap-4 mt-10">
              <a
                href="#edit"
                className="bg-white text-black px-8 py-4 uppercase text-[10px] md:text-xs tracking-[0.35em] font-semibold hover:bg-white/80 transition text-center"
              >
                Shop The Edit
              </a>
              <a
                href="#lookbook"
                className="border border-white/35 px-8 py-4 uppercase text-[10px] md:text-xs tracking-[0.35em] font-semibold hover:bg-white hover:text-black transition text-center"
              >
                View Lookbook
              </a>
            </div>
          </Reveal>
        </div>
      </section>
       <section className="relative min-h-screen w-full overflow-hidden bg-black">
  <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
    {/* LEFT IMAGE */}
    <div className="relative min-h-[50vh] md:min-h-screen overflow-hidden">
      <img
        src="/left.jpg"
        alt="Look 1"
        className="w-full h-full object-cover object-center scale-100 hover:scale-105 transition duration-700 ease-out"
      />
      <div className="absolute inset-0 bg-black/15"></div>
    </div>

    {/* RIGHT IMAGE */}
    <div className="relative min-h-[50vh] md:min-h-screen overflow-hidden">
      <img
        src="/right.jpg"
        alt="Look 2"
        className="w-full h-full object-cover object-center scale-100 hover:scale-105 transition duration-700 ease-out"
      />
      <div className="absolute inset-0 bg-black/10"></div>
    </div>
  </div>

  {/* CENTER TEXT */}
  <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
    <div className="text-center text-white max-w-3xl">
      <p className="text-[10px] md:text-xs uppercase tracking-[0.55em] mb-5 text-white/70">
        New Season / 2026
      </p>

      <h1 className="text-5xl md:text-8xl font-serif italic leading-[0.92] mb-6">
        Modern
        <br />
        Essence
      </h1>

      <p className="max-w-xl mx-auto text-sm md:text-lg text-white/75 leading-relaxed mb-8">
        Minimal silhouettes, elevated textures, and an editorial mood designed to feel bold and refined.
      </p>

      <a
        href="#gallery"
        className="inline-block border border-white/50 px-8 py-4 uppercase text-[10px] md:text-xs tracking-[0.35em] font-semibold hover:bg-white hover:text-black transition"
      >
        Shop The Edit
      </a>
    </div>
  </div>
</section>

      {/* STRIP */}
      <section className="bg-[#f5f1ea] text-black border-b border-black/10">
        <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-5 gap-3 text-[10px] md:text-xs uppercase tracking-[0.45em] text-black/60">
          <div>Essentials</div>
          <div>Denim</div>
          <div>Outerwear</div>
          <div>Accessories</div>
          <div>Fragrance</div>
        </div>
      </section>

      {/* COLLECTIONS */}
      <section id="collections" className="py-24 md:py-32 bg-[#0b0b0b]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div>
              <p className="text-[10px] uppercase tracking-[0.55em] text-white/40 mb-4">
                The House
              </p>
              <h2 className="text-4xl md:text-6xl font-serif italic mb-6">
                Built on
                <br />
                restraint.
              </h2>
              <p className="text-white/65 leading-relaxed max-w-xl mb-8">
                Clean silhouettes, premium fabrics, and quiet confidence define
                a wardrobe that feels effortless, refined, and expensive.
              </p>

              <div className="space-y-5 max-w-md">
                {[
                  "Sharp basics for every day.",
                  "Premium textures with a minimal edge.",
                  "A monochrome language that never tries too hard.",
                ].map((txt) => (
                  <div key={txt} className="flex items-start gap-3">
                    <span className="mt-1 w-2 h-2 rounded-full bg-white/60" />
                    <p className="text-white/70 text-sm leading-relaxed">{txt}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={180}>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=900&q=80"
                className="w-full h-[340px] object-cover"
                alt="Editorial 1"
              />
              <img
                src="https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=80"
                className="w-full h-[340px] object-cover mt-10"
                alt="Editorial 2"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* EDIT */}
      <section id="edit" className="py-24 md:py-32 bg-[#f5f1ea] text-black">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <p className="text-[10px] uppercase tracking-[0.55em] text-black/35 mb-4">
                  The Edit
                </p>
                <h2 className="text-4xl md:text-6xl font-serif italic">
                  Defined by silhouette.
                </h2>
              </div>

              <div className="flex flex-wrap gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-4 py-2 uppercase text-[10px] tracking-[0.35em] border transition ${
                      category === cat
                        ? "bg-black text-white border-black"
                        : "border-black/15 hover:bg-black hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product, i) => (
              <Reveal key={product.name} delay={i * 100}>
                <div className="group">
                  <div className="relative overflow-hidden bg-black/5 aspect-[4/5]">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />
                    <span className="absolute top-4 left-4 bg-black/80 text-white text-[10px] uppercase tracking-[0.35em] px-3 py-1.5">
                      {product.category}
                    </span>
                  </div>

                  <div className="pt-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-medium">{product.name}</h3>
                        <p className="text-black/50 text-[10px] uppercase tracking-[0.35em] mt-2">
                          Premium fit
                        </p>
                      </div>
                      <span className="font-semibold">{product.price}</span>
                    </div>

                    <button className="mt-4 w-full border border-black/15 py-3 uppercase text-[10px] tracking-[0.35em] font-semibold hover:bg-black hover:text-white transition">
                      Add To Bag
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* LOOKBOOK */}
      <section id="lookbook" className="py-24 md:py-32 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
          <Reveal>
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80"
              className="w-full h-[680px] object-cover"
              alt="Lookbook"
            />
          </Reveal>

          <Reveal delay={180}>
            <div className="max-w-xl">
              <p className="text-[10px] uppercase tracking-[0.55em] text-white/40 mb-4">
                Lookbook
              </p>
              <h2 className="text-4xl md:text-6xl font-serif italic mb-6">
                Quiet power,
                <br />
                strong presence.
              </h2>
              <p className="text-white/65 leading-relaxed mb-8">
                A cinematic, monochrome fashion mood with full-screen imagery,
                refined spacing, and a premium shopping experience.
              </p>

              <div className="grid grid-cols-3 gap-3 mb-8">
                {["Editorial", "Minimal", "Premium"].map((x) => (
                  <div key={x} className="border border-white/10 px-4 py-5 text-center">
                    <p className="uppercase text-[10px] tracking-[0.35em] text-white/60">
                      {x}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <a
                  href="#edit"
                  className="bg-white text-black px-7 py-4 uppercase text-[10px] tracking-[0.35em] font-semibold hover:bg-white/80 transition"
                >
                  Shop Now
                </a>
                <a
                  href="#hero"
                  className="border border-white/20 px-7 py-4 uppercase text-[10px] tracking-[0.35em] font-semibold hover:bg-white hover:text-black transition"
                >
                  Back To Top
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="relative h-[85vh] md:h-[90vh] w-full overflow-hidden">
  <video
    autoPlay
    muted
    loop
    playsInline
    preload="auto"
    className="absolute inset-0 w-full h-full object-cover"
  >
    <source src="/model2.mp4" type="video/mp4" />
  </video>

  <div className="absolute inset-0 bg-black/35"></div>

  <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
    <div className="text-white max-w-3xl">
      <p className="text-[10px] md:text-xs uppercase tracking-[0.55em] text-white/70 mb-5">
        Campaign Film
      </p>

      <h2 className="text-4xl md:text-7xl font-serif italic leading-[0.95] mb-6">
        Motion in
        <br />
        monochrome.
      </h2>

      <p className="max-w-xl mx-auto text-sm md:text-lg text-white/75 leading-relaxed">
        A cinematic frame to close the collection — bold, minimal, and editorial.
      </p>
    </div>
  </div>
</section>

      {/* NEWSLETTER */}
      <section className="py-24 bg-[#f5f1ea] text-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.55em] text-black/35 mb-4">
              Members Only
            </p>
            <h2 className="text-4xl md:text-6xl font-serif italic mb-6">
              Join the list
            </h2>
            <p className="text-black/60 max-w-2xl mx-auto leading-relaxed mb-10">
              Get early access to new drops, private edits, and limited releases.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Subscribed ✅");
              }}
              className="max-w-xl mx-auto flex flex-col md:flex-row gap-3"
            >
              <input
                type="email"
                required
                placeholder="Email address"
                className="flex-1 px-5 py-4 bg-white border border-black/10 outline-none focus:ring-2 focus:ring-black/20"
              />
              <button className="bg-black text-white px-8 py-4 uppercase text-[10px] tracking-[0.35em] font-semibold hover:opacity-90 transition">
                Subscribe
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black border-t border-white/10 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-xs uppercase tracking-[0.45em]">
            Noir Atelier
          </p>
          <p className="text-white/30 text-xs">
            Premium fashion concept · inspired by minimal luxury
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;