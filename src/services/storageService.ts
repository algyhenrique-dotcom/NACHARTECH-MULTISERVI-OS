import { Product, Category, Brand, ServiceItem, Order, Invoice, QuoteRequest, Review, UserProfile } from '../types';

// Asset references for seed data
const IMG_LAPTOP = '/src/assets/images/product_laptop_slim_1791692634354.jpg';
const IMG_PHONE = '/src/assets/images/product_smartphone_black_1791692644481.jpg';
const IMG_STARLINK = '/src/assets/images/product_starlink_router_1791692653751.jpg';
const IMG_CCTV = '/src/assets/images/product_cctv_camera_1791692665563.jpg';
const IMG_SERV_COMPUTER = '/src/assets/images/service_hardware_repair_1791729009749.jpg';
const IMG_SERV_PHONE = '/src/assets/images/service_phone_repair_1791729414522.jpg';
const IMG_SERV_NETWORK = '/src/assets/images/service_network_starlink_1791729440500.jpg';
const IMG_SERV_CCTV = '/src/assets/images/service_cctv_security_1791729484456.jpg';
const IMG_SERV_SOFTWARE = '/src/assets/images/hero_tech_fullscreen_1791729459754.jpg';
const IMG_SERV_WEB = '/src/assets/images/hero_ncartec_workspace_1791692625010.jpg';

const IMG_SERV_AIR_COND = '/src/assets/images/service_air_cond_1791780877088.jpg';
const IMG_SERV_ELECTRIC = '/src/assets/images/service_electric_1791780895451.jpg';
const IMG_SERV_STATIONERY = '/src/assets/images/service_stationery_1791780911557.jpg';

const STORAGE_KEYS = {
  PRODUCTS: 'nachartech_products_v3',
  CATEGORIES: 'nachartech_categories_v3',
  BRANDS: 'nachartech_brands_v3',
  SERVICES: 'nachartech_services_v3',
  ORDERS: 'nachartech_orders_v3',
  INVOICES: 'nachartech_invoices_v3',
  QUOTES: 'nachartech_quotes_v3',
  REVIEWS: 'nachartech_reviews_v3',
  USER: 'nachartech_user_v3',
};

// Categorias Oficiais: SERVIÇOS & VENDA DE PRODUTOS/MATERIAIS NACHARTECH MULTISSERVIÇOS
export const INITIAL_CATEGORIES: Category[] = [
  { id: 'cat-informatica', name: 'Informática & Computadores', slug: 'informatica', iconName: 'Laptop', itemCount: 6, description: 'Laptops, computadores desktop, monitores, memórias e discos SSD.' },
  { id: 'cat-celulares', name: 'Celulares & Acessórios', slug: 'celulares', iconName: 'Smartphone', itemCount: 6, description: 'Smartphones, capas, películas, carregadores, cabos e fones Bluetooth.' },
  { id: 'cat-tvs', name: 'TVs & Equipamentos Eletrónicos', slug: 'tvs', iconName: 'Tv', itemCount: 3, description: 'Smart TVs, receptores, sistemas de som, colunas e acessórios de áudio/vídeo.' },
  { id: 'cat-cctv', name: 'CCTV & Segurança', slug: 'cctv', iconName: 'ShieldCheck', itemCount: 4, description: 'Câmaras Hikvision, sistemas DVR/NVR, fontes e acessórios de videovigilância.' },
  { id: 'cat-redes', name: 'Redes & Starlink', slug: 'redes', iconName: 'Wifi', itemCount: 5, description: 'Kits Starlink, routers, switches, cabos de rede e conectores RJ45.' },
  { id: 'cat-eletricidade', name: 'Material Elétrico', slug: 'eletricidade', iconName: 'Zap', itemCount: 4, description: 'Fios, cabos, tomadas, interruptores, disjuntores, quadros e lâmpadas LED.' },
  { id: 'cat-arcondicionado', name: 'Ar-Condicionado & Climatização', slug: 'ar-condicionado', iconName: 'Wind', itemCount: 3, description: 'Aparelhos de ar-condicionado Split, suportes reforçados e acessórios.' },
  { id: 'cat-papelaria', name: 'Papelaria & Material de Escritório', slug: 'papelaria', iconName: 'Printer', itemCount: 4, description: 'Resmas de papel A4, cadernos, pastas, canetas e material escolar e executivo.' },
  { id: 'cat-ferramentas', name: 'Ferramentas & Material de Instalação', slug: 'ferramentas', iconName: 'Wrench', itemCount: 4, description: 'Alicates de crimpagem, brocas, parafusos, buchas e ferramentas manuais.' },
];

// Initial Brands
export const INITIAL_BRANDS: Brand[] = [
  { id: 'brand-lenovo', name: 'Lenovo', slug: 'lenovo', featured: true },
  { id: 'brand-hp', name: 'HP', slug: 'hp', featured: true },
  { id: 'brand-dell', name: 'Dell', slug: 'dell', featured: true },
  { id: 'brand-samsung', name: 'Samsung', slug: 'samsung', featured: true },
  { id: 'brand-apple', name: 'Apple', slug: 'apple', featured: true },
  { id: 'brand-asus', name: 'ASUS', slug: 'asus', featured: true },
  { id: 'brand-starlink', name: 'Starlink', slug: 'starlink', featured: true },
  { id: 'brand-hikvision', name: 'Hikvision', slug: 'hikvision', featured: true },
  { id: 'brand-jbl', name: 'JBL', slug: 'jbl', featured: true },
];

// Initial Products
export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-lenovo-ideapad-3',
    name: 'Lenovo IdeaPad 3 15.6"',
    slug: 'lenovo-ideapad-3-15-6',
    brand: 'Lenovo',
    category: 'Informática & Computadores',
    price: 45990,
    oldPrice: 52990,
    inStock: true,
    stockCount: 14,
    isFeatured: true,
    isPromo: true,
    rating: 4.8,
    reviewCount: 124,
    images: [IMG_LAPTOP, IMG_LAPTOP],
    shortDescription: 'O Lenovo IdeaPad 3 é um portátil versátil, ideal para trabalho, estudos e lazer. Combina desempenho e mobilidade.',
    description: 'O Lenovo IdeaPad 3 oferece desempenho de nível profissional com processador Intel Core i5 de 11ª geração, ecrã Full HD de 15.6 polegadas antirreflexo e áudio Dolby com clareza cristalina. Equipado com 8GB de RAM veloz e 512GB SSD NVMe para arranque instantâneo do sistema.',
    specs: {
      processor: 'Intel Core i5-1135G7 (até 4.20 GHz)',
      screen: '15.6" Full HD (1920 x 1080) Antirreflexo',
      ram: '8GB DDR4 3200MHz (expansível até 16GB)',
      storage: '512GB SSD M.2 NVMe PCIe',
      os: 'Windows 11 Home Original',
      graphics: 'Intel Iris Xe Graphics',
      battery: 'Até 7.5 horas de autonomia',
      warranty: '1 Ano de Garantia Nacional NCAR Tec'
    },
    variants: {
      colors: ['Cinza Platina', 'Azul Abismo', 'Preto Fosco'],
      storage: ['256GB SSD', '512GB SSD', '1TB SSD']
    },
    sku: 'LEN-IP3-512',
    createdAt: '2026-02-15'
  },
  {
    id: 'prod-hp-pavilion-15',
    name: 'HP Pavilion 15 Silver Edition',
    slug: 'hp-pavilion-15',
    brand: 'HP',
    category: 'Informática & Computadores',
    price: 62990,
    oldPrice: 69990,
    inStock: true,
    stockCount: 8,
    isFeatured: true,
    isPromo: false,
    rating: 4.7,
    reviewCount: 89,
    images: [IMG_LAPTOP],
    shortDescription: 'Potência e acabamento metálico premium com ecrã micro-borda e áudio B&O.',
    description: 'O HP Pavilion 15 foi desenhado para quem precisa de produtividade contínua e acabamento elegante em alumínio escovado. Conta com teclado retroiluminado com teclado numérico e carregamento rápido HP Fast Charge.',
    specs: {
      processor: 'AMD Ryzen 7 5700U (8 núcleos, até 4.3 GHz)',
      screen: '15.6" IPS Full HD Micro-edge',
      ram: '16GB DDR4',
      storage: '512GB PCIe NVMe M.2 SSD',
      os: 'Windows 11 Pro',
      graphics: 'AMD Radeon Graphics',
      battery: 'Até 8.5 horas',
      warranty: '1 Ano Garantia NCAR Tec'
    },
    variants: {
      colors: ['Prata Natural', 'Azul Névoa'],
      storage: ['512GB SSD', '1TB SSD']
    },
    sku: 'HP-PAV-15-R7',
    createdAt: '2026-02-20'
  },
  {
    id: 'prod-dell-inspiron-15',
    name: 'Dell Inspiron 15 3520',
    slug: 'dell-inspiron-15-3520',
    brand: 'Dell',
    category: 'Informática & Computadores',
    price: 58990,
    inStock: true,
    stockCount: 6,
    isFeatured: true,
    isPromo: false,
    rating: 4.9,
    reviewCount: 62,
    images: [IMG_LAPTOP],
    shortDescription: 'Fiabilidade corporativa Dell com ecrã fluido de 120Hz e dobradiça ergonómica.',
    description: 'Concebido para tarefas intensivas do dia a dia, com dobradiça de elevação que melhora o fluxo de ar e ângulo de digitação. Inclui leitor de impressões digitais integrado no botão ligar.',
    specs: {
      processor: 'Intel Core i7-1255U (10 núcleos, até 4.70 GHz)',
      screen: '15.6" FHD 120Hz WVA 250 nits',
      ram: '16GB DDR4 3200MHz',
      storage: '512GB SSD M.2 PCIe NVMe',
      os: 'Windows 11 Pro',
      battery: 'Até 7 horas',
      warranty: '1 Ano Garantia Oficial'
    },
    variants: {
      colors: ['Carbon Black', 'Platinum Silver']
    },
    sku: 'DEL-INS-3520-I7',
    createdAt: '2026-03-01'
  },
  {
    id: 'prod-macbook-air-m1',
    name: 'Apple MacBook Air 13.3" Chip M1',
    slug: 'macbook-air-m1',
    brand: 'Apple',
    category: 'Informática & Computadores',
    price: 99990,
    oldPrice: 112000,
    inStock: true,
    stockCount: 5,
    isFeatured: true,
    isPromo: true,
    rating: 5.0,
    reviewCount: 142,
    images: [IMG_LAPTOP],
    shortDescription: 'Incrível eficiência energética, silêncio total sem ventoinha e ecrã Retina deslumbrante.',
    description: 'Com o processador Apple M1, o portátil mais fino e leve da Apple transforma-se numa potência incomparável. CPU até 3,5x mais rápida, GPU até 5x mais veloz e a maior autonomia de sempre num Mac: até 18 horas.',
    specs: {
      processor: 'Apple M1 (8-core CPU, 7-core GPU, 16-core Neural Engine)',
      screen: '13.3" Retina com tecnologia True Tone (2560 x 1600)',
      ram: '8GB Memória Unificada',
      storage: '256GB SSD ultrarrápido',
      os: 'macOS Sonoma',
      battery: 'Até 18 horas',
      warranty: '1 Ano Garantia Apple / NCAR Tec'
    },
    variants: {
      colors: ['Cinzento Sideral', 'Dourado', 'Prateado'],
      storage: ['256GB SSD', '512GB SSD']
    },
    sku: 'APL-MBA-M1-256',
    createdAt: '2026-01-10'
  },
  {
    id: 'prod-asus-vivobook-15',
    name: 'ASUS VivoBook 15 OLED',
    slug: 'asus-vivobook-15',
    brand: 'ASUS',
    category: 'Informática & Computadores',
    price: 54990,
    inStock: true,
    stockCount: 9,
    isFeatured: true,
    isPromo: false,
    rating: 4.6,
    reviewCount: 47,
    images: [IMG_LAPTOP],
    shortDescription: 'Cores cinematográficas com ecrã NanoEdge e proteção antibacteriana ASUS.',
    description: 'Destaque-se com o ASUS VivoBook 15, portátil leve com excelente autonomia, dobradiça plana de 180° e proteção física da câmara Web para total privacidade.',
    specs: {
      processor: 'Intel Core i5-1235U',
      screen: '15.6" Full HD NanoEdge',
      ram: '8GB DDR4 (expansível)',
      storage: '512GB M.2 NVMe SSD',
      os: 'Windows 11 Home',
      warranty: '1 Ano Garantia'
    },
    sku: 'ASU-VB-15-I5',
    createdAt: '2026-03-05'
  },
  {
    id: 'prod-samsung-galaxy-book',
    name: 'Samsung Galaxy Book 3 15.6"',
    slug: 'samsung-galaxy-book-3',
    brand: 'Samsung',
    category: 'Informática & Computadores',
    price: 71990,
    inStock: true,
    stockCount: 4,
    isFeatured: false,
    isPromo: false,
    rating: 4.7,
    reviewCount: 38,
    images: [IMG_LAPTOP],
    shortDescription: 'Integração perfeita com o ecossistema Galaxy em corpo esguio de metal.',
    description: 'Chassi de alumínio resistente que pesa menos de 1.6kg. Conectividade completa com portas HDMI, USB-A, duas USB-C e ranhura microSD.',
    specs: {
      processor: 'Intel Core i5-1335U 13ª Geração',
      screen: '15.6" PLS Full HD',
      ram: '8GB LPDDR4x',
      storage: '256GB SSD NVMe',
      os: 'Windows 11 Home',
      warranty: '1 Ano Garantia'
    },
    sku: 'SAM-GB3-15',
    createdAt: '2026-03-12'
  },
  {
    id: 'prod-samsung-galaxy-a54',
    name: 'Samsung Galaxy A54 5G 128GB',
    slug: 'samsung-galaxy-a54-5g',
    brand: 'Samsung',
    category: 'Celulares & Acessórios',
    price: 28990,
    oldPrice: 32500,
    inStock: true,
    stockCount: 22,
    isFeatured: true,
    isPromo: true,
    rating: 4.9,
    reviewCount: 95,
    images: [IMG_PHONE, IMG_PHONE],
    shortDescription: 'Design icónico em vidro, câmara tripla com Nightography e certificação IP67 contra água.',
    description: 'O smartphone mais equilibrado da Samsung com ecrã Super AMOLED de 120Hz vibrante, câmara principal de 50MP com OIS para vídeos estabilizados e bateria de 5.000mAh para 2 dias de uso.',
    specs: {
      processor: 'Exynos 1380 Octa-core 5G',
      screen: '6.4" Super AMOLED FHD+ 120Hz (1000 nits)',
      ram: '8GB RAM',
      storage: '128GB (suporta microSD até 1TB)',
      os: 'Android 14 com One UI 6',
      battery: '5000 mAh com carga de 25W',
      warranty: '1 Ano Garantia Oficial'
    },
    variants: {
      colors: ['Awesome Graphite (Preto)', 'Awesome White (Branco)', 'Awesome Lime (Lima)'],
      storage: ['128GB', '256GB']
    },
    sku: 'SAM-A54-128',
    createdAt: '2026-02-18'
  },
  {
    id: 'prod-ipad-10-gen',
    name: 'Apple iPad 10ª Geração 10.9" Wi-Fi',
    slug: 'apple-ipad-10-geracao',
    brand: 'Apple',
    category: 'Celulares & Acessórios',
    price: 49990,
    oldPrice: 54900,
    inStock: true,
    stockCount: 11,
    isFeatured: true,
    isPromo: true,
    rating: 4.8,
    reviewCount: 73,
    images: [IMG_PHONE],
    shortDescription: 'Ecrã Liquid Retina de ponta a ponta, processador A14 Bionic e suporte a Apple Pencil.',
    description: 'Totalmente redesenhado e mais versátil do que nunca. Com o ecrã Liquid Retina de 10.9 polegadas e quatro cores apelativas, o iPad é fantástico para desenhar, trabalhar e manter-se ligado.',
    specs: {
      processor: 'A14 Bionic com Neural Engine',
      screen: '10.9" Liquid Retina com True Tone',
      storage: '64GB',
      connectivity: 'Wi-Fi 6 + Bluetooth 5.2',
      os: 'iPadOS 17',
      warranty: '1 Ano de Garantia'
    },
    variants: {
      colors: ['Azul', 'Rosa', 'Amarelo', 'Prateado'],
      storage: ['64GB', '256GB']
    },
    sku: 'APL-IPAD10-64',
    createdAt: '2026-02-25'
  },
  {
    id: 'prod-jbl-tune-720bt',
    name: 'Auscultadores JBL Tune 720BT Wireless',
    slug: 'jbl-tune-720bt',
    brand: 'JBL',
    category: 'Acessórios',
    price: 12990,
    oldPrice: 14500,
    inStock: true,
    stockCount: 30,
    isFeatured: true,
    isPromo: true,
    rating: 4.9,
    reviewCount: 110,
    images: [IMG_LAPTOP],
    shortDescription: 'Som Pure Bass renomado da JBL, até 76 horas de bateria e carga rápida de 5 minutos.',
    description: 'Transmita som potente com tecnologia Bluetooth 5.3 avançada. Conexão multiponto para alternar facilmente entre o telefone e o portátil durante videochamadas.',
    specs: {
      connectivity: 'Bluetooth 5.3 com Conexão Multiponto',
      battery: 'Até 76 horas de autonomia',
      warranty: '1 Ano de Garantia'
    },
    variants: {
      colors: ['Preto', 'Azul', 'Branco']
    },
    sku: 'JBL-T720BT-BLK',
    createdAt: '2026-03-02'
  },
  {
    id: 'prod-starlink-kit-standard',
    name: 'Kit de Internet Starlink Standard V2/V3',
    slug: 'starlink-kit-standard',
    brand: 'Starlink',
    category: 'Redes & Starlink',
    price: 42500,
    inStock: true,
    stockCount: 7,
    isFeatured: true,
    isPromo: false,
    rating: 5.0,
    reviewCount: 88,
    images: [IMG_STARLINK],
    shortDescription: 'Internet de alta velocidade e baixa latência via satélite em qualquer ponto de Moçambique.',
    description: 'Ideal para residências, quintas, empresas e áreas remotas em Moçambique. Velocidades de download entre 150 a 250 Mbps. A NCAR Tec oferece consultoria e instalação técnica autorizada.',
    specs: {
      connectivity: 'Satélite LEO + Wi-Fi 5 / Wi-Fi 6 Mesh',
      power: 'Consumo médio 50W-75W (resistente a intempéries IP54)',
      warranty: '1 Ano Garantia NCAR Tec + Apoio Técnico'
    },
    sku: 'STK-V2-STD-MZ',
    createdAt: '2026-03-08'
  },
  {
    id: 'prod-hikvision-cctv-kit',
    name: 'Kit Hikvision 4 Câmaras 4K + DVR 1TB',
    slug: 'hikvision-cctv-kit-4k',
    brand: 'Hikvision',
    category: 'CCTV & Segurança',
    price: 34900,
    oldPrice: 38900,
    inStock: true,
    stockCount: 12,
    isFeatured: true,
    isPromo: true,
    rating: 4.8,
    reviewCount: 42,
    images: [IMG_CCTV],
    shortDescription: 'Vigilância 24/7 com visão noturna ColorVu a cores, acesso no telemóvel e gravação contínua.',
    description: 'Sistema completo de videovigilância para residências e empresas. Inclui 4 câmaras resistentes a chuva (IP67), DVR Turbo HD com disco de 1TB pré-instalado e cablagem completa.',
    specs: {
      screen: 'Resolução 4K Ultra HD',
      connectivity: 'Visualização remota app Hik-Connect (iOS/Android)',
      warranty: '2 Anos de Garantia e Assistência NCAR Tec'
    },
    sku: 'HIK-4K-KIT4',
    createdAt: '2026-02-12'
  },
  {
    id: 'prod-rato-wireless',
    name: 'Rato Wireless Ergonómico Óptico',
    slug: 'rato-wireless-ergonomico',
    brand: 'Lenovo',
    category: 'Acessórios',
    price: 1990,
    inStock: true,
    stockCount: 45,
    isFeatured: false,
    isPromo: false,
    rating: 4.7,
    reviewCount: 31,
    images: [IMG_LAPTOP],
    shortDescription: 'Precisão de 1600 DPI, cliques silenciosos e receptor USB nano sem fios.',
    description: 'Rato óptico ergonómico confortável para longas horas de trabalho no escritório ou em casa.',
    specs: {
      connectivity: '2.4GHz Wireless até 10 metros',
      battery: '1 Pilha AA incluída (autonomia de 12 meses)'
    },
    sku: 'ACS-MOU-WL',
    createdAt: '2026-03-01'
  },
  {
    id: 'prod-mochila-lenovo',
    name: 'Mochila Lenovo Casual B210 para Portátil 15.6"',
    slug: 'mochila-lenovo-casual-b210',
    brand: 'Lenovo',
    category: 'Acessórios',
    price: 2990,
    inStock: true,
    stockCount: 35,
    isFeatured: false,
    isPromo: false,
    rating: 4.8,
    reviewCount: 54,
    images: [IMG_LAPTOP],
    shortDescription: 'Tecido hidrorrepelente, compartimento acolchoado e alças ergonómicas respiráveis.',
    description: 'Design moderno e minimalista. Protege o seu portátil contra impactos e chuviscos no trajeto diário.',
    specs: {
      screen: 'Compatível com portáteis até 15.6"',
      warranty: '6 Meses Garantia'
    },
    sku: 'LEN-BAG-B210',
    createdAt: '2026-02-28'
  },
  {
    id: 'prod-teclado-wireless',
    name: 'Teclado Wireless NCAR Slim em Português',
    slug: 'teclado-wireless-ncar-slim',
    brand: 'NCAR Tec',
    category: 'Acessórios',
    price: 1990,
    inStock: true,
    stockCount: 40,
    isFeatured: false,
    isPromo: false,
    rating: 4.6,
    reviewCount: 19,
    images: [IMG_LAPTOP],
    shortDescription: 'Layout ABNT/PT com Ç, teclas de perfil baixo macias e acabamento metálico.',
    description: 'Teclado sem fios ultrafino ideal para secretárias compactas com digitação rápida e silenciosa.',
    specs: {
      connectivity: 'Wireless 2.4G com receptor USB Plug & Play'
    },
    sku: 'ACS-KB-SLIM',
    createdAt: '2026-03-04'
  },
  {
    id: 'prod-base-arrefecimento',
    name: 'Base de Arrefecimento RGB para Portátil 17"',
    slug: 'base-arrefecimento-rgb',
    brand: 'NCAR Tec',
    category: 'Informática & Computadores',
    price: 2490,
    inStock: true,
    stockCount: 20,
    isFeatured: false,
    isPromo: false,
    rating: 4.7,
    reviewCount: 28,
    images: [IMG_LAPTOP],
    shortDescription: '6 ventoinhas silenciosas, regulação de altura em 5 níveis e hub USB duplo.',
    description: 'Mantém a temperatura do portátil baixa durante renderização ou jogos prolongados, prolongando a vida útil da bateria e do processador.',
    specs: {
      connectivity: 'Alimentação via porta USB do portátil'
    },
    sku: 'ACS-COOL-RGB',
    createdAt: '2026-03-06'
  },
  {
    id: 'prod-smart-tv-samsung-55',
    name: 'Smart TV Samsung Crystal UHD 55" 4K',
    slug: 'smart-tv-samsung-55-4k',
    brand: 'Samsung',
    category: 'TVs & Equipamentos Eletrónicos',
    price: 36990,
    oldPrice: 41900,
    inStock: true,
    stockCount: 5,
    isFeatured: true,
    isPromo: true,
    rating: 4.9,
    reviewCount: 38,
    images: [IMG_CCTV],
    shortDescription: 'Painel Crystal 4K, processador Crystal UHD, HDR 10+ e conectividade Wi-Fi e Bluetooth.',
    description: 'Smart TV Samsung de 55 polegadas com resolução 4K Ultra HD. Cores vibrantes, som imersivo e compatibilidade total com os principais aplicativos de streaming.',
    specs: {
      screen: '55" Ultra HD 4K (3840 x 2160)',
      connectivity: 'Wi-Fi 5, Bluetooth 5.2, 3x HDMI, 2x USB',
      warranty: '1 Ano de Garantia'
    },
    sku: 'TV-SAM-55-4K',
    createdAt: '2026-03-10'
  },
  {
    id: 'prod-cabo-eletrico-25mm',
    name: 'Rolo de Cabo Elétrico Flexível 2.5mm (100m)',
    slug: 'rolo-cabo-eletrico-25mm-100m',
    brand: 'NacharTech',
    category: 'Material Elétrico',
    price: 3200,
    oldPrice: 3800,
    inStock: true,
    stockCount: 50,
    isFeatured: false,
    isPromo: true,
    rating: 4.8,
    reviewCount: 15,
    images: [IMG_SERV_ELECTRIC],
    shortDescription: 'Fio de cobre flexível de alta pureza 750V para instalações elétricas seguras residenciais e comerciais.',
    description: 'Cabo elétrico flexível isolado antichama com certificação de segurança. Ideal para fiação de tomadas, interruptores e iluminação interna.',
    specs: {
      connectivity: 'Cobre 100% puro, isolamento antichama PVC 750V, rolo de 100 metros'
    },
    sku: 'ELE-CAB-25-100',
    createdAt: '2026-03-12'
  },
  {
    id: 'prod-quadro-eletrico-12',
    name: 'Quadro de Distribuição Elétrica 12 Módulos',
    slug: 'quadro-distribuicao-eletrica-12-modulos',
    brand: 'NacharTech',
    category: 'Material Elétrico',
    price: 2450,
    inStock: true,
    stockCount: 22,
    isFeatured: false,
    isPromo: false,
    rating: 4.7,
    reviewCount: 9,
    images: [IMG_SERV_ELECTRIC],
    shortDescription: 'Caixa de embutir com barramento de neutro e terra, porta fumê e espaço para 12 disjuntores DIN.',
    description: 'Quadro elétrico com acabamento estético moderno em ABS resistente ao calor. Garante organização e segurança para a instalação elétrica do seu imóvel.',
    specs: {
      warranty: '2 Anos de Garantia'
    },
    sku: 'ELE-QDR-12M',
    createdAt: '2026-03-14'
  },
  {
    id: 'prod-ar-condicionado-12k',
    name: 'Ar-Condicionado Split Inverter 12000 BTU',
    slug: 'ar-condicionado-split-inverter-12000-btu',
    brand: 'NacharTech',
    category: 'Ar-Condicionado & Climatização',
    price: 28500,
    oldPrice: 32900,
    inStock: true,
    stockCount: 8,
    isFeatured: true,
    isPromo: true,
    rating: 4.9,
    reviewCount: 42,
    images: [IMG_SERV_AIR_COND],
    shortDescription: 'Tecnologia Inverter de ultra poupança de energia, gás ecológico R410A e filtro bactericida.',
    description: 'Ar-condicionado Split de alta performance para residências e escritórios. Silencioso, arrefecimento veloz e máxima economia na fatura de eletricidade.',
    specs: {
      warranty: '1 Ano de Garantia NacharTech',
      connectivity: 'Comando sem fios com ecrã LCD e modo turbo'
    },
    sku: 'AC-SPL-12K-INV',
    createdAt: '2026-03-15'
  },
  {
    id: 'prod-papel-a4-chamex',
    name: 'Caixa Papel A4 Chamex / Navigator (5 Resmas / 2500 Folhas)',
    slug: 'caixa-papel-a4-5-resmas',
    brand: 'NacharTech',
    category: 'Papelaria & Material de Escritório',
    price: 1850,
    oldPrice: 2100,
    inStock: true,
    stockCount: 80,
    isFeatured: false,
    isPromo: true,
    rating: 4.9,
    reviewCount: 67,
    images: [IMG_SERV_STATIONERY],
    shortDescription: 'Papel de alta brancura 75g/m², ideal para impressões a laser, jato de tinta e fotocópias.',
    description: 'Caixa com 5 resmas embaladas individualmente. Garantia de não encravamento na impressora e nitidez máxima nas suas impressões e trabalhos.',
    specs: {
      screen: 'Formato A4 (210 x 297 mm) 75g/m²'
    },
    sku: 'PAP-A4-CX5',
    createdAt: '2026-03-16'
  },
  {
    id: 'prod-bobina-cabo-cat6',
    name: 'Bobina de Cabo de Rede Cat6 UTP 305 Metros',
    slug: 'bobina-cabo-rede-cat6-305m',
    brand: 'NacharTech',
    category: 'Redes & Starlink',
    price: 7900,
    oldPrice: 8900,
    inStock: true,
    stockCount: 25,
    isFeatured: true,
    isPromo: true,
    rating: 4.8,
    reviewCount: 23,
    images: [IMG_STARLINK],
    shortDescription: 'Cabo Gigabit Ethernet 100% Cobre para instalações residenciais, empresariais e Starlink.',
    description: 'Cabo de par trançado Categoria 6 com separador interno em cruz. Transmissão em gigabit estável até 250MHz sem interferências.',
    specs: {
      connectivity: 'Cat6 UTP 4 Pares 23AWG 100% Cobre Puro'
    },
    sku: 'RED-CAB-CAT6-305',
    createdAt: '2026-03-17'
  },
  {
    id: 'prod-alicate-crimpagem',
    name: 'Kit Alicate de Crimpagem RJ45/RJ11 + Testador + 50 Conectores',
    slug: 'kit-alicate-crimpagem-rj45-testador',
    brand: 'NacharTech',
    category: 'Ferramentas & Material de Instalação',
    price: 2490,
    oldPrice: 2990,
    inStock: true,
    stockCount: 30,
    isFeatured: false,
    isPromo: false,
    rating: 4.8,
    reviewCount: 31,
    images: [IMG_SERV_COMPUTER],
    shortDescription: 'Ferramenta profissional multifunções para corte, decapagem e crimpagem de conectores de rede.',
    description: 'Kit essencial para técnicos de redes e informática. Acompanha alicate de catraca reforçado, testador de cabos com LED e 50 conectores RJ45 banhados a ouro.',
    specs: {
      warranty: '6 Meses de Garantia'
    },
    sku: 'FER-ALI-CRIMP-KIT',
    createdAt: '2026-03-18'
  }
];

// Initial Services
// Serviços Oficiais NacharTech Multisserviços
export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'serv-manutencao',
    title: 'Manutenção & Reparação',
    slug: 'manutencao-reparacao',
    iconName: 'Wrench',
    image: IMG_SERV_COMPUTER,
    shortDesc: 'Manutenção geral, reparação de computadores, laptops, televisores, celulares e eletrónicos com limpeza interna e troca de peças.',
    fullDesc: 'O laboratório especializado da NacharTech Multisserviços realiza diagnóstico eletrónico avançado, manutenção preventiva e corretiva, reparação de placas e troca de peças para computadores, laptops, televisores e celulares.',
    features: [
      'Manutenção geral e preventiva de equipamentos',
      'Reparação de computadores desktop e laptops',
      'Reparação e preparação de televisores LED / Smart TVs',
      'Reparação de celulares e tablets (telas, baterias, portas de carga)',
      'Diagnóstico de equipamentos eletrónicos com bancada especializada',
      'Limpeza interna profunda e repaste térmico de alta eficiência',
      'Manutenção corretiva e troca de componentes e peças genuínas',
      'Instalação e configuração de novos equipamentos'
    ],
    startingPrice: 1200,
    warranty: '90 Dias',
    turnaroundTime: '24 a 48 Horas',
    popular: true
  },
  {
    id: 'serv-informatica',
    title: 'Informática & Programação',
    slug: 'informatica-programacao',
    iconName: 'Laptop',
    image: IMG_SERV_SOFTWARE,
    shortDesc: 'Montagem de computadores, formatação, Windows, instalação de programas, drivers, impressoras, antivírus e software.',
    fullDesc: 'Soluções integradas de informática da NacharTech Multisserviços para empresas e particulares. Montagem sob medida, otimização de sistemas, segurança digital e desenvolvimento de soluções de software.',
    features: [
      'Montagem e preparação de computadores desktop e workstations',
      'Formatação e preparação de computadores e laptops',
      'Instalação de Windows, Linux e outros sistemas operativos',
      'Instalação e configuração de programas, drivers e utilitários',
      'Configuração e partilha de impressoras em rede local',
      'Instalação de antivírus e ferramentas de segurança cibernética',
      'Backup seguro, recuperação e transferência de dados',
      'Configuração de sistemas informáticos, programação e soluções de software'
    ],
    startingPrice: 1000,
    warranty: 'Garantia de Serviço',
    turnaroundTime: 'Mesmo Dia / 24 Horas',
    popular: true
  },
  {
    id: 'serv-cctv',
    title: 'CCTV & Segurança',
    slug: 'cctv-seguranca',
    iconName: 'ShieldCheck',
    image: IMG_SERV_CCTV,
    shortDesc: 'Venda, instalação e configuração de câmeras CCTV e IP, DVR/NVR, acesso remoto e visualização em tempo real no celular.',
    fullDesc: 'Proteja a sua residência ou empresa com tecnologia de videovigilância de alta resolução. A NacharTech comercializa, instala e faz manutenção de câmaras analógicas e IP com acompanhamento no telemóvel.',
    features: [
      'Venda e montagem de câmeras de segurança CCTV e câmeras IP',
      'Instalação e configuração de sistemas de videovigilância completos',
      'Configuração de DVR e NVR com gravação contínua e deteção de movimento',
      'Configuração de visualização no celular e acesso remoto de qualquer lugar',
      'Passagem, tubagem e organização profissional de cabos e fontes de alimentação',
      'Manutenção preventiva, reparação de sistemas e expansão de videovigilância'
    ],
    startingPrice: 3500,
    warranty: '1 Ano de Assistência',
    turnaroundTime: 'Conforme Projeto',
    popular: true
  },
  {
    id: 'serv-redes',
    title: 'Redes & Internet',
    slug: 'redes-internet',
    iconName: 'Wifi',
    image: IMG_SERV_NETWORK,
    shortDesc: 'Instalação de redes internas LAN, routers, switches, Wi-Fi empresarial, crimpagem de cabos e kits Starlink.',
    fullDesc: 'Conectividade veloz e estável para a sua organização ou residência. A NacharTech projeta e instala infraestruturas de rede estruturada, soluções Wi-Fi Mesh e instalações certificadas Starlink.',
    features: [
      'Instalação de redes internas e montagem de redes LAN corporativas',
      'Configuração de routers, switches e pontos de acesso Wi-Fi',
      'Instalação e configuração completa de antenas satélite Starlink',
      'Instalação de pontos de rede, crimpagem de conectores RJ45 e testes de continuidade',
      'Passagem, organização e identificação técnica de cabos de rede',
      'Expansão de cobertura Wi-Fi e configuração de ligações estáveis entre pontos'
    ],
    startingPrice: 2500,
    warranty: '180 Dias de Suporte',
    turnaroundTime: 'Agendamento Flexível',
    popular: true
  },
  {
    id: 'serv-eletricidade',
    title: 'Eletricidade',
    slug: 'eletricidade',
    iconName: 'Zap',
    image: IMG_SERV_ELECTRIC,
    shortDesc: 'Instalações elétricas, montagem de quadros elétricos, tomadas, interruptores, iluminação LED e diagnóstico de avarias.',
    fullDesc: 'Serviços elétricos profissionais com segurança e rigor técnico. Instalações novas, reparações em sistemas elétricos existentes, montagem de quadros de disjuntores e manutenção geral.',
    features: [
      'Instalações elétricas residenciais e comerciais completas',
      'Manutenção elétrica preventiva e reparação de avarias e curtos-circuitos',
      'Instalação de tomadas, interruptores e pontos de alimentação',
      'Instalação de lâmpadas, luminárias e projetos de iluminação LED',
      'Montagem e organização de quadros elétricos de distribuição e disjuntores',
      'Organização de cablagem, diagnóstico elétrico e instalação de equipamentos'
    ],
    startingPrice: 1500,
    warranty: 'Garantia de Execução',
    turnaroundTime: 'Rápido Atendimento',
    popular: false
  },
  {
    id: 'serv-arcondicionado',
    title: 'Ar-Condicionado',
    slug: 'ar-condicionado',
    iconName: 'Wind',
    image: IMG_SERV_AIR_COND,
    shortDesc: 'Instalação de ar-condicionado, manutenção preventiva, limpeza de unidades, diagnóstico, reposição e reparação.',
    fullDesc: 'Climatização perfeita para o seu conforto térmico. A NacharTech comercializa, instala unidades interiores e exteriores Split, realiza manutenção preventiva e higienização profunda de filtros e serpentinas.',
    features: [
      'Instalação profissional de unidades interiores e exteriores de ar-condicionado',
      'Venda de aparelhos, suportes reforçados e acessórios de instalação',
      'Manutenção preventiva periódica e higienização profunda de filtros e serpentinas',
      'Limpeza de unidades para maior eficiência energética e ar mais saudável',
      'Diagnóstico de problemas, deteção de fugas e reparação técnica',
      'Configuração e preparação de equipamentos de climatização'
    ],
    startingPrice: 2500,
    warranty: '90 Dias de Garantia',
    turnaroundTime: '24 a 48 Horas',
    popular: false
  },
  {
    id: 'serv-papelaria',
    title: 'Papelaria & Serviços de Escritório',
    slug: 'papelaria-servicos-escritorio',
    iconName: 'Printer',
    image: IMG_SERV_STATIONERY,
    shortDesc: 'Impressão a cores e preto, fotocópias, digitalização, encadernação, impressão de trabalhos e venda de material escolar e escritório.',
    fullDesc: 'Centro completo de cópias e papelaria da NacharTech Multisserviços. Impressão de alta definição, encadernação de documentos e fornecimento de materiais essenciais para estudantes e escritórios.',
    features: [
      'Impressão e fotocópias rápidas em alta resolução (preto e cor)',
      'Digitalização nítida de documentos para PDF e imagem',
      'Encadernação profissional em espiral para trabalhos e relatórios',
      'Impressão e preparação de monografias, projetos e formulários',
      'Venda de cadernos, canetas, pastas e arquivos para escritório',
      'Venda de material escolar e consumíveis de escritório com entrega rápida'
    ],
    startingPrice: 50,
    warranty: 'Qualidade Garantida',
    turnaroundTime: 'Imediato / No Momento',
    popular: false
  },
  {
    id: 'serv-assistencia',
    title: 'Assistência Técnica & Domicílio',
    slug: 'assistencia-tecnica',
    iconName: 'Home',
    image: IMG_SERV_PHONE,
    shortDesc: 'Assistência técnica em loja ou ao domicílio, diagnóstico presencial, configuração de sistemas e consultoria técnica.',
    fullDesc: 'Conveniência total para os nossos clientes. Quando não pode deslocar-se, a equipa técnica da NacharTech vai até à sua casa ou empresa para diagnosticar, instalar e reparar equipamentos tecnológicos.',
    features: [
      'Assistência técnica especializada em bancada de loja',
      'Assistência técnica ao domicílio e deslocação a empresas',
      'Diagnóstico preciso de equipamentos eletrónicos no local',
      'Instalação e integração de equipamentos e novos dispositivos',
      'Configuração de sistemas tecnológicos e apoio ao utilizador',
      'Consultoria técnica personalizada para aquisição de equipamentos e materiais'
    ],
    startingPrice: 1500,
    warranty: 'Garantia Técnica',
    turnaroundTime: 'Agendamento Imediato',
    popular: true
  }
];

// Initial Orders (matching prototype screenshot: #NC1234, #NC1233, #NC1232)
export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1234',
    orderNumber: '#NC1234',
    date: '15/04/2026',
    customer: {
      name: 'João Silva',
      email: 'joao.silva@email.co.mz',
      phone: '+258 84 987 6543',
      address: 'Av. Julius Nyerere, nº 1420, Apt 3B',
      city: 'Maputo',
      province: 'Maputo Cidade',
      notes: 'Ligar antes da entrega'
    },
    items: [
      {
        product: INITIAL_PRODUCTS[0], // Lenovo IdeaPad 3
        quantity: 1,
        selectedColor: 'Cinza Platina',
        selectedStorage: '512GB SSD'
      },
      {
        product: INITIAL_PRODUCTS[11], // Rato Wireless
        quantity: 1
      }
    ],
    subtotal: 47980,
    shipping: 0,
    discount: 0,
    total: 47980,
    paymentMethod: 'mpesa',
    status: 'Entregue',
    trackingTimeline: [
      { status: 'Confirmada', date: '15/04/2026 09:30', note: 'Encomenda recebida e confirmada com sucesso via M-Pesa' },
      { status: 'Em preparação', date: '15/04/2026 11:15', note: 'Equipamentos verificados no armazém e embalados' },
      { status: 'Enviada', date: '15/04/2026 14:00', note: 'Em trânsito com estafeta NCAR Tec Express' },
      { status: 'Entregue', date: '15/04/2026 16:45', note: 'Entregue ao cliente João Silva na morada indicada' }
    ]
  },
  {
    id: 'ord-1233',
    orderNumber: '#NC1233',
    date: '10/04/2026',
    customer: {
      name: 'Ana Costa',
      email: 'ana.costa@techmoz.co.mz',
      phone: '+258 82 456 7890',
      address: 'Rua da França, Polana Cimento',
      city: 'Maputo',
      province: 'Maputo Cidade'
    },
    items: [
      {
        product: INITIAL_PRODUCTS[6], // Samsung Galaxy A54
        quantity: 1,
        selectedColor: 'Awesome Graphite'
      },
      {
        product: INITIAL_PRODUCTS[12], // Mochila Lenovo
        quantity: 1
      }
    ],
    subtotal: 31980,
    shipping: 1010,
    discount: 0,
    total: 32990,
    paymentMethod: 'transfer',
    status: 'Em preparação',
    trackingTimeline: [
      { status: 'Confirmada', date: '10/04/2026 14:20', note: 'Comprovativo de transferência bancária Millennium BIM validado' },
      { status: 'Em preparação', date: '11/04/2026 08:30', note: 'A preparar equipamento e emissão de certificado de garantia' }
    ]
  },
  {
    id: 'ord-1232',
    orderNumber: '#NC1232',
    date: '05/04/2026',
    customer: {
      name: 'Carlos Mendes',
      email: 'carlos.m@empresa.co.mz',
      phone: '+258 87 321 6549',
      address: 'Estrada Velha, Matola Gare',
      city: 'Matola',
      province: 'Maputo Província'
    },
    items: [
      {
        product: INITIAL_PRODUCTS[6], // Samsung A54
        quantity: 1
      }
    ],
    subtotal: 28990,
    shipping: 0,
    discount: 540,
    total: 28450,
    paymentMethod: 'emola',
    status: 'Enviada',
    trackingTimeline: [
      { status: 'Confirmada', date: '05/04/2026 10:00', note: 'Pagamento confirmado via E-Mola' },
      { status: 'Em preparação', date: '05/04/2026 13:00', note: 'Equipamento expedido para centro de distribuição da Matola' },
      { status: 'Enviada', date: '06/04/2026 09:00', note: 'Em rota de entrega' }
    ]
  },
  {
    id: 'ord-1231',
    orderNumber: '#NC1231',
    date: '02/04/2026',
    customer: {
      name: 'Fernanda Lopes',
      email: 'f.lopes@consultoria.mz',
      phone: '+258 84 112 2334',
      address: 'Bairro da Sommerschield II',
      city: 'Maputo',
      province: 'Maputo Cidade'
    },
    items: [
      {
        product: INITIAL_PRODUCTS[10], // Hikvision CCTV Kit
        quantity: 1
      }
    ],
    subtotal: 34900,
    shipping: 0,
    discount: 0,
    total: 34900,
    paymentMethod: 'transfer',
    status: 'Confirmada',
    trackingTimeline: [
      { status: 'Confirmada', date: '02/04/2026 16:10', note: 'Ordem aprovada e aguardando data de instalação técnica' }
    ]
  }
];

// Initial Invoices and Proformas
export const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'inv-001',
    invoiceNumber: 'FT-2026/048',
    type: 'Factura',
    orderId: 'ord-1234',
    clientName: 'João Silva',
    clientNuit: '109847291',
    clientEmail: 'joao.silva@email.co.mz',
    clientPhone: '+258 84 987 6543',
    clientAddress: 'Av. Julius Nyerere, nº 1420, Maputo',
    date: '15/04/2026',
    dueDate: '15/04/2026',
    items: [
      { description: 'Portátil Lenovo IdeaPad 3 15.6" i5/8GB/512GB SSD', quantity: 1, unitPrice: 39646.55, total: 39646.55 },
      { description: 'Rato Wireless Ergonómico Óptico', quantity: 1, unitPrice: 1715.52, total: 1715.52 }
    ],
    subtotal: 41362.07,
    vatRate: 0.16,
    vatAmount: 6617.93,
    total: 47980,
    status: 'Paga',
    bankDetails: {
      bankBIM: '0001 0000 0012 3456 7890 1 (NCAR TEC LDA)',
      bankBCI: '0008 0000 0098 7654 3210 2 (NCAR TEC LDA)',
      mpesaNumber: '84 123 4567'
    },
    notes: 'Mercadoria entregue conforme especificações. Garantia de 1 ano válida com esta factura.'
  },
  {
    id: 'inv-002',
    invoiceNumber: 'PF-2026/112',
    type: 'Proforma',
    clientName: 'Mozambique Logistics Corp',
    clientNuit: '400192837',
    clientEmail: 'procurement@mozlogistics.co.mz',
    clientPhone: '+258 84 000 9988',
    clientAddress: 'Porto de Maputo, Terminal B, Maputo',
    date: '18/04/2026',
    dueDate: '03/05/2026',
    items: [
      { description: 'Kit de Internet Satélite Starlink Standard V2/V3', quantity: 2, unitPrice: 36637.93, total: 73275.86 },
      { description: 'Serviço de Instalação e Calibração Starlink no Local', quantity: 2, unitPrice: 3017.24, total: 6034.48 },
      { description: 'Switch TP-Link Gigabit 16 Portas Montagem Rack', quantity: 1, unitPrice: 7758.62, total: 7758.62 }
    ],
    subtotal: 87068.96,
    vatRate: 0.16,
    vatAmount: 13931.04,
    total: 101000,
    status: 'Pendente',
    bankDetails: {
      bankBIM: '0001 0000 0012 3456 7890 1 (NCAR TEC LDA)',
      bankBCI: '0008 0000 0098 7654 3210 2 (NCAR TEC LDA)',
      mpesaNumber: '84 123 4567'
    },
    notes: 'Proforma válida por 15 dias. Pagamento de 50% na adjudicação e 50% após conclusão da montagem.'
  }
];

// Initial Quotes
export const INITIAL_QUOTES: QuoteRequest[] = [
  {
    id: 'quo-001',
    serviceId: 'serv-redes-starlink',
    serviceName: 'Redes, Wi-Fi Empresarial & Starlink',
    clientName: 'Manuel Boaventura',
    email: 'm.boaventura@fazenda.mz',
    phone: '+258 84 777 8899',
    urgency: 'alta',
    description: 'Necessitamos de instalar uma antena Starlink numa herdade a 40km de Maputo e estender sinal Wi-Fi para 3 edifícios.',
    location: 'Boane / Maputo Província',
    status: 'Em Análise',
    createdAt: '2026-04-12',
    estimatedBudget: 45000
  },
  {
    id: 'quo-002',
    serviceId: 'serv-computadores',
    serviceName: 'Manutenção & Reparação de Computadores',
    clientName: 'Sónia Muchanga',
    email: 'sonia.m@advogados.co.mz',
    phone: '+258 82 999 1122',
    urgency: 'urgente',
    description: 'Portátil Dell não arranca após queda, ecrã preto mas ouve-se a ventoinha. Tenho ficheiros urgentes de tribunal.',
    location: 'Sommerschield, Maputo',
    status: 'Respondido',
    createdAt: '2026-04-15',
    estimatedBudget: 4500
  }
];

// Initial Reviews
export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-01',
    productId: 'prod-lenovo-ideapad-3',
    author: 'Carlos M.',
    rating: 5,
    comment: 'Excelente portátil! Comprei para o escritório em Maputo e a velocidade é espetacular. Entrega feita no mesmo dia.',
    date: '10/04/2026',
    verified: true
  },
  {
    id: 'rev-02',
    productId: 'prod-lenovo-ideapad-3',
    author: 'Ana Paula',
    rating: 5,
    comment: 'Atendimento muito prestável no WhatsApp antes da compra. O teclado é muito bom para trabalhar e a bateria dura bem.',
    date: '08/04/2026',
    verified: true
  },
  {
    id: 'rev-03',
    productId: 'prod-lenovo-ideapad-3',
    author: 'João Silva',
    rating: 5,
    comment: 'Serviço cinco estrelas da NCAR Tec. Veio com Windows ativado e a factura com NUIT conforme pedi.',
    date: '15/04/2026',
    verified: true
  }
];

// Current Default User Profile
export const DEFAULT_USER: UserProfile = {
  id: 'usr-demo-01',
  name: 'João Silva',
  email: 'joao.silva@email.co.mz',
  phone: '+258 84 987 6543',
  address: 'Av. Julius Nyerere, nº 1420, Apt 3B',
  city: 'Maputo',
  province: 'Maputo Cidade',
  role: 'customer'
};

// Storage Service Class with Event Dispatching for React State Sync
class StorageService {
  private isBrowser = typeof window !== 'undefined';

  private getItem<T>(key: string, defaultValue: T): T {
    if (!this.isBrowser) return defaultValue;
    try {
      const stored = localStorage.getItem(key);
      if (!stored) {
        localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
      }
      return JSON.parse(stored) as T;
    } catch (e) {
      console.warn(`[NCAR Storage] Erro ao ler chave ${key}:`, e);
      return defaultValue;
    }
  }

  private setItem<T>(key: string, value: T): boolean {
    if (!this.isBrowser) return false;
    try {
      localStorage.setItem(key, JSON.stringify(value));
      // Dispatch custom storage sync event
      window.dispatchEvent(new CustomEvent('ncartec-storage-update', { detail: { key } }));
      return true;
    } catch (e) {
      console.error(`[NCAR Storage] Erro ao salvar chave ${key}:`, e);
      return false;
    }
  }

  // PRODUCTS
  getProducts(): Product[] {
    return this.getItem<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
  }

  getProductById(id: string): Product | undefined {
    return this.getProducts().find(p => p.id === id || p.slug === id);
  }

  saveProduct(product: Product): Product {
    const products = this.getProducts();
    const index = products.findIndex(p => p.id === product.id);
    if (index >= 0) {
      products[index] = product;
    } else {
      products.unshift({
        ...product,
        id: product.id || `prod-${Date.now()}`,
        createdAt: new Date().toISOString().split('T')[0]
      });
    }
    this.setItem(STORAGE_KEYS.PRODUCTS, products);
    return product;
  }

  deleteProduct(id: string): boolean {
    const products = this.getProducts();
    const filtered = products.filter(p => p.id !== id);
    return this.setItem(STORAGE_KEYS.PRODUCTS, filtered);
  }

  // CATEGORIES
  getCategories(): Category[] {
    return this.getItem<Category[]>(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
  }

  saveCategory(category: Category): Category {
    const categories = this.getCategories();
    const index = categories.findIndex(c => c.id === category.id);
    if (index >= 0) {
      categories[index] = category;
    } else {
      categories.push(category);
    }
    this.setItem(STORAGE_KEYS.CATEGORIES, categories);
    return category;
  }

  deleteCategory(id: string): boolean {
    const categories = this.getCategories().filter(c => c.id !== id);
    return this.setItem(STORAGE_KEYS.CATEGORIES, categories);
  }

  // BRANDS
  getBrands(): Brand[] {
    return this.getItem<Brand[]>(STORAGE_KEYS.BRANDS, INITIAL_BRANDS);
  }

  saveBrand(brand: Brand): Brand {
    const brands = this.getBrands();
    const index = brands.findIndex(b => b.id === brand.id);
    if (index >= 0) {
      brands[index] = brand;
    } else {
      brands.push(brand);
    }
    this.setItem(STORAGE_KEYS.BRANDS, brands);
    return brand;
  }

  deleteBrand(id: string): boolean {
    const brands = this.getBrands().filter(b => b.id !== id);
    return this.setItem(STORAGE_KEYS.BRANDS, brands);
  }

  // SERVICES
  getServices(): ServiceItem[] {
    const services = this.getItem<ServiceItem[]>(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
    return services.map(s => {
      if (!s.image) {
        const found = INITIAL_SERVICES.find(is => is.id === s.id);
        return { ...s, image: found?.image || IMG_SERV_COMPUTER };
      }
      return s;
    });
  }

  getServiceById(id: string): ServiceItem | undefined {
    return this.getServices().find(s => s.id === id || s.slug === id);
  }

  saveService(service: ServiceItem): ServiceItem {
    const services = this.getServices();
    const index = services.findIndex(s => s.id === service.id);
    if (index >= 0) {
      services[index] = service;
    } else {
      services.push(service);
    }
    this.setItem(STORAGE_KEYS.SERVICES, services);
    return service;
  }

  deleteService(id: string): boolean {
    const services = this.getServices().filter(s => s.id !== id);
    return this.setItem(STORAGE_KEYS.SERVICES, services);
  }

  // ORDERS
  getOrders(): Order[] {
    return this.getItem<Order[]>(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
  }

  getOrderById(id: string): Order | undefined {
    return this.getOrders().find(o => o.id === id || o.orderNumber === id);
  }

  createOrder(orderData: Omit<Order, 'id' | 'orderNumber' | 'date' | 'trackingTimeline'>): Order {
    const orders = this.getOrders();
    const orderNum = `#NC${Math.floor(1000 + Math.random() * 9000)}`;
    const today = new Date().toLocaleDateString('pt-PT');
    
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      date: today,
      trackingTimeline: [
        {
          status: 'Confirmada',
          date: `${today} ${new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })}`,
          note: 'Encomenda registada com sucesso na plataforma'
        }
      ]
    };

    orders.unshift(newOrder);
    this.setItem(STORAGE_KEYS.ORDERS, orders);

    // Also auto-generate demo Proforma or Factura
    const subtotalNoVat = Math.round(newOrder.total / 1.16);
    const vat = newOrder.total - subtotalNoVat;
    this.createInvoice({
      invoiceNumber: `FT-2026/${Math.floor(100 + Math.random() * 899)}`,
      type: 'Factura',
      orderId: newOrder.id,
      clientName: newOrder.customer.name,
      clientEmail: newOrder.customer.email,
      clientPhone: newOrder.customer.phone,
      clientAddress: `${newOrder.customer.address}, ${newOrder.customer.city}`,
      date: today,
      dueDate: today,
      items: newOrder.items.map(it => ({
        description: it.product.name,
        quantity: it.quantity,
        unitPrice: it.product.price,
        total: it.product.price * it.quantity
      })),
      subtotal: subtotalNoVat,
      vatRate: 0.16,
      vatAmount: vat,
      total: newOrder.total,
      status: 'Paga',
      bankDetails: {
        bankBIM: '0001 0000 0012 3456 7890 1 (NCAR TEC LDA)',
        bankBCI: '0008 0000 0098 7654 3210 2 (NCAR TEC LDA)',
        mpesaNumber: '84 123 4567'
      },
      notes: `Referente à encomenda ${newOrder.orderNumber}`
    });

    return newOrder;
  }

  updateOrderStatus(orderId: string, newStatus: Order['status'], note?: string): boolean {
    const orders = this.getOrders();
    const order = orders.find(o => o.id === orderId);
    if (!order) return false;

    order.status = newStatus;
    const today = new Date().toLocaleDateString('pt-PT');
    const time = new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' });
    
    order.trackingTimeline.push({
      status: newStatus,
      date: `${today} ${time}`,
      note: note || `Estado actualizado para: ${newStatus}`
    });

    return this.setItem(STORAGE_KEYS.ORDERS, orders);
  }

  // INVOICES & PROFORMAS
  getInvoices(): Invoice[] {
    return this.getItem<Invoice[]>(STORAGE_KEYS.INVOICES, INITIAL_INVOICES);
  }

  createInvoice(invoiceData: Omit<Invoice, 'id'>): Invoice {
    const invoices = this.getInvoices();
    const newInv: Invoice = {
      ...invoiceData,
      id: `inv-${Date.now()}`
    };
    invoices.unshift(newInv);
    this.setItem(STORAGE_KEYS.INVOICES, invoices);
    return newInv;
  }

  deleteInvoice(id: string): boolean {
    const invoices = this.getInvoices().filter(i => i.id !== id);
    return this.setItem(STORAGE_KEYS.INVOICES, invoices);
  }

  // QUOTES (ORÇAMENTOS)
  getQuotes(): QuoteRequest[] {
    return this.getItem<QuoteRequest[]>(STORAGE_KEYS.QUOTES, INITIAL_QUOTES);
  }

  submitQuote(quoteData: Omit<QuoteRequest, 'id' | 'status' | 'createdAt'>): QuoteRequest {
    const quotes = this.getQuotes();
    const newQuote: QuoteRequest = {
      ...quoteData,
      id: `quo-${Date.now()}`,
      status: 'Pendente',
      createdAt: new Date().toLocaleDateString('pt-PT')
    };
    quotes.unshift(newQuote);
    this.setItem(STORAGE_KEYS.QUOTES, quotes);
    return newQuote;
  }

  updateQuoteStatus(id: string, status: QuoteRequest['status']): boolean {
    const quotes = this.getQuotes();
    const q = quotes.find(item => item.id === id);
    if (!q) return false;
    q.status = status;
    return this.setItem(STORAGE_KEYS.QUOTES, quotes);
  }

  // REVIEWS
  getReviews(productId?: string): Review[] {
    const all = this.getItem<Review[]>(STORAGE_KEYS.REVIEWS, INITIAL_REVIEWS);
    if (!productId) return all;
    return all.filter(r => r.productId === productId);
  }

  addReview(reviewData: Omit<Review, 'id' | 'date'>): Review {
    const reviews = this.getReviews();
    const newRev: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString('pt-PT')
    };
    reviews.unshift(newRev);
    this.setItem(STORAGE_KEYS.REVIEWS, reviews);
    return newRev;
  }

  // USER
  getUser(): UserProfile {
    return this.getItem<UserProfile>(STORAGE_KEYS.USER, DEFAULT_USER);
  }

  saveUser(user: UserProfile): UserProfile {
    this.setItem(STORAGE_KEYS.USER, user);
    return user;
  }

  // RESET TO FACTORY DEMO DATA
  resetAllDemoData(): void {
    if (!this.isBrowser) return;
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
    localStorage.removeItem(STORAGE_KEYS.BRANDS);
    localStorage.removeItem(STORAGE_KEYS.SERVICES);
    localStorage.removeItem(STORAGE_KEYS.ORDERS);
    localStorage.removeItem(STORAGE_KEYS.INVOICES);
    localStorage.removeItem(STORAGE_KEYS.QUOTES);
    localStorage.removeItem(STORAGE_KEYS.REVIEWS);
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem('ncartec_cart_v1');
    localStorage.removeItem('ncartec_wishlist_v1');
    localStorage.removeItem('ncartec_compare_v1');

    this.getProducts();
    this.getCategories();
    this.getBrands();
    this.getServices();
    this.getOrders();
    this.getInvoices();
    this.getQuotes();
    this.getReviews();
    this.getUser();

    window.dispatchEvent(new CustomEvent('ncartec-storage-update', { detail: { key: 'ALL_RESET' } }));
  }
}

export const storageService = new StorageService();
