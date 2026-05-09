import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Layers3,
  Sparkles,
  Globe2,
  Code2,
  Zap,
  Construction,
  AlertTriangle,
  Clock,
  Cpu,
} from "lucide-react";

import Logo from "../assets/VelSAKA_Logo.jpeg";

export default function UnderDevelopment() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020617] flex items-center justify-center px-4">

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.18),transparent_40%)]" />

      {/* Floating Blur */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-violet-500/20 blur-3xl rounded-full" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-500/20 blur-3xl rounded-full" />

      {/* Multiple "VELSAKA Under Development" Text - Background Watermarks */}
      <motion.div
        animate={{ opacity: [0.03, 0.08, 0.03] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-1/4 left-1/4 text-6xl font-bold text-white whitespace-nowrap rotate-[-15deg] pointer-events-none"
        style={{ opacity: 0.05 }}
      >
        VELSAKA Under Development
      </motion.div>

      <motion.div
        animate={{ opacity: [0.03, 0.08, 0.03] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        className="absolute bottom-1/3 right-1/4 text-5xl font-bold text-white whitespace-nowrap rotate-12 pointer-events-none"
        style={{ opacity: 0.05 }}
      >
        VELSAKA Under Development
      </motion.div>

      <motion.div
        animate={{ opacity: [0.02, 0.06, 0.02] }}
        transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        className="absolute top-2/3 left-1/3 text-4xl font-bold text-white whitespace-nowrap rotate-[-25deg] pointer-events-none"
        style={{ opacity: 0.04 }}
      >
        VELSAKA Under Development
      </motion.div>

      {/* Floating Icons */}
      <motion.div
        animate={{ y: [0, -18, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-24 left-[12%] text-violet-400/20"
      >
        <Code2 size={70} strokeWidth={1.2} />
      </motion.div>

      <motion.div
        animate={{ y: [0, 18, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-40 right-[12%] text-cyan-400/20"
      >
        <Globe2 size={70} strokeWidth={1.2} />
      </motion.div>

      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-24 left-[18%] text-pink-400/20"
      >
        <Layers3 size={60} strokeWidth={1.2} />
      </motion.div>

      {/* Small icon tags around the page */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 0.5 }}
        className="absolute top-32 right-[20%] text-xs bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm flex items-center gap-2"
      >
        <Construction size={12} className="text-violet-400" />
        <span className="text-violet-400/40">VELSAKA Under Development</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-32 left-[15%] text-xs bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm flex items-center gap-2"
      >
        <AlertTriangle size={12} className="text-cyan-400" />
        <span className="text-cyan-400/40">VELSAKA Under Development</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.1 }}
        className="absolute top-1/2 right-[8%] text-xs bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm flex items-center gap-2"
        style={{ writingMode: "vertical-rl" }}
      >
        <Clock size={12} className="text-pink-400" />
        <span className="text-pink-400/40">VELSAKA in Progress</span>
      </motion.div>

      {/* Main Container */}
      <div className="relative z-10 max-w-5xl w-full grid lg:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >

          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-violet-500/20 bg-violet-500/10 text-violet-300 text-lg sm:text-xl font-semibold mb-8 backdrop-blur-xl"
          >
            <Sparkles size={22} className="text-violet-300" />

            {/* Typewriter */}
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 1,
              }}
              className="overflow-hidden whitespace-nowrap border-r-2 border-violet-400 pr-2"
            >
              VELSAKA Under Development
            </motion.span>
          </motion.div>

          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl font-black text-white leading-tight mb-6">
           Building a
            <span className="block bg-gradient-to-r from-violet-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Premium Experience
            </span>
          </h1>

          {/* Description */}
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
            VelSAKA Tech is currently crafting a modern and high-performance
            digital platform designed for innovation, creativity, and speed.
          </p>

          {/* Feature Points */}
          <div className="space-y-4 mb-10">
            <div className="flex items-center gap-3 text-slate-300">
              <Zap className="text-violet-400" size={20} />
              High-speed modern architecture
            </div>

            <div className="flex items-center gap-3 text-slate-300">
              <Globe2 className="text-cyan-400" size={20} />
              Responsive & scalable experience
            </div>

            <div className="flex items-center gap-3 text-slate-300">
              <Code2 className="text-pink-400" size={20} />
              Crafted with advanced technologies
            </div>
          </div>

          {/* Status Bar - Fully Active Progress */}
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mb-6"
          >
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <div className="flex items-center gap-2">
                <Cpu size={12} />
                <span>Development Progress</span>
              </div>
              <div className="flex items-center gap-2">
                <Construction size={12} />
                <span>VELSAKA Under Development</span>
              </div>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full"
              />
            </div>
          </motion.div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-90 transition-all text-white font-semibold"
            >
              Back Home
              <ArrowRight size={18} />
            </Link>

            <button className="px-7 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md text-white hover:bg-white/10 transition-all">
              Contact Team
            </button>
          </div>
        </motion.div>

        {/* RIGHT LOGO SECTION */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative flex justify-center"
        >
          {/* Outer Glow Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute w-[320px] h-[320px] rounded-full border border-violet-500/20 border-dashed"
          />

          {/* Middle Ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
            className="absolute w-[260px] h-[260px] rounded-full border border-cyan-400/20"
          />

          {/* Inner Ring with Text */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute w-[200px] h-[200px] rounded-full flex items-center justify-center"
          >
            <div className="absolute w-full h-full" style={{ animation: "spin 10s linear infinite" }}>
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute text-[10px] text-violet-400/60 whitespace-nowrap flex items-center gap-1"
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: `rotate(${i * 45}deg) translate(0, -95px) rotate(${-i * 45}deg)`,
                  }}
                >
                  <Construction size={8} />
                  <span>VELSAKA</span>
                  <Construction size={8} />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Glow */}
          <div className="absolute w-[220px] h-[220px] bg-violet-500/20 blur-3xl rounded-full" />

          {/* Logo */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="relative z-10"
          >
            <div className="relative">
              <img
                src={Logo}
                alt="VELSAKA TECH"
                className="h-52 w-52 sm:h-60 sm:w-60 object-cover rounded-[2.5rem] border border-white/10 shadow-2xl"
              />
              {/* Overlay text on logo */}
              <div className="absolute inset-0 bg-black/40 rounded-[2.5rem] flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center gap-2 text-white text-xs font-bold px-2 py-1 bg-black/50 rounded-lg backdrop-blur-sm">
                  <Construction size={12} />
                  <span>VELSAKA</span>
                </div>
              </div>
            </div>
          </motion.div>

        </motion.div>

      </div>

    
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}