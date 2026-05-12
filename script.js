/* ============================================================
   QuizVerse — Hikoya rejimi (Story Mode)
   O'yinchi 5 ta lokatsiya bo'ylab sayohat qiladi.
   Har lokatsiyada 4 ta bog'langan savol = jami 20.
   ============================================================ */

/* ---------- 5 STAGES (lokatsiyalar) ---------- */
const STAGES = [
  {
    id: "home",
    name: "Boshlang'ich uy",
    emoji: "🏠",
    color: "#7c5cff",
    intro: "Sayohat shu yerdan boshlanadi! Avval kompyuter bilan tanishamiz. Tayyormisiz, qahramon?",
    questions: [
      {
        type: "mcq", visual: "🖥️",
        question: "Boshladik! Kompyuterning «miyasi» deb nimaga aytiladi?",
        options: ["Monitor", "Protsessor (CPU)", "Klaviatura", "Sichqoncha"],
        answer: 1,
        explanation: "<b>Protsessor (CPU)</b> — kompyuterning miyasi, barcha amallarni bajaradi.",
        bridge: "Ajoyib! 🧠 Demak, kompyuter o'ylashi uchun <b>protsessor</b> kerak. Endi unga ma'lumot kiritamiz..."
      },
      {
        type: "mcq", visual: "🖱️",
        question: "Protsessorga ma'lumot kiritish uchun qaysi qurilmadan foydalanamiz?",
        options: ["Monitor", "Printer", "Sichqoncha va klaviatura", "Kolonka"],
        answer: 2,
        explanation: "<b>Sichqoncha</b> va <b>klaviatura</b> — kiritish qurilmalari.",
        bridge: "Zo'r! ⌨️ Endi natijani <b>ko'rishimiz</b> kerak. Buning uchun yana bir qurilma bor..."
      },
      {
        type: "mcq", visual: "🖼️",
        question: "Kompyuter natijasini ko'rsatadigan asosiy qurilma — bu...?",
        options: ["Monitor", "Mikrofon", "Quloqchin", "Skaner"],
        answer: 0,
        explanation: "<b>Monitor</b> — chiqish qurilmasi, natijani ekranga chiqaradi.",
        bridge: "To'g'ri! 🖼️ Lekin qurilmalar ishlashi uchun ularni boshqaradigan dastur kerak..."
      },
      {
        type: "tf", visual: "🪟",
        question: "Kompyuterni boshqaruvchi asosiy dastur — bu <b>operatsion tizim</b> (masalan, Windows). To'g'rimi?",
        options: ["To'g'ri", "Noto'g'ri"],
        answer: 0,
        explanation: "To'g'ri! <b>Operatsion tizim</b> kompyuter qurilmalari va dasturlarini boshqaradi.",
        bridge: "Mukammal! 🪟 Uydan chiqishga tayyorsiz. Endi bizni <b>Internet o'rmoni</b> kutmoqda... 🌲🌐"
      }
    ]
  },

  {
    id: "internet",
    name: "Internet o'rmoni",
    emoji: "🌐",
    color: "#00d2ff",
    intro: "🌐 Internet o'rmoniga xush kelibsiz! Bu yerda butun dunyodagi ma'lumotlar daraxtlari o'sadi. Yo'lni topish uchun savollarga javob bering!",
    questions: [
      {
        type: "mcq", visual: "🌍",
        question: "O'rmonga kirdik! Internetda saytlarni ko'rish uchun qaysi dasturni ochamiz?",
        options: ["MS Word", "Google Chrome (brauzer)", "Excel", "Paint"],
        answer: 1,
        explanation: "<b>Brauzer</b> (Chrome, Firefox, Edge) — saytlarni ochuvchi dastur.",
        bridge: "Zo'r! 🦊 Brauzer ochildi. Endi do'stingizga xabar yuboramiz — buning uchun <b>email</b> kerak..."
      },
      {
        type: "mcq", visual: "📧",
        question: "Quyidagilardan qaysi biri <b>email manzili</b>ni to'g'ri ko'rsatadi?",
        options: [
          "ali.com@gmail",
          "ali@gmail.com",
          "www.ali@gmail",
          "ali.gmail.com"
        ],
        answer: 1,
        explanation: "Email shakli: <b>nom@xizmat.domen</b> — masalan, <b>ali@gmail.com</b>.",
        bridge: "Ajoyib! 📧 Email tayyor. Lekin internetda har bir qurilmaning o'z <b>raqamli manzili</b> bor..."
      },
      {
        type: "fill", visual: "🛰️",
        question: "Internetdagi har bir qurilmaning raqamli manzili — bu ___ -manzil (3 harfli qisqartma).",
        answer: ["ip", "ip-manzil", "ip manzil"],
        explanation: "<b>IP-manzil</b> — qurilmaning internetdagi unikal raqami (masalan, 192.168.1.1).",
        bridge: "Xudi shunday! 🛰️ <b>IP-manzil</b> orqali xabar to'g'ri yetib boradi. Internet — bu juda katta..."
      },
      {
        type: "fill", visual: "🌐",
        question: "Butun dunyo kompyuterlarini bog'lovchi global tarmoq ___ deb ataladi.",
        answer: ["internet"],
        explanation: "<b>Internet</b> — dunyo bo'ylab kompyuterlarni bog'lovchi global tarmoq.",
        bridge: "Mukammal! 🌐 O'rmondan chiqdik. Oldinda — <b>Parol qal'asi</b>! 🏰🔐 U yerda xavfsizlik sirlarini o'rganamiz..."
      }
    ]
  },

  {
    id: "castle",
    name: "Parol qal'asi",
    emoji: "🔐",
    color: "#ff4ecd",
    intro: "🔐 Parol qal'asiga xush kelibsiz! Bu yerda akkauntlarimizni qanday himoya qilishni o'rganamiz. Diqqat bo'ling!",
    questions: [
      {
        type: "mcq", visual: "🛡️",
        question: "Qal'aga kirish uchun kuchli parol kerak. Quyidagilardan qaysi biri <b>eng kuchli parol</b>?",
        options: ["12345", "ali2010", "qwerty", "Ali_2026!Xz"],
        answer: 3,
        explanation: "Kuchli parol = <b>katta+kichik harflar, raqamlar, belgilar</b> va uzunlik.",
        bridge: "Maladets! 🛡️ Parolingiz kuchli. Endi muhim fayllarni qaysi <b>idishga</b> saqlashni bilamizmi?"
      },
      {
        type: "fill", visual: "📁",
        question: "Fayllarni guruhlab saqlash uchun ishlatiladigan idish ___ deb ataladi.",
        answer: ["papka", "jild", "katalog"],
        explanation: "<b>Papka</b> (jild) — fayllarni tartibli saqlash idishi.",
        bridge: "Ajoyib! 📁 Fayl papkada. Lekin uni boshqa joyga ham <b>nusxalashimiz</b> mumkin..."
      },
      {
        type: "mcq", visual: "⌨️",
        question: "Faylni yoki matnni <b>nusxalash</b> uchun qaysi tugmalar birikmasi ishlatiladi?",
        options: ["Ctrl + V", "Ctrl + C", "Ctrl + X", "Ctrl + Z"],
        answer: 1,
        explanation: "<b>Ctrl + C</b> = nusxa, <b>Ctrl + V</b> = joylash, <b>Ctrl + X</b> = kesish, <b>Ctrl + Z</b> = bekor qilish.",
        bridge: "Zo'r! ⌨️ Nusxa olishni o'rgandingiz. Endi bir narsadan ehtiyot bo'lish kerak..."
      },
      {
        type: "tf", visual: "🎣",
        question: "Notanish odamdan kelgan email orqali parolingizni so'rashsa — uni berish kerak. To'g'rimi?",
        options: ["To'g'ri", "Noto'g'ri"],
        answer: 1,
        explanation: "Noto'g'ri! Bu <b>fishing</b> — firibgarlik. Hech qachon parolingizni hech kimga bermang!",
        bridge: "Sergak qahramon! 🛡️ Endi qal'adan chiqib, <b>English maktabi</b>ga yo'l olamiz! 🏫📚"
      }
    ]
  },

  {
    id: "school",
    name: "English maktabi",
    emoji: "🏫",
    color: "#22e3a4",
    intro: "🏫 English maktabiga xush kelibsiz! Endi ingliz tilida gaplashishni boshlaymiz. Don't worry — it's easy! 😊",
    questions: [
      {
        type: "mcq", visual: "👋",
        question: "O'qituvchi sizga 'Hello!' dedi. Eng to'g'ri javob qaysi?",
        options: ["Goodbye!", "Hi! 👋", "Sorry!", "Please."],
        answer: 1,
        explanation: "'<b>Hi!</b>' — do'stona salomlashish javobi.",
        bridge: "Great! 👋 Salomlashdik. Endi o'zimiz haqimizda gapiramiz: 'I ___ a student.' — qanday yozamiz?"
      },
      {
        type: "fill",
        question: "Bo'sh joyni to'ldiring: <b>I ___ a student.</b> (am / is / are)",
        answer: ["am"],
        explanation: "<b>I + am</b> har doim. → 'I am a student.' ✏️",
        bridge: "Perfect! ✅ <b>I am</b> dedingiz. Lekin do'stingiz haqida nima deymiz? 'She ___ happy.'"
      },
      {
        type: "mcq",
        question: "Qaysi gap to'g'ri yozilgan?",
        options: ["She are happy.", "She is happy.", "She am happy.", "She be happy."],
        answer: 1,
        explanation: "<b>he / she / it + is</b>. → 'She is happy.'",
        bridge: "Excellent! 😊 He/she/it bilan <b>is</b>. Endi ko'plik — 'They ___ my friends.'"
      },
      {
        type: "fill",
        question: "Bo'sh joyni to'ldiring: <b>They ___ my friends.</b> (am / is / are)",
        answer: ["are"],
        explanation: "<b>You / we / they + are</b>. → 'They are my friends.' 👫",
        bridge: "Awesome! 🎉 Grammatika asoslarini bildingiz. Oxirgi to'xtash — <b>Bitiruv minorasi</b>! 🎓🏰"
      }
    ]
  },

  {
    id: "tower",
    name: "Bitiruv minorasi",
    emoji: "🎓",
    color: "#ffd166",
    intro: "🎓 Bitiruv minorasiga yetib keldingiz! Sayohatning oxirgi qismi. Bu yerda kundalik English va IT so'zlarni mustahkamlaymiz!",
    questions: [
      {
        type: "mcq",
        question: "Kimdir sizdan: 'How are you?' deb so'radi. Eng yaxshi javob:",
        options: ["I'm 15.", "I'm fine, thanks! 😊", "I'm from school.", "I'm a student."],
        answer: 1,
        explanation: "'<b>I'm fine, thanks!</b>' — odob bilan javob berishning standart shakli.",
        bridge: "Perfect! 😊 Endi kompyuter bilan ishlayotganda — ekrandagi rasmcha qanday ataladi?"
      },
      {
        type: "fill", visual: "💻",
        question: "Ekrandagi kichik rasmcha (masalan, dastur belgisi) inglizchada ___ deyiladi.",
        answer: ["icon"],
        explanation: "<b>Icon</b> — dastur yoki faylni bildiruvchi kichik rasm. 🖼️",
        bridge: "Great! 🖱️ Iconni bossangiz dastur ochiladi. Bu harakat inglizchada qanday deyiladi?"
      },
      {
        type: "mcq", visual: "🖱️",
        question: "Sichqoncha tugmasini bosish — inglizchada qaysi so'z?",
        options: ["Type", "Scroll", "Click", "Print"],
        answer: 2,
        explanation: "<b>Click</b> = bosmoq. 'Click the button' — tugmani bosing.",
        bridge: "Nice! 👆 <b>Click</b> dedingiz. Endi yakuniy savol — past zamondagi 'run' fe'li qanday?"
      },
      {
        type: "mcq", visual: "🏃",
        question: "'Run' fe'lining <b>past</b> shakli qaysi?",
        options: ["runned", "ran", "runs", "running"],
        answer: 1,
        explanation: "<b>Run → Ran → Run</b>. Noto'g'ri (irregular) fe'l.",
        bridge: "🎉 TABRIKLAYMIZ, QAHRAMON! 🏆 Siz IT-Diyor va English Town orqali muvaffaqiyatli o'tdingiz! Sertifikatingizni oling..."
      }
    ]
  }
];

/* ---------- State ---------- */
const state = {
  name: "Player",
  avatar: "🦊",
  profile: null, // { firstName, lastName, school, grade, phone1, phone2 }
  stageIndex: 0,
  qInStage: 0,
  totalAsked: 0,
  totalQuestions: STAGES.reduce((s, st) => s + st.questions.length, 0),
  score: 0,
  correct: 0,
  wrong: 0,
  streak: 0,
  timerId: null,
  timeLeft: 15,
  answered: false,
  badges: [],
};

const TIME_PER_Q = 20;

/* ---------- DOM shortcuts ---------- */
const $ = (id) => document.getElementById(id);
const screens = {
  register: $("registerScreen"),
  start: $("startScreen"),
  intro: $("stageIntroScreen"),
  quiz: $("quizScreen"),
  stageEnd: $("stageEndScreen"),
  result: $("resultScreen"),
};

/* ---------- Sound (WebAudio) ---------- */
let audioCtx;
function beep(freq = 440, duration = 0.12, type = "sine", volume = 0.08) {
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type; osc.frequency.value = freq;
    gain.gain.value = volume;
    osc.connect(gain); gain.connect(audioCtx.destination);
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {}
}
const sfx = {
  click: () => beep(600, 0.06, "square", 0.04),
  correct: () => { beep(660, 0.1); setTimeout(() => beep(880, 0.15), 90); },
  wrong: () => beep(180, 0.25, "sawtooth", 0.06),
  tick: () => beep(1200, 0.03, "square", 0.02),
  unlock: () => { [523, 659, 784].forEach((f, i) => setTimeout(() => beep(f, 0.16), i * 110)); },
  win: () => { [523, 659, 784, 1046, 1318].forEach((f, i) => setTimeout(() => beep(f, 0.2), i * 130)); }
};

/* ---------- Theme ---------- */
$("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("light");
  $("themeToggle").textContent = document.body.classList.contains("light") ? "☀️" : "🌙";
  sfx.click();
});

/* ---------- Avatar picker ---------- */
document.querySelectorAll(".avatar").forEach(el => {
  el.addEventListener("click", () => {
    document.querySelectorAll(".avatar").forEach(a => a.classList.remove("active"));
    el.classList.add("active");
    state.avatar = el.textContent;
    sfx.click();
  });
});

/* ---------- Phone formatting (+998) ---------- */
function formatUzPhone(digits) {
  // digits = numbers only, max 9 (e.g. 901234567)
  const d = digits.slice(0, 9);
  let out = "";
  if (d.length > 0) out += d.slice(0, 2);
  if (d.length > 2) out += " " + d.slice(2, 5);
  if (d.length > 5) out += " " + d.slice(5, 7);
  if (d.length > 7) out += " " + d.slice(7, 9);
  return out;
}
["rgPhone1", "rgPhone2"].forEach(id => {
  const inp = $(id);
  inp.addEventListener("input", () => {
    let raw = inp.value.replace(/\D/g, "");
    // If user paste "+998..." or "998...", strip leading 998
    if (raw.startsWith("998")) raw = raw.slice(3);
    inp.value = formatUzPhone(raw);
  });
});

/* ---------- Register form ---------- */
$("registerForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const fields = {
    firstName: $("rgFirstName"),
    lastName: $("rgLastName"),
    school: $("rgSchool"),
    grade: $("rgGrade"),
    phone1: $("rgPhone1"),
  };
  const phone2El = $("rgPhone2");
  const errEl = $("formError");
  errEl.textContent = "";

  // Reset invalid states
  Object.values(fields).forEach(el => el.classList.remove("invalid"));

  let firstInvalid = null;
  Object.entries(fields).forEach(([k, el]) => {
    if (!el.value.trim()) {
      el.classList.add("invalid");
      if (!firstInvalid) firstInvalid = el;
    }
  });

  // Phone validation: must have exactly 9 digits (Uzbek number after +998)
  const phoneOk = (v) => v.replace(/\D/g, "").length === 9;
  if (fields.phone1.value.trim() && !phoneOk(fields.phone1.value)) {
    fields.phone1.classList.add("invalid");
    if (!firstInvalid) firstInvalid = fields.phone1;
  }
  if (phone2El.value.trim() && !phoneOk(phone2El.value)) {
    phone2El.classList.add("invalid");
    if (!firstInvalid) firstInvalid = phone2El;
  }

  // Build full phone with +998 prefix
  const buildPhone = (v) => v.trim() ? "+998 " + v.trim() : "";

  if (firstInvalid) {
    errEl.textContent = "Iltimos, barcha majburiy maydonlarni to'g'ri to'ldiring.";
    firstInvalid.focus();
    sfx.wrong();
    return;
  }

  state.profile = {
    firstName: fields.firstName.value.trim(),
    lastName: fields.lastName.value.trim(),
    school: fields.school.value.trim(),
    grade: fields.grade.value.trim(),
    phone1: buildPhone(fields.phone1.value),
    phone2: buildPhone(phone2El.value),
  };
  state.name = `${state.profile.firstName} ${state.profile.lastName}`;

  // Save in localStorage so user doesn't refill on refresh
  try { localStorage.setItem("quizverse_profile", JSON.stringify(state.profile)); } catch (e) {}

  // Send to backend (best-effort, don't block UX)
  fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(state.profile),
  })
    .then(r => r.json())
    .then(data => {
      if (data && data.userId) state.userId = data.userId;
    })
    .catch(err => console.warn("register API error:", err));

  $("greetName").textContent = state.profile.firstName;
  switchScreen("start");
  sfx.unlock();
});

// Auto-fill if previously registered
(function prefillProfile() {
  try {
    const saved = JSON.parse(localStorage.getItem("quizverse_profile"));
    if (!saved) return;
    $("rgFirstName").value = saved.firstName || "";
    $("rgLastName").value = saved.lastName || "";
    $("rgSchool").value = saved.school || "";
    $("rgGrade").value = saved.grade || "";
    const stripPrefix = (v) => {
      const d = String(v || "").replace(/\D/g, "").replace(/^998/, "");
      return formatUzPhone(d);
    };
    $("rgPhone1").value = stripPrefix(saved.phone1);
    $("rgPhone2").value = stripPrefix(saved.phone2);
  } catch (e) {}
})();

/* ---------- Start ---------- */
$("startBtn").addEventListener("click", () => {
  state.stageIndex = 0; state.qInStage = 0; state.totalAsked = 0;
  state.score = 0; state.correct = 0; state.wrong = 0; state.streak = 0;
  state.badges = [];
  shuffleStageQuestions();
  showStageIntro();
  sfx.click();
});

/* Shuffle MCQ options inside each question (preserve correct answer) */
function shuffleStageQuestions() {
  STAGES.forEach(stage => {
    stage.questions = stage.questions.map(q => {
      if (q.type === "mcq" && Array.isArray(q.options) && q._shuffled !== true) {
        const correctVal = q.options[q.answer];
        const shuffled = [...q.options].sort(() => Math.random() - 0.5);
        return { ...q, options: shuffled, answer: shuffled.indexOf(correctVal), _shuffled: true };
      }
      return q;
    });
  });
}

/* ---------- Screen switcher with slide ---------- */
function switchScreen(name) {
  Object.values(screens).forEach(s => s && s.classList.remove("active"));
  screens[name].classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ---------- Stage map renderer ---------- */
function renderStageMap(containerId) {
  const c = $(containerId);
  if (!c) return;
  c.innerHTML = "";
  STAGES.forEach((s, i) => {
    const node = document.createElement("div");
    node.className = "map-node";
    if (i < state.stageIndex) node.classList.add("done");
    else if (i === state.stageIndex) node.classList.add("current");
    else node.classList.add("locked");
    node.innerHTML = `
      <div class="map-emoji">${i < state.stageIndex ? "✅" : (i === state.stageIndex ? s.emoji : "🔒")}</div>
      <div class="map-name">${s.name}</div>
    `;
    c.appendChild(node);
    if (i < STAGES.length - 1) {
      const line = document.createElement("div");
      line.className = "map-line" + (i < state.stageIndex ? " done" : "");
      c.appendChild(line);
    }
  });
}

/* ---------- Stage intro ---------- */
function showStageIntro() {
  const stage = STAGES[state.stageIndex];
  state.qInStage = 0;
  document.body.style.setProperty("--stage-color", stage.color);
  $("stageIntroEmoji").textContent = stage.emoji;
  $("stageIntroName").textContent = stage.name;
  $("stageIntroText").textContent = stage.intro;
  $("stageIntroIndex").textContent = `Lokatsiya ${state.stageIndex + 1} / ${STAGES.length}`;
  renderStageMap("introMap");
  switchScreen("intro");
  sfx.unlock();
}

$("stageStartBtn").addEventListener("click", () => {
  sfx.click();
  renderQuestion();
  switchScreen("quiz");
});

/* ---------- Render question ---------- */
function renderQuestion() {
  const stage = STAGES[state.stageIndex];
  const q = stage.questions[state.qInStage];
  state.answered = false;

  document.body.style.setProperty("--stage-color", stage.color);

  $("stageBadge").textContent = `${stage.emoji} ${stage.name}`;
  $("qIndex").textContent = state.totalAsked + 1;
  $("qTotal").textContent = state.totalQuestions;
  $("score").textContent = state.score;
  $("streak").textContent = state.streak;
  $("playerAvatar").textContent = state.avatar;

  $("qType").textContent = ({
    mcq: "Variantli", tf: "To'g'ri / Noto'g'ri",
    fill: "Bo'sh joyni to'ldiring", image: "Variantli", match: "Mos qo'ying"
  })[q.type] || "Savol";

  $("questionText").innerHTML = q.question;
  $("qVisual").textContent = q.visual || "";
  $("explanation").classList.remove("show");
  $("explanation").innerHTML = "";
  $("bridge").classList.remove("show");
  $("bridge").innerHTML = "";

  // progress bars
  const totalPct = (state.totalAsked / state.totalQuestions) * 100;
  $("progressBar").style.width = totalPct + "%";

  // stage dots
  const dotsWrap = $("stageDots");
  dotsWrap.innerHTML = "";
  stage.questions.forEach((_, i) => {
    const d = document.createElement("span");
    d.className = "dot" + (i < state.qInStage ? " done" : i === state.qInStage ? " active" : "");
    dotsWrap.appendChild(d);
  });

  // answer container
  const optionsWrap = $("options");
  const fillWrap = $("fillinWrap");
  optionsWrap.innerHTML = "";
  fillWrap.style.display = "none";

  // animate slide-in
  const card = $("questionCard");
  card.classList.remove("slide-in");
  void card.offsetWidth;
  card.classList.add("slide-in");

  if (q.type === "fill") {
    optionsWrap.style.display = "none";
    fillWrap.style.display = "flex";
    const inp = $("fillinInput");
    inp.value = ""; inp.disabled = false; inp.style.borderColor = "";
    $("fillinSubmit").disabled = false;
    setTimeout(() => inp.focus(), 250);
  } else {
    optionsWrap.style.display = "grid";
    optionsWrap.classList.toggle("single", q.type === "tf");
    q.options.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.className = "option";
      btn.innerHTML = `<span class="bullet">${String.fromCharCode(65 + i)}</span><span>${opt}</span>`;
      btn.addEventListener("click", () => handleAnswer(i, btn));
      optionsWrap.appendChild(btn);
    });
  }

  startTimer();
}

/* ---------- Timer ---------- */
function startTimer() {
  clearInterval(state.timerId);
  state.timeLeft = TIME_PER_Q;
  $("timer").textContent = state.timeLeft;
  $("timerChip").classList.remove("warn");
  state.timerId = setInterval(() => {
    state.timeLeft--;
    $("timer").textContent = state.timeLeft;
    if (state.timeLeft <= 5) {
      $("timerChip").classList.add("warn");
      sfx.tick();
    }
    if (state.timeLeft <= 0) {
      clearInterval(state.timerId);
      if (!state.answered) handleTimeout();
    }
  }, 1000);
}

/* ---------- Answer handling ---------- */
function handleAnswer(selectedIndex, btnEl) {
  if (state.answered) return;
  state.answered = true;
  clearInterval(state.timerId);

  const q = currentQ();
  document.querySelectorAll(".option").forEach(b => b.classList.add("disabled"));

  if (selectedIndex === q.answer) {
    btnEl.classList.add("correct");
    onCorrect();
  } else {
    btnEl.classList.add("wrong");
    document.querySelectorAll(".option")[q.answer].classList.add("correct");
    onWrong();
  }
  revealAndAdvance();
}

function handleFillSubmit() {
  if (state.answered) return;
  const q = currentQ();
  const val = $("fillinInput").value.trim().toLowerCase();
  if (!val) return;
  state.answered = true;
  clearInterval(state.timerId);

  const accepted = (q.answer || []).map(a => a.toLowerCase());
  const ok = accepted.includes(val);
  const inp = $("fillinInput");
  inp.disabled = true;
  $("fillinSubmit").disabled = true;
  inp.style.borderColor = ok ? "var(--success)" : "var(--danger)";
  ok ? onCorrect() : onWrong();
  revealAndAdvance(ok ? null : accepted[0]);
}

function handleTimeout() {
  if (state.answered) return;
  state.answered = true;
  const q = currentQ();
  if (q.type !== "fill") {
    document.querySelectorAll(".option").forEach(b => b.classList.add("disabled"));
    const cb = document.querySelectorAll(".option")[q.answer];
    if (cb) cb.classList.add("correct");
  } else {
    $("fillinInput").disabled = true; $("fillinSubmit").disabled = true;
    $("fillinInput").style.borderColor = "var(--danger)";
  }
  onWrong(true);
  revealAndAdvance(q.type === "fill" ? (q.answer || [])[0] : null);
}

function currentQ() { return STAGES[state.stageIndex].questions[state.qInStage]; }

/* ---------- Correct / Wrong ---------- */
function onCorrect() {
  state.correct++;
  state.streak++;
  const bonus = state.streak >= 3 ? 5 : 0;
  const timeBonus = Math.max(0, Math.floor(state.timeLeft / 3));
  state.score += 10 + bonus + timeBonus;
  showReaction(pick(["🎉", "✨", "🔥", "💯", "⭐", "🚀"]));
  jumpAvatar();
  sfx.correct();
}
function onWrong(timeout) {
  state.wrong++;
  state.streak = 0;
  showReaction(timeout ? "⏰" : pick(["😅", "🙈", "💪", "🤔"]));
  shakeAvatar();
  sfx.wrong();
}
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

/* ---------- Reveal + auto-advance ---------- */
function revealAndAdvance(correctText) {
  const q = currentQ();
  let html = q.explanation || "";
  if (correctText) html += `<br>✅ To'g'ri javob: <b>${correctText}</b>`;
  $("explanation").innerHTML = html;
  $("explanation").classList.add("show");
  $("score").textContent = state.score;
  $("streak").textContent = state.streak;

  // Show bridge text after a small delay
  setTimeout(() => {
    if (q.bridge) {
      $("bridge").innerHTML = `<span class="bridge-icon">💬</span> ${q.bridge}`;
      $("bridge").classList.add("show");
    }
  }, 700);

  // Auto-advance
  setTimeout(() => {
    state.qInStage++;
    state.totalAsked++;
    const stage = STAGES[state.stageIndex];
    if (state.qInStage >= stage.questions.length) {
      finishStage();
    } else {
      slideOutAnd(renderQuestion);
    }
  }, q.bridge ? 3800 : 2000);
}

function slideOutAnd(cb) {
  const card = $("questionCard");
  card.classList.add("slide-out");
  setTimeout(() => {
    card.classList.remove("slide-out");
    cb();
  }, 350);
}

/* ---------- Finish stage ---------- */
function finishStage() {
  const stage = STAGES[state.stageIndex];
  state.badges.push({ name: stage.name, emoji: stage.emoji });

  $("stageEndEmoji").textContent = stage.emoji;
  $("stageEndName").textContent = stage.name;
  $("stageEndMsg").textContent = pick([
    "Ajoyib ish! 🎉",
    "Zo'r o'tdingiz! 🔥",
    "Mukammal! Davom eting!",
    "Qahramonsiz! 💪"
  ]);
  $("stageEndScore").textContent = state.score;
  $("stageEndCorrect").textContent = state.correct;
  $("stageEndWrong").textContent = state.wrong;

  // badges
  const bWrap = $("badgesWrap");
  bWrap.innerHTML = "";
  state.badges.forEach(b => {
    const el = document.createElement("div");
    el.className = "badge-pill";
    el.innerHTML = `${b.emoji} <span>${b.name}</span>`;
    bWrap.appendChild(el);
  });

  state.stageIndex++;
  renderStageMap("endMap");

  if (state.stageIndex >= STAGES.length) {
    $("stageEndNextBtn").textContent = "🏆 Yakuniy natijani ko'rish";
  } else {
    $("stageEndNextBtn").textContent = `▶ Keyingi: ${STAGES[state.stageIndex].emoji} ${STAGES[state.stageIndex].name}`;
  }

  switchScreen("stageEnd");
  sfx.unlock();
  launchConfetti(80);
}

$("stageEndNextBtn").addEventListener("click", () => {
  sfx.click();
  if (state.stageIndex >= STAGES.length) {
    finishGame();
  } else {
    showStageIntro();
  }
});

/* ---------- Skip story (in quiz) ---------- */
$("skipBtn").addEventListener("click", () => {
  if (state.answered) return;
  sfx.click();
  state.answered = true;
  clearInterval(state.timerId);
  onWrong();
  revealAndAdvance();
});
$("fillinSubmit").addEventListener("click", handleFillSubmit);
$("fillinInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleFillSubmit();
});

/* ---------- Reactions ---------- */
function showReaction(emoji) {
  const el = $("reaction");
  el.textContent = emoji;
  el.classList.remove("show");
  void el.offsetWidth;
  el.classList.add("show");
}
function jumpAvatar() {
  const c = $("character");
  if (!c) return;
  c.classList.remove("jump"); void c.offsetWidth; c.classList.add("jump");
}
function shakeAvatar() {
  const c = $("character");
  if (!c) return;
  c.classList.remove("shake"); void c.offsetWidth; c.classList.add("shake");
}

/* ---------- Final result ---------- */
function finishGame() {
  const total = state.totalQuestions;
  const pct = Math.round((state.correct / total) * 100);

  $("finalScore").textContent = state.score;
  $("correctCount").textContent = state.correct;
  $("wrongCount").textContent = state.wrong;
  $("accuracy").textContent = pct + "%";

  let level = "Boshlovchi", emoji = "🌱", msg = "Ajoyib boshlanish! Yana o'rganing! 🌟";
  if (pct >= 71) { level = "Mahir", emoji = "🏆"; msg = "Ajoyib! Siz haqiqiy QuizVerse qahramoni! 🏆"; }
  else if (pct >= 41) { level = "O'rta", emoji = "🚀"; msg = "Tez o'sayapsiz! Davom eting! 🚀"; }

  $("levelName").textContent = level;
  $("resultEmoji").textContent = emoji;
  $("resultMessage").textContent = msg;
  $("levelFill").style.width = "0%";
  setTimeout(() => { $("levelFill").style.width = pct + "%"; }, 200);

  $("certName").textContent = `${state.avatar} ${state.name}`;
  $("certScore").textContent = state.score;
  // Show school + grade in certificate if registered
  const certInfo = $("certInfo");
  if (certInfo && state.profile) {
    certInfo.textContent = `${state.profile.school} • ${state.profile.grade}-sinf`;
  }

  renderLeaderboard();
  switchScreen("result");

  // Send result to backend
  if (state.profile) {
    fetch("/api/result", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: state.userId || null,
        name: state.name,
        school: state.profile.school,
        grade: state.profile.grade,
        phone1: state.profile.phone1,
        avatar: state.avatar,
        score: state.score,
        correct: state.correct,
        wrong: state.wrong,
        total: total,
        accuracy: pct,
        level: level,
        badges: state.badges.map(b => `${b.emoji} ${b.name}`),
      }),
    }).catch(err => console.warn("result API error:", err));
  }

  if (pct >= 41) { sfx.win(); launchConfetti(180); }
}

/* ---------- Leaderboard ---------- */
function renderLeaderboard() {
  const KEY = "quizverse_leaderboard";
  let list = [];
  try { list = JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) {}
  const entry = { name: state.name, avatar: state.avatar, score: state.score, ts: Date.now() };
  list.push(entry);
  list.sort((a, b) => b.score - a.score);
  list = list.slice(0, 5);
  localStorage.setItem(KEY, JSON.stringify(list));

  const ol = $("leaderboardList");
  ol.innerHTML = "";
  list.forEach(u => {
    const li = document.createElement("li");
    if (u.ts === entry.ts) li.classList.add("me");
    li.innerHTML = `<span>${u.avatar || "👤"} ${u.name}</span><b>${u.score} XP</b>`;
    ol.appendChild(li);
  });
}

/* ---------- Restart / Share ---------- */
$("restartBtn").addEventListener("click", () => {
  sfx.click();
  switchScreen("start");
});
$("shareBtn").addEventListener("click", () => {
  const text = `Men QuizVerse'da ${state.score} XP to'pladim! 🚀 O'tib ko'rasizmi?`;
  if (navigator.share) navigator.share({ title: "QuizVerse", text }).catch(() => {});
  else if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
    showToast("Nusxa olindi! 📋");
  }
});

function showToast(msg) {
  let t = document.getElementById("toast");
  if (!t) {
    t = document.createElement("div");
    t.id = "toast";
    Object.assign(t.style, {
      position: "fixed", top: "14px", left: "50%",
      transform: "translateX(-50%)", background: "rgba(0,0,0,0.55)",
      color: "#fff", padding: "10px 18px", borderRadius: "999px",
      fontSize: "14px", fontWeight: "600", zIndex: 40,
      backdropFilter: "blur(10px)", opacity: 0,
      transition: "opacity .3s, transform .3s",
    });
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.opacity = 1; t.style.transform = "translate(-50%, 0)";
  clearTimeout(t._h);
  t._h = setTimeout(() => {
    t.style.opacity = 0; t.style.transform = "translate(-50%, -20px)";
  }, 1400);
}

/* ---------- Confetti ---------- */
function launchConfetti(count = 140) {
  const canvas = $("confetti");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const colors = ["#7c5cff", "#00d2ff", "#ff4ecd", "#ffd166", "#22e3a4"];
  const pieces = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: -20 - Math.random() * canvas.height,
    r: 4 + Math.random() * 6,
    c: colors[Math.floor(Math.random() * colors.length)],
    vy: 2 + Math.random() * 3,
    vx: -2 + Math.random() * 4,
    rot: Math.random() * Math.PI,
    vr: -0.2 + Math.random() * 0.4,
  }));
  let frame = 0;
  const maxFrames = 260;
  (function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.rot += p.vr;
      ctx.save();
      ctx.translate(p.x, p.y); ctx.rotate(p.rot);
      ctx.fillStyle = p.c;
      ctx.fillRect(-p.r, -p.r / 2, p.r * 2, p.r);
      ctx.restore();
    });
    frame++;
    if (frame < maxFrames) requestAnimationFrame(draw);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  })();
}
window.addEventListener("resize", () => {
  const c = $("confetti");
  c.width = window.innerWidth; c.height = window.innerHeight;
});
