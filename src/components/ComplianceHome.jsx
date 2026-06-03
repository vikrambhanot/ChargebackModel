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

// Capgemini palette
const NAVY = '#14213D';
const DEEP_NAVY = '#0B1426';
const CAP_BLUE = '#0070AD';
const CAP_BLUE_DARK = '#005A8C';
const OFF_WHITE = '#F5F5F0';

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
      {/* HERO — light section with abstract architectural composition + translucent blue overlay card */}
      <section style={{ backgroundColor: '#E8E8E0', position: 'relative', overflow: 'hidden' }}>
        <div className="max-w-7xl mx-auto px-6 relative" style={{ minHeight: '620px' }}>
          {/* Abstract composition — geometric shapes evoking the bookshelf-sculpture vibe */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(135deg, transparent 0%, transparent 50%, rgba(20,33,61,0.04) 50%, rgba(20,33,61,0.04) 100%),
                radial-gradient(circle at 75% 30%, rgba(0,112,173,0.06) 0%, transparent 50%)
              `,
            }}
          />

          {/* Platform stack — right side, anchored opposite the translucent card */}
          <div
            className="absolute hidden lg:block"
            style={{ right: '4%', top: '60px' }}
          >
            <PlatformStack />
          </div>

          {/* Translucent blue overlay card — the signature Capgemini move */}
          <div
            className="relative z-10"
            style={{
              backgroundColor: 'rgba(0, 112, 173, 0.92)',
              padding: '60px 56px',
              maxWidth: '620px',
              marginTop: '80px',
              marginBottom: '80px',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          >
            <div className="text-xs font-medium text-white/80 uppercase tracking-widest mb-4">
              Capgemini Financial Services
            </div>
            <h1 className="text-white font-light tracking-tight mb-4" style={{ fontSize: '52px', lineHeight: '1.05' }}>
              The Compliance<br />Intelligence Platform
            </h1>
            <p className="text-white/90 text-base leading-relaxed mb-8 max-w-md">
              Regulatory AI for financial services. Customized to your firm's
              rules, processes, and risk thresholds.
            </p>
            <button
              onClick={() => onLaunch('finra')}
              className="inline-flex items-center gap-3 bg-white px-7 py-3.5 font-semibold text-sm hover:bg-slate-100 transition-colors"
              style={{ color: NAVY }}
            >
              Explore the platform
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* MODULE GRID — dark band (Highlights-style) */}
      <section style={{ backgroundColor: DEEP_NAVY }}>
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex items-baseline justify-between mb-10">
            <div>
              <div className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: CAP_BLUE }}>
                Platform Modules
              </div>
              <h2 className="text-white font-light tracking-tight" style={{ fontSize: '40px', lineHeight: '1.1' }}>
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

      {/* CTA BAND — light, closes the band pattern back to off-white before footer goes dark */}
      <section style={{ backgroundColor: OFF_WHITE }}>
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: CAP_BLUE }}>
                Get Started
              </div>
              <h3 className="font-light tracking-tight mb-4" style={{ fontSize: '36px', lineHeight: '1.15', color: NAVY }}>
                Bring AI-powered compliance review to your firm.
              </h3>
              <p className="text-base leading-relaxed" style={{ color: '#4A5568' }}>
                Schedule a briefing with our financial services compliance practice to
                explore how the platform applies to your regulatory environment.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 md:justify-end">
              <button
                onClick={() => onLaunch('finra')}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 font-semibold text-sm text-white transition-colors"
                style={{ backgroundColor: CAP_BLUE }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = CAP_BLUE_DARK)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = CAP_BLUE)}
              >
                Launch FINRA module
                <ArrowRight size={16} />
              </button>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 font-semibold text-sm border-2 transition-colors"
                style={{ borderColor: NAVY, color: NAVY }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = NAVY; e.currentTarget.style.color = 'white'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = NAVY; }}
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
        backgroundColor: isActive ? CAP_BLUE : '#1A2B47',
        minHeight: '280px',
      }}
      onMouseEnter={(e) => {
        if (isActive) {
          e.currentTarget.style.backgroundColor = CAP_BLUE_DARK;
        }
      }}
      onMouseLeave={(e) => {
        if (isActive) {
          e.currentTarget.style.backgroundColor = CAP_BLUE;
        }
      }}
    >
      <div className="p-7 h-full flex flex-col">
        <div className="flex items-start justify-between mb-6">
          <div className="w-12 h-12 flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}>
            <Icon size={22} className="text-white" />
          </div>
          {isActive && (
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold text-white"
              style={{ backgroundColor: 'rgba(255,255,255,0.18)', letterSpacing: '0.05em' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
              LIVE
            </span>
          )}
        </div>

        <div className="text-xs font-medium uppercase tracking-widest mb-2 text-white/60">
          {domain.subtitle}
        </div>
        <h3 className="text-white font-light mb-4" style={{ fontSize: '22px', lineHeight: '1.2' }}>
          {domain.title}
        </h3>
        <p className="text-white/75 text-sm leading-relaxed mb-6 flex-1">
          {domain.description}
        </p>

        {isActive ? (
          <div className="flex items-center gap-2 text-sm font-semibold text-white group-hover:gap-3 transition-all">
            Launch module
            <ArrowRight size={16} />
          </div>
        ) : (
          <div className="text-sm font-medium text-white/50">
            On roadmap
          </div>
        )}
      </div>
    </div>
  );
}