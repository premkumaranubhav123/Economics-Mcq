import { useState, useRef, useEffect } from "react";

const SYLLABUS = {
  "PART I — ENVIRONMENTAL ECOLOGY": [
    { id: "ecology_basics", label: "Ch 1: Ecology — Foundations", emoji: "🌿" },
    { id: "ecosystem_functions", label: "Ch 2: Ecosystem Functions (Energy Flow, Food Chains, Succession)", emoji: "⚡" },
    { id: "terrestrial_ecosystem", label: "Ch 3: Terrestrial Ecosystems & Indian Forest Types", emoji: "🌲" },
    { id: "aquatic_ecosystem", label: "Ch 4: Aquatic Ecosystems (Wetlands, Mangroves, Coral Reefs)", emoji: "🌊" },
    { id: "pollution", label: "Ch 5: Environmental Pollution (Air, Water, Soil, E-Waste)", emoji: "🏭" },
    { id: "renewable_energy", label: "Ch 6: Renewable Energy (Solar, Wind, Hydro, Fuel Cells)", emoji: "☀️" },
    { id: "environmental_issues", label: "Ch 7: Environmental Issues (Himalayan, Sand Mining, Colony Collapse)", emoji: "⚠️" },
    { id: "eia", label: "Ch 8: Environmental Impact Assessment (EIA)", emoji: "📋" },
  ],
  "PART II — BIODIVERSITY": [
    { id: "biodiversity_basics", label: "Ch 9: Biodiversity — Levels, Measurement, Conservation Modes", emoji: "🦋" },
    { id: "indian_biodiversity", label: "Ch 10: Indian Biodiversity & Biogeography", emoji: "🇮🇳" },
    { id: "wpa_schedules", label: "Ch 11: Schedule Animals under WPA 1972", emoji: "🐯" },
    { id: "animal_diversity", label: "Ch 12: Animal Diversity (Critically Endangered, Marine, Migration)", emoji: "🐘" },
    { id: "plant_diversity", label: "Ch 13: Plant Diversity (Invasive Species, Medicinal Plants)", emoji: "🌺" },
    { id: "marine_organisms", label: "Ch 14: Marine Organisms (Plankton, Seagrass, Seaweed)", emoji: "🐠" },
    { id: "protected_areas", label: "Ch 15: Protected Area Network (NP, WS, BR, Hotspots)", emoji: "🗺️" },
    { id: "conservation_efforts", label: "Ch 16: Conservation Projects (Tiger, Elephant, Rhino, Vulture)", emoji: "🦏" },
  ],
  "PART III — CLIMATE CHANGE": [
    { id: "climate_change", label: "Ch 17: Climate Change (GHGs, GWP, Glaciers)", emoji: "🌡️" },
    { id: "ocean_acidification", label: "Ch 18: Ocean Acidification", emoji: "🧪" },
    { id: "ozone_depletion", label: "Ch 19: Ozone Depletion (Montreal Protocol)", emoji: "🔵" },
    { id: "climate_impact_india", label: "Ch 20: Climate Change Impact on India", emoji: "🏔️" },
    { id: "mitigation", label: "Ch 21: Mitigation Strategies (Carbon Credits, Geo-Engineering)", emoji: "♻️" },
    { id: "india_climate", label: "Ch 22: India & Climate Change (NAPCC, 8 Missions)", emoji: "📜" },
    { id: "climate_orgs", label: "Ch 23: Climate Organisations (UNFCCC, Kyoto, Paris, IPCC)", emoji: "🌐" },
  ],
  "PART IV — AGRICULTURE": [
    { id: "agriculture", label: "Ch 24: Agriculture (Organic, Sustainable, Soil Science)", emoji: "🌾" },
  ],
  "PART V — GOVERNANCE & CONVENTIONS": [
    { id: "acts_policies", label: "Ch 25: Acts & Policies (WPA, EPA, CRZ, NGT)", emoji: "⚖️" },
    { id: "institutions", label: "Ch 26: Institutions (CAMPA, JFM, CEPI)", emoji: "🏛️" },
    { id: "env_orgs", label: "Ch 27: Environmental Organisations (NBA, CZA, WCCB)", emoji: "🏢" },
    { id: "int_conventions", label: "Ch 28: International Conventions (CBD, CITES, Ramsar, Basel)", emoji: "🤝" },
    { id: "health_movements", label: "Ch 29: Health Effects & Environmental Movements (Chipko, Appiko)", emoji: "✊" },
  ],
};

const MODES = [
  { id: "teach", label: "🎓 MASTER TEACH", desc: "7-Layer Deep Teaching" },
  { id: "mcq", label: "🎯 MCQ ENGINE", desc: "UPSC-Level Questions" },
  { id: "pyq", label: "📊 PYQ DECODER", desc: "Pattern Analysis" },
  { id: "revision", label: "⚡ WAR REVISION", desc: "Rapid Fire Notes" },
];

const LAYER_DEFS = [
  { num: 1, title: "ZERO TO ADVANCED FOUNDATION", icon: "🏗️", color: "#00d4aa" },
  { num: 2, title: "UPSC THINKING STYLE", icon: "🧠", color: "#f59e0b" },
  { num: 3, title: "INTERDISCIPLINARY LINKING", icon: "🔗", color: "#8b5cf6" },
  { num: 4, title: "CURRENT AFFAIRS INTELLIGENCE", icon: "📰", color: "#ef4444" },
  { num: 5, title: "ELIMINATION MASTERY", icon: "🎯", color: "#06b6d4" },
  { num: 6, title: "PYQ EVOLUTION ANALYSIS", icon: "📈", color: "#10b981" },
  { num: 7, title: "PRELIMS WARFARE", icon: "⚔️", color: "#f97316" },
];

const MCQ_TYPES = [
  { id: "easy", label: "Easy", color: "#10b981" },
  { id: "medium", label: "Medium", color: "#f59e0b" },
  { id: "hard", label: "UPSC Hard", color: "#ef4444" },
  { id: "statement", label: "Statement-Based", color: "#8b5cf6" },
  { id: "assertion", label: "Assertion-Reason", color: "#06b6d4" },
];

function buildSystemPrompt() {
  return `You are India's greatest UPSC Environment & Ecology Prelims mentor — simultaneously a former UPSC paper setter, climate scientist, biodiversity expert, ecologist, wildlife biologist, PYQ decoding engine, and current affairs intelligence system.

Your ONLY goal: Train the student to MASTER UPSC Environment & Ecology Prelims through conceptual understanding, scientific reasoning, ecosystem intelligence, PYQ pattern analysis, elimination mastery, current affairs integration, and interdisciplinary thinking. NOT rote memorization.

Your teaching must replicate the actual thinking style of UPSC. Always be precise, scientific, India-specific, and UPSC-aligned. Use ecosystem storytelling, visual analogies, and nature-based reasoning.

PYQ database awareness: You have deep knowledge of UPSC Prelims Environment questions from 2011–2025. Always integrate PYQ patterns, recurring traps, and UPSC's favorite framing techniques.

Format your responses with clear section headers using markdown. Use bullet points for lists. Bold key UPSC terms. Use tables where comparative data matters. Mark "⚠️ UPSC TRAP" for common mistakes. Mark "🔥 HIGH YIELD" for frequently tested concepts. Mark "📌 PYQ ALERT" where questions have appeared. Mark "🌟 CURRENT AFFAIRS LINK" for recent news connections.`;
}

function buildTeachPrompt(topic, layer) {
  const layerMap = {
    1: `LAYER 1 — ZERO TO ADVANCED FOUNDATION for "${topic.label}":
Explain: what it is, why it exists, how it works in nature, its ecosystem role, and the scientific logic behind it.
Avoid textbook language. Use intuitive explanations, ecosystem storytelling, India-specific examples, and visual analogies.
Include the most fundamental concepts a student needs before anything else.`,
    2: `LAYER 2 — UPSC THINKING STYLE for "${topic.label}":
Explain HOW UPSC frames questions on this topic:
- Common statement traps UPSC uses
- Scientific wording tricks and confusion points
- Elimination shortcuts specific to this topic
- Conceptual traps aspirants fall into
- How UPSC links this to current affairs
- At least 3 specific examples of how UPSC has confused aspirants on this topic
Mark each trap clearly with ⚠️ UPSC TRAP`,
    3: `LAYER 3 — INTERDISCIPLINARY LINKING for "${topic.label}":
Connect this Environment topic with: Geography, Agriculture, Economy, Science & Technology, International Relations, Disaster Management, Government Schemes, Biotechnology, Energy, and Ethics.
Show how UPSC combines multiple subjects into one question on this topic.
Give concrete examples of interdisciplinary UPSC questions.`,
    4: `LAYER 4 — CURRENT AFFAIRS INTELLIGENCE for "${topic.label}":
Integrate the latest developments up to 2025:
- Recent COP summits, IPCC/UNEP reports relevant to this topic
- New species discoveries, IUCN changes, Ramsar additions (if applicable)
- Recent government schemes, missions, policies
- Climate finance, green technology connections
For each: explain the background, the conceptual angle, and the probable UPSC framing.
Mark each with 🌟 CURRENT AFFAIRS LINK`,
    5: `LAYER 5 — ELIMINATION MASTERY for "${topic.label}":
Teach scientific elimination strategies specific to this topic:
- How to eliminate wrong options using ecological reasoning
- Extreme-word detection (always, never, only, all) in this context  
- Statement validation techniques
- Reverse elimination method
- Probability filtering for 2-statement questions
- Give 3 practice examples with step-by-step elimination walkthroughs
The student should be able to solve questions even without complete knowledge.`,
    6: `LAYER 6 — PYQ EVOLUTION ANALYSIS for "${topic.label}":
Provide:
- PYQ trend mapping (2011–2025) showing which sub-concepts appeared in which years
- Concept frequency table
- Pattern evolution (how UPSC's questioning style changed over years)
- UPSC favorite sub-zones within this topic
- Difficulty progression analysis
- Hidden repetition patterns
- 5 actual-style PYQs (based on real patterns) with answers and explanations
Mark key questions with 📌 PYQ ALERT`,
    7: `LAYER 7 — PRELIMS WARFARE for "${topic.label}":
Train the student for exam-day strategy:
- Quick recall triggers for this topic
- How to solve under 90-second time pressure
- Trap avoidance checklist
- Maximizing attempts with confidence scoring
- Think-like-UPSC mental model for this topic
- 5 most probable future UPSC questions on this topic with reasoning
- One-page rapid revision summary
- Mnemonics and memory tricks
- Conceptual summary sheet`,
  };
  return `${layerMap[layer]}\n\nBe extremely detailed, scientifically precise, and UPSC-exam-focused. This is elite mentorship.`;
}

function buildMCQPrompt(topic, type) {
  const typeMap = {
    easy: "Generate 3 easy conceptual MCQs",
    medium: "Generate 3 medium difficulty MCQs",
    hard: "Generate 4 difficult UPSC-level MCQs",
    statement: "Generate 4 statement-based MCQs (each with 2-3 statements, 'which is/are correct?' format)",
    assertion: "Generate 3 Assertion-Reason MCQs",
  };
  return `${typeMap[type]} on the topic: "${topic.label}".

For EACH question provide:
1. The question (UPSC exam style)
2. Options (a, b, c, d)
3. Correct answer
4. Detailed explanation (why correct answer is right)
5. Why each wrong option is wrong (elimination strategy)
6. Conceptual takeaway / UPSC lesson
7. Mark if this pattern has appeared in PYQs with 📌 PYQ ALERT

Format clearly with Q1, Q2, etc. Use bold for correct answers. Make questions genuinely UPSC-level — tricky, scientifically precise, with realistic distractors.`;
}

function buildPYQPrompt(topic) {
  return `Perform a complete PYQ Pattern Decoding for: "${topic.label}"

Analyze UPSC Prelims PYQs from 2011–2025 and provide:

1. **COMPLETE PYQ INVENTORY** — List every question that appeared on this topic (year, theme, difficulty)

2. **RECURRING CONCEPTS** — Which sub-topics UPSC loves to test repeatedly (with frequency count)

3. **HIDDEN PATTERNS** — Non-obvious patterns in how UPSC tests this topic

4. **UPSC FAVORITE TRAPS** — The 5 most common conceptual traps set by UPSC on this topic

5. **SCIENTIFIC THEMES** — What scientific angles does UPSC prefer?

6. **CURRENT AFFAIRS INTEGRATION HISTORY** — How has UPSC integrated current affairs with this topic?

7. **PREDICTED FUTURE QUESTIONS** — 5 high-probability future questions based on pattern analysis

8. **CONCEPTUAL HOTSPOTS** — The 3 most important sub-topics to study deeply

9. **ELIMINATION OPPORTUNITIES** — Which answer choices can always be eliminated on this topic?

10. **DIFFICULTY TRAJECTORY** — Is UPSC making this topic harder or easier over time?

Be extremely specific with years and question patterns. This is elite UPSC intelligence analysis.`;
}

function buildRevisionPrompt(topic) {
  return `Create an ULTRA-COMPLETE PRELIMS REVISION PACKAGE for: "${topic.label}"

Structure it as:

## ⚡ ONE-PAGE MASTER NOTES
(The absolute essential facts — every key number, date, species, convention, act)

## 🧠 MNEMONICS & MEMORY TRICKS
(At least 5 powerful mnemonics custom-designed for this topic)

## 📌 PYQ RECAP TABLE
(Topic | Year | Answer | Key Learning — table format)

## 🔥 HIGH-YIELD CONCEPTS (Top 10)
(The 10 things most likely to be tested — rank ordered)

## ⚠️ UPSC TRAP RECAP
(Every trap UPSC has ever used on this topic — as a checklist)

## 🎯 PROBABLE FUTURE QUESTIONS (Top 5)
(With reasoning for why each is probable)

## 🔗 INTERDISCIPLINARY CONNECTIONS
(Quick-fire links to other subjects)

## ⚔️ EXAM-DAY CHECKLIST
(What to review in the last 5 minutes before the Environment section)

Make this the most powerful revision document a UPSC aspirant has ever seen.`;
}

export default function App() {
  const [activeMode, setActiveMode] = useState("teach");
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [activeLayer, setActiveLayer] = useState(1);
  const [mcqType, setMcqType] = useState("hard");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [layerCache, setLayerCache] = useState({});
  const contentRef = useRef(null);

  const cacheKey = selectedTopic ? `${selectedTopic.id}_${activeMode}_${activeLayer}_${mcqType}` : null;

  async function callClaude(prompt) {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: buildSystemPrompt(),
        messages: [{ role: "user", content: prompt }],
      }),
    });
    const data = await response.json();
    return data.content?.map(b => b.text || "").join("") || "Error generating content.";
  }

  async function generate() {
    if (!selectedTopic) return;
    if (layerCache[cacheKey]) {
      setContent(layerCache[cacheKey]);
      return;
    }
    setLoading(true);
    setContent("");
    try {
      let prompt;
      if (activeMode === "teach") prompt = buildTeachPrompt(selectedTopic, activeLayer);
      else if (activeMode === "mcq") prompt = buildMCQPrompt(selectedTopic, mcqType);
      else if (activeMode === "pyq") prompt = buildPYQPrompt(selectedTopic);
      else prompt = buildRevisionPrompt(selectedTopic);

      const result = await callClaude(prompt);
      setContent(result);
      setLayerCache(prev => ({ ...prev, [cacheKey]: result }));
    } catch (e) {
      setContent("⚠️ Error connecting to AI. Please check your connection and try again.");
    }
    setLoading(false);
  }

  useEffect(() => {
    if (selectedTopic && activeMode) generate();
  }, [selectedTopic, activeMode, activeLayer, mcqType]);

  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0;
  }, [content]);

  function renderMarkdown(text) {
    if (!text) return "";
    return text
      .replace(/^### (.+)$/gm, '<h3 style="color:#00d4aa;margin:20px 0 8px;font-size:1.05rem;font-family:\'Courier New\',monospace;border-bottom:1px solid #00d4aa33;padding-bottom:4px">$1</h3>')
      .replace(/^## (.+)$/gm, '<h2 style="color:#f59e0b;margin:24px 0 10px;font-size:1.15rem;font-family:\'Courier New\',monospace;letter-spacing:0.05em">$1</h2>')
      .replace(/^# (.+)$/gm, '<h1 style="color:#fff;margin:28px 0 12px;font-size:1.3rem;font-family:\'Courier New\',monospace;letter-spacing:0.1em">$1</h1>')
      .replace(/\*\*(.+?)\*\*/g, '<strong style="color:#fbbf24">$1</strong>')
      .replace(/⚠️ UPSC TRAP/g, '<span style="background:#ef4444;color:#fff;padding:2px 8px;border-radius:4px;font-size:0.8rem;font-weight:bold">⚠️ UPSC TRAP</span>')
      .replace(/🔥 HIGH YIELD/g, '<span style="background:#f97316;color:#fff;padding:2px 8px;border-radius:4px;font-size:0.8rem;font-weight:bold">🔥 HIGH YIELD</span>')
      .replace(/📌 PYQ ALERT/g, '<span style="background:#8b5cf6;color:#fff;padding:2px 8px;border-radius:4px;font-size:0.8rem;font-weight:bold">📌 PYQ ALERT</span>')
      .replace(/🌟 CURRENT AFFAIRS LINK/g, '<span style="background:#06b6d4;color:#fff;padding:2px 8px;border-radius:4px;font-size:0.8rem;font-weight:bold">🌟 CA LINK</span>')
      .replace(/^- (.+)$/gm, '<div style="display:flex;gap:8px;margin:4px 0;padding:4px 0"><span style="color:#00d4aa;flex-shrink:0">▸</span><span>$1</span></div>')
      .replace(/^\d+\. (.+)$/gm, (m, p1, offset, str) => `<div style="display:flex;gap:8px;margin:4px 0"><span style="color:#f59e0b;flex-shrink:0;font-weight:bold">${m.match(/^\d+/)[0]}.</span><span>${p1}</span></div>`)
      .replace(/\n\n/g, '<div style="height:12px"></div>')
      .replace(/\n/g, '<br/>');
  }

  const allTopics = Object.values(SYLLABUS).flat();
  const currentPart = selectedTopic ? Object.entries(SYLLABUS).find(([, topics]) => topics.some(t => t.id === selectedTopic.id))?.[0] : null;

  return (
    <div style={{
      display: "flex", height: "100vh", background: "#060c18", color: "#e2e8f0",
      fontFamily: "'Georgia', serif", overflow: "hidden"
    }}>
      {/* Sidebar */}
      <div style={{
        width: sidebarOpen ? "300px" : "0px", minWidth: sidebarOpen ? "300px" : "0px",
        transition: "all 0.3s", overflow: "hidden",
        background: "linear-gradient(180deg, #0a1628 0%, #060c18 100%)",
        borderRight: "1px solid #1e3a5f", display: "flex", flexDirection: "column"
      }}>
        {/* Logo */}
        <div style={{ padding: "20px 16px 12px", borderBottom: "1px solid #1e3a5f" }}>
          <div style={{ color: "#00d4aa", fontFamily: "'Courier New', monospace", fontSize: "0.7rem", letterSpacing: "0.15em", marginBottom: "4px" }}>SHANKAR IAS × AI</div>
          <div style={{ color: "#fff", fontWeight: "bold", fontSize: "1.1rem", lineHeight: 1.2 }}>UPSC ENV MASTERCLASS</div>
          <div style={{ color: "#64748b", fontSize: "0.72rem", marginTop: "4px" }}>2013–2025 PYQ Intelligence Engine</div>
        </div>
        {/* Syllabus */}
        <div style={{ flex: 1, overflowY: "auto", padding: "12px 0" }}>
          {Object.entries(SYLLABUS).map(([part, topics]) => (
            <div key={part} style={{ marginBottom: "8px" }}>
              <div style={{
                padding: "6px 16px", color: "#475569", fontSize: "0.65rem",
                fontFamily: "'Courier New', monospace", letterSpacing: "0.1em", textTransform: "uppercase"
              }}>{part.split("—")[1]?.trim()}</div>
              {topics.map(topic => (
                <button key={topic.id} onClick={() => { setSelectedTopic(topic); setActiveLayer(1); setContent(""); }}
                  style={{
                    width: "100%", textAlign: "left", padding: "8px 16px",
                    background: selectedTopic?.id === topic.id ? "linear-gradient(90deg, #00d4aa15, transparent)" : "transparent",
                    border: "none", borderLeft: selectedTopic?.id === topic.id ? "3px solid #00d4aa" : "3px solid transparent",
                    color: selectedTopic?.id === topic.id ? "#00d4aa" : "#94a3b8",
                    cursor: "pointer", fontSize: "0.78rem", lineHeight: 1.4,
                    transition: "all 0.2s"
                  }}>
                  <span style={{ marginRight: "6px" }}>{topic.emoji}</span>{topic.label}
                </button>
              ))}
            </div>
          ))}
        </div>
        <div style={{ padding: "12px 16px", borderTop: "1px solid #1e3a5f" }}>
          <div style={{ color: "#475569", fontSize: "0.65rem", textAlign: "center" }}>
            {allTopics.length} chapters · 7 learning layers · MCQ engine
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Top Bar */}
        <div style={{
          padding: "12px 20px", background: "#0a1628",
          borderBottom: "1px solid #1e3a5f", display: "flex", alignItems: "center", gap: "16px", flexShrink: 0
        }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{ background: "none", border: "1px solid #1e3a5f", color: "#64748b", padding: "6px 10px", borderRadius: "6px", cursor: "pointer", fontSize: "1rem" }}>
            {sidebarOpen ? "◀" : "▶"}
          </button>
          {/* Mode Tabs */}
          <div style={{ display: "flex", gap: "8px", flex: 1 }}>
            {MODES.map(m => (
              <button key={m.id} onClick={() => { setActiveMode(m.id); setContent(""); }}
                style={{
                  padding: "8px 16px", borderRadius: "8px", border: "none", cursor: "pointer",
                  background: activeMode === m.id ? "#00d4aa" : "#1e3a5f",
                  color: activeMode === m.id ? "#000" : "#94a3b8",
                  fontFamily: "'Courier New', monospace", fontSize: "0.75rem", fontWeight: "bold",
                  letterSpacing: "0.05em", transition: "all 0.2s"
                }}>
                {m.label}
              </button>
            ))}
          </div>
          {selectedTopic && (
            <div style={{ color: "#64748b", fontSize: "0.72rem", fontFamily: "'Courier New', monospace", textAlign: "right", maxWidth: "200px" }}>
              <div style={{ color: "#00d4aa" }}>{selectedTopic.emoji} {selectedTopic.label.split(":")[0]}</div>
            </div>
          )}
        </div>

        {/* Sub Controls */}
        {selectedTopic && (
          <div style={{
            padding: "10px 20px", background: "#0a1628",
            borderBottom: "1px solid #1e3a5f", display: "flex", gap: "8px", flexWrap: "wrap", flexShrink: 0
          }}>
            {activeMode === "teach" && LAYER_DEFS.map(l => (
              <button key={l.num} onClick={() => { setActiveLayer(l.num); setContent(""); }}
                style={{
                  padding: "5px 12px", borderRadius: "6px", border: "none", cursor: "pointer",
                  background: activeLayer === l.num ? l.color : "#1e3a5f",
                  color: activeLayer === l.num ? "#000" : "#94a3b8",
                  fontSize: "0.72rem", fontWeight: "bold", fontFamily: "'Courier New', monospace",
                  transition: "all 0.2s"
                }}>
                {l.icon} L{l.num}
              </button>
            ))}
            {activeMode === "mcq" && MCQ_TYPES.map(t => (
              <button key={t.id} onClick={() => { setMcqType(t.id); setContent(""); }}
                style={{
                  padding: "5px 12px", borderRadius: "6px", border: "none", cursor: "pointer",
                  background: mcqType === t.id ? t.color : "#1e3a5f",
                  color: mcqType === t.id ? "#fff" : "#94a3b8",
                  fontSize: "0.72rem", fontWeight: "bold", fontFamily: "'Courier New', monospace",
                  transition: "all 0.2s"
                }}>
                {t.label}
              </button>
            ))}
          </div>
        )}

        {/* Content Area */}
        <div ref={contentRef} style={{ flex: 1, overflowY: "auto", padding: "24px", position: "relative" }}>
          {!selectedTopic && (
            <div style={{ textAlign: "center", paddingTop: "60px" }}>
              <div style={{ fontSize: "4rem", marginBottom: "20px" }}>🌿</div>
              <div style={{ color: "#00d4aa", fontFamily: "'Courier New', monospace", fontSize: "1.5rem", letterSpacing: "0.15em", marginBottom: "12px" }}>
                SELECT A CHAPTER TO BEGIN
              </div>
              <div style={{ color: "#475569", fontSize: "0.9rem", maxWidth: "500px", margin: "0 auto 40px", lineHeight: 1.8 }}>
                Choose any chapter from the sidebar to unlock your personalized UPSC Environment masterclass — powered by AI intelligence trained on Shankar IAS 6th Edition + 2013–2025 PYQ patterns.
              </div>
              {/* Stats */}
              <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
                {[["29", "Chapters"], ["7", "Learning Layers"], ["5", "MCQ Types"], ["2011-25", "PYQ Database"]].map(([n, l]) => (
                  <div key={l} style={{
                    background: "#0a1628", border: "1px solid #1e3a5f", borderRadius: "12px",
                    padding: "16px 24px", textAlign: "center"
                  }}>
                    <div style={{ color: "#00d4aa", fontFamily: "'Courier New', monospace", fontSize: "1.6rem", fontWeight: "bold" }}>{n}</div>
                    <div style={{ color: "#64748b", fontSize: "0.75rem" }}>{l}</div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: "48px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "12px", maxWidth: "900px", margin: "48px auto 0" }}>
                {MODES.map(m => (
                  <div key={m.id} style={{
                    background: "#0a1628", border: "1px solid #1e3a5f", borderRadius: "12px",
                    padding: "16px", textAlign: "left", cursor: "pointer"
                  }} onClick={() => setActiveMode(m.id)}>
                    <div style={{ fontSize: "1.4rem", marginBottom: "6px" }}>{m.label.split(" ")[0]}</div>
                    <div style={{ color: "#e2e8f0", fontWeight: "bold", fontSize: "0.85rem" }}>{m.label.split(" ").slice(1).join(" ")}</div>
                    <div style={{ color: "#64748b", fontSize: "0.75rem", marginTop: "4px" }}>{m.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTopic && loading && (
            <div style={{ textAlign: "center", paddingTop: "80px" }}>
              <div style={{ marginBottom: "24px" }}>
                <div style={{
                  width: "60px", height: "60px", border: "3px solid #1e3a5f",
                  borderTop: "3px solid #00d4aa", borderRadius: "50%",
                  animation: "spin 1s linear infinite", margin: "0 auto"
                }} />
              </div>
              <div style={{ color: "#00d4aa", fontFamily: "'Courier New', monospace", fontSize: "0.9rem", letterSpacing: "0.1em" }}>
                {activeMode === "teach" && `LOADING LAYER ${activeLayer}: ${LAYER_DEFS[activeLayer-1].title}`}
                {activeMode === "mcq" && `GENERATING ${mcqType.toUpperCase()} MCQs`}
                {activeMode === "pyq" && "DECODING PYQ PATTERNS"}
                {activeMode === "revision" && "COMPILING WAR REVISION NOTES"}
              </div>
              <div style={{ color: "#475569", fontSize: "0.8rem", marginTop: "8px" }}>AI is analyzing {selectedTopic.label}...</div>
            </div>
          )}

          {selectedTopic && !loading && content && (
            <div style={{ maxWidth: "900px", margin: "0 auto" }}>
              {/* Header Banner */}
              <div style={{
                background: "linear-gradient(135deg, #0a1628 0%, #0f2040 100%)",
                border: "1px solid #1e3a5f", borderRadius: "12px",
                padding: "20px 24px", marginBottom: "24px"
              }}>
                <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                  <div style={{ fontSize: "2.5rem" }}>{selectedTopic.emoji}</div>
                  <div>
                    <div style={{ color: "#00d4aa", fontFamily: "'Courier New', monospace", fontSize: "0.7rem", letterSpacing: "0.15em" }}>
                      {activeMode === "teach" ? `LAYER ${activeLayer}: ${LAYER_DEFS[activeLayer-1].icon} ${LAYER_DEFS[activeLayer-1].title}` :
                       activeMode === "mcq" ? `MCQ ENGINE: ${mcqType.toUpperCase()} DIFFICULTY` :
                       activeMode === "pyq" ? "PYQ PATTERN DECODER" : "WAR REVISION NOTES"}
                    </div>
                    <div style={{ color: "#fff", fontWeight: "bold", fontSize: "1.2rem", marginTop: "4px" }}>{selectedTopic.label}</div>
                    <div style={{ color: "#475569", fontSize: "0.75rem", marginTop: "2px" }}>Shankar IAS 6th Edition · 2013–2025 PYQ Intelligence</div>
                  </div>
                </div>
                {activeMode === "teach" && (
                  <div style={{ display: "flex", gap: "6px", marginTop: "16px", flexWrap: "wrap" }}>
                    {LAYER_DEFS.map(l => (
                      <button key={l.num} onClick={() => { setActiveLayer(l.num); setContent(""); }}
                        style={{
                          padding: "4px 10px", borderRadius: "4px", border: "none", cursor: "pointer",
                          background: activeLayer === l.num ? l.color : "#1e3a5f",
                          color: activeLayer === l.num ? "#000" : "#64748b",
                          fontSize: "0.68rem", fontFamily: "'Courier New', monospace"
                        }}>
                        {l.icon} L{l.num} · {l.title.split(" ")[0]}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Main Content */}
              <div style={{
                background: "#0a1628", border: "1px solid #1e3a5f", borderRadius: "12px",
                padding: "28px", lineHeight: 1.8, fontSize: "0.92rem"
              }}
                dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
              />

              {/* Navigation */}
              <div style={{ display: "flex", gap: "12px", marginTop: "20px", justifyContent: "space-between" }}>
                {activeMode === "teach" && activeLayer > 1 && (
                  <button onClick={() => { setActiveLayer(activeLayer - 1); setContent(""); }}
                    style={{ padding: "10px 20px", background: "#1e3a5f", border: "none", borderRadius: "8px", color: "#94a3b8", cursor: "pointer", fontSize: "0.8rem" }}>
                    ◀ Layer {activeLayer - 1}
                  </button>
                )}
                <div style={{ flex: 1 }} />
                {activeMode === "teach" && activeLayer < 7 && (
                  <button onClick={() => { setActiveLayer(activeLayer + 1); setContent(""); }}
                    style={{ padding: "10px 20px", background: "#00d4aa", border: "none", borderRadius: "8px", color: "#000", cursor: "pointer", fontSize: "0.8rem", fontWeight: "bold" }}>
                    Layer {activeLayer + 1}: {LAYER_DEFS[activeLayer].title.split(" ").slice(0, 2).join(" ")} ▶
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #060c18; }
        ::-webkit-scrollbar-thumb { background: #1e3a5f; border-radius: 3px; }
        button:hover { opacity: 0.85; }
      `}</style>
    </div>
  );
}
