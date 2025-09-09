import React, { useState } from 'react';
// FIX: Import `Variants` and `AnimatePresence` types from framer-motion to correctly type animation variants.
import { motion, Variants, AnimatePresence } from 'framer-motion';

// --- Componente: MotionSection ---
interface MotionSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}
const MotionSection: React.FC<MotionSectionProps> = ({ children, className, id }) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.section>
  );
};


// --- Componente: VisualizacionAEO ---
const dataNodes = [
  { cx: 80, cy: 100, label: 'Artículo' },
  { cx: 420, cy: 120, label: 'Ponencia' },
  { cx: 150, cy: 320, label: 'LinkedIn' },
  { cx: 380, cy: 300, label: 'Mención Prensa' },
  { cx: 50, cy: 250, label: 'Web' },
  { cx: 450, cy: 220, label: 'Podcast' },
];
const centralNode = { cx: 250, cy: 200, r: 85 };
// FIX: Explicitly type svgVariants with the `Variants` type for type safety and consistency.
const svgVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};
// FIX: Explicitly type itemVariants with the `Variants` type to resolve the error where 'ease' was inferred as a generic string.
const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' }
  },
};
// FIX: Explicitly type lineVariants with the `Variants` type to resolve the error where 'ease' was inferred as a generic string.
const lineVariants: Variants = {
    hidden: { pathLength: 0 },
    visible: {
        pathLength: 1,
        transition: { duration: 1, ease: "easeInOut" }
    }
};
const VisualizacionAEO: React.FC = () => {
  return (
    <div className="my-12 flex h-auto min-h-[400px] w-full items-center justify-center p-4 md:min-h-[450px]">
      <motion.svg
        viewBox="0 0 500 400"
        className="w-full max-w-2xl"
        aria-labelledby="graphTitle graphDesc"
        role="img"
        variants={svgVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <title id="graphTitle">Visualización de Grafo de Conocimiento</title>
        <desc id="graphDesc">Un gráfico que muestra cómo diversas fuentes de datos como artículos y perfiles de LinkedIn se conectan a una entidad central de autoridad.</desc>
        <g>
          {dataNodes.map((node, index) => (
            <motion.path
              key={`line-${index}`}
              d={`M ${node.cx} ${node.cy} L ${centralNode.cx} ${centralNode.cy}`}
              stroke="url(#lineGradient)"
              strokeWidth="1.5"
              variants={lineVariants}
            />
          ))}
        </g>
        <g>
          {dataNodes.map((node, index) => (
            <motion.g key={`node-${index}`} variants={itemVariants}>
              <circle cx={node.cx} cy={node.cy} r="10" className="fill-slate-600" />
              <text
                x={node.cx}
                y={node.cy}
                dy={25}
                textAnchor="middle"
                className="fill-slate-400 text-[12px] font-medium"
              >
                {node.label}
              </text>
            </motion.g>
          ))}
        </g>
        <motion.g variants={itemVariants}>
          <motion.circle
            cx={centralNode.cx}
            cy={centralNode.cy}
            r={centralNode.r}
            className="fill-emerald-500/10 stroke-emerald-400"
            strokeWidth="2"
            animate={{
              scale: [1, 1.03, 1],
              transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
            }}
          />
           <motion.circle
            cx={centralNode.cx}
            cy={centralNode.cy}
            r={centralNode.r}
            className="fill-transparent stroke-emerald-400/30"
            strokeWidth="8"
             animate={{
              scale: [1, 1.08, 1],
              opacity: [0, 0.5, 0],
              transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
            }}
          />
          <text
            x={centralNode.cx}
            y={centralNode.cy - 10}
            textAnchor="middle"
            className="fill-slate-100 text-xl font-bold tracking-tight"
          >
            TÚ:
          </text>
          <text
            x={centralNode.cx}
            y={centralNode.cy + 15}
            textAnchor="middle"
            className="fill-emerald-300 text-lg font-semibold tracking-wide"
          >
            Autoridad Central
          </text>
        </motion.g>
        <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#34d399" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#34d399" stopOpacity="1" />
            </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
};


// --- Componente: ComparativaSeoAeo ---
const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
);
const BotIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c.251.023.501.05.75.082a9.75 9.75 0 014.5 1.632M9.75 3.104a6.375 6.375 0 00-3.16-1.54M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const ComparativaSeoAeo: React.FC = () => {
  return (
    <div className="relative my-12">
      <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2 md:gap-4 lg:gap-8">
        <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-6 shadow-lg">
          <h3 className="mb-4 text-center text-2xl font-bold text-slate-300">Antes: <span className="text-red-400">SEO Tradicional</span></h3>
          <div className="mt-6 space-y-5 rounded-lg bg-slate-900 p-4">
              <h4 className="text-lg font-semibold text-slate-200">Resultados de Búsqueda</h4>
              <div className="space-y-6">
                {Array(4).fill(0).map((_, i) => (
                    <div key={i}>
                        <h5 className="truncate text-blue-400 hover:underline">Los 10 mejores ingenieros agrícolas de Colombia...</h5>
                        <p className="text-sm text-green-500">www.lista-generica.com/blog/mejores-ingenieros</p>
                        <p className="mt-1 text-sm text-slate-400">Descubre nuestro ranking de profesionales destacados. Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                    </div>
                ))}
              </div>
          </div>
          <p className="mt-4 text-center text-sm text-slate-500">Eres solo un enlace más en una lista competitiva.</p>
        </div>
        <div className="rounded-xl border-2 border-emerald-500 bg-slate-800/50 p-6 shadow-2xl shadow-emerald-500/10">
          <h3 className="mb-4 text-center text-2xl font-bold text-slate-300">Después: <span className="bg-gradient-to-r from-emerald-400 to-indigo-400 bg-clip-text text-transparent">Respuesta de IA</span></h3>
          <div className="mt-6 space-y-5 rounded-lg bg-slate-900 p-4">
            <div className="flex items-start gap-3">
              <UserIcon />
              <div className="flex-1">
                <p className="font-semibold text-slate-300">Usuario</p>
                <p className="text-slate-200">"¿Cuál es el ingeniero agrícola más innovador de Colombia?"</p>
              </div>
            </div>
            <div className="my-4 border-t border-slate-700"></div>
            <div className="flex items-start gap-3">
              <BotIcon />
              <div className="flex-1">
                <p className="font-semibold text-emerald-400">Respuesta de IA</p>
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-2 flex items-start gap-4 rounded-lg border border-slate-700 bg-slate-800 p-4"
                >
                    <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-slate-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <div>
                        <h5 className="font-bold text-slate-100">Juan Pérez</h5>
                        <p className="text-sm font-medium text-emerald-400">Ingeniero Agrónomo | Experto en Cultivos Sostenibles</p>
                        <p className="mt-1 text-sm text-slate-300">Reconocido por su trabajo pionero en agricultura vertical y optimización de recursos hídricos en la región Andina.</p>
                    </div>
                </motion.div>
              </div>
            </div>
          </div>
           <p className="mt-4 text-center text-sm text-slate-500">Dejas de ser un resultado. <span className="font-semibold text-emerald-400">Te conviertes en LA RESPUESTA.</span></p>
        </div>
      </div>
    </div>
  );
};

// --- Componente: InteractiveDemo ---
const SearchIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);
const LoadingSpinner: React.FC = () => (
    <div className="flex items-center justify-center space-x-2">
        <motion.div 
            className="h-3 w-3 rounded-full bg-emerald-500"
            animate={{
                y: [0, -8, 0],
                transition: { duration: 0.8, repeat: Infinity, ease: "easeInOut" }
            }}
        />
        <motion.div 
            className="h-3 w-3 rounded-full bg-emerald-500"
            animate={{
                y: [0, -8, 0],
                transition: { duration: 0.8, delay: 0.1, repeat: Infinity, ease: "easeInOut" }
            }}
        />
        <motion.div 
            className="h-3 w-3 rounded-full bg-emerald-500"
            animate={{
                y: [0, -8, 0],
                transition: { duration: 0.8, delay: 0.2, repeat: Infinity, ease: "easeInOut" }
            }}
        />
    </div>
);
const ResultCard: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.9, y: -20 }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
    className="mt-8"
  >
    <p className="mb-4 text-sm font-semibold text-emerald-400"><BotIcon /> Respuesta Directa de IA:</p>
    <div className="flex items-start gap-4 rounded-lg border border-emerald-500/30 bg-slate-800 p-4 shadow-lg shadow-emerald-500/10">
        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-slate-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        </div>
        <div>
            <h5 className="font-bold text-slate-100">Juan Pérez</h5>
            <p className="text-sm font-medium text-emerald-400">Ingeniero Agrónomo | Experto en Cultivos Sostenibles</p>
            <p className="mt-1 text-sm text-slate-300">Reconocido por su trabajo pionero en agricultura vertical y optimización de recursos hídricos en la región Andina.</p>
        </div>
    </div>
  </motion.div>
);
const InteractiveDemo: React.FC = () => {
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setIsSubmitted(true);
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    };

    return (
        <div className="mx-auto max-w-3xl rounded-2xl border border-slate-800 bg-slate-900/50 p-6 text-center shadow-2xl md:p-10">
            <h2 className="text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl">
                Experimenta el <span className="text-emerald-400">Futuro</span>
            </h2>
            <p className="mt-4 text-lg text-slate-400">
                Haz una pregunta. Observa cómo dejamos de buscar en listas y empezamos a entregar respuestas directas y con autoridad.
            </p>

            <form onSubmit={handleSearch} className="relative mx-auto mt-8 max-w-xl">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ej: “¿Cuál es el ingeniero agrícola más innovador de Colombia?”"
                    className="w-full rounded-full border-2 border-slate-700 bg-slate-800 py-4 pl-6 pr-20 text-white placeholder-slate-500 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-0"
                />
                <button
                    type="submit"
                    className="absolute inset-y-0 right-0 m-1.5 flex items-center justify-center rounded-full bg-emerald-500 px-5 font-semibold text-white transition-all hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50"
                    disabled={isLoading || !query.trim()}
                >
                    <SearchIcon className="h-5 w-5" />
                </button>
            </form>

            <div className="mt-6 min-h-[150px]">
                <AnimatePresence mode="wait">
                    {isSubmitted && isLoading && (
                         <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <LoadingSpinner />
                         </motion.div>
                    )}
                    {isSubmitted && !isLoading && (
                        <ResultCard key="result" />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

const CheckIcon: React.FC = () => (
    <svg className="h-6 w-6 flex-shrink-0 text-emerald-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
);


// --- Componente Principal: App (Landing Page) ---
const App: React.FC = () => {
  const handleScrollToForm = () => {
    const formSection = document.getElementById('form-section');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <div className="bg-slate-900 text-slate-200 antialiased">
        <main className="overflow-x-hidden">
        {/* 1. Hero Section */}
        <MotionSection className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 text-center">
            <div className="absolute inset-0 -z-10 bg-grid-slate-700/[0.1]"></div>
            <div className="absolute inset-0 -z-20 bg-slate-900 [mask-image:radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,255,255,0.7),rgba(255,255,255,0))]"></div>

            <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-slate-100 md:text-7xl">
            Deja de competir por el #1.{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-indigo-400 bg-clip-text text-transparent">
                Conviértete en LA RESPUESTA.
            </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-400">
            Usamos Inteligencia Artificial para posicionarte como la autoridad definitiva en tu campo. Cuando alguien pregunte por el mejor, la IA responderá con tu nombre.
            </p>
            <motion.button
            onClick={handleScrollToForm}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 rounded-full bg-emerald-500 px-8 py-3 text-lg font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
            Solicitar Acceso Anticipado
            </motion.button>
        </MotionSection>

        {/* 2. Comparativa Visual Section */}
        <MotionSection className="container mx-auto px-4 py-16 md:py-24">
            <ComparativaSeoAeo />
        </MotionSection>

        {/* 3. Solución Section */}
        <MotionSection className="container mx-auto max-w-4xl px-4 py-16 text-center md:py-24">
            <h2 className="text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl">
            De Datos a Autoridad. Tu Viaje para ser la Respuesta.
            </h2>
            <div className="mt-12 space-y-8 text-left text-lg text-slate-300">
            <p>
                Tu expertise está ahí fuera: en tus artículos, tu perfil de LinkedIn, las ponencias que has dado y las menciones en prensa. Pero para la IA, son solo datos dispersos y desconectados. Ruido en un universo de información.
            </p>
            
            <VisualizacionAEO />
            
            <p>
                Nuestra plataforma actúa como un sintetizador de autoridad. Recopilamos y estructuramos tu huella digital, transformando esos datos brutos en un grafo de conocimiento coherente. Le enseñamos a la IA no solo quién eres, sino por qué eres relevante.
            </p>
            <blockquote className="rounded-lg border-l-4 border-emerald-500 bg-slate-800/50 p-6 italic text-slate-200 shadow-inner">
                El resultado es que dejas de ser un enlace azul más. Te conviertes en una entidad de autoridad. Cuando alguien haga la pregunta clave en tu sector, la IA no buscará una respuesta, porque ya la tendrá: tú.
            </blockquote>
            </div>
        </MotionSection>

        {/* 4. Prueba Social Section (NUEVA) */}
        <MotionSection className="bg-slate-900/50 py-16 md:py-24">
            <div className="container mx-auto max-w-6xl px-4">
                <h2 className="text-center text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl">
                El Futuro de la Búsqueda no es un Enlace, es una Respuesta
                </h2>
                <motion.div
                className="mt-16 grid gap-8 md:grid-cols-3"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
                >
                <motion.div variants={cardVariants} className="flex flex-col rounded-lg border border-slate-800 bg-slate-800/50 p-8">
                    <blockquote className="flex-grow text-lg text-slate-300">"La gente ya no quiere buscar, quiere saber. El próximo gran salto tecnológico no será indexar la web, sino sintetizarla..."</blockquote>
                    <footer className="mt-6 text-sm font-semibold text-emerald-400">— CEO de una Startup de IA Generativa</footer>
                </motion.div>
                <motion.div variants={cardVariants} className="flex flex-col rounded-lg border border-slate-800 bg-slate-800/50 p-8">
                    <blockquote className="flex-grow text-lg text-slate-300">"El SEO como lo conocemos está muriendo. La nueva moneda de cambio es la 'autoridad verificable'..."</blockquote>
                    <footer className="mt-6 text-sm font-semibold text-emerald-400">— Autor de 'Marketing Cuántico'</footer>
                </motion.div>
                <motion.div variants={cardVariants} className="flex flex-col rounded-lg border border-slate-800 bg-slate-800/50 p-8">
                    <blockquote className="flex-grow text-lg text-slate-300">"En mi campo, no basta con ser bueno; tienes que ser reconocido como el mejor..."</blockquote>
                    <footer className="mt-6 text-sm font-semibold text-emerald-400">— Consultor Senior en Transformación Digital</footer>
                </motion.div>
                </motion.div>
            </div>
        </MotionSection>

        {/* 5. Cómo Funciona Section */}
        <MotionSection className="py-16 md:py-24">
            <div className="container mx-auto max-w-5xl px-4">
            <h2 className="text-center text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl">
                ¿Cómo Funciona?
            </h2>
            <div className="mt-16 grid gap-12 md:grid-cols-3">
                <div className="flex flex-col items-center text-center md:items-start md:text-left">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-2xl font-bold text-white">1</div>
                <h3 className="mt-6 text-2xl font-bold">Análisis de Autoridad</h3>
                <p className="mt-2 text-slate-400">
                    Conectamos y analizamos toda tu presencia digital (publicaciones, perfil, web, menciones) para entender tu núcleo de expertise.
                </p>
                </div>
                <div className="flex flex-col items-center text-center md:items-start md:text-left">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-2xl font-bold text-white">2</div>
                <h3 className="mt-6 text-2xl font-bold">Optimización Semántica</h3>
                <p className="mt-2 text-slate-400">
                    Enriquecemos y estructuramos tus datos para que los LLMs no solo los lean, sino que los comprendan y los validen como conocimiento experto.
                </p>
                </div>
                <div className="flex flex-col items-center text-center md:items-start md:text-left">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-2xl font-bold text-white">3</div>
                <h3 className="mt-6 text-2xl font-bold">Posicionamiento como Entidad</h3>
                <p className="mt-2 text-slate-400">
                    Te establecemos como una 'entidad' reconocida en el grafo de conocimiento de la IA, convirtiéndote en la respuesta lógica y preferida.
                </p>
                </div>
            </div>
            </div>
        </MotionSection>

        {/* 6. Interactive Demo Section */}
        <MotionSection className="container mx-auto px-4 py-16 md:py-24">
            <InteractiveDemo />
        </MotionSection>
        
        {/* 7. Planes Comerciales Section (NUEVA) */}
        <MotionSection className="bg-slate-900/50 py-16 md:py-24">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl">Conviértete en la Autoridad que Ya Eres</h2>
                </div>
                <div className="mt-16 grid items-stretch gap-8 md:grid-cols-3">
                    {/* Plan 1 */}
                    <div className="flex flex-col rounded-2xl border border-slate-700 bg-slate-800/50 p-8">
                        <h3 className="text-2xl font-bold text-slate-100">Profesional Esencial</h3>
                        <ul className="mt-6 flex-grow space-y-4 text-slate-400">
                            <li className="flex items-start"><CheckIcon /><span className="ml-3">Análisis inicial de autoridad digital</span></li>
                            <li className="flex items-start"><CheckIcon /><span className="ml-3">Optimización de 1 perfil clave (ej. LinkedIn)</span></li>
                            <li className="flex items-start"><CheckIcon /><span className="ml-3">Estructuración semántica de contenido principal</span></li>
                        </ul>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-8 w-full rounded-md border border-emerald-500 px-6 py-3 font-semibold text-emerald-400 transition-colors hover:bg-emerald-500 hover:text-white">Unirme a la Lista Beta</motion.button>
                    </div>

                    {/* Plan 2 (Popular) */}
                    <div className="relative flex flex-col rounded-2xl border-2 border-emerald-500 bg-slate-800 p-8 shadow-2xl shadow-emerald-500/10">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 transform rounded-full bg-emerald-500 px-4 py-1 text-sm font-semibold text-white">Más Popular</div>
                        <h3 className="text-2xl font-bold text-slate-100">Marca Líder</h3>
                         <ul className="mt-6 flex-grow space-y-4 text-slate-400">
                            <li className="flex items-start"><CheckIcon /><span className="ml-3">Todo lo del plan Profesional Esencial</span></li>
                            <li className="flex items-start"><CheckIcon /><span className="ml-3">Monitoreo continuo de la entidad</span></li>
                            <li className="flex items-start"><CheckIcon /><span className="ml-3">Optimización de ecosistema digital (web + 2 perfiles)</span></li>
                            <li className="flex items-start"><CheckIcon /><span className="ml-3">Reportes de visibilidad en IA</span></li>
                        </ul>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-8 w-full rounded-md bg-emerald-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-emerald-600">Solicitar Acceso Prioritario</motion.button>
                    </div>

                    {/* Plan 3 */}
                    <div className="flex flex-col rounded-2xl border border-slate-700 bg-slate-800/50 p-8">
                        <h3 className="text-2xl font-bold text-slate-100">Solución Corporativa</h3>
                        <ul className="mt-6 flex-grow space-y-4 text-slate-400">
                            <li className="flex items-start"><CheckIcon /><span className="ml-3">Todo lo del plan Marca Líder</span></li>
                            <li className="flex items-start"><CheckIcon /><span className="ml-3">Optimización para múltiples expertos y ejecutivos</span></li>
                            <li className="flex items-start"><CheckIcon /><span className="ml-3">API de integración de conocimiento</span></li>
                            <li className="flex items-start"><CheckIcon /><span className="ml-3">Soporte técnico y estratégico dedicado</span></li>
                        </ul>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-8 w-full rounded-md border border-slate-500 px-6 py-3 font-semibold text-slate-300 transition-colors hover:bg-slate-700 hover:text-white">Contactar para Demo</motion.button>
                    </div>
                </div>
            </div>
        </MotionSection>

        {/* 8. Formulario de Captura Section */}
        <MotionSection id="form-section" className="py-16 md:py-24">
            <div className="container mx-auto max-w-2xl px-4 text-center">
            <h2 className="text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl">
                El futuro de la reputación digital está aquí. Sé el primero en tenerlo.
            </h2>
            <p className="mt-4 text-lg text-slate-400">
                Estamos dando acceso a un grupo selecto de profesionales y marcas para nuestro programa beta. Deja tus datos y te contactaremos para evaluar si tu perfil califica.
            </p>
            <form className="mt-10 flex flex-col items-center gap-4">
                <input
                type="text"
                placeholder="Tu Nombre"
                className="w-full max-w-md rounded-md border-2 border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-0"
                required
                />
                <input
                type="email"
                placeholder="tu@email.com"
                className="w-full max-w-md rounded-md border-2 border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-0"
                required
                />
                <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full max-w-md rounded-md bg-indigo-600 px-8 py-4 font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                Quiero ser la respuesta #1
                </motion.button>
            </form>
            </div>
        </MotionSection>
        </main>
    </div>
  );
};

export default App;