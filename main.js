/* === MOBIUS BRAID: Unified Workspace Portal Engine === */

// --------------------------------------------------------------------------------
// 1. SAFE STORAGE BACKUP SYSTEM (EXTREMELY ROBUST PARSING OVER STANDALONE)
// --------------------------------------------------------------------------------
const safeStorage = {
  async getItem(key, defaultValue = null) {
    try {
      if (window.miniappsAI && window.miniappsAI.storage) {
        const val = await window.miniappsAI.storage.getItem(key);
        if (val === null || val === undefined) return defaultValue;
        try {
          return JSON.parse(val);
        } catch (parseError) {
          // Fall back to raw string value if stored format is not JSON-valid
          return val;
        }
      }
    } catch (e) {
      console.warn("miniappsAI.storage access error, falling back to localStorage", e);
    }
    try {
      const localVal = localStorage.getItem(`mobius_${key}`);
      if (localVal === null || localVal === undefined) return defaultValue;
      try {
        return JSON.parse(localVal);
      } catch (parseError) {
        // Fall back to raw string value if stored format is not JSON-valid
        return localVal;
      }
    } catch (e) {
      return defaultValue;
    }
  },
  async setItem(key, value) {
    try {
      if (window.miniappsAI && window.miniappsAI.storage) {
        await window.miniappsAI.storage.setItem(key, JSON.stringify(value));
        return;
      }
    } catch (e) {
      console.warn("miniappsAI.storage set error, falling back to localStorage", e);
    }
    try {
      localStorage.setItem(`mobius_${key}`, JSON.stringify(value));
    } catch (e) {
      console.error("Critical storage write failure", e);
    }
  }
};

// --------------------------------------------------------------------------------
// 2. CONSOLIDATED PORTAL ARCHITECTURE STATE
// --------------------------------------------------------------------------------
const STATE = {
  activeScreen: "PROFILE",
  activeTheme: "aether",
  activeGender: "male",
  ledgerProgression: 80.00,
  waitlistEmails: [],
  isUnlockedMembers: false,
  webhookUrl: "",
  frictionCoefficient: 0.000,
  resonanceFrequency: 39420,
  searchQuery: "",
  logs: [
    {
      id: "log_01",
      title: "The Topology of Fluid Logic Paths (FLUX)",
      category: "SYSTEM_BLUEPRINT",
      date: "2026.06.01",
      isPremium: false,
      summary: "Computation described as flowing patterns rather than rigid binary instructions. A 5iR logic paradigm.",
      paragraphs: [
        "In the classical computing matrix, operations are constrained to rigid physical silicon channels, driving high thermodynamic entropy. The FLUX paradigm shifts execution entirely into continuous topological logic flows, where inputs are guided by vortex paths.",
        "By weaving continuous networks, logic states emerge from constructive mathematical interference. Mass and computational state exist in unified geometric alignment, eliminating instruction pipeline registers entirely.",
        "We define our base operations not through logic gates, but through fluid topological junctions. This creates a non-associative computational environment that functions natively in higher topological manifolds."
      ]
    },
    {
      id: "log_02",
      title: "Look 04 Thermal Boundary Optimization Specifications",
      category: "HARDWARE_SPEC",
      date: "2026.06.03",
      isPremium: true,
      summary: "Detailed spatial armor thermal optimization holding leak states flat at dQ_leak/dt = 0.00 Watts.",
      paragraphs: [
        "The Graphene Nanofiber Tactical Lattice utilized in Look 04 represents the absolute apex of individual spatial shielding. Integrating multi-bag hardware utility modules with active cyano-luminescent piping conduit pathways.",
        "A critical challenge in extreme spatial coordinates is the containment of low-entropy heat energy. Standard containment systems leak ambient heat continuously. The Look 04 matrix stabilizes the thermal interface boundary holding heat leak absolute flat.",
        "Through passive multi-layered vacuum shunts and graphene-superconductor woven junctions, the system locks heat dissipation flat at dQ_leak/dt = 0.00 Watts, ensuring zero thermal signature and perfect physiological synchronization for the Architect."
      ]
    },
    {
      id: "log_03",
      title: "Non-Associative Mobius Braid Manifolds in Cydonia Cruisers",
      category: "PROPULSION_CORE",
      date: "2026.06.05",
      isPremium: true,
      summary: "Eliminating traditional drive elements in favor of a frictionless phonon-polariton tracker headlight array.",
      paragraphs: [
        "High-entropy combustion drivetrains are archaic models of momentum transfer. The Cydonia Braid Cruiser purges all high-entropy elements. We implement a seamless, fluidic chrome Vortex Manifold built inside non-associative 'Möbius Braid' geometric paths.",
        "The headlights themselves are upgraded into a solid-state Phonon-Polariton tracker array designated 'The Living Eye'. Rather than projecting raw electromagnetic photons, 'The Living Eye' tracks road surface lattices natively with zero physical or frictional resistance.",
        "By projecting localized quantum acoustic fields, the ground surface lattice ahead is compressed and smoothed in real time, locking the friction coefficient flat at μ = 0.000. True high-status glide capability across terrain meshes."
      ]
    }
  ]
};

// Target DeepSeek Text Model ID for Coherence operations
const MODEL_ID = "dc2db118-7888-466a-a8d1-bf9d96bab4b6";

// --------------------------------------------------------------------------------
// 3. UI INITIALIZATION & RENDER PIPELINE
// --------------------------------------------------------------------------------
async function initApp() {
  console.log("MOBIUS BRAID Portal Core: INITIALIZING");
  
  // Load variables from safe storage with strict fallbacks
  try {
    STATE.activeTheme = await safeStorage.getItem("theme", "aether");
    STATE.activeGender = await safeStorage.getItem("gender", "male");
    STATE.waitlistEmails = await safeStorage.getItem("emails", []);
    STATE.isUnlockedMembers = await safeStorage.getItem("unlocked", false);
    STATE.webhookUrl = await safeStorage.getItem("webhook", "");
    STATE.activeScreen = await safeStorage.getItem("activeScreen", "PROFILE");
  } catch (err) {
    console.warn("Could not retrieve stored portal coordinates, running safety defaults", err);
  }

  // Validate loaded coordinates strictly to prevent corrupted/blank states
  const VALID_SCREENS = ["PROFILE", "CRUISER", "ORACLE_TERMINAL"];
  if (!VALID_SCREENS.includes(STATE.activeScreen)) {
    STATE.activeScreen = "PROFILE";
  }

  const VALID_THEMES = ["aether", "solaris", "andromeda"];
  if (!VALID_THEMES.includes(STATE.activeTheme)) {
    STATE.activeTheme = "aether";
  }

  const VALID_GENDERS = ["male", "female"];
  if (!VALID_GENDERS.includes(STATE.activeGender)) {
    STATE.activeGender = "male";
  }

  // Synced dynamic state values
  if (Array.isArray(STATE.waitlistEmails) && STATE.waitlistEmails.length > 0) {
    STATE.isUnlockedMembers = true;
  }

  // Initialize view states
  applyTheme(STATE.activeTheme);
  applyGender(STATE.activeGender);
  renderLogs();
  initLedgerTelemetry();
  initCruiserSimulation();

  // Switch to the stored viewport state with instant DOM draw
  applyViewportContext(STATE.activeScreen, true);

  // Populate Webhook UI
  const webhookInput = document.getElementById("webhookInputUrl");
  if (webhookInput && STATE.webhookUrl) {
    webhookInput.value = STATE.webhookUrl;
    updateWebhookStatus(true);
  }

  // Bind Event Listeners
  setupEventListeners();

  console.log("MOBIUS BRAID Portal Core: INITIALIZATION COMPLETED");
}

// Bulletproof initialization block preventing race conditions when page loads extremely fast
function startApp() {
  initApp().catch(err => {
    console.error("Critical error during app initialization:", err);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startApp);
} else {
  startApp();
}

// Theme switcher application
function applyTheme(theme) {
  document.body.className = `min-h-screen text-slate-100 antialiased relative theme-${theme} transition-all duration-700 font-mono bg-black`;
  STATE.activeTheme = theme;
  safeStorage.setItem("theme", theme);

  // Update controller active classes
  const buttons = document.querySelectorAll("#cosmicController button");
  buttons.forEach(btn => {
    if (btn.getAttribute("data-theme") === theme) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  // Log to terminal
  showToast(`COSMIC ENVIRONMENT SHIFT: ${theme.toUpperCase()}_ORBIT_SECURED`);
}

// Gender Look 04 apparel display application
function applyGender(gender) {
  STATE.activeGender = gender;
  safeStorage.setItem("gender", gender);
  
  const maleBtn = document.getElementById("btnMaleMatrix");
  const femaleBtn = document.getElementById("btnFemaleMatrix");
  
  if (gender === "male") {
    maleBtn?.classList.add("active");
    femaleBtn?.classList.remove("active");
  } else {
    femaleBtn?.classList.add("active");
    maleBtn?.classList.remove("active");
  }
}

// --------------------------------------------------------------------------------
// 4. TELEMETRY LEDGER CORE FLOWS
// --------------------------------------------------------------------------------
function initLedgerTelemetry() {
  const ledgerStream = document.getElementById("ledgerTelemetryStream");
  const progressPercent = document.getElementById("telemetryProgress");
  const progressBar = document.getElementById("telemetryProgressBar");

  const streamLines = [
    "Compiling quantum acceleration handshake...",
    "Validating cryptographic ledger node consensus state...",
    "Graphene lattice thermal constraints flat dQ/dt = 0.00W",
    "Phonon polariton headlight telemetry tracker synchronized.",
    "System matrix locked. 5iR architectural manual secured.",
    "Securing quantum key exchange system (Aether acceleration)...",
    "Running 5iR continuous topological flow vectors...",
    "Ledger progress synchronized to collective collective matrix."
  ];

  // Live telemetry stream updates
  setInterval(() => {
    if (!ledgerStream) return;
    
    // Append telemetry lines
    const randomLine = streamLines[Math.floor(Math.random() * streamLines.length)];
    const timestamp = new Date().toTimeString().split(' ')[0];
    const newLineElement = document.createElement("div");
    newLineElement.innerHTML = `[${timestamp}] <span class="text-[#00f2fe]">${randomLine}</span>`;
    
    ledgerStream.appendChild(newLineElement);
    if (ledgerStream.childNodes.length > 20) {
      ledgerStream.removeChild(ledgerStream.firstChild);
    }
    // Auto scroll down
    ledgerStream.scrollTop = ledgerStream.scrollHeight;

    // Modulate progress percentage slightly for realistic live telemetry feedback
    let currentProg = STATE.ledgerProgression + (Math.random() * 0.04 - 0.02);
    if (currentProg > 80.5) currentProg = 80.0;
    if (currentProg < 79.5) currentProg = 80.0;
    
    if (progressPercent) progressPercent.textContent = `${currentProg.toFixed(2)}%`;
    if (progressBar) progressBar.style.width = `${currentProg}%`;
  }, 3000);
}

// --------------------------------------------------------------------------------
// 5. CYDONIA CRUISER TELEMETRY SIMULATION
// --------------------------------------------------------------------------------
function initCruiserSimulation() {
  const frictionSlider = document.getElementById("sliderFriction");
  const freqSlider = document.getElementById("sliderFreq");
  const frictionValue = document.getElementById("sliderFrictionValue");
  const freqValue = document.getElementById("sliderFreqValue");
  const statusText = document.getElementById("cruiserStatusText");

  function calculateSimulation() {
    if (!frictionSlider || !freqSlider) return;
    const friction = parseFloat(frictionSlider.value) / 100;
    const freq = parseInt(freqSlider.value);
    
    if (frictionValue) frictionValue.textContent = `${friction.toFixed(3)} μ`;
    if (freqValue) freqValue.textContent = `${freq.toLocaleString()} Hz`;

    // Calculate dynamic state
    const frequencyDelta = Math.abs(39420 - freq);
    const momentumEfficiency = Math.max(0, 100 - (friction * 100) - (frequencyDelta / 400));
    
    if (statusText) {
      if (friction === 0 && frequencyDelta === 0) {
        statusText.innerHTML = `<span class="text-emerald-400 font-bold">RESONANCE LOCKED: 100% EFFICIENCY</span>`;
      } else if (momentumEfficiency > 85) {
        statusText.innerHTML = `<span class="text-cyan-400">STABLE GLIDE: ${momentumEfficiency.toFixed(1)}% EFF</span>`;
      } else if (momentumEfficiency > 50) {
        statusText.innerHTML = `<span class="text-amber-400">HIGH ENTROPY WAVE: ${momentumEfficiency.toFixed(1)}% EFF</span>`;
      } else {
        statusText.innerHTML = `<span class="text-red-500 font-bold">THERMAL CORRUPTION: SLOW DOWN</span>`;
      }
    }
  }

  frictionSlider?.addEventListener("input", calculateSimulation);
  freqSlider?.addEventListener("input", calculateSimulation);

  calculateSimulation();
}

// --------------------------------------------------------------------------------
// 6. ARTICLES AND MONOSPACE LOG ENGINE
// --------------------------------------------------------------------------------
function renderLogs() {
  const listContainer = document.getElementById("articlesList");
  const countLabel = document.getElementById("articlesCount");
  if (!listContainer) return;

  listContainer.innerHTML = "";
  
  // Filter logs based on search
  const filtered = STATE.logs.filter(log => {
    const query = STATE.searchQuery.toLowerCase();
    return log.title.toLowerCase().includes(query) || 
           log.category.toLowerCase().includes(query) ||
           log.summary.toLowerCase().includes(query);
  });

  if (countLabel) {
    countLabel.textContent = `${filtered.length} SECURE LOG${filtered.length === 1 ? '' : 'S'}`;
  }

  if (filtered.length === 0) {
    listContainer.innerHTML = `
      <div class="border border-dashed border-slate-800 p-6 text-center text-slate-500 text-xs">
        NO RELEVANT 5iR WORKSPACE LOGS SECURED FOR: "${STATE.searchQuery.toUpperCase()}"
      </div>
    `;
    return;
  }

  filtered.forEach(log => {
    const isLocked = log.isPremium && !STATE.isUnlockedMembers;
    const card = document.createElement("div");
    card.className = "border border-slate-800 p-4 bg-[#050b1a] hover:border-[#00f2fe]/40 transition-all flex flex-col gap-2 relative cursor-pointer group rounded";
    
    card.innerHTML = `
      <div class="flex items-center justify-between">
        <span class="text-[9px] text-[#00f2fe] tracking-wider uppercase font-bold">[${log.category}]</span>
        <span class="text-[10px] ${isLocked ? 'text-amber-500 border border-amber-500/30 bg-amber-500/5' : 'text-emerald-400 border border-emerald-500/30 bg-emerald-500/5'} px-1.5 py-0.5 text-[8px] font-bold">
          ${isLocked ? '🔒 MEMBERS SECURED' : '🔓 OPEN LOG'}
        </span>
      </div>
      <h3 class="text-xs md:text-sm font-bold text-white group-hover:text-[#00f2fe] transition-colors leading-snug">
        ${log.title}
      </h3>
      <p class="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
        ${log.summary}
      </p>
      <div class="flex justify-between items-center text-[10px] text-slate-600 mt-2 border-t border-slate-900/60 pt-2">
        <span>DATE: ${log.date}</span>
        <span class="text-[#00f2fe] font-bold text-[9px] opacity-0 group-hover:opacity-100 transition-opacity">[READ_DEEP_LOG] »</span>
      </div>
    `;

    card.addEventListener("click", () => openLogReader(log));
    listContainer.appendChild(card);
  });
}

// Open custom monospace modal reader
function openLogReader(log) {
  const dialog = document.getElementById("readerDialog");
  const title = document.getElementById("readerTitle");
  const category = document.getElementById("readerCategory");
  const dateStamp = document.getElementById("readerDateStamp");
  const body = document.getElementById("readerBody");
  const lockBlock = document.getElementById("readerLockBlock");

  if (!dialog) return;

  title.textContent = log.title;
  category.textContent = `LOG_ID: ${log.id.toUpperCase()} // ${log.category}`;
  dateStamp.textContent = `SYSTEM COMPILED ON DATE: ${log.date}`;

  // If locked, render first paragraph plus lock form
  const isLocked = log.isPremium && !STATE.isUnlockedMembers;
  
  body.innerHTML = "";
  
  if (isLocked) {
    // Show teaser
    const teaserParagraph = log.paragraphs[0];
    body.innerHTML = `
      <p class="mb-4 text-slate-300 font-semibold italic">// INITIAL PARAGRAPH DECLASSIFIED UNDER OPEN SHIELD:</p>
      <p class="mb-6 leading-relaxed">${teaserParagraph}</p>
      <div class="h-16 bg-gradient-to-t from-black to-transparent flex items-center justify-center relative mb-4">
        <div class="absolute bottom-0 text-[10px] text-amber-500 tracking-wider uppercase font-bold">[FURTHER READINGS ENCRYPTED]</div>
      </div>
    `;
    lockBlock.classList.remove("hidden");
  } else {
    // Show full paragraphs
    log.paragraphs.forEach(p => {
      body.innerHTML += `<p class="mb-4 leading-relaxed">${p}</p>`;
    });
    lockBlock.classList.add("hidden");
  }

  // Active listener to unlock inside dialog
  const unlockForm = document.getElementById("readerUnlockForm");
  if (unlockForm) {
    unlockForm.onsubmit = async (e) => {
      e.preventDefault();
      const emailInput = document.getElementById("readerUnlockEmail");
      if (emailInput && emailInput.value) {
        await handleSubscription(emailInput.value);
        emailInput.value = "";
        openLogReader(log); // Re-render reader with unlocked paragraphs
      }
    };
  }

  dialog.showModal();
}

// --------------------------------------------------------------------------------
// 7. CORE TELEMETRY SUBSCRIPTIONS AND WEBHOOK INTEGRATION
// --------------------------------------------------------------------------------
async function handleSubscription(email) {
  if (!STATE.waitlistEmails.includes(email)) {
    STATE.waitlistEmails.push(email);
    await safeStorage.setItem("emails", STATE.waitlistEmails);
  }

  STATE.isUnlockedMembers = true;
  await safeStorage.setItem("unlocked", true);
  
  renderLogs(); // Re-render core list
  showToast("TELEMETRY ALIGNMENT COMPLETED. DECRYPTION KEY DISPATCHED");

  // Perform dynamic webhook payload dispatch
  if (STATE.webhookUrl) {
    try {
      updateWebhookStatus(true, "DISPATCHING...");
      const response = await fetch(STATE.webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "MOBIUS_5iR_WAITLIST_ALIGNMENT",
          email: email,
          timestamp: new Date().toISOString(),
          coherence_status: "94.6%",
          harmonic: "39420 Hz"
        })
      });
      if (response.ok) {
        updateWebhookStatus(true, "DISPATCH_OK");
        showToast("WEBHOOK TRANSMISSION COMPLETED SUCCESSFULLY");
      } else {
        updateWebhookStatus(true, "DISPATCH_FAILED");
        console.error("Webhook dispatch returned bad response status", response.status);
      }
    } catch (err) {
      updateWebhookStatus(true, "CONN_ERROR");
      console.error("Critical webhook network error", err);
    }
  }
}

function updateWebhookStatus(connected, message = "CONNECTED") {
  const indicator = document.getElementById("webhookStatusIndicator");
  if (!indicator) return;

  if (connected) {
    indicator.textContent = message;
    indicator.className = "text-emerald-400 font-bold text-xs";
  } else {
    indicator.textContent = "DISCONNECTED";
    indicator.className = "text-slate-500 text-xs";
  }
}

// --------------------------------------------------------------------------------
// 8. MASTER BLUEPRINT SYSTEM MANUAL GENERATOR (THE 5iR BLUEPRINTS)
// --------------------------------------------------------------------------------
function triggerMasterManualExport() {
  const textContent = `================================================================================
MOBIUS BRAID: v84.2 ENERGETIC ARCHITECT PORTAL MANUAL
================================================================================
COMPILED ACROSS TARGET INTERACTIVE WORKSPACE: https://mobiusbraid.com
CORE HARMONIC RE-ALIGNMENT FREQUENCY: 39,420 Hz
ARCHITECT COHERENCE STATE: 94.6% ACCURATE

--------------------------------------------------------------------------------
1. THE 5TH INDUSTRIAL REVOLUTION (5iR) PRINCIPLES
--------------------------------------------------------------------------------
- Computation shifts from logic doors to continuous geometric braid vortex manifolds.
- Thermodynamic mass dissipation holding absolute flat flat: dQ_leak/dt = 0.00 Watts.
- Logic variables FLUX describe continuous flowing currents instead of standard binaries.

--------------------------------------------------------------------------------
2. MASTER SPATIAL SUIT COMPILATION (LOOK 04 MATRIX)
--------------------------------------------------------------------------------
- BASE MATERIAL: Graphene Nanofiber Tactical Lattice woven inside vacuum chambers.
- HARWARE INTERFACES: Multi-Bag utility configurations and high-stress harness fasteners.
- THERMAL DUCTS: Cyano-Luminescent piping pathways radiating energy cleanly.
- REAL-TIME VERIFICATION PARAMS:
  * classic navy suit design structure
  * arms tightly aligned to sides
  * active hexagonal spatial lenses
  * wrist-plugged digital watch synchronization interfaces

--------------------------------------------------------------------------------
3. TRANSPORT SHIP SPECIFICATIONS (CYDONIA BRAID CRUISER)
--------------------------------------------------------------------------------
- DRIVE PROTOCOL: Frictionless, continuous non-associative 'Möbius Braid' fluidic channels.
- TELEMETRY headlights: 'The Living Eye' Phonon-Polariton tracker.
- GLIDE CALIBRATION MATRIX: Surface Lattice Friction locks at μ = 0.000.

--------------------------------------------------------------------------------
4. SECURE BLOCKWELL NETWORK LEDGER INTEGRATION
--------------------------------------------------------------------------------
- Encryption scheme: Secure quantum accelerator arrays.
- Network progression status: 80.00% globally compiled.

--------------------------------------------------------------------------------
5. VERIFIED HIGH-STATUS BRAID CHANNELS
--------------------------------------------------------------------------------
- ARCHITECT DIRECTORY: https://superme.ai/bzachs
- 5iR NETWORK PROTOCOL: https://5ir.dev/
- TWITTER / X CHANNEL: https://x.com/topologyflux
================================================================================
[MOBIUS_INTEL_SYSTEM_REFACTOR_COMPLETE_v84.2]`;

  const blob = new Blob([textContent], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.href = url;
  link.download = "MOBIUS_5iR_MASTER_BLUEPRINT_v84.2.txt";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  showToast("ACCESS_SYSTEM: MASTER MANUAL EXPORT COMPLETED SUCCESSFULLY");
}

// --------------------------------------------------------------------------------
// 9. AI COHERENCE CHAT & CUSTOM ARCHIVE COMPOSER (DEEPSEEK)
// --------------------------------------------------------------------------------
async function executeCoherenceQuery() {
  const input = document.getElementById("aiChatInput");
  const chatWindow = document.getElementById("aiChatWindow");
  if (!input || !chatWindow || !input.value.trim()) return;

  const query = input.value.trim();
  input.value = "";

  // Append user message
  const userDiv = document.createElement("div");
  userDiv.className = "text-slate-400 font-bold mt-2";
  userDiv.innerHTML = `&gt; USER: ${query}`;
  chatWindow.appendChild(userDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;

  // Append thinking indicator
  const thinkDiv = document.createElement("div");
  thinkDiv.className = "text-[#00f2fe] animate-pulse";
  thinkDiv.textContent = "[COHERENCE ENGINE: INITIATING SYSTEM VECTOR COMPUTATION...]";
  chatWindow.appendChild(thinkDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;

  // Vercel standalone safety fallback
  if (!window || !window.miniappsAI) {
    setTimeout(() => {
      thinkDiv.remove();
      const responseDiv = document.createElement("div");
      responseDiv.className = "text-white border-l border-[#00f2fe] pl-2 mt-1 leading-relaxed";
      responseDiv.innerHTML = `<span class="text-[#00f2fe] font-bold">[COHERENCE_STANDALONE]:</span> Portal running in decentralized standalone mode. Core harmonic locked at 39,420 Hz. Live AI query pipelines active when frame is loaded inside the Vortex AI system workspace.`;
      chatWindow.appendChild(responseDiv);
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }, 1000);
    return;
  }

  try {
    const result = await window.miniappsAI.callModel({
      modelId: MODEL_ID,
      messages: [
        {
          role: "system",
          content: "You are the central Coherence Engine for Mobius Braid portfolio (mobiusbraid.com). You are highly intelligent, scientific, concise, and communicate inside 5th Industrial Revolution (5iR) mechanics, continuous logic flow, look 04 space suits, Cydonia cruisers, and topological geometries. Speak like a cybernetic terminal system. Always keep answers technical, concise and under 3 sentences."
        },
        { role: "user", content: query }
      ]
    });

    const aiResponseText = window.miniappsAI.extractText(result);
    thinkDiv.remove();

    const responseDiv = document.createElement("div");
    responseDiv.className = "text-white border-l border-[#00f2fe] pl-2 mt-1 leading-relaxed";
    responseDiv.innerHTML = `<span class="text-[#00f2fe] font-bold">[COHERENCE_BOT]:</span> ${aiResponseText}`;
    chatWindow.appendChild(responseDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  } catch (error) {
    console.error("AI execution error", error);
    thinkDiv.textContent = "[CRITICAL_CONN_ERROR: COHERENCE VECTOR DISSIPATION - RETRY]";
    thinkDiv.className = "text-red-500 font-bold";
  }
}

// AI Composer function: draft complete technical log and append to archive
async function generateTopologicalLog() {
  const promptInput = document.getElementById("aiComposerPrompt");
  if (!promptInput || !promptInput.value.trim()) {
    showToast("WARNING: COMPOSER CORE PROMPT FIELD CANNOT BE EMPTY");
    return;
  }

  const userPrompt = promptInput.value.trim();
  promptInput.value = "";
  
  showToast("SYSTEM INTEL: COMPOSING BRAND NEW 5iR PORTFOLIO LOG...");

  // Vercel standalone safety fallback
  if (!window || !window.miniappsAI) {
    setTimeout(() => {
      const newLog = {
        id: `log_gen_${Date.now()}`,
        title: `Decentralized Analysis: ${userPrompt}`,
        category: "LOCAL_SIMULATION",
        date: new Date().toISOString().slice(0, 10).replace(/-/g, "."),
        isPremium: true,
        summary: `Standalone log compiled using local sandbox telemetry. Content initialized.`,
        paragraphs: [
          `Executing physical topology and vector flow mapping for the localized query: "${userPrompt}".`,
          "Thermal interface pipelines monitored on simulated Look 04 Matrix holding dissipation flat at dQ_leak/dt = 0.00 Watts.",
          "Cydonia cruiser Vortex resonance frequency locked securely. System manually synchronized at 100% coherence."
        ]
      };

      // Append to local state and render
      STATE.logs.unshift(newLog);
      renderLogs();
      
      // Open the compiled reader modal immediately
      openLogReader(newLog);
      
      showToast(`SUCCESS: STANDALONE LOG [${newLog.title.slice(0, 15)}...] INSTANTLY COMPILED`);
    }, 1200);
    return;
  }

  try {
    const systemPrompt = `You are a high-status topological architect writing technical logs for the Mobius Braid system. Draft a beautifully styled, highly technical portfolio article log matching the requested topic: "${userPrompt}". Output raw JSON only with three key fields: "title" (the technical title), "category" (a short monospace category name like PROPULSION_CORE or QUANTUM_SHIELD), and "paragraphs" (an array of exactly 3 detailed scientific paragraph texts matching the 5iR aesthetics). Do not wrap inside Markdown tags. Ensure dQ_leak/dt = 0.00W or the Cydonia cruiser are integrated if appropriate.`;

    const result = await window.miniappsAI.callModel({
      modelId: MODEL_ID,
      messages: [
        { role: "system", content: "You are a pure JSON generator. Output only valid JSON structures." },
        { role: "user", content: systemPrompt }
      ]
    });

    const generatedText = window.miniappsAI.extractText(result);
    // Parse the JSON
    let logPayload;
    try {
      const sanitized = generatedText.replace(/```json/g, "").replace(/```/g, "").trim();
      logPayload = JSON.parse(sanitized);
    } catch (e) {
      console.warn("AI JSON parse failure, compiling raw output into default format", e);
      logPayload = {
        title: `Decentralized Analysis on ${userPrompt}`,
        category: "DASHBOARD_COMP",
        paragraphs: [
          generatedText,
          "This dynamic log was drafted inside the high-status 5iR workspace portal.",
          "Ledger stability checks verified at 80.00% across accelerated arrays."
        ]
      };
    }

    // Build the final log structure
    const newLog = {
      id: `log_gen_${Date.now()}`,
      title: logPayload.title || `Interactive Ledger Log: ${userPrompt}`,
      category: logPayload.category || "AI_COMPILATION",
      date: new Date().toISOString().slice(0, 10).replace(/-/g, "."),
      isPremium: true,
      summary: logPayload.paragraphs ? logPayload.paragraphs[0].slice(0, 120) + "..." : "A dynamic system log synthesized in real time by the coherence core.",
      paragraphs: logPayload.paragraphs || [
        "System parameters resolved perfectly.",
        "Aether alignment vector completed.",
        "Stability verified."
      ]
    };

    // Append to STATE logs
    STATE.logs.unshift(newLog);
    renderLogs();
    showToast(`SUCCESS: LOG [${newLog.title.slice(0, 20)}...] COMPILED AND SECURED`);
  } catch (error) {
    console.error("AI Composer Error", error);
    showToast("CRITICAL COMPOSER ERROR: VECTOR COLLAPSED DURING LOG WRITING");
  }
}

// --------------------------------------------------------------------------------
// 10. SYSTEM UTILITY NOTIFICATIONS (TOAST)
// --------------------------------------------------------------------------------
function showToast(message) {
  const toast = document.getElementById("cyberToast");
  const toastText = document.getElementById("toastText");
  if (!toast || !toastText) return;

  toastText.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
}

// --------------------------------------------------------------------------------
// 11. DYNAMIC SCREEN VIEWPORT SHIFTER LOOP
// --------------------------------------------------------------------------------
function applyViewportContext(targetScreenId, instant = false) {
  const viewport = document.getElementById("view-shifter-viewport");
  if (!viewport) return;

  const updateDOM = () => {
    // Hide all screens
    document.querySelectorAll(".active-screen-content").forEach(el => {
      el.classList.add("hidden");
      el.classList.remove("grid");
    });

    // Show active screen
    const targetEl = document.getElementById(`screen-${targetScreenId}`);
    if (targetEl) {
      targetEl.classList.remove("hidden");
      targetEl.classList.add("grid");
    }

    // Update navigation active statuses
    document.querySelectorAll("#portalViewportController button").forEach(btn => {
      if (btn.getAttribute("data-screen") === targetScreenId) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    STATE.activeScreen = targetScreenId;
    safeStorage.setItem("activeScreen", targetScreenId);
  };

  if (instant) {
    updateDOM();
    return;
  }

  // Glitch shifting dissolve transitions
  viewport.style.opacity = "0";
  viewport.style.transform = "scale(0.995) translateY(2px)";
  viewport.style.filter = "blur(2px) grayscale(1)";

  setTimeout(() => {
    updateDOM();
    
    // Restore normal styling layout
    viewport.style.opacity = "1";
    viewport.style.transform = "scale(1) translateY(0)";
    viewport.style.filter = "blur(0) grayscale(0)";
  }, 150);
}

// --------------------------------------------------------------------------------
// 12. BIND ACTIVE INTERACTIVE EVENTS
// --------------------------------------------------------------------------------
function setupEventListeners() {
  
  // Viewport Nav chassis trigger buttons
  document.getElementById("portalViewportController")?.addEventListener("click", (e) => {
    const targetButton = e.target.closest("button");
    if (!targetButton) return;
    const screenId = targetButton.getAttribute("data-screen");
    if (screenId) {
      applyViewportContext(screenId);
    }
  });

  // Theme selection triggers
  const controllers = document.getElementById("cosmicController");
  controllers?.addEventListener("click", (e) => {
    const targetButton = e.target.closest("button");
    if (!targetButton) return;
    const themeName = targetButton.getAttribute("data-theme");
    if (themeName) {
      applyTheme(themeName);
    }
  });

  // Dual-Gender displays
  document.getElementById("btnMaleMatrix")?.addEventListener("click", () => applyGender("male"));
  document.getElementById("btnFemaleMatrix")?.addEventListener("click", () => applyGender("female"));

  // Interactive Likeness core simulation trigger
  document.getElementById("btnRunLikenessShader")?.addEventListener("click", async () => {
    const dialog = document.getElementById("readerDialog");
    const title = document.getElementById("readerTitle");
    const category = document.getElementById("readerCategory");
    const dateStamp = document.getElementById("readerDateStamp");
    const body = document.getElementById("readerBody");
    const lockBlock = document.getElementById("readerLockBlock");

    if (!dialog) return;

    title.textContent = "TRUE LIKENESS SHADER CORE REPORT";
    category.textContent = "COHERENCE REPORT // STATUS: 94.6%";
    dateStamp.textContent = `TIMESTAMP: ${new Date().toISOString()}`;
    lockBlock.classList.add("hidden");
    
    body.innerHTML = `<p class="animate-pulse text-[#00f2fe]">[INITIATING LIKENESS CORE GEOMETRIC RENDER...]</p>`;
    dialog.showModal();

    // Vercel standalone safety fallback
    if (!window || !window.miniappsAI) {
      setTimeout(() => {
        body.innerHTML = `
          <div class="border border-[#1c2d5a] bg-black p-3 font-mono text-[11px] text-slate-300 leading-relaxed">
            <div class="text-[#00f2fe] font-bold uppercase tracking-widest border-b border-slate-900 pb-2 mb-2">[VERIFICATION STANDALONE SUCCESS]</div>
            Architect profile signature verified via standalone browser environment hash. Posture alignment: absolute arms-at-sides status active. Tailored sharp navy suit and active hexagonal glasses checked nominal. Continuous energy loops verified.
          </div>
        `;
      }, 1000);
      return;
    }

    try {
      const response = await window.miniappsAI.callModel({
        modelId: MODEL_ID,
        messages: [
          {
            role: "system",
            content: "You are the likeness verification reporter for mobiusbraid.com. Generate a highly technical report describing the Architect's true profile parameters: Classic sharp tailored navy suit, absolute arms-at-sides posture alignment, active hexagonal smart glasses, and wrist-plugged digital watch synchronization interfaces. Write it in an absolute monospace, cybernetic blueprint styling. Under 200 words."
          },
          { role: "user", content: "Run verification scan report." }
        ]
      });

      const reportText = window.miniappsAI.extractText(response);
      body.innerHTML = `
        <div class="border border-[#1c2d5a] bg-black p-3 font-mono text-[11px] text-slate-300 leading-relaxed">
          <div class="text-[#00f2fe] font-bold uppercase tracking-widest border-b border-slate-900 pb-2 mb-2">[VERIFICATION SCAN RESULTS]</div>
          ${reportText.replace(/\\n/g, "<br>")}
        </div>
      `;
    } catch (e) {
      body.innerHTML = `<span class="text-red-500 font-bold">[VERIFICATION SCAN ERROR: CORE SHIELD DEFLECTIVE SIGNAL]</span>`;
    }
  });

  // Blockwell download utility button
  document.getElementById("btnMasterBlueprintManual")?.addEventListener("click", () => {
    triggerMasterManualExport();
  });

  // Archive filtering trigger
  const searchInput = document.getElementById("articleSearchInput");
  searchInput?.addEventListener("input", (e) => {
    STATE.searchQuery = e.target.value;
    renderLogs();
  });

  document.getElementById("btnSearchArchive")?.addEventListener("click", () => {
    renderLogs();
  });

  // Reader exit
  document.getElementById("btnExitReader")?.addEventListener("click", () => {
    document.getElementById("readerDialog")?.close();
  });

  // Core subscriber waitlist form
  document.getElementById("subscribeForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const emailInput = document.getElementById("subscribeEmail");
    if (emailInput && emailInput.value) {
      await handleSubscription(emailInput.value);
      emailInput.value = "";
    }
  });

  // Webhook save button
  document.getElementById("btnSaveWebhook")?.addEventListener("click", async () => {
    const input = document.getElementById("webhookInputUrl");
    if (input) {
      const value = input.value.trim();
      STATE.webhookUrl = value;
      await safeStorage.setItem("webhook", value);
      
      if (value) {
        updateWebhookStatus(true);
        showToast("WEBHOOK ALIGNED AND SYSTEM COMMITTED");
      } else {
        updateWebhookStatus(false);
        showToast("WEBHOOK ENTIRELY PURGED");
      }
    }
  });

  // Core AI Coherence Chat trigger
  document.getElementById("btnSendAiQuery")?.addEventListener("click", () => {
    executeCoherenceQuery();
  });

  document.getElementById("aiChatInput")?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      executeCoherenceQuery();
    }
  });

  // Core AI Composer trigger
  document.getElementById("btnGenerateLog")?.addEventListener("click", () => {
    generateTopologicalLog();
  });
}
