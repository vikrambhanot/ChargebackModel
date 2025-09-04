import {
    ArrowRight,
    BarChart3,
    Boxes,
    Building,
    Clock,
    Cloud,
    Database,
    Gauge,
    GitBranch,
    Globe,
    Layers,
    Link as LinkIcon,
    Lock,
    Network,
    Search,
    Server,
    Shield,
    Shuffle,
    Terminal,
    TrendingUp,
    Users,
    Zap
} from "lucide-react";
import React, { useMemo, useState } from "react";

// ------------------------------------------------------------------
// Minimal UI shims (no external libs): Card, Badge, Tabs, Input, Button
// ------------------------------------------------------------------
const cn = (...xs) => xs.filter(Boolean).join(" ");

function Card({ className, children }) {
  return <div className={cn("rounded-xl border bg-white shadow-sm", className)}>{children}</div>;
}
function CardHeader({ className, children }) {
  return <div className={cn("p-4 border-b", className)}>{children}</div>;
}
function CardTitle({ className, children }) {
  return <h3 className={cn("font-semibold", className)}>{children}</h3>;
}
function CardDescription({ className, children }) {
  return <p className={cn("text-sm text-slate-600", className)}>{children}</p>;
}
function CardContent({ className, children }) {
  return <div className={cn("p-4", className)}>{children}</div>;
}
function Badge({ className, children }) {
  return <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs border bg-slate-100", className)}>{children}</span>;
}
function Tabs({ defaultValue, children, className }) {
  const [val, setVal] = useState(defaultValue);
  const ctx = { val, setVal };
  return <div className={className}>{React.Children.map(children, c => React.cloneElement(c, { ctx }))}</div>;
}
function TabsList({ children, ctx }) {
  return <div className="inline-flex rounded-xl overflow-hidden border mb-3">{React.Children.map(children, c => React.cloneElement(c, { ctx }))}</div>;
}
function TabsTrigger({ value, children, ctx }) {
  const active = ctx.val === value;
  return (
    <button onClick={() => ctx.setVal(value)} className={cn("px-3 py-1 text-sm", active ? "bg-slate-900 text-white" : "bg-white text-slate-800")}>{children}</button>
  );
}
function TabsContent({ value, children, ctx }) {
  if (ctx.val !== value) return null;
  return <div>{children}</div>;
}
function Input({ className, ...props }) {
  return <input className={cn("border rounded px-3 py-1 text-sm", className)} {...props} />;
}
function Button({ className, children, ...props }) {
  return <button className={cn("border rounded px-3 py-1 text-sm hover:bg-slate-50", className)} {...props}>{children}</button>;
}

// ------------------------------------------------------
// Reporting Data Layer (RDL) — Lambda-style Explorer
// ------------------------------------------------------

const domainPalette = {
  advisor: { name: "Advisor", color: "bg-blue-50 border-blue-200", text: "text-blue-700", icon: Users },
  party: { name: "Party", color: "bg-emerald-50 border-emerald-200", text: "text-emerald-700", icon: Building },
  security: { name: "Security", color: "bg-purple-50 border-purple-200", text: "text-purple-700", icon: Shield },
  account: { name: "Account", color: "bg-orange-50 border-orange-200", text: "text-orange-700", icon: TrendingUp },
  order: { name: "Order", color: "bg-rose-50 border-rose-200", text: "text-rose-700", icon: Database },
  execution: { name: "Execution", color: "bg-indigo-50 border-indigo-200", text: "text-indigo-700", icon: Zap },
};

const layerDefs = {
  sources: {
    name: "Source Systems",
    color: "bg-blue-100 border-blue-300",
    text: "text-blue-900",
    icon: Database,
    desc: "Domain SoRs (Aurora/RDS) + Vendor Files",
    aspects: [
      "Aurora/RDS SoRs per domain",
      "Vendor EOD/Intraday Files",
      "CDC via AWS DMS → MSK/Kinesis",
      "S3 event landing & contracts",
      "Business keys per domain",
    ],
    products: ["Party Master", "Advisor Registry", "Security Ref", "Execution Feed", "Account Snapshots", "Order Book"],
    sla: "Varies",
    dq: ["Contracts & control totals", "File checksum", "Schema registry"],
  },
  raw: {
    name: "Raw",
    color: "bg-slate-100 border-slate-300",
    text: "text-slate-900",
    icon: Cloud,
    desc: "As-received copies with lineage",
    aspects: [
      "S3 + Iceberg tables (format v2)",
      "1:1 copies, control totals",
      "Partition by source/date",
      "Immutable artifacts, audit trail",
      "CDC event ledger",
    ],
    products: ["Raw SoR Snapshots", "Raw Vendor Files", "CDC Event Store"],
    sla: "Real-time / Batch",
    dq: ["Freshness", "Completeness", "Checksum"],
  },
  sanitized: {
    name: "Sanitized",
    color: "bg-yellow-100 border-yellow-300",
    text: "text-yellow-900",
    icon: Zap,
    desc: "Typed, de-duped, validated",
    aspects: [
      "Type normalization",
      "Equality deletes for upserts",
      "PII tagging & masking",
      "DQ checks & quarantine",
      "Domain validation rules",
    ],
    products: ["Clean Party Data", "Validated Orders", "Typed Executions", "DQ Metrics"],
    sla: "Real-time",
    dq: ["Type coercion", "Dedup", "PII detection", "Rule validations"],
  },
  conformed: {
    name: "Conformed",
    color: "bg-green-100 border-green-300",
    text: "text-green-900",
    icon: Database,
    desc: "Canonical cross-domain model",
    aspects: [
      "Canonical keys; RI enforced",
      "SCD2 dims + facts",
      "Bitemporal (as_of + processing)",
      "MDM linkage & survival rules",
      "Schema evolution via Iceberg",
    ],
    products: ["Golden Party", "Security Master", "Unified Order Book", "Account Positions"],
    sla: "< 1 min",
    dq: ["Referential integrity", "Conformance rules", "Survivorship"],
  },
  curated: {
    name: "Curated",
    color: "bg-purple-100 border-purple-300",
    text: "text-purple-900",
    icon: BarChart3,
    desc: "Business-ready marts",
    aspects: [
      "Denormalized facts for BI",
      "Daily reconciliation tags",
      "API-oriented rollups",
      "Partition evolution & compaction",
      "Governed access",
    ],
    products: ["Portfolio Analytics", "Trade Surveillance", "P&L Attribution", "AUM Reporting", "Position Snapshots"],
    sla: "< 5 min",
    dq: ["Aggregation checks", "Reconciliation status", "Anomaly flags"],
  },
  serving: {
    name: "Serving (Low Latency)",
    color: "bg-red-100 border-red-300",
    text: "text-red-900",
    icon: Search,
    desc: "Operational read models for APIs",
    aspects: [
      "Real-time CDC from SoRs (intraday)",
      "EOD reconciled data from conformed",
      "DynamoDB for <50ms reads",
      "OpenSearch for text/facets",
      "CloudFront/API cache & WebSockets",
      "Strict multi-tenant keys",
    ],
    products: ["Live Positions", "Latest Order Status", "Client Search", "Advisor KPIs"],
    sla: "< 50 ms",
    dq: ["Staleness SLA", "Cache invalidation", "Idempotent upserts"],
  },
  consumption: {
    name: "Consumption",
    color: "bg-indigo-100 border-indigo-300",
    text: "text-indigo-900",
    icon: Globe,
    desc: "APIs, Portals, BI, Partners",
    aspects: [
      "Real-time APIs (AppSync/REST)",
      "BI via Snowflake/Athena",
      "Client & Advisor apps",
      "Regulatory & Partner feeds",
      "Row/mask policies",
    ],
    products: ["Advisor Workstation", "Client Portal", "Mobile", "Exec Dashboard", "Compliance Reports", "Partner APIs"],
    sla: "Varies",
    dq: ["Row/mask policy tests", "Query SLA", "Report balancing"],
  },
};

function latencyBadge(layer) {
  const map = {
    sources: { label: "Varies", tone: "bg-slate-200 text-slate-800" },
    raw: { label: "RT/Batch", tone: "bg-sky-200 text-sky-900" },
    sanitized: { label: "Real-time", tone: "bg-amber-200 text-amber-900" },
    conformed: { label: "< 1 min", tone: "bg-green-200 text-green-900" },
    curated: { label: "< 5 min", tone: "bg-violet-200 text-violet-900" },
    serving: { label: "< 50 ms", tone: "bg-red-200 text-red-900" },
    consumption: { label: "Varies", tone: "bg-indigo-200 text-indigo-900" },
  };
  return map[layer];
}

const domains = {
  advisor: { name: "Advisor", icon: Users, color: domainPalette.advisor.color, text: domainPalette.advisor.text, desc: "Independent advisor management" },
  party: { name: "Party", icon: Building, color: domainPalette.party.color, text: domainPalette.party.text, desc: "Clients & households" },
  security: { name: "Security", icon: Shield, color: domainPalette.security.color, text: domainPalette.security.text, desc: "Instrument & pricing reference" },
  account: { name: "Account", icon: TrendingUp, color: domainPalette.account.color, text: domainPalette.account.text, desc: "Positions & balances" },
  order: { name: "Order", icon: Database, color: domainPalette.order.color, text: domainPalette.order.text, desc: "Trade instructions" },
  execution: { name: "Execution", icon: Zap, color: domainPalette.execution.color, text: domainPalette.execution.text, desc: "Trade fills & vendor data" },
};

const techMatrix = [
  { layer: "Streaming / CDC", options: [
    { name: "AWS DMS → MSK (Kafka)", pros: "Battle-tested, broad sources, exactly-once with Flink", cons: "MSK ops overhead", icon: GitBranch },
    { name: "DMS → Kinesis", pros: "Serverless-ish, tighter AWS integration", cons: "KPL/KCL semantics; vendor tooling bias Kafka", icon: Network },
  ]},
  { layer: "Processing", options: [
    { name: "Glue Streaming (Spark)", pros: "Managed Spark, catalog native", cons: "Cold starts; tuning needed", icon: Terminal },
    { name: "EMR Serverless", pros: "Fewer ops; flexible versions", cons: "Cost guardrails needed", icon: Server },
    { name: "Flink on MSK", pros: "True streaming, low latency", cons: "More engineering expertise", icon: Gauge },
  ]},
  { layer: "Lake Format", options: [
    { name: "Apache Iceberg", pros: "ACID, schema/partition evolution, time travel", cons: "Plan compaction regime", icon: Layers },
    { name: "Delta Lake", pros: "Rich ecosystem (Databricks)", cons: "Vendor affinity", icon: Layers },
    { name: "Apache Hudi", pros: "Write-optimized UPSERTS", cons: "Query ecosystem variance", icon: Layers },
  ]},
  { layer: "Analytics / SQL", options: [
    { name: "Snowflake (Iceberg external)", pros: "Single-copy, great UX", cons: "Feature parity depends on region", icon: Boxes },
    { name: "Snowflake (dual-copy)", pros: "Peak dashboard perf, isolation", cons: "Data duplication", icon: Boxes },
    { name: "Athena / Trino", pros: "No copy, S3 direct", cons: "Perf vs SF", icon: Boxes },
    { name: "Redshift", pros: "Warehouse on AWS", cons: "Dual-modeling effort", icon: Boxes },
  ]},
  { layer: "Serving (APIs)", options: [
    { name: "DynamoDB (+DAX)", pros: "<50ms key reads, serverless", cons: "Query patterns must be pre-modeled", icon: Zap },
    { name: "OpenSearch", pros: "Text & facets", cons: "Indexing overhead", icon: Search },
    { name: "ElastiCache/Redis", pros: "Micro-caching hot lists", cons: "Invalidation complexity", icon: Clock },
  ]},
  { layer: "API Gateway", options: [
    { name: "AppSync (GraphQL)", pros: "Schema stitching, subscriptions", cons: "Learning curve", icon: LinkIcon },
    { name: "API Gateway (REST)", pros: "Simple, cachable", cons: "Manual composition", icon: LinkIcon },
  ]},
  { layer: "Security / Gov", options: [
    { name: "Lake Formation + Glue", pros: "Column-level, catalog-native", cons: "Cross-engine nuance", icon: Lock },
    { name: "Snowflake Row/Mask Policies", pros: "Great RBAC, masking", cons: "SF-only", icon: Lock },
  ]},
];

function Arrow({ label }) {
  return (
    <div className="flex items-center gap-2">
      <ArrowRight className="w-6 h-6 text-slate-500" />
      {label && <span className="text-xs text-slate-500 font-medium">{label}</span>}
    </div>
  );
}

function DomainBadge({ k }) {
  const DIcon = domains[k].icon;
  return (
    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded border ${domains[k].color}`}>
      <DIcon className={`w-3.5 h-3.5 ${domains[k].text}`} />
      <span className={`text-[11px] font-semibold ${domains[k].text}`}>{domains[k].name}</span>
      <span className={`text-[10px] opacity-70 ${domains[k].text}`}>SoR</span>
    </div>
  );
}

function LayerCard({ k, selected, onSelect }) {
  const def = layerDefs[k];
  const Icon = def.icon;
  const lat = latencyBadge(k);

  return (
    <div onClick={() => onSelect(k)} className="min-w-[230px] max-w-[320px] select-none cursor-pointer">
      <Card className={`border-2 ${def.color} ${selected ? "ring-4 ring-blue-400" : ""}`}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon className={`w-6 h-6 ${def.text}`} />
              <CardTitle className={`text-base ${def.text}`}>{def.name}</CardTitle>
            </div>
            <div className="flex items-center gap-1">
              <Badge className={lat.tone}>{lat.label}</Badge>
              <Badge className="bg-teal-100 text-teal-800 border-teal-300">DQ</Badge>
            </div>
          </div>
          <CardDescription className="pt-1 flex items-center gap-2">
            <Layers className="w-4 h-4 text-slate-500" />
            <span>{def.desc}</span>
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-0">
          {/* Domains chips only for sources */}
          {k === "sources" && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {Object.keys(domains).map((d) => (
                <DomainBadge key={d} k={d} />
              ))}
            </div>
          )}

          {/* Key Aspects */}
          <div className="mt-3">
            <div className="text-xs font-semibold text-slate-700 mb-1">Key Aspects</div>
            <ul className="text-xs text-slate-700 grid grid-cols-1 gap-1">
              {def.aspects.map((a, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Data Products */}
          <div className="mt-3">
            <div className="text-xs font-semibold text-slate-700 mb-1">Data Products</div>
            <div className="flex flex-wrap gap-1">
              {def.products.map((p, i) => (
                <Badge key={i} className="bg-slate-100">{p}</Badge>
              ))}
            </div>
          </div>

          {/* Data Quality */}
          {def.dq && (
            <div className="mt-3">
              <div className="text-xs font-semibold text-slate-700 mb-1">Data Quality at this layer</div>
              <div className="flex flex-wrap gap-1">
                {def.dq.map((d, i) => (
                  <Badge key={i} className="bg-teal-50 text-teal-800 border-teal-200">{d}</Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function TechMatrixTable() {
  const [filter, setFilter] = useState("");
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <CardTitle className="text-lg">Technology Options by Layer</CardTitle>
            <CardDescription>Compare choices & trade-offs. Pick per workload, not religion.</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Input placeholder="Filter (e.g., Snowflake, DynamoDB)" value={filter} onChange={(e) => setFilter(e.target.value)} className="w-72" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 pr-4 font-semibold">Layer</th>
                <th className="text-left py-2 pr-4 font-semibold">Option</th>
                <th className="text-left py-2 pr-4 font-semibold">Pros</th>
                <th className="text-left py-2 pr-4 font-semibold">Cons</th>
              </tr>
            </thead>
            <tbody>
              {techMatrix.map((row, i) => (
                row.options
                  .filter((o) => (row.layer + " " + o.name + " " + o.pros + " " + o.cons).toLowerCase().includes(filter.toLowerCase()))
                  .map((opt, j) => {
                    const Icon = opt.icon || Boxes;
                    return (
                      <tr key={`${i}-${j}`} className="border-b align-top">
                        <td className="py-2 pr-4 whitespace-nowrap">{j === 0 ? <span className="font-medium">{row.layer}</span> : <span className="text-slate-400">"</span>}</td>
                        <td className="py-2 pr-4">
                          <div className="flex items-center gap-2"><Icon className="w-4 h-4" />{opt.name}</div>
                        </td>
                        <td className="py-2 pr-4 text-emerald-700">{opt.pros}</td>
                        <td className="py-2 pr-4 text-rose-700">{opt.cons}</td>
                      </tr>
                    );
                  })
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

function Legend() {
  const items = [
    { icon: GitBranch, label: "CDC/Stream" },
    { icon: Shuffle, label: "Transform" },
    { icon: Boxes, label: "Iceberg Table" },
    { icon: Search, label: "Serving/API" },
    { icon: BarChart3, label: "Analytics" },
  ];
  return (
    <div className="flex flex-wrap gap-3 items-center text-xs">
      {items.map((it, idx) => {
        const I = it.icon;
        return (
          <span key={idx} className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-100 border">
            <I className="w-3.5 h-3.5 text-slate-600" /> {it.label}
          </span>
        );
      })}
    </div>
  );
}

export default function RDLArchitectureExplorer() {
  const [selected, setSelected] = useState(null); // layer key
  const [mode, setMode] = useState("single"); // "single" | "dual"

  const flow = useMemo(() => ["sources", "raw", "sanitized", "conformed", "curated", "consumption"], []);

  const exportDesign = () => {
    const json = JSON.stringify({ mode, selectedLayer: selected, layers: layerDefs, domains, techMatrix }, null, 2);
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(json);
      alert("Design JSON copied to clipboard.");
    }
  };

  return (
    <div className="w-full p-6 bg-white text-slate-900">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reporting Data Layer (RDL) — Architecture Explorer</h1>
          <p className="text-slate-600 mt-1">Fast lane for APIs + governed lakehouse for analytics. Real-time CDC and EOD reconciliation, side-by-side.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="text-[11px]">Mode</Badge>
          <div className="flex rounded-xl overflow-hidden border">
            <button className={cn("px-3 py-1 text-sm", mode === "single" ? "bg-slate-900 text-white" : "bg-white")} onClick={() => setMode("single")}>
              Single-copy (Iceberg ↔ Snowflake)
            </button>
            <button className={cn("px-3 py-1 text-sm", mode === "dual" ? "bg-slate-900 text-white" : "bg-white")} onClick={() => setMode("dual")}>
              Dual-copy (Curated → Snowflake)
            </button>
          </div>
          <Button onClick={exportDesign} className="ml-1">Export JSON</Button>
        </div>
      </div>

      {/* Main Flow Diagram */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">End-to-end Data Products Flow</CardTitle>
              <CardDescription>Click any layer for details. Green path = Fast APIs. Purple path = Analytics.</CardDescription>
            </div>
            <Legend />
          </div>
        </CardHeader>
        <CardContent>
          <div className="w-full overflow-x-auto">
            <div className="min-w-[1200px]">
              {/* Main flow: Sources → Raw → Sanitized → Conformed → Curated → Consumption */}
              <div className="flex items-stretch gap-3">
                {flow.map((k, idx) => (
                  <React.Fragment key={k}>
                    <LayerCard k={k} selected={selected === k} onSelect={setSelected} />
                    {idx < flow.length - 1 && (
                      <div className="flex items-center">
                        <Arrow label={idx === 0 ? "Ingest" : idx === 1 ? "Clean" : idx === 2 ? "Model" : idx === 3 ? "Aggregate" : "Consume"} />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Serving Layer - Fast Path */}
              <div className="mt-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-0.5 bg-emerald-400 flex-1" />
                  <Badge className="bg-emerald-100 text-emerald-700">Speed Layer (Fast APIs)</Badge>
                  <div className="h-0.5 bg-emerald-400 flex-1" />
                </div>
                
                <div className="flex items-center gap-3">
                  {/* Show serving layer gets input from conformed */}
                  <div className="min-w-[230px]">
                    <div className="text-xs text-slate-600 mb-2 text-center">EOD Reconciled Data</div>
                    <div className="flex justify-center">
                      <ArrowRight className="w-6 h-6 text-blue-500 transform rotate-90" />
                    </div>
                  </div>
                  
                  <LayerCard k="serving" selected={selected === "serving"} onSelect={setSelected} />
                  
                  <Arrow label="Real-time APIs" />
                  
                  <div className="min-w-[230px]">
                    <Card className="border-dashed border-2 border-emerald-300 bg-emerald-50">
                      <CardContent className="p-3 text-center">
                        <Globe className="w-6 h-6 text-emerald-700 mx-auto mb-2" />
                        <div className="text-sm font-semibold text-emerald-800">Fast Consumption</div>
                        <div className="text-xs text-emerald-700">Advisor Apps, Mobile, Client Portal</div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <div className="text-xs text-slate-600 mt-2 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" /> 
                  Intraday projector streams curated/CDC → DynamoDB/OpenSearch; cache invalidation for hot paths
                </div>
              </div>

              {/* Analytics Path Note */}
              <div className="mt-4">
                <div className="p-3 rounded-lg border bg-purple-50 text-sm text-purple-900">
                  {mode === "single" ? (
                    <div className="flex items-start gap-2">
                      <Boxes className="w-4 h-4 mt-0.5" />
                      <span><b>Analytics Path (Single-copy):</b> Snowflake reads Iceberg directly via external catalog + volume. No duplicate storage; one governance plane.</span>
                    </div>
                  ) : (
                    <div className="flex items-start gap-2">
                      <Boxes className="w-4 h-4 mt-0.5" />
                      <span><b>Analytics Path (Dual-copy):</b> Curated marts are loaded into Snowflake (Snowpipe/COPY) for peak dashboard performance & workload isolation.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Architecture Summary Table */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">Architecture Summary</CardTitle>
          <CardDescription>Layer breakdown with technology mapping and Snowflake positioning</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2">
                  <th className="text-left py-3 pr-6 font-bold">Layer</th>
                  <th className="text-left py-3 pr-6 font-bold">Primary Technology</th>
                  <th className="text-left py-3 pr-6 font-bold">Purpose</th>
                  <th className="text-left py-3 pr-6 font-bold">Latency SLA</th>
                  <th className="text-left py-3 pr-6 font-bold">Snowflake Role</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-slate-50">
                  <td className="py-3 pr-6">
                    <div className="flex items-center gap-2">
                      <Database className="w-4 h-4 text-blue-700" />
                      <span className="font-semibold text-blue-900">Sources</span>
                    </div>
                  </td>
                  <td className="py-3 pr-6 text-slate-700">Aurora/RDS + S3 Files</td>
                  <td className="py-3 pr-6 text-slate-700">Operational systems + vendor data</td>
                  <td className="py-3 pr-6">
                    <Badge className="bg-slate-200 text-slate-800">Varies</Badge>
                  </td>
                  <td className="py-3 pr-6 text-slate-500 italic">Not applicable</td>
                </tr>
                
                <tr className="border-b hover:bg-slate-50">
                  <td className="py-3 pr-6">
                    <div className="flex items-center gap-2">
                      <Cloud className="w-4 h-4 text-slate-700" />
                      <span className="font-semibold text-slate-900">Raw</span>
                    </div>
                  </td>
                  <td className="py-3 pr-6 text-slate-700">S3 + Iceberg</td>
                  <td className="py-3 pr-6 text-slate-700">Immutable source copies</td>
                  <td className="py-3 pr-6">
                    <Badge className="bg-sky-200 text-sky-900">RT/Batch</Badge>
                  </td>
                  <td className="py-3 pr-6 text-slate-500 italic">Not applicable</td>
                </tr>
                
                <tr className="border-b hover:bg-slate-50">
                  <td className="py-3 pr-6">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-700" />
                      <span className="font-semibold text-yellow-900">Sanitized</span>
                    </div>
                  </td>
                  <td className="py-3 pr-6 text-slate-700">S3 + Iceberg</td>
                  <td className="py-3 pr-6 text-slate-700">Cleaned, typed, validated</td>
                  <td className="py-3 pr-6">
                    <Badge className="bg-amber-200 text-amber-900">Real-time</Badge>
                  </td>
                  <td className="py-3 pr-6 text-slate-500 italic">Not applicable</td>
                </tr>
                
                <tr className="border-b hover:bg-slate-50">
                  <td className="py-3 pr-6">
                    <div className="flex items-center gap-2">
                      <Database className="w-4 h-4 text-green-700" />
                      <span className="font-semibold text-green-900">Conformed</span>
                    </div>
                  </td>
                  <td className="py-3 pr-6 text-slate-700">S3 + Iceberg</td>
                  <td className="py-3 pr-6 text-slate-700">Canonical cross-domain model</td>
                  <td className="py-3 pr-6">
                    <Badge className="bg-green-200 text-green-900">&lt; 1 min</Badge>
                  </td>
                  <td className="py-3 pr-6">
                    <Badge className="bg-blue-100 text-blue-800">Single-copy mode</Badge>
                    <div className="text-xs text-slate-600 mt-1">External Iceberg tables</div>
                  </td>
                </tr>
                
                <tr className="border-b hover:bg-slate-50">
                  <td className="py-3 pr-6">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-purple-700" />
                      <span className="font-semibold text-purple-900">Curated</span>
                    </div>
                  </td>
                  <td className="py-3 pr-6 text-slate-700">S3 + Iceberg</td>
                  <td className="py-3 pr-6 text-slate-700">Business-ready marts</td>
                  <td className="py-3 pr-6">
                    <Badge className="bg-violet-200 text-violet-900">&lt; 5 min</Badge>
                  </td>
                  <td className="py-3 pr-6">
                    <Badge className="bg-purple-100 text-purple-800">Both modes</Badge>
                    <div className="text-xs text-slate-600 mt-1">Primary BI consumption layer</div>
                  </td>
                </tr>
                
                <tr className="border-b hover:bg-slate-50">
                  <td className="py-3 pr-6">
                    <div className="flex items-center gap-2">
                      <Search className="w-4 h-4 text-red-700" />
                      <span className="font-semibold text-red-900">Serving</span>
                    </div>
                  </td>
                  <td className="py-3 pr-6 text-slate-700">DynamoDB + OpenSearch</td>
                  <td className="py-3 pr-6 text-slate-700">Fast operational APIs</td>
                  <td className="py-3 pr-6">
                    <Badge className="bg-red-200 text-red-900">&lt; 50 ms</Badge>
                  </td>
                  <td className="py-3 pr-6 text-slate-500 italic">Not applicable</td>
                </tr>
                
                <tr className="border-b hover:bg-slate-50">
                  <td className="py-3 pr-6">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-indigo-700" />
                      <span className="font-semibold text-indigo-900">Consumption</span>
                    </div>
                  </td>
                  <td className="py-3 pr-6 text-slate-700">Multi-channel (APIs, BI, Apps)</td>
                  <td className="py-3 pr-6 text-slate-700">End-user interfaces</td>
                  <td className="py-3 pr-6">
                    <Badge className="bg-indigo-200 text-indigo-900">Varies</Badge>
                  </td>
                  <td className="py-3 pr-6">
                    <Badge className="bg-indigo-100 text-indigo-800">Primary analytics consumer</Badge>
                    <div className="text-xs text-slate-600 mt-1">BI, dashboards, reports</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
              <Boxes className="w-4 h-4" />
              Snowflake Integration Modes
            </h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-white rounded border">
                <div className="font-semibold text-green-800 mb-1">Single-Copy Mode (Recommended)</div>
                <ul className="text-slate-700 space-y-1 text-xs">
                  <li>• Snowflake reads <b>Conformed</b> and <b>Curated</b> Iceberg tables directly</li>
                  <li>• External catalog integration via Glue</li>
                  <li>• No data duplication, single governance plane</li>
                  <li>• Cost efficient, single source of truth</li>
                </ul>
              </div>
              <div className="p-3 bg-white rounded border">
                <div className="font-semibold text-purple-800 mb-1">Dual-Copy Mode</div>
                <ul className="text-slate-700 space-y-1 text-xs">
                  <li>• Copy <b>Curated</b> marts into Snowflake native tables</li>
                  <li>• Snowpipe/COPY for incremental loads</li>
                  <li>• Peak dashboard performance</li>
                  <li>• Workload isolation for heavy BI</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="layers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="layers">Layer Details</TabsTrigger>
          <TabsTrigger value="tech">Tech Stack Matrix</TabsTrigger>
          <TabsTrigger value="latency">Latency & Access</TabsTrigger>
        </TabsList>

        <TabsContent value="layers">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Boxes className="w-4 h-4" /> {selected ? layerDefs[selected].name : "Select a layer above"}
              </CardTitle>
              <CardDescription>
                {selected ? layerDefs[selected].desc : "Click a card in the flow to see specifics for that layer."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selected ? (
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm font-semibold mb-2">Key Characteristics</div>
                    <ul className="text-sm text-slate-700 space-y-1">
                      {layerDefs[selected].aspects.map((a, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-400" />
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-sm font-semibold mb-2">Data Products Delivered</div>
                    <div className="flex flex-wrap gap-2">
                      {layerDefs[selected].products.map((p, i) => (
                        <Badge key={i}>{p}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-slate-600">No layer selected.</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tech">
          <TechMatrixTable />
        </TabsContent>

        <TabsContent value="latency">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Latency Tiers & Access Patterns</CardTitle>
              <CardDescription>Where to serve which endpoints.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="border-emerald-200">
                  <CardHeader className="pb-1">
                    <CardTitle className="text-base text-emerald-800">Tier A — ≤50 ms</CardTitle>
                    <CardDescription>Real-time UI widgets</CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm text-slate-700">
                    <ul className="space-y-1">
                      <li>• <b>DynamoDB</b> read models (+DAX)</li>
                      <li>• OpenSearch for type-ahead</li>
                      <li>• API Gateway/AppSync + CloudFront cache</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-amber-200">
                  <CardHeader className="pb-1">
                    <CardTitle className="text-base text-amber-800">Tier B — 50–200 ms</CardTitle>
                    <CardDescription>Filtered lists, small aggs</CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm text-slate-700">
                    <ul className="space-y-1">
                      <li>• DynamoDB queries (LSIs/GSIs)</li>
                      <li>• Short TTL Redis cache</li>
                      <li>• Fan-out joins in API (carefully)</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-violet-200">
                  <CardHeader className="pb-1">
                    <CardTitle className="text-base text-violet-800">Tier C — 200 ms–2 s</CardTitle>
                    <CardDescription>Ad-hoc/BI/Heavy reports</CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm text-slate-700">
                    <ul className="space-y-1">
                      <li>• Snowflake (external Iceberg or dual-copy)</li>
                      <li>• Athena/Trino for S3 direct</li>
                      <li>• Export/PDF jobs async</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Footer */}
      <div className="text-xs text-slate-500 mt-6">
        Tip: This is a <b>Lambda</b> architecture: green = Speed Layer (intraday), purple = Batch Layer (analytics). Toggle <b>Mode</b> to switch Snowflake consumption model. Kappa would remove the Batch path and replay the stream for reprocessing.
      </div>
    </div>
  );
}