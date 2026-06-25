import RadialOrbitalTimeline from "@/components/RadialOrbitalTimeline";

// ✏️ EDITE AQUI: adicione ou remova apps conforme necessário
// Troque o "url" pelo link real de cada app
const appsData = [
  {
    id: 1,
    title: "Gestor de Pagamentos",
    description: "Gerencie e controle todos os pagamentos da empresa.",
    url: "https://bpo-finance-operador-financeiro.vercel.app/",
    iconName: "Receipt",
    color: "#10b981",
  },
  {
    id: 2,
    title: "Pulse Agenda",
    description: "Organize compromissos, reuniões e agenda da equipe em um só lugar.",
    url: "https://pulse-agenda.vercel.app/",
    iconName: "CalendarDays",
    color: "#6366f1",
  },
  {
    id: 3,
    title: "Connecta AI",
    description: "Gestão financeira inteligente: contas a pagar e receber com automação BPO.",
    url: "https://integra-o-conatas-a-pagar-receber.vercel.app/",
    iconName: "FileText",
    color: "#f59e0b",
  },
  {
    id: 4,
    title: "Buscador de Combinações",
    description: "Encontre combinações exatas de valores para conciliação e conferência financeira.",
    url: "https://solver-snowy-kappa.vercel.app/",
    iconName: "Target",
    color: "#ef4444",
  },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-black">
      <RadialOrbitalTimeline appsData={appsData} />
    </main>
  );
}
