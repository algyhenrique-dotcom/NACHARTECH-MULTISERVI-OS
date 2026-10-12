import React from 'react';
import { 
  ShieldCheck, 
  Target, 
  Compass, 
  Award, 
  Wrench, 
  Users, 
  MapPin, 
  CheckCircle2,
  Building
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AboutView: React.FC = () => {
  const { navigate, t } = useApp();

  return (
    <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold">
          <Building className="w-3.5 h-3.5" />
          <span>Empresa Moçambicana de Tecnologia</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
          Sobre a <span className="text-blue-600">NCAR Tec</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Nascida em Maputo com a ambição de transformar a forma como particulares e empresas em Moçambique adquirem hardware e mantêm a sua infraestrutura tecnológica a funcionar em pleno.
        </p>
      </div>

      {/* Missão, Visão e Valores - 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm hover:border-blue-500 transition-colors">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            {t.aboutMission}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {t.aboutMissionText}
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm hover:border-blue-500 transition-colors">
          <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-950/50 text-sky-600 flex items-center justify-center">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            {t.aboutVision}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {t.aboutVisionText}
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm hover:border-blue-500 transition-colors">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            {t.aboutValues}
          </h3>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
            {t.valuesList.map((val, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>{val}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Laboratório Técnico Detail */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/20 text-blue-400 text-xs font-semibold">
            <Wrench className="w-3.5 h-3.5" />
            <span>Infraestrutura Laboratorial</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {t.ourLab}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {t.ourLabDesc} Dispomos de bancadas equipadas para microsoldadura BGA, reparações em motherboards, reprogramação de EEPROM e calibração de câmaras de segurança. Todas as intervenções cumprem normas rígidas de controlo de qualidade e proteção de dados.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800 text-xs">
            <div>
              <p className="text-xl font-bold font-mono text-blue-400">+1.500</p>
              <p className="text-slate-400 text-[11px]">Equipamentos Recuperados</p>
            </div>
            <div>
              <p className="text-xl font-bold font-mono text-emerald-400">98.4%</p>
              <p className="text-slate-400 text-[11px]">Taxa de Sucesso em Diagnósticos</p>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4 text-xs text-slate-300">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Compromisso Ético e Peças Autênticas
          </h3>
          <p className="leading-relaxed">
            Em Moçambique, o mercado é frequentemente inundado por componentes de baixa qualidade ou cópias não autorizadas. Na NCAR Tec, repudiamos essa prática: importamos e distribuímos apenas hardware genuíno com suporte de garantia do fabricante.
          </p>
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-400">
            Registo Comercial de Moçambique: NCAR TEC LDA<br />
            NUIT Oficial: 400987654<br />
            Sede: Av. 24 de Julho, Maputo
          </div>
        </div>
      </div>
    </div>
  );
};
