import { motion, AnimatePresence } from 'framer-motion';
import ImageGrid from '../components/ImageGrid';
import ColorHistogram from '../components/ColorHistogram';
import MetricsPanel from '../components/MetricsPanel';
import VADMeter from '../components/VADMeter';
import SemioticMap from '../components/SemioticMap';
import { ArrowLeft } from '@phosphor-icons/react';

export default function AnalysisPage({ result, onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-zinc-50"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-8">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <p className="text-xs font-medium tracking-widest uppercase text-indigo-500 mb-1">
              Resultados del Análisis
            </p>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
              Arteterapia PDI
            </h1>
          </div>
          <motion.button
            onClick={onReset}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            className="btn-ghost"
          >
            <ArrowLeft size={18} weight="duotone" />
            Nueva imagen
          </motion.button>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key="done"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5"
          >
            <div className="flex flex-col gap-5">
              <ImageGrid images={result.images} />
              <ColorHistogram histogram={result.histogram} />
            </div>
            <div className="flex flex-col gap-5">
              <MetricsPanel
                result={result}
                colorDistribution={result.color_distribution}
                strokeMetrics={result.stroke_metrics}
                analysisId={result.analysis_id}
              />
              <VADMeter vad={result.enriched_features?.computational_vad} />
              <SemioticMap semioticMass={result.enriched_features?.semiotic_mass} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}