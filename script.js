
const items = [
  { id:"pencil", word:"pencil", icon:"✏️" },
  { id:"marker", word:"marker", icon:"🖊️" },
  { id:"pen", word:"pen", icon:"🖋️" },
  { id:"ruler", word:"ruler", icon:"📏" },
  { id:"scissors", word:"scissors", icon:"✂️" },
  { id:"glue-stick", word:"glue stick", icon:"🧴" },
  { id:"stapler", word:"stapler", icon:"🗜️" },
  { id:"tag", word:"tag", icon:"🏷️" },
  { id:"eraser", word:"eraser", icon:"🧽" },
  { id:"notebook", word:"notebook", icon:"📓" },
  { id:"calendar", word:"calendar", icon:"🗓️" },
  { id:"pencil-sharpener", word:"pencil sharpener", icon:"⚙️" }
];

const itemGrid = document.getElementById("itemGrid");
const template = document.getElementById("itemTemplate");
const dropZone = document.getElementById("dropZone");
const placedItems = document.getElementById("placedItems");
const emptyHint = document.getElementById("emptyHint");
const feedback = document.getElementById("feedback");
const challengeText = document.getElementById("challengeText");

let challenge = null;
let zCounter = 5;
let draggedId = null;

function renderPalette(){
  itemGrid.innerHTML = "";
  items.forEach(item=>{
    const card = template.content.firstElementChild.cloneNode(true);
    card.dataset.id = item.id;
    card.querySelector(".item-icon").textContent = item.icon;
    card.querySelector(".item-word").textContent = item.word;

    card.addEventListener("dragstart", e=>{
      draggedId = item.id;
      e.dataTransfer.setData("text/plain", item.id);
    });

    card.addEventListener("click", ()=>{
      addItem(item.id);
    });

    card.addEventListener("dblclick", ()=>{
      speak(item.word);
    });

    itemGrid.appendChild(card);
  });
}

function randomChallenge(){
  const old = challenge?.id;
  const pool = items.filter(x=>x.id !== old);
  challenge = pool[Math.floor(Math.random()*pool.length)];
  challengeText.textContent = `Put the ${challenge.word} in the box.`;
  feedback.textContent = "";
  feedback.className = "feedback";
}

function speak(text){
  if(!("speechSynthesis" in window)) return;
  speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "en-US";
  utter.rate = 0.9;
  speechSynthesis.speak(utter);
}

function addItem(id, x=null, y=null){
  const item = items.find(i=>i.id===id);
  if(!item) return;

  const el = document.createElement("button");
  el.className = "placed-item";
  el.dataset.id = item.id;
  el.innerHTML = `<span class="item-icon">${item.icon}</span><span class="item-word">${item.word}</span>`;

  const rect = dropZone.querySelector(".box-inner").getBoundingClientRect();
  const px = x ?? rect.width/2 + (Math.random()*120-60);
  const py = y ?? rect.height/2 + (Math.random()*100-50);

  placeAt(el, px, py);

  el.addEventListener("pointerdown", startMove);
  el.addEventListener("dblclick", ()=>speak(item.word));

  placedItems.appendChild(el);
  emptyHint.style.display = "none";
  evaluate(item.id);
}

function placeAt(el, x, y){
  const inner = dropZone.querySelector(".box-inner");
  const rect = inner.getBoundingClientRect();
  const safeX = Math.max(70, Math.min(rect.width-70, x));
  const safeY = Math.max(60, Math.min(rect.height-60, y));
  el.style.left = `${safeX}px`;
  el.style.top = `${safeY}px`;
  el.style.zIndex = ++zCounter;
}

function startMove(e){
  const el = e.currentTarget;
  el.setPointerCapture(e.pointerId);

  const move = ev=>{
    const inner = dropZone.querySelector(".box-inner");
    const r = inner.getBoundingClientRect();
    placeAt(el, ev.clientX-r.left, ev.clientY-r.top);
  };

  const up = ev=>{
    el.releasePointerCapture(ev.pointerId);
    el.removeEventListener("pointermove", move);
    el.removeEventListener("pointerup", up);
  };

  el.addEventListener("pointermove", move);
  el.addEventListener("pointerup", up);
}

function evaluate(id){
  if(!challenge) return;
  if(id === challenge.id){
    feedback.textContent = "Great! ✓";
    feedback.className = "feedback good";
    playTone(660, .12);
    setTimeout(()=>playTone(880, .15), 110);
  }else{
    feedback.textContent = `Try again! Find the ${challenge.word}.`;
    feedback.className = "feedback bad";
    playTone(170, .12);
  }
}

function playTone(freq, duration){
  try{
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = freq;
    osc.type = "sine";
    gain.gain.setValueAtTime(.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(.001, ctx.currentTime+duration);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime+duration);
  }catch(e){}
}

dropZone.addEventListener("dragover", e=>e.preventDefault());

dropZone.addEventListener("drop", e=>{
  e.preventDefault();
  const id = e.dataTransfer.getData("text/plain") || draggedId;
  const inner = dropZone.querySelector(".box-inner");
  const r = inner.getBoundingClientRect();
  addItem(id, e.clientX-r.left, e.clientY-r.top);
});

document.getElementById("resetBtn").addEventListener("click", ()=>{
  placedItems.innerHTML = "";
  emptyHint.style.display = "";
  feedback.textContent = "";
  randomChallenge();
});

document.getElementById("nextBtn").addEventListener("click", randomChallenge);

document.getElementById("speakBtn").addEventListener("click", ()=>{
  if(challenge) speak(`Put the ${challenge.word} in the box.`);
});

document.getElementById("saveBtn").addEventListener("click", ()=>{
  const saved = [...placedItems.children].map(el=>({
    id:el.dataset.id,
    left:el.style.left,
    top:el.style.top
  }));
  localStorage.setItem("stationeryBoxLayout", JSON.stringify(saved));
  feedback.textContent = "Saved on this device. 💾";
  feedback.className = "feedback good";
});

document.getElementById("loadBtn").addEventListener("click", ()=>{
  const raw = localStorage.getItem("stationeryBoxLayout");
  if(!raw){
    feedback.textContent = "No saved layout yet.";
    feedback.className = "feedback bad";
    return;
  }
  placedItems.innerHTML = "";
  const inner = dropZone.querySelector(".box-inner");
  const rect = inner.getBoundingClientRect();
  JSON.parse(raw).forEach(s=>{
    const item = items.find(i=>i.id===s.id);
    if(!item) return;
    const el = document.createElement("button");
    el.className = "placed-item";
    el.dataset.id = item.id;
    el.innerHTML = `<span class="item-icon">${item.icon}</span><span class="item-word">${item.word}</span>`;
    el.style.left = s.left;
    el.style.top = s.top;
    el.style.zIndex = ++zCounter;
    el.addEventListener("pointerdown", startMove);
    el.addEventListener("dblclick", ()=>speak(item.word));
    placedItems.appendChild(el);
  });
  emptyHint.style.display = placedItems.children.length ? "none" : "";
  feedback.textContent = "Saved layout loaded. 📂";
  feedback.className = "feedback good";
});

renderPalette();
randomChallenge();
