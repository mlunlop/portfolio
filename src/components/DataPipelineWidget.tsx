import { useState } from 'react';
import { Database, Filter, FolderTree, Cpu, CheckCircle2 } from 'lucide-react';

interface Stage {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  icon: typeof Database;
  badge: string;
  tools: string[];
  metrics: { label: string; value: string }[];
  terminalLog: string[];
}

const STAGES: Stage[] = [
  {
    id: 'ingest',
    number: '01',
    title: 'Extracción & Ingestión',
    subtitle: 'Consumo de streams, APIs REST y volcados crudos heterogéneos',
    icon: Database,
    badge: 'Raw Ingestion',
    tools: ['Python 3.12', 'Requests / AsyncIO', 'Bash', 'PostgreSQL / APIs'],
    metrics: [
      { label: 'Formato Origen', value: 'JSON / CSV / SQL' },
      { label: 'Validación de esquema', value: 'Pydantic Strict' },
      { label: 'Estrategia', value: 'Chunked Streaming' },
    ],
    terminalLog: [
      '> [INGEST] Conectando a endpoints de datos y almacenamiento de objetos...',
      '> [INGEST] Descargando 2.4GB en streams de 64MB para evitar overflow de RAM.',
      '> [SCHEMA] Validando tipos de datos y firmas de columnas. Integridad: 100%.',
      '> [STATUS] 480,240 registros en cola para el pipeline de transformación.',
    ],
  },
  {
    id: 'transform',
    number: '02',
    title: 'Limpieza & ETL Riguroso',
    subtitle: 'Imputación de nulos, detección de outliers y normalización',
    icon: Filter,
    badge: 'ETL Pipeline',
    tools: ['Pandas', 'NumPy', 'Scikit-learn Preprocessing'],
    metrics: [
      { label: 'Nulos tratados', value: '14,210 imputados' },
      { label: 'Outliers detectados', value: 'IQR Multi-variante' },
      { label: 'Consistencia', value: 'Tipado estricto' },
    ],
    terminalLog: [
      '> [CLEAN] Analizando dispersión y valores nulos por feature.',
      '> [IMPUTE] Aplicando mediana robusta en variables continuas y moda en categóricas.',
      '> [OUTLIER] Filtrado de registros anómalos mediante rango intercuartílico (IQR).',
      '> [ENCODE] One-Hot & Target Encoding para preparación numérica del modelo.',
    ],
  },
  {
    id: 'partition',
    number: '03',
    title: 'Particionamiento & Almacenamiento',
    subtitle: 'Optimización de I/O mediante particionado por fecha y Parquet',
    icon: FolderTree,
    badge: 'Data Partitioning',
    tools: ['Apache Parquet', 'PyArrow', 'DuckDB', 'Linux I/O'],
    metrics: [
      { label: 'Estructura', value: 'year=YYYY/month=MM/' },
      { label: 'Compresión', value: 'Snappy (72% ahorro)' },
      { label: 'Lectura I/O', value: 'Columnar Zero-Copy' },
    ],
    terminalLog: [
      '> [PARTITION] Creando jerarquía de directorios particionados por dimensión temporal.',
      '> [CONVERT] Serializando DataFrames a ficheros binarios Apache Parquet.',
      '> [BENCHMARK] Reducción de tiempo de lectura de 4.2s a 0.28s en queries analíticas.',
      '> [STORAGE] Guardado estructurado listo para pipelines de entrenamiento distribuido.',
    ],
  },
  {
    id: 'ml',
    number: '04',
    title: 'Entrenamiento & Evaluación ML',
    subtitle: 'Validación cruzada, tracking de métricas y exportación de pesos',
    icon: Cpu,
    badge: 'Model Training',
    tools: ['PyTorch', 'Scikit-learn', 'Cross-Validation', 'Metrics F1/Loss'],
    metrics: [
      { label: 'Split Dataset', value: '70% Train / 15% Val / 15% Test' },
      { label: 'Métrica Clave', value: 'F1-Score: 0.94 / Loss: 0.082' },
      { label: 'Inferencia', value: 'ONNX / TorchScript' },
    ],
    terminalLog: [
      '> [DATA_SPLIT] Particionado estratificado para garantizar balance de clases.',
      '> [TRAIN] Iniciando bucle de entrenamiento (Epochs: 40 | Batch size: 64).',
      '> [LOSS] Convergencia alcanzada sin sobreajuste (early-stopping activado).',
      '> [EXPORT] Modelo serializado y empaquetado para despliegue en servicio.',
    ],
  },
];

export function DataPipelineWidget() {
  const [activeStageId, setActiveStageId] = useState<string>('partition');
  const currentStage = STAGES.find((s) => s.id === activeStageId) || STAGES[2];

  return (
    <section id="pipeline" className="py-20 border-t border-zinc-800/80 bg-zinc-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-orange-400 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
              <span>CORE ARCHITECTURE // ENFOQUE DE INGENIERÍA</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-zinc-100 font-display uppercase">
              Ciclo de Vida del Dato
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md">
            Un modelo de Machine Learning es tan bueno como la calidad de su pipeline. Así estructuro el flujo desde la ingestión hasta el entrenamiento.
          </p>
        </div>

        {/* Pipeline Navigation Steps */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {STAGES.map((stage) => {
            const Icon = stage.icon;
            const isActive = stage.id === activeStageId;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStageId(stage.id)}
                className={`text-left p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
                  isActive
                    ? 'bg-zinc-900 border-orange-500/80 shadow-lg shadow-orange-500/10'
                    : 'bg-zinc-900/40 border-zinc-800/80 hover:bg-zinc-900 hover:border-zinc-700 text-zinc-400'
                }`}
              >
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-orange-500" />
                )}
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-mono text-xs font-bold ${isActive ? 'text-orange-400' : 'text-zinc-500'}`}>
                    {stage.number}
                  </span>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-orange-400' : 'text-zinc-500'}`} />
                </div>
                <div className={`text-sm font-normal tracking-tight mb-1 font-display ${isActive ? 'text-zinc-100' : 'text-zinc-300'}`}>
                  {stage.title}
                </div>
                <div className="text-[11px] text-zinc-500 line-clamp-1">
                  {stage.badge}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Stage Inspector (Terminal + Engineering Card) */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 md:p-8 backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left detail column */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="inline-block px-2.5 py-1 rounded bg-orange-500/10 border border-orange-500/30 text-orange-400 font-mono text-xs font-semibold mb-3">
                  Etapa {currentStage.number} • {currentStage.badge}
                </span>
                <h3 className="text-xl sm:text-2xl font-normal text-zinc-100 font-display tracking-tight mb-2">
                  {currentStage.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {currentStage.subtitle}
                </p>
              </div>

              {/* Metrics */}
              <div className="space-y-2.5 pt-2 border-t border-zinc-800">
                <span className="font-mono text-[11px] text-zinc-500 uppercase tracking-wider block">
                  Parámetros de ejecución
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentStage.metrics.map((metric, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-zinc-950/60 border border-zinc-800/80">
                      <div className="text-[11px] text-zinc-500">{metric.label}</div>
                      <div className="text-xs font-mono font-semibold text-zinc-200 mt-0.5">{metric.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools Chips */}
              <div>
                <span className="font-mono text-[11px] text-zinc-500 uppercase tracking-wider block mb-2">
                  Herramientas & Librerías
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentStage.tools.map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-zinc-800/80 text-zinc-300 font-mono text-xs border border-zinc-700/60"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right terminal simulation */}
            <div className="lg:col-span-7">
              <div className="rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-2xl">
                {/* Terminal topbar */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900 border-b border-zinc-800 text-xs font-mono text-zinc-400">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    <span className="text-zinc-500 ml-2">pipeline_runner.py --stage {currentStage.id}</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono hidden sm:inline">RAM: 412MB // 120 FPS</span>
                </div>

                {/* Terminal content */}
                <div className="p-5 font-mono text-xs space-y-2.5 leading-relaxed overflow-x-auto text-zinc-300">
                  <div className="text-zinc-600">// [DEBUG] Lifecycle Stage: {currentStage.title}</div>
                  {currentStage.terminalLog.map((line, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400 select-none">➜</span>
                      <span className="text-zinc-300">{line}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 text-orange-400 pt-2 border-t border-zinc-900">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-semibold">STAGE_STATUS: VERIFICADO_OK // SIN FUGAS DE MEMORIA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
