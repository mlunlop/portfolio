import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, ArrowDown } from 'lucide-react';
import { getPortfolioData } from '../data/portfolioData';
import { useLanguage } from '../context/useLanguage';
import { TRANSLATIONS } from '../data/translations';
import { copyToClipboard } from '../utils/feedback';
import { GithubIcon, LinkedinIcon, KaggleIcon } from './Icons';
import { staggerContainer, fadeUp, scaleReveal, tactileButton } from '../utils/motion';
import profilePhoto from '../assets/profile.webp';
import FoldText from './FoldText';
import GradientWaves from './GradientWaves';
import ProfileCard from './ProfileCard';

export function Hero({ isLoaded = false }: { isLoaded?: boolean }) {
  const [copied, setCopied] = useState(false);
  const { language } = useLanguage();
  const data = getPortfolioData(language);
  const t = TRANSLATIONS[language].hero;

  const handleCopy = async () => {
    const success = await copyToClipboard(data.personal.email);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section id="hero" className="relative pt-24 pb-20 md:pt-36 md:pb-32 overflow-hidden bg-zinc-950">
      {/* Apple-style Interactive Fluid Gradient Waves Background */}
      <div className="absolute inset-0 overflow-hidden">
        <GradientWaves
          horizonColor="#321306"
          waveColor="#d96b27"
          crestColor="#ffe2cc"
          speed={0.24}
          amplitude={2.2}
          relief={0.85}
          lightAngle={120}
          mouseInteraction
          swellOnClick
          lightMode={false}
          waveScale={0.55}
          waveRatio={0.9}
          swell={35}
          turbulence={18}
          tilt={62}
          zoom={1}
          height={5.2}
          fogDepth={18}
          sheen={0.3}
          brightness={0.95}
          opacity={0.8}
          grain={0.06}
          quality="high"
          intro
          parallaxStrength={0.4}
          mouseStrength={0.5}
          paused={false}
          className="w-full h-full"
        />

        {/* Apple-style atmospheric gradients for contrast, text readability & seamless transitions */}
        {/* Soft dark vignette on the left to ensure the typography remains razor-sharp and legible */}
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-zinc-950/30 to-transparent pointer-events-none" />

        {/* Top subtle fade from header */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-zinc-950/70 to-transparent pointer-events-none" />

        {/* Bottom seamless blend into the next section */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Main 2-Column Hero: Typography & Editorial Portrait */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center mb-12">
          
          {/* Left Column: Massive Editorial Typography & Narrative (7 cols) */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6"
          >

            {/* Massive Heading with FoldText (Paper Unfolding) */}
            <motion.div variants={fadeUp} className="space-y-3 sm:space-y-4">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-normal tracking-[0.015em] text-zinc-100 font-display uppercase leading-[1.14] select-none [word-spacing:0.08em]">
                <FoldText
                  key={isLoaded ? 'loaded' : 'preloading'}
                  text={data.personal.name}
                  splitBy="word"
                  hinge="top"
                  foldStyle="paper"
                  trigger="mount"
                  triggerWhen={isLoaded}
                  delay={140}
                  duration={0.9}
                  stagger={0.08}
                  foldAngle={85}
                  creaseShading={0.32}
                  hoverRefold={true}
                  refoldRadius={150}
                  refoldAngle={16}
                  fontWeight={400}
                  letterSpacing="0.015em"
                  wordSpacing="0.08em"
                  lineHeight={1.14}
                  className="font-display uppercase text-zinc-100 font-normal leading-[1.14] tracking-[0.015em] [word-spacing:0.08em]"
                />
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl font-display uppercase text-zinc-400 tracking-tight">
                {t.role}
              </p>
            </motion.div>

            {/* Bio with Inter body font */}
            <motion.p
              variants={fadeUp}
              className="text-base sm:text-lg text-zinc-300 font-body leading-relaxed max-w-xl font-normal"
            >
              {t.bioPart1}{' '}
              <strong className="text-zinc-100 font-semibold">
                {t.bioHighlight}
              </strong>
              {t.bioPart2}
            </motion.p>



            {/* Action Buttons */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 pt-3">
              {/* Copy Email CTA */}
              <motion.button
                onClick={handleCopy}
                {...tactileButton}
                className="group relative flex items-center gap-2.5 px-5 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-zinc-950 font-semibold text-sm transition-colors duration-200 shadow-xl shadow-orange-500/20 cursor-pointer font-body"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-zinc-950 stroke-[2.5]" />
                    <span>{t.copiedEmail}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-zinc-950 stroke-[2.5] group-hover:rotate-6 transition-transform" />
                    <span>{t.copyEmail}</span>
                  </>
                )}
              </motion.button>

              {/* LinkedIn */}
              <motion.a
                href={data.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -1.5 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-2 px-4 py-3.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800/90 border border-zinc-800 hover:border-zinc-700 text-zinc-200 text-sm font-medium backdrop-blur-md transition-colors font-body shadow-lg shadow-black/20"
              >
                <LinkedinIcon className="w-4 h-4 text-sky-400" />
                <span>{t.social.linkedin}</span>
              </motion.a>

              {/* GitHub */}
              <motion.a
                href={data.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -1.5 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-2 px-4 py-3.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800/90 border border-zinc-800 hover:border-zinc-700 text-zinc-200 text-sm font-medium backdrop-blur-md transition-colors font-body shadow-lg shadow-black/20"
              >
                <GithubIcon className="w-4 h-4 text-zinc-300" />
                <span>{t.social.github}</span>
              </motion.a>

              {/* Kaggle */}
              <motion.a
                href={data.personal.kaggle}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -1.5 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-2 px-4 py-3.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800/90 border border-zinc-800 hover:border-zinc-700 text-zinc-200 text-sm font-medium backdrop-blur-md transition-colors font-body shadow-lg shadow-black/20"
              >
                <KaggleIcon className="w-4 h-4 text-cyan-400" />
                <span>{t.social.kaggle}</span>
              </motion.a>
            </motion.div>

          </motion.div>

          {/* Right Column: ProfileCard (Tactile Apple HIG aesthetic) */}
          <motion.div
            variants={scaleReveal}
            initial="hidden"
            animate="visible"
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-sm sm:max-w-md flex justify-center">
              <ProfileCard
                avatarUrl={profilePhoto}
                name={data.personal.name}
                title={t.role}
                showUserInfo={false}
                theme="dark"
                radius={24}
                holo={0.08}
                glare={0.25}
                tiltStrength={4}
                parallax={5}
                backdropOpacity={0.3}
                enableTilt={true}
                className="w-full max-w-[340px]"
              />
            </div>
          </motion.div>

        </div>

        {/* Scroll anchor */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="flex justify-center pt-4"
        >
          <a
            href="#experiencia"
            className="group inline-flex items-center gap-2 px-3 py-2 rounded-full bg-zinc-900/70 hover:bg-zinc-800/80 border border-zinc-800/80 hover:border-zinc-700 text-xs font-mono text-zinc-400 hover:text-zinc-200 backdrop-blur-md transition-colors shadow-lg shadow-black/20"
          >
            <ArrowDown className="w-3.5 h-3.5 text-orange-400 group-hover:translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
