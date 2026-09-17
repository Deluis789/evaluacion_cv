import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

export interface RadarDatum {
  metric: string;
  candidato: number;
  referencia: number;
}

export function CandidateVsReferenceRadar({ data }: { data: RadarDatum[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart data={data} outerRadius="75%">
        <PolarGrid stroke="rgba(255,255,255,0.08)" />
        <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12, fill: "#94A3B8" }} />
        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10, fill: "#64748B" }} />
        <Radar name="Candidato" dataKey="candidato" stroke="#2DD4E8" fill="#2DD4E8" fillOpacity={0.28} />
        <Radar name="Empleados de referencia" dataKey="referencia" stroke="#34D399" fill="#34D399" fillOpacity={0.15} />
        <Legend wrapperStyle={{ fontSize: 12, color: "#94A3B8" }} />
        <Tooltip
          contentStyle={{
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.1)",
            fontSize: 13,
            background: "#0A1330",
            color: "#E2E8F0",
          }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
