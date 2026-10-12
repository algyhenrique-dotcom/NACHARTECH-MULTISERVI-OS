import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  MapPin, 
  Eye, 
  EyeOff, 
  LogIn, 
  UserPlus, 
  ShieldCheck, 
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  Plus
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    authModalInitialTab, 
    loginWithGoogle, 
    loginWithEmail, 
    registerAccount,
    t,
    language
  } = useApp();

  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);

  // Google Account Chooser State
  const [showGooglePicker, setShowGooglePicker] = useState(false);
  const [isAddingNewGoogleAccount, setIsAddingNewGoogleAccount] = useState(false);
  const [customGoogleName, setCustomGoogleName] = useState('');
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');
  const [customGoogleError, setCustomGoogleError] = useState('');

  // Preset Google Accounts for immediate recognition
  const GOOGLE_ACCOUNTS = [
    {
      name: 'Henrique Nivarela',
      email: 'nivarelahenrique@gmail.com',
      initials: 'HN',
      color: 'bg-emerald-600',
      label: 'Conta Principal (Google)',
      phone: '+258 84 761 0803',
      city: 'Nampula'
    },
    {
      name: 'João Silva',
      email: 'joao.silva@gmail.com',
      initials: 'JS',
      color: 'bg-blue-600',
      label: 'Conta Pessoal',
      phone: '+258 84 987 6543',
      city: 'Maputo'
    },
    {
      name: 'Manuel Cossa',
      email: 'manuel.cossa@gmail.com',
      initials: 'MC',
      color: 'bg-purple-600',
      label: 'Conta Profissional',
      phone: '+258 82 456 7890',
      city: 'Beira'
    }
  ];

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regCity, setRegCity] = useState('Maputo');
  const [regPassword, setRegPassword] = useState('');
  const [regError, setRegError] = useState('');

  // Sync initial tab when modal opens
  React.useEffect(() => {
    if (isAuthModalOpen) {
      setTab(authModalInitialTab);
      setShowGooglePicker(false);
      setIsAddingNewGoogleAccount(false);
      setLoginError('');
      setRegError('');
      setCustomGoogleError('');
    }
  }, [isAuthModalOpen, authModalInitialTab]);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim()) {
      setLoginError(language === 'pt' ? 'Por favor insira o seu e-mail.' : 'Please enter your email.');
      return;
    }
    if (!loginPassword.trim()) {
      setLoginError(language === 'pt' ? 'Por favor insira a sua palavra-passe.' : 'Please enter your password.');
      return;
    }
    setLoginError('');
    loginWithEmail(loginEmail.trim(), loginPassword);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim()) {
      setRegError(language === 'pt' ? 'Por favor insira o seu nome completo.' : 'Please enter your full name.');
      return;
    }
    if (!regEmail.trim()) {
      setRegError(language === 'pt' ? 'Por favor insira um e-mail válido.' : 'Please enter a valid email.');
      return;
    }
    if (!regPassword.trim() || regPassword.length < 4) {
      setRegError(language === 'pt' ? 'A palavra-passe deve ter pelo menos 4 caracteres.' : 'Password must have at least 4 characters.');
      return;
    }
    setRegError('');
    registerAccount({
      name: regName.trim(),
      email: regEmail.trim(),
      phone: regPhone.trim() || '+258 84 000 0000',
      password: regPassword,
      city: regCity
    });
  };

  const fillDemoCredentials = () => {
    setLoginEmail('joao.silva@email.co.mz');
    setLoginPassword('ncartec123');
    setLoginError('');
  };

  const handleCustomGoogleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customGoogleName.trim()) {
      setCustomGoogleError(language === 'pt' ? 'Por favor insira o seu nome.' : 'Please enter your name.');
      return;
    }
    if (!customGoogleEmail.trim() || !customGoogleEmail.includes('@')) {
      setCustomGoogleError(language === 'pt' ? 'Por favor insira um e-mail Google válido.' : 'Please enter a valid Google email.');
      return;
    }
    setCustomGoogleError('');
    loginWithGoogle({
      name: customGoogleName.trim(),
      email: customGoogleEmail.trim(),
      phone: '+258 84 761 0803',
      city: 'Nampula'
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Backdrop click */}
      <div 
        className="fixed inset-0"
        onClick={() => setIsAuthModalOpen(false)}
      />

      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden z-10 transition-colors">
        
        {/* TELA DE ESCOLHA DE CONTA GOOGLE (Google Account Selector) */}
        {showGooglePicker ? (
          <div className="p-6 space-y-5 animate-in fade-in duration-200">
            {/* Header com Logo Google */}
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    {language === 'pt' ? 'Escolha uma conta Google' : 'Choose a Google account'}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {language === 'pt' ? 'para continuar para a NCAR Tec' : 'to continue to NCAR Tec'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowGooglePicker(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title="Voltar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lista de Contas Disponíveis */}
            <div className="space-y-2">
              <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 font-mono uppercase tracking-wider">
                {language === 'pt' ? 'Contas detectadas' : 'Detected Accounts'}
              </p>

              {GOOGLE_ACCOUNTS.map((acc, index) => (
                <button
                  key={acc.email}
                  type="button"
                  onClick={() => loginWithGoogle(acc)}
                  className="w-full p-3 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 bg-white dark:bg-slate-800/80 hover:bg-blue-50/50 dark:hover:bg-slate-800 flex items-center justify-between gap-3 text-left transition-all cursor-pointer group shadow-xs active:scale-[0.99]"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-9 h-9 rounded-full ${acc.color} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform`}>
                      {acc.initials}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                          {acc.name}
                        </span>
                        {index === 0 && (
                          <span className="text-[9px] bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.2 rounded font-semibold">
                            Recomendada
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                        {acc.email}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                    {language === 'pt' ? 'Entrar →' : 'Sign in →'}
                  </span>
                </button>
              ))}

              {/* Botão para Usar Outra Conta Google */}
              {!isAddingNewGoogleAccount ? (
                <button
                  type="button"
                  onClick={() => setIsAddingNewGoogleAccount(true)}
                  className="w-full p-3 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 flex items-center gap-3 text-left transition-all cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Plus className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {language === 'pt' ? 'Usar outra conta Google...' : 'Use another Google account...'}
                    </span>
                    <p className="text-[10px] text-slate-400">
                      {language === 'pt' ? 'Introduza o seu nome e endereço Google' : 'Enter your name and Google address'}
                    </p>
                  </div>
                </button>
              ) : (
                /* Formulário para Inserir Outra Conta Google */
                <form onSubmit={handleCustomGoogleSubmit} className="p-3.5 rounded-2xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/30 dark:bg-slate-850 space-y-3 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                      {language === 'pt' ? 'Identificar Nova Conta Google' : 'Identify New Google Account'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsAddingNewGoogleAccount(false)}
                      className="text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                    >
                      {language === 'pt' ? 'Cancelar' : 'Cancel'}
                    </button>
                  </div>

                  {customGoogleError && (
                    <div className="text-[11px] text-rose-600 dark:text-rose-400 font-semibold">
                      {customGoogleError}
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400">
                      {language === 'pt' ? 'O Seu Nome' : 'Your Name'}
                    </label>
                    <input
                      type="text"
                      value={customGoogleName}
                      onChange={(e) => setCustomGoogleName(e.target.value)}
                      placeholder="ex: Carlos Macuácua"
                      className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400">
                      {language === 'pt' ? 'E-mail Google' : 'Google Email'}
                    </label>
                    <input
                      type="email"
                      value={customGoogleEmail}
                      onChange={(e) => setCustomGoogleEmail(e.target.value)}
                      placeholder="ex: carlos.m@gmail.com"
                      className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    {language === 'pt' ? 'Entrar com Esta Conta Google' : 'Sign In with This Google Account'}
                  </button>
                </form>
              )}
            </div>

            {/* Rodapé do Chooser */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setShowGooglePicker(false)}
                className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1 font-semibold cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{language === 'pt' ? 'Voltar ao Login Normal' : 'Back to Standard Login'}</span>
              </button>

              <span className="text-[10px] text-slate-400 font-mono">
                Autenticação Segura
              </span>
            </div>
          </div>
        ) : (
          /* TELA PADRÃO DE ENTRAR / CRIAR CONTA */
          <>
            {/* Top Header */}
            <div className="p-5 sm:p-6 pb-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">
                    N
                  </div>
                  <h2 className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-slate-100 font-display">
                    NCAR Tec
                  </h2>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {language === 'pt' ? 'Acesse a sua conta ou registe-se para encomendar' : 'Access your account or register to start shopping'}
                </p>
              </div>

              <button
                onClick={() => setIsAuthModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Auth Tabs */}
            <div className="px-5 sm:px-6 pt-4">
              <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-slate-800/90 rounded-2xl text-xs font-bold">
                <button
                  onClick={() => {
                    setTab('login');
                    setLoginError('');
                  }}
                  className={`py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    tab === 'login'
                      ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>{language === 'pt' ? 'Entrar' : 'Sign In'}</span>
                </button>
                <button
                  onClick={() => {
                    setTab('register');
                    setRegError('');
                  }}
                  className={`py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    tab === 'register'
                      ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>{language === 'pt' ? 'Criar Conta' : 'Register'}</span>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 pt-4 space-y-4">
              
              {/* GOOGLE SIGN IN BUTTON (Abre o selecionador de conta para escolher e reconhecer a conta!) */}
              <button
                type="button"
                onClick={() => setShowGooglePicker(true)}
                className="w-full py-2.5 px-4 bg-white dark:bg-slate-800/90 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl text-xs font-bold text-slate-800 dark:text-slate-200 shadow-xs flex items-center justify-center gap-3 transition-all cursor-pointer hover:border-blue-400 group active:scale-[0.99]"
              >
                {/* Google SVG Official Icon */}
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>{language === 'pt' ? 'Continuar com a Conta Google' : 'Continue with Google Account'}</span>
              </button>

              <div className="relative flex items-center justify-center">
                <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
                <span className="bg-white dark:bg-slate-900 px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-mono shrink-0">
                  {language === 'pt' ? 'ou directamente no site' : 'or directly on site'}
                </span>
              </div>

              {/* TAB 1: ENTRAR (LOGIN COM EMAIL) */}
              {tab === 'login' ? (
                <form onSubmit={handleLoginSubmit} className="space-y-3.5">
                  {loginError && (
                    <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-xs font-semibold">
                      {loginError}
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                      {language === 'pt' ? 'E-mail ou Utilizador' : 'Email or Username'}
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="exemplo@email.co.mz"
                        className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                        {language === 'pt' ? 'Palavra-passe' : 'Password'}
                      </label>
                      <button
                        type="button"
                        onClick={fillDemoCredentials}
                        className="text-[10px] text-blue-600 dark:text-blue-400 hover:underline font-semibold cursor-pointer"
                      >
                        {language === 'pt' ? 'Preencher teste' : 'Use test account'}
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-9 pr-9 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/20 transition-all cursor-pointer active:scale-[0.99]"
                  >
                    {language === 'pt' ? 'Entrar na Conta' : 'Sign In'}
                  </button>
                </form>
              ) : (
                /* TAB 2: CRIAR CONTA AQUI NO SITE */
                <form onSubmit={handleRegisterSubmit} className="space-y-3">
                  {regError && (
                    <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-xs font-semibold">
                      {regError}
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                      {language === 'pt' ? 'Nome Completo' : 'Full Name'}
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        placeholder="ex: João Silva"
                        className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                        {language === 'pt' ? 'E-mail' : 'Email'}
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="email"
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          placeholder="voce@email.co.mz"
                          className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                        {language === 'pt' ? 'Telefone / WhatsApp' : 'Phone'}
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="tel"
                          value={regPhone}
                          onChange={(e) => setRegPhone(e.target.value)}
                          placeholder="+258 84..."
                          className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                      {language === 'pt' ? 'Cidade' : 'City'}
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <select
                        value={regCity}
                        onChange={(e) => setRegCity(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
                      >
                        <option value="Maputo">Maputo Cidade</option>
                        <option value="Matola">Matola</option>
                        <option value="Nampula">Nampula</option>
                        <option value="Beira">Beira</option>
                        <option value="Tete">Tete</option>
                        <option value="Pemba">Pemba</option>
                        <option value="Quelimane">Quelimane</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                      {language === 'pt' ? 'Criar Palavra-passe' : 'Create Password'}
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="Mínimo 4 caracteres"
                        className="w-full pl-9 pr-9 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/20 transition-all cursor-pointer active:scale-[0.99]"
                  >
                    {language === 'pt' ? 'Criar Minha Conta no Site' : 'Create My Account on Site'}
                  </button>
                </form>
              )}

              {/* Trust Footer */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  {language === 'pt' ? 'Dados protegidos e seguros' : 'Secure and protected data'}
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                  NCAR Tec Moçambique
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
