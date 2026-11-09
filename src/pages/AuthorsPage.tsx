import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  GraduationCap,
  Briefcase,
  Phone,
  Mail,
  Copy,
  Check,
  ShieldCheck,
  BookOpen,
  Code2,
  Building2,
  ExternalLink,
  Sparkles,
  Award,
  ChevronRight,
  FileSpreadsheet,
  CheckCircle2,
  UserCheck
} from 'lucide-react';

import nozimjonov3x4Img from '../assets/authors/nozimjonov_3x4.jpg';
import esonboyDefaultSvg from '../assets/authors/esonboy_default.jpg';

interface AuthorData {
  id: string;
  name: string;
  role: string;
  roleBadge: string;
  degree: string;
  institution: string;
  workplace?: string;
  specialty: string;
  phone: string;
  formattedPhone: string;
  photo3x4: string;
  photoGrad?: string;
  hasPhotoToggle?: boolean;
  contributions: string[];
  skills: string[];
}

export const AuthorsPage: React.FC = () => {
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);
  const [nozimjonovPhotoView, setNozimjonovPhotoView] = useState<'3x4' | 'grad'>('3x4');

  const handleCopyPhone = (phone: string, id: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(id);
    setTimeout(() => {
      setCopiedPhone(null);
    }, 2000);
  };

  const authors: AuthorData[] = [
    {
      id: 'nozimjonov',
      name: "Nozimjonov Muhammadabdulloh Murodjon o'g'li",
      role: "Muallif va Dasturiy ta'minot muhandisi",
      roleBadge: "Dasturchi & Muhandis",
      degree: "Oliy",
      institution: "Andijon Davlat Universiteti",
      specialty: "Kompyuter injiniringi (Computer Engineering)",
      phone: "+998938891505",
      formattedPhone: "+998 93 889 15 05",
      photo3x4: nozimjonov3x4Img,
      hasPhotoToggle: true,
      skills: ["Kompyuter injiniringi", "Web & Software Architecture", "Kiberxavfsizlik tizimlari", "UI/UX & Accessibility"],
      contributions: [
        "Platformaning to'liq arxitekturasi va responsive foydalanuvchi interfeysini (React + Vite + Tailwind) loyihalash",
        "30 ta mavzuning interaktiv didaktik resurslari, xavfsiz laboratoriya simulyatorlari va nazorat test modulini yaratish",
        "Oflayn (file://) va onlayn (Netlify) muhitda 100% mustaqil ishlovchi statik ma'lumotlar bazasini optimallashtirish",
        "WCAG AA xalqaro standartiga mos yuqori kontrastli qorong'i/yorug' mavzular va klaviatura navigatsiyasini joriy etish"
      ]
    },
    {
      id: 'sobirov',
      name: "Sobirov Esonboy Gulmurodjon o’g’li",
      role: "Muallif va Pedagogik metodist",
      roleBadge: "Metodist & Pedagog",
      degree: "Oliy",
      institution: "Andijon Davlat universiteti",
      workplace: "Andijon pedagogika texnikumi",
      specialty: "Informatika o’qitish metodikasi",
      phone: "+998991014640",
      formattedPhone: "+998 99 101 46 40",
      photo3x4: esonboyDefaultSvg,
      hasPhotoToggle: false,
      skills: ["Informatika o'qitish metodikasi", "Didaktik modellashtirish", "Pedagogik texnologiyalar", "Baholash mezonlari"],
      contributions: [
        "TD-50610401 kiberxavfsizlik moduli bo'yicha 60 soatlik o'quv dasturi va mavzular taqsimotini ishlab chiqish",
        "O'qitishning 4 ta tasdiqlangan ilg'or metodi (Aqliy hujum, Keys-stadi, Guruhli ish, Simulyatsiya) metodikasini yaratish",
        "Talabalarning ON1–ON4 ta'limiy natijalarini baholash tizimi, 300 ta nazorat testi va rasmiy glossariyni shakllantirish",
        "Andijon pedagogika texnikumi va oliy ta'lim muassasalari ta'lim standartlari o'rtasidagi uzviylikni ta'minlash"
      ]
    }
  ];

  return (
    <div className="mx-auto max-w-content px-4 sm:px-6 py-8 space-y-10">
      {/* 1. Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-muted">
        <Link to="/" className="hover:text-accent transition-colors">
          Bosh sahifa
        </Link>
        <ChevronRight className="h-3 w-3 opacity-50" />
        <span className="text-text font-semibold">Mu'alliflar</span>
      </nav>

      {/* 2. Page Hero Header */}
      <div className="relative overflow-hidden rounded-card border border-border bg-surface p-6 sm:p-8 shadow-card">
        {/* Subtle Background Glow Accent */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-accent-2/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-chip bg-accent-soft px-3 py-1 text-xs font-bold text-accent border border-accent/20">
            <Users className="h-4 w-4" />
            <span>Raqamli ta'lim resursi (RTR) ijodiy guruhi</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text tracking-tight">
            Kiberxavfsizlik fani mualliflari
          </h1>

          <p className="text-xs sm:text-sm text-muted max-w-3xl leading-relaxed">
            O'zbekiston Respublikasi Oliy ta'lim, fan va innovatsiyalar vazirligi tasdiqlagan <strong>TD-50610401</strong> modul kodi bo'yicha 60 soatlik (30 ta mavzu) "Kiberxavfsizlik" elektron darslik majmuasi va interaktiv ta'limiy platformasining yaratuvchi mualliflari to'g'risida to'liq rasmiy ma'lumotlar.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-semibold">
            <div className="flex items-center gap-1.5 rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-text">
              <ShieldCheck className="h-3.5 w-3.5 text-accent" />
              <span>Modul: TD-50610401</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-text">
              <BookOpen className="h-3.5 w-3.5 text-accent-2" />
              <span>60 soat • 30 para</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-text">
              <Building2 className="h-3.5 w-3.5 text-warning" />
              <span>Andijon Davlat Universiteti</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. The 2 Authors Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {authors.map((author) => {
          const isNozimjonov = author.id === 'nozimjonov';
          const currentImg = isNozimjonov
            ? (nozimjonovPhotoView === '3x4' ? author.photo3x4 : author.photoGrad || author.photo3x4)
            : author.photo3x4;

          return (
            <div
              key={author.id}
              className="rounded-card border border-border bg-surface shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              {/* Card Top Banner Accent */}
              <div className="h-2 w-full bg-gradient-to-r from-accent to-accent-2" />

              <div className="p-6 sm:p-8 space-y-6 flex-1">
                {/* Upper section: 3x4 Photo + Primary Bio */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  {/* 3x4 Photo Frame */}
                  <div className="shrink-0 flex flex-col items-center">
                    <div className="relative w-36 sm:w-44 aspect-[3/4] rounded-2xl border-2 border-border group-hover:border-accent/40 shadow-md overflow-hidden bg-surface-2 transition-all">
                      <img
                        src={currentImg}
                        alt={`${author.name} 3x4 rasmiy fotosurati`}
                        className="w-full h-full object-cover object-center"
                        loading="eager"
                      />

                      {/* 3x4 Badge overlay */}
                      <div className="absolute top-2 left-2 rounded-md bg-black/60 backdrop-blur-sm px-1.5 py-0.5 text-[10px] font-mono font-bold text-white border border-white/20">
                        {isNozimjonov && nozimjonovPhotoView === 'grad' ? 'Bitiruv' : '3×4 Format'}
                      </div>
                    </div>

                    {/* Photo Switcher for Nozimjonov (3x4 vs Graduation) */}
                    {author.hasPhotoToggle && (
                      <div className="mt-2.5 inline-flex items-center rounded-btn border border-border bg-surface-2/80 p-0.5 text-[11px] font-semibold text-muted">
                        <button
                          type="button"
                          onClick={() => setNozimjonovPhotoView('3x4')}
                          className={`px-2.5 py-1 rounded-md transition-colors ${nozimjonovPhotoView === '3x4'
                            ? 'bg-accent text-white font-bold shadow-sm'
                            : 'hover:text-text'
                            }`}
                        >
                          3×4 Rasmiy
                        </button>
                        <button
                          type="button"
                          onClick={() => setNozimjonovPhotoView('grad')}
                          className={`px-2.5 py-1 rounded-md transition-colors ${nozimjonovPhotoView === 'grad'
                            ? 'bg-accent text-white font-bold shadow-sm'
                            : 'hover:text-text'
                            }`}
                        >
                          Akademik
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Author Name and Core Titles */}
                  <div className="space-y-3 text-center sm:text-left min-w-0 flex-1">
                    <div className="inline-flex items-center gap-1.5 rounded-chip bg-accent-soft px-2.5 py-0.5 text-[11px] font-bold text-accent">
                      <Sparkles className="h-3 w-3" />
                      <span>{author.roleBadge}</span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-extrabold text-text leading-snug">
                      {author.name}
                    </h2>

                    <p className="text-xs font-medium text-accent-2">
                      {author.role}
                    </p>

                    {/* Quick Badge Chips */}
                    <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start pt-1">
                      {author.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="rounded-md bg-surface-2 border border-border px-2 py-0.5 text-[10px] font-semibold text-muted"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Structured Metadata List */}
                <div className="space-y-3 rounded-xl border border-border/70 bg-surface-2/40 p-4 text-xs">
                  {/* Ma'lumoti */}
                  <div className="flex items-start gap-3">
                    <GraduationCap className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <div>
                      <span className="text-muted block text-[11px]">Ma'lumoti va Universiteti:</span>
                      <strong className="text-text font-semibold">
                        {author.degree ? `${author.degree}, ` : ''}{author.institution}
                      </strong>
                    </div>
                  </div>

                  {/* Agar alohida ish joyi bo'lsa (Sobirov E.) */}
                  {author.workplace && (
                    <div className="flex items-start gap-3">
                      <Building2 className="h-4 w-4 text-accent-2 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-muted block text-[11px]">Ish joyi / Muassasa:</span>
                        <strong className="text-text font-semibold">{author.workplace}</strong>
                      </div>
                    </div>
                  )}

                  {/* Mutaxassisligi */}
                  <div className="flex items-start gap-3">
                    <Briefcase className="h-4 w-4 text-warning shrink-0 mt-0.5" />
                    <div>
                      <span className="text-muted block text-[11px]">Mutaxassisligi:</span>
                      <strong className="text-text font-semibold">{author.specialty}</strong>
                    </div>
                  </div>

                  {/* Telefon raqami */}
                  <div className="flex items-center justify-between pt-1 border-t border-border/50">
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-success shrink-0" />
                      <div>
                        <span className="text-muted block text-[11px]">Aloqa telefoni:</span>
                        <a
                          href={`tel:${author.phone}`}
                          className="text-text font-mono font-bold hover:text-accent transition-colors"
                        >
                          {author.formattedPhone}
                        </a>
                      </div>
                    </div>

                    {/* Copy Phone Button */}
                    <button
                      type="button"
                      onClick={() => handleCopyPhone(author.phone, author.id)}
                      className="inline-flex items-center gap-1 rounded-btn border border-border bg-surface px-2.5 py-1 text-[11px] font-semibold text-muted hover:text-text hover:bg-surface-2 transition-colors"
                      title="Telefon raqamidan nusxa olish"
                    >
                      {copiedPhone === author.id ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-success" />
                          <span className="text-success font-bold">Nusxa olindi</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Nusxa olish</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Loyihadagi hissasi va vazifalari */}
                <div className="space-y-2.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
                    <span>Loyiha doirasidagi asosiy vazifalar</span>
                  </h3>
                  <ul className="space-y-2 text-xs text-muted leading-relaxed">
                    {author.contributions.map((item, cIdx) => (
                      <li key={cIdx} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="border-t border-border bg-surface-2/60 p-4 px-6 sm:px-8 flex items-center justify-between text-xs">
                <a
                  href={`tel:${author.phone}`}
                  className="inline-flex items-center gap-1.5 font-bold text-accent hover:text-accent-hover transition-colors"
                >
                  <Phone className="h-3.5 w-3.5" />
                  <span>Qo'ng'iroq qilish</span>
                </a>

                <span className="text-[11px] text-muted font-mono">
                  {author.institution}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Collaborative Academic & Engineering Synergy Card */}
      <div className="rounded-card border border-border bg-surface p-6 sm:p-8 shadow-card space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
            <Award className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-text">
              Pedagogika va Dasturiy Injiniring Uyg'unligi
            </h3>
            <p className="text-xs text-muted">
              Raqamli ta'lim resursining ilmiy-metodik va texnologik xususiyatlari
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs leading-relaxed">
          <div className="rounded-xl border border-border bg-surface-2/40 p-4 space-y-2">
            <div className="flex items-center gap-2 font-bold text-text">
              <Code2 className="h-4 w-4 text-accent" />
              <span>Zamonaviy Texnologik Baza</span>
            </div>
            <p className="text-muted">
              Vite, React, Tailwind CSS va Manrope/Carlito shriftlari asosida yaratilgan platforma butunlay oflayn (<code className="font-mono text-[11px] text-text">file://</code>) hamda serverda tezkor va uzluksiz ishlaydi.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-surface-2/40 p-4 space-y-2">
            <div className="flex items-center gap-2 font-bold text-text">
              <BookOpen className="h-4 w-4 text-accent-2" />
              <span>Interaktiv Metodik Majmua</span>
            </div>
            <p className="text-muted">
              Har bir para uchun 9 ta to'liq tab: Maqsad, Ma'ruza (20x20x30x15 mm rasmiy me'yor), Metodlar, Video, Taqdimot, Didaktik, Amaliyot, Nazorat va Glossariy ishlab chiqilgan.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-surface-2/40 p-4 space-y-2">
            <div className="flex items-center gap-2 font-bold text-text">
              <ShieldCheck className="h-4 w-4 text-success" />
              <span>ON1–ON4 Ta'lim Natijalari</span>
            </div>
            <p className="text-muted">
              O'quv dasturi davlat ta'lim standarti talablariga mos ravishda axborot xavfsizligi, kriptografiya, tarmoq himoyasi va insidentlar monitoringi kompetensiyalarini to'liq qamrab oladi.
            </p>
          </div>
        </div>
      </div>

      {/* 5. Direct Quick Links & Jury Coverage Banner */}
      <div className="rounded-card border border-border bg-surface-2 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="font-bold text-sm text-text">
            O'quv dasturi va qamrov matritsasi bilan tanishish
          </h4>
          <p className="text-xs text-muted">
            Hakamlar hay'ati uchun 30 ta paraning rasmiy ta'limiy natijalari va metodlar qamrovi
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/coverage"
            className="inline-flex items-center gap-2 rounded-btn bg-accent px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-accent-hover transition-colors"
          >
            <FileSpreadsheet className="h-4 w-4" />
            <span>Qamrov matritsasi (Jury)</span>
          </Link>

          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-btn border border-border bg-surface px-4 py-2 text-xs font-bold text-text hover:bg-surface-2 transition-colors"
          >
            <BookOpen className="h-4 w-4" />
            <span>30 ta Para Mundarijasi</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

