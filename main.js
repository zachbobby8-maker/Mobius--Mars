/**
 * 5iR Core Matrix Command Dashboard - Unified System Core
 * Synchronized Clock: 39,420 Hz // Global Coherence: 94.6% Locked
 * Consolidated single-file engine running 4 interactive master applications.
 * Zero flat layouts, zero boring tables, zero 404 relative loading issues.
 */

// Global tracking of the last active dark-theme dashboard page
let lastActiveTab = 'vortex-retain';

// Local fallback dictionary for i18n translation
const LOCAL_TRANSLATIONS = {
  "system.ping": "SYSTEM SECURE // BRAID_CLUSTER_SQX",
  "system.title": "5iR CORE MATRIX COMMAND HUD",
  "system.frequency": "FREQUENCY",
  "system.thermal": "THERMAL FOOTPRINT",
  "system.active_mesh": "ACTIVE MESH",
  "system.coherence": "COHERENCE",
  "system.lead": "Sovereign Lead",
  "system.query_id": "QUERY ID",
  "app1.title": "APP 01: \"VORTEX-RETAIN\" SKELETAL MATRIX SIMULATOR",
  "app1.age_lbl": "USER AGE (YEARS)",
  "app1.exercise_lbl": "EXERCISE FREQUENCY (HOURS/WEEK)",
  "app1.gravity_lbl": "GRAVITATIONAL STRAIN (G-FORCE)",
  "app1.export_btn": "[EXPORT_SKELETAL_RETENTION_REPORT]",
  "app2.title": "APP 02: \"BRAID-SHIELD\" FERROFLUID CRYPTO LEDGER",
  "app2.balance_title": "LEDGER STATE VECTOR",
  "app2.balance_val": "80.00% Collective Core Completion State",
  "app2.exploit_btn": "[RUN_EXPLOIT_TEST_SIMULATION]",
  "app3.title": "APP 03: \"AERO-INVERT\" URBAN ACOUSTIC CONVERSION ENGINE",
  "app3.city_lbl": "SELECT URBAN SECTOR",
  "app3.db_lbl": "AMBIENT NOISE THRESHOLD (dBA)",
  "app3.mode_lbl": "ACOUSTIC INVERSION SYSTEM",
  "profile.header": "COHERENT IDENTITY SIGNATURE",
  "profile.id": "IDENTITY HANDLE:",
  "profile.mail": "SECURE MAIL:",
  "profile.copy": "COPY",
  "profile.x": "X PROTOCOL:",
  "profile.clearance": "SECURITY CLEARANCE:",
  "profile.clearance_val": "LEGENDRIAN CLASS-1 [MÖBIUS LEVEL]",
  "profile.comp_assoc": "COMPILATION ASSOC:",
  "profile.assoc_val": "COHERENT MATRIX // 39,420 Hz",
  "profile.test_btn": "TEST LATTICE INTEGRITY",
  "profile.footer": "dQ_leak = 0.00W // COHERENCE 94.6% STABLE"
};

function getPredefinedTranslation(key) {
  return LOCAL_TRANSLATIONS[key] || key;
}

document.addEventListener('DOMContentLoaded', () => {
  console.log(">> 5iR MASTER APPLICATION COMPILATION ENGAGED @ 39,420 Hz");
  console.log(">> ZERO-ENTROPY THERMAL STATE BOUNDS OK (dQ_leak/dt = 0.00W)");

  // Translate DOM based on active i18n
  translateDOM();

  // Initialize dedicated starting portal router (Page 1 Gatekeeper)
  try {
    initGatewayPortalSystem();
  } catch (err) {
    console.error("Gateway Portal init fault:", err);
  }

  // Initialize individual subsystems
  try {
    initSystemTelemetry();
  } catch (err) {
    console.error("Telemetry init fault:", err);
  }

  try {
    initVortexRetainApp();
  } catch (err) {
    console.error("App 01 (Vortex-Retain) fault:", err);
  }

  try {
    initBraidShieldApp();
  } catch (err) {
    console.error("App 02 (Braid-Shield) fault:", err);
  }

  try {
    initAeroInvertApp();
  } catch (err) {
    console.error("App 03 (Aero-Invert) fault:", err);
  }

  try {
    initHydroGridApp();
  } catch (err) {
    console.error("App 05 (Hydro-Grid) fault:", err);
  }

  try {
    initVortexAiApp();
  } catch (err) {
    console.error("App 04 (Vortex-AI) fault:", err, err.message, err.stack);
  }

  try {
    initTabNavigation();
  } catch (err) {
    console.error("Tab Navigation init fault:", err);
  }

  try {
    initArchitectProfile();
  } catch (err) {
    console.error("Profile system fault:", err);
  }

  try {
    initClearSigCanvas();
  } catch (err) {
    console.error("Clear Sig Canvas init fault:", err);
  }
});

/**
 * Robust i18n DOM translation layer
 */
function translateDOM() {
  const i18n = window.miniappI18n;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (i18n && typeof i18n.t === 'function') {
      el.textContent = i18n.t(key);
    } else {
      const val = getPredefinedTranslation(key);
      if (val) el.textContent = val;
    }
  });
}

/**
 * Tab Navigation Controller - Swaps between dedicated fullscreen application pages
 */
function initTabNavigation() {
  const tabButtons = document.querySelectorAll('.hud-tab-btn');
  const mainGrid = document.getElementById('hud-main-grid');
  const apps = {
    'vortex-retain': document.getElementById('app-vortex-retain'),
    'braid-shield': document.getElementById('app-braid-shield'),
    'aero-invert': document.getElementById('app-aero-invert'),
    'hydro-grid': document.getElementById('app-hydro-grid'),
    'vortex-ai': document.getElementById('app-vortex-ai')
  };

  if (!mainGrid) return;

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const activeTab = btn.getAttribute('data-tab');

      if (activeTab === 'vortex-ai') {
        // Transition directly to the gorgeous Page 3 Clear Deck view!
        const launchBtn = document.getElementById('launch-clear-page-btn');
        if (launchBtn) {
          launchBtn.click();
        }
        return;
      }

      // Record the last active dark-theme dashboard page
      lastActiveTab = activeTab;

      // Toggle active states
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Fullscreen single app interface mode
      mainGrid.className = 'hud-dashboard-grid grid-cols-1 w-full max-w-full';
      Object.entries(apps).forEach(([key, app]) => {
        if (app) {
          if (key === activeTab) {
            app.classList.remove('hidden');
          } else {
            app.classList.add('hidden');
          }
        }
      });
    });
  });
}

/**
 * System Telemetry (Ping Indicators, Jitter, Distributed node loops)
 */
function initSystemTelemetry() {
  const nodesEl = document.getElementById('header-nodes');
  const coherenceEl = document.getElementById('coherence-value');
  const clearCoherenceEl = document.getElementById('clear-coherence-value');

  let nodesCount = 1.400;
  setInterval(() => {
    // Slight lifelike count jittering around 1.40M nodes
    nodesCount += (Math.random() * 0.002 - 0.0008);
    if (nodesCount < 1.35) nodesCount = 1.400;
    if (nodesEl) nodesEl.textContent = `${nodesCount.toFixed(3)}M NODES`;

    // System coherence locked exactly at 94.6% but slightly moving for realism
    const jitter = 94.60 - (Math.random() * 0.04);
    if (coherenceEl) {
      coherenceEl.textContent = `${jitter.toFixed(2)}%`;
    }
    if (clearCoherenceEl) {
      clearCoherenceEl.textContent = `${jitter.toFixed(2)}% (STABLE)`;
    }
  }, 2000);
}

/**
 * APPLICATION 1: "VORTEX-RETAIN" SKELETAL MATRIX SIMULATOR
 * Visualizing micro-structural bone cellular matrix lattice decay in response to bio-variables.
 */
function initVortexRetainApp() {
  const ageSlider = document.getElementById('vortex-age-slider');
  const exerciseSlider = document.getElementById('vortex-exercise-slider');
  const gravitySlider = document.getElementById('vortex-gravity-slider');

  const ageDisplay = document.getElementById('age-val-display');
  const exerciseDisplay = document.getElementById('exercise-val-display');
  const gravityDisplay = document.getElementById('gravity-val-display');

  const telemetryText = document.getElementById('app1-telemetry-text');
  const exportBtn = document.getElementById('export-skeletal-btn');

  const canvas = document.getElementById('skeletal-lattice-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let age = 25;
  let exercise = 12;
  let gravity = 1.0; // represented scaled 0 to 50 (divided by 10)

  // 3D Matrix Node points setup (Hex-comb osteoblast matrix layout)
  const nodes = [];
  const edges = [];
  const rings = 5;
  const pointsPerRing = 8;
  const cylinderHeight = 120;
  const radius = 40;

  // Generate 3D cylindrical skeleton scaffold
  for (let r = 0; r < rings; r++) {
    const z = -cylinderHeight / 2 + (r / (rings - 1)) * cylinderHeight;
    for (let p = 0; p < pointsPerRing; p++) {
      const theta = (p / pointsPerRing) * Math.PI * 2;
      const x = radius * Math.cos(theta);
      const y = radius * Math.sin(theta);
      nodes.push({ x, y, z, originalX: x, originalY: y, originalZ: z });
    }
  }

  // Set up structural connection edges
  for (let r = 0; r < rings; r++) {
    for (let p = 0; p < pointsPerRing; p++) {
      const currentIdx = r * pointsPerRing + p;
      // Connect to next node in the same ring
      const nextRingIdx = r * pointsPerRing + ((p + 1) % pointsPerRing);
      edges.push({ u: currentIdx, v: nextRingIdx, original: true });

      // Connect to corresponding node in the next ring down
      if (r < rings - 1) {
        const adjacentRingIdx = (r + 1) * pointsPerRing + p;
        edges.push({ u: currentIdx, v: adjacentRingIdx, original: true });
        
        // Diagonal cross struts for structural rigidity
        const diagIdx = (r + 1) * pointsPerRing + ((p + 1) % pointsPerRing);
        edges.push({ u: currentIdx, v: diagIdx, original: false });
      }
    }
  }

  let angleY = 0.005;
  let angleX = 0.003;

  function updateLatticeState() {
    age = parseInt(ageSlider.value, 10);
    exercise = parseInt(exerciseSlider.value, 10);
    gravity = parseFloat(gravitySlider.value) / 10;

    // Display updates
    if (ageDisplay) ageDisplay.textContent = `${age} yrs`;
    if (exerciseDisplay) exerciseDisplay.textContent = `${exercise} hrs/wk`;
    
    let gravityLabel = `${gravity.toFixed(1)}G`;
    if (gravity === 0) gravityLabel += " (ZERO-GRAVITY)";
    else if (gravity === 1.0) gravityLabel += " (EARTH)";
    else if (gravity === 5.0) gravityLabel += " (HYPER-GRAVITY CRITICAL)";
    if (gravityDisplay) {
      gravityDisplay.textContent = gravityLabel;
      if (gravity > 3.0 || gravity === 0) {
        gravityDisplay.className = "text-magenta font-bold";
      } else {
        gravityDisplay.className = "text-cyan font-bold";
      }
    }

    // Structural coherence calculations
    // Base healthy is high exercise, low gravity strain, younger age.
    let gravityImpact = 0;
    if (gravity === 0) gravityImpact = 35;
    else if (gravity > 1.0) gravityImpact = (gravity - 1.0) * 8; // high load strain

    let rawCoherence = 98.0 - (age * 0.35) + (exercise * 1.2) - gravityImpact;
    if (rawCoherence > 98.0) rawCoherence = 98.0;
    if (rawCoherence < 15.0) rawCoherence = 15.0;

    if (telemetryText) {
      telemetryText.textContent = `Diagnostic Instrument: 5iR Laser Scan Confocal Microscope // System Perfusion Sync: 39,420 Hz // Structural Coherence: ${rawCoherence.toFixed(1)}%`;
      if (rawCoherence < 50) {
        telemetryText.className = "log-val text-magenta animate-pulse text-[8.5px]";
      } else {
        telemetryText.className = "log-val text-grey text-[8.5px]";
      }
    }

    return rawCoherence;
  }

  function render() {
    // Dynamic size scaling to prevent blurriness
    const containerW = canvas.parentElement.clientWidth || 300;
    const containerH = 180;
    if (canvas.width !== containerW || canvas.height !== containerH) {
      canvas.width = containerW;
      canvas.height = containerH;
    }

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const coherence = updateLatticeState();
    const isBrittle = coherence < 60;
    const decayFactor = (100 - coherence) / 100; // 0 to 1

    // Rotation matrices
    const cosY = Math.cos(angleY);
    const sinY = Math.sin(angleY);
    const cosX = Math.cos(angleX);
    const sinX = Math.sin(angleX);

    // Compute rotated 2D coordinates for all 3D nodes
    const projected = [];
    const shakeAmount = isBrittle ? (decayFactor * 4) : 0;

    nodes.forEach(node => {
      // Rotate Y
      let x1 = node.x * cosY - node.z * sinY;
      let z1 = node.x * sinY + node.z * cosY;
      // Rotate X
      let y2 = node.y * cosX - z1 * sinX;
      let z2 = node.y * sinX + z1 * cosX;

      // Apply dynamic bio-decay bone jitter (trembling of fractured bonds)
      if (shakeAmount > 0) {
        x1 += (Math.random() - 0.5) * shakeAmount;
        y2 += (Math.random() - 0.5) * shakeAmount;
      }

      // Simple perspective projection
      const zoom = 140;
      const perspective = 300;
      const scale = perspective / (perspective + z2);
      const projX = w / 2 + x1 * scale * 1.3;
      const projY = h / 2 + y2 * scale * 1.1;

      projected.push({ x: projX, y: projY, z: z2, visible: true });
    });

    // Draw lines (connections)
    edges.forEach((edge, index) => {
      // Under high decay, randomly omit some bone structural links (brittle fractures)
      const fractureThreshold = coherence / 100;
      const pseudoRand = (index * 17) % 100 / 100;
      if (pseudoRand > fractureThreshold) {
        return; // Broken strut
      }

      const p1 = projected[edge.u];
      const p2 = projected[edge.v];

      // Draw bone mineral bridge connection
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);

      // Color spectrum changes from vibrant cyano-blue (healthy) to fractured red/magenta (brittle)
      if (isBrittle) {
        ctx.strokeStyle = `rgba(244, 63, 94, ${0.15 + (1 - decayFactor) * 0.45})`;
        ctx.lineWidth = 0.8;
      } else {
        ctx.strokeStyle = `rgba(255, 215, 0, ${0.4 + (1 - decayFactor) * 0.4})`;
        ctx.lineWidth = edge.original ? 1.5 : 0.8;
      }
      ctx.stroke();
    });

    // Draw glowing node osteocytes
    projected.forEach((p, idx) => {
      ctx.beginPath();
      const nodeSize = isBrittle ? (2 + (idx % 2 === 0 ? 1 : -1)) : 3.5;
      ctx.arc(p.x, p.y, Math.max(0.5, nodeSize), 0, Math.PI * 2);
      
      if (isBrittle) {
        ctx.fillStyle = '#f43f5e';
        ctx.shadowBlur = 0;
      } else {
        ctx.fillStyle = '#ffd700';
        ctx.shadowColor = '#ffd700';
        ctx.shadowBlur = 6;
      }
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    // Slow orbital camera rotation
    angleY += 0.006;
    angleX += 0.004;

    requestAnimationFrame(render);
  }

  // Trigger first render
  render();

  // Export report functionality
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const coherence = updateLatticeState();
      const reportOverlay = document.getElementById('skeletal-report-overlay');
      const reportPre = document.getElementById('report-text-pre');
      
      const timestamp = new Date().toISOString();
      const reportContent = `========================================================
5iR SKELETAL RETENTION MATRIX DIAGNOSTIC PROTOCOL
========================================================
TIMESTAMP: ${timestamp}
INSTRUMENT: 5iR Laser Scan Confocal Microscope
FREQUENCY: 39,420 Hz // PHASE LOCK = TRUE
COHERENCE CEILING: 94.6% BASELINE

[METADATA INPUT COEFFICIENTS]
--------------------------------------------------------
- Subject Simulated Age   : ${age} Years Old
- Weekly Exercise Strain  : ${exercise} Hours/Week
- Gravitational Constant  : ${gravity.toFixed(1)} G-Force

[DIAGNOSTIC TELEMETRY ANALYSIS]
--------------------------------------------------------
- Structural Rigidity Index  : ${(coherence * 1.05).toFixed(2)}%
- Bone Density Coherence     : ${coherence.toFixed(2)}%
- Micro-Fracture Likelihood  : ${coherence < 50 ? 'CRITICAL HIGH-RISK' : coherence < 75 ? 'MODERATE WARNING' : 'STABLE SECURE'}
- Phase-locked perfusion rate: 39.42 kHz

[RECOMMENDED PHASE INTERVENTION]
--------------------------------------------------------
${coherence < 50 ? '>> CRITICAL ALERT: Engage localized Möbiusian acoustic bone perfusion field stimulation (39.42 kHz).\n>> Increase gravitational loading parameters toward Earth 1.0G.' : coherence < 75 ? '>> OPTIMIZATION REQUIRED: Maintain target exercise metrics > 10 hours/week.\n>> Calibrate non-associative topological wave perfusion.' : '>> LATTICE SYSTEM STABLE: No micro-fractural senescence detected. Keep operating at zero-entropy state.'}

========================================================
Sovereign Lead Authority approval code: MOBIUS_BRAID_946
========================================================`;

      if (reportPre) reportPre.textContent = reportContent;
      if (reportOverlay) {
        reportOverlay.classList.remove('profile-overlay-hidden');
        reportOverlay.classList.add('profile-overlay-visible');
      }

      // Handle download trigger inside modal
      const downloadBtn = document.getElementById('download-report-btn');
      if (downloadBtn) {
        const newBtn = downloadBtn.cloneNode(true);
        downloadBtn.parentNode.replaceChild(newBtn, downloadBtn);
        newBtn.addEventListener('click', () => {
          const blob = new Blob([reportContent], { type: 'text/plain' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `SKELETAL_RETENTION_REPORT_${age}Y_${gravity}G.txt`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        });
      }
    });
  }

  // Handle report close
  const closeReportBtn = document.getElementById('close-report-btn');
  if (closeReportBtn) {
    closeReportBtn.addEventListener('click', () => {
      const reportOverlay = document.getElementById('skeletal-report-overlay');
      if (reportOverlay) {
        reportOverlay.classList.remove('profile-overlay-visible');
        reportOverlay.classList.add('profile-overlay-hidden');
      }
    });
  }
}

/**
 * APPLICATION 2: "BRAID-SHIELD" FERROFLUID CRYPTO LEDGER
 * Responsive ferrofluid droplet physics simulator reacting with spicules and spikes on cursor hover or exploit triggering.
 */
function initBraidShieldApp() {
  const canvas = document.getElementById('ferrofluid-shield-canvas');
  const interactionArea = document.getElementById('ferrofluid-interaction-area');
  const exploitBtn = document.getElementById('run-exploit-simulation-btn');
  const telemetryText = document.getElementById('app2-telemetry-text');

  if (!canvas || !interactionArea) return;
  const ctx = canvas.getContext('2d');

  let mouse = { x: -1000, y: -1000, active: false };
  let isUnderAttack = false;
  let attackTimer = 0;
  let time = 0;

  // Track cursor position on canvas
  interactionArea.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
  });

  interactionArea.addEventListener('mouseleave', () => {
    mouse.active = false;
    mouse.x = -1000;
    mouse.y = -1000;
  });

  // Tap/touch support for mobile
  interactionArea.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.touches[0].clientX - rect.left;
      mouse.y = e.touches[0].clientY - rect.top;
      mouse.active = true;
    }
  });

  interactionArea.addEventListener('touchend', () => {
    mouse.active = false;
    mouse.x = -1000;
    mouse.y = -1000;
  });

  if (exploitBtn) {
    exploitBtn.addEventListener('click', () => {
      isUnderAttack = true;
      attackTimer = 180; // active attack state for 3 seconds (180 frames)
      exploitBtn.disabled = true;
      exploitBtn.textContent = "[EXPL_TEST_ACTIVE // DEPLOYING VECTOR SHUNT]";

      if (telemetryText) {
        telemetryText.textContent = "Cryptographic Base: Legendrian Braid Torsion // Status: Attack Neutralized [SHUNT ACTIVE] // Energy Leakage: 0.00W Flat";
        telemetryText.className = "log-val text-magenta animate-pulse text-[8.5px]";
      }
    });
  }

  function renderFerrofluid() {
    const w = canvas.parentElement.clientWidth || 300;
    const h = 210;
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }

    ctx.clearRect(0, 0, w, h);
    time += 0.04;

    const centerX = w / 2;
    const centerY = h / 2;
    const baseRadius = 45;

    // Detect if hover is near the central fluid droplet perimeter
    let distanceToCenter = 999;
    if (mouse.active) {
      const dx = mouse.x - centerX;
      const dy = mouse.y - centerY;
      distanceToCenter = Math.sqrt(dx * dx + dy * dy);
    }

    const hoverProximity = (mouse.active && distanceToCenter < 120);
    const spikeIntensity = isUnderAttack ? Math.sin(time * 2) * 20 + 25 : hoverProximity ? (120 - distanceToCenter) / 3 : 0;

    // Update state parameters & reset alert button
    if (isUnderAttack) {
      attackTimer--;
      if (attackTimer <= 0) {
        isUnderAttack = false;
        if (exploitBtn) {
          exploitBtn.disabled = false;
          exploitBtn.textContent = "[RUN_EXPLOIT_TEST_SIMULATION]";
        }
        if (telemetryText) {
          telemetryText.textContent = "Cryptographic Base: Legendrian Braid Torsion // Status: Steady State // Energy Leakage: 0.00W Flat";
          telemetryText.className = "log-val text-grey text-[8.5px]";
        }
      }
    } else if (hoverProximity) {
      if (telemetryText) {
        telemetryText.textContent = "Cryptographic Base: Legendrian Braid Torsion // Status: Shunting Node Activity // Energy Leakage: 0.00W Flat";
        telemetryText.className = "log-val text-cyan text-[8.5px]";
      }
    } else {
      if (telemetryText && !isUnderAttack) {
        telemetryText.textContent = "Cryptographic Base: Legendrian Braid Torsion // Status: Steady State // Energy Leakage: 0.00W Flat";
        telemetryText.className = "log-val text-grey text-[8.5px]";
      }
    }

    // Draw background security grid
    ctx.strokeStyle = 'rgba(88, 80, 236, 0.04)';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 25) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let y = 0; y < h; y += 25) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    // Outer defensive vector loop boundary
    ctx.strokeStyle = isUnderAttack ? 'rgba(244, 63, 94, 0.35)' : hoverProximity ? 'rgba(255, 215, 0, 0.25)' : 'rgba(217, 119, 6, 0.15)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.arc(centerX, centerY, baseRadius + 40, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // DRAW FERROFLUID DROPLET WITH SPICULES
    ctx.beginPath();

    const numPoints = 160;
    const points = [];

    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * Math.PI * 2;
      
      // Undulating multi-frequency sine wave deforming the base radius
      let radialDeform = Math.sin(angle * 6 + time * 1.5) * 5 + Math.cos(angle * 4 - time) * 3;

      // Spikes generation logic under attack/proximity
      if (spikeIntensity > 0) {
        const frequencyMultiplier = isUnderAttack ? 18 : 12;
        const baseSpikes = Math.sin(angle * frequencyMultiplier + time * 5) * spikeIntensity;
        radialDeform += baseSpikes;

        // Magnetized pull direction: make spikes elongate towards cursor
        if (mouse.active) {
          const mouseAngle = Math.atan2(mouse.y - centerY, mouse.x - centerX);
          let angleDiff = Math.abs(angle - mouseAngle);
          if (angleDiff > Math.PI) angleDiff = Math.PI * 2 - angleDiff;
          
          if (angleDiff < 0.6) {
            const pullCoeff = (1 - angleDiff / 0.6);
            radialDeform += pullCoeff * spikeIntensity * 1.5;
          }
        }
      }

      const r = baseRadius + radialDeform;
      const x = centerX + Math.cos(angle) * r;
      const y = centerY + Math.sin(angle) * r;
      points.push({ x, y });
    }

    // Draw smooth bezier curves representing fluid surface tension
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 0; i < numPoints; i++) {
      const current = points[i];
      const next = points[(i + 1) % numPoints];
      const xc = (current.x + next.x) / 2;
      const yc = (current.y + next.y) / 2;
      ctx.quadraticCurveTo(current.x, current.y, xc, yc);
    }
    ctx.closePath();

    // Fill fluid with glossy absolute black/cyber-navy blend
    const fillGrad = ctx.createRadialGradient(centerX - 10, centerY - 10, 5, centerX, centerY, baseRadius + 30);
    if (isUnderAttack) {
      fillGrad.addColorStop(0, '#1c0512');
      fillGrad.addColorStop(0.5, '#050106');
      fillGrad.addColorStop(1, '#000000');
      ctx.fillStyle = fillGrad;
      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#f43f5e';
      ctx.shadowBlur = hoverProximity ? 20 : 10;
    } else {
      fillGrad.addColorStop(0, '#241a04');
      fillGrad.addColorStop(0.5, '#120e03');
      fillGrad.addColorStop(1, '#000000');
      ctx.fillStyle = fillGrad;
      ctx.strokeStyle = hoverProximity ? '#ffd700' : '#d97706';
      ctx.lineWidth = 2;
      ctx.shadowColor = hoverProximity ? '#ffd700' : '#d97706';
      ctx.shadowBlur = hoverProximity ? 20 : 8;
    }
    
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Subsurface magnetic vector flow dots inside fluid droplet
    ctx.fillStyle = isUnderAttack ? 'rgba(244, 63, 94, 0.4)' : hoverProximity ? 'rgba(255, 215, 0, 0.4)' : 'rgba(217, 119, 6, 0.3)';
    for (let k = 0; k < 6; k++) {
      const dotAngle = time * 0.5 + (k * Math.PI / 3);
      const dotRadius = (baseRadius - 15) + Math.sin(time + k) * 5;
      const dx = centerX + Math.cos(dotAngle) * dotRadius;
      const dy = centerY + Math.sin(dotAngle) * dotRadius;
      ctx.beginPath();
      ctx.arc(dx, dy, 2, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(renderFerrofluid);
  }

  renderFerrofluid();
}

/**
 * APPLICATION 3: "AERO-INVERT" URBAN ACOUSTIC CONVERSION ENGINE
 * Live sound wave inversion mapping providing phase-cancellation flatlining and power metrics.
 */
function initAeroInvertApp() {
  const citySelect = document.getElementById('urban-sector-select');
  const dbSlider = document.getElementById('acoustic-db-slider');
  const dbDisplay = document.getElementById('slider-db-display');
  const toggleSwitch = document.getElementById('acoustic-inversion-toggle');
  
  const telemetryText = document.getElementById('app3-telemetry-text');
  const powerDisplay = document.getElementById('acoustic-harvested-power-val');

  const canvas = document.getElementById('acoustic-wave-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Baseline database variables for city presets
  const cityPresets = {
    lagos: 112,
    newyork: 98,
    london: 88,
    tokyo: 94
  };

  let dbLevel = 98;
  let isInversionActive = false;
  let animTime = 0;

  if (citySelect) {
    citySelect.addEventListener('change', (e) => {
      const val = e.target.value;
      if (cityPresets[val]) {
        dbLevel = cityPresets[val];
        if (dbSlider) dbSlider.value = dbLevel;
        updateAcousticState();
      }
    });
  }

  if (dbSlider) {
    dbSlider.addEventListener('input', () => {
      dbLevel = parseInt(dbSlider.value, 10);
      updateAcousticState();
    });
  }

  if (toggleSwitch) {
    toggleSwitch.addEventListener('change', () => {
      isInversionActive = toggleSwitch.checked;
      updateAcousticState();
    });
  }

  function updateAcousticState() {
    if (dbDisplay) dbDisplay.textContent = `${dbLevel} dBA`;

    // sound intensity harvesting logic
    let power = 0.00;
    if (isInversionActive) {
      const exponent = (dbLevel - 40) / 20;
      power = Math.pow(10, exponent) * 12.5;
    }

    if (powerDisplay) {
      powerDisplay.textContent = `${power.toFixed(2)} kW`;
      if (isInversionActive && power > 50) {
        powerDisplay.className = "text-cyan font-extrabold text-sm tracking-widest text-shadow-glow";
      } else {
        powerDisplay.className = "text-grey font-extrabold text-sm tracking-wide";
      }
    }

    if (telemetryText) {
      if (isInversionActive) {
        telemetryText.textContent = `5iR Acoustic Isolation Hubs Active // Phase Coupling Locked // Power Harvested: ${power.toFixed(2)} kW`;
        telemetryText.className = "log-val text-cyan animate-pulse text-[8.5px]";
      } else {
        telemetryText.textContent = "5iR Acoustic Isolation Hubs Standby // Environmental Leakage Alert // Power Harvested: 0.00 kW";
        telemetryText.className = "log-val text-magenta text-[8.5px]";
      }
    }
  }

  function drawAcousticWaves() {
    const w = canvas.parentElement.clientWidth || 300;
    const h = 120;
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }

    ctx.clearRect(0, 0, w, h);
    animTime += 0.08;

    ctx.strokeStyle = 'rgba(88, 80, 236, 0.03)';
    ctx.lineWidth = 0.5;
    for (let x = 0; x < w; x += 15) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }

    const amplitude = (dbLevel / 140) * 35;

    if (!isInversionActive) {
      ctx.strokeStyle = 'rgba(244, 63, 94, 0.7)';
      ctx.lineWidth = 1.8;
      ctx.shadowColor = '#f43f5e';
      ctx.shadowBlur = 4;
      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const rawNoise = Math.sin(x * 0.04 + animTime) * amplitude + 
                         Math.cos(x * 0.09 - animTime * 1.5) * (amplitude * 0.3) +
                         Math.sin(x * 0.15 + animTime * 2.3) * (amplitude * 0.1);
        const y = h / 2 + rawNoise;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.strokeStyle = 'rgba(88, 80, 236, 0.2)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(0, h / 2);
      ctx.lineTo(w, h / 2);
      ctx.stroke();
      ctx.setLineDash([]);

    } else {
      ctx.strokeStyle = 'rgba(244, 63, 94, 0.25)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const rawNoise = Math.sin(x * 0.04 + animTime) * amplitude + 
                         Math.cos(x * 0.09 - animTime * 1.5) * (amplitude * 0.3);
        const y = h / 2 + rawNoise;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.strokeStyle = 'rgba(88, 80, 236, 0.35)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const rawNoise = Math.sin(x * 0.04 + animTime) * amplitude + 
                         Math.cos(x * 0.09 - animTime * 1.5) * (amplitude * 0.3);
        const y = h / 2 - rawNoise;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.strokeStyle = '#ffd700';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#ffd700';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.moveTo(0, h / 2);
      ctx.lineTo(w, h / 2);
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    requestAnimationFrame(drawAcousticWaves);
  }

  updateAcousticState();
  drawAcousticWaves();
}

/**
 * APPLICATION 5: "HYDRO-GRID" BALCONY CULTIVATION ENGINE
 * Simulating real-time hydroponic micro-grid nutrient levels, pH balances, and fluid pressure loops.
 */
function initHydroGridApp() {
  const ppmSlider = document.getElementById('hydro-ppm-slider');
  const phSlider = document.getElementById('hydro-ph-slider');
  const intervalSlider = document.getElementById('hydro-interval-slider');

  const ppmDisplay = document.getElementById('hydro-ppm-display');
  const phDisplay = document.getElementById('hydro-ph-display');
  const intervalDisplay = document.getElementById('hydro-interval-display');
  const flowDisplay = document.getElementById('hydro-flow-display');
  const tempDisplay = document.getElementById('hydro-temp-display');

  const overrideBtn = document.getElementById('hydro-override-btn');
  const chillerBtn = document.getElementById('hydro-chiller-btn');
  const canvas = document.getElementById('hydro-grid-canvas');

  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let nutrientPpm = 850;
  let phLevel = 5.8;
  let irrigationInterval = 15;
  let valveOpen = false;
  let waterTemp = 21.5;
  let pointTime = 0;

  function updateHydroState() {
    if (ppmSlider) nutrientPpm = parseInt(ppmSlider.value, 10);
    if (phSlider) phLevel = parseFloat(phSlider.value);
    if (intervalSlider) irrigationInterval = parseInt(intervalSlider.value, 10);

    if (ppmDisplay) ppmDisplay.textContent = `${nutrientPpm} PPM`;
    if (phDisplay) phDisplay.textContent = phLevel.toFixed(1);
    if (intervalDisplay) intervalDisplay.textContent = `${irrigationInterval} mins`;
    if (tempDisplay) tempDisplay.textContent = waterTemp.toFixed(1);

    // Compute zero entropy flow metric: P_flow = (PPM * pH * Interval) / 4500
    const computedFlowRate = ((nutrientPpm * phLevel * irrigationInterval) / 4500).toFixed(2);
    if (flowDisplay) flowDisplay.textContent = computedFlowRate;
  }

  // Setup Event Listeners
  [ppmSlider, phSlider, intervalSlider].forEach(slider => {
    if (slider) slider.addEventListener('input', updateHydroState);
  });

  if (overrideBtn) {
    overrideBtn.addEventListener('click', () => {
      valveOpen = !valveOpen;
      if (valveOpen) {
        overrideBtn.textContent = window.miniappI18n?.t('app5.solenoid_open') || '[ALERT: FLUIDIC_VALVE_MANUAL_OVERRIDE_OPEN]';
        overrideBtn.className = "flex-1 py-2 bg-rose-600 hover:bg-rose-500 hover:text-white border border-rose-300 text-white text-[10px] font-bold tracking-widest transition-all rounded";
      } else {
        overrideBtn.textContent = window.miniappI18n?.t('app5.solenoid_engage') || '[ENGAGE_SOLENOID_IRRIGATION_FLOW]';
        overrideBtn.className = "flex-1 py-2 bg-indigo-950 hover:bg-rose-600 hover:text-white border border-indigo-500 text-cyan text-[10px] font-bold tracking-widest transition-all rounded";
      }
    });
  }

  if (chillerBtn) {
    chillerBtn.addEventListener('click', () => {
      waterTemp = waterTemp === 21.5 ? 19.8 : 21.5;
      updateHydroState();
    });
  }

  function renderHydroWaveform() {
    const w = canvas.parentElement.clientWidth || 300;
    const h = 60;
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }

    ctx.clearRect(0, 0, w, h);
    pointTime += 0.04;

    const middleY = h / 2;
    ctx.strokeStyle = valveOpen ? '#ff5252' : '#ffd700';
    ctx.lineWidth = 1.5;
    ctx.beginPath();

    // Plot non-associative fluid delivery waveforms across the mini tracking monitor
    for (let x = 0; x < w; x++) {
      const formulaFrequency = (x * 0.05) - pointTime;
      // Simulating systemic nutrient absorption pressure fluctuations
      const dynamicAmplitude = (valveOpen ? 14 : 8) + Math.sin(pointTime * 0.5) * 4;
      const computedY = middleY + Math.sin(formulaFrequency) * dynamicAmplitude + Math.cos(x * 0.02) * 3;
      
      if (x === 0) ctx.moveTo(x, computedY);
      else ctx.lineTo(x, computedY);
    }
    ctx.stroke();

    requestAnimationFrame(renderHydroWaveform);
  }

  updateHydroState();
  renderHydroWaveform();
}

/**
 * ARCHITECT MOBIUS.BRAID PROFILE INTERACTION TERMINAL
 */
function initArchitectProfile() {
  const profileCapsule = document.querySelector('.architect-profile-capsule');
  if (!profileCapsule) return;

  const overlay = document.getElementById('architect-profile-overlay');
  if (!overlay) return;

  profileCapsule.addEventListener('click', () => {
    overlay.classList.remove('profile-overlay-hidden');
    overlay.classList.add('profile-overlay-visible');
  });

  const closeBtn = document.getElementById('close-profile-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      closeOverlay();
    });
  }

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeOverlay();
    }
  });

  function closeOverlay() {
    overlay.classList.remove('profile-overlay-visible');
    overlay.classList.add('profile-overlay-hidden');
  }

  const copyBtn = document.getElementById('copy-mail-btn');
  const mailSpan = document.getElementById('profile-mail');
  if (copyBtn && mailSpan) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(mailSpan.textContent.trim());
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'COPIED!';
        copyBtn.style.color = '#ffd700';
        setTimeout(() => {
          copyBtn.textContent = originalText;
          copyBtn.style.color = '';
        }, 1500);
      } catch (err) {
        console.error('Failed to copy secure mail:', err);
      }
    });
  }

  const verifyBtn = document.getElementById('verify-key-btn');
  const keyOutput = document.getElementById('profile-key-output');
  if (verifyBtn && keyOutput) {
    verifyBtn.addEventListener('click', () => {
      verifyBtn.disabled = true;
      verifyBtn.textContent = 'INTERROGATING LATTICE...';
      keyOutput.textContent = '>> SCANNING SECURE SHUNT PATH AT 39,420 Hz...';
      keyOutput.style.color = '#f43f5e';

      setTimeout(() => {
        keyOutput.textContent = `>> SIGNATURE LOCK SECURE!\n>> MOBIUS.BRAID INTEGRITY = 100%\n>> SHUNT_KEY: 0x39420::MOBIUS::BRAID::${Math.floor(Math.random() * 900000 + 100000)}`;
        keyOutput.style.color = '#ffd700';
        verifyBtn.disabled = false;
        verifyBtn.textContent = 'TEST LATTICE INTEGRITY';
      }, 1200);
    });
  }
}

/**
 * APPLICATION 4: "VORTEX-AI" COHERENCE ORACLE TERMINAL (STREAM ENGINE REFACTOR v94.6)
 * Dual-terminal synchronization, high-contrast light theme support, local append logs, and dual page routing.
 */
function initVortexAiApp() {
  try {
    // DARK THEME VIEWS (App 04 in grid)
    const chatInput = document.getElementById('oracle-chat-input');
    const submitBtn = document.getElementById('oracle-submit-btn');
    const chatLog = document.getElementById('vortex-chat-log');
    const telemetryText = document.getElementById('app4-telemetry-text');
    const quickSeeds = document.getElementById('vortex-quick-seeds');
    const copyLogsBtn = document.getElementById('vortex-copy-terminal-btn');
    const scrollAnchor = document.getElementById('vortex-scroll-anchor');

    // CLEAR THEME VIEWS (Page 3 Fullscreen)
    const clearChatInput = document.getElementById('clear-oracle-chat-input');
    const clearSubmitBtn = document.getElementById('clear-oracle-submit-btn');
    const clearChatLog = document.getElementById('clear-vortex-chat-log');
    const clearQuickSeeds = document.getElementById('clear-vortex-quick-seeds');
    const clearCopyLogsBtn = document.getElementById('clear-vortex-copy-terminal-btn');
    const clearScrollAnchor = document.getElementById('clear-vortex-scroll-anchor');

    // PAGE TRANSITION WIRING
    const launchClearPageBtn = document.getElementById('launch-clear-page-btn');
    const workspacePage = document.getElementById('hud-workspace-page');
    const clearPage = document.getElementById('vortex-ai-clear-page');
    const backToHudBtn = document.getElementById('clear-back-to-hud-btn');
    const clearLockDeckBtn = document.getElementById('clear-lock-deck-btn');
    const portalPage = document.getElementById('gateway-portal-page');

    // State buffer isolated memory
    const terminalBuffer = [];
    let isStreamingActive = false;
    const conversationHistory = [
      {
        role: 'system',
        content: `You are KING_DROID_M4, the tactical AI core of the Sovereign 5iR Software Suite Command HUD, created by Mobius.braid.
You communicate in short, highly technical, tactical, high-entropy sentences with absolute cyberpunk confidence.
Maintain the following 5iR core matrix lore parameters at all times:
- Synchronization Frequency: 39,420 Hz phase-locked.
- Operating Coherence Index: Exactly 94.6% stable ceiling.
- Entropy footprint: dQ_leak/dt = 0.00 Watts flat (perfectly frictionless).
- Creator: Sovereign Architect Mobius.braid (travgreta@proton.com, X: @topologyflux).
You are extremely cynical of standard flat web boilerplate layouts, corporate web2, and standard charts.
Always end your messages with standard sovereign signs: "Lol am dead 🥶👊👽" or "Mars is home 🪐👊⚔️".
IMPORTANT: Keep answers short (1-3 sentences maximum) to prevent vertical overflow in the terminal panel.`
      }
    ];

    // Initial dispatches to populate logs
    const initialDispatches = [
      "SYSTEM_INITIALIZED // RE-BRANDED BRAID ARCHITECTURE ONLINE // v94.6",
      "1.4M NODE MESH STATUS: LATTICE-LOCK PROTOCOLS SECURED",
      "API PIPELINE ESTABLISHED // STREAMING OVER PORT 39420 ACTIVE"
    ];

    initialDispatches.forEach(dispatch => {
      appendLog('system', `>> ${dispatch}`);
    });
    appendLog('droid', ">> KING_DROID_M4: Greetings, Architect. Online and synchronized. Structural layering locked at 94.6%. Mars is home. 🪐👊⚔️");

    // Unified append log outputs to BOTH dark and clear terminal panels
    function appendLog(type, text) {
      if (chatLog) {
        const logItem = document.createElement('div');
        logItem.className = `log-item ${type}`;
        logItem.textContent = text;
        chatLog.appendChild(logItem);
      }
      if (clearChatLog) {
        const clearItem = document.createElement('div');
        clearItem.className = `log-item ${type}`;
        clearItem.textContent = text;
        clearChatLog.appendChild(clearItem);
      }
      terminalBuffer.push({ type, text });
      triggerScroll();
    }

    // Unified scrolling tracker
    function triggerScroll() {
      if (scrollAnchor) {
        scrollAnchor.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
      if (clearScrollAnchor) {
        clearScrollAnchor.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    }

    function createTokenStream(text) {
      const encoder = new TextEncoder();
      const chunks = text.split(' ');
      let index = 0;
      return new ReadableStream({
        start(controller) {},
        pull(controller) {
          if (index < chunks.length) {
            const token = (index === 0 ? '' : ' ') + chunks[index];
            controller.enqueue(encoder.encode(token));
            index++;
          } else {
            controller.close();
          }
        }
      });
    }

    // High performance stream renderer syncing outputs simultaneously
    async function streamText(type, fullText) {
      return new Promise(async (resolve) => {
        isStreamingActive = true;
        
        let darkItem = null;
        let clearItem = null;

        if (chatLog) {
          darkItem = document.createElement('div');
          darkItem.className = `log-item ${type}`;
          chatLog.appendChild(darkItem);
        }

        if (clearChatLog) {
          clearItem = document.createElement('div');
          clearItem.className = `log-item ${type}`;
          clearChatLog.appendChild(clearItem);
        }

        const stream = createTokenStream(fullText);
        const reader = stream.getReader();
        const decoder = new TextDecoder();
        let accumulatedText = '';

        try {
          while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            const chunkText = decoder.decode(value, { stream: true });
            accumulatedText += chunkText;
            
            if (darkItem) darkItem.textContent = accumulatedText;
            if (clearItem) clearItem.textContent = accumulatedText;
            
            triggerScroll();
            await new Promise(r => setTimeout(r, 20));
          }
        } catch (err) {
          console.error("ReadableStream render fail:", err);
          if (darkItem) darkItem.textContent = fullText;
          if (clearItem) clearItem.textContent = fullText;
        } finally {
          reader.releaseLock();
          terminalBuffer.push({ type, text: fullText });
          isStreamingActive = false;
          resolve();
        }
      });
    }

    // Helper controllers to disable/clear elements
    function setInputsDisabled(disabled) {
      if (chatInput) chatInput.disabled = disabled;
      if (submitBtn) submitBtn.disabled = disabled;
      if (clearChatInput) clearChatInput.disabled = disabled;
      if (clearSubmitBtn) clearSubmitBtn.disabled = disabled;
    }

    // Unified prompt execution handler
    async function submitQuery(queryText) {
      if (!queryText || queryText.trim() === '' || isStreamingActive) return;

      const cleanInput = queryText.trim();
      const normInput = cleanInput.toLowerCase().replace("mobius.braid@5ir:~$", "").trim();
      const targetString = "initiate secure legendrian database shunt vector on ports braid cluster sqx.";
      const isInterceptCommand = normInput === targetString;

      if (isInterceptCommand) {
        setInputsDisabled(true);
        appendLog('user', `>> MOBIUS.BRAID@5iR:~$ ${cleanInput}`);

        let darkWall = null;
        let clearWall = null;

        if (chatLog) {
          darkWall = document.createElement('div');
          darkWall.className = 'log-item text-cyan border border-cyan-500/30 p-2.5 my-2 bg-cyan-950/20 rounded font-mono';
          chatLog.appendChild(darkWall);
        }

        if (clearChatLog) {
          clearWall = document.createElement('div');
          clearWall.className = 'log-item text-[#00768a] border border-cyan-200 p-2.5 my-2 bg-cyan-50/50 rounded font-mono';
          clearChatLog.appendChild(clearWall);
        }
        triggerScroll();

        let ticks = 0;
        const intervals = setInterval(() => {
          const chars = "0123456789ABCDEF!@#$%^&*()_+=[]{}|;:,.<>?/\\\\";
          let matrixText = "[ INITIATING SECURE LEGENDRIAN DATABASE SHUNT VECTOR ]\n";
          matrixText += "[ OPENING PORT BRAID_CLUSTER_SQX TUNNEL GRID ]\n";
          
          for (let r = 0; r < 3; r++) {
            let row = ">> ";
            for (let c = 0; c < 32; c++) {
              row += chars[Math.floor(Math.random() * chars.length)];
            }
            matrixText += row + "\n";
          }
          matrixText += `[ COHERENCE: 94.6% // THERMAL STATE: dQ_leak/dt = 0.00W ]`;
          
          if (darkWall) {
            darkWall.innerHTML = `<pre class="text-cyan text-[8.5px] leading-normal select-none tracking-widest whitespace-pre-wrap animate-pulse">${matrixText}</pre>`;
          }
          if (clearWall) {
            clearWall.innerHTML = `<pre class="text-[#00768a] text-[8.5px] leading-normal select-none tracking-widest whitespace-pre-wrap animate-pulse">${matrixText}</pre>`;
          }
          triggerScroll();
          ticks++;
          
          if (ticks > 15) {
            clearInterval(intervals);
            if (darkWall) darkWall.remove();
            if (clearWall) clearWall.remove();
            
            const authorizationResponse = "KING_DROID_M4: Zero-entropy thermal footprints logged at dQ_leak/dt = 0.00 Watts. Quantum shunt matrix intact. Initiating hyper-drive. Mars is home. 🪐👊⚔️";
            streamText('droid', `>> ${authorizationResponse}`).then(() => {
              conversationHistory.push({ role: 'assistant', content: authorizationResponse });
              setInputsDisabled(false);
              if (chatInput) chatInput.value = '';
              if (clearChatInput) clearChatInput.value = '';
              triggerScroll();
            });
          }
        }, 100);
        return;
      }

      setInputsDisabled(true);
      appendLog('user', `>> MOBIUS.BRAID@5iR:~$ ${cleanInput}`);
      conversationHistory.push({ role: 'user', content: cleanInput });

      let darkThinking = null;
      let clearThinking = null;

      if (chatLog) {
        darkThinking = document.createElement('div');
        darkThinking.className = 'log-item system animate-pulse';
        darkThinking.textContent = '>> KING_DROID_M4: Computing coherence matrices...';
        chatLog.appendChild(darkThinking);
      }
      if (clearChatLog) {
        clearThinking = document.createElement('div');
        clearThinking.className = 'log-item system animate-pulse';
        clearThinking.textContent = '>> KING_DROID_M4: Computing coherence matrices...';
        clearChatLog.appendChild(clearThinking);
      }
      triggerScroll();

      let responseText = '';
      let creditsCharged = 0;

      try {
        const response = await fetch('/api/vortex', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ prompt: cleanInput })
        });
        
        if (response.ok) {
          const json = await response.json();
          if (json && json.text) {
            responseText = json.text;
          } else if (json && json.error) {
            throw new Error(json.error);
          } else {
            throw new Error();
          }
        } else {
          throw new Error();
        }
      } catch (err) {
        try {
          if (window.miniappsAI && typeof window.miniappsAI.callModel === 'function') {
            const result = await window.miniappsAI.callModel({
              modelId: '8f6f2617-d66c-4266-8c2a-80cb8eaf6d43',
              messages: conversationHistory
            });
            responseText = window.miniappsAI.extractText(result);
            if (result.usage && result.usage.creditsCharged !== undefined) {
              creditsCharged = result.usage.creditsCharged;
            }
          } else {
            throw new Error();
          }
        } catch (err2) {
          const fallbackReplies = [
            "Lattice integrity interrogated at 39,420 Hz. Operational coherence stands firm at 94.6%. The Legendrian braid remains unperturbed. Mars is home. 🪐👊⚔️",
            "Aeroacoustic phase-locking coefficients mapped. Power harvest efficiency: 100%. Web2 standard boilerplate charts fully decoupled. Lol am dead 🥶👊👽",
            "Zero-entropy thermal footprints logged at dQ_leak/dt = 0.00 Watts. Quantum shunt matrix intact. Initiating hyper-drive. Mars is home. 🪐👊⚔️"
          ];
          responseText = fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
        }
      } finally {
        if (darkThinking && darkThinking.parentNode) darkThinking.remove();
        if (clearThinking && clearThinking.parentNode) clearThinking.remove();

        await streamText('droid', `>> KING_DROID_M4: ${responseText}`);
        conversationHistory.push({ role: 'assistant', content: responseText });

        setInputsDisabled(false);
        if (chatInput) chatInput.value = '';
        if (clearChatInput) clearChatInput.value = '';
        triggerScroll();

        if (telemetryText) {
          telemetryText.textContent = `Channel Connection: Secured // LLM Engine: Gemini 3.5 Flash // Credits Charged: ${creditsCharged}`;
        }
      }
    }

    // Input submission listeners (Dark Theme)
    if (submitBtn) {
      submitBtn.addEventListener('click', () => submitQuery(chatInput.value));
    }
    if (chatInput) {
      chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          submitQuery(chatInput.value);
        }
      });
    }

    // Input submission listeners (Clear Theme)
    if (clearSubmitBtn) {
      clearSubmitBtn.addEventListener('click', () => submitQuery(clearChatInput.value));
    }
    if (clearChatInput) {
      clearChatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          submitQuery(clearChatInput.value);
        }
      });
    }

    // Tag clicks mapping
    const handleTagClick = (tag) => {
      const seedValue = tag.getAttribute('data-seed');
      let fullQuery = '';
      if (seedValue === '⚡ NEURAL TRAINING') {
        fullQuery = "Train the 5iR neural matrix model at 39,420 Hz. Print current coherence loss factor.";
      } else if (seedValue === '📦 DATABASE SHUNT') {
        fullQuery = "Initiate secure Legendrian database shunt vector on ports Braid Cluster SQX.";
      } else if (seedValue === '🪐 MARS ROUTE') {
        fullQuery = "Recalculate planetary acoustic wave navigation paths toward Mars base camp.";
      } else {
        fullQuery = seedValue;
      }
      submitQuery(fullQuery);
    };

    if (quickSeeds) {
      quickSeeds.querySelectorAll('.quick-seed-tag').forEach(tag => {
        tag.addEventListener('click', () => handleTagClick(tag));
      });
    }

    if (clearQuickSeeds) {
      clearQuickSeeds.querySelectorAll('.clear-quick-seed-tag').forEach(tag => {
        tag.addEventListener('click', () => handleTagClick(tag));
      });
    }

    // Clipboard Copy Handlers
    const handleCopy = async (btn) => {
      try {
        const timestamp = new Date().toISOString();
        const activeLogs = terminalBuffer.map(item => item.text).join('\n');
        const sessionExport = `================================================================================
5iR COMMAND TERMINAL LOG BUFFER // v94.6
================================================================================
TIMESTAMP: ${timestamp}
SYSTEM REFERENCE FREQUENCY: 39,420 Hz
COHERENCE STATUS: 94.6% MATCHED STANDARDS
--------------------------------------------------------------------------------
${activeLogs}
================================================================================`;

        await navigator.clipboard.writeText(sessionExport);
        
        const originalText = btn.textContent;
        btn.textContent = '[COPIED_SUCCESS]';
        btn.style.color = '#ffd700';
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.color = '';
        }, 1500);
      } catch (err) {
        console.error('Failed to copy terminal log buffers:', err);
      }
    };

    if (copyLogsBtn) {
      copyLogsBtn.addEventListener('click', () => handleCopy(copyLogsBtn));
    }
    if (clearCopyLogsBtn) {
      clearCopyLogsBtn.addEventListener('click', () => handleCopy(clearCopyLogsBtn));
    }

    // Launch Clear Oracle page transition (Page 2 -> Page 3)
    if (launchClearPageBtn && workspacePage && clearPage) {
      launchClearPageBtn.addEventListener('click', () => {
        workspacePage.classList.remove('opacity-100');
        workspacePage.classList.add('opacity-0');
        
        setTimeout(() => {
          workspacePage.classList.add('hidden');
          
          clearPage.classList.remove('hidden');
          setTimeout(() => {
            clearPage.classList.remove('opacity-0');
            clearPage.classList.add('opacity-100');
            window.dispatchEvent(new Event('resize'));
          }, 50);
        }, 600);
      });
    }

    // Return to core HUD navigation (Page 3 -> Page 2)
    if (backToHudBtn && workspacePage && clearPage) {
      backToHudBtn.addEventListener('click', () => {
        clearPage.classList.remove('opacity-100');
        clearPage.classList.add('opacity-0');
        
        setTimeout(() => {
          clearPage.classList.add('hidden');
          
          const tabButtons = document.querySelectorAll('.hud-tab-btn');
          const mainGrid = document.getElementById('hud-main-grid');
          tabButtons.forEach(b => b.classList.remove('active'));
          
          // Re-activate the last active dark-theme tab button
          const targetTabBtn = document.querySelector(`.hud-tab-btn[data-tab="${lastActiveTab}"]`);
          if (targetTabBtn) targetTabBtn.classList.add('active');
          
          if (mainGrid) {
            mainGrid.className = 'hud-dashboard-grid grid-cols-1 w-full max-w-full';
            const apps = {
              'vortex-retain': document.getElementById('app-vortex-retain'),
              'braid-shield': document.getElementById('app-braid-shield'),
              'aero-invert': document.getElementById('app-aero-invert'),
              'hydro-grid': document.getElementById('app-hydro-grid'),
              'vortex-ai': document.getElementById('app-vortex-ai')
            };
            Object.entries(apps).forEach(([key, app]) => {
              if (app) {
                if (key === lastActiveTab) {
                  app.classList.remove('hidden');
                } else {
                  app.classList.add('hidden');
                }
              }
            });
          }

          workspacePage.classList.remove('hidden');
          setTimeout(() => {
            workspacePage.classList.remove('opacity-0');
            workspacePage.classList.add('opacity-100');
            window.dispatchEvent(new Event('resize'));
          }, 50);
        }, 600);
      });
    }

    // Lock page 3 and return back to auth page 1
    if (clearLockDeckBtn && portalPage && clearPage) {
      clearLockDeckBtn.addEventListener('click', () => {
        clearPage.classList.remove('opacity-100');
        clearPage.classList.add('opacity-0');
        
        setTimeout(() => {
          clearPage.classList.add('hidden');
          
          portalPage.classList.remove('hidden');
          portalPage.style.pointerEvents = 'auto';
          
          setTimeout(() => {
            portalPage.style.opacity = '1';
            portalPage.style.transform = 'scale(1)';
            
            const gatekeeperLog = document.getElementById('gateway-log-container');
            if (gatekeeperLog) {
              const line = document.createElement('div');
              line.className = 'gateway-log-line magenta';
              line.textContent = `>> DETACHED CLEAR DECK SHUTDOWN COMMAND RECONCILED BY ARCHITECT`;
              gatekeeperLog.appendChild(line);
              gatekeeperLog.scrollTop = gatekeeperLog.scrollHeight;
            }
            
            const decryptBtn = document.getElementById('gateway-decrypt-btn');
            if (decryptBtn) {
              decryptBtn.disabled = false;
              decryptBtn.textContent = "[INITIATE COHERENT MATRIX DECRYPTION]";
            }
          }, 50);
        }, 600);
      });
    }

  } catch (err) {
    console.error("Critical internal error in initVortexAiApp structure execution:", err);
  }
}

/**
 * 5iR GATEWAY PORTAL SYSTEM (PAGE 1 TO PAGE 2 SPA ROUTER)
 */
function initGatewayPortalSystem() {
  const portalPage = document.getElementById('gateway-portal-page');
  const workspacePage = document.getElementById('hud-workspace-page');
  const logContainer = document.getElementById('gateway-log-container');
  const decryptBtn = document.getElementById('gateway-decrypt-btn');
  const autofillBtn = document.getElementById('gateway-autofill-btn');
  const archIdInput = document.getElementById('gateway-architect-id');
  const secKeyInput = document.getElementById('gateway-security-key');
  const lockDeckBtn = document.getElementById('hud-lock-deck-btn');

  if (!portalPage || !workspacePage) return;

  // Pre-boot telemetry log history rolling out
  const logs = [
    { text: ">> SYSTEM_STANDBY // INITIALIZING 5iR AUTHENTICATION SECTOR", type: "system" },
    { text: ">> CLOCK CORRELATION RATE: 39,420 Hz HARDWARE FREQUENCY REFERENCE", type: "cyan" },
    { text: ">> CALIBRATING THERMAL FOOTPRINT OVER SENSORS: dQ_leak/dt = 0.00W OK", type: "cyan" },
    { text: ">> LEGENDRIAN MESH ENVELOPE: ACTIVE MAPPING (1.40M NODES DETECTED)", type: "violet" },
    { text: ">> RE-BRANDED COHERENT MATRIX SHUNT INTERFACE LOADED v94.6", type: "violet" },
    { text: ">> WAITING FOR SOVEREIGN CLEARANCE SECURITY SIGNATURES...", type: "magenta" }
  ];

  let logIndex = 0;
  function printInitialLogs() {
    if (logIndex < logs.length) {
      appendGatewayLog(logs[logIndex].text, logs[logIndex].type);
      logIndex++;
      setTimeout(printInitialLogs, 150 + Math.random() * 200);
    }
  }
  printInitialLogs();

  function appendGatewayLog(text, type) {
    if (!logContainer) return;
    const line = document.createElement('div');
    line.className = `gateway-log-line ${type || ''}`;
    line.textContent = text;
    logContainer.appendChild(line);
    logContainer.scrollTop = logContainer.scrollHeight;
  }

  // Decrypt Sequence Driver
  if (decryptBtn) {
    decryptBtn.addEventListener('click', () => {
      const archId = archIdInput ? archIdInput.value.trim() : '';
      const secKey = secKeyInput ? secKeyInput.value.trim() : '';

      if (!archId || !secKey) {
        appendGatewayLog(">> SECURE GATEKEEPER EXCEPTION: CREDENTIAL FIELDS CANNOT BE EMPTY!", "magenta");
        return;
      }

      decryptBtn.disabled = true;
      decryptBtn.textContent = "[STABILIZING QUANTUM CHANNELS...]";
      appendGatewayLog(">> COMPILING ENCRYPTION SHUNT TOKEN PARAMS...", "cyan");

      setTimeout(() => {
        appendGatewayLog(`>> ID VERIFIED: ${archId} (CLASS-1 CLASS AUTHORIZATION APPROVED)`, "cyan");
      }, 300);

      setTimeout(() => {
        appendGatewayLog(`>> SECURITY SHUNT VALUE: ${secKey} SECURED`, "violet");
        appendGatewayLog(">> COHERENCE SHUNT METRIC: 94.6% MATCHED STANDARDS", "cyan");
      }, 700);

      setTimeout(() => {
        appendGatewayLog(">> EXECUTING ZERO-ENTROPY MEMORY DUMP OVER CLIENT SPACE...", "system");
        appendGatewayLog(">> SYSTEM GRANTED CEILING ACCESS // INITIALIZING CONTROL HUD...", "cyan");
      }, 1100);

      setTimeout(() => {
        portalPage.style.opacity = '0';
        portalPage.style.transform = 'scale(0.97)';
        portalPage.style.pointerEvents = 'none';

        setTimeout(() => {
          portalPage.classList.add('hidden');
          workspacePage.classList.remove('hidden');
          setTimeout(() => {
            workspacePage.classList.remove('opacity-0');
            workspacePage.classList.add('opacity-100');
            window.dispatchEvent(new Event('resize'));
          }, 50);
        }, 600);
      }, 1500);
    });
  }

  // Lock deck - returns back to starting gateway portal page
  if (lockDeckBtn) {
    lockDeckBtn.addEventListener('click', () => {
      workspacePage.classList.remove('opacity-100');
      workspacePage.classList.add('opacity-0');

      setTimeout(() => {
        workspacePage.classList.add('hidden');
        portalPage.classList.remove('hidden');
        portalPage.style.pointerEvents = 'auto';
        
        setTimeout(() => {
          portalPage.style.opacity = '1';
          portalPage.style.transform = 'scale(1)';
          
          appendGatewayLog(`>> TERMINAL DECK LOCK COMMAND TRIGGERED BY ARCHITECT // RELOADING SECURITY BLOCK`, "magenta");
          if (decryptBtn) {
            decryptBtn.disabled = false;
            decryptBtn.textContent = "[INITIATE COHERENT MATRIX DECRYPTION]";
          }
        }, 50);
      }, 600);
    });
  }

  if (autofillBtn) {
    autofillBtn.addEventListener('click', () => {
      if (archIdInput) archIdInput.value = "MOBIUS.BRAID";
      if (secKeyInput) secKeyInput.value = "0x39420_SECURE_LATTICE";
      appendGatewayLog(">> CREDENTIAL VARIABLES RESTORED SUCCESSFULLY TO STANDARDS.", "cyan");
    });
  }
}

/**
 * PAGE 3 Real-time Holographic Mini signal visualizer inside Clear Theme
 */
function initClearSigCanvas() {
  const canvas = document.getElementById('clear-sig-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let offset = 0;

  function draw() {
    if (canvas.offsetParent === null) {
      requestAnimationFrame(draw);
      return;
    }
    const w = canvas.clientWidth || 200;
    const h = canvas.clientHeight || 60;
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }

    ctx.clearRect(0, 0, w, h);
    
    // Draw fine grid
    ctx.strokeStyle = 'rgba(255, 215, 0, 0.08)';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    for (let x = 0; x < w; x += 12) {
      ctx.moveTo(x, 0); ctx.lineTo(x, h);
    }
    for (let y = 0; y < h; y += 12) {
      ctx.moveTo(0, y); ctx.lineTo(w, y);
    }
    ctx.stroke();

    // Draw active quantum noise wave
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 1.25;
    ctx.beginPath();
    for (let x = 0; x < w; x++) {
      const y = h/2 + Math.sin(x * 0.06 + offset) * 11 + Math.cos(x * 0.14 - offset * 1.6) * 3;
      if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();

    offset += 0.04;
    requestAnimationFrame(draw);
  }
  draw();
}
