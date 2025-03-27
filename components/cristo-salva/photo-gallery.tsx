"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Expand,
  X,
  Heart,
  Share2,
  Download,
} from "lucide-react";
import Image from "next/image";

type GalleryImage = {
  id: number;
  src: string;
  alt: string;
  category: string;
};

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Culto dominical con la congregación",
    category: "Cultos",
  },
  {
    id: 2,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Grupo de jóvenes en actividad",
    category: "Jóvenes",
  },
  {
    id: 3,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Estudio bíblico semanal",
    category: "Estudios",
  },
  {
    id: 4,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Actividad misionera en la comunidad",
    category: "Misiones",
  },
  {
    id: 5,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Grupo de alabanza en el escenario",
    category: "Alabanza",
  },

  {
    id: 6,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Actividad con niños de la escuela dominical",
    category: "Niños",
  },
  {
    id: 7,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Evento especial de Navidad",
    category: "Eventos",
  },
  {
    id: 8,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Grupo de oración",
    category: "Oración",
  },
];

const categories = Array.from(
  new Set(galleryImages.map((img) => img.category))
);

export default function PhotoGallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("Todos");
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragX = useMotionValue(0);
  const dragXSmooth = useSpring(dragX, { damping: 20, stiffness: 200 });

  const filteredImages =
    activeCategory === "Todos"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  const handleImageClick = (image: GalleryImage) => {
    if (!isDragging) {
      setSelectedImage(image);
    }
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleNextImage = () => {
    if (!selectedImage) return;

    const currentIndex = filteredImages.findIndex(
      (img) => img.id === selectedImage.id
    );
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
  };

  const handlePrevImage = () => {
    if (!selectedImage) return;

    const currentIndex = filteredImages.findIndex(
      (img) => img.id === selectedImage.id
    );
    const prevIndex =
      (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[prevIndex]);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (selectedImage) {
      if (e.key === "ArrowRight") handleNextImage();
      if (e.key === "ArrowLeft") handlePrevImage();
      if (e.key === "Escape") handleCloseModal();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
          Nuestra Galería
        </h2>
        <p className="text-white/60 text-center max-w-2xl mb-8">
          Explora los momentos más significativos de nuestra comunidad a través
          de estas imágenes que capturan la esencia de nuestra fe y ministerio.
        </p>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveCategory("Todos")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === "Todos"
                ? "bg-amber-500 text-white"
                : "bg-white/5 text-white/70 hover:bg-white/10"
            }`}
          >
            Todos
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-amber-500 text-white"
                  : "bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        ref={galleryRef}
        className="overflow-hidden"
        onPanStart={() => setIsDragging(true)}
        onPanEnd={() => {
          setTimeout(() => setIsDragging(false), 100);
          dragX.set(0);
        }}
        onPan={(_, info) => {
          dragX.set(info.offset.x);
        }}
      >
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          style={{ x: dragXSmooth }}
        >
          <AnimatePresence>
            {filteredImages.map((image) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                className="relative aspect-square overflow-hidden rounded-xl cursor-pointer group"
                onMouseEnter={() => setHoveredImage(image.id)}
                onMouseLeave={() => setHoveredImage(null)}
                onClick={() => handleImageClick(image)}
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <p className="text-white font-medium">{image.alt}</p>
                  <p className="text-white/70 text-sm">{image.category}</p>
                </div>
                <motion.div
                  className="absolute top-4 right-4 bg-white/10 backdrop-blur-md rounded-full p-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredImage === image.id ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Expand className="w-5 h-5 text-white" />
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Modal de imagen ampliada */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex-1 overflow-hidden rounded-t-xl">
                <Image
                  src={selectedImage.src || "/placeholder.svg"}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                />
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 rounded-full p-2 text-white transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 rounded-full p-2 text-white transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
                <button
                  onClick={handleCloseModal}
                  className="absolute right-4 top-4 bg-black/30 hover:bg-black/50 rounded-full p-2 text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="bg-[#0a0a0f] p-4 rounded-b-xl">
                <h3 className="text-white text-xl font-medium mb-2">
                  {selectedImage.alt}
                </h3>
                <p className="text-white/60 mb-4">
                  Categoría: {selectedImage.category}
                </p>
                <div className="flex justify-between">
                  <div className="flex gap-4">
                    <button className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                      <Heart className="w-5 h-5" />
                      <span className="text-sm">Me gusta</span>
                    </button>
                    <button className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                      <Share2 className="w-5 h-5" />
                      <span className="text-sm">Compartir</span>
                    </button>
                  </div>
                  <button className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                    <Download className="w-5 h-5" />
                    <span className="text-sm">Descargar</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
