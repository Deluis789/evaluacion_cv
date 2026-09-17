import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import type { CandidatesByJob, EvaluationsTrendPoint, ScoreDistributionBucket } from "@/types";

const ACCENT = "#2DD4E8";
const ACCENT_SOFT = "#7DD3FC";
const GRID = "rgba(255,255,255,0.06)";
const AXIS_TEXT = "#64748B";

const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.1)",
  fontSize: 13,
  background: "#0A1330",
  color: "#E2E8F0",
};

export function ScoreDistributionChart({ data }: { data: ScoreDistributionBucket[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} barSize={36}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={GRID} />
        <XAxis dataKey="range" tick={{ fontSize: 12, fill: AXIS_TEXT }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: AXIS_TEXT }} axisLine={false} tickLine={false} allowDecimals={false} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
        <Bar dataKey="count" name="Candidatos" fill={ACCENT} radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function CandidatesByJobChart({ data }: { data: CandidatesByJob[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} layout="vertical" barSize={20}>
        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={GRID} />
        <XAxis type="number" tick={{ fontSize: 12, fill: AXIS_TEXT }} axisLine={false} tickLine={false} allowDecimals={false} />
        <YAxis
          type="category"
          dataKey="jobTitle"
          tick={{ fontSize: 12, fill: AXIS_TEXT }}
          axisLine={false}
          tickLine={false}
          width={140}
        />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
        <Bar dataKey="count" name="Candidatos" fill={ACCENT_SOFT} radius={[0, 8, 8, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function EvaluationsTrendChart({ data }: { data: EvaluationsTrendPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={GRID} />
        <XAxis dataKey="date" tick={{ fontSize: 12, fill: AXIS_TEXT }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: AXIS_TEXT }} axisLine={false} tickLine={false} allowDecimals={false} />
        <Tooltip contentStyle={tooltipStyle} />
        <Line
          type="monotone"
          dataKey="count"
          name="Evaluaciones"
          stroke={ACCENT}
          strokeWidth={3}
          dot={{ r: 4, fill: ACCENT }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

const PIE_COLORS = ["#FB7185", "#FBBF24", "#2DD4E8", "#34D399"];

export function CompatibilityDonut({ data }: { data: ScoreDistributionBucket[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie data={data} dataKey="count" nameKey="range" innerRadius={55} outerRadius={85} paddingAngle={3}>
          {data.map((_, idx) => (
            <Cell key={idx} fill={PIE_COLORS[idx % PIE_COLORS.length]} stroke="#0A1330" strokeWidth={2} />
          ))}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} />
      </PieChart>
    </ResponsiveContainer>
  );
}
