# Kanban Project Board - PDI Arteterapia

Este documento actúa como la fuente central de verdad para la planificación y el estado del proyecto. Debe ser actualizado regularmente al mover tareas de `TODO` a `IN PROGRESS` y luego a `DONE`.

## 📋 TODO (Por Hacer)

*(Vacío)*

---

## 🏃 IN PROGRESS (En Progreso)

*(Vacío)*

---

## 🔍 REVIEW (En Revisión)

*(Vacío)*

---

## ✅ DONE (Completado)

### [PDI-23] Backend: Integración de Gráficos en Modelo Pydantic
**Tipo:** Feature (Backend)
**Asignado a:** Juan
**Depende de:** PDI-14, PDI-15, PDI-16, PDI-17
**Fase:** BE-Reportes (Didáctica)
**Completado:** 2026-06-10

**Criterios de Aceptación:**
- [x] `EnrichedFeatures` actualizado para incluir los datos necesarios para generar los `Drawing` de `reportlab`.
- [x] Lógica de unión entre `ComputationalVAD` y `SpatialDistribution` en el servicio de reportes.
- [x] Test de integración: `get_analysis_report()` valida que los datos se extraen correctamente hacia el módulo de PDF.

### [PDI-24] BE: Módulo `pdf_charts.py` — Gráficos ReportLab en Memoria
**Tipo:** Feature (Backend)
**Asignado a:** Josue
**Depende de:** PDI-23
**Fase:** BE-Reportes (Didáctica)
**Completado:** 2026-06-10

> **RESTRICCIONES EXPLÍCITAS (Fallo 2 - Anti Scope Creep):**
> - ✅ Crear únicamente: `backend/app/api/v1/pdf_charts.py`
> - ❌ NO modificar: `reports.py`, `images.py`, `session.py`, `schemas.py`, `segmentation.py`, `edges.py`
> - ❌ NO instalar dependencias externas (matplotlib, seaborn, pillow adicional). Solo `reportlab.graphics`.

**Stack fijado:** `reportlab.graphics.charts`, `reportlab.graphics.shapes`, `reportlab.lib.colors` — 0 dependencias nuevas.

**Criterios de Aceptación (binarios):**
- [x] `build_vad_bar_chart(vad: ComputationalVAD) -> Drawing` — Genera `Drawing(380, 130)` con 3 barras horizontales coloreadas. **Test: `isinstance(result, Drawing)` == True**.
- [x] `build_therapeutic_pie(groups: TherapeuticGroups) -> Drawing` — Pie chart `Drawing(200, 200)` con colores rojo-cálido, azul-frío, gris-neutro. **Test: suma de sectores == 100%**.
- [x] `build_koch_diagram(centroid_x: float, centroid_y: float, zone: str) -> Drawing` — Canvas `Drawing(200, 200)` con 4 rectángulos y círculo en centroide. **Solo primitivas `Rect`, `Circle`, `String`**. **Test: `isinstance(result, Drawing)` == True**.
- [x] `build_spatial_bar(distribution: SpatialDistribution) -> Drawing` — 4 barras verticales (NO/NE/SO/SE). **Test: `isinstance(result, Drawing)` == True**.
- [x] `backend/tests/unit/test_pdf_charts.py` — 6 tests pasan.

### [PDI-25] BE: Refactorización `reports.py` — Narrativa Clínica y Visuales
**Tipo:** Refactor (Backend)
**Asignado a:** Juan
**Depende de:** PDI-24
**Fase:** BE-Reportes (Didáctica)
**Completado:** 2026-06-10

> **RESTRICCIONES EXPLÍCITAS:**
> - ✅ Modificar únicamente: `backend/app/api/v1/reports.py`
> - ✅ Importar desde: `backend/app/api/v1/pdf_charts.py` (PDI-24)
> - ❌ NO modificar: `images.py`, `session.py`, `schemas.py`, módulos core PDI
> - ❌ NO cambiar la firma del endpoint `/reports/{analysis_id}/pdf` (mismo método GET, misma URL)

**Criterios de Aceptación (binarios):**
- [x] El PDF generado sigue el flujo de 7 secciones clínicas.
- [x] **Sección 2 (Resumen Ejecutivo):** Párrafo en lenguaje natural sin números brutos.
- [x] **Sección 3 (VAD):** Gráfico `build_vad_bar_chart()` + Glosario Clínico.
- [x] **Sección 4 (Semiótico):** Diagrama Koch + tabla de cuadrantes + texto GLOSARIO_KOCH.
- [x] **Sección 5 (Trazo):** `build_spatial_bar()` + tabla con Significado Clínico.
- [x] **Sección 6 (Color):** `build_therapeutic_pie()` + tablas existentes.
- [x] **Sección 7 (Anexo):** Histograma HSV textual + metadatos.
- [x] Si `enriched_features is None`: secciones 3 y 4 se omiten sin error.
- [x] Los 10 tests de `test_api.py` siguen pasando.

### [PDI-26] QA: Validación Completa del Reporte Didáctico
**Tipo:** QA
**Asignado a:** César
**Depende de:** PDI-25
**Fase:** BE-Reportes (Didáctica)
**Completado:** 2026-06-10

> **RESTRICCIONES EXPLÍCITAS:**
> - ✅ Solo ejecutar comandos: `pytest`, validaciones de tamaño de PDF
> - ❌ NO modificar código de producción ni tests existentes

**Criterios de Aceptación (binarios):**
- [x] `pytest backend/tests/` → **59 tests existentes + 4 nuevos (PDI-24) pasan. 0 fallos**.
- [x] Test nuevo `test_pdf_content_regressions.py`: PDF generado tiene `len(pdf_bytes) > 5000` (confirma que el contenido visual fue añadido, no solo texto plano).
- [x] Test nuevo: Sesión con `enriched_features=None` → `GET /pdf` responde `200` sin excepción (degradación elegante confirmada).
- [x] Benchmark de performance: el endpoint `/pdf` responde en **< 5 segundos** con imagen 800×600 (mismo límite RNF3 del proyecto).

---

### [PDI-10] UI/UX: Tipografía y Sistema de Color Premium
**Tipo:** Feature (Frontend)
**Asignado a:** Ixchel
**Depende de:** PDI-08
**Fase:** FE-A
**Completado:** 2026-06-09

**Criterios de Aceptación:**
- [x] `npm install tailwindcss @tailwindcss/vite` ejecutado y verificado en `package.json`.
- [x] `vite.config.js` modificado con el plugin `@tailwindcss/vite`.
- [x] Google Fonts "Geist" cargado en `index.html` (pesos 300-700).
- [x] `src/index.css` reemplazado con `@import "tailwindcss"` + `@theme` con tokens: `--color-accent`, `--color-surface`, `--color-base`, `--font-sans`, `--radius-2xl`, `--shadow-diffuse`, `--shadow-diffuse-lg`.
- [x] Paleta: base Zinc-50/900, acento único Indigo-500 (saturación < 80%), sin púrpuras genéricos.
- [x] Clases utilitarias "Double-Bezel" definidas: `card-glass` + `card-glass-hover` con sombras difusas.
- [x] `npx vite build` compila sin errores.
- [x] El frontend carga con la tipografía Geist y los estilos base aplicados.

---

### [PDI-11] UI/UX: Rediseño Hero Section e ImageUploader
**Tipo:** Feature (Frontend)
**Asignado a:** Ixchel
**Depende de:** PDI-10
**Fase:** FE-B
**Completado:** 2026-06-09

**Criterios de Aceptación:**
- [x] `npm install @phosphor-icons/react` ejecutado.
- [x] `HomePage` refactorizada a layout split-screen: texto a la izquierda (40%), uploader a la derecha (60%) en desktop; stack vertical en mobile.
- [x] `ImageUploader` rediseñado: drop zone con `rounded-[2rem]`, "Double-Bezel" (`card-glass`), `active:scale-[0.98]`.
- [x] Estado UPLOADING: skeleton shimmer en lugar de spinner circular.
- [x] Estado ERROR: mensaje inline con ícono Phosphor `WarningCircle`, sin `alert()`.
- [x] Estado SUCCESS: check animado con `CheckCircle` + transición a análisis.
- [x] Íconos: reemplazados por `@phosphor-icons/react` (`CloudArrowUp`, `CheckCircle`, `WarningCircle`).
- [x] Estados IDLE, UPLOADING, ERROR, SUCCESS mantienen la misma máquina de estados (sin breaking changes).

---

### [PDI-12] UI/UX: Arquitectura Bento Grid para el Dashboard (AnalysisPage)
**Tipo:** Feature (Frontend)
**Asignado a:** Ixchel
**Depende de:** PDI-10
**Fase:** FE-B
**Completado:** 2026-06-09

**Criterios de Aceptación:**
- [x] `AnalysisPage` reorganizada con CSS Grid "Bento" asimétrico: desktop `grid-template-columns: 2fr 1fr` (ImageGrid | MetricsPanel), ColorHistogram full-width; mobile `1fr` stack vertical.
- [x] `ImageGrid` (2x2): padding generoso (`p-4`), `rounded-[2rem]`, "Liquid Glass" (`card-glass` backdrop-blur), labels en overlay inferior con `bg-gradient-to-t from-black/40`.
- [x] `MetricsPanel`: eliminadas tarjetas genéricas; agrupadas con `divide-y divide-zinc-100`; métricas de trazo en layout de 3 columnas con `text-3xl font-light`; botones "ghost" sutiles.
- [x] `ColorHistogram`: removidas líneas de ejes pesadas, solo ticks mínimos; tooltip premium; contenedor sin borde.

---

### [PDI-13] UI/UX: Coreografía de Animación y Micro-Interacciones
**Tipo:** Feature (Frontend)
**Asignado a:** Ixchel
**Depende de:** PDI-12
**Fase:** FE-C
**Completado:** 2026-06-09

**Criterios de Aceptación:**
- [x] `npm install framer-motion` ejecutado y verificado.
- [x] Animaciones solo sobre `transform` y `opacity` (cero animaciones de width/height/top/left).
- [x] "Staggered Entry" en AnalysisPage: métricas e imágenes aparecen en cascada con `motion.div` + `variants` (`staggerChildren: 0.08`, `spring stiffness: 300, damping: 24`).
- [x] Botones y tarjetas interactivos: `whileTap={{ scale: 0.97 }}` + `whileHover={{ y: -1 }}`.
- [x] ImageUploader drop zone: `AnimatePresence` para transiciones entre estados.
- [x] `npx vite build` sin warnings de rendimiento de animaciones.
- [x] Test manual en viewport móvil (375px) mantiene 60fps durante animaciones.

---

### [PDI-14] Backend: Definición de Esquemas Pydantic Extendidos (Módulo 1 & 2)
**Tipo:** Feature (Backend)
**Asignado a:** Juan
**Depende de:** PDI-15, PDI-16, PDI-17, PDI-18 ⚠️ BLOQUEADO hasta FASE A completa
**Completado:** 2026-06-09

> **NOTA ARQUITECTÓNICA (ERR-01):** Este ticket es de FASE B. No puede iniciarse hasta que PDI-15, 16, 17 y 18 estén en DONE. El schema debe reflejar outputs reales de los algoritmos, no especulación.

**Criterios de Aceptación:**
- [x] Nuevas clases Pydantic: `ComputationalVAD`, `SemioticMass`, `ChromaticCentroid`, `SpatialDistribution`, `EnrichedFeatures`, `DetectedSymbol`.
- [x] `StrokeMetrics` extendido con `fragmentation_ratio: float = 0.0` y `spatial_distribution: SpatialDistribution`.
- [x] `AnalysisResult` extendido con `enriched_features: Optional[EnrichedFeatures] = None` y `detected_symbols: List[DetectedSymbol] = []`.
- [x] Todos los campos nuevos son `Optional` con defaults para garantizar compatibilidad retroactiva con el frontend existente.
- [x] Test: instanciar `AnalysisResult` sin los nuevos campos no lanza excepción.
- [x] Test: `AnalysisResult.model_dump()` includes `"detected_symbols": []`.

---

### [PDI-15] Core PDI: VAD Empírico — Vertiente Computacional
**Tipo:** Feature (Backend/CV)
**Asignado a:** Josue
**Depende de:** PDI-05 (histograma existente)
**Completado:** 2026-06-09

**Criterios de Aceptación:**
- [x] `compute_vad_from_histogram(histogram: dict, image: np.ndarray = None) -> dict` en `segmentation.py`.
- [x] Definir `VAD_COLOR_WEIGHTS` como diccionario estático con pesos basados en literatura de psicología del color.
- [x] Retorna `{"valence_estimate": float, "arousal_estimate": float, "dominance_estimate": float}` con valores en `[0.0, 1.0]`.
- [x] No depende de `schemas.py` ni de FastAPI.
- [x] Test VAD-1: Imagen 100% roja → `valence > 0.5` y `arousal > 0.5` — PASSED.
- [x] Test VAD-2: Imagen 100% azul → `valence < 0.5` — PASSED.
- [x] Test VAD-3: Todos los valores en rango `[0.0, 1.0]` — PASSED.

---

### [PDI-16] Core PDI: Extensión de Métricas de Trazo y Preprocesamiento Adaptativo
**Tipo:** Feature (Backend/CV)
**Asignado a:** Juan
**Depende de:** PDI-04 (edges.py existente)
**Completado:** 2026-06-09

> ⚠️ **ADVERTENCIA (ERR-02):** `edges.py` ya implementa `cv2.findContours` + `cv2.arcLength` en `compute_stroke_metrics` (líneas 23-27). **EXTENDER esa función, NO crear código nuevo duplicado.**

**Criterios de Aceptación:**
- [x] `apply_canny_edge_detection` acepta `pre_blur_kernel: int = 7` y `mask: np.ndarray = None`.
- [x] `compute_stroke_metrics` retorna 6 campos: los 3 existentes + `fragmentation_ratio` + `spatial_distribution` (dict con 4 cuadrantes).
- [x] Test EDGE-1: `fragmentation_ratio` en rango `[0.0, 1.0]` — PASSED.
- [x] Test EDGE-2: Suma cuadrantes ≈ `edge_density_pct` total (tolerancia ±1%) — PASSED.
- [x] Test EDGE-3: Imagen negra → `fragmentation_ratio = 0.0`, cuadrantes = 0 — PASSED.
- [x] Los 5 tests existentes de PDI-04 siguen pasando — PASSED.

---

### [PDI-17] Core PDI: Masa Cromática y Centroide Semiótico
**Tipo:** Feature (Backend/CV)
**Asignado a:** Josue
**Depende de:** PDI-05 (segmentation.py)
**Completado:** 2026-06-09

> **DECISIÓN DE DISEÑO (ERR-03):** El centroide se calcula sobre la **máscara del grupo terapéutico dominante** (warm/cool/neutral con mayor `_pct`). Empate: usar `warm` como desempate.

**Criterios de Aceptación:**
- [x] `compute_chromatic_mass(image: np.ndarray) -> dict` en `segmentation.py`.
- [x] Retorna `{"dominant_group": str, "centroid": {"x_norm": float, "y_norm": float}, "quadrant_distribution": {...}}`.
- [x] Guardia explícita: si máscara vacía (`M["m00"] == 0`), retornar centroide por defecto `(0.5, 0.5)` — IMPLEMENTADO.
- [x] Test MASS-1: Centroide de imagen warm se ubica correctamente — PASSED.
- [x] Test MASS-2: Imagen blanca → `dominant_group == "neutral"` — PASSED.
- [x] Test MASS-3: Suma `quadrant_distribution` ≈ 1.0 (tolerancia ±2%) — PASSED.
- [x] Test MASS-4: Imagen Numpy aleatoria → no lanza excepción — PASSED.

---

### [PDI-18] Arquitectura: Soporte de Máscaras ROI en Funciones Core
**Tipo:** Refactor (Backend/CV)
**Asignado a:** Juan
**Depende de:** PDI-03, PDI-04, PDI-05
**Completado:** 2026-06-09

**Criterios de Aceptación:**
- [x] `compute_color_distribution(image, mask=None)` — retrocompatible.
- [x] `compute_color_histogram(image, mask=None)` — `cv2.calcHist` acepta mask como 3er parámetro de forma nativa.
- [x] `apply_canny_edge_detection(image, ..., mask=None)` — aplicar `cv2.bitwise_and` al resultado final.
- [x] Guardia en las 3 funciones: `if cv2.countNonZero(mask) == 0: return <estructura vacía por defecto>`.
- [x] Test ROI-1: `mask=None` produce mismo resultado que antes (no-regresión) — PASSED.
- [x] Test ROI-2: Máscara que cubre solo cuadrante superior → histograma diferente al global — PASSED.
- [x] Test ROI-3: Máscara vacía → no lanza excepción, retorna defaults — PASSED.
- [x] Los tests existentes siguen pasando — 42/42 PASSED.

---

### [PDI-19] Arquitectura: Constantes Semióticas y Clasificador de Zona Koch
**Tipo:** Feature (Backend)
**Asignado a:** Josue
**Depende de:** PDI-18
**Completado:** 2026-06-09

**Mapa de zonas (Test de Koch):**