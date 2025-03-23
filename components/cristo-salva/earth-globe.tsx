"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import * as THREE from "three"
import { cn } from "@/lib/utils"

export default function EarthGlobe({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000)
    camera.position.z = 2.5

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setSize(300, 300)
    renderer.setClearColor(0x000000, 0)

    containerRef.current.innerHTML = ""
    containerRef.current.appendChild(renderer.domElement)

    // Earth geometry
    const geometry = new THREE.SphereGeometry(1, 64, 64)

    // Earth texture
    const textureLoader = new THREE.TextureLoader()
    const earthTexture = textureLoader.load("/earth-blue-marble.jpg", () => {
      // Fallback texture if loading fails
      const fallbackMaterial = new THREE.MeshBasicMaterial({
        color: 0x1a4674,
        transparent: true,
        opacity: 0.8,
      })

      const material = new THREE.MeshBasicMaterial({
        map: earthTexture,
        transparent: true,
        opacity: 0.9,
      })

      const earth = new THREE.Mesh(geometry, material)
      scene.add(earth)

      // Atmosphere glow
      const atmosphereGeometry = new THREE.SphereGeometry(1.05, 64, 64)
      const atmosphereMaterial = new THREE.MeshBasicMaterial({
        color: 0x4a7fb5,
        transparent: true,
        opacity: 0.2,
        side: THREE.BackSide,
      })
      const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial)
      scene.add(atmosphere)

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate)

        earth.rotation.y += 0.001

        renderer.render(scene, camera)
      }

      animate()
    })

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return

      const size = Math.min(300, window.innerWidth * 0.8)
      renderer.setSize(size, size)
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      if (containerRef.current) {
        containerRef.current.innerHTML = ""
      }
    }
  }, [])

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, delay: 0.5 }}
      className={cn("relative w-[300px] h-[300px]", className)}
    />
  )
}

