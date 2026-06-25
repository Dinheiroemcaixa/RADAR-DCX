"use client";
import { useState, useEffect, useRef } from "react";
import {
  Zap, Target, Rocket, FileText, BarChart, Receipt, CalendarDays, Sun, Moon, ExternalLink,
  LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Zap,
  Target,
  Rocket,
  FileText,
  BarChart,
  Receipt,
  CalendarDays,
};

interface AppItem {
  id: number;
  title: string;
  description: string;
  url: string;
  iconName: string;
  color: string;
}

interface RadialOrbitalTimelineProps {
  appsData: AppItem[];
}

export default function RadialOrbitalTimeline({ appsData }: RadialOrbitalTimelineProps) {
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-rotação suave
  useEffect(() => {
    if (!autoRotate) return;
    const timer = setInterval(() => {
      setRotationAngle((prev) => Number(((prev + 0.18) % 360).toFixed(3)));
    }, 50);
    return () => clearInterval(timer);
  }, [autoRotate]);

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 240;
    const radian = (angle * Math.PI) / 180;
    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)));
    return { x, y, zIndex, opacity };
  };

  const handleNodeClick = (url: string) => {
    window.open(url, "_blank");
  };

  // Cores do tema
  const bg = darkMode ? "#000000" : "#f0f4f8";
  const ringColor = darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)";
  const centerBg = "#000000";
  const centerBorder = darkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.25)";
  const titleColor = darkMode ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.35)";
  const nodeBorderDefault = darkMode ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.2)";
  const nodeBgDefault = darkMode ? "#000000" : "#ffffff";
  const nameColorDefault = darkMode ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.55)";
  const tooltipBg = darkMode ? "rgba(10,10,15,0.95)" : "rgba(255,255,255,0.97)";
  const tooltipDesc = darkMode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)";
  const themeBtnBg = darkMode ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  const themeBtnBorder = darkMode ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)";
  const themeBtnColor = darkMode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)";

  return (
    <div
      className="w-full h-screen flex flex-col items-center justify-center overflow-hidden transition-colors duration-500 relative"
      style={{ backgroundColor: bg }}
      ref={containerRef}
      onClick={() => {
        setHoveredId(null);
        setAutoRotate(true);
      }}
    >
      {/* Nome do app — canto superior esquerdo */}
      <div className="absolute top-6 left-7 select-none">
        <div
          className="font-bold leading-none"
          style={{
            color: darkMode ? "white" : "#111",
            fontSize: "2rem",
            letterSpacing: "-0.02em",
          }}
        >
          Orbita DCX
        </div>
        <div
          className="text-[10px] tracking-[0.2em] uppercase mt-1"
          style={{ color: darkMode ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)" }}
        >
          Central de Aplicações
        </div>
      </div>

      {/* Botão tema — só ícone, canto superior direito */}
      <button
        className="absolute top-6 right-6 flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300 cursor-pointer"
        style={{
          backgroundColor: themeBtnBg,
          border: `1px solid ${themeBtnBorder}`,
          color: themeBtnColor,
        }}
        onClick={(e) => {
          e.stopPropagation();
          setDarkMode(!darkMode);
        }}
      >
        {darkMode ? <Sun size={16} /> : <Moon size={16} />}
      </button>

      {/* Rodapé — canto inferior direito */}
      <div
        className="absolute bottom-6 right-7 text-[10px] tracking-[0.2em] uppercase select-none"
        style={{ color: darkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)" }}
      >
        Orbita DCX V1.0
      </div>

      {/* Título */}
      <p
        className="text-xs tracking-[0.35em] uppercase mb-10 select-none font-medium"
        style={{ color: titleColor }}
      >
        Selecione um app para acessar
      </p>

      <div className="relative flex items-center justify-center" style={{ width: 580, height: 580 }}>

        {/* Anel orbital externo (decorativo, sutil) */}
        <div
          className="absolute rounded-full"
          style={{
            width: 520,
            height: 520,
            border: `1px solid ${ringColor}`,
          }}
        />
        {/* Anel interno decorativo */}
        <div
          className="absolute rounded-full"
          style={{
            width: 160,
            height: 160,
            border: `1px dashed ${ringColor}`,
          }}
        />

        {/* Logo central */}
        <div className="absolute z-10 flex items-center justify-center">
          <div
            className="w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500"
            style={{
              backgroundColor: centerBg,
              border: `1.5px solid ${centerBorder}`,
              boxShadow: darkMode
                ? "0 0 60px rgba(255,255,255,0.04), 0 0 20px rgba(255,255,255,0.06)"
                : "0 0 40px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src="/logo.png"
              alt="Dinheiro em Caixa"
              className="w-[82%] h-[82%] object-contain"
              style={{}}
            />
          </div>
        </div>

        {/* Planetas */}
        {appsData.map((app, index) => {
          const pos = calculateNodePosition(index, appsData.length);
          const isHovered = hoveredId === app.id;
          const Icon = iconMap[app.iconName] || Zap;

          return (
            <div
              key={app.id}
              className="absolute transition-all duration-300 cursor-pointer select-none"
              style={{
                transform: `translate(${pos.x}px, ${pos.y}px)`,
                zIndex: isHovered ? 300 : pos.zIndex,
                opacity: isHovered ? 1 : pos.opacity,
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleNodeClick(app.url);
              }}
              onMouseEnter={() => {
                setHoveredId(app.id);
                setAutoRotate(false);
              }}
              onMouseLeave={() => {
                setHoveredId(null);
                setAutoRotate(true);
              }}
            >
              {/* Glow permanente (suave) */}
              <div
                className="absolute rounded-full transition-all duration-500"
                style={{
                  width: 70,
                  height: 70,
                  top: -13,
                  left: -13,
                  background: `radial-gradient(circle, ${app.color}${isHovered ? "55" : "22"} 0%, transparent 70%)`,
                  filter: isHovered ? `blur(4px)` : "blur(2px)",
                }}
              />

              {/* Anel de pulso no hover */}
              {isHovered && (
                <div
                  className="absolute rounded-full animate-ping"
                  style={{
                    width: 58,
                    height: 58,
                    top: -9,
                    left: -9,
                    border: `1.5px solid ${app.color}55`,
                    animationDuration: "1.5s",
                  }}
                />
              )}

              {/* Ícone do planeta */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300"
                style={{
                  backgroundColor: isHovered ? app.color : nodeBgDefault,
                  borderColor: isHovered ? app.color : nodeBorderDefault,
                  transform: isHovered ? "scale(1.35)" : "scale(1)",
                  boxShadow: isHovered
                    ? `0 0 28px ${app.color}99, 0 0 8px ${app.color}66`
                    : `0 2px 8px rgba(0,0,0,0.15)`,
                  color: isHovered ? "white" : darkMode ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.6)",
                }}
              >
                <Icon size={18} />
              </div>

              {/* Nome do app */}
              <div
                className="absolute whitespace-nowrap text-xs font-semibold tracking-wider transition-all duration-300 text-center"
                style={{
                  top: 52,
                  left: "50%",
                  transform: "translateX(-50%)",
                  color: isHovered ? app.color : nameColorDefault,
                }}
              >
                {app.title}
              </div>

              {/* Tooltip rico */}
              {isHovered && (
                <div
                  className="absolute z-50 w-56 rounded-2xl border p-4 shadow-2xl"
                  style={{
                    top: 76,
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: tooltipBg,
                    borderColor: `${app.color}44`,
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                  }}
                >
                  {/* Header do tooltip */}
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${app.color}22` }}
                    >
                      <Icon size={12} style={{ color: app.color }} />
                    </div>
                    <p className="font-bold text-sm" style={{ color: app.color }}>
                      {app.title}
                    </p>
                  </div>

                  <p className="text-xs leading-relaxed mb-3" style={{ color: tooltipDesc }}>
                    {app.description}
                  </p>

                  <div
                    className="flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold tracking-wide transition-all"
                    style={{
                      backgroundColor: `${app.color}18`,
                      border: `1px solid ${app.color}44`,
                      color: app.color,
                    }}
                  >
                    <ExternalLink size={11} />
                    Acessar app
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
