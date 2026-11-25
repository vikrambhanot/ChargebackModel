import {
  ShieldCheck,
  Scale,
  Banknote,
  UserCheck,
  LineChart,
  Lock,
  Building2,
  HandCoins,
  ScrollText,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';
import PlatformStack from './PlatformStack';

// Onix-aligned palette (keep in sync with App.jsx)
const ONIX_RED = '#E31837';
const ONIX_RED_DARK = '#B8122C';
const INK = '#141414';
const CHARCOAL = '#1F1F1F';
const CARD_DARK = '#262626';
const OFF_WHITE = '#F7F7F7';
const LIGHT_GRAY = '#ECECEC';

const Triangle = ({ size = 14, color = ONIX_RED, style = {} }) => (
  <span
    aria-hidden="true"
    style={{
      display: 'inline-block',
      width: 0,
      height: 0,
      borderLeft: `${size * 0.6}px solid transparent`,
      borderRight: `${size * 0.6}px solid transparent`,
      borderBottom: `${size}px solid ${color}`,
      ...style,
    }}
  />
);

const COMPLIANCE_DOMAINS = [
  {
    id: 'finra',
    title: 'FINRA Compliance',
    subtitle: 'Rule 2210 · 2090 · 2111 · Reg BI',
    description:
      'AI-powered analysis of broker-dealer communications, marketing materials, and disclosures against FINRA rules and SEC Regulation Best Interest.',
    icon: ShieldCheck,
    route: 'finra',
    active: true,
  },
  {
    id: 'aml-bsa',
    title: 'AML / BSA Monitoring',
    subtitle: 'Bank Secrecy Act · FinCEN',
    description:
      'Transaction monitoring, suspicious activity detection, and SAR narrative drafting against Bank Secrecy Act and FinCEN requirements.',
    icon: Banknote,
  },
  {
    id: 'kyc',
    title: 'KYC & Customer Due Diligence',
    subtitle: 'CIP · CDD · Beneficial Ownership',
    description:
      'Identity verification, customer risk scoring, and beneficial ownership analysis aligned to Customer Identification Program rules.',
    icon: UserCheck,
  },
  {
    id: 'reg-bi',
    title: 'SEC Regulation Best Interest',
    subtitle: 'Reg BI · Form CRS',
    description:
      'Suitability and best interest obligation review for retail recommendations, with Form CRS disclosure verification.',
    icon: Scale,
  },
  {
    id: 'trade-surveillance',
    title: 'Trade Surveillance',
    subtitle: 'Market Abuse · Insider Trading',
    description:
      'Detection of market manipulation, insider trading patterns, and front-running across equity and derivatives trading activity.',
    icon: LineChart,
  },
  {
    id: 'privacy',
    title: 'Data Privacy Compliance',
    subtitle: 'Reg S-P · GDPR · CCPA',
    description:
      'Customer data handling audits, privacy notice review, and breach response readiness across federal and state privacy regimes.',
    icon: Lock,
  },
  {
    id: 'occ-banking',
    title: 'OCC Banking Compliance',
    subtitle: 'Reg W · Reg O · Heightened Standards',
    description:
      'National bank regulatory compliance covering affiliate transactions, insider lending, and OCC heightened standards.',
    icon: Building2,
  },
  {
    id: 'fair-lending',
    title: 'Fair Lending & ECOA',
    subtitle: 'ECOA · Reg B · HMDA',
    description:
      'Disparate impact analysis, credit decision review, and HMDA reporting compliance for lending operations.',
    icon: HandCoins,
  },
  {
    id: 'senior-protection',
    title: 'Senior Investor Protection',
    subtitle: 'Rule 2165 · Trusted Contact',
    description:
      'Identification of potential financial exploitation of senior investors and review of trusted contact procedures.',
    icon: AlertTriangle,
  },
  {
    id: 'recordkeeping',
    title: 'Books & Records',
    subtitle: 'Rule 17a-4 · Rule 4511',
    description:
      'Electronic recordkeeping audits, retention period validation, and WORM storage compliance for regulated communications.',
    icon: ScrollText,
  },
];

export default function ComplianceHome({ onLaunch }) {
  return (
    <div>
      {/* HERO */}
      <section style={{ backgroundColor: LIGHT_GRAY, position: 'relative', overflow: 'hidden' }}>
        <div className="max-w-7xl mx-auto px-6 relative" style={{ minHeight: '620px' }}>
          {/* Subtle background composition */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(135deg, transparent 0%, transparent 50%, rgba(20,20,20,0.035) 50%, rgba(20,20,20,0.035) 100%),
                radial-gradient(circle at 75% 30%, rgba(227,24,55,0.06) 0%, transparent 50%)
              `,
            }}
          />

          {/* Platform stack — right side */}
          <div className="absolute hidden lg:block" style={{ right: '4%', top: '60px' }}>
            <PlatformStack />
          </div>

          {/* Hero card */}
          <div
            className="relative z-10"
            style={{
              backgroundColor: 'rgba(20, 20, 20, 0.94)',
              borderTop: `4px solid ${ONIX_RED}`,
              padding: '60px 56px',
              maxWidth: '620px',
              marginTop: '80px',
              marginBottom: '80px',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          >
            <Triangle size={22} style={{ position: 'absolute', top: '28px', right: '32px' }} />
            <div
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: ONIX_RED }}
            >
              AI Compliance Workbench
            </div>
            <h1
              className="text-white font-light tracking-tight mb-4"
              style={{ fontSize: '52px', lineHeight: '1.05' }}
            >
              The Compliance<br />Intelligence Platform
            </h1>
            <p className="text-white/80 text-base leading-relaxed mb-8 max-w-md">
              Regulatory AI for financial services. Customized to your firm's
              rules, processes, and risk thresholds.
            </p>
            <button
              onClick={() => onLaunch('finra')}
              className="inline-flex items-center gap-3 px-7 py-3.5 font-semibold text-sm text-white transition-colors"
              style={{ backgroundColor: ONIX_RED }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = ONIX_RED_DARK)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = ONIX_RED)}
            >
              Explore the platform
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* MODULE GRID */}
      <section style={{ backgroundColor: INK }}>
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex items-baseline justify-between mb-10">
            <div>
              <div
                className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: ONIX_RED }}
              >
                <Triangle size={10} />
                Platform Modules
              </div>
              <h2
                className="text-white font-light tracking-tight"
                style={{ fontSize: '40px', lineHeight: '1.1' }}
              >
                Ten regulatory domains.<br />One platform.
              </h2>
            </div>
            <span className="text-sm text-slate-400 hidden md:block">
              Domain-trained AI for regulated financial services
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {COMPLIANCE_DOMAINS.map((domain) => (
              <DomainCard key={domain.id} domain={domain} onLaunch={onLaunch} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section style={{ backgroundColor: OFF_WHITE }}>
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <div
                className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: ONIX_RED }}
              >
                <Triangle size={10} />
                Get Started
              </div>
              <h3
                className="font-light tracking-tight mb-4"
                style={{ fontSize: '36px', lineHeight: '1.15', color: CHARCOAL }}
              >
                Bring AI-powered compliance review to your firm.
              </h3>
              <p className="text-base leading-relaxed" style={{ color: '#4A4A4A' }}>
                Schedule a briefing to explore how the platform applies to your
                regulatory environment.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 md:justify-end">
              <button
                onClick={() => onLaunch('finra')}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 font-semibold text-sm text-white transition-colors"
                style={{ backgroundColor: ONIX_RED }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = ONIX_RED_DARK)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = ONIX_RED)}
              >
                Launch FINRA module
                <ArrowRight size={16} />
              </button>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 font-semibold text-sm border-2 transition-colors"
                style={{ borderColor: CHARCOAL, color: CHARCOAL }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = CHARCOAL;
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = CHARCOAL;
                }}
              >
                Schedule a briefing
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function DomainCard({ domain, onLaunch }) {
  const Icon = domain.icon;
  const isActive = !!domain.active;

  const handleClick = () => {
    if (isActive) onLaunch(domain.route);
  };

  return (
    <div
      onClick={handleClick}
      className={`group relative overflow-hidden transition-all duration-300 ${
        isActive ? 'cursor-pointer' : ''
      }`}
      style={{
        backgroundColor: isActive ? ONIX_RED : CARD_DARK,
        borderTop: isActive ? 'none' : '1px solid rgba(255,255,255,0.06)',
        minHeight: '280px',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = isActive ? ONIX_RED_DARK : '#2E2E2E';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = isActive ? ONIX_RED : CARD_DARK;
      }}
    >
      <div className="p-7 h-full flex flex-col">
        <div className="flex items-start justify-between mb-6">
          <div
            className="w-12 h-12 flex items-center justify-center"
            style={{ backgroundColor: isActive ? 'rgba(255,255,255,0.15)' : 'rgba(227,24,55,0.12)' }}
          >
            <Icon size={22} style={{ color: isActive ? '#FFFFFF' : ONIX_RED }} />
          </div>
          {isActive && (
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold text-white"
              style={{ backgroundColor: 'rgba(255,255,255,0.2)', letterSpacing: '0.05em' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
              LIVE
            </span>
          )}
        </div>

        <div
          className="text-xs font-medium uppercase tracking-widest mb-2"
          style={{ color: isActive ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.5)' }}
        >
          {domain.subtitle}
        </div>
        <h3 className="text-white font-light mb-4" style={{ fontSize: '22px', lineHeight: '1.2' }}>
          {domain.title}
        </h3>
        <p
          className="text-sm leading-relaxed mb-6 flex-1"
          style={{ color: isActive ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.65)' }}
        >
          {domain.description}
        </p>

        {isActive ? (
          <div className="flex items-center gap-2 text-sm font-semibold text-white group-hover:gap-3 transition-all">
            Launch module
            <ArrowRight size={16} />
          </div>
        ) : (
          <div className="text-xs font-semibold uppercase tracking-widest text-white/40">
            Coming soon
          </div>
        )}
      </div>
    </div>
  );
}