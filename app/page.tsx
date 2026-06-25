"use client";
import React, { useState, useEffect, useRef } from "react";
import { HiDocumentText } from "react-icons/hi";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsClipboardDataFill } from "react-icons/bs";
import { BiSolidReport } from "react-icons/bi";
import { Sun, Moon, ExternalLink } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// Cada app: anel (1-8), ângulo em graus (0=direita, 90=baixo, 270=cima)
// Raio de cada anel = anel * 80px
const RING_SIZE = 80; // px por anel

const apps = [
  {
    text: "Gestor de Pagamentos",
    description: "Gerencie e controle todos os pagamentos da empresa.",
    url: "https://bpo-finance-operador-financeiro.vercel.app/",
    icon: <AiFillDollarCircle className="h-7 w-7" />,
    iconSmall: <AiFillDollarCircle className="h-3 w-3" />,
    color: "#10b981",
    ring: 7,       // anel externo
    angle: 210,    // inferior esquerdo
  },
  {
    text: "Pulse Agenda",
    description: "Organize compromissos, reuniões e agenda da equipe.",
    url: "https://pulse-agenda.vercel.app/",
    icon: <HiDocumentText className="h-7 w-7" />,
    iconSmall: <HiDocumentText className="h-3 w-3" />,
    color: "#6366f1",
    ring: 7,       // anel externo
    angle: 315,    // superior direito
  },
  {
    text: "Connecta AI",
    description: "Gestão financeira inteligente: contas a pagar e receber com automação BPO.",
    url: "https://integra-o-conatas-a-pagar-receber.vercel.app/login",
    icon: <BiSolidReport className="h-7 w-7" />,
    iconSmall: <BiSolidReport className="h-3 w-3" />,
    color: "#f59e0b",
    ring: 5,       // anel médio
    angle: 135,    // superior esquerdo
  },
  {
    text: "Buscador de Combinações",
    description: "Encontre combinações exatas de valores para conciliação financeira.",
    url: "https://solver-snowy-kappa.vercel.app/",
    icon: <BsClipboardDataFill className="h-7 w-7" />,
    iconSmall: <BsClipboardDataFill className="h-3 w-3" />,
    color: "#ef4444",
    ring: 4,       // anel interno
    angle: 45,     // superior direito próximo
  },
];

export default function RadarDCX() {
  const [darkMode, setDarkMode] = useState(true);
  const [radarAngle, setRadarAngle] = useState(20);
  const [visibleTooltip, setVisibleTooltip] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const angleRef = useRef(20);

  const bg = darkMode ? "#000000" : "#f0f4f8";
  const titleColor = darkMode ? "white" : "#111";
  const subtitleColor = darkMode ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)";
  const versionColor = darkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)";
  const btnBg = darkMode ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  const btnBorder = darkMode ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)";
  const btnColor = darkMode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)";
  const tooltipBg = darkMode ? "rgba(10,10,15,0.95)" : "rgba(255,255,255,0.97)";
  const tooltipDesc = darkMode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)";
  const ringColor = darkMode ? "rgba(71,85,105," : "rgba(100,116,139,";

  // Animação do radar
  useEffect(() => {
    const timer = setInterval(() => {
      angleRef.current = (angleRef.current + 1) % 360;
      setRadarAngle(angleRef.current);

      // Verifica se o sweep passou por algum app
      apps.forEach((app, idx) => {
        const diff = Math.abs(((angleRef.current - app.angle + 360) % 360));
        if (diff < 4) {
          setVisibleTooltip(idx);
          setTimeout(() => setVisibleTooltip((prev) => (prev === idx ? null : prev)), 3000);
        }
      });
    }, 28); // ~10s por volta
    return () => clearInterval(timer);
  }, []);

  const circles = new Array(8).fill(0);

  return (
    <div
      className="relative flex min-h-screen w-full items-center justify-center transition-colors duration-500 overflow-hidden"
      style={{ backgroundColor: bg }}
    >
      {/* Nome */}
      <div className="absolute top-6 left-7 select-none z-10">
        <div className="font-bold leading-none" style={{ fontSize: "2rem", letterSpacing: "-0.02em" }}>
          <span style={{ color: "#1a237e" }}>Radar </span><span style={{ color: "#22c55e" }}>DCX</span>
        </div>
        <div className="text-[10px] tracking-[0.2em] uppercase mt-1" style={{ color: subtitleColor }}>
          Central de Aplicações
        </div>
      </div>

      {/* Botão tema */}
      <button
        className="absolute top-6 right-6 flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300 cursor-pointer z-10"
        style={{ backgroundColor: btnBg, border: `1px solid ${btnBorder}`, color: btnColor }}
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? <Sun size={16} /> : <Moon size={16} />}
      </button>

      {/* Radar centralizado */}
      <div className="relative flex items-center justify-center" style={{ width: 720, height: 720 }}>

        {/* Anéis concêntricos */}
        {circles.map((_, idx) => {
          const size = (idx + 1) * RING_SIZE;
          const opacity = 1 - (idx + 1) * 0.1;
          return (
            <div
              key={idx}
              className="absolute rounded-full"
              style={{
                width: size,
                height: size,
                border: `1px solid ${ringColor}${Math.max(0.05, opacity)})`,
              }}
            />
          );
        })}

        {/* Sweep line */}
        <div
          className="absolute"
          style={{
            width: "50%",
            height: 1,
            top: "50%",
            left: "50%",
            transformOrigin: "left center",
            transform: `rotate(${radarAngle}deg)`,
            background: "linear-gradient(to right, transparent, #0ea5e9)",
            zIndex: 40,
          }}
        />

        {/* Logo central */}
        <div
          className="absolute z-50 w-40 h-40 rounded-full flex items-center justify-center"
          style={{
            backgroundColor: darkMode ? "#000000" : "transparent",
            border: "1px solid rgba(71,85,105,0.4)",
          }}
        >
          <Image
            src="/logo.png"
            alt="Dinheiro em Caixa"
            width={140}
            height={140}
            className="object-contain"
          />
        </div>

        {/* Apps posicionados nos anéis */}
        {apps.map((app, idx) => {
          const radius = app.ring * RING_SIZE / 2;
          const rad = (app.angle * Math.PI) / 180;
          const x = radius * Math.cos(rad);
          const y = radius * Math.sin(rad);
          const isHovered = hoveredId === idx;
          const showTooltip = visibleTooltip === idx || isHovered;

          return (
            <div
              key={idx}
              className="absolute z-50 flex flex-col items-center cursor-pointer"
              style={{
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                top: "50%",
                left: "50%",
              }}
              onMouseEnter={() => setHoveredId(idx)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <a href={app.url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1.5">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border transition-all duration-300"
                  style={{
                    backgroundColor: isHovered ? app.color : darkMode ? "#1e293b" : "#e2e8f0",
                    borderColor: isHovered ? app.color : darkMode ? "#334155" : "#cbd5e1",
                    boxShadow: isHovered ? `0 0 20px ${app.color}99` : "none",
                    color: isHovered ? "white" : "#94a3b8",
                    transform: isHovered ? "scale(1.15)" : "scale(1)",
                  }}
                >
                  {app.icon}
                </div>
                <div
                  className="text-[10px] font-semibold whitespace-nowrap"
                  style={{ color: isHovered ? app.color : darkMode ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)" }}
                >
                  {app.text}
                </div>
              </a>

              {/* Tooltip */}
              <AnimatePresence>
                {showTooltip && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.2 }}
                    className="absolute w-52 rounded-2xl border p-4 shadow-2xl"
                    style={{
                      top: "110%",
                      left: "50%",
                      transform: "translateX(-50%)",
                      backgroundColor: tooltipBg,
                      borderColor: `${app.color}44`,
                      backdropFilter: "blur(16px)",
                      zIndex: 100,
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${app.color}22`, color: app.color }}>
                        {app.iconSmall}
                      </div>
                      <p className="font-bold text-sm" style={{ color: app.color }}>{app.text}</p>
                    </div>
                    <p className="text-xs leading-relaxed mb-3" style={{ color: tooltipDesc }}>{app.description}</p>
                    <a
                      href={app.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold"
                      style={{
                        backgroundColor: `${app.color}18`,
                        border: `1px solid ${app.color}44`,
                        color: app.color,
                      }}
                    >
                      <ExternalLink size={11} />
                      Acessar app
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Linha horizontal de corte (como no original) */}
      <div className="absolute bottom-0 left-0 right-0 z-[41] h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

      {/* Versão */}
      <div className="absolute bottom-6 right-7 text-[10px] tracking-[0.2em] uppercase select-none z-10"
        style={{ color: versionColor }}>
        Radar DCX V1.0
      </div>
    </div>
  );
}
