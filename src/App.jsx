import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code, 
  Brain, 
  Database, 
  Cpu, 
  Layers, 
  Terminal, 
  Send, 
  Menu, 
  X, 
  Award,
  Briefcase,
  GraduationCap,
  ChevronDown,
  Sparkles,
  Phone,
  Home,
  User,
  Folder,
  MessageSquare,
  Link,
  Bot,
  Flame,
  Box,
  CircleDashed,
  Palette,
  FileCode,
  FlaskConical,
  Cloud,
  Container,
  GitBranch,
  Server,
  BrainCircuit,
  Trophy,
  ScrollText,
  FileCheck,
  Layout,
  Table,
  Copy,
  Check,
  Loader2,
  MapPin,
  Download,
  Maximize2,
  Minimize2
} from 'lucide-react';

// Firebase Imports
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

// --- Firebase Configuration ---
const firebaseConfig = {
  apiKey: "AIzaSyCrLomyHffMXjWYIMdpMaHINw9qGPWRrFw",
  authDomain: "my-portfolio-780e9.firebaseapp.com",
  projectId: "my-portfolio-780e9",
  storageBucket: "my-portfolio-780e9.firebasestorage.app",
  messagingSenderId: "34616774542",
  appId: "1:34616774542:web:21a8bc5162620e03789edf"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Your custom app ID for Firestore path
const appId = "my-portfolio";


// --- Components ---

const Sticker = ({ icon: Icon, color, initialX, initialY, delay, duration }) => {
  return (
    <div 
      className="absolute opacity-[0.12] pointer-events-none"
      style={{
        left: `${initialX}%`,
        top: `${initialY}%`,
        color: color,
      }}
    >
      <div 
        className="animate-wander" 
        style={{ 
          animationDelay: `${delay}s`, 
          animationDuration: `${duration}s` 
        }}
      >
        <Icon size={40} strokeWidth={1.5} />
      </div>
    </div>
  );
};

const NavLink = ({ href, label, active, onClick }) => (
  <a 
    href={href}
    onClick={(e) => {
      e.preventDefault();
      onClick(href);
    }}
    className={`text-sm font-bold tracking-wide transition-all duration-300 hover:text-cyan-600 relative group ${active ? 'text-cyan-600' : 'text-slate-600'}`}
  >
    {label}
    <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-cyan-500 transition-all duration-300 group-hover:w-full ${active ? 'w-full' : ''}`}></span>
  </a>
);

const SectionTitle = ({ title, subtitle }) => (
  <div className="mb-12 text-center relative z-10">
    <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3 inline-flex items-center gap-3">
      {title}
    </h2>
    <div className="w-12 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 mx-auto rounded-full"></div>
    {subtitle && <p className="text-slate-600 mt-3 max-w-2xl mx-auto text-base">{subtitle}</p>}
  </div>
);

const ProjectCard = ({ title, tech, description, type, role, period, imageUrl, repoLink }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="group relative bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-cyan-400 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col md:flex-row h-full max-w-4xl w-full mx-auto">
      {/* Image Section */}
      <div className="relative w-full md:w-48 h-48 md:h-auto shrink-0 bg-slate-100 overflow-hidden">
        {!imageError ? (
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-100">
            <Layers size={32} className="text-slate-300" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-40 transition-opacity"></div>
        
        <div className="absolute top-3 left-3">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/90 text-cyan-700 backdrop-blur-md border border-white/50 shadow-sm">
            {type}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
           <div>
             <h3 className="text-lg font-bold text-slate-900 group-hover:text-cyan-600 transition-colors">
               {repoLink ? (
                 <a href={repoLink} target="_blank" rel="noopener noreferrer" className="hover:underline">{title}</a>
               ) : title}
             </h3>
             <p className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">{role} • {period}</p>
           </div>
           {repoLink && (
             <a 
               href={repoLink} 
               target="_blank" 
               rel="noopener noreferrer" 
               className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
               title="View Code"
             >
                <Github size={16} />
             </a>
           )}
        </div>
        
        <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2">{description}</p>
        
        <div className="mt-auto pt-3 border-t border-slate-100 flex flex-wrap gap-2">
          {tech.map((t, i) => (
            <span key={i} className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-50 text-slate-600 border border-slate-200 group-hover:border-cyan-100 group-hover:text-cyan-700 transition-colors">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const SkillCard = ({ name, icon: Icon, iconUrl, customColor }) => (
  <div className="flex flex-col items-center justify-center p-3 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:border-cyan-400 hover:-translate-y-1 transition-all duration-300 w-24 h-24 group">
    <div className="mb-2 transition-transform duration-300 group-hover:scale-110">
       {iconUrl ? (
         <img src={iconUrl} alt={name} className="w-8 h-8 object-contain opacity-80 group-hover:opacity-100" />
       ) : (
         <Icon size={32} strokeWidth={1.5} className={customColor || "text-slate-500 group-hover:text-cyan-600"} />
       )}
    </div>
    <span className="text-slate-700 font-bold text-[10px] text-center group-hover:text-slate-900 leading-tight">{name}</span>
  </div>
);

const CertificationCard = ({ title, provider, icon: Icon }) => (
  <div className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg hover:border-cyan-400 transition-all hover:shadow-sm group h-full">
    <div className="p-2 bg-slate-50 rounded-md text-cyan-600 group-hover:bg-cyan-50 transition-colors shrink-0">
       <Icon size={20} />
    </div>
    <div>
       <h4 className="text-xs font-bold text-slate-900 leading-tight">{title}</h4>
       <p className="text-[10px] text-slate-500 mt-0.5 font-medium">{provider}</p>
    </div>
  </div>
);

const JourneyCard = ({ year, title, subtitle, gpa, icon: Icon }) => (
  <div className="bg-white rounded-xl p-3 border border-slate-100 shadow-sm w-full hover:shadow-md hover:border-cyan-400 transition-all flex items-center gap-6 max-w-4xl group">
    <div className="w-16 h-16 rounded-lg bg-slate-50 flex items-center justify-center text-cyan-600 group-hover:bg-cyan-50 transition-colors shrink-0">
      <Icon size={28} strokeWidth={1.5} />
    </div>
    
    <div className="flex-1 pr-4">
       <div className="flex items-center justify-between flex-wrap gap-2">
         <div>
           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">{year}</span>
           <h3 className="text-base font-bold text-slate-900 group-hover:text-cyan-700 transition-colors">{title}</h3>
           {subtitle && <p className="text-xs font-medium text-slate-500 mt-0.5">{subtitle}</p>}
         </div>
         
         {gpa && (
            <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200 group-hover:border-cyan-100 group-hover:bg-cyan-50 transition-colors">
              {gpa}
            </span>
         )}
       </div>
    </div>
  </div>
);

const ContactItem = ({ icon: Icon, label, value, type, onCopy, copied }) => (
  <button 
    onClick={() => onCopy(value, type)}
    className="w-full flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-md hover:-translate-y-0.5 transition-all group text-left relative overflow-hidden"
  >
    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors ${copied ? 'bg-green-100 text-green-600' : 'bg-slate-50 text-cyan-600 group-hover:bg-cyan-50'}`}>
      {copied ? <Check size={20} /> : <Icon size={20} />}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">{label}</p>
      <p className="text-slate-900 font-medium truncate">{value}</p>
    </div>
    <div className="text-slate-300 group-hover:text-cyan-500 transition-colors">
       {copied ? <span className="text-xs font-bold text-green-600">Copied!</span> : <Copy size={18} />}
    </div>
  </button>
);

// --- Main App Component ---

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState('idle');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [copiedField, setCopiedField] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const [user, setUser] = useState(null);

  const words = ["Generative AI", "Computer Vision", "Agentic Workflows", "LLMs"];

  // Auth & Typewriter Effect
  useEffect(() => {
    const handleType = () => {
      const i = loopNum % words.length;
      const fullText = words[i];
      
      setText(isDeleting 
        ? fullText.substring(0, text.length - 1) 
        : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 50 : 100);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  // Init Auth
  useEffect(() => {
    const initAuth = async () => {
      try {
        await signInAnonymously(auth);
      } catch (error) {
        console.error("Auth error:", error);
      }
    };
    initAuth();
    
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'journey', 'achievements', 'projects', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id.replace('#', ''));
      setIsMenuOpen(false);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      alert("Connecting to secure server, please try again in a moment.");
      return;
    }

    setFormStatus('sending');
    
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      timestamp: serverTimestamp(),
      userId: user.uid
    };

    try {
      // Save to Firestore
      await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'contact_messages'), data);
      setFormStatus('success');
      setTimeout(() => {
        setFormStatus('idle');
        e.target.reset();
      }, 3000);
    } catch (error) {
      console.error("Error sending message:", error);
      setFormStatus('idle');
      alert("Failed to send message. Please try again.");
    }
  };

  const handleCopy = (text, field) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
    document.body.removeChild(textArea);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const tiltX = mousePos.y * 5;
  const tiltY = mousePos.x * -5;

  // Styles
  const styles = `
    @keyframes wander {
      0%, 100% { transform: translate(0, 0) rotate(0deg); }
      25% { transform: translate(40px, -50px) rotate(5deg); }
      50% { transform: translate(-30px, 40px) rotate(-5deg); }
      75% { transform: translate(20px, -20px) rotate(3deg); }
    }
    .animate-wander { animation: wander 20s ease-in-out infinite; }
    .gradient-text {
      background-size: 200% 200%;
      animation: gradientMove 5s ease infinite;
    }
    @keyframes gradientMove {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .glass-nav {
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(226, 232, 240, 0.8);
    }
  `;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-cyan-200 selection:text-cyan-900 overflow-x-hidden">
      <style>{styles}</style>

      {/* --- Top Navigation Bar --- */}
      <nav className="fixed top-0 w-full z-50 glass-nav transition-all duration-300 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer group" onClick={() => scrollTo('#home')}>
              <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-md group-hover:rotate-3 transition-transform">
                <span className="font-extrabold text-white text-xl">D</span>
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">Dev<span className="text-cyan-600">.AI</span></span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-baseline space-x-8">
                {['Home', 'About', 'Journey', 'Achievements', 'Projects', 'Skills', 'Contact'].map((item) => (
                   <NavLink 
                     key={item} 
                     href={`#${item.toLowerCase()}`} 
                     label={item} 
                     active={activeSection === item.toLowerCase()} 
                     onClick={scrollTo} 
                   />
                ))}
              </div>
              <button 
                onClick={toggleFullscreen} 
                className="p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
                title="Toggle Fullscreen"
              >
                {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
               <button 
                onClick={toggleFullscreen} 
                className="p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
              >
                {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-600 hover:text-slate-900 p-2">
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xl">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {['Home', 'About', 'Journey', 'Achievements', 'Projects', 'Skills', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(`#${item.toLowerCase()}`)}
                  className="text-slate-600 hover:text-cyan-600 hover:bg-slate-50 block w-full text-left px-4 py-3 rounded-md text-base font-bold"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* --- Main Content --- */}
      <main className="relative pt-20">
        
        {/* HERO SECTION */}
        <section id="home" className="pt-28 md:pt-36 pb-20 flex flex-col items-center relative px-4 overflow-hidden bg-white">
           {/* Floating Stickers - Faded Background for Home Only */}
           <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <Sticker icon={Brain} color="#0891b2" initialX={10} initialY={15} delay={0} duration={25} />
              <Sticker icon={Code} color="#9333ea" initialX={80} initialY={10} delay={2} duration={30} />
              <Sticker icon={Database} color="#059669" initialX={15} initialY={60} delay={4} duration={28} />
              <Sticker icon={Cpu} color="#db2777" initialX={85} initialY={70} delay={1} duration={32} />
              <Sticker icon={Terminal} color="#d97706" initialX={50} initialY={40} delay={5} duration={35} />
              <Sticker icon={Layers} color="#2563eb" initialX={30} initialY={85} delay={3} duration={27} />
           </div>

           <div className="max-w-4xl mx-auto w-full flex flex-col items-center justify-center z-10">
             
             {/* Text Content - Fully Centered */}
             <div className="text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-[11px] font-bold tracking-widest text-cyan-700 uppercase bg-cyan-50 rounded-full border border-cyan-200 shadow-sm cursor-pointer hover:bg-cyan-100 transition-colors">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                  </span>
                  Hire Me
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-slate-900 tracking-tight mb-4 leading-tight">
                  Hi, I'm <br/>
                  <span className="gradient-text bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600">
                    Dev Dhakad
                  </span>
                </h1>
                
                <p className="text-lg md:text-xl text-slate-600 mb-3 font-medium max-w-2xl mx-auto leading-relaxed">
                   An AI & ML Engineer specializing in <span className="text-purple-600 font-semibold">{text}|</span>
                </p>
                
                <p className="text-sm md:text-base text-slate-500 mb-8 max-w-2xl mx-auto font-medium">
                  Passionate about leveraging Generative AI and Computer Vision to solve complex real-world problems.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button onClick={() => scrollTo('#projects')} className="px-6 py-3 rounded-xl bg-slate-900 text-white font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2">
                    Explore My Work <Folder size={18} />
                  </button>
                  <a href="/devendra_dhakad_resume.pdf" download className="px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 hover:shadow-md hover:-translate-y-1 transition-all flex items-center gap-2">
                    Download Resume <Download size={18} />
                  </a>

                  
                </div>

                <div className="mt-10 flex items-center justify-center gap-6 text-slate-400">
                   <a href="https://github.com/devdhkd7247" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 hover:scale-110 transition-all"><Github size={24} /></a>
                   <a href="https://www.linkedin.com/in/devendra-dhakad-aba87b241" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 hover:scale-110 transition-all"><Linkedin size={24} /></a>
                   <a href="mailto:devendradhakad876@gmail.com" className="hover:text-red-600 hover:scale-110 transition-all"><Mail size={24} /></a>
                </div>
             </div>
           </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-20 bg-white relative">
           <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
            <SectionTitle title="About Me" />
            
            {/* Bio Text */}
            <div className="text-center mb-8">
               <p className="text-xl md:text-2xl text-slate-700 leading-relaxed font-light">
                 I am an <strong className="text-slate-900 font-bold">M.Tech student at IIT Kharagpur</strong> with expertise in <strong className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-purple-600 font-bold">AI/ML</strong> and <strong className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-purple-600 font-bold">Agentic AI</strong>, passionate about leveraging technology to solve real-world problems.
               </p>
            </div>
           </div>
        </section>

        {/* EXPERIENCE / JOURNEY */}
        <section id="journey" className="py-20 bg-white relative">
           <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle title="My Journey" />
            <div className="flex flex-col gap-4 items-center">
                <JourneyCard 
                  year="2024 - 2026"
                  title="M.Tech in Food Process Engineering"
                  subtitle="IIT Kharagpur"
                  gpa="CGPA: 8.10/10"
                  icon={GraduationCap}
                />
                <JourneyCard 
                  year="2020 - 2024"
                  title="B.Tech"
                  subtitle="JNKVV Jabalpur"
                  gpa="CGPA: 8.06/10"
                  icon={GraduationCap}
                />
                <JourneyCard 
                  year="2019"
                  title="High School Certificate"
                  gpa="72.8%"
                  icon={Briefcase} 
                />
                <JourneyCard 
                  year="2017"
                  title="Senior School Certificate"
                  gpa="8.0/10"
                  icon={Briefcase} 
                />
            </div>
           </div>
        </section>

        {/* AWARDS & ACHIEVEMENTS SECTION */}
        <section id="achievements" className="py-20 bg-white relative">
           <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle title="Awards & Certifications" subtitle="Recognitions of my academic excellence and continuous learning journey." />
            
            <div className="flex flex-col gap-12 items-center">
               
               {/* Compact Key Achievement Card (Full Width but compact height) */}
               <div className="bg-white rounded-xl p-3 border border-slate-100 shadow-sm w-full hover:shadow-md transition-all flex items-center gap-6 max-w-4xl">
                  <div className="w-16 h-16 rounded-lg bg-yellow-50 flex items-center justify-center text-yellow-500 shrink-0">
                       <Trophy size={28} />
                  </div>
                  <div className="flex-1 pr-4">
                       <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Key Achievement</span>
                       <div className="flex items-center justify-between flex-wrap gap-4">
                         <h3 className="text-lg font-bold text-slate-900">GATE 2024 Qualified</h3>
                         <span className="text-sm font-extrabold text-slate-900 bg-yellow-100 px-3 py-1 rounded-md text-yellow-800">AIR 53</span>
                       </div>
                       <p className="text-sm text-slate-500 mt-1">Graduate Aptitude Test in Engineering</p>
                  </div>
               </div>

               {/* Certifications Grid */}
               <div className="w-full max-w-4xl">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center mb-6">
                    Certifications
                  </h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                     <CertificationCard 
                       title="Supervised Machine Learning" 
                       provider="DeepLearning.AI" 
                       icon={Brain} 
                     />
                     <CertificationCard 
                       title="RAG using LangChain" 
                       provider="Udemy" 
                       icon={Link} 
                     />
                     <CertificationCard 
                       title="Excel Basics for Data Analysis" 
                       provider="IBM" 
                       icon={Table} 
                     />
                     <CertificationCard 
                       title="SQL for Data Science" 
                       provider="UC Davis" 
                       icon={Database} 
                     />
                     <CertificationCard 
                       title="Power BI Workshop" 
                       provider="Office Master" 
                       icon={Layout} 
                     />
                  </div>
               </div>
            </div>
           </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="py-20 bg-white relative">
           <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle title="My Projects" subtitle="A showcase of my recent work in Generative AI and Computer Vision." />
            
            {/* Single column layout for horizontal cards */}
            <div className="flex flex-col gap-6 items-center">
              <ProjectCard 
                title="Multimodal RAG System"
                role="Course Project"
                period="Mar '25"
                type="GenAI"
                imageUrl="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80"
                description="RAG system capable of reasoning over text, images, and graphs from complex PDF documents. Integrated Google Gemini API with LangChain."
                tech={['LangChain', 'Gemini', 'FAISS', 'Streamlit']}
                repoLink="https://github.com/devdhkd7247/multimodal-rag-project"
              />
              <ProjectCard 
                title="Nutritional Analysis AI"
                role="Term Project"
                period="Dec '24"
                type="Big Data"
                imageUrl="https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80"
                description="Processed 3.7M+ food records using PySpark. Built Random Forest models (85% acc) and implemented multi-agent orchestration for diet recommendations."
                tech={['PySpark', 'CrewAI', 'Random Forest', 'React']}
                repoLink="https://github.com/devdhkd7247/Nutriscore_prediction"
              />
              <ProjectCard 
                title="Agentic Drug Analysis"
                role="Term Project"
                period="Jun '25"
                type="Agentic AI"
                imageUrl="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
                description="Agentic RAG framework with LangGraph to analyze drug interactions. Designed planner-tool workflow for validation and clinical safety."
                tech={['LangGraph', 'Ollama', 'ChromaDB']}
                repoLink="https://github.com/devdhkd7247/Medicine_interaction_rag"
              />
              <ProjectCard 
                title="Mushroom Vision ID"
                role="Internship"
                period="Aug '25"
                type="Computer Vision"
                imageUrl="https://cdn.britannica.com/95/171295-050-9276BCB0/Panther-cap-mushrooms-death-mushroom-panther.jpg"
                description="Web app classifying mushroom species using Inception V3 & DenseNet121. Integrated GPT-2 for generating real-time biological descriptions."
                tech={['CNN', 'OpenCV', 'Flask', 'GPT-2']}
                repoLink="https://github.com/devdhkd7247/mushroom-species-prediction"
              />
            </div>
           </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="py-20 bg-white relative">
           <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
            <SectionTitle title="Technical Skills" />
            
            <div className="w-full">
               <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                  <SkillCard name="Agentic AI" icon={BrainCircuit} customColor="text-purple-600" />
                  <SkillCard name="LangChain" iconUrl="https://cdn.simpleicons.org/langchain" />
                  <SkillCard name="CrewAI" icon={Bot} customColor="text-indigo-500" />
                  <SkillCard name="PyTorch" iconUrl="https://cdn.simpleicons.org/pytorch/EE4C2C" />
                  <SkillCard name="TensorFlow" iconUrl="https://cdn.simpleicons.org/tensorflow/FF6F00" />
                  <SkillCard name="Ollama" icon={MessageSquare} customColor="text-slate-700" />
                  <SkillCard name="HTML 5" iconUrl="https://cdn.simpleicons.org/html5/E34F26" />
                  <SkillCard name="MySQL" iconUrl="https://cdn.simpleicons.org/mysql/4479A1" />
                  <SkillCard name="Flask" iconUrl="https://cdn.simpleicons.org/flask/000000" />
                  <SkillCard name="Python" iconUrl="https://cdn.simpleicons.org/python/3776AB" />
                  <SkillCard name="Power BI" iconUrl="https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg" />
                  <SkillCard name="Docker" iconUrl="https://cdn.simpleicons.org/docker/2496ED" />
                  <SkillCard name="Git" iconUrl="https://cdn.simpleicons.org/git/F05032" />
               </div>
            </div>
           </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-20 bg-white relative overflow-hidden">
           {/* Background Elements */}
           <div className="absolute top-10 left-10 animate-bounce delay-1000 opacity-5 pointer-events-none">
              <Mail size={50} className="text-cyan-500" />
           </div>
           <div className="absolute bottom-20 right-10 animate-bounce delay-500 opacity-5 pointer-events-none">
              <MessageSquare size={60} className="text-purple-500" />
           </div>

           <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <SectionTitle title="Get In Touch" subtitle="Feel free to reach out if you have any questions or want to work together." />
            
            <div className="grid md:grid-cols-2 gap-8 items-start">
               {/* Contact Info Column */}
               <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 h-full">
                   <h3 className="text-xl font-bold text-slate-900 mb-6">Contact Information</h3>
                   <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                     I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
                   </p>
                   
                   <div className="space-y-5">
                     <ContactItem 
                        icon={Phone} 
                        label="Phone" 
                        value="7247482829" 
                        type="phone" 
                        onCopy={handleCopy} 
                        copied={copiedField === 'phone'} 
                     />
                     <ContactItem 
                        icon={Mail} 
                        label="Email" 
                        value="devendradhakad876@gmail.com" 
                        type="email" 
                        onCopy={handleCopy} 
                        copied={copiedField === 'email'} 
                     />
                     <div className="w-full flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                          <MapPin size={18} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Location</p>
                          <p className="text-slate-900 font-medium text-sm">Kharagpur, West Bengal</p>
                        </div>
                     </div>
                   </div>
               </div>

                 {/* Send Message Column */}
               <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xl">
                 <h3 className="text-xl font-bold text-slate-900 mb-6">Send me a message</h3>
                 <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Name</label>
                        <input name="name" type="text" required className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 focus:bg-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all" placeholder="Your Name" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email</label>
                        <input name="email" type="email" required className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 focus:bg-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all" placeholder="Your Email" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Message</label>
                        <textarea name="message" rows="4" required className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 focus:bg-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all resize-none" placeholder="Your Message"></textarea>
                      </div>
                    </div>
                    <button 
                      type="submit" 
                      disabled={formStatus !== 'idle'}
                      className={`w-full py-3.5 rounded-lg font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 mt-2 ${
                        formStatus === 'success' 
                        ? 'bg-green-500 text-white shadow-lg shadow-green-200' 
                        : 'bg-slate-900 hover:bg-slate-800 text-white shadow-lg hover:-translate-y-0.5'
                      } disabled:opacity-70 disabled:cursor-not-allowed`}
                    >
                      {formStatus === 'idle' && <><Send size={18} /> Send Message</>}
                      {formStatus === 'sending' && <><Loader2 size={18} className="animate-spin" /> Sending...</>}
                      {formStatus === 'success' && <><Check size={18} /> Message Sent!</>}
                    </button>
                 </form>
               </div>
            </div>

            <div className="mt-16 border-t border-slate-100 pt-8 text-center">
              <p className="text-slate-400 text-sm">© {new Date().getFullYear()} Devendra Dhakad.</p>
            </div>
           </div>
        </section>
      </main>
    </div>
  );
}