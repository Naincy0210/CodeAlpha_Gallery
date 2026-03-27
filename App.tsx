/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Filter,
  LayoutGrid,
  Image as ImageIcon
} from 'lucide-react';

// --- Types ---

type Category = 'All' | 'Nature' | 'Architecture' | 'Minimal' | 'Vibrant';

interface GalleryImage {
  id: number;
  url: string;
  category: Category;
  title: string;
  description: string;
}

// --- Mock Data ---

const IMAGES: GalleryImage[] = [
  { id: 1, url: 'https://picsum.photos/seed/nature1/1200/800', category: 'Nature', title: 'Alpine Serenity', description: 'A quiet morning in the high mountains.' },
  { id: 2, url: 'https://picsum.photos/seed/arch1/1200/800', category: 'Architecture', title: 'Geometric Echo', description: 'Modern lines meeting the sky.' },
  { id: 3, url: 'https://picsum.photos/seed/min1/1200/800', category: 'Minimal', title: 'Quiet Space', description: 'The beauty of simplicity and light.' },
  { id: 4, url: 'https://picsum.photos/seed/vib1/1200/800', category: 'Vibrant', title: 'Neon Pulse', description: 'Energy captured in color.' },
  { id: 5, url: 'https://picsum.photos/seed/nature2/1200/800', category: 'Nature', title: 'Forest Whisper', description: 'Deep within the ancient woods.' },
  { id: 6, url: 'https://picsum.photos/seed/arch2/1200/800', category: 'Architecture', title: 'Urban Skeleton', description: 'The structural heart of the city.' },
  { id: 7, url: 'https://picsum.photos/seed/min2/1200/800', category: 'Minimal', title: 'Void', description: 'Exploring the absence of noise.' },
  { id: 8, url: 'https://picsum.photos/seed/vib2/1200/800', category: 'Vibrant', title: 'Chromatic Flow', description: 'Liquid colors in motion.' },
  { id: 9, url: 'https://picsum.photos/seed/nature3/1200/800', category: 'Nature', title: 'Coastal Breath', description: 'Where the tide meets the shore.' },
  { id: 10, url: 'https://picsum.photos/seed/arch3/1200/800', category: 'Architecture', title: 'Glass Horizon', description: 'Reflections on a modern facade.' },
  { id: 11, url: 'https://picsum.photos/seed/min3/1200/800', category: 'Minimal', title: 'Shadow Play', description: 'Contrast and form in monochrome.' },
  { id: 12, url: 'https://picsum.photos/seed/vib3/1200/800', category: 'Vibrant', title: 'Electric Bloom', description: 'Nature reimagined in high saturation.' },
];

const CATEGORIES: Category[] = ['All', 'Nature', 'Architecture', 'Minimal', 'Vibrant'];

// --- Components ---

export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const filteredImages = useMemo(() => {
    if (activeCategory === 'All') return IMAGES;
    return IMAGES.filter(img => img.category === activeCategory);
  }, [activeCategory]);

  const handleNext = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prev) => (prev! + 1) % filteredImages.length);
  };

  const handlePrev = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prev) => (prev! - 1 + filteredImages.length) % filteredImages.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setSelectedImageIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, filteredImages]);

  return (
    <div className="min-h-screen bg-zinc-50 font-sans selection:bg-zinc-900 selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center text-white">
              <ImageIcon size={20} />
            </div>
            <div>
              <h1 className="text-xl font-serif font-bold tracking-tight">Lumina Gallery</h1>
              <p className="text-xs text-zinc-500 uppercase tracking-widest font-medium">Curated Visuals</p>
            </div>
          </div>

          <nav className="flex items-center gap-1 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  activeCategory === cat 
                    ? 'bg-zinc-900 text-white shadow-lg shadow-zinc-200' 
                    : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 text-zinc-400">
            <LayoutGrid size={16} />
            <span className="text-xs font-semibold uppercase tracking-wider">{filteredImages.length} Masterpieces</span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-zinc-400">
            <Filter size={16} />
            <span className="text-xs font-semibold uppercase tracking-wider">Filtered by {activeCategory}</span>
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-zinc-200 cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-500"
                onClick={() => setSelectedImageIndex(index)}
              >
                <img
                  src={image.url}
                  alt={image.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    className="space-y-1"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-300">{image.category}</span>
                    <h3 className="text-white font-serif text-lg leading-tight">{image.title}</h3>
                    <div className="pt-2 flex items-center gap-2 text-white/60">
                      <Maximize2 size={14} />
                      <span className="text-[10px] font-medium uppercase tracking-widest">View Details</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-zinc-200">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-400 text-sm">© 2026 Lumina Visual Arts. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="text-zinc-400 hover:text-zinc-900 text-sm font-medium transition-colors">Instagram</a>
            <a href="#" className="text-zinc-400 hover:text-zinc-900 text-sm font-medium transition-colors">Behance</a>
            <a href="#" className="text-zinc-400 hover:text-zinc-900 text-sm font-medium transition-colors">Dribbble</a>
          </div>
        </div>
      </footer>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/95 lightbox-overlay p-4 md:p-12"
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedImageIndex(null)}
              className="absolute top-6 right-6 z-50 text-white/50 hover:text-white transition-colors p-2"
            >
              <X size={32} />
            </button>

            {/* Navigation Buttons */}
            <button 
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-4 md:left-8 z-50 text-white/30 hover:text-white transition-all p-4 hover:scale-110"
            >
              <ChevronLeft size={48} strokeWidth={1} />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-4 md:right-8 z-50 text-white/30 hover:text-white transition-all p-4 hover:scale-110"
            >
              <ChevronRight size={48} strokeWidth={1} />
            </button>

            {/* Content Wrapper */}
            <div className="relative w-full h-full flex flex-col items-center justify-center gap-8 max-w-6xl mx-auto">
              <motion.div
                key={filteredImages[selectedImageIndex].id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center"
              >
                <img
                  src={filteredImages[selectedImageIndex].url}
                  alt={filteredImages[selectedImageIndex].title}
                  referrerPolicy="no-referrer"
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                />
              </motion.div>

              <motion.div 
                key={`info-${filteredImages[selectedImageIndex].id}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-center max-w-2xl space-y-3"
              >
                <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
                  {filteredImages[selectedImageIndex].category}
                </span>
                <h2 className="text-3xl md:text-5xl font-serif text-white">{filteredImages[selectedImageIndex].title}</h2>
                <p className="text-zinc-400 text-sm md:text-lg leading-relaxed">{filteredImages[selectedImageIndex].description}</p>
                
                <div className="pt-6 flex items-center justify-center gap-4">
                  <span className="text-zinc-600 text-xs font-mono">
                    {selectedImageIndex + 1} / {filteredImages.length}
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
