import { Sparkles, TrendingUp, AlertCircle, Users } from "lucide-react";
import { useAIInsights } from "@/hooks/useDomainData";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Loading } from "@/components/ui/States";
import { Badge } from "@/components/ui/Badge";

function SkillBar({ skill, value }: { skill: string; value: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-32 shrink-0 text-sm text-slate-400">{skill}</span>
      <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent-400 to-accent-600 shadow-[0_0_8px_-1px_rgba(45,212,232,0.5)] transition-all duration-700"
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="w-10 shrink-0 text-right text-xs font-medium text-slate-500">{value}%</span>
    </div>
  );
}

export function AIInsightsPage() {
  const { data: insights, isLoading } = useAIInsights();

  if (isLoading || !insights) return <Loading label="Generando insights de IA..." />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">AI Insights</h1>
        <p className="text-sm text-slate-500">Tendencias agregadas del talento evaluado por la plataforma.</p>
      </div>

      <Card className="relative overflow-hidden border-accent-400/20 bg-gradient-to-br from-brand-800 via-brand-900 to-[#040914] text-white">
        <div className="flex items-start gap-3">
          <Sparkles className="h-5 w-5 shrink-0 text-brand-200" />
          <p className="text-sm leading-relaxed text-brand-50">{insights.narrative}</p>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              <CardTitle>Top Emerging Skills</CardTitle>
            </div>
          </CardHeader>
          <div className="space-y-3">
            {insights.topSkills.map((s) => (
              <SkillBar key={s.skill} skill={s.skill} value={s.demandPercentage} />
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-amber-400" />
              <CardTitle>Skill Gap Detection</CardTitle>
            </div>
          </CardHeader>
          <div className="space-y-3">
            {insights.missingSkills.map((s) => (
              <SkillBar key={s.skill} skill={s.skill} value={s.demandPercentage} />
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-accent-400" />
              <CardTitle>Talent Availability</CardTitle>
            </div>
          </CardHeader>
          <div className="space-y-3">
            {insights.talentAvailabilityByArea.map((a) => (
              <SkillBar key={a.area} skill={a.area} value={a.availability} />
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Áreas con mayor dificultad de contratación</CardTitle>
          </CardHeader>
          <div className="flex flex-wrap gap-2">
            {insights.hardToFillAreas.map((a) => (
              <Badge key={a} tone="danger">
                {a}
              </Badge>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
