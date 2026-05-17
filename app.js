const topicLabels = {
  work: "工作",
  love: "愛情",
  family: "親情",
  self: "自我",
};

const spreads = {
  flow: {
    name: "時間之流",
    labels: ["過去的根", "現在的流向", "未來的可能"],
    prompt: "時間之流會讓三張牌從過去、現在與未來的脈絡中浮現。",
  },
  triangle: {
    name: "聖三角",
    labels: ["目前狀況", "主要阻礙", "可行建議"],
    prompt: "聖三角會看見事件表層、卡住之處，以及可被採取的下一步。",
  },
  choice: {
    name: "二選一",
    labels: ["共同現況", "A 路線過程", "A 路線結果", "B 路線過程", "B 路線結果"],
    prompt: "先把 A 與 B 兩條路線想清楚，再一張一張抽出。",
  },
};

const majorCards = [
  ["愚者", "The Fool", "旅程", "天真、冒險、開端", "魯莽、逃避、準備不足", "cliff"],
  ["魔術師", "The Magician", "意志", "資源到位、主動創造", "分心、誇大、工具未整合", "wand"],
  ["女祭司", "The High Priestess", "直覺", "靜觀、秘密、內在智慧", "遲疑、封閉、訊息不明", "moon"],
  ["皇后", "The Empress", "滋養", "豐盛、照顧、自然生長", "過度付出、停滯、界線鬆動", "garden"],
  ["皇帝", "The Emperor", "秩序", "規範、責任、穩固結構", "僵化、控制、權威壓力", "throne"],
  ["教皇", "The Hierophant", "傳承", "學習、制度、承諾", "墨守成規、外在期待", "keys"],
  ["戀人", "The Lovers", "選擇", "吸引、結盟、價值一致", "分歧、誘惑、承諾搖擺", "lovers"],
  ["戰車", "The Chariot", "推進", "意志集中、勝利、掌舵", "失控、硬撐、方向拉扯", "chariot"],
  ["力量", "Strength", "柔韌", "耐心、溫柔制衡、勇氣", "壓抑、逞強、心力透支", "lion"],
  ["隱者", "The Hermit", "尋光", "獨處、內省、找回答案", "孤立、退縮、過度懷疑", "lantern"],
  ["命運之輪", "Wheel of Fortune", "轉機", "循環、機會、局勢翻轉", "延宕、反覆、被動等待", "wheel"],
  ["正義", "Justice", "衡量", "公平、契約、因果清楚", "偏頗、逃避責任、失衡", "scales"],
  ["吊人", "The Hanged Man", "換位", "暫停、犧牲、轉換視角", "拖延、委屈、卡住不動", "hanged"],
  ["死神", "Death", "更新", "結束、蛻變、清理舊殼", "抗拒改變、藕斷絲連", "horse"],
  ["節制", "Temperance", "調和", "整合、修復、節奏穩定", "失調、急躁、能量分散", "cups"],
  ["惡魔", "The Devil", "牽制", "慾望、執著、現實束縛", "鬆綁、看見依附、戒除", "chains"],
  ["高塔", "The Tower", "震動", "真相爆開、結構重建", "避震、拖住崩塌、恐懼變動", "tower"],
  ["星星", "The Star", "希望", "療癒、願景、重新信任", "失望、理想過高、信心不足", "star"],
  ["月亮", "The Moon", "迷霧", "潛意識、夢境、不確定", "疑慮消散、直覺校準", "moonpath"],
  ["太陽", "The Sun", "明朗", "成功、坦率、喜悅", "延遲的好消息、曝光過度", "sun"],
  ["審判", "Judgement", "召喚", "覺醒、回應使命、重新評估", "自責、逃避召喚、遲疑", "trumpet"],
  ["世界", "The World", "完成", "完成、整合、抵達新階段", "未竟之事、收尾不足", "wreath"],
];

const suitData = {
  wands: { zh: "權杖", en: "Wands", symbol: "♣", element: "火", color: "#9d3d2d", upright: "行動、熱情、企圖心", reversed: "衝動、耗竭、方向不穩" },
  cups: { zh: "聖杯", en: "Cups", symbol: "♥", element: "水", color: "#2f6f95", upright: "情感、關係、感受流動", reversed: "情緒淤塞、期待落差" },
  swords: { zh: "寶劍", en: "Swords", symbol: "♦", element: "風", color: "#6a6f7f", upright: "思辨、真相、決斷", reversed: "焦慮、誤解、言語傷害" },
  pentacles: { zh: "星幣", en: "Pentacles", symbol: "●", element: "土", color: "#82702d", upright: "資源、身體、物質穩定", reversed: "遲滯、匱乏感、分配失衡" },
};

const pipNames = [
  ["Ace", "一"], ["Two", "二"], ["Three", "三"], ["Four", "四"], ["Five", "五"],
  ["Six", "六"], ["Seven", "七"], ["Eight", "八"], ["Nine", "九"], ["Ten", "十"],
  ["Page", "侍者"], ["Knight", "騎士"], ["Queen", "皇后"], ["King", "國王"],
];

const pipTone = {
  1: ["新的火種", "種子剛落下，力量真實但仍需照料"],
  2: ["權衡與等待", "兩個方向同時牽動，選擇比速度更重要"],
  3: ["初步擴張", "已能看見回應，但仍要確認合作節奏"],
  4: ["穩定或停住", "安全感增加，也可能因安逸而不想移動"],
  5: ["摩擦與競爭", "矛盾被推上檯面，需要面對而非粉飾"],
  6: ["回應與修復", "有人願意伸手，局面開始有交換與善意"],
  7: ["防守與堅持", "立場需要被保護，但別把所有人都當成敵手"],
  8: ["加速與訊息", "事情移動很快，細節與節奏會決定品質"],
  9: ["累積後的警戒", "快抵達前仍有壓力，別因疲倦放棄判斷"],
  10: ["完成與負荷", "成果與責任一起到來，必須重新分配重量"],
  11: ["學習者的訊號", "新消息或新態度出現，仍帶著試探性"],
  12: ["推進者的力量", "能量明顯向前，但需要管理衝刺的代價"],
  13: ["成熟的感受力", "更能掌握局勢，也要避免把照顧變成掌控"],
  14: ["穩固的主導", "資源與權責集中，適合定規則與承擔結果"],
};

function buildDeck() {
  const majors = majorCards.map((card, index) => ({
    id: `major-${index}`,
    arcana: "major",
    number: index,
    zh: card[0],
    en: card[1],
    theme: card[2],
    upright: card[3],
    reversed: card[4],
    motif: card[5],
  }));

  const minors = Object.entries(suitData).flatMap(([suit, meta]) =>
    pipNames.map(([enRank, zhRank], index) => {
      const rank = index + 1;
      return {
        id: `${suit}-${rank}`,
        arcana: "minor",
        suit,
        rank,
        zh: `${meta.zh}${zhRank}`,
        en: `${enRank} of ${meta.en}`,
        theme: `${meta.element}元素`,
        upright: `${meta.upright}，${pipTone[rank][0]}`,
        reversed: `${meta.reversed}，${pipTone[rank][0]}失衡`,
        motif: suit,
      };
    }),
  );
  return [...majors, ...minors];
}

const deck = buildDeck();
let currentSpread = "flow";
let drawnCards = [];
let choiceIndex = 0;

const form = document.querySelector("#readingForm");
const choiceFields = document.querySelector("#choiceFields");
const deckEl = document.querySelector("#deck");
const ritualText = document.querySelector("#ritualText");
const drawArea = document.querySelector("#drawArea");
const manualDraw = document.querySelector("#manualDraw");
const drawNext = document.querySelector("#drawNext");
const manualHint = document.querySelector("#manualHint");
const results = document.querySelector("#results");
const resultList = document.querySelector("#resultList");
const summary = document.querySelector("#summary");
const startButton = document.querySelector("#startButton");
const resetButton = document.querySelector("#resetButton");

document.querySelectorAll("input[name='spread']").forEach((input) => {
  input.addEventListener("change", () => {
    currentSpread = input.value;
    choiceFields.hidden = currentSpread !== "choice";
    ritualText.textContent = spreads[currentSpread].prompt;
    clearReading();
  });
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const topics = selectedTopics();
  if (!topics.length) {
    ritualText.textContent = "至少勾選一個想問的面向，牌面才知道要往哪裡照亮。";
    return;
  }
  clearReading();
  startButton.disabled = true;
  deckEl.classList.add("shuffling");
  ritualText.textContent = currentSpread === "choice"
    ? "請在心裡穩住 A 與 B 的畫面。洗牌完成後，依序抽出五張牌。"
    : "洗牌中，請把問題放在心裡，不需要用力，只要誠實。";
  await pause(1200);
  deckEl.classList.remove("shuffling");
  startButton.disabled = false;

  if (currentSpread === "choice") {
    setupManualChoice();
  } else {
    drawnCards = drawMany(3);
    renderSlots(spreads[currentSpread].labels, drawnCards);
    revealSequentially(() => finishReading());
  }
});

drawNext.addEventListener("click", () => {
  if (choiceIndex >= spreads.choice.labels.length) return;
  if (!drawnCards.length) drawArea.innerHTML = "";
  const card = drawOne(drawnCards.map((item) => item.card.id));
  drawnCards.push(card);
  const labels = choiceLabels();
  appendSlot(labels[choiceIndex], card, choiceIndex);
  const currentCard = drawArea.querySelector(`[data-slot="${choiceIndex}"] .tarot-card`);
  requestAnimationFrame(() => currentCard.classList.add("revealed"));
  choiceIndex += 1;
  drawNext.textContent = choiceIndex < labels.length ? `抽出第 ${choiceIndex + 1} 張牌` : "五張牌已抽齊";
  manualHint.textContent = choiceIndex < labels.length ? labels[choiceIndex] : "牌面已成形，正在整理兩條路線的訊息。";
  if (choiceIndex === labels.length) {
    drawNext.disabled = true;
    finishReading();
  }
});

resetButton.addEventListener("click", clearReading);

function setupManualChoice() {
  drawnCards = [];
  choiceIndex = 0;
  drawArea.innerHTML = "";
  manualDraw.hidden = false;
  drawNext.disabled = false;
  drawNext.textContent = "抽出第一張牌";
  manualHint.textContent = "請先想好 A 路線與 B 路線，再按下按鈕抽現況牌。";
  ritualText.textContent = "二選一不是替你決定，而是把兩條路的代價與禮物攤開。";
}

function selectedTopics() {
  return [...document.querySelectorAll("input[name='topic']:checked")].map((input) => input.value);
}

function choiceLabels() {
  const a = document.querySelector("#routeA").value.trim() || "A 路線";
  const b = document.querySelector("#routeB").value.trim() || "B 路線";
  return ["共同現況", `${a}：過程`, `${a}：結果`, `${b}：過程`, `${b}：結果`];
}

function drawMany(count) {
  const taken = [];
  return Array.from({ length: count }, () => {
    const drawn = drawOne(taken);
    taken.push(drawn.card.id);
    return drawn;
  });
}

function drawOne(takenIds = []) {
  const pool = deck.filter((card) => !takenIds.includes(card.id));
  const card = pool[Math.floor(Math.random() * pool.length)];
  return {
    card,
    reversed: Math.random() < 0.42,
  };
}

function renderSlots(labels, cards) {
  drawArea.innerHTML = "";
  labels.forEach((label, index) => appendSlot(label, cards[index], index));
}

function appendSlot(label, drawn, index) {
  const slot = document.createElement("article");
  slot.className = "slot";
  slot.dataset.slot = index;
  slot.innerHTML = `
    <div class="slot-label">${label}</div>
    <div class="tarot-card ${drawn.reversed ? "is-reversed" : ""}">
      <div class="tarot-card-inner">
        <div class="back card-back"></div>
        <div class="front">
          <img alt="${drawn.card.zh}" src="${cardImage(drawn.card)}" />
        </div>
      </div>
    </div>
    <div class="card-name">
      <strong>${drawn.card.zh}</strong>
      <small>${drawn.reversed ? "逆位" : "正位"} · ${drawn.card.en}</small>
    </div>
  `;
  drawArea.append(slot);
}

async function revealSequentially(done) {
  const cards = [...drawArea.querySelectorAll(".tarot-card")];
  for (let i = 0; i < cards.length; i += 1) {
    ritualText.textContent = `第 ${i + 1} 張牌正在翻開。`;
    await pause(520);
    cards[i].classList.add("revealed");
  }
  await pause(360);
  done();
}

function finishReading() {
  const topics = selectedTopics();
  const labels = currentSpread === "choice" ? choiceLabels() : spreads[currentSpread].labels;
  results.hidden = false;
  summary.textContent = buildSummary(topics, labels);
  resultList.innerHTML = drawnCards.map((drawn, index) => `
    <article class="reading-card">
      <h3>${labels[index]}｜${drawn.card.zh}（${drawn.reversed ? "逆位" : "正位"}）</h3>
      <p>${interpret(drawn, labels[index], topics, currentSpread)}</p>
    </article>
  `).join("");
  ritualText.textContent = "牌面已經揭示，請把它當成一面鏡子，而不是命令。";
  results.scrollIntoView({ behavior: "smooth", block: "start" });
}

function buildSummary(topics, labels) {
  const topicText = topics.map((topic) => topicLabels[topic]).join("、");
  if (currentSpread === "choice") {
    return `本次二選一聚焦在「${topicText}」。這個牌陣會先看共同現況，再比較兩條路線的過程與可能結果；它不替你宣判哪條路絕對正確，而是協助你看見哪一邊更順勢，哪一邊需要付出更清醒的代價。`;
  }
  return `本次${spreads[currentSpread].name}聚焦在「${topicText}」。三張牌分別對應${labels.join("、")}；請把解讀視為目前能量的天氣圖，天氣會影響行動，但真正的方向仍由你調整。`;
}

function interpret(drawn, position, topics, spread) {
  const { card, reversed } = drawn;
  const polarity = reversed ? card.reversed : card.upright;
  const base = reversed
    ? `這張牌以逆位落在「${position}」，表示${card.theme}的力量被壓住或走得不太順。它不是單純的壞兆頭，比較像提醒你：某些期待、節奏或溝通方式正在讓事情繞遠路。${polarity}會讓人有一種明明已經很努力，卻還差臨門一腳的感覺。`
    : `這張牌以正位落在「${position}」，表示${card.theme}的力量正在較清楚地運作。${polarity}是它的主調，因此局面有可被掌握的部分；即使還有變數，也比較適合主動整理資訊、表達立場，或把已經浮現的機會接住。`;

  const topicText = topics.map((topic) => topicAdvice(topic, drawn, position)).join("");
  const spreadText = spreadAdvice(spread, position, drawn);
  const closing = reversed
    ? "建議你先不要急著把結果定死，尤其避免用恐懼做決定。把真正卡住的點寫下來，分辨哪些是事實、哪些只是想像；當你願意修正方法，這張逆位牌反而會變成轉向的入口。"
    : "建議你順著這股力量前進，但保留一點彈性。好牌不是保證零風險，而是提醒你目前有資源可以使用；把承諾說清楚、把時間安排穩，這份優勢就比較不會只是短暫的幸運。";
  return `${base}${topicText}${spreadText}${closing}`;
}

function topicAdvice(topic, drawn, position) {
  const { card, reversed } = drawn;
  const tone = reversed ? "需要先修正" : "可以被善用";
  const map = {
    work: `在工作上，${card.theme}${tone}：你可能遇到權責、時程或合作默契的考驗。若這張牌靠近結果位，代表成敗多半取決於你是否願意把模糊任務拆成可交付的步驟。`,
    love: `在愛情上，${card.theme}${tone}：它指向吸引、期待與安全感的互動。若關係正在曖昧或拉扯，別只看對方一句話，請看長期行為是否一致。`,
    family: `在親情上，${card.theme}${tone}：家人之間可能有舊模式正在重複。你不必一次說服所有人，但可以先把界線說得溫和而清楚，避免情緒替你發言。`,
    self: `在自我成長上，${card.theme}${tone}：這像是在問你是否真的聽見自己的需求。若你最近很累，請把「應該」和「願意」分開，答案會比較安靜地浮現。`,
  };
  return map[topic];
}

function spreadAdvice(spread, position, drawn) {
  if (spread === "flow") {
    if (position.includes("過去")) return "作為過去牌，它常指向已經形成的習慣或曾經做過的選擇；你不能改寫它，但可以重新理解它帶來的禮物與陰影。";
    if (position.includes("現在")) return "作為現在牌，它最值得立刻處理；這裡的訊息若被忽略，未來牌的好壞都會被放大。";
    return "作為未來牌，它描述的是沿著目前路線前進後較可能遇見的風景；若你調整行動，結果仍有改寫空間。";
  }
  if (spread === "triangle") {
    if (position.includes("狀況")) return "在狀況位，它像是事件的表層天氣，告訴你此刻最明顯的能量與情緒溫度。";
    if (position.includes("阻礙")) return "在阻礙位，它不一定是敵人，也可能是你尚未學會使用的力量；先承認卡點，才有下一步。";
    return "在建議位，它要求你把抽象感受落到具體行動，不用一次改變全部，只要先做最有把握的一步。";
  }
  if (position.includes("現況")) return "共同現況位通常是兩條路線都繞不開的核心議題，所以請先處理這裡，再比較 A 與 B 的表面差異。";
  if (position.includes("過程")) return "過程位比較像路上的氣候：它未必決定終點，卻會影響你一路上的消耗、信心與人際互動。";
  return "結果位呈現的是目前能量延伸出的傾向，不是永遠不變的結局；若這張牌提醒風險，越早調整越能降低代價。";
}

function cardImage(card) {
  const data = card.arcana === "major" ? majorSvg(card) : minorSvg(card);
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(data)}`;
}

function majorSvg(card) {
  const hue = (card.number * 31) % 360;
  const accent = `hsl(${hue} 48% 38%)`;
  const roman = ["0", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX", "XXI"][card.number];
  const motif = majorMotif(card.motif, accent);
  return `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 400">
    <rect width="250" height="400" fill="#f2e1b6"/>
    <rect x="12" y="12" width="226" height="376" fill="#fff4cf" stroke="#332414" stroke-width="4"/>
    <rect x="23" y="45" width="204" height="285" fill="#e9c979" stroke="#7e4c2f" stroke-width="2"/>
    <circle cx="125" cy="106" r="48" fill="${accent}" opacity=".85"/>
    <path d="M30 287 C65 235, 90 315, 125 264 S189 236, 220 286 L220 330 L30 330 Z" fill="#6f7544" opacity=".8"/>
    ${motif}
    <text x="125" y="36" text-anchor="middle" font-family="Georgia, serif" font-size="20" fill="#332414">${roman}</text>
    <text x="125" y="366" text-anchor="middle" font-family="serif" font-size="20" font-weight="700" fill="#332414">${escapeXml(card.zh)}</text>
    <text x="125" y="385" text-anchor="middle" font-family="Georgia, serif" font-size="12" fill="#6b4c2c">${escapeXml(card.en)}</text>
  </svg>`;
}

function majorMotif(type, color) {
  const common = `stroke="#2d2116" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"`;
  const motifs = {
    cliff: `<path d="M74 292 L124 176 L176 292" fill="#efe3ba" ${common}/><circle cx="125" cy="154" r="18" fill="#f7d36d" ${common}/><path d="M102 195 L74 226 M148 195 L180 223" ${common}/>` ,
    wand: `<path d="M125 260 L125 140" ${common}/><circle cx="125" cy="124" r="22" fill="#f7d36d" ${common}/><path d="M86 205 L164 205 M98 172 L152 238" ${common}/>` ,
    moon: `<path d="M144 118 A45 45 0 1 0 144 206 A30 45 0 1 1 144 118" fill="#f7e8b3" ${common}/><path d="M83 265 Q125 228 167 265" fill="none" ${common}/>` ,
    garden: `<circle cx="125" cy="160" r="30" fill="#e56a58" ${common}/><path d="M125 190 V275 M88 232 C115 220 112 252 125 251 M162 232 C135 220 138 252 125 251" ${common}/>` ,
    throne: `<rect x="78" y="144" width="94" height="122" fill="${color}" ${common}/><path d="M72 142 H178 L166 103 H84 Z M86 266 L70 316 M164 266 L180 316" fill="none" ${common}/>` ,
    keys: `<path d="M125 104 V284 M94 174 H156" ${common}/><circle cx="103" cy="280" r="20" fill="none" ${common}/><circle cx="147" cy="280" r="20" fill="none" ${common}/>` ,
    lovers: `<circle cx="96" cy="148" r="18" fill="#f2d0ae" ${common}/><circle cx="154" cy="148" r="18" fill="#f2d0ae" ${common}/><path d="M84 178 Q125 232 166 178 M125 105 C108 78 67 97 83 132 C96 158 125 166 125 166 C125 166 154 158 167 132 C183 97 142 78 125 105" fill="#d64c4c" ${common}/>` ,
    chariot: `<rect x="72" y="168" width="106" height="76" fill="${color}" ${common}/><circle cx="96" cy="258" r="17" fill="#332414"/><circle cx="154" cy="258" r="17" fill="#332414"/><path d="M94 160 L88 112 M156 160 L162 112" ${common}/>` ,
    lion: `<circle cx="125" cy="180" r="48" fill="#c67c2c" ${common}/><circle cx="107" cy="174" r="5"/><circle cx="143" cy="174" r="5"/><path d="M105 209 Q125 226 145 209 M80 132 Q125 92 170 132" fill="none" ${common}/>` ,
    lantern: `<path d="M125 120 V292 M95 148 H155 L145 210 H105 Z" fill="#f7d36d" ${common}/><path d="M90 292 H160" ${common}/>` ,
    wheel: `<circle cx="125" cy="190" r="66" fill="none" ${common}/><circle cx="125" cy="190" r="22" fill="${color}" ${common}/><path d="M125 124 V256 M59 190 H191 M80 145 L170 235 M170 145 L80 235" ${common}/>` ,
    scales: `<path d="M125 118 V276 M82 148 H168 M82 148 L62 216 H102 Z M168 148 L148 216 H188 Z" fill="none" ${common}/>` ,
    hanged: `<path d="M70 110 H180 M125 110 V260 M103 142 Q125 170 147 142 M125 260 L105 306 M125 260 L145 306" ${common}/>` ,
    horse: `<path d="M70 245 C90 150 168 145 183 238 C164 217 137 217 120 250 C107 223 87 223 70 245 Z" fill="#eee6d1" ${common}/><path d="M96 126 L154 306" ${common}/>` ,
    cups: `<path d="M82 130 C82 190 113 196 125 214 C137 196 168 190 168 130 Z" fill="#7aa0a8" ${common}/><path d="M83 265 C111 236 139 294 167 265" fill="none" ${common}/>` ,
    chains: `<path d="M82 154 C50 210 93 270 125 230 C157 270 200 210 168 154" fill="${color}" ${common}/><path d="M88 258 Q125 292 162 258 M82 132 L168 280" ${common}/>` ,
    tower: `<path d="M92 295 L105 113 L154 113 L168 295 Z" fill="#b9ada0" ${common}/><path d="M92 94 L125 46 L158 94 M82 135 L60 105 M168 155 L197 121" fill="none" ${common}/>` ,
    star: `<path d="M125 92 L139 143 L192 143 L149 173 L165 224 L125 192 L85 224 L101 173 L58 143 L111 143 Z" fill="#f7d36d" ${common}/><path d="M86 276 Q125 245 164 276" fill="none" ${common}/>` ,
    moonpath: `<path d="M145 94 A50 50 0 1 0 145 194 A30 50 0 1 1 145 94" fill="#f5e6ab" ${common}/><path d="M80 302 C103 230 147 230 170 302" fill="none" ${common}/>` ,
    sun: `<circle cx="125" cy="150" r="52" fill="#f2bc35" ${common}/><path d="M125 70 V45 M125 255 V230 M45 150 H70 M180 150 H205 M70 95 L52 78 M180 95 L198 78 M70 205 L52 222 M180 205 L198 222" ${common}/>` ,
    trumpet: `<path d="M91 127 L165 96 L147 174 Z" fill="#f7d36d" ${common}/><path d="M102 178 C105 240 145 240 148 178 M86 282 H164" fill="none" ${common}/>` ,
    wreath: `<ellipse cx="125" cy="190" rx="62" ry="95" fill="none" ${common}/><path d="M86 112 Q125 88 164 112 M86 268 Q125 292 164 268" fill="none" ${common}/><circle cx="125" cy="190" r="25" fill="${color}" ${common}/>` ,
  };
  return motifs[type] || motifs.star;
}

function minorSvg(card) {
  const suit = suitData[card.suit];
  const positions = symbolPositions(card.rank);
  const symbols = positions.map(([x, y, size]) => drawSuit(suit.symbol, x, y, size, suit.color)).join("");
  const court = card.rank > 10 ? courtFigure(card.rank, suit.color) : "";
  return `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 400">
    <rect width="250" height="400" fill="#f2e1b6"/>
    <rect x="12" y="12" width="226" height="376" fill="#fff4cf" stroke="#332414" stroke-width="4"/>
    <rect x="25" y="52" width="200" height="276" fill="#edd28d" stroke="#8c5b34" stroke-width="2"/>
    <text x="34" y="38" font-family="Georgia, serif" font-size="22" fill="#332414">${card.rank <= 10 ? card.rank : card.en[0]}</text>
    <text x="216" y="382" text-anchor="end" font-family="Georgia, serif" font-size="22" fill="#332414">${suit.symbol}</text>
    ${symbols}
    ${court}
    <text x="125" y="360" text-anchor="middle" font-family="serif" font-size="18" font-weight="700" fill="#332414">${escapeXml(card.zh)}</text>
    <text x="125" y="380" text-anchor="middle" font-family="Georgia, serif" font-size="11" fill="#6b4c2c">${escapeXml(card.en)}</text>
  </svg>`;
}

function symbolPositions(rank) {
  if (rank > 10) return [[125, 160, 44], [85, 252, 25], [165, 252, 25]];
  const slots = [
    [125, 185, 46], [82, 118, 32], [168, 118, 32], [82, 252, 32], [168, 252, 32],
    [125, 102, 27], [125, 270, 27], [82, 185, 30], [168, 185, 30], [125, 222, 27],
  ];
  const orders = {
    1: [0], 2: [1, 4], 3: [1, 0, 4], 4: [1, 2, 3, 4], 5: [1, 2, 0, 3, 4],
    6: [1, 2, 7, 8, 3, 4], 7: [5, 1, 2, 7, 8, 3, 4], 8: [5, 1, 2, 7, 8, 3, 4, 6],
    9: [5, 1, 2, 7, 0, 8, 3, 4, 6], 10: [5, 1, 2, 7, 0, 8, 9, 3, 4, 6],
  };
  return orders[rank].map((index) => slots[index]);
}

function drawSuit(symbol, x, y, size, color) {
  return `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle" font-size="${size}" fill="${color}" font-family="Georgia, serif">${symbol}</text>`;
}

function courtFigure(rank, color) {
  const crowns = {
    11: "M96 122 L112 92 L126 122 L140 92 L156 122 Z",
    12: "M95 126 L125 84 L155 126 Z",
    13: "M92 122 L108 92 L125 116 L142 92 L158 122 Z",
    14: "M88 122 L104 88 L125 116 L146 88 L162 122 Z",
  };
  return `
    <path d="${crowns[rank]}" fill="#d5a84f" stroke="#332414" stroke-width="4" stroke-linejoin="round"/>
    <circle cx="125" cy="160" r="32" fill="#f0c9a0" stroke="#332414" stroke-width="4"/>
    <path d="M82 292 C86 224 164 224 168 292 Z" fill="${color}" stroke="#332414" stroke-width="4"/>
    <path d="M96 181 Q125 210 154 181" fill="none" stroke="#332414" stroke-width="4" stroke-linecap="round"/>
  `;
}

function clearReading() {
  drawnCards = [];
  choiceIndex = 0;
  drawArea.innerHTML = "";
  results.hidden = true;
  resultList.innerHTML = "";
  summary.textContent = "";
  manualDraw.hidden = true;
  drawNext.disabled = false;
  startButton.disabled = false;
  deckEl.classList.remove("shuffling");
  ritualText.textContent = spreads[currentSpread].prompt;
}

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function pause(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

clearReading();
