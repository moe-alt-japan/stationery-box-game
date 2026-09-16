const items = [
  { id:"pencil", word:"pencil", image:"assets/pencil.png" },
  { id:"marker", word:"marker", image:"assets/marker.png" },
  { id:"pen", word:"pen", image:"assets/pen.png" },
  { id:"mechanical-pencil", word:"mechanical pencil", image:"assets/mechanical-pencil.png" },
  { id:"ruler", word:"ruler", image:"assets/ruler.png" },
  { id:"glue-stick", word:"glue stick", image:"assets/glue-stick.png" },
  { id:"stapler", word:"stapler", image:"assets/stapler.png" },
  { id:"eraser", word:"eraser", image:"assets/eraser.png" },
  { id:"pencil-sharpener", word:"pencil sharpener", image:"assets/pencil-sharpener.png" },
  { id:"notebook", word:"notebook", image:"assets/notebook.png" },
  { id:"pencil-case", word:"pencil case", image:"assets/pencil-case.png" },
  { id:"crayon", word:"crayon", image:"assets/crayon.png" }
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
  const item = items.find(i => i.id === id);
  return `<span class="picture"><img src="${item.image}" alt="${item.word}" draggable="false"></span>`;
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
    itemGrid.appendChild(card);
  });
}

function speak(text){
  // Sound disabled.
}

function addItem(id, x=null, y=null, sayWord=true){
  const item = items.find(i=>i.id===id);
  if(!item) return;

  const el = document.createElement("button");
  el.className = "placed-item";
  el.dataset.id = item.id;
  el.dataset.scale = "1.35";
  el.dataset.rotation = "0";
  el.style.setProperty("--item-scale", el.dataset.scale);
  el.style.setProperty("--item-rotation", "0deg");
  el.innerHTML = `${pictureHTML(item.id)}<span class="rotate-handle" title="Drag to rotate">↻</span>`;

  const inner = dropZone.querySelector(".box-inner");
  const rect = inner.getBoundingClientRect();
  const px = x ?? rect.width/2 + (Math.random()*100-50);
  const py = y ?? rect.height/2 + (Math.random()*80-40);
  placeAt(el, px, py);

  el.addEventListener("pointerdown", startMove);
  el.querySelector(".rotate-handle").addEventListener("pointerdown", startRotate);
  el.addEventListener("click", e=>{
    e.stopPropagation();
    selectItem(el);
  });
  el.addEventListener("dblclick", e=>{
    e.stopPropagation();
  });

  el.addEventListener("wheel", resizeWithWheel, { passive:false });

  placedItems.appendChild(el);
  emptyHint.style.display = "none";
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


function resizeWithWheel(e){
  e.preventDefault();
  e.stopPropagation();

  const el = e.currentTarget;
  selectItem(el);

  let scale = parseFloat(el.dataset.scale || "1.35");
  const step = 0.12;

  if(e.deltaY < 0){
    scale += step;
  }else{
    scale -= step;
  }

  scale = Math.max(0.65, Math.min(3.0, scale));
  scale = Math.round(scale * 100) / 100;

  el.dataset.scale = String(scale);
  el.style.setProperty("--item-scale", scale);

  feedback.textContent = `Size: ${Math.round(scale * 100)}%`;
}

function startRotate(e){
  e.preventDefault();
  e.stopPropagation();
  const handle=e.currentTarget;
  const el=handle.closest(".placed-item");
  selectItem(el);
  handle.setPointerCapture(e.pointerId);

  const rotate=ev=>{
    const r=el.getBoundingClientRect();
    const cx=r.left+r.width/2;
    const cy=r.top+r.height/2;
    let angle=Math.atan2(ev.clientY-cy,ev.clientX-cx)*180/Math.PI+90;
    angle=Math.round(angle);
    el.dataset.rotation=String(angle);
    el.style.setProperty("--item-rotation", `${angle}deg`);
    feedback.textContent=`Rotation: ${angle}°`;
  };
  const up=ev=>{
    try{handle.releasePointerCapture(ev.pointerId)}catch{}
    handle.removeEventListener("pointermove",rotate);
    handle.removeEventListener("pointerup",up);
  };
  handle.addEventListener("pointermove",rotate);
  handle.addEventListener("pointerup",up);
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
  if(e.target.closest && e.target.closest(".rotate-handle")) return;
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
    id:el.dataset.id,
    left:el.style.left,
    top:el.style.top,
    scale:el.dataset.scale || "1.35",
    rotation:el.dataset.rotation || "0"
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
    el.dataset.scale=s.scale || "1.35";
    el.dataset.rotation=s.rotation || "0";
    el.style.setProperty("--item-scale", el.dataset.scale);
    el.style.setProperty("--item-rotation", `${el.dataset.rotation}deg`);
    el.innerHTML=`${pictureHTML(item.id)}<span class="rotate-handle" title="Drag to rotate">↻</span>`;
    el.style.left=s.left;
    el.style.top=s.top;
    el.style.zIndex=++zCounter;

    el.addEventListener("pointerdown",startMove);
    el.querySelector(".rotate-handle").addEventListener("pointerdown",startRotate);
    el.addEventListener("click",e=>{
      e.stopPropagation();
      selectItem(el);
    });
    el.addEventListener("dblclick",e=>{
      e.stopPropagation();
      });
    el.addEventListener("wheel", resizeWithWheel, { passive:false });

    placedItems.appendChild(el);
  });
  emptyHint.style.display=placedItems.children.length?"none":"";
  feedback.textContent="Saved layout loaded. 📂";
});

renderPalette();
