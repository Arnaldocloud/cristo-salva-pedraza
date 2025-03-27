"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Montserrat, Playfair_Display } from "next/font/google"
import { cn } from "@/lib/utils"
import {
  LucideChevronDown,
  LucideCross,
  LucideX,
  LucideClock,
  LucideMapPin,
  LucideCalendar,
  LucideUsers,
  LucideBook,
  LucideHeart,
  LucideMusic,
  LucidePhone,
  LucideMapPinned,
  LucideMail,
  LucideInstagram,
  LucideFacebook,
  LucideYoutube,
  Camera,
} from "lucide-react"
import { useState } from "react"
import PhotoGallery from "./photo-gallery"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

function LightRay({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string
  delay?: number
  width?: number
  height?: number
  rotate?: number
  gradient?: string
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border border-white/[0.1]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.05)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.15),transparent_70%)]",
          )}
        />
      </motion.div>
    </motion.div>
  )
}

function ServiceCard({
  icon: Icon,
  title,
  description,
  day,
  time,
  location,
}: {
  icon: React.ElementType
  title: string
  description: string
  day: string
  time: string
  location: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/[0.05] transition-all duration-300"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
          <Icon className="w-5 h-5 text-amber-400" />
        </div>
        <h3 className="text-xl font-medium text-white">{title}</h3>
      </div>
      <p className="text-white/60 mb-4">{description}</p>
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-white/50">
          <LucideCalendar className="w-4 h-4" />
          <span>{day}</span>
        </div>
        <div className="flex items-center gap-2 text-white/50">
          <LucideClock className="w-4 h-4" />
          <span>{time}</span>
        </div>
        <div className="flex items-center gap-2 text-white/50">
          <LucideMapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>
      </div>
    </motion.div>
  )
}

function AboutCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType
  title: string
  description: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/[0.05] transition-all duration-300"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
          <Icon className="w-5 h-5 text-purple-400" />
        </div>
        <h3 className="text-xl font-medium text-white">{title}</h3>
      </div>
      <p className="text-white/60">{description}</p>
    </motion.div>
  )
}

export default function HeroModerno() {
  const [activeSection, setActiveSection] = useState<"none" | "services" | "about" | "gallery">("none")

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  }

  const sectionVariants = {
    hidden: {
      opacity: 0,
      y: -20,
      scale: 0.98,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.98,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  }

  const toggleSection = (section: "services" | "about" | "gallery") => {
    if (activeSection === section) {
      setActiveSection("none")
    } else {
      setActiveSection(section)
    }
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0f] dark">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/[0.03] via-transparent to-amber-700/[0.03] blur-3xl" />

      <div className="absolute inset-0 overflow-hidden">
        <LightRay
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-purple-500/[0.08]"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />

        <LightRay
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-amber-500/[0.08]"
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
        />

        <LightRay
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-blue-500/[0.08]"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />

        <LightRay
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-amber-400/[0.08]"
          className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
        />

        <LightRay
          delay={0.7}
          width={150}
          height={40}
          rotate={-25}
          gradient="from-white/[0.08]"
          className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 flex-grow flex flex-col items-center justify-center">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 md:mb-12"
          >
            <div className="flex items-center justify-center w-5 h-5">
              <LucideCross className="w-4 h-4 text-amber-300" />
            </div>
            <span className="text-sm text-white/60 tracking-wide">Iglesia Evangélica</span>
          </motion.div>

          <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight">
              <span
                className={cn(
                  "bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80",
                  montserrat.className,
                )}
              >
                Cristo
              </span>
              <br />
              <span
                className={cn(
                  "bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-white/90 to-purple-300",
                  playfair.className,
                )}
              >
                Salva
              </span>
              <div className="relative h-12 md:h-16 mt-2">
                <span
                  className={cn(
                    "absolute right-0 md:right-4 -top-2 md:-top-4 text-2xl md:text-3xl font-light text-white/70 transform rotate-[-8deg] border-t-2 border-white/20 pt-1 px-2",
                    montserrat.className,
                  )}
                >
                  Pedraza
                </span>
              </div>
            </h1>
          </motion.div>

          <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
            <p className="text-base sm:text-lg md:text-xl text-white/40 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
              Compartiendo el mensaje de esperanza y salvación a través de la fe en Cristo Jesús.
            </p>
          </motion.div>

          <motion.div custom={3} variants={fadeUpVariants} initial="hidden" animate="visible">
            <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
              <button
                onClick={() => toggleSection("services")}
                className={`px-6 py-3 rounded-md ${
                  activeSection === "services"
                    ? "bg-amber-600 text-white"
                    : "bg-gradient-to-r from-amber-500/80 to-amber-600/80 text-white"
                } 
                  font-medium hover:from-amber-500 hover:to-amber-600 transition-all duration-300 shadow-lg shadow-amber-700/20 flex items-center justify-center gap-2`}
              >
                {activeSection === "services" ? (
                  <>
                    <LucideX className="w-4 h-4" />
                    <span>Cerrar</span>
                  </>
                ) : (
                  <>
                    <span>Nuestros Servicios</span>
                  </>
                )}
              </button>
              <button
                onClick={() => toggleSection("gallery")}
                className={`px-6 py-3 rounded-md ${
                  activeSection === "gallery"
                    ? "bg-purple-600 text-white"
                    : "bg-gradient-to-r from-purple-500/80 to-purple-600/80 text-white"
                } 
                  font-medium hover:from-purple-500 hover:to-purple-600 transition-all duration-300 shadow-lg shadow-purple-700/20 flex items-center justify-center gap-2`}
              >
                {activeSection === "gallery" ? (
                  <>
                    <LucideX className="w-4 h-4" />
                    <span>Cerrar</span>
                  </>
                ) : (
                  <>
                    <Camera className="w-4 h-4 mr-1" />
                    <span>Galería de Fotos</span>
                  </>
                )}
              </button>
              <button
                onClick={() => toggleSection("about")}
                className={`px-6 py-3 rounded-md ${
                  activeSection === "about"
                    ? "bg-white/10 text-white"
                    : "bg-white/[0.03] border border-white/10 text-white/80"
                } 
                  font-medium hover:bg-white/[0.05] transition-all duration-300 flex items-center justify-center gap-2`}
              >
                {activeSection === "about" ? (
                  <>
                    <LucideX className="w-4 h-4" />
                    <span>Cerrar</span>
                  </>
                ) : (
                  <>
                    <span>Conoce Más</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Sección de Servicios */}
        {activeSection === "services" && (
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full max-w-4xl mx-auto mt-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
              Nuestros Servicios y Actividades
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ServiceCard
                icon={LucideBook}
                title="Culto Dominical"
                description="Servicio principal de adoración y predicación de la Palabra de Dios para toda la familia."
                day="Domingo"
                time="10:00 AM - 12:00 PM"
                location="Salón Principal"
              />
              <ServiceCard
                icon={LucideUsers}
                title="Estudio Bíblico"
                description="Profundizamos en las escrituras para crecer en conocimiento y fe."
                day="Miércoles"
                time="7:00 PM - 8:30 PM"
                location="Salón Principal"
              />
              <ServiceCard
                icon={LucideMusic}
                title="Grupo de Alabanza"
                description="Ensayo del equipo de música y adoración para los servicios."
                day="Viernes"
                time="6:00 PM - 8:00 PM"
                location="Salón Principal"
              />
              <ServiceCard
                icon={LucideHeart}
                title="Jóvenes Cristo Salva"
                description="Reunión especial para jóvenes con actividades, devocionales y compañerismo."
                day="Sábado"
                time="5:00 PM - 7:30 PM"
                location="Salón Principal"
              />
            </div>
          </motion.div>
        )}

        {/* Sección de Galería */}
        {activeSection === "gallery" && (
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full mx-auto mt-12"
          >
            <PhotoGallery />
          </motion.div>
        )}

        {/* Sección de Conoce Más */}
        {activeSection === "about" && (
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full max-w-4xl mx-auto mt-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">Conoce Más Sobre Nosotros</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <AboutCard
                icon={LucideBook}
                title="Nuestra Misión"
                description="Llevar el mensaje de salvación a través de Jesucristo, formando discípulos comprometidos con la fe y el servicio a Dios."
              />
              <AboutCard
                icon={LucideHeart}
                title="Nuestra Visión"
                description="Ser una iglesia que transforma vidas a través del amor de Cristo, impactando positivamente a nuestra comunidad y al mundo."
              />
            </div>

            <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-medium text-white mb-4">Contáctanos</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <LucideMapPinned className="w-4 h-4 text-white/70" />
                  </div>
                  <span className="text-white/60">Av. #2 con calle #2, Ciudad Bolivia, el silencio 2</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <LucidePhone className="w-4 h-4 text-white/70" />
                  </div>
                  <span className="text-white/60">(0412) 453-4867</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <LucideMail className="w-4 h-4 text-white/70" />
                  </div>
                  <span className="text-white/60">info@cristosalva.org</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors">
                      <LucideFacebook className="w-4 h-4 text-white/70" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors">
                      <LucideInstagram className="w-4 h-4 text-white/70" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors">
                      <LucideYoutube className="w-4 h-4 text-white/70" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      
      

      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-[#0a0a0f]/80 pointer-events-none" />
    </div>
  )
}

