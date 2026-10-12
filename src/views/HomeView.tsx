import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  Wrench, 
  Truck, 
  Headphones,
  Laptop, 
  Smartphone, 
  Tablet, 
  Wifi, 
  Shield, 
  Cpu, 
  Tv, 
  Code, 
  MessageCircle, 
  Clock, 
  Check,
  CheckCircle2,
  Layers,
  FileCheck,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';

// Animated Banner Slides (com acessórios informáticos e serviços técnicos em transição)
const BANNER_SLIDES = [
  {
    id: 1,
    image: '/src/assets/images/hero_tech_fullscreen_1791729459754.jpg',
    tagPt: 'Hardware & Equipamentos Originais',
    tagEn: 'Original Hardware & Devices',
    headlinePt: 'Tecnologia que impulsiona o seu mundo',
    headlineEn: 'Technology that empowers your world',
    subtitlePt: 'Loja oficial e equipamentos informáticos de alta performance com garantia certificada em Moçambique.',
    subtitleEn: 'Official store and high-performance IT equipment with certified warranty in Mozambique.'
  },
  {
    id: 2,
    image: '/src/assets/images/hero_ncartec_workspace_1791692625010.jpg',
    tagPt: 'Acessórios & Periféricos de Alta Gama',
    tagEn: 'Premium Accessories & Peripherals',
    headlinePt: 'Tudo em Acessórios & Informática',
    headlineEn: 'Everything in Tech & Accessories',
    subtitlePt: 'Auscultadores, teclados, cabos de alta velocidade, mochilas e periféricos para trabalho e produtividade.',
    subtitleEn: 'Headphones, keyboards, high-speed cables, backpacks and peripherals for work and productivity.'
  },
  {
    id: 3,
    image: '/src/assets/images/service_phone_repair_1791729414522.jpg',
    tagPt: 'Assistência Técnica de Smartphones & Ecrãs',
    tagEn: 'Smartphone Repair & Screen Service',
    headlinePt: 'Reparação Especializada de Telemóveis',
    headlineEn: 'Specialized Phone Repair Services',
    subtitlePt: 'Troca expressa de ecrãs OLED, baterias e reparação de placas com peças originais e garantia.',
    subtitleEn: 'Express OLED screen replacements, batteries and motherboard repairs with genuine parts.'
  },
  {
    id: 4,
    image: '/src/assets/images/service_network_starlink_1791729440500.jpg',
    tagPt: 'Redes, Wi-Fi & Antenas Starlink',
    tagEn: 'Networks, Wi-Fi & Starlink Antennas',
    headlinePt: 'Conectividade Starlink & Redes Wi-Fi',
    headlineEn: 'Starlink Connectivity & Wi-Fi Networks',
    subtitlePt: 'Instalação oficial de kits de internet via satélite Starlink e infraestruturas completas de rede.',
    subtitleEn: 'Official installation of Starlink satellite internet kits and complete enterprise network solutions.'
  },
  {
    id: 5,
    image: '/src/assets/images/service_cctv_security_1791729484456.jpg',
    tagPt: 'Segurança Eletrónica & Câmaras CCTV',
    tagEn: 'Electronic Security & CCTV Cameras',
    headlinePt: 'Sistemas de Videovigilância 4K',
    headlineEn: '4K Video Surveillance Systems',
    subtitlePt: 'Proteção patrimonial com gravação contínua, visão noturna e monitorização em tempo real no telemóvel.',
    subtitleEn: 'Property protection with continuous recording, night vision and real-time smartphone monitoring.'
  }
];

// Category High-Resolution Images
const CAT_IMAGES = {
  portateis: '/src/assets/images/product_laptop_slim_1791692634354.jpg',
  smartphones: '/src/assets/images/product_smartphone_black_1791692644481.jpg',
  tablets: '/src/assets/images/category_tablet_modern_1791694605389.jpg',
  acessorios: '/src/assets/images/category_accessories_audio_1791694593951.jpg',
  redes: '/src/assets/images/product_starlink_router_1791692653751.jpg',
  seguranca: '/src/assets/images/product_cctv_camera_1791692665563.jpg',
};

// Section Separation Line Component with Blue & Orange brand accents
const SectionDivider: React.FC = () => (
  <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 my-8 sm:my-10">
    <div className="relative flex items-center justify-center">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-800 to-transparent" />
      <div className="absolute flex items-center gap-1.5 px-3 bg-slate-50 dark:bg-slate-950">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
        <span className="w-2 h-2 rounded-full bg-orange-500"></span>
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
      </div>
    </div>
  </div>
);

export const HomeView: React.FC = () => {
  const { navigate, products, categories, services, t, language } = useApp();

  // Slide index for the animated banner transition
  const [currentSlide, setCurrentSlide] = useState(0);

  // Horizontal Carousel controls for Featured Products
  const carouselTrackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Active Service State for the Left-Vertical / Right-Details interactive panel
  const [activeServiceId, setActiveServiceId] = useState<string>(services[0]?.id || 'serv-computadores');

  const featuredProducts = products.filter(p => p.isFeatured);
  const activeService = services.find(s => s.id === activeServiceId) || services[0];

  // Automatic slide transition every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % BANNER_SLIDES.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  // Update progress bar on scroll in the featured products carousel
  const handleScroll = () => {
    if (carouselTrackRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselTrackRef.current;
      const total = scrollWidth - clientWidth;
      setScrollProgress(total > 0 ? (scrollLeft / total) * 100 : 0);
    }
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselTrackRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      carouselTrackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Helper icon for services
  const renderServiceIcon = (iconName: string, className = "w-4 h-4") => {
    switch (iconName) {
      case 'Smartphone': return <Smartphone className={className} />;
      case 'Tv': return <Tv className={className} />;
      case 'Wifi': return <Wifi className={className} />;
      case 'ShieldCheck': return <ShieldCheck className={className} />;
      case 'Code': return <Code className={className} />;
      case 'Laptop': return <Laptop className={className} />;
      default: return <Cpu className={className} />;
    }
  };

  return (
    <div className="pb-16">
      {/* 1. HERO BANNER ANIMADO EM TRANSIÇÃO */}
      <section className="relative overflow-hidden bg-slate-950 text-white min-h-[440px] sm:min-h-[480px] lg:min-h-[520px] flex items-center border-b border-slate-900">
        
        {/* Animated Background Slides (Crossfade suave entre imagens de acessórios e serviços) */}
        {BANNER_SLIDES.map((slide, idx) => {
          const isActive = idx === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out ${
                isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
              }`}
              style={{ backgroundImage: `url(${slide.image})` }}
            />
          );
        })}

        {/* Clean, crystal-clear overlay sem fundo azul para que as fotografias fiquem 100% nítidas e visíveis */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/25 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />

        {/* Clean Hero Content (Totalmente despoluído) */}
        <div className="relative z-10 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="max-w-2xl space-y-4">
            
            {/* Tag da Transição Ativa */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur border border-slate-700/80 text-[11px] font-semibold tracking-wide shadow-md">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              <span className="text-blue-400 font-bold">NacharTech Multisserviços</span>
              <span className="text-slate-500">•</span>
              <span className="text-orange-400 font-semibold truncate">
                {language === 'pt' ? BANNER_SLIDES[currentSlide].tagPt : BANNER_SLIDES[currentSlide].tagEn}
              </span>
            </div>

            {/* Headline com gradiente da marca */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight font-display">
              {language === 'pt' ? BANNER_SLIDES[currentSlide].headlinePt : BANNER_SLIDES[currentSlide].headlineEn}
            </h1>

            {/* Subtítulo dinâmico limpo */}
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal drop-shadow-sm max-w-xl">
              {language === 'pt' ? BANNER_SLIDES[currentSlide].subtitlePt : BANNER_SLIDES[currentSlide].subtitleEn}
            </p>

            {/* Ações Diretas */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => navigate('store')}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-blue-600/30 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span>{t.heroCtaStore}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => navigate('services')}
                className="px-5 py-2.5 bg-slate-900/80 hover:bg-slate-800 text-orange-400 hover:text-orange-300 border border-orange-500/40 hover:border-orange-500 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer backdrop-blur flex items-center gap-2 active:scale-95"
              >
                <Wrench className="w-3.5 h-3.5 text-orange-400" />
                <span>{t.heroCtaServices}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Slide Navigation Dots & Controls */}
        <div className="absolute bottom-4 left-4 right-4 z-20 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-1.5 bg-slate-950/60 backdrop-blur px-2.5 py-1 rounded-full border border-slate-800/80">
            {BANNER_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  i === currentSlide 
                    ? 'w-6 h-1.5 bg-orange-500' 
                    : 'w-1.5 h-1.5 bg-slate-600 hover:bg-slate-400'
                }`}
                aria-label={`Ver slide ${i + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentSlide(prev => (prev - 1 + BANNER_SLIDES.length) % BANNER_SLIDES.length)}
              className="p-1.5 rounded-lg bg-slate-900/70 hover:bg-slate-800 text-slate-300 border border-slate-800 backdrop-blur transition-colors cursor-pointer"
              aria-label="Slide anterior"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setCurrentSlide(prev => (prev + 1) % BANNER_SLIDES.length)}
              className="p-1.5 rounded-lg bg-slate-900/70 hover:bg-slate-800 text-slate-300 border border-slate-800 backdrop-blur transition-colors cursor-pointer"
              aria-label="Próximo slide"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. PRODUTOS EM DESTAQUE (Imediatamente colado ao banner, compacto e limpo) */}
      <section className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-5">
        
        {/* Cabeçalho minimalista */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <h2 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 font-display">
            {t.featuredProducts}
          </h2>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => scrollCarousel('left')}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => scrollCarousel('right')}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
              aria-label="Seguinte"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => navigate('store')}
              className="ml-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-0.5 cursor-pointer"
            >
              <span>{t.viewAllProducts}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Track horizontal com cards reduzidos */}
        <div className="relative">
          <div
            ref={carouselTrackRef}
            onScroll={handleScroll}
            className="flex gap-3 sm:gap-3.5 overflow-x-auto pb-2 scroll-smooth no-scrollbar scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="w-[170px] sm:w-[190px] md:w-[210px] shrink-0"
              >
                <ProductCard product={product} compact={true} />
              </div>
            ))}
          </div>

          {/* Barra discreta de navegação */}
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-0.5 rounded-full mt-1.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-600 to-orange-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${Math.max(15, scrollProgress)}%` }}
            />
          </div>
        </div>
      </section>

      {/* LINHA DE SEPARAÇÃO */}
      <SectionDivider />

      {/* 3. CATEGORIAS EM DESTAQUE (FOTOGRAFIA REAL + ÍCONE) */}
      <section className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 font-display">
              {t.featuredCategories}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Equipamentos originais organizados por departamento.
            </p>
          </div>

          <button
            onClick={() => navigate('store')}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
          >
            <span>Ver Catálogo Completo</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Categories Grid with Photo + Icon Badge */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {categories.slice(0, 6).map((cat) => {
            const getIcon = () => {
              switch (cat.slug) {
                case 'portateis': return <Laptop className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />;
                case 'smartphones': return <Smartphone className="w-3.5 h-3.5 text-orange-500" />;
                case 'tablets': return <Tablet className="w-3.5 h-3.5 text-purple-500" />;
                case 'acessorios': return <Headphones className="w-3.5 h-3.5 text-emerald-500" />;
                case 'redes': return <Wifi className="w-3.5 h-3.5 text-sky-500" />;
                default: return <Shield className="w-3.5 h-3.5 text-amber-500" />;
              }
            };

            const getImage = () => {
              switch (cat.slug) {
                case 'portateis': return CAT_IMAGES.portateis;
                case 'smartphones': return CAT_IMAGES.smartphones;
                case 'tablets': return CAT_IMAGES.tablets;
                case 'acessorios': return CAT_IMAGES.acessorios;
                case 'redes': return CAT_IMAGES.redes;
                default: return CAT_IMAGES.seguranca;
              }
            };

            return (
              <button
                key={cat.id}
                onClick={() => navigate('store')}
                className="group relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 overflow-hidden hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 text-left hover:shadow-md cursor-pointer flex flex-col"
              >
                {/* Image Container with Floating Icon Badge */}
                <div className="relative aspect-[4/3] bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-800/60 dark:to-slate-900/60 overflow-hidden flex items-center justify-center p-2.5">
                  <img
                    src={getImage()}
                    alt={cat.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-108 transition-transform duration-400 ease-out"
                  />

                  {/* Glassmorphic Icon Badge */}
                  <div className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-white/95 dark:bg-slate-900/95 backdrop-blur shadow-xs border border-slate-200/80 dark:border-slate-700 flex items-center justify-center">
                    {getIcon()}
                  </div>
                </div>

                {/* Info Text */}
                <div className="p-3 bg-white dark:bg-slate-900 flex-1 flex flex-col justify-between border-t border-slate-100 dark:border-slate-800/70">
                  <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors font-display truncate">
                    {cat.name}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                    {cat.itemCount} equipamentos
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* LINHA DE SEPARAÇÃO */}
      <SectionDivider />

      {/* 4. POR QUE ESCOLHER A NCAR TEC? (REDESENHADO: ESTÉTICA EDITORIAL TECNOLÓGICA AUTÊNTICA, SEM CARA DE IA GENÉRICA) */}
      <section className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl p-6 sm:p-8 lg:p-10">
          
          {/* Subtle Ambient Lighting */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Section Header */}
          <div className="relative z-10 max-w-2xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-bold uppercase tracking-wider text-orange-400 font-mono mb-2">
              <Sparkles className="w-3 h-3 text-orange-400" />
              Padrão NCAR Tec de Qualidade
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white font-display tracking-tight">
              Excelência Técnica & Soluções Reais em Moçambique
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed">
              Combinamos bancadas laboratoriais próprias para microeletrónica, parcerias com marcas líderes e suporte presencial dedicado a empresas e particulares.
            </p>
          </div>

          {/* Asymmetrical Bento Grid */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5">
            
            {/* Main Feature Pillar: Laboratório Próprio (7 Cols) */}
            <div className="lg:col-span-7 rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-900/40 border border-slate-800 p-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white font-display">
                      Bancada Laboratorial de Engenharia
                    </h3>
                    <p className="text-[11px] text-slate-400">Diagnóstico avançado e micro-soldadura com estações profissionais</p>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Não terceirizamos os serviços. O nosso laboratório próprio em Maputo realiza reparação de circuitos de alimentação, recuperação de placas-mãe, substituição limpa de ecrãs e upgrades com relatórios técnicos detalhados para cada equipamento.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-[11px]">Peças originais testadas em bancada</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                    <span className="text-[11px]">Garantia por escrito de 90 a 365 dias</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                    <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                    <span className="text-[11px]">Diagnóstico laboratorial transparente</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                    <span className="text-[11px]">Acompanhamento de status de ordens</span>
                  </div>
                </div>
              </div>

              {/* Bottom Metrics Strip */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div>
                  <div className="text-lg font-black text-white font-mono tracking-tight">+5.400</div>
                  <div className="text-[10px] text-slate-400">Equipamentos Atendidos</div>
                </div>
                <div>
                  <div className="text-lg font-black text-orange-400 font-mono tracking-tight">24h - 48h</div>
                  <div className="text-[10px] text-slate-400">Média de Diagnóstico</div>
                </div>
                <div>
                  <div className="text-lg font-black text-blue-400 font-mono tracking-tight">100%</div>
                  <div className="text-[10px] text-slate-400">Genuíno com Garantia</div>
                </div>
              </div>
            </div>

            {/* Right Stacked Pillars (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              
              {/* Starlink & Redes */}
              <div className="rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-900/40 border border-slate-800 p-5 space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-orange-600/20 text-orange-400 flex items-center justify-center border border-orange-500/30">
                    <Wifi className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white font-display">
                    Instalações Starlink & Redes Wi-Fi
                  </h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Implementação oficial de conectividade de alta velocidade para fazendas, armazéns, escritórios e residências em qualquer província de Moçambique.
                </p>
                <div className="text-[11px] font-mono text-orange-400 flex items-center gap-1">
                  <span>Cobertura sem pontos cegos</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>

              {/* Faturação Formal & Corporativo */}
              <div className="rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-900/40 border border-slate-800 p-5 space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                    <FileCheck className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white font-display">
                    Processamento com NUIT & Proformas
                  </h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Documentação formal rigorosa para concursos públicos, instituições bancárias e empresas privadas com IVA discriminado e garantias contratuais.
                </p>
                <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                  <span>Conformidade fiscal nacional</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* LINHA DE SEPARAÇÃO */}
      <SectionDivider />

      {/* 5. NOSSOS SERVIÇOS (VERTICAL À ESQUERDA + DETALHES À DIREITA COM ALTURA EQUALIZADA, FOTO COMPACTA E SEM PREÇOS ESTIPULADOS) */}
      <section className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-900/60 text-orange-600 dark:text-orange-400 text-[10px] font-bold uppercase tracking-wider mb-1.5 font-mono">
              <Wrench className="w-3 h-3" />
              Laboratório Especializado & Instalações
            </div>
            <h2 className="text-lg sm:text-xl font-black tracking-tight text-slate-900 dark:text-slate-100 font-display">
              {t.solutionsForYou}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 max-w-xl">
              Clique em qualquer especialidade à esquerda para carregar o escopo técnico completo e procedimentos à direita.
            </p>
          </div>

          <button
            onClick={() => navigate('services')}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center gap-1 cursor-pointer self-start sm:self-auto shrink-0"
          >
            <span>Ver Todos os Serviços</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Master-Detail Layout com Altura Perfeitamente Equalizada (items-stretch) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          
          {/* LEFT COLUMN: Vertical list (7 serviços) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-1.5">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono px-1 mb-0.5">
              Especialidades Técnicas ({services.length})
            </div>

            {services.map((serv) => {
              const isSelected = serv.id === activeServiceId;
              return (
                <button
                  key={serv.id}
                  onClick={() => setActiveServiceId(serv.id)}
                  className={`w-full text-left p-2.5 sm:p-3 rounded-xl border transition-all duration-300 ease-in-out flex items-center justify-between gap-3 cursor-pointer group ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-500/20 translate-x-1'
                      : 'bg-white dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 border-slate-200/90 dark:border-slate-800/90 hover:border-blue-400 dark:hover:border-blue-500/60 hover:bg-slate-50 dark:hover:bg-slate-850 hover:translate-x-0.5'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Imagem real e profissional do serviço em vez de ícone simples */}
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden shrink-0 border border-slate-200/90 dark:border-slate-700/80 bg-slate-950 group-hover:scale-105 transition-transform duration-300 shadow-2xs">
                      <img
                        src={serv.image || CAT_IMAGES.portateis}
                        alt={serv.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="min-w-0">
                      <h4 className={`text-xs font-bold font-display truncate transition-colors ${
                        isSelected ? 'text-white' : 'text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                      }`}>
                        {serv.title}
                      </h4>
                      <p className={`text-[10px] font-mono mt-0.5 truncate ${
                        isSelected ? 'text-blue-100' : 'text-slate-400 dark:text-slate-400'
                      }`}>
                        Laboratório Especializado • {serv.turnaroundTime}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-300 ${
                      isSelected ? 'text-white translate-x-1' : 'text-slate-400 group-hover:translate-x-1'
                    }`} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT COLUMN: Detalhes com Foto Compacta, sem preços estipulados e animação suave na troca */}
          <div 
            key={activeService.id}
            className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 overflow-hidden shadow-md flex flex-col justify-between h-full animate-in fade-in-50 duration-300 ease-out"
          >
            
            {/* Top Compact Photo */}
            <div className="relative h-32 sm:h-36 w-full bg-slate-950 overflow-hidden shrink-0 group">
              <img
                src={activeService.image || CAT_IMAGES.seguranca}
                alt={activeService.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />

              {/* Badges sobre a foto */}
              <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-2">
                <span className="px-2 py-0.5 rounded-full bg-slate-900/85 backdrop-blur text-white text-[10px] font-semibold flex items-center gap-1 border border-slate-700">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  Garantia: {activeService.warranty}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-slate-900/85 backdrop-blur text-white text-[10px] font-semibold flex items-center gap-1 border border-slate-700">
                  <Clock className="w-3 h-3 text-orange-400" />
                  Prazo: {activeService.turnaroundTime}
                </span>
              </div>

              {/* Bottom Strip: Indicação de Avaliação Técnica (Sem valores numéricos estipulados) */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span className="text-[11px] font-bold text-slate-100 font-display">
                    Diagnóstico Técnico em Laboratório
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-600/90 text-white font-semibold">
                  Orçamento Personalizado
                </span>
              </div>
            </div>

            {/* Service Details Body */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-slate-100 font-display">
                  {activeService.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {activeService.fullDesc}
                </p>
              </div>

              {/* Checklist de Procedimentos Incluídos */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <h5 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 font-mono mb-1.5">
                  Procedimentos e Escopo Laboratorial:
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                  {activeService.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <span className="w-3.5 h-3.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                      <span className="text-[11px] leading-tight">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nota sobre os Administradores e Orçamento */}
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-500 shrink-0" />
                <span>O valor do orçamento é calculado pelos nossos administradores e técnicos após análise e diagnóstico em bancada.</span>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2">
                <button
                  onClick={() => navigate('services')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Pedir Avaliação Gratuita</span>
                  <ArrowRight className="w-3 h-3" />
                </button>

                <a
                  href={`https://wa.me/258847610803?text=${encodeURIComponent(`Olá NCAR Tec! Gostaria de solicitar análise e orçamento para o serviço de: ${activeService.title}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
                  <span>WhatsApp com Técnico</span>
                </a>

                <button
                  onClick={() => navigate('service-detail', { serviceId: activeService.id })}
                  className="ml-auto text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 underline cursor-pointer"
                >
                  Ver Ficha Completa
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
