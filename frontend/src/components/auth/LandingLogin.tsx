import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import { ShieldCheck, UserPlus, LogIn, ArrowRight, UserCircle2, Mail, Lock, Building2, FileText, Eye, EyeOff, Sparkles, CheckCircle2 } from 'lucide-react';
import { useBarangay } from '../../context/BarangayContext';

export const LandingLogin: React.FC = () => {
  const { setIsAuthenticated, switchUserRole } = useBarangay();
  
  // Parallax mouse tracking setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize cursor coordinates to range [-1, 1]
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Map mouse position to parallax translations
  const bgBlob1X = useTransform(mouseX, [-1, 1], [-40, 40]);
  const bgBlob1Y = useTransform(mouseY, [-1, 1], [-40, 40]);
  
  const bgBlob2X = useTransform(mouseX, [-1, 1], [40, -40]);
  const bgBlob2Y = useTransform(mouseY, [-1, 1], [40, -40]);
  
  const card1X = useTransform(mouseX, [-1, 1], [-20, 20]);
  const card1Y = useTransform(mouseY, [-1, 1], [-20, 20]);
  
  const card2X = useTransform(mouseX, [-1, 1], [25, -25]);
  const card2Y = useTransform(mouseY, [-1, 1], [25, -25]);

  const card3X = useTransform(mouseX, [-1, 1], [15, -15]);
  const card3Y = useTransform(mouseY, [-1, 1], [15, -15]);
  
  const card4X = useTransform(mouseX, [-1, 1], [-30, 30]);
  const card4Y = useTransform(mouseY, [-1, 1], [-30, 30]);

  const [view, setView] = useState<'login' | 'register' | 'forgot'>('login');
  const [direction, setDirection] = useState(1);
  
  const handleViewChange = (newView: 'login' | 'register' | 'forgot') => {
    setDirection(view === 'login' ? 1 : newView === 'login' ? -1 : 1);
    setView(newView);
  };

  const pageVariants = {
    initial: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0
    }),
    animate: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0
    })
  };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');

  const handleDemoLogin = (role: 'citizen' | 'staff' | 'official' | 'guest') => {
    setIsLoading(true);
    setTimeout(() => {
      switchUserRole(role);
      setIsAuthenticated(true);
      setIsLoading(false);
    }, 800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // For demo purposes, we automatically login based on email hint, or default to citizen
    let targetRole: 'citizen' | 'staff' | 'official' = 'citizen';
    if (email.includes('staff')) targetRole = 'staff';
    if (email.includes('captain') || email.includes('official')) targetRole = 'official';
    
    handleDemoLogin(targetRole);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
      {/* Left Panel - Branding & Info */}
      <div className="hidden md:flex flex-col justify-between w-1/2 lg:w-3/5 bg-slate-900 text-white p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <motion.div 
            style={{ x: bgBlob1X, y: bgBlob1Y }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 -left-10 w-[500px] h-[500px] bg-emerald-600 rounded-full mix-blend-overlay filter blur-[100px]" 
          />
          <motion.div 
            style={{ x: bgBlob2X, y: bgBlob2Y }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-teal-800 rounded-full mix-blend-overlay filter blur-[120px]" 
          />
        </div>
        
        {/* Floating UI Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
           {/* Top Right */}
           <motion.div 
             style={{ x: card1X, y: card1Y }}
             className="absolute top-[18%] right-[8%]"
           >
             <motion.div 
               animate={{ y: [0, -12, 0] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
               className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl shadow-2xl flex items-center gap-3 scale-[0.95]"
             >
               <div className="w-10 h-10 bg-emerald-500/30 rounded-full flex items-center justify-center border border-emerald-400/30">
                 <FileText className="w-5 h-5 text-emerald-300" />
               </div>
               <div className="pr-3">
                 <p className="text-sm font-bold text-white">Clearance Approved</p>
                 <p className="text-xs text-emerald-200">Just now</p>
               </div>
             </motion.div>
           </motion.div>

           {/* Top Center-Left */}
           <motion.div 
             style={{ x: card3X, y: card3Y }}
             className="absolute top-[12%] left-[45%] opacity-80"
           >
             <motion.div 
               animate={{ y: [0, 10, 0] }}
               transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
               className="bg-white/5 backdrop-blur-sm border border-white/10 p-2.5 rounded-2xl shadow-xl flex items-center gap-3 scale-[0.85]"
             >
               <div className="w-9 h-9 bg-purple-500/30 rounded-full flex items-center justify-center border border-purple-400/30">
                 <Sparkles className="w-4 h-4 text-purple-300" />
               </div>
               <div className="pr-2">
                 <p className="text-sm font-bold text-white/90">Smart Analysis</p>
                 <p className="text-xs text-purple-200/80">Completed</p>
               </div>
             </motion.div>
           </motion.div>

           {/* Bottom Left */}
           <motion.div 
             style={{ x: card2X, y: card2Y }}
             className="absolute bottom-[18%] left-[10%]"
           >
             <motion.div 
               animate={{ y: [0, 15, 0] }}
               transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
               className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl shadow-2xl flex items-center gap-3 scale-90"
             >
               <div className="w-10 h-10 bg-blue-500/30 rounded-full flex items-center justify-center border border-blue-400/30">
                 <UserCircle2 className="w-5 h-5 text-blue-300" />
               </div>
               <div className="pr-3">
                 <p className="text-sm font-bold text-white">Resident Verified</p>
                 <p className="text-xs text-blue-200">2 mins ago</p>
               </div>
             </motion.div>
           </motion.div>

           {/* Bottom Right */}
           <motion.div 
             style={{ x: card4X, y: card4Y }}
             className="absolute bottom-[35%] right-[15%] opacity-90"
           >
             <motion.div 
               animate={{ y: [0, -8, 0] }}
               transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
               className="bg-white/5 backdrop-blur-md border border-white/10 p-3 rounded-2xl shadow-2xl flex items-center gap-3 scale-[0.9]"
             >
               <div className="w-9 h-9 bg-amber-500/30 rounded-full flex items-center justify-center border border-amber-400/30">
                 <CheckCircle2 className="w-4 h-4 text-amber-300" />
               </div>
               <div className="pr-2">
                 <p className="text-sm font-bold text-white">System Synced</p>
                 <p className="text-xs text-amber-200">ARTA Compliant</p>
               </div>
             </motion.div>
           </motion.div>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white shadow-md shadow-emerald-900/50 border-2 border-amber-300/60 shrink-0">
              <Building2 className="w-7 h-7 text-white" />
              <span className="absolute -bottom-1 -right-1 bg-amber-400 text-slate-950 text-xs font-extrabold px-1.5 py-0.5 rounded-full border border-slate-900">
                4A
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight font-heading">e-Kapitan</h1>
              <span className="inline-block bg-emerald-500/20 text-emerald-300 text-[11px] font-semibold px-2 py-0.5 rounded-full border border-emerald-500/30">
                Barangay 4A
              </span>
            </div>
          </div>
          
          <div className="mt-24 max-w-xl">
            <h2 className="text-5xl font-bold leading-tight mb-6 font-heading">
              Empowering Communities Through Digital Governance
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed mb-10">
              Streamlined document requests, smart queueing, and AI-assisted civic services. Experience the future of transparent and efficient local governance.
            </p>
            
            <div className="flex gap-4 items-center text-sm font-semibold text-emerald-300 bg-white/5 w-max px-6 py-3 rounded-xl backdrop-blur-sm border border-white/10 shadow-inner">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>ARTA Compliant Platform</span>
            </div>
          </div>
        </div>
        
        <div className="relative z-10 text-xs text-slate-500 font-medium">
          &copy; {new Date().getFullYear()} e-Kapitan Civic Platform. All rights reserved.
        </div>
      </div>

      {/* Right Panel - Auth Forms */}
      <div className="w-full md:w-1/2 lg:w-2/5 min-h-screen flex flex-col items-center p-4 sm:p-8 md:p-12 bg-slate-50 md:bg-white relative">
        {/* Mobile Header Background */}
        <div className="md:hidden absolute top-0 left-0 right-0 h-[300px] bg-slate-900 rounded-b-[40px] shadow-xl overflow-hidden z-0">
          <div className="absolute inset-0 opacity-40">
            <div className="absolute -top-10 -left-10 w-[200px] h-[200px] bg-emerald-600 rounded-full mix-blend-overlay filter blur-[40px]" />
            <div className="absolute bottom-10 -right-10 w-[250px] h-[250px] bg-teal-800 rounded-full mix-blend-overlay filter blur-[50px]" />
          </div>
        </div>



        <div className="w-full max-w-md relative z-10 flex-1 flex flex-col justify-center pt-8 md:pt-0">
          {/* Mobile Branding */}
          <div className="md:hidden flex flex-col items-center gap-3 mb-8">
            <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white shadow-lg shadow-emerald-900/50 border-2 border-amber-300/60 shrink-0 mb-1">
              <Building2 className="w-8 h-8 text-white" />
              <span className="absolute -bottom-1 -right-1 bg-amber-400 text-slate-950 text-[10px] font-extrabold px-1.5 py-0.5 rounded-full border border-slate-900">
                4A
              </span>
            </div>
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tight text-white font-heading mb-1.5">
                e-Kapitan
              </h1>
              <span className="inline-block bg-emerald-500/30 text-emerald-100 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-emerald-400/30 backdrop-blur-sm">
                Barangay 4A, San Pablo City
              </span>
            </div>
          </div>

          <div className="bg-white md:bg-transparent shadow-2xl md:shadow-none rounded-[2rem] md:rounded-none p-6 sm:p-8 md:p-0 overflow-x-hidden relative min-h-[460px] flex flex-col justify-center">
            <AnimatePresence mode="popLayout" custom={direction}>
            {view === 'login' && (
              <motion.div
                key="login"
                custom={direction}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="w-full"
              >
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h2>
                  <p className="text-slate-500">Sign in to your e-Kapitan account to continue.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address <span className="text-rose-500">*</span></label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-slate-50 focus:bg-white"
                        placeholder="juan.delacruz@example.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-sm font-semibold text-slate-700">Password <span className="text-rose-500">*</span></label>
                      <button 
                        type="button" 
                        onClick={() => handleViewChange('forgot')}
                        className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 cursor-pointer"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full pl-10 pr-10 py-3 border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-slate-50 focus:bg-white focus:shadow-sm"
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-emerald-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-slate-300 rounded cursor-pointer"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-600 cursor-pointer select-none">
                      Remember me on this device
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 hover:shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isLoading ? (
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <LogIn className="w-5 h-5 mr-2" />
                        Sign In
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-8 text-center">
                  <p className="text-sm text-slate-500">
                    Don't have an account?{' '}
                    <button 
                      onClick={() => handleViewChange('register')}
                      className="font-bold text-emerald-700 hover:text-emerald-800 transition-colors cursor-pointer"
                    >
                      Register now
                    </button>
                  </p>
                </div>
                
              </motion.div>
            )}

            {view === 'register' && (
              <motion.div
                key="register"
                custom={direction}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="w-full"
              >
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">Create Account</h2>
                  <p className="text-slate-500">Register as a new resident of Barangay 4A.</p>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); handleDemoLogin('citizen'); }} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">First Name <span className="text-rose-500">*</span></label>
                      <input type="text" required className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" placeholder="Juan" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Last Name <span className="text-rose-500">*</span></label>
                      <input type="text" required className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" placeholder="Dela Cruz" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address <span className="text-rose-500">*</span></label>
                    <input type="email" required className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" placeholder="juan.delacruz@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Password <span className="text-rose-500">*</span></label>
                    <div className="relative">
                      <input 
                        type={showPassword ? "text" : "password"} 
                        required 
                        className="w-full pl-3 pr-10 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-slate-50 focus:bg-white focus:shadow-sm transition-all" 
                        placeholder="••••••••" 
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-emerald-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  
                  <button disabled={isLoading} type="submit" className="w-full mt-4 flex items-center justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 hover:shadow transition-all cursor-pointer">
                    {isLoading ? (
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <UserPlus className="w-5 h-5 mr-2" />
                        Complete Registration
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <button onClick={() => handleViewChange('login')} className="text-sm font-semibold text-slate-500 hover:text-emerald-700 transition-colors cursor-pointer">
                    ← Back to Sign In
                  </button>
                </div>
              </motion.div>
            )}

            {view === 'forgot' && (
              <motion.div
                key="forgot"
                custom={direction}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="w-full"
              >
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">Reset Password</h2>
                  <p className="text-slate-500">
                    {otpSent 
                      ? "Enter the 6-digit OTP sent to your email." 
                      : "Enter your email and we'll send you an OTP to reset your password."}
                  </p>
                </div>

                <form onSubmit={(e) => { 
                  e.preventDefault(); 
                  if (!otpSent) {
                    setOtpSent(true);
                  } else {
                    handleDemoLogin('citizen');
                  }
                }} className="space-y-5">
                  {!otpSent ? (
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address <span className="text-rose-500">*</span></label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-slate-400" />
                        </div>
                        <input type="email" required className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" placeholder="juan.delacruz@example.com" />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">One-Time Password (OTP) <span className="text-rose-500">*</span></label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-slate-400" />
                        </div>
                        <input 
                          type="text" 
                          required 
                          maxLength={6}
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                          className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl text-lg tracking-[0.5em] text-center font-bold focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" 
                          placeholder="••••••" 
                        />
                      </div>
                      <div className="mt-2 text-right">
                         <button type="button" className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 cursor-pointer">
                           Resend OTP
                         </button>
                      </div>
                    </div>
                  )}
                  
                  <button disabled={isLoading} type="submit" className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all cursor-pointer">
                    {isLoading ? (
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        {otpSent ? "Verify OTP & Sign In" : "Send OTP"} <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <button onClick={() => { handleViewChange('login'); setOtpSent(false); setOtpCode(''); }} className="text-sm font-semibold text-slate-500 hover:text-emerald-700 transition-colors cursor-pointer">
                    ← Back to Sign In
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          </div>
        </div>

        <div className="pt-8 pb-4 w-full flex flex-col items-center relative z-20 shrink-0">
          <button 
            onClick={() => handleDemoLogin('guest')}
            className="mb-8 px-6 py-2 rounded-full border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-emerald-700 transition-all cursor-pointer shadow-sm bg-white/50 backdrop-blur-sm md:bg-transparent"
          >
            Continue as Guest →
          </button>
          
          <div className="md:hidden w-full text-center text-xs text-slate-400 font-medium px-4">
            &copy; {new Date().getFullYear()} e-Kapitan Civic Platform. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};
