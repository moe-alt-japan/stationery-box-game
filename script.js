
const svg = {
  pencil: `<svg viewBox="0 0 100 70"><g transform="rotate(-35 50 35)"><rect x="20" y="26" width="58" height="18" rx="3" fill="#f39a32"/><polygon points="78,26 96,35 78,44" fill="#e7c9a0"/><polygon points="91,33 96,35 91,38" fill="#333"/><rect x="15" y="26" width="10" height="18" rx="2" fill="#f05b63"/></g></svg>`,
  marker: `<svg viewBox="0 0 100 70"><g transform="rotate(-35 50 35)"><rect x="22" y="24" width="58" height="22" rx="8" fill="#3278c8"/><rect x="18" y="24" width="16" height="22" rx="5" fill="#f0b62f"/><polygon points="80,28 94,35 80,42" fill="#244d7a"/></g></svg>`,
  pen: `<svg viewBox="0 0 100 70"><g transform="rotate(-35 50 35)"><rect x="24" y="26" width="54" height="18" rx="6" fill="#2e6da8"/><rect x="18" y="29" width="12" height="12" rx="3" fill="#80aadd"/><polygon points="78,29 94,35 78,41" fill="#b6c0ca"/><circle cx="91" cy="35" r="2" fill="#37404a"/></g></svg>`,
  ruler: `<svg viewBox="0 0 100 70"><g transform="rotate(42 50 35)"><rect x="18" y="25" width="65" height="18" rx="3" fill="#a7c9ff"/><g stroke="#6e82b0" stroke-width="2"><path d="M25 25v7M34 25v10M43 25v7M52 25v10M61 25v7M70 25v10"/></g></g></svg>`,
  scissors: `<svg viewBox="0 0 100 70"><circle cx="33" cy="25" r="12" fill="none" stroke="#ef4565" stroke-width="8"/><circle cx="62" cy="25" r="12" fill="none" stroke="#ef4565" stroke-width="8"/><path d="M42 34L70 62M54 34L28 62" stroke="#8a82b8" stroke-width="8" stroke-linecap="round"/><circle cx="49" cy="38" r="4" fill="#555"/></svg>`,
  "glue-stick": `<svg viewBox="0 0 100 70"><g><rect x="35" y="18" width="30" height="42" rx="5" fill="#eef4ff" stroke="#7fa4ce" stroke-width="2"/><rect x="35" y="15" width="30" height="11" rx="4" fill="#26a65b"/><rect x="40" y="28" width="20" height="20" rx="3" fill="#26a65b"/><text x="50" y="41" text-anchor="middle" font-size="9" font-family="Arial" font-weight="bold" fill="white">GLUE</text><rect x="39" y="57" width="22" height="6" rx="2" fill="#d5dce5"/></g></svg>`,
  stapler: `<svg viewBox="0 0 100 70"><g><path d="M23 22 Q25 16 34 16 H78 Q84 16 84 23 V31 H31 Q23 31 23 22Z" fill="#ed4f8b" stroke="#6d2445" stroke-width="2"/><path d="M28 36 H80 Q84 36 84 42 V50 H28 Q20 50 20 43 Q20 36 28 36Z" fill="#ed4f8b" stroke="#6d2445" stroke-width="2"/><path d="M31 31H76L67 40H31Z" fill="#aeb6bf" stroke="#626a73" stroke-width="2"/><rect x="68" y="41" width="11" height="4" rx="2" fill="#555"/></g></svg>`,
  tag: `<svg viewBox="0 0 100 70"><path d="M23 34L52 12H82V43L52 63Z" fill="#f8b733"/><circle cx="70" cy="25" r="6" fill="white" stroke="#dc8c18" stroke-width="3"/><path d="M71 25Q84 15 91 27" fill="none" stroke="#a76cc0" stroke-width="3"/></svg>`,
  eraser: `<svg viewBox="0 0 100 70"><g transform="rotate(-18 50 35)"><rect x="25" y="21" width="53" height="30" rx="6" fill="#f39aac" stroke="#aa5667" stroke-width="2"/><rect x="25" y="21" width="17" height="30" rx="6" fill="#74a8e8"/><path d="M43 22v28" stroke="#fff" stroke-width="2" opacity=".8"/></g></svg>`,
  notebook: `<svg viewBox="0 0 100 70"><rect x="31" y="10" width="42" height="52" rx="4" fill="#57407d"/><rect x="37" y="14" width="30" height="44" rx="2" fill="#6e5199"/><rect x="42" y="19" width="20" height="8" rx="2" fill="#eee"/><path d="M31 15h-7M31 23h-7M31 31h-7M31 39h-7M31 47h-7M31 55h-7" stroke="#d8d8d8" stroke-width="3"/></svg>`,
  calendar: `<svg viewBox="0 0 100 70"><rect x="21" y="14" width="58" height="48" rx="4" fill="white" stroke="#333" stroke-width="3"/><rect x="21" y="14" width="58" height="13" fill="#ef4c52"/><path d="M32 9v12M68 9v12" stroke="#333" stroke-width="4"/><g stroke="#777" stroke-width="1"><path d="M31 34h38M31 43h38M31 52h38M40 29v28M50 29v28M60 29v28"/></g></svg>`,
  "pencil-sharpener": `<svg viewBox="0 0 100 70"><g><path d="M28 18H70L80 54H20Z" fill="#70aee5" stroke="#345b86" stroke-width="3"/><ellipse cx="50" cy="34" rx="13" ry="10" fill="#d8e2ea" stroke="#486a87" stroke-width="3"/><ellipse cx="50" cy="34" rx="5" ry="4" fill="#5e6770"/><path d="M34 23L63 48" stroke="white" stroke-width="3" opacity=".6"/></g></svg>`
};

const items = [
  { id:"pencil", word:"pencil" },
  { id:"marker", word:"marker" },
  { id:"pen", word:"pen" },
  { id:"ruler", word:"ruler" },
  { id:"scissors", word:"scissors" },
  { id:"glue-stick", word:"glue stick" },
  { id:"stapler", word:"stapler" },
  { id:"tag", word:"tag" },
  { id:"eraser", word:"eraser" },
  { id:"notebook", word:"notebook" },
  { id:"calendar", word:"calendar" },
  { id:"pencil-sharpener", word:"pencil sharpener" }
];

const itemGrid = document.getElementById("itemGrid");
const dropZone = document.getElementById("dropZone");
const placedItems = document.getElementById("placedItems");
const emptyHint = document.getElementById("emptyHint");
const feedback = document.getElementById("feedback");
const deleteBtn = document.getElementById("deleteBtn");

let selected = null;
let zCounter = 5;
let draggedId = null;

function pictureHTML(id){
  return `<span class="picture">${svg[id]}</span>`;
}

function renderPalette(){
  itemGrid.innerHTML = "";
  items.forEach(item=>{
    const card = document.createElement("button");
    card.className = "item-card";
    card.draggable = true;
    card.dataset.id = item.id;
    card.innerHTML = `${pictureHTML(item.id)}<span class="item-word">${item.word}</span>`;

    card.addEventListener("dragstart", e=>{
      draggedId = item.id;
      e.dataTransfer.setData("text/plain", item.id);
    });

    card.addEventListener("click", ()=>addItem(item.id));
    card.addEventListener("dblclick", ()=>speak(item.word));
    itemGrid.appendChild(card);
  });
}

function speak(text){
  if(!("speechSynthesis" in window)) return;
  speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "en-US";
  utter.rate = .9;
  speechSynthesis.speak(utter);
}

function addItem(id, x=null, y=null, sayWord=true){
  const item = items.find(i=>i.id===id);
  if(!item) return;

  const el = document.createElement("button");
  el.className = "placed-item";
  el.dataset.id = item.id;
  el.innerHTML = `${pictureHTML(item.id)}<span class="item-word">${item.word}</span>`;

  const inner = dropZone.querySelector(".box-inner");
  const rect = inner.getBoundingClientRect();
  const px = x ?? rect.width/2 + (Math.random()*100-50);
  const py = y ?? rect.height/2 + (Math.random()*80-40);
  placeAt(el, px, py);

  el.addEventListener("pointerdown", startMove);
  el.addEventListener("click", e=>{
    e.stopPropagation();
    selectItem(el);
  });
  el.addEventListener("dblclick", e=>{
    e.stopPropagation();
    speak(item.word);
  });

  placedItems.appendChild(el);
  emptyHint.style.display = "none";
  if(sayWord) speak(item.word);
}

function selectItem(el){
  if(selected) selected.classList.remove("selected");
  selected = el;
  selected.classList.add("selected");
  deleteBtn.disabled = false;
  feedback.textContent = `${el.dataset.id.replaceAll("-"," ")} selected.`;
}

function clearSelection(){
  if(selected) selected.classList.remove("selected");
  selected = null;
  deleteBtn.disabled = true;
  feedback.textContent = "";
}

function deleteSelected(){
  if(!selected) return;
  selected.remove();
  selected = null;
  deleteBtn.disabled = true;
  feedback.textContent = "Item removed.";
  if(!placedItems.children.length) emptyHint.style.display = "";
}

function placeAt(el,x,y){
  const inner = dropZone.querySelector(".box-inner");
  const rect = inner.getBoundingClientRect();
  const safeX = Math.max(60,Math.min(rect.width-60,x));
  const safeY = Math.max(50,Math.min(rect.height-50,y));
  el.style.left = `${safeX}px`;
  el.style.top = `${safeY}px`;
  el.style.zIndex = ++zCounter;
}

function startMove(e){
  const el = e.currentTarget;
  selectItem(el);
  el.setPointerCapture(e.pointerId);

  const move = ev=>{
    const inner = dropZone.querySelector(".box-inner");
    const r = inner.getBoundingClientRect();
    placeAt(el,ev.clientX-r.left,ev.clientY-r.top);
  };

  const up = ev=>{
    try{el.releasePointerCapture(ev.pointerId)}catch{}
    el.removeEventListener("pointermove",move);
    el.removeEventListener("pointerup",up);
  };

  el.addEventListener("pointermove",move);
  el.addEventListener("pointerup",up);
}

dropZone.addEventListener("click", e=>{
  if(e.target===dropZone || e.target.classList.contains("box-inner") || e.target===placedItems){
    clearSelection();
  }
});

dropZone.addEventListener("dragover",e=>e.preventDefault());

dropZone.addEventListener("drop",e=>{
  e.preventDefault();
  const id=e.dataTransfer.getData("text/plain")||draggedId;
  const inner=dropZone.querySelector(".box-inner");
  const r=inner.getBoundingClientRect();
  addItem(id,e.clientX-r.left,e.clientY-r.top);
});

document.addEventListener("keydown", e=>{
  if((e.key==="Delete" || e.key==="Backspace") && selected){
    e.preventDefault();
    deleteSelected();
  }
});

deleteBtn.addEventListener("click",deleteSelected);

document.getElementById("resetBtn").addEventListener("click",()=>{
  placedItems.innerHTML="";
  emptyHint.style.display="";
  clearSelection();
});

document.getElementById("saveBtn").addEventListener("click",()=>{
  const saved=[...placedItems.children].map(el=>({
    id:el.dataset.id,left:el.style.left,top:el.style.top
  }));
  localStorage.setItem("stationeryBoxLayout",JSON.stringify(saved));
  feedback.textContent="Saved on this device. 💾";
});

document.getElementById("loadBtn").addEventListener("click",()=>{
  const raw=localStorage.getItem("stationeryBoxLayout");
  if(!raw){
    feedback.textContent="No saved layout yet.";
    return;
  }
  placedItems.innerHTML="";
  clearSelection();
  JSON.parse(raw).forEach(s=>{
    const item=items.find(i=>i.id===s.id);
    if(!item)return;

    const el=document.createElement("button");
    el.className="placed-item";
    el.dataset.id=item.id;
    el.innerHTML=`${pictureHTML(item.id)}<span class="item-word">${item.word}</span>`;
    el.style.left=s.left;
    el.style.top=s.top;
    el.style.zIndex=++zCounter;

    el.addEventListener("pointerdown",startMove);
    el.addEventListener("click",e=>{
      e.stopPropagation();
      selectItem(el);
    });
    el.addEventListener("dblclick",e=>{
      e.stopPropagation();
      speak(item.word);
    });

    placedItems.appendChild(el);
  });
  emptyHint.style.display=placedItems.children.length?"none":"";
  feedback.textContent="Saved layout loaded. 📂";
});

renderPalette();
