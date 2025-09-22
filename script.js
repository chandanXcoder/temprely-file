// ================================
// 🎓 Academic Achievements Section
// ================================

// Dummy Data
const data = [
  {id:1,name:"Aman Kumar", year:2024, img:"https://picsum.photos/seed/a1/600/400", desc:"Top scorer in board exam"},
  {id:2,name:"Sana Khan", year:2023, img:"https://picsum.photos/seed/a2/600/400", desc:"Science fair winner"},
  {id:3,name:"Arun R", year:2022, img:"https://picsum.photos/seed/a3/600/400", desc:"Math Olympiad medal"},
  {id:4,name:"Neha Verma", year:2024, img:"https://picsum.photos/seed/a4/600/400", desc:"National Quiz finalist"},
  {id:5,name:"Ravi Patel", year:2023, img:"https://picsum.photos/seed/a5/600/400", desc:"Essay competition winner"}
];

// DOM Elements
const gallery = document.getElementById('gallery');
const search = document.getElementById('search');
const filterBtns = document.querySelectorAll('.filters button');

const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const modalCaption = document.getElementById('modalCaption');
const modalClose = document.getElementById('modalClose');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let currentIndex = 0;
let visible = [...data]; // default all items

// Render Cards
function render(items){
  if (!gallery) return;
  gallery.innerHTML = items.map((it, idx)=>`
    <article class="card" tabindex="0" data-index="${idx}">
      <img loading="lazy" src="${it.img}" alt="${it.name}">
      <div class="meta">
        <div class="name">${it.name}</div>
        <div class="sub">Year ${it.year}</div>
      </div>
    </article>
  `).join('');
  attachCardEvents();
}

// Card Click / Keyboard Events
function attachCardEvents(){
  document.querySelectorAll('.card').forEach(card=>{
    card.addEventListener('click', ()=>{
      const idx = Number(card.dataset.index);
      openModal(idx);
    });
    card.addEventListener('keydown', e=>{
      if(e.key === 'Enter') card.click();
    });
  });
}

// Open Modal
function openModal(idx){
  currentIndex = idx;
  const item = visible[currentIndex];
  if (!item) return;
  
  modalImg.src = item.img;
  modalImg.alt = item.name;
  modalCaption.textContent = `${item.name} — ${item.desc} (${item.year})`;
  
  modal.setAttribute('aria-hidden','false');
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

// Close Modal
function closeModal(){ 
  modal.setAttribute('aria-hidden','true'); 
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

// Modal Event Listeners
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', e=>{ if(e.target===modal) closeModal(); });
prevBtn.addEventListener('click', ()=>{
  currentIndex = (currentIndex - 1 + visible.length) % visible.length;
  openModal(currentIndex);
});
nextBtn.addEventListener('click', ()=>{
  currentIndex = (currentIndex + 1) % visible.length;
  openModal(currentIndex);
});
document.addEventListener('keydown', e=>{
  if(modal.getAttribute('aria-hidden')==='false'){
    if(e.key==='Escape') closeModal();
    if(e.key==='ArrowLeft') prevBtn.click();
    if(e.key==='ArrowRight') nextBtn.click();
  }
});

// Apply Filters + Search
function applyFilters(){
  const q = search.value.trim().toLowerCase();
  const activeFilterBtn = document.querySelector('.filters .active');
  const filter = activeFilterBtn ? activeFilterBtn.dataset.filter : 'all';

  visible = data.filter(it=>{
    const matchSearch = it.name.toLowerCase().includes(q) || String(it.year).includes(q);
    const matchFilter = (filter==='all') ? true : String(it.year)===filter;
    return matchSearch && matchFilter;
  });

  render(visible);
}

// Filter Buttons
filterBtns.forEach(b=>{
  b.addEventListener('click', ()=>{
    filterBtns.forEach(x=>x.classList.remove('active'));
    b.classList.add('active');
    applyFilters();
  });
});

// Search Box
search.addEventListener('input', applyFilters);

// Init Render
render(data);
