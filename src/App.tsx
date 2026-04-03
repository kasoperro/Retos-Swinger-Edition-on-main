// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { getFirestore, collection, addDoc, query, where, getDocs, deleteDoc, updateDoc, doc, onSnapshot } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWTu40QzLUxUtgV4t_OGGJQreyat4IAQ8",
  authDomain: "retos-swinger-edition.firebaseapp.com",
  projectId: "retos-swinger-edition",
  storageBucket: "retos-swinger-edition.firebasestorage.app",
  messagingSenderId: "308425983090",
  appId: "1:308425983090:web:2ab75c3be562970dc72eeb",
  measurementId: "G-MV485EN9JF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

import React, { useState, useEffect } from 'react';
import { Settings, Play, BookOpen, ChevronRight, X, UserPlus, ArrowLeft, SkipForward, AlertTriangle, UserMinus, UserX, UserCheck, Flag, ChevronDown, ChevronUp, User, LogOut, Eye, PlusCircle, Trash2, Edit2 } from 'lucide-react';
import { Player, Gender, Level, Challenge, challenges, getChallengeText } from './db/challenges';

type View = 'login' | 'home' | 'rules' | 'config' | 'game' | 'examples' | 'custom_challenges';

export default function App() {
  const [view, setView] = useState<View>('login');
  const [isOver18, setIsOver18] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [newPlayerGender, setNewPlayerGender] = useState<Gender>('M');
  const [newPlayerGenderExclusions, setNewPlayerGenderExclusions] = useState<Gender[]>([]);
  const [newPlayerExclusions, setNewPlayerExclusions] = useState<string[]>([]);
  const [expandedPlayerId, setExpandedPlayerId] = useState<string | null>(null);
  
  const [currentChallenge, setCurrentChallenge] = useState<{ p1: Player; p2: Player; challenge: Challenge } | null>(null);
  const [selectedLevels, setSelectedLevels] = useState<Level[]>(['soft']);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [gameModal, setGameModal] = useState<'eliminate' | 'absent' | 'return' | 'add' | null>(null);
  const [isGallina, setIsGallina] = useState(false);
  
  // Timer state
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [timerRemaining, setTimerRemaining] = useState<number>(0);

  const [customChallenges, setCustomChallenges] = useState<Challenge[]>([]);
  const [examplesLevel, setExamplesLevel] = useState<Level | null>(null);
  const [newCustomChallengeLevel, setNewCustomChallengeLevel] = useState<Level>('soft');
  const [newCustomChallengeText, setNewCustomChallengeText] = useState('');
  const [editingChallengeId, setEditingChallengeId] = useState<string | null>(null);
  const [challengeToDelete, setChallengeToDelete] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setIsAuthenticated(true);
        // If they are logged in, we can assume they passed the 18+ check previously
        setIsOver18(true);
        if (view === 'login') setView('home');
      } else {
        setCurrentUser(null);
        setIsAuthenticated(false);
      }
    });
    return () => unsubscribe();
  }, [view]);

  useEffect(() => {
    if (currentUser) {
      const q = query(
        collection(db, "custom_challenges"), 
        where("userId", "==", currentUser.uid)
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const loaded: Challenge[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          // Filter out deleted challenges on the client side to avoid needing a composite index
          if (data.deleted) return;
          loaded.push({
            id: docSnap.id,
            level: data.level,
            text: { es: data.text }
          });
        });
        setCustomChallenges(loaded);
      }, (error) => {
        console.error("Error fetching custom challenges:", error);
      });
      return () => unsubscribe();
    } else {
      setCustomChallenges([]);
    }
  }, [currentUser]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerActive && timerRemaining > 0) {
      interval = setInterval(() => {
        setTimerRemaining(prev => prev - 1);
      }, 1000);
    } else if (timerRemaining === 0 && timerActive) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timerRemaining]);

  const addPlayer = () => {
    if (!newPlayerName.trim()) return;
    const newPlayer: Player = {
      id: Date.now().toString(),
      name: newPlayerName.trim(),
      gender: newPlayerGender,
      exclusions: newPlayerExclusions,
      genderExclusions: newPlayerGenderExclusions,
      absent: false
    };
    setPlayers([...players, newPlayer]);
    setNewPlayerName('');
    setNewPlayerGenderExclusions([]);
    setNewPlayerExclusions([]);
  };

  const removePlayer = (id: string) => {
    setPlayers(players.filter(p => p.id !== id));
    // Also remove this player from others' exclusions
    setPlayers(prev => prev.map(p => ({
      ...p,
      exclusions: p.exclusions.filter(exId => exId !== id)
    })));
  };

  const toggleAbsent = (id: string) => {
    setPlayers(players.map(p => p.id === id ? { ...p, absent: !p.absent } : p));
  };

  const toggleGenderExclusion = (playerId: string, gender: Gender) => {
    setPlayers(players.map(p => {
      if (p.id !== playerId) return p;
      const has = p.genderExclusions.includes(gender);
      return {
        ...p,
        genderExclusions: has ? p.genderExclusions.filter(g => g !== gender) : [...p.genderExclusions, gender]
      };
    }));
  };

  const togglePlayerExclusion = (playerId: string, excludeId: string) => {
    setPlayers(players.map(p => {
      if (p.id !== playerId) return p;
      const has = p.exclusions.includes(excludeId);
      return {
        ...p,
        exclusions: has ? p.exclusions.filter(id => id !== excludeId) : [...p.exclusions, excludeId]
      };
    }));
  };

  const toggleLevel = (l: Level) => {
    setSelectedLevels(prev => {
      if (prev.includes(l)) {
        if (prev.length === 1) return prev; // Must have at least one level selected
        return prev.filter(x => x !== l);
      }
      return [...prev, l];
    });
  };

  const generateChallenge = () => {
    setIsGallina(false);
    setErrorMsg(null);
    const activePlayers = players.filter(p => !p.absent);
    if (activePlayers.length < 2) {
      setErrorMsg("No hay suficientes jugadores activos.");
      setCurrentChallenge(null);
      return;
    }

    // Find all valid pairs
    const validPairs: { p1: Player; p2: Player }[] = [];
    for (const p1 of activePlayers) {
      for (const p2 of activePlayers) {
        if (p1.id === p2.id) continue;
        // Check if P1 excludes P2
        if (p1.exclusions.includes(p2.id)) continue;
        if (p1.genderExclusions.includes(p2.gender)) continue;
        // Check if P2 excludes P1
        if (p2.exclusions.includes(p1.id)) continue;
        if (p2.genderExclusions.includes(p1.gender)) continue;
        
        validPairs.push({ p1, p2 });
      }
    }

    if (validPairs.length === 0) {
      setErrorMsg("No hay combinaciones válidas con las exclusiones actuales.");
      setCurrentChallenge(null);
      return;
    }

    const pair = validPairs[Math.floor(Math.random() * validPairs.length)];
    const { p1, p2 } = pair;

    const allChallenges = [...challenges, ...customChallenges];
    const levelChallenges = allChallenges.filter(c => selectedLevels.includes(c.level));
    if (levelChallenges.length === 0) {
      setErrorMsg("No hay retos disponibles para los niveles seleccionados.");
      setCurrentChallenge(null);
      return;
    }
    
    const challengeIndex = Math.floor(Math.random() * levelChallenges.length);
    const challenge = levelChallenges[challengeIndex];

    // Parse time from challenge
    const textStr = typeof challenge.text.es === 'string' ? challenge.text.es : challenge.text.es[p1.gender];
    const timeMatch = textStr.match(/(?:durante\s+|por\s+)?(\d+|un|uno|una|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez|quince|veinte|treinta|cuarenta|cincuenta|sesenta)\s*(segundo|segundos|seg|segs|minuto|minutos|min|mins)\b/i);
    if (timeMatch) {
      const wordToNum: Record<string, number> = {
        'un': 1, 'uno': 1, 'una': 1, 'dos': 2, 'tres': 3, 'cuatro': 4, 'cinco': 5,
        'seis': 6, 'siete': 7, 'ocho': 8, 'nueve': 9, 'diez': 10,
        'quince': 15, 'veinte': 20, 'treinta': 30, 'cuarenta': 40, 'cincuenta': 50, 'sesenta': 60
      };
      const amountStr = timeMatch[1].toLowerCase();
      const amount = wordToNum[amountStr] || parseInt(amountStr, 10);
      const unit = timeMatch[2].toLowerCase();
      const totalSeconds = unit.startsWith('min') ? amount * 60 : amount;
      setTimerSeconds(totalSeconds);
      setTimerRemaining(totalSeconds);
      setTimerActive(false);
    } else {
      setTimerSeconds(0);
      setTimerRemaining(0);
      setTimerActive(false);
    }

    setCurrentChallenge({ p1, p2, challenge });
  };

  const startGame = () => {
    if (players.filter(p=>!p.absent).length >= 2) {
      setView('game');
      generateChallenge();
    }
  };

  const handleLogin = async () => {
    if (!isOver18) {
      alert("Debes ser mayor de 18 años para entrar.");
      return;
    }
    try {
      const result = await signInWithPopup(auth, provider);
      setCurrentUser(result.user);
      setIsAuthenticated(true);
      setView('home');
    } catch (error: any) {
      console.error("Error logging in", error);
      if (error.code === 'auth/configuration-not-found') {
        alert("⚠️ ATENCIÓN: La autenticación con Google no está activada en tu proyecto de Firebase.\n\nPara solucionarlo:\n1. Ve a la consola de Firebase (console.firebase.google.com)\n2. Entra en tu proyecto 'retos-swinger-edition'\n3. Ve a 'Authentication' > 'Sign-in method'\n4. Añade y habilita el proveedor 'Google'\n5. Guarda los cambios y vuelve a intentarlo.");
      } else if (error.code === 'auth/unauthorized-domain') {
        const currentDomain = window.location.hostname;
        alert(`⚠️ ATENCIÓN: Dominio no autorizado.\n\nPara que el login funcione, debes añadir el dominio actual a Firebase:\n\n1. Ve a la consola de Firebase > Authentication > Settings (Configuración) > Authorized domains (Dominios autorizados)\n2. Añade el siguiente dominio:\n${currentDomain}`);
      } else {
        alert("Error al iniciar sesión con Google: " + error.message);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false);
      setCurrentUser(null);
      setIsOver18(false);
      setView('login');
      setShowUserMenu(false);
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  const renderUserMenu = () => {
    if (!isAuthenticated || !currentUser) {
      if (view !== 'login') {
        return (
          <div className="fixed top-4 right-4 z-40">
            <button 
              onClick={() => setView('login')}
              className="bg-black/50 border border-cyan-500/50 p-2.5 rounded-full text-cyan-400 hover:text-white hover:border-cyan-400 transition-all shadow-[0_0_15px_rgba(34,211,238,0.5)] flex items-center"
              title="Iniciar sesión"
            >
              <UserPlus size={20} />
            </button>
          </div>
        );
      }
      return null;
    }
    return (
      <div className="fixed top-4 right-4 z-40">
        <button 
          onClick={() => setShowUserMenu(!showUserMenu)}
          className="bg-black/50 border border-purple-500/50 p-2.5 rounded-full text-cyan-400 hover:text-white hover:border-cyan-400 transition-all shadow-[0_0_15px_rgba(147,51,234,0.5)]"
        >
          {currentUser.photoURL ? (
            <img src={currentUser.photoURL} alt="User" className="w-6 h-6 rounded-full" referrerPolicy="no-referrer" />
          ) : (
            <User size={20} />
          )}
        </button>
        {showUserMenu && (
          <div className="absolute right-0 mt-2 w-56 bg-black/90 backdrop-blur-md border border-purple-500/50 rounded-xl shadow-[0_0_30px_rgba(147,51,234,0.4)] overflow-hidden">
            <div className="p-4 border-b border-purple-500/30 bg-purple-900/20">
              <p className="text-sm font-bold text-white">{currentUser.displayName || 'Cuenta de Google'}</p>
              <p className="text-xs text-cyan-400 truncate">{currentUser.email}</p>
            </div>
            <button 
              onClick={handleLogout}
              className="w-full text-left px-4 py-3 text-pink-500 hover:bg-pink-500/10 flex items-center transition-colors font-medium"
            >
              <LogOut size={18} className="mr-3" /> Cambiar cuenta / Salir
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderLogin = () => (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-8 p-6 text-center relative z-10">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full blur-3xl opacity-40 animate-pulse"></div>
        <img src="/hero.png" alt="Neon Swinger" className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full shadow-[0_0_50px_rgba(168,85,247,0.8)] border-4 border-cyan-400/50 relative z-10" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
      </div>
      
      <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-cyan-400 to-purple-500 leading-tight drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
        RETOS<br/><span className="text-3xl md:text-5xl text-white">SWINGER EDITION</span>
      </h1>
      
      <div className="bg-black/80 backdrop-blur-md border border-pink-500/50 p-6 rounded-2xl max-w-sm w-full shadow-[0_0_30px_rgba(236,72,153,0.3)]">
        <AlertTriangle className="mx-auto text-pink-500 mb-4 drop-shadow-[0_0_10px_rgba(236,72,153,0.8)]" size={48} />
        <h2 className="text-2xl font-black text-white mb-2">CONTENIDO EXPLÍCITO</h2>
        <p className="text-zinc-300 text-sm mb-6">Esta aplicación contiene retos de carácter sexual explícito y está estrictamente reservada para adultos.</p>
        
        <label className="flex items-center space-x-3 mb-6 text-left cursor-pointer bg-black/60 p-4 rounded-xl border border-purple-500/30 hover:border-cyan-400/50 transition-colors">
          <input 
            type="checkbox" 
            checked={isOver18}
            onChange={(e) => setIsOver18(e.target.checked)}
            className="w-6 h-6 rounded border-purple-500 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-black bg-black"
          />
          <span className="text-white font-bold text-sm">Confirmo que soy mayor de 18 años y consiento ver este contenido.</span>
        </label>

        <button 
          onClick={handleLogin}
          disabled={!isOver18}
          className={`w-full py-4 text-lg font-black rounded-xl flex items-center justify-center transition-all mb-4 ${isOver18 ? 'bg-white text-black shadow-[0_0_25px_rgba(255,255,255,0.6)] hover:scale-105 active:scale-95' : 'bg-zinc-800/50 text-zinc-500 cursor-not-allowed border border-zinc-700'}`}
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Acceder con Google
        </button>

        <p className="text-xs text-zinc-400 mb-4">
          Al iniciar sesión podrás añadir tus propios retos personalizados al juego.
        </p>

        <button 
          onClick={() => {
            if (!isOver18) {
              alert("Debes ser mayor de 18 años para entrar.");
              return;
            }
            setView('home');
          }}
          disabled={!isOver18}
          className={`w-full py-3 text-sm font-bold rounded-xl flex items-center justify-center transition-all ${isOver18 ? 'bg-black/50 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-900/30 active:scale-95' : 'bg-zinc-800/50 text-zinc-600 cursor-not-allowed border border-zinc-800'}`}
        >
          Entrar sin registrarse
        </button>
      </div>
    </div>
  );

  const renderHome = () => (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6 p-6 relative z-10">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full blur-3xl opacity-40 animate-pulse"></div>
        <img src="/hero.png" alt="Neon Swinger" className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full shadow-[0_0_50px_rgba(168,85,247,0.8)] border-4 border-cyan-400/50 relative z-10" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
      </div>
      
      <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-cyan-400 to-purple-500 text-center mb-4 leading-tight drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
        RETOS<br/><span className="text-3xl md:text-5xl text-white">SWINGER EDITION</span>
      </h1>
      <button onClick={() => setView('config')} className="flex items-center justify-center w-full max-w-xs py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xl font-bold rounded-xl hover:scale-105 active:scale-95 transition-all shadow-[0_0_25px_rgba(236,72,153,0.5)]">
        <Play className="mr-2" fill="currentColor" /> EMPEZAR JUEGO
      </button>
      <button onClick={() => setView('examples')} className="flex items-center justify-center w-full max-w-xs py-4 bg-black/50 backdrop-blur-sm border border-cyan-500/50 text-cyan-400 text-xl font-bold rounded-xl hover:bg-cyan-900/30 active:scale-95 transition-all shadow-[0_0_15px_rgba(34,211,238,0.3)]">
        <Eye className="mr-2" /> VER EJEMPLOS DE NIVELES
      </button>
      {isAuthenticated && (
        <button onClick={() => setView('custom_challenges')} className="flex items-center justify-center w-full max-w-xs py-4 bg-black/50 backdrop-blur-sm border border-pink-500/50 text-pink-400 text-xl font-bold rounded-xl hover:bg-pink-900/30 active:scale-95 transition-all shadow-[0_0_15px_rgba(236,72,153,0.3)]">
          <PlusCircle className="mr-2" /> MIS RETOS
        </button>
      )}
      <button onClick={() => setView('rules')} className="flex items-center justify-center w-full max-w-xs py-4 bg-black/50 backdrop-blur-sm border border-purple-500/50 text-purple-400 text-xl font-bold rounded-xl hover:bg-purple-900/30 active:scale-95 transition-all shadow-[0_0_15px_rgba(147,51,234,0.3)]">
        <BookOpen className="mr-2" /> REGLAS Y FUNCIONAMIENTO
      </button>
    </div>
  );

  const renderRules = () => (
    <div className="flex flex-col min-h-screen p-6 max-w-2xl mx-auto w-full pb-20 relative z-10">
      <button onClick={() => setView('home')} className="self-start mb-8 text-[#FFD700] flex items-center font-bold px-4 py-2 bg-zinc-900/80 backdrop-blur-sm rounded-lg shadow-lg">
        <ArrowLeft className="mr-2" size={20} /> ATRÁS
      </button>
      <h2 className="text-3xl md:text-4xl font-black text-[#FF4500] mb-8 drop-shadow-[0_0_10px_rgba(255,69,0,0.3)]">REGLAS Y FUNCIONAMIENTO</h2>
      
      <div className="space-y-8 text-zinc-300 text-base md:text-lg leading-relaxed">
        <section>
          <h3 className="text-2xl font-bold text-white mb-4 border-b border-purple-500/30 pb-2 drop-shadow-md">Conceptos Básicos</h3>
          <ul className="space-y-4">
            <li className="bg-zinc-900/60 backdrop-blur-sm p-4 rounded-xl border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.05)]"><strong className="text-cyan-400">1. Consentimiento:</strong> El consentimiento es la regla de oro. Si alguien no quiere hacer un reto, usa el botón "GALLINA".</li>
            <li className="bg-zinc-900/60 backdrop-blur-sm p-4 rounded-xl border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.05)]"><strong className="text-cyan-400">2. Exclusiones:</strong> En la configuración, puedes excluir géneros o personas específicas. Las exclusiones son <strong className="text-white">mutuas y bidireccionales</strong>. El sistema nunca te emparejará con alguien que hayas excluido.</li>
            <li className="bg-zinc-900/60 backdrop-blur-sm p-4 rounded-xl border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.05)]"><strong className="text-cyan-400">3. Niveles:</strong> Puedes seleccionar varios niveles a la vez tocándolos en la barra superior durante el juego.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-2xl font-bold text-white mb-4 border-b border-purple-500/30 pb-2 drop-shadow-md">Niveles de Juego</h3>
          <div className="space-y-4 text-left">
            <div className="bg-black/50 p-4 rounded-xl border border-purple-500/30">
              <h4 className="font-black text-cyan-400 mb-2">1. SUAVE</h4>
              <p className="text-zinc-300 text-sm">Besos, caricias, masajes y roces. Ideal para calentar el ambiente sin llegar a la penetración ni al sexo oral.</p>
            </div>
            <div className="bg-black/50 p-4 rounded-xl border border-purple-500/30">
              <h4 className="font-black text-purple-400 mb-2">2. ORAL</h4>
              <p className="text-zinc-300 text-sm">Enfocado en el sexo oral, estimulación genital con la boca y manos. Sube la temperatura significativamente.</p>
            </div>
            <div className="bg-black/50 p-4 rounded-xl border border-purple-500/30">
              <h4 className="font-black text-pink-500 mb-2">3. EXTREMO</h4>
              <p className="text-zinc-300 text-sm">Penetración, posturas sexuales complejas y acción directa. Para cuando todos están listos para ir con todo.</p>
            </div>
            <div className="bg-black/50 p-4 rounded-xl border border-purple-500/30">
              <h4 className="font-black text-red-500 mb-2">4. ANAL</h4>
              <p className="text-zinc-300 text-sm">Retos enfocados exclusivamente en la estimulación, besos y penetración anal. Solo para los más atrevidos.</p>
            </div>
            <div className="bg-black/50 p-4 rounded-xl border border-purple-500/30">
              <h4 className="font-black text-orange-500 mb-2">5. SUMISIÓN</h4>
              <p className="text-zinc-300 text-sm">Órdenes, castigos, dominación y humillación erótica. Un jugador toma el control sobre otro.</p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-bold text-white mb-4 border-b border-purple-500/30 pb-2 drop-shadow-md">Botones del Juego</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-zinc-900/60 backdrop-blur-sm p-4 rounded-xl border border-purple-500/20 flex items-start shadow-[0_0_15px_rgba(168,85,247,0.05)]">
              <UserPlus className="text-blue-400 mr-3 mt-1 flex-shrink-0" size={24} />
              <div>
                <strong className="text-white block mb-1">Añadir Jugador</strong>
                <span className="text-sm text-zinc-400">Añade a una nueva persona a la partida en curso.</span>
              </div>
            </div>
            <div className="bg-zinc-900/60 backdrop-blur-sm p-4 rounded-xl border border-purple-500/20 flex items-start shadow-[0_0_15px_rgba(168,85,247,0.05)]">
              <UserMinus className="text-zinc-500 mr-3 mt-1 flex-shrink-0" size={24} />
              <div>
                <strong className="text-white block mb-1">Ausentar</strong>
                <span className="text-sm text-zinc-400">Pausa a un jugador (ej. si va al baño) para que no reciba retos.</span>
              </div>
            </div>
            <div className="bg-zinc-900/60 backdrop-blur-sm p-4 rounded-xl border border-purple-500/20 flex items-start shadow-[0_0_15px_rgba(168,85,247,0.05)]">
              <UserCheck className="text-green-500 mr-3 mt-1 flex-shrink-0" size={24} />
              <div>
                <strong className="text-white block mb-1">Volver</strong>
                <span className="text-sm text-zinc-400">Reincorpora a un jugador ausente a la partida.</span>
              </div>
            </div>
            <div className="bg-zinc-900/60 backdrop-blur-sm p-4 rounded-xl border border-purple-500/20 flex items-start shadow-[0_0_15px_rgba(168,85,247,0.05)]">
              <UserX className="text-red-500 mr-3 mt-1 flex-shrink-0" size={24} />
              <div>
                <strong className="text-white block mb-1">Eliminar</strong>
                <span className="text-sm text-zinc-400">Expulsa definitivamente a un jugador del juego.</span>
              </div>
            </div>
            <div className="bg-zinc-900/60 backdrop-blur-sm p-4 rounded-xl border border-pink-500/30 flex items-start shadow-[0_0_15px_rgba(236,72,153,0.05)]">
              <AlertTriangle className="text-pink-500 mr-3 mt-1 flex-shrink-0" size={24} />
              <div>
                <strong className="text-pink-500 block mb-1">Gallina</strong>
                <span className="text-sm text-zinc-400">Si alguien no quiere hacer el reto, pulsa aquí. El castigo será quitarse una prenda.</span>
              </div>
            </div>
            <div className="bg-zinc-900/60 backdrop-blur-sm p-4 rounded-xl border border-[#FFD700]/30 flex items-start shadow-[0_0_15px_rgba(255,215,0,0.05)]">
              <SkipForward className="text-[#FFD700] mr-3 mt-1 flex-shrink-0" size={24} />
              <div>
                <strong className="text-[#FFD700] block mb-1">Siguiente</strong>
                <span className="text-sm text-zinc-400">Genera un nuevo reto aleatorio entre dos jugadores válidos.</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );

  const renderConfig = () => (
    <div className="flex flex-col min-h-screen relative pb-28 z-10">
      <div className="p-6 max-w-md mx-auto w-full">
        <div className="flex items-center mb-8">
          <button onClick={() => setView('home')} className="text-[#FFD700] p-2 bg-zinc-900/80 backdrop-blur-sm rounded-lg mr-4">
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-2xl font-black text-[#FF4500] drop-shadow-[0_0_10px_rgba(255,69,0,0.3)]">CONFIGURACIÓN</h2>
        </div>

        <div className="bg-zinc-900/80 backdrop-blur-sm p-5 rounded-2xl border border-cyan-500/30 mb-8 shadow-[0_0_30px_rgba(34,211,238,0.1)]">
          <h3 className="text-lg font-bold text-white mb-2">Niveles de Juego</h3>
          <p className="text-xs text-zinc-400 mb-4">Puedes seleccionar varios niveles. Podrás cambiarlos en cualquier momento durante el juego.</p>
          <div className="flex flex-wrap gap-2">
            {(['soft', 'spicy', 'extreme', 'wild', 'submission'] as Level[]).map(l => {
              const isSelected = selectedLevels.includes(l);
              return (
                <button 
                  key={l}
                  onClick={() => toggleLevel(l)}
                  className={`px-4 py-2 rounded-xl text-sm font-black tracking-wide transition-all ${isSelected ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-black shadow-[0_0_10px_rgba(34,211,238,0.4)]' : 'bg-black/50 text-zinc-400 border border-cyan-500/30'}`}
                >
                  {l === 'soft' ? 'SUAVE' : l === 'spicy' ? 'ORAL' : l === 'extreme' ? 'EXTREMO' : l === 'wild' ? 'ANAL' : 'SUMISIÓN'}
                </button>
              );
            })}
          </div>
        </div>
        
        <div className="bg-zinc-900/80 backdrop-blur-sm p-5 rounded-2xl border border-purple-500/30 mb-8 shadow-[0_0_30px_rgba(168,85,247,0.1)]">
          <h3 className="text-lg font-bold text-white mb-4">Añadir Jugador</h3>
          <input 
            type="text" 
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
            placeholder="Nombre del jugador"
            className="w-full bg-black/50 border border-zinc-700 rounded-xl p-4 text-white mb-4 focus:border-[#FFD700] outline-none text-lg transition-colors"
          />
          <div className="flex space-x-2 mb-4">
            {(['M', 'F', 'T'] as Gender[]).map(g => (
              <button 
                key={g}
                onClick={() => setNewPlayerGender(g)}
                className={`flex-1 py-3 rounded-xl border font-bold transition-all ${newPlayerGender === g ? 'bg-[#FF4500] border-[#FF4500] text-white shadow-[0_0_10px_rgba(255,69,0,0.3)]' : 'bg-black/50 border-zinc-700 text-zinc-400'}`}
              >
                {g === 'M' ? 'Hombre' : g === 'F' ? 'Mujer' : 'Trans'}
              </button>
            ))}
          </div>
          <button onClick={addPlayer} className="w-full py-4 bg-[#FFD700] text-black font-black text-lg rounded-xl flex items-center justify-center hover:bg-yellow-400 active:scale-95 transition-all shadow-[0_0_15px_rgba(255,215,0,0.3)]">
            <UserPlus className="mr-2" /> AÑADIR
          </button>
        </div>

        <h3 className="text-lg font-bold text-white mb-4 px-1 drop-shadow-md">Jugadores ({players.length})</h3>
        <div className="space-y-3">
          {players.map(p => (
            <div key={p.id} className="bg-zinc-900/80 backdrop-blur-sm rounded-2xl border border-zinc-800/80 overflow-hidden shadow-sm">
              <div className="flex items-center justify-between p-4">
                <div 
                  className="flex items-center cursor-pointer flex-1" 
                  onClick={() => setExpandedPlayerId(expandedPlayerId === p.id ? null : p.id)}
                >
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-lg">{p.name}</span>
                    <span className="text-xs text-zinc-400 uppercase tracking-wider">{p.gender === 'M' ? 'Hombre' : p.gender === 'F' ? 'Mujer' : 'Trans'}</span>
                  </div>
                  {expandedPlayerId === p.id ? <ChevronUp size={20} className="ml-auto text-zinc-500"/> : <ChevronDown size={20} className="ml-auto text-zinc-500"/>}
                </div>
                <button onClick={() => removePlayer(p.id)} className="text-red-500 bg-red-500/10 p-3 rounded-xl ml-3 active:scale-95 transition-all">
                  <X size={20} />
                </button>
              </div>
              
              {expandedPlayerId === p.id && (
                <div className="p-5 bg-black/60 border-t border-zinc-800/80">
                  <p className="text-xs text-zinc-500 mb-4 italic leading-relaxed">
                    Las exclusiones son <strong className="text-zinc-300">mutuas y bidireccionales</strong>. Nunca interactuarás con los géneros o personas que marques aquí, ni como ejecutor ni como objetivo.
                  </p>
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Excluir géneros:</p>
                  <div className="flex space-x-2 mb-6">
                    {(['M', 'F', 'T'] as Gender[]).map(g => (
                      <button
                        key={g}
                        onClick={() => toggleGenderExclusion(p.id, g)}
                        className={`flex-1 py-2 text-sm font-bold rounded-lg border transition-all ${p.genderExclusions.includes(g) ? 'bg-red-500/20 border-red-500 text-red-500' : 'bg-zinc-900/50 border-zinc-800 text-zinc-400'}`}
                      >
                        {g === 'M' ? 'Hombres' : g === 'F' ? 'Mujeres' : 'Trans'}
                      </button>
                    ))}
                  </div>
                  
                  {players.length > 1 && (
                    <>
                      <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Excluir personas:</p>
                      <div className="flex flex-wrap gap-2">
                        {players.filter(other => other.id !== p.id).map(other => (
                          <button
                            key={other.id}
                            onClick={() => togglePlayerExclusion(p.id, other.id)}
                            className={`px-4 py-2 text-sm font-bold rounded-lg border transition-all ${p.exclusions.includes(other.id) ? 'bg-red-500/20 border-red-500 text-red-500' : 'bg-zinc-900/50 border-zinc-800 text-zinc-400'}`}
                          >
                            {other.name}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
          {players.length === 0 && (
            <div className="text-center py-10 border-2 border-dashed border-purple-500/30 rounded-2xl bg-black/20">
              <p className="text-zinc-400 font-medium">Añade al menos 2 jugadores</p>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-gradient-to-t from-[#0a0014] via-[#0a0014]/90 to-transparent flex justify-center pointer-events-none z-10">
        <div className="max-w-md w-full pointer-events-auto">
          <button 
            onClick={startGame}
            disabled={players.length < 2}
            className={`w-full py-4 text-xl font-black rounded-xl flex items-center justify-center transition-all ${players.length >= 2 ? 'bg-[#FF4500] text-white shadow-[0_10px_25px_rgba(255,69,0,0.5)] hover:scale-[1.02] active:scale-95' : 'bg-zinc-900/80 backdrop-blur-sm text-zinc-600 cursor-not-allowed border border-zinc-800'}`}
          >
            <Play className="mr-2" fill={players.length >= 2 ? "currentColor" : "none"} /> JUGAR AHORA
          </button>
        </div>
      </div>
    </div>
  );

  const renderGameModal = () => {
    if (!gameModal) return null;
    
    return (
      <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl w-full max-w-md relative shadow-2xl">
          <button 
            onClick={(e) => { e.stopPropagation(); setGameModal(null); }} 
            className="absolute -top-4 -right-4 text-white bg-pink-600 hover:bg-pink-500 p-3 rounded-full z-[100] shadow-[0_0_15px_rgba(236,72,153,0.8)] border-2 border-black transition-transform active:scale-90"
          >
            <X size={24} strokeWidth={3} />
          </button>
          
          {gameModal === 'add' && (
            <div>
              <h3 className="text-2xl font-black text-cyan-400 mb-6 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">Añadir Jugador</h3>
              <input 
                type="text" 
                value={newPlayerName}
                onChange={(e) => setNewPlayerName(e.target.value)}
                placeholder="Nombre del jugador"
                className="w-full bg-black/50 border border-purple-500/50 rounded-xl p-4 text-white mb-4 focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.3)] outline-none text-lg transition-all"
              />
              <div className="flex space-x-2 mb-6">
                {(['M', 'F', 'T'] as Gender[]).map(g => (
                  <button 
                    key={g}
                    onClick={() => setNewPlayerGender(g)}
                    className={`flex-1 py-3 rounded-xl border font-bold transition-all ${newPlayerGender === g ? 'bg-purple-600 border-purple-400 text-white shadow-[0_0_15px_rgba(147,51,234,0.5)]' : 'bg-black/50 border-purple-500/30 text-zinc-400'}`}
                  >
                    {g === 'M' ? 'Hombre' : g === 'F' ? 'Mujer' : 'Trans'}
                  </button>
                ))}
              </div>

              <div className="mb-6 p-4 bg-black/40 rounded-xl border border-pink-500/20">
                <p className="text-xs font-bold text-pink-400 uppercase tracking-wider mb-3">Excluir géneros:</p>
                <div className="flex space-x-2 mb-4">
                  {(['M', 'F', 'T'] as Gender[]).map(g => (
                    <button
                      key={g}
                      onClick={() => {
                        setNewPlayerGenderExclusions(prev => 
                          prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]
                        );
                      }}
                      className={`flex-1 py-2 text-sm font-bold rounded-lg border transition-all ${newPlayerGenderExclusions.includes(g) ? 'bg-pink-500/20 border-pink-500 text-pink-400 shadow-[0_0_10px_rgba(236,72,153,0.3)]' : 'bg-black/50 border-zinc-800 text-zinc-500'}`}
                    >
                      {g === 'M' ? 'Hombres' : g === 'F' ? 'Mujeres' : 'Trans'}
                    </button>
                  ))}
                </div>
                
                {players.length > 0 && (
                  <>
                    <p className="text-xs font-bold text-pink-400 uppercase tracking-wider mb-3">Excluir personas:</p>
                    <div className="flex flex-wrap gap-2">
                      {players.map(other => (
                        <button
                          key={other.id}
                          onClick={() => {
                            setNewPlayerExclusions(prev => 
                              prev.includes(other.id) ? prev.filter(x => x !== other.id) : [...prev, other.id]
                            );
                          }}
                          className={`px-3 py-1.5 text-sm font-bold rounded-lg border transition-all ${newPlayerExclusions.includes(other.id) ? 'bg-pink-500/20 border-pink-500 text-pink-400 shadow-[0_0_10px_rgba(236,72,153,0.3)]' : 'bg-black/50 border-zinc-800 text-zinc-500'}`}
                        >
                          {other.name}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <button onClick={() => { addPlayer(); setGameModal(null); }} className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-black text-lg rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:scale-105 active:scale-95 transition-all">
                <UserPlus className="mr-2" /> AÑADIR JUGADOR
              </button>
            </div>
          )}

          {gameModal === 'eliminate' && (
            <div>
              <h3 className="text-2xl font-black text-pink-500 mb-6 drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]">Eliminar Jugador</h3>
              <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2 hide-scrollbar">
                {players.map(p => (
                  <button key={p.id} onClick={() => { removePlayer(p.id); setGameModal(null); generateChallenge(); }} className="w-full flex items-center justify-between bg-black/50 border border-purple-500/30 p-4 rounded-xl hover:border-pink-500 hover:shadow-[0_0_15px_rgba(236,72,153,0.3)] transition-all">
                    <span className="text-white font-bold">{p.name}</span>
                    <UserX className="text-pink-500" size={20} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {gameModal === 'absent' && (
            <div>
              <h3 className="text-2xl font-black text-purple-400 mb-6 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">Marcar Ausente</h3>
              <p className="text-sm text-zinc-400 mb-4">El jugador no recibirá retos temporalmente.</p>
              <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2 hide-scrollbar">
                {players.filter(p => !p.absent).map(p => (
                  <button key={p.id} onClick={() => { toggleAbsent(p.id); setGameModal(null); generateChallenge(); }} className="w-full flex items-center justify-between bg-black/50 border border-purple-500/30 p-4 rounded-xl hover:border-purple-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all">
                    <span className="text-white font-bold">{p.name}</span>
                    <UserMinus className="text-purple-400" size={20} />
                  </button>
                ))}
                {players.filter(p => !p.absent).length === 0 && <p className="text-zinc-500 text-center py-4">No hay jugadores activos.</p>}
              </div>
            </div>
          )}

          {gameModal === 'return' && (
            <div>
              <h3 className="text-2xl font-black text-cyan-400 mb-6 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">Volver al Juego</h3>
              <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2 hide-scrollbar">
                {players.filter(p => p.absent).map(p => (
                  <button key={p.id} onClick={() => { toggleAbsent(p.id); setGameModal(null); generateChallenge(); }} className="w-full flex items-center justify-between bg-black/50 border border-cyan-500/30 p-4 rounded-xl hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all">
                    <span className="text-white font-bold">{p.name}</span>
                    <UserCheck className="text-cyan-400" size={20} />
                  </button>
                ))}
                {players.filter(p => p.absent).length === 0 && <p className="text-zinc-500 text-center py-4">No hay jugadores ausentes.</p>}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderGame = () => {
    return (
      <div className="flex flex-col min-h-screen relative pb-28 z-10">
        {renderGameModal()}
        
        {/* Top Bar - Management */}
        <div className="flex items-center justify-between bg-zinc-900/80 backdrop-blur-md border-b border-purple-500/30 p-4 z-10">
          <button onClick={() => setView('config')} className="flex items-center text-zinc-300 bg-zinc-800/80 px-4 py-2.5 rounded-xl active:scale-95 transition-transform font-bold text-sm">
            <ArrowLeft size={18} className="mr-2"/> ATRÁS
          </button>
          <div className="flex gap-2 mr-14">
            <button onClick={() => setGameModal('add')} className="bg-black/50 border border-cyan-500/30 p-2.5 rounded-xl text-cyan-400 hover:shadow-[0_0_10px_rgba(34,211,238,0.5)] active:scale-95 transition-all"><UserPlus size={20}/></button>
            <button onClick={() => setGameModal('absent')} className="bg-black/50 border border-purple-500/30 p-2.5 rounded-xl text-purple-400 hover:shadow-[0_0_10px_rgba(168,85,247,0.5)] active:scale-95 transition-all"><UserMinus size={20}/></button>
            <button onClick={() => setGameModal('return')} className="bg-black/50 border border-blue-500/30 p-2.5 rounded-xl text-blue-400 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)] active:scale-95 transition-all"><UserCheck size={20}/></button>
            <button onClick={() => setGameModal('eliminate')} className="bg-black/50 border border-pink-500/30 p-2.5 rounded-xl text-pink-500 hover:shadow-[0_0_10px_rgba(236,72,153,0.5)] active:scale-95 transition-all"><UserX size={20}/></button>
          </div>
        </div>

        {/* Level Selector - Multi-select */}
        <div className="flex overflow-x-auto hide-scrollbar p-4 gap-3 border-b border-purple-500/30 bg-black/40 backdrop-blur-sm z-0">
          {(['soft', 'spicy', 'extreme', 'wild', 'submission'] as Level[]).map(l => {
            const isSelected = selectedLevels.includes(l);
            return (
              <button 
                key={l}
                onClick={() => toggleLevel(l)}
                className={`flex-shrink-0 px-5 py-2.5 rounded-xl text-sm font-black tracking-wide transition-all ${isSelected ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-black shadow-[0_0_15px_rgba(34,211,238,0.5)] scale-105' : 'bg-black/50 text-zinc-400 border border-purple-500/30'}`}
              >
                {l === 'soft' ? 'SUAVE' : l === 'spicy' ? 'ORAL' : l === 'extreme' ? 'EXTREMO' : l === 'wild' ? 'ANAL' : 'SUMISIÓN'}
              </button>
            );
          })}
        </div>

        {/* Challenge Area */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 text-center relative">
          {errorMsg ? (
            <div className="bg-red-500/10 backdrop-blur-sm border border-red-500 text-red-500 p-8 rounded-3xl max-w-md w-full shadow-[0_0_30px_rgba(239,68,68,0.2)]">
              <AlertTriangle className="mx-auto mb-4" size={48} />
              <p className="text-xl font-bold">{errorMsg}</p>
              <p className="text-sm mt-4 opacity-80">Revisa las exclusiones o añade más jugadores.</p>
            </div>
          ) : isGallina ? (
            <div className="bg-black/60 backdrop-blur-md border border-pink-500 p-8 md:p-12 rounded-3xl max-w-2xl w-full text-center shadow-[0_0_40px_rgba(236,72,153,0.4)] transform transition-all animate-in zoom-in duration-300">
              <AlertTriangle className="mx-auto text-pink-500 mb-6 drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]" size={64} />
              <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-pink-400 to-red-600 mb-6 drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]">
                ¡GALLINA!
              </h2>
              <p className="text-2xl md:text-4xl font-bold text-white leading-relaxed">
                Si no estás desnudo o desnuda ya, quítate una prenda.
              </p>
            </div>
          ) : currentChallenge ? (
            <div className="w-full max-w-4xl flex flex-col items-center">
              {/* Mobile Optimized VS */}
              <div className="flex flex-col md:flex-row items-center justify-center w-full mb-6 gap-3 md:gap-12">
                <div className="flex flex-col items-center w-full md:w-auto bg-zinc-900/60 backdrop-blur-sm p-4 rounded-2xl border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.1)]">
                  <span className="text-zinc-400 text-xs font-bold tracking-widest mb-1">EJECUTOR</span>
                  <span className="text-3xl md:text-5xl font-black text-[#FFD700] uppercase tracking-wider drop-shadow-[0_0_10px_rgba(255,215,0,0.3)] text-center break-words w-full">{currentChallenge.p1.name}</span>
                </div>
                
                <div className="bg-zinc-800/90 backdrop-blur-md rounded-full p-3 md:p-4 z-10 -my-4 md:my-0 border-4 border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                  <span className="text-zinc-300 text-sm md:text-xl font-black italic">VS</span>
                </div>
                
                <div className="flex flex-col items-center w-full md:w-auto bg-zinc-900/60 backdrop-blur-sm p-4 rounded-2xl border border-orange-500/30 shadow-[0_0_20px_rgba(249,115,22,0.1)]">
                  <span className="text-zinc-400 text-xs font-bold tracking-widest mb-1">OBJETIVO</span>
                  <span className="text-3xl md:text-5xl font-black text-[#FF4500] uppercase tracking-wider drop-shadow-[0_0_10px_rgba(255,69,0,0.3)] text-center break-words w-full">{currentChallenge.p2.name}</span>
                </div>
              </div>

              <div className="bg-zinc-900/80 backdrop-blur-md border border-zinc-700/50 p-6 md:p-12 rounded-3xl w-full shadow-[0_0_40px_rgba(0,0,0,0.5)] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#FFD700] to-[#FF4500]"></div>
                <p className="text-2xl md:text-4xl text-white font-medium leading-snug md:leading-normal">
                  {getChallengeText(currentChallenge.challenge, 'es', currentChallenge.p1, currentChallenge.p2)}
                </p>
                
                {timerSeconds > 0 && (
                  <div className="mt-8 flex flex-col items-center border-t border-zinc-800 pt-6">
                    <div className="text-5xl font-black text-cyan-400 mb-4 font-mono tracking-wider drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                      {Math.floor(timerRemaining / 60).toString().padStart(2, '0')}:{(timerRemaining % 60).toString().padStart(2, '0')}
                    </div>
                    {timerRemaining === 0 && timerSeconds > 0 ? (
                      <div className="text-2xl font-bold text-red-500 animate-pulse uppercase tracking-widest">
                        ¡Tiempo finalizado!
                      </div>
                    ) : (
                      <button
                        onClick={() => setTimerActive(!timerActive)}
                        className={`px-8 py-3 rounded-full font-bold text-lg transition-all ${timerActive ? 'bg-red-500/20 text-red-500 border border-red-500 hover:bg-red-500/30' : 'bg-cyan-500 text-black hover:bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)]'}`}
                      >
                        {timerActive ? 'PAUSAR' : timerRemaining < timerSeconds ? 'REANUDAR' : 'INICIAR TIEMPO'}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>

        {/* Fixed Bottom Action Bar */}
        <div className="fixed bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black via-black to-transparent flex justify-center z-10">
          <div className="max-w-md w-full flex gap-3">
            <button 
              onClick={() => setIsGallina(true)} 
              className="flex-1 py-4 bg-black/50 border border-pink-500/50 text-pink-500 text-lg font-black rounded-2xl flex items-center justify-center hover:bg-pink-500/20 hover:shadow-[0_0_15px_rgba(236,72,153,0.4)] active:scale-95 transition-all"
            >
              <AlertTriangle className="mr-2" size={20} /> GALLINA
            </button>
            <button 
              onClick={generateChallenge} 
              className="flex-[2] py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl font-black rounded-2xl flex items-center justify-center shadow-[0_10px_25px_rgba(236,72,153,0.5)] hover:scale-[1.02] active:scale-95 transition-all border border-pink-400/50"
            >
              <SkipForward className="mr-2" size={24} fill="currentColor" /> SIGUIENTE
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderExamples = () => {
    const levels: { id: Level; name: string; color: string }[] = [
      { id: 'soft', name: 'SUAVE', color: 'text-cyan-400' },
      { id: 'spicy', name: 'ORAL', color: 'text-purple-400' },
      { id: 'extreme', name: 'EXTREMO', color: 'text-pink-500' },
      { id: 'wild', name: 'ANAL', color: 'text-red-500' },
      { id: 'submission', name: 'SUMISIÓN', color: 'text-orange-500' }
    ];

    return (
      <div className="flex flex-col min-h-screen p-6 max-w-2xl mx-auto w-full pb-20 relative z-10">
        <button onClick={() => setView('home')} className="self-start mb-8 text-cyan-400 flex items-center font-bold px-4 py-2 bg-zinc-900/80 backdrop-blur-sm rounded-lg shadow-lg border border-cyan-500/30">
          <ArrowLeft className="mr-2" size={20} /> ATRÁS
        </button>
        <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-8 drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">EJEMPLOS DE RETOS</h2>
        
        <div className="space-y-4">
          {levels.map(level => (
            <div key={level.id} className="bg-black/50 border border-purple-500/30 rounded-xl overflow-hidden">
              <button 
                onClick={() => setExamplesLevel(examplesLevel === level.id ? null : level.id)}
                className="w-full p-4 flex items-center justify-between hover:bg-purple-900/20 transition-colors"
              >
                <span className={`text-xl font-black ${level.color}`}>{level.name}</span>
                {examplesLevel === level.id ? <ChevronUp className="text-zinc-400" /> : <ChevronDown className="text-zinc-400" />}
              </button>
              
              {examplesLevel === level.id && (
                <div className="p-4 bg-black/80 border-t border-purple-500/30 space-y-3">
                  {challenges.filter(c => c.level === level.id).slice(0, 5).map((c, idx) => {
                    const textStr = typeof c.text.es === 'string' ? c.text.es : c.text.es['M'];
                    return (
                      <div key={idx} className="p-3 bg-zinc-900/50 rounded-lg border border-zinc-800 text-zinc-300 text-sm">
                        {textStr.replace(/{p1}/g, 'Ejecutor').replace(/{p2}/g, 'Objetivo')}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const handleSaveCustomChallenge = async () => {
    if (!newCustomChallengeText.trim() || !currentUser) return;
    
    // Convert "ejecutor" and "objetivo" to {p1} and {p2}
    const processedText = newCustomChallengeText
      .replace(/\bejecutor\b/gi, '{p1}')
      .replace(/\bobjetivo\b/gi, '{p2}');

    try {
      if (editingChallengeId) {
        await updateDoc(doc(db, "custom_challenges", editingChallengeId), {
          level: newCustomChallengeLevel,
          text: processedText
        });
        setEditingChallengeId(null);
      } else {
        await addDoc(collection(db, "custom_challenges"), {
          userId: currentUser.uid,
          level: newCustomChallengeLevel,
          text: processedText,
          createdAt: new Date()
        });
      }
      setNewCustomChallengeText('');
    } catch (error) {
      console.error("Error saving challenge:", error);
      alert("Error al guardar el reto.");
    }
  };

  const handleDeleteCustomChallenge = (id: string) => {
    setChallengeToDelete(id);
  };

  const executeDelete = async () => {
    if (!challengeToDelete) return;
    try {
      await updateDoc(doc(db, "custom_challenges", challengeToDelete), {
        deleted: true,
        deletedAt: new Date()
      });
    } catch (error) {
      console.error("Error deleting challenge:", error);
    }
    setChallengeToDelete(null);
  };

  const editCustomChallenge = (challenge: Challenge) => {
    setEditingChallengeId(challenge.id);
    setNewCustomChallengeLevel(challenge.level);
    // Convert back {p1} and {p2} to ejecutor and objetivo for editing
    const textStr = typeof challenge.text.es === 'string' ? challenge.text.es : challenge.text.es['M'];
    setNewCustomChallengeText(textStr.replace(/{p1}/g, 'ejecutor').replace(/{p2}/g, 'objetivo'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderCustomChallenges = () => {
    if (!isAuthenticated) return null;

    return (
      <div className="flex flex-col min-h-screen p-6 max-w-2xl mx-auto w-full pb-20 relative z-10">
        <button onClick={() => setView('home')} className="self-start mb-8 text-pink-500 flex items-center font-bold px-4 py-2 bg-zinc-900/80 backdrop-blur-sm rounded-lg shadow-lg border border-pink-500/30">
          <ArrowLeft className="mr-2" size={20} /> ATRÁS
        </button>
        <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500 mb-8 drop-shadow-[0_0_10px_rgba(236,72,153,0.3)]">MIS RETOS PERSONALIZADOS</h2>
        
        {challengeToDelete && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-zinc-900 border border-pink-500/50 p-6 rounded-3xl w-full max-w-sm text-center shadow-[0_0_30px_rgba(236,72,153,0.3)]">
              <AlertTriangle className="mx-auto text-pink-500 mb-4" size={48} />
              <h3 className="text-xl font-bold text-white mb-2">¿Eliminar reto?</h3>
              <p className="text-zinc-400 mb-6">Esta acción no se puede deshacer.</p>
              <div className="flex gap-3">
                <button onClick={() => setChallengeToDelete(null)} className="flex-1 py-3 bg-zinc-800 text-white font-bold rounded-xl hover:bg-zinc-700 transition-all">Cancelar</button>
                <button onClick={executeDelete} className="flex-1 py-3 bg-pink-600 text-white font-bold rounded-xl hover:bg-pink-500 transition-all shadow-[0_0_15px_rgba(236,72,153,0.4)]">Eliminar</button>
              </div>
            </div>
          </div>
        )}

        <div className="bg-black/60 backdrop-blur-md border border-pink-500/50 p-6 rounded-2xl mb-8 shadow-[0_0_20px_rgba(236,72,153,0.2)]">
          <h3 className="text-xl font-bold text-white mb-4">{editingChallengeId ? 'Editar Reto' : 'Añadir Nuevo Reto'}</h3>
          
          <div className="mb-4">
            <label className="block text-zinc-400 text-sm mb-2">Nivel del reto</label>
            <div className="flex flex-wrap gap-2">
              {(['soft', 'spicy', 'extreme', 'wild', 'submission'] as Level[]).map(l => (
                <button 
                  key={l}
                  onClick={() => setNewCustomChallengeLevel(l)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${newCustomChallengeLevel === l ? 'bg-pink-500 text-white shadow-[0_0_10px_rgba(236,72,153,0.5)]' : 'bg-zinc-800 text-zinc-400 border border-zinc-700'}`}
                >
                  {l === 'soft' ? 'SUAVE' : l === 'spicy' ? 'ORAL' : l === 'extreme' ? 'EXTREMO' : l === 'wild' ? 'ANAL' : 'SUMISIÓN'}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-zinc-400 text-sm mb-2">Texto del reto</label>
            <div className="bg-purple-900/30 border border-purple-500/50 p-3 rounded-lg mb-3 text-sm text-purple-200">
              <strong className="text-pink-400">¡IMPORTANTE!</strong> Usa la palabra <strong className="text-white">ejecutor</strong> para referirte a la persona que hace la acción y <strong className="text-white">objetivo</strong> para quien la recibe.<br/>
              <em>Ejemplo: "ejecutor da un beso con lengua a objetivo durante 30 segundos"</em><br/>
              <span className="text-cyan-400 text-xs mt-2 block">💡 Si incluyes un tiempo (ej. "30 segundos" o "1 minuto"), aparecerá un temporizador automáticamente.</span>
            </div>
            <textarea 
              value={newCustomChallengeText}
              onChange={(e) => setNewCustomChallengeText(e.target.value)}
              placeholder="Escribe tu reto aquí..."
              className="w-full bg-black/50 border border-zinc-700 rounded-xl p-4 text-white h-32 focus:border-pink-500 outline-none resize-none"
            />
          </div>

          <div className="flex gap-3">
            <button 
              onClick={handleSaveCustomChallenge}
              disabled={!newCustomChallengeText.trim()}
              className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_15px_rgba(236,72,153,0.4)]"
            >
              {editingChallengeId ? 'Guardar Cambios' : 'Añadir Reto'}
            </button>
            {editingChallengeId && (
              <button 
                onClick={() => { setEditingChallengeId(null); setNewCustomChallengeText(''); }}
                className="px-4 py-3 bg-zinc-800 text-white font-bold rounded-xl hover:bg-zinc-700 transition-all"
              >
                Cancelar
              </button>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white mb-4">Tus Retos Guardados ({customChallenges.length})</h3>
          {customChallenges.length === 0 ? (
            <p className="text-zinc-500 italic bg-black/30 p-6 rounded-xl border border-zinc-800 text-center">Aún no has añadido ningún reto personalizado.</p>
          ) : (
            <div className="space-y-3">
              {customChallenges.map(c => {
                const textStr = typeof c.text.es === 'string' ? c.text.es : c.text.es['M'];
                return (
                  <div key={c.id} className="bg-black/50 border border-purple-500/30 p-4 rounded-xl flex justify-between items-start gap-4 hover:border-pink-500/50 transition-colors">
                    <div className="flex-1">
                      <span className="inline-block px-2 py-1 bg-purple-900/50 text-purple-300 text-xs font-bold rounded mb-2">
                        {c.level === 'soft' ? 'SUAVE' : c.level === 'spicy' ? 'ORAL' : c.level === 'extreme' ? 'EXTREMO' : c.level === 'wild' ? 'ANAL' : 'SUMISIÓN'}
                      </span>
                      <p className="text-zinc-300 text-sm">{textStr.replace(/{p1}/g, 'ejecutor').replace(/{p2}/g, 'objetivo')}</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => editCustomChallenge(c)} className="p-2 text-zinc-400 hover:text-cyan-400 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDeleteCustomChallenge(c.id)} className="p-2 text-zinc-400 hover:text-red-500 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#050014] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1a0033] via-[#050014] to-black text-white font-sans selection:bg-pink-500 selection:text-white relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-10">
        {renderUserMenu()}
        {view === 'login' && renderLogin()}
        {view === 'home' && renderHome()}
        {view === 'rules' && renderRules()}
        {view === 'config' && renderConfig()}
        {view === 'game' && renderGame()}
        {view === 'examples' && renderExamples()}
        {view === 'custom_challenges' && renderCustomChallenges()}
      </div>
    </div>
  );
}
