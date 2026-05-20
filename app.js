const SOURCE_URL = "https://sacred-texts.com/tarot/pkt/index.htm";
const IMAGE_SOURCE_URL = "https://commons.wikimedia.org/wiki/Category:Rider-Waite_tarot_deck_(Roses_%26_Lilies)";
const CARD_RATIO = 70 / 121;
const STEPS = ["question", "focus", "spread", "details", "draw", "result"];

const majorImageNames = [
  "00 Fool", "01 Magician", "02 High Priestess", "03 Empress", "04 Emperor", "05 Hierophant",
  "06 Lovers", "07 Chariot", "08 Strength", "09 Hermit", "10 Wheel of Fortune", "11 Justice",
  "12 Hanged Man", "13 Death", "14 Temperance", "15 Devil", "16 Tower", "17 Star",
  "18 Moon", "19 Sun", "20 Judgement", "21 World",
];

const rankNumbers = {
  Ace: "01",
  Two: "02",
  Three: "03",
  Four: "04",
  Five: "05",
  Six: "06",
  Seven: "07",
  Eight: "08",
  Nine: "09",
  Ten: "10",
  Page: "11",
  Knight: "12",
  Queen: "13",
  King: "14",
};

function commonsImageUrl(fileName) {
  return `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(fileName)}`;
}

const topicLabels = {
  work: "工作",
  love: "愛情",
  family: "親情",
  self: "自我",
};

const topicHints = {
  work: "職涯、合作與資源",
  love: "曖昧、伴侶與相處節奏",
  family: "家人、照顧與界線",
  self: "自我理解、狀態整理與內在需求",
};

const spreads = {
  flow: {
    name: "時間之流",
    labels: ["過去的根", "現在的流向", "未來的可能"],
    hint: "想看事情如何形成、現在在哪裡，以及後續可能往哪裡走。",
  },
  triangle: {
    name: "聖三角",
    labels: ["目前狀況", "主要阻礙", "可行方向"],
    hint: "把問題拆成現況、困難與可參考的行動方向。",
  },
  choice: {
    name: "二選一",
    labels: ["共同現況", "A 路線過程", "A 路線結果", "B 路線過程", "B 路線結果"],
    hint: "已經有兩個選項，想比較兩條路的過程與結果。",
  },
};

const positionNotes = {
  flow: [
    "事情的背景或正在影響現在的根源。",
    "此刻正在運作的能量，以及眼前需要看見的主題。",
    "依目前狀態延伸出的趨勢、可能發展或後續氣氛。",
  ],
  triangle: [
    "事件表面正呈現的樣子。",
    "當前需要留意的因素。",
    "未來處理方式或下一步的方向。",
  ],
  choice: [
    "A 與 B 兩條路共同的背景與起點。",
    "選擇 A 時，中途呈現的狀態或需要經歷的階段。",
    "A 路線延伸出的可能結果或收束狀態。",
    "選擇 B 時，中途呈現的狀態或需要經過的階段。",
    "B 路線延伸出的可能結果或收束狀態。",
  ],
};

const majorCards = [
  ["愚者", "The Fool", "愚行、狂熱、放縱、失序與未定形的衝動。", "疏忽、空缺、冷漠、虛榮與無結果的行動。"],
  ["魔術師", "The Magician", "技藝、機敏、意志、自信，以及能運用手邊工具。", "技巧誤用、心神不寧、欺瞞、失手或能力未能正當發揮。"],
  ["女祭司", "The High Priestess", "秘密、神祕、尚未揭露的未來、直覺與隱藏知識。", "表面知識、激情、過度主觀，或隱情被誤讀。"],
  ["皇后", "The Empress", "豐饒、行動、主動性、孕育、成形與感官世界。", "遲疑、真相浮現、事情揭開，原本的秩序可能鬆動。"],
  ["皇帝", "The Emperor", "秩序、權力、保護、實現、規則與掌控。", "不成熟、阻礙、控制失衡，或權威變得僵硬。"],
  ["教皇", "The Hierophant", "婚姻、同盟、慈悲、傳統、制度與精神指引。", "過度順從、脆弱、反常規，或信念與制度的拉扯。"],
  ["戀人", "The Lovers", "吸引、愛、美、考驗、選擇與關係中的試煉。", "失敗、分離、選擇失準，或情感考驗未能通過。"],
  ["戰車", "The Chariot", "勝利、克服、援助、掌控與意志推進。", "失控、爭端、敗退、方向錯置或掌控力下降。"],
  ["力量", "Strength", "力量、勇氣、耐心、柔性控制與內在韌性。", "軟弱、濫用力量、失去耐性或意志搖擺。"],
  ["隱者", "The Hermit", "審慎、尋求、內省、指引與深思後的判斷。", "孤立、恐懼、過度保守、隱瞞或拒絕建議。"],
  ["命運之輪", "Wheel of Fortune", "命運、變化、轉折、幸運與循環。", "延遲、壞運、循環受阻或變化不如預期。"],
  ["正義", "Justice", "公平、正義、因果、法律、平衡與清楚判斷。", "不公、偏見、複雜化、失衡或判斷失準。"],
  ["吊人", "The Hanged Man", "智慧、試煉、犧牲、暫停與換位觀看。", "無意義的犧牲、自我中心、停滯或抗拒轉念。"],
  ["死神", "Death", "結束、轉變、死亡象徵、舊狀態的終止。", "遲滯、惰性、睡眠、改變延後或無法斷尾。"],
  ["節制", "Temperance", "節制、調和、管理、混合與中庸。", "衝突、分裂、失調、過量或關係不合。"],
  ["惡魔", "The Devil", "束縛、誘惑、物質執著、暴力力量與被牽制。", "鬆綁、弱化、擺脫束縛，但也可能仍受恐懼牽制。"],
  ["高塔", "The Tower", "突變、崩塌、災難、舊結構破裂與真相震動。", "壓抑中的崩塌、拖延的破局、受困或不願放手。"],
  ["星星", "The Star", "希望、明亮前景、洞察、靈感與精神上的慰藉。", "失望、驕傲、信心不足，或希望未能落地。"],
  ["月亮", "The Moon", "隱憂、迷霧、欺瞞、恐懼、夢境與潛意識。", "情勢搖晃、較小的欺瞞、危機漸退但仍未明朗。"],
  ["太陽", "The Sun", "快樂、成功、滿足、活力與清楚可見的成果。", "延遲的成功、較弱的幸福，或喜悅未完全展開。"],
  ["審判", "Judgement", "更新、召喚、判斷、甦醒與位置改變。", "遲疑、軟弱、簡單判斷失準，或不願回應召喚。"],
  ["世界", "The World", "完成、成功、旅程、整合與一個循環的圓滿。", "停滯、固定、慣性、完成受阻或不願跨出下一步。"],
];

const minorCards = [
  ["wands", "權杖", "Wands", "Ace", "一", "創造、開始、事業、誕生與新的能量。", "衰退、挫敗、空轉、開始受阻或喜悅被遮蔽。"],
  ["wands", "權杖", "Wands", "Two", "二", "財富、遠景、成就，但也帶有不滿與等待。", "驚訝、恐懼、迷惑，局勢超出預期。"],
  ["wands", "權杖", "Wands", "Three", "三", "已建立的力量、貿易、合作與向外拓展。", "辛勞終止、麻煩收束，但成果仍有限。"],
  ["wands", "權杖", "Wands", "Four", "四", "安居、和諧、收成、休息與家庭式的歡慶。", "繁榮、美化、表面愉快，或安定感較浮動。"],
  ["wands", "權杖", "Wands", "Five", "五", "競爭、衝突、模擬戰、爭奪與意見交鋒。", "爭訟、詭計、糾紛，競爭變得不正當。"],
  ["wands", "權杖", "Wands", "Six", "六", "勝利、好消息、成功、眾望所歸與凱旋。", "遲延、憂懼、消息未至或勝利尚未落定。"],
  ["wands", "權杖", "Wands", "Seven", "七", "勇氣、抵抗、談判、在壓力中守住位置。", "困惑、尷尬、焦慮，立場難以維持。"],
  ["wands", "權杖", "Wands", "Eight", "八", "快速行動、訊息、急速發展與事情逼近。", "嫉妒、爭吵、內部衝突或進展受干擾。"],
  ["wands", "權杖", "Wands", "Nine", "九", "防備、堅持、延遲、在壓力後仍守住力量。", "阻礙、逆境、災厄或防線疲弱。"],
  ["wands", "權杖", "Wands", "Ten", "十", "壓迫、負擔、責任過重，但也代表承擔成果。", "困難、陰謀、反覆與負擔失控。"],
  ["wands", "權杖", "Wands", "Page", "侍者", "信使、忠誠的人、消息、活力與觀察中的年輕能量。", "壞消息、猶豫、流言、訊息失準。"],
  ["wands", "權杖", "Wands", "Knight", "騎士", "離開、遷移、變動、熱烈行動與快速轉向。", "破裂、分離、干擾、行動被打斷。"],
  ["wands", "權杖", "Wands", "Queen", "皇后", "親切、貞潔、友善、熱情與可靠的支持。", "嫉妒、反覆、狹隘或善意被扭曲。"],
  ["wands", "權杖", "Wands", "King", "國王", "誠實、成熟、熱情、領導與實際的善意。", "嚴厲、固執、過度控制，或權威不易親近。"],
  ["cups", "聖杯", "Cups", "Ace", "一", "喜悅、滿足、真心、情感的居所與愛的開始。", "虛情、情感起伏、變動、關係中的不可靠。"],
  ["cups", "聖杯", "Cups", "Two", "二", "愛、友誼、結合、和解與彼此吸引。", "假愛、誤會、愚行、關係中的不一致。"],
  ["cups", "聖杯", "Cups", "Three", "三", "圓滿、豐盛、慶祝、團聚與事情告一段落。", "過度、享樂、拖延，或成果來得太匆促。"],
  ["cups", "聖杯", "Cups", "Four", "四", "厭倦、冷淡、倦怠、對既有事物失去興趣。", "新鮮感、新關係、新指示或重新打開的可能。"],
  ["cups", "聖杯", "Cups", "Five", "五", "失落、失望、遺憾；但仍有部分保留。", "消息、回返、重新連結，舊事有機會再被拾起。"],
  ["cups", "聖杯", "Cups", "Six", "六", "過去、回憶、童年、舊事物與單純情感。", "未來、更新、即將到來的新方向。"],
  ["cups", "聖杯", "Cups", "Seven", "七", "幻想、想像、倒影、選項繁多但未必實在。", "意志、決心、欲望收束，開始辨認真正目標。"],
  ["cups", "聖杯", "Cups", "Eight", "八", "放棄、離開、成功後的退去、情感轉淡。", "大喜、宴樂、節慶或情感重新被點燃。"],
  ["cups", "聖杯", "Cups", "Nine", "九", "滿足、安逸、物質與情感上的舒適。", "錯誤、缺陷、不完美，滿足感打了折扣。"],
  ["cups", "聖杯", "Cups", "Ten", "十", "家庭幸福、內心安定、和諧與長久的滿足。", "家庭或情感失和、憤怒、暴力情緒或心意不真。"],
  ["cups", "聖杯", "Cups", "Page", "侍者", "年輕溫和的人、學習、消息、沉思與情感萌芽。", "誘惑、欺瞞、情感不成熟，或訊息不可靠。"],
  ["cups", "聖杯", "Cups", "Knight", "騎士", "到來、邀請、靠近、提議與友善的接觸。", "欺詐、策略、虛飾、表面禮貌下的不真。"],
  ["cups", "聖杯", "Cups", "Queen", "皇后", "善良、愛、想像力、直覺與能給予情感支持的人。", "不可靠、變動、過度想像，或情感判斷失準。"],
  ["cups", "聖杯", "Cups", "King", "國王", "公平、藝術、學問、法律、責任感與成熟情感。", "雙面、欺瞞、不義、醜聞或情感上的不誠實。"],
  ["swords", "寶劍", "Swords", "Ace", "一", "勝利、征服、力量、清楚判斷與切開局面的能力。", "災難、暴力、暴政、力量反噬或判斷過硬。"],
  ["swords", "寶劍", "Swords", "Two", "二", "平衡、停戰、克制、保留與暫時的和諧。", "欺瞞、虛假、雙重性，表面的平衡不可靠。"],
  ["swords", "寶劍", "Swords", "Three", "三", "分離、悲傷、延遲、破裂、移除與心痛。", "混亂、錯誤、精神不安或傷痛未能整理。"],
  ["swords", "寶劍", "Swords", "Four", "四", "休息、退隱、暫停、警醒與恢復。", "預防、節制、經濟安排，或休息後的重新部署。"],
  ["swords", "寶劍", "Swords", "Five", "五", "失敗、羞辱、破壞、損失與不光彩的勝負。", "弱化、葬送、結果不確定，損失仍在延續。"],
  ["swords", "寶劍", "Swords", "Six", "六", "旅程、轉移、過渡、路線與從困境中移開。", "告白、公開、宣告或原本隱藏的事情浮現。"],
  ["swords", "寶劍", "Swords", "Seven", "七", "計畫、企圖、策略、希望與不完全正面的取巧。", "建議、忠告、指引，或策略需要被重新審視。"],
  ["swords", "寶劍", "Swords", "Eight", "八", "限制、危機、束縛、壞消息與無法自由行動。", "不安、意外、背叛、困難仍未完全解除。"],
  ["swords", "寶劍", "Swords", "Nine", "九", "失敗、絕望、痛苦、擔憂、惡夢與精神壓力。", "懷疑、羞愧、禁錮、恐懼仍然存在。"],
  ["swords", "寶劍", "Swords", "Ten", "十", "痛苦、終結、淚水、荒涼與重擊後的狀態。", "短暫利益、好轉有限、成功尚未落定或只是暫緩。"],
  ["swords", "寶劍", "Swords", "Page", "侍者", "警覺、偵查、監視、權威訊息與敏銳觀察。", "意外、無力、疾病或觀察變成猜疑。"],
  ["swords", "寶劍", "Swords", "Knight", "騎士", "勇敢、技巧、衝鋒、戰鬥精神與強烈行動。", "魯莽、無能、浪費力量或衝動失控。"],
  ["swords", "寶劍", "Swords", "Queen", "皇后", "悲傷、寡居、獨立、清醒判斷與冷峻智慧。", "惡意、偏狹、欺瞞、尖刻或判斷傷人。"],
  ["swords", "寶劍", "Swords", "King", "國王", "判斷、命令、權威、法律與理性控制。", "殘酷、邪惡意圖、濫權或冷酷的判決。"],
  ["pentacles", "星幣", "Pentacles", "Ace", "一", "財富、滿足、黃金、實際資源與物質開始。", "財富的負面、貪婪、錯誤消息或資源受阻。"],
  ["pentacles", "星幣", "Pentacles", "Two", "二", "娛樂、往來、變動中的平衡、消息與多工。", "假裝的愉快、勉強維持、消息或安排生變。"],
  ["pentacles", "星幣", "Pentacles", "Three", "三", "技藝、工作、交易、熟練與被看見的專業。", "平庸、幼稚、弱點、技術或成果不足。"],
  ["pentacles", "星幣", "Pentacles", "Four", "四", "持有、財產安全、禮物、遺產與保守累積。", "延遲、懸而未決、阻礙或過度守成。"],
  ["pentacles", "星幣", "Pentacles", "Five", "五", "貧困、物質困難、孤立、缺乏與現實壓力。", "混亂、失序、破敗，但困境型態開始改變。"],
  ["pentacles", "星幣", "Pentacles", "Six", "六", "贈與、分享、報酬、慈善與資源分配。", "嫉妒、貪欲、欲望不均或施受關係失衡。"],
  ["pentacles", "星幣", "Pentacles", "Seven", "七", "金錢、等待收成、事業盤算與成果未定。", "焦慮、急躁、金錢壓力或回報不如預期。"],
  ["pentacles", "星幣", "Pentacles", "Eight", "八", "工作、學徒、技能、專注與逐步累積。", "虛榮、野心落空、偷懶或技術使用不正。"],
  ["pentacles", "星幣", "Pentacles", "Nine", "九", "謹慎、安全、完成、獨立與舒適成果。", "欺瞞、壞信、失竊或表面安定下的不可靠。"],
  ["pentacles", "星幣", "Pentacles", "Ten", "十", "財富、家族、繼承、牢固結構與長期資源。", "偶然、風險、失竊、家庭或財務結構生變。"],
  ["pentacles", "星幣", "Pentacles", "Page", "侍者", "學習、專注、研究、消息與對實際事物的投入。", "浪費、散漫、壞消息或無法專心累積。"],
  ["pentacles", "星幣", "Pentacles", "Knight", "騎士", "實用、責任、耐心、可靠執行與持續推進。", "停滯、懶散、漫不經心，或責任變成沉重。"],
  ["pentacles", "星幣", "Pentacles", "Queen", "皇后", "富足、慷慨、安全、實際照顧與資源管理。", "疑心、依賴、忽略現實，或安全感失衡。"],
  ["pentacles", "星幣", "Pentacles", "King", "國王", "商業、能力、安定、成功、成熟資源與可靠掌控。", "貪婪、腐敗、固執、風險與物質上的失德。"],
];

const deck = buildDeck();
const stage = document.querySelector("#stage");
const stepIndicator = document.querySelector("#stepIndicator");

const state = {
  step: "question",
  topic: "work",
  question: "",
  spread: "flow",
  routeA: "",
  routeB: "",
  drawn: [],
  drawComplete: false,
  isDrawing: false,
  status: "",
};

function buildDeck() {
  const majors = majorCards.map(([zh, en, upright, reversed], index) => ({
    id: `major-${index}`,
    arcana: "major",
    zh,
    en,
    upright,
    reversed,
    image: commonsImageUrl(`RWS1909 - ${majorImageNames[index]}.jpeg`),
  }));

  const minors = minorCards.map(([suit, suitZh, suitEn, rankEn, rankZh, upright, reversed], index) => ({
    id: `${suit}-${rankEn.toLowerCase()}`,
    arcana: "minor",
    suit,
    zh: `${suitZh}${rankZh}`,
    en: `${rankEn} of ${suitEn}`,
    upright,
    reversed,
    image: commonsImageUrl(`RWS1909 - ${suitEn} ${rankNumbers[rankEn]}.jpeg`),
  }));

  return [...majors, ...minors];
}

function render() {
  renderStepIndicator();
  const views = {
    question: renderQuestion,
    focus: renderFocus,
    spread: renderSpread,
    details: renderDetails,
    draw: renderDraw,
    result: renderResult,
  };
  stage.innerHTML = views[state.step]();
  bindScreenEvents();
}

function renderStepIndicator() {
  const visibleSteps = state.spread === "choice" ? STEPS : STEPS.filter((step) => step !== "details");
  stepIndicator.innerHTML = visibleSteps.map((step) => (
    `<span class="step-dot ${step === state.step ? "is-active" : ""}" title="${stepLabel(step)}"></span>`
  )).join("");
}

function renderQuestion() {
  return `
    <section class="screen">
      <div class="copy">
        <p class="eyebrow">Step 01</p>
        <h1>想問什麼事情？</h1>
        <p>選一個面向，寫下一句清楚的問題。結果會列出牌位、正逆位與傳統牌義，保留給解讀者說明。</p>
      </div>
      <form class="panel" id="questionForm">
        <div class="field">
          <label for="questionInput">你的問題</label>
          <textarea id="questionInput" maxlength="140" placeholder="例如：接下來三個月，我在目前工作上需要看見什麼？">${escapeHtml(state.question)}</textarea>
        </div>
        <div class="choice-grid topic-grid" role="radiogroup" aria-label="想問的面向">
          ${Object.entries(topicLabels).map(([key, label]) => optionMarkup("topic", key, label, topicHints[key], state.topic === key)).join("")}
        </div>
        <div class="actions">
          <button class="button" type="submit">下一步</button>
        </div>
      </form>
    </section>
  `;
}

function renderFocus() {
  return `
    <section class="screen">
      <div class="copy">
        <p class="eyebrow">Step 02</p>
        <h2>把問題放在心裡</h2>
        <p>默念一次你的問題。讓注意力停在「${escapeHtml(topicLabels[state.topic])}」這件事上。</p>
      </div>
      <div class="panel calm-panel">
        <div class="question-card">
          <span>${escapeHtml(topicLabels[state.topic])}</span>
          <strong>${escapeHtml(state.question || "我想看清楚這件事目前的狀態。")}</strong>
        </div>
        <div class="breath-ring" aria-hidden="true"></div>
        <p class="muted">準備好後，再選擇適合這個問題的牌陣。</p>
        <div class="actions">
          <button class="button secondary" type="button" data-back="question">上一步</button>
          <button class="button" type="button" data-next="spread">選擇牌陣</button>
        </div>
      </div>
    </section>
  `;
}

function renderSpread() {
  return `
    <section class="screen">
      <div class="copy">
        <p class="eyebrow">Step 03</p>
        <h2>選擇牌陣</h2>
        <p>時間之流與聖三角會直接抽三張牌。二選一會依序抽出現況、A 路線與 B 路線。</p>
      </div>
      <form class="panel" id="spreadForm">
        <div class="choice-grid spread-grid" role="radiogroup" aria-label="選擇牌陣">
          ${Object.entries(spreads).map(([key, spread]) => optionMarkup("spread", key, spread.name, spread.hint, state.spread === key)).join("")}
        </div>
        <div class="actions">
          <button class="button secondary" type="button" data-back="focus">上一步</button>
          <button class="button" type="submit">下一步</button>
        </div>
      </form>
    </section>
  `;
}

function renderDetails() {
  return `
    <section class="screen">
      <div class="copy">
        <p class="eyebrow">Step 04</p>
        <h2>先定義 A 與 B</h2>
        <p>開始前先寫下 A 路線和 B 路線。名稱簡短即可，內容請對應你正在比較的兩個選項。</p>
      </div>
      <form class="panel" id="choiceForm">
        <div class="field">
          <label for="routeA">A 路線</label>
          <input id="routeA" maxlength="36" value="${escapeHtml(state.routeA)}" placeholder="例如：留在原職、主動告白、搬出去住" />
        </div>
        <div class="field">
          <label for="routeB">B 路線</label>
          <input id="routeB" maxlength="36" value="${escapeHtml(state.routeB)}" placeholder="例如：接受新工作、保持距離、暫時觀察" />
        </div>
        <div class="actions">
          <button class="button secondary" type="button" data-back="spread">上一步</button>
          <button class="button" type="submit">開始抽牌</button>
        </div>
      </form>
    </section>
  `;
}

function renderDraw() {
  const labels = activeLabels();
  const drawnCount = state.drawn.length;
  const readyToResult = state.drawComplete && drawnCount === labels.length;
  const drawButtonText = state.spread === "choice"
    ? (drawnCount ? `抽出第 ${drawnCount + 1} 張牌` : "抽出第一張現況牌")
    : "開始洗牌抽牌";
  const nextLabel = labels[drawnCount] || "牌面已成形";

  return `
    <section class="screen">
      <div class="copy">
        <p class="eyebrow">Step ${state.spread === "choice" ? "05" : "04"}</p>
        <h2>${state.drawn.length ? "牌面正在展開" : "準備抽牌"}</h2>
        <p>${drawInstruction(nextLabel)}</p>
      </div>
      <div class="panel">
        ${state.drawn.length ? renderDrawnSlots(labels) : renderAltar()}
        <div class="actions">
          <button class="button secondary" type="button" data-back="${state.spread === "choice" ? "details" : "spread"}" ${state.isDrawing ? "disabled" : ""}>上一步</button>
          ${readyToResult
            ? `<button class="button" type="button" data-next="result">查看結果</button>`
            : `<button class="button" type="button" id="drawButton" ${state.isDrawing ? "disabled" : ""}>${state.isDrawing ? "洗牌中" : drawButtonText}</button>`
          }
        </div>
      </div>
    </section>
  `;
}

function renderResult() {
  const labels = activeLabels();
  return `
    <section class="screen results-screen">
      <div class="result-layout">
        <div class="copy result-heading">
          <p class="eyebrow">Result</p>
          <h2>牌面結果</h2>
          <p>${escapeHtml(topicLabels[state.topic])} · ${escapeHtml(spreads[state.spread].name)}。以下列出牌位與傳統牌義，解讀者可依問題說明。</p>
        </div>
        <div class="result-summary" id="resultCapture">
          <div class="question-card">
            <span>${escapeHtml(topicLabels[state.topic])} / ${escapeHtml(spreads[state.spread].name)}</span>
            <strong>${escapeHtml(state.question || "我想看清楚這件事目前的狀態。")}</strong>
          </div>
          <div class="result-list">
            ${state.drawn.map((drawn, index) => resultCardMarkup(drawn, labels[index], index)).join("")}
          </div>
          <p class="source">牌義參考 <a href="${SOURCE_URL}" target="_blank" rel="noreferrer">A. E. Waite《The Pictorial Key to the Tarot》(1911)</a>，中文為摘要整理。牌面圖像取自 <a href="${IMAGE_SOURCE_URL}" target="_blank" rel="noreferrer">Wikimedia Commons Rider-Waite 1909</a>。</p>
        </div>
        <div class="actions">
          <button class="button" type="button" id="saveResult">複製與儲存結果</button>
          <button class="button secondary" type="button" id="restart">重新開始</button>
        </div>
        <p class="status" id="saveStatus" aria-live="polite">${escapeHtml(state.status)}</p>
      </div>
    </section>
  `;
}

function bindScreenEvents() {
  document.querySelectorAll("[data-next]").forEach((button) => {
    button.addEventListener("click", () => goTo(button.dataset.next));
  });
  document.querySelectorAll("[data-back]").forEach((button) => {
    button.addEventListener("click", () => goTo(button.dataset.back));
  });

  const questionForm = document.querySelector("#questionForm");
  if (questionForm) {
    questionForm.addEventListener("submit", (event) => {
      event.preventDefault();
      state.question = document.querySelector("#questionInput").value.trim();
      state.topic = document.querySelector("input[name='topic']:checked")?.value || "work";
      goTo("focus");
    });
  }

  const spreadForm = document.querySelector("#spreadForm");
  if (spreadForm) {
    spreadForm.addEventListener("submit", (event) => {
      event.preventDefault();
      state.spread = document.querySelector("input[name='spread']:checked")?.value || "flow";
      resetDraw();
      goTo(state.spread === "choice" ? "details" : "draw");
    });
  }

  const choiceForm = document.querySelector("#choiceForm");
  if (choiceForm) {
    choiceForm.addEventListener("submit", (event) => {
      event.preventDefault();
      state.routeA = document.querySelector("#routeA").value.trim();
      state.routeB = document.querySelector("#routeB").value.trim();
      resetDraw();
      goTo("draw");
    });
  }

  const drawButton = document.querySelector("#drawButton");
  if (drawButton) {
    drawButton.addEventListener("click", () => {
      if (state.spread === "choice") {
        drawChoiceCard();
      } else {
        drawAutoSpread();
      }
    });
  }

  const saveResult = document.querySelector("#saveResult");
  if (saveResult) {
    saveResult.addEventListener("click", copyAndSaveResult);
  }

  const restart = document.querySelector("#restart");
  if (restart) {
    restart.addEventListener("click", () => {
      Object.assign(state, {
        step: "question",
        question: "",
        drawn: [],
        drawComplete: false,
        isDrawing: false,
        status: "",
      });
      render();
    });
  }
}

function optionMarkup(name, value, label, hint, checked) {
  return `
    <label class="option">
      <input type="radio" name="${name}" value="${value}" ${checked ? "checked" : ""} />
      <span>
        <strong>${escapeHtml(label)}</strong>
        <small>${escapeHtml(hint)}</small>
      </span>
    </label>
  `;
}

function renderAltar() {
  return `
    <div class="altar">
      <div class="deck ${state.isDrawing ? "is-shuffling" : ""}" aria-hidden="true">
        <div></div><div></div><div></div>
      </div>
      <p class="ritual-text">${state.isDrawing ? "洗牌中，請讓問題保持清楚。" : "按下按鈕後，牌會依照此刻的牌陣展開。"}</p>
    </div>
  `;
}

function renderDrawnSlots(labels) {
  return `
    <div class="draw-grid">
      ${state.drawn.map((drawn, index) => `
        <article class="slot">
          <div class="slot-label">${escapeHtml(labels[index])}</div>
          ${cardMarkup(drawn, "is-revealed")}
          <div class="card-name">
            <strong>${escapeHtml(drawn.card.zh)}</strong>
            <small>${drawn.reversed ? "逆位" : "正位"} · ${escapeHtml(drawn.card.en)}</small>
          </div>
        </article>
      `).join("")}
    </div>
  `;
}

function resultCardMarkup(drawn, label, index) {
  const orientation = drawn.reversed ? "逆位" : "正位";
  const meaning = drawn.reversed ? drawn.card.reversed : drawn.card.upright;
  return `
    <article class="reading-card">
      <div class="reading-card-top">
        ${cardMarkup(drawn, "mini-card is-revealed")}
        <div>
          <p class="card-index">${String(index + 1).padStart(2, "0")} / ${escapeHtml(label)}</p>
          <h3>${escapeHtml(drawn.card.zh)}（${orientation}）</h3>
          <small>${escapeHtml(drawn.card.en)}</small>
        </div>
      </div>
      <div class="meaning">
        <strong>牌位</strong>
        <p>${escapeHtml(positionNotes[state.spread][index])}</p>
      </div>
      <div class="meaning">
        <strong>傳統牌義</strong>
        <p>${escapeHtml(meaning)}</p>
      </div>
    </article>
  `;
}

function cardMarkup(drawn, extraClass = "") {
  return `
    <div class="tarot-card ${extraClass} ${drawn.reversed ? "is-reversed" : ""}">
      <div class="tarot-card-inner">
        <div class="card-back"></div>
        <div class="card-front">
          <img class="card-art" src="${drawn.card.image}" alt="${escapeHtml(drawn.card.zh)}" loading="lazy" referrerpolicy="no-referrer" />
        </div>
      </div>
    </div>
  `;
}

function activeLabels() {
  if (state.spread !== "choice") return spreads[state.spread].labels;
  const a = state.routeA || "A 路線";
  const b = state.routeB || "B 路線";
  return ["共同現況", `${a}：過程`, `${a}：結果`, `${b}：過程`, `${b}：結果`];
}

function drawInstruction(nextLabel) {
  if (state.spread === "choice") {
    return state.drawComplete
      ? "五張牌已抽齊，可以查看結果。"
      : `下一張是「${nextLabel}」。請先在心裡確認這個位置，再按下抽牌。`;
  }
  return state.drawComplete
    ? "三張牌已抽齊，可以查看結果。"
    : "系統會直接抽出三張牌，並以牌陣位置展示。";
}

async function drawAutoSpread() {
  state.isDrawing = true;
  render();
  await pause(1050);
  state.drawn = drawMany(spreads[state.spread].labels.length);
  state.isDrawing = false;
  state.drawComplete = true;
  render();
}

async function drawChoiceCard() {
  const labels = activeLabels();
  if (state.drawn.length >= labels.length) return;
  state.isDrawing = true;
  render();
  await pause(520);
  const taken = state.drawn.map((drawn) => drawn.card.id);
  state.drawn.push(drawOne(taken));
  state.drawComplete = state.drawn.length === labels.length;
  state.isDrawing = false;
  render();
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
  return { card, reversed: Math.random() < 0.42 };
}

function resetDraw() {
  state.drawn = [];
  state.drawComplete = false;
  state.isDrawing = false;
  state.status = "";
}

function goTo(step) {
  state.step = step;
  render();
}

function stepLabel(step) {
  return {
    question: "問題",
    focus: "默念",
    spread: "牌陣",
    details: "路線",
    draw: "抽牌",
    result: "結果",
  }[step];
}

async function copyAndSaveResult() {
  const button = document.querySelector("#saveResult");
  const status = document.querySelector("#saveStatus");
  button.disabled = true;
  status.textContent = "正在整理文字與圖檔。";
  const text = buildResultText();
  let copied = false;

  try {
    await navigator.clipboard.writeText(text);
    copied = true;
  } catch {
    copied = fallbackCopy(text);
  }

  try {
    const blob = await renderResultImage();
    const fileName = `隅星辰-${new Date().toISOString().slice(0, 10)}.png`;
    const file = new File([blob], fileName, { type: "image/png" });
    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({ files: [file], title: "隅星辰抽牌結果", text: "隅星辰抽牌結果" });
      status.textContent = copied ? "文字已複製，圖檔已交給系統分享/儲存。" : "圖檔已交給系統分享/儲存。";
    } else {
      downloadBlob(blob, fileName);
      status.textContent = copied ? "文字已複製，圖檔已下載。" : "圖檔已下載。";
    }
  } catch {
    status.textContent = copied ? "文字已複製；圖檔產生失敗，請再試一次。" : "無法複製或產生圖檔，請再試一次。";
  } finally {
    button.disabled = false;
  }
}

function buildResultText() {
  const labels = activeLabels();
  const lines = [
    "隅星辰抽牌結果",
    `問題：${state.question || "我想看清楚這件事目前的狀態。"}`,
    `面向：${topicLabels[state.topic]}`,
    `牌陣：${spreads[state.spread].name}`,
    "",
  ];

  state.drawn.forEach((drawn, index) => {
    const orientation = drawn.reversed ? "逆位" : "正位";
    const meaning = drawn.reversed ? drawn.card.reversed : drawn.card.upright;
    lines.push(`${index + 1}. ${labels[index]}｜${drawn.card.zh}（${orientation}）`);
    lines.push(`牌位：${positionNotes[state.spread][index]}`);
    lines.push(`傳統牌義：${meaning}`);
    lines.push("");
  });

  lines.push("牌義參考：A. E. Waite《The Pictorial Key to the Tarot》(1911)");
  lines.push(SOURCE_URL);
  lines.push("牌面圖像：Wikimedia Commons Rider-Waite 1909");
  lines.push(IMAGE_SOURCE_URL);
  return lines.join("\n");
}

async function renderResultImage() {
  const labels = activeLabels();
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const width = 1080;
  const cardW = 150;
  const cardH = cardW / CARD_RATIO;
  const margin = 70;
  const line = 34;
  ctx.font = "25px serif";
  const blocks = state.drawn.map((drawn, index) => {
    const meaning = drawn.reversed ? drawn.card.reversed : drawn.card.upright;
    const textLines = wrapCanvasText(ctx, `${labels[index]}｜${drawn.card.zh}（${drawn.reversed ? "逆位" : "正位"}） ${meaning}`, width - margin * 2 - cardW - 34);
    return { drawn, label: labels[index], textLines, height: Math.max(cardH, textLines.length * line + 56) };
  });
  const height = 330 + blocks.reduce((sum, block) => sum + block.height + 34, 0) + 120;

  canvas.width = width;
  canvas.height = height;
  ctx.fillStyle = "#151311";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "#d8ad5b";
  ctx.font = "42px serif";
  ctx.fillText("隅星辰", margin, 92);
  ctx.font = "24px serif";
  ctx.fillText(`${topicLabels[state.topic]} · ${spreads[state.spread].name}`, margin, 136);
  ctx.fillStyle = "#f4ead4";
  ctx.font = "32px serif";
  drawWrapped(ctx, state.question || "我想看清楚這件事目前的狀態。", margin, 196, width - margin * 2, 44);

  const cardImages = await Promise.all(blocks.map((block) => loadImage(block.drawn.card.image)));
  let y = 300;
  blocks.forEach((block, index) => {
    ctx.fillStyle = "rgba(255,255,255,0.045)";
    roundRect(ctx, margin - 20, y - 20, width - margin * 2 + 40, block.height + 40, 10);
    ctx.fill();
    drawCardImage(ctx, cardImages[index], block.drawn, margin, y, cardW, cardH);
    ctx.fillStyle = "#d8ad5b";
    ctx.font = "24px serif";
    ctx.fillText(String(index + 1).padStart(2, "0"), margin + cardW + 34, y + 28);
    ctx.fillStyle = "#f4ead4";
    ctx.font = "30px serif";
    ctx.fillText(`${block.label}｜${block.drawn.card.zh}（${block.drawn.reversed ? "逆位" : "正位"}）`, margin + cardW + 34, y + 68);
    ctx.fillStyle = "#c9bda6";
    ctx.font = "25px serif";
    drawWrapped(ctx, block.drawn.reversed ? block.drawn.card.reversed : block.drawn.card.upright, margin + cardW + 34, y + 112, width - margin * 2 - cardW - 34, line);
    y += block.height + 34;
  });

  ctx.fillStyle = "#c9bda6";
  ctx.font = "22px serif";
  ctx.fillText("牌義參考 A. E. Waite《The Pictorial Key to the Tarot》(1911)；牌面圖像取自 Wikimedia Commons。", margin, height - 54);

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("canvas export failed")), "image/png", 0.96);
  });
}

function drawCardImage(ctx, image, drawn, x, y, w, h) {
  ctx.save();
  roundRect(ctx, x, y, w, h, 8);
  ctx.clip();
  if (drawn.reversed) {
    ctx.translate(x + w / 2, y + h / 2);
    ctx.rotate(Math.PI);
    ctx.drawImage(image, -w / 2, -h / 2, w, h);
  } else {
    ctx.drawImage(image, x, y, w, h);
  }
  ctx.restore();
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

function drawWrapped(ctx, text, x, y, maxWidth, lineHeight) {
  wrapCanvasText(ctx, text, maxWidth).forEach((lineText, index) => {
    ctx.fillText(lineText, x, y + index * lineHeight);
  });
}

function wrapCanvasText(ctx, text, maxWidth) {
  const chars = [...text];
  const lines = [];
  let line = "";
  chars.forEach((char) => {
    const test = line + char;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = char;
    } else {
      line = test;
    }
  });
  if (line) lines.push(line);
  return lines;
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}

function downloadBlob(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function fallbackCopy(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.append(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();
  return copied;
}

function pause(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}

render();
