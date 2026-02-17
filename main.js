// ===== ELEMENT =====
const homePage=document.getElementById("homePage");
const editorPage=document.getElementById("editorPage");
const code=document.getElementById("code");
const preview=document.getElementById("preview");
const tutorialModal=document.getElementById("tutorialModal");
const adsModal=document.getElementById("adsModal");
const loadModal=document.getElementById("loadModal");
const charCount=document.getElementById("charCount");
const lineCount=document.getElementById("lineCount");
const publishStatus=document.getElementById("publishStatus");
const tutorialButtons=document.getElementById("tutorialButtons");
const tutorialContent=document.getElementById("tutorialContent");
const saveList=document.getElementById("saveList");
const homeBanner=document.getElementById("homeBanner");

let isPublic=false;
const noWA="6283862441929";

// ===== NAVIGATION =====
function goHome(){
  homePage.classList.remove("hidden");
  editorPage.classList.add("hidden");
}
function goEditor(){
  homePage.classList.add("hidden");
  editorPage.classList.remove("hidden");
}

// ===== LIVE PREVIEW =====
code.addEventListener("input",()=>{
  preview.srcdoc=code.value;
  charCount.textContent=code.value.length;
  lineCount.textContent=code.value.split("\n").length;
});

// ===== SAVE SYSTEM =====
function getAllSave(){
  return JSON.parse(localStorage.getItem("webpemula_saves")||"[]");
}
function setAllSave(data){
  localStorage.setItem("webpemula_saves",JSON.stringify(data));
}
function saveProject(){
  const saves=getAllSave();
  const name=prompt("Nama save?");
  if(!name) return;
  saves.unshift({name,code:code.value,date:new Date().toLocaleString()});
  setAllSave(saves);
  alert("✅ Save berhasil!");
}
function openLoad(){
  loadModal.classList.remove("hidden");
  renderSave();
}
function closeLoad(){
  loadModal.classList.add("hidden");
}
function renderSave(){
  const saves=getAllSave();
  saveList.innerHTML="";
  if(!saves.length){
    saveList.innerHTML="<small>Belum ada save</small>";
    return;
  }
  saves.forEach((s,i)=>{
    saveList.innerHTML+=`
      <div class="card" style="margin-bottom:8px">
        <strong>${s.name}</strong><br>
        <small>${s.date}</small><br><br>
        <button class="btn" onclick="loadSave(${i})">Buka</button>
        <button class="btn red" onclick="deleteSave(${i})">Hapus</button>
      </div>`;
  });
}
function loadSave(i){
  const s=getAllSave()[i];
  code.value=s.code;
  preview.srcdoc=s.code;
  closeLoad();
}
function deleteSave(i){
  if(!confirm("Hapus save ini?")) return;
  const s=getAllSave();
  s.splice(i,1);
  setAllSave(s);
  renderSave();
}

// ===== PUBLISH =====
function togglePublish(){
  isPublic=!isPublic;
  publishStatus.textContent=isPublic?"PUBLIC":"PRIVATE";
  publishStatus.style.color=isPublic?"#22c55e":"#f97316";
}

// ===== IKLAN =====
function openAds(){adsModal.classList.remove("hidden");}
function closeAds(){adsModal.classList.add("hidden");}
function beliIklan(p){
  window.open(`https://wa.me/${noWA}?text=`+
  encodeURIComponent("Halo admin, saya mau beli iklan "+p),"_blank");
}

// ===== BELI WEB =====
function beliWeb(){
  const subject=encodeURIComponent("Permintaan Beli Web");
  const body=encodeURIComponent(
    `Halo Admin 👋\nSaya mau beli web.\n\n`+
    `Karakter: ${code.value.length}\n`+
    `Baris: ${code.value.split("\n").length}\n`+
    `Status: ${isPublic?"PUBLIC":"PRIVATE"}\n\nTerima kasih.`
  );
  window.open(`mailto:damakusuma632@gmail.com?subject=${subject}&body=${body}`);
}

// ===== HOME BANNER SLIDE =====
const homeImages=[
  "images/youtube.jpg",
  "images/iklan.jpg"
];
let homeIndex=0;

function updateHomeBanner(){
  homeBanner.style.backgroundImage=`url('${homeImages[homeIndex]}')`;
  homeIndex=(homeIndex+1)%homeImages.length;
}
updateHomeBanner();
setInterval(updateHomeBanner,5000);

// ===== COPY CODE =====
function copyCode(el){
  const text=el.previousElementSibling.textContent;
  navigator.clipboard.writeText(text)
  .then(()=>alert("✅ Kode disalin!"));
}

// ===== TUTORIAL 25 =====
const tutorials = [

  {
  judul:"1. Struktur Dasar HTML",
  isi:`
  <p><b>Penjelasan:</b> Struktur utama HTML terdiri dari html, head, dan body.</p>
  <pre>&lt;!DOCTYPE html&gt;
  &lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;Judul&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    Hello World
  &lt;/body&gt;
  &lt;/html&gt;</pre>
  <button class="btn" onclick="copyCode(this)">Salin</button>
  `
  },
  
  {
  judul:"2. Heading",
  isi:`
  <p><b>Penjelasan:</b> Heading digunakan untuk judul (h1 paling besar).</p>
  <pre>
  &lt;h1&gt;Judul Besar&lt;/h1&gt;
  &lt;h2&gt;Sub Judul&lt;/h2&gt;
  &lt;h3&gt;Judul Kecil&lt;/h3&gt;
  </pre>
  <button class="btn" onclick="copyCode(this)">Salin</button>
  `
  },
  
  {
  judul:"3. Paragraf",
  isi:`
  <p><b>Penjelasan:</b> Tag &lt;p&gt; digunakan untuk teks paragraf.</p>
  <pre>&lt;p&gt;Ini adalah paragraf.&lt;/p&gt;</pre>
  <button class="btn" onclick="copyCode(this)">Salin</button>
  `
  },
  
  {
  judul:"4. Link",
  isi:`
  <p><b>Penjelasan:</b> Link menggunakan tag &lt;a&gt;.</p>
  <pre>&lt;a href="https://google.com"&gt;Buka Google&lt;/a&gt;</pre>
  <button class="btn" onclick="copyCode(this)">Salin</button>
  `
  },
  
  {
  judul:"5. Gambar",
  isi:`
  <p><b>Penjelasan:</b> Menampilkan gambar dengan &lt;img&gt;.</p>
  <pre>&lt;img src="gambar.jpg" width="200"&gt;</pre>
  <button class="btn" onclick="copyCode(this)">Salin</button>
  `
  },
  
  {
  judul:"6. List",
  isi:`
  <p><b>Penjelasan:</b> List bisa ordered (ol) atau unordered (ul).</p>
  <pre>
  &lt;ul&gt;
    &lt;li&gt;Item 1&lt;/li&gt;
    &lt;li&gt;Item 2&lt;/li&gt;
  &lt;/ul&gt;
  </pre>
  <button class="btn" onclick="copyCode(this)">Salin</button>
  `
  },
  
  {
  judul:"7. Div & Container",
  isi:`
  <p><b>Penjelasan:</b> Div digunakan sebagai pembungkus.</p>
  <pre>
  &lt;div&gt;
    Konten di dalam div
  &lt;/div&gt;
  </pre>
  <button class="btn" onclick="copyCode(this)">Salin</button>
  `
  },
  
  {
  judul:"8. Warna Text",
  isi:`
  <p><b>Penjelasan:</b> Mengubah warna teks dengan CSS.</p>
  <pre>
  p{
   color:red;
  }
  </pre>
  <button class="btn" onclick="copyCode(this)">Salin</button>
  `
  },
  
  {
  judul:"9. Background",
  isi:`
  <p><b>Penjelasan:</b> Memberi warna background.</p>
  <pre>
  body{
   background:black;
   color:white;
  }
  </pre>
  <button class="btn" onclick="copyCode(this)">Salin</button>
  `
  },
  
  {
  judul:"10. Margin",
  isi:`
  <p><b>Penjelasan:</b> Margin memberi jarak luar.</p>
  <pre>
  div{
   margin:20px;
  }
  </pre>
  <button class="btn" onclick="copyCode(this)">Salin</button>
  `
  },
  
  {
  judul:"11. Padding",
  isi:`
  <p><b>Penjelasan:</b> Padding memberi jarak dalam.</p>
  <pre>
  div{
   padding:20px;
  }
  </pre>
  <button class="btn" onclick="copyCode(this)">Salin</button>
  `
  },
  
  {
  judul:"12. Border",
  isi:`
  <p><b>Penjelasan:</b> Border membuat garis tepi.</p>
  <pre>
  div{
   border:2px solid white;
  }
  </pre>
  <button class="btn" onclick="copyCode(this)">Salin</button>
  `
  },
  
  {
  judul:"13. Flexbox Dasar",
  isi:`
  <p><b>Penjelasan:</b> Flexbox untuk membuat layout sejajar.</p>
  <pre>
  .container{
   display:flex;
   gap:10px;
  }
  </pre>
  <button class="btn" onclick="copyCode(this)">Salin</button>
  `
  },
  
  {
  judul:"14. Text Align",
  isi:`
  <p><b>Penjelasan:</b> Mengatur posisi teks.</p>
  <pre>
  h1{
   text-align:center;
  }
  </pre>
  <button class="btn" onclick="copyCode(this)">Salin</button>
  `
  },
  
  {
  judul:"15. Font Size",
  isi:`
  <p><b>Penjelasan:</b> Mengubah ukuran teks.</p>
  <pre>
  p{
   font-size:20px;
  }
  </pre>
  <button class="btn" onclick="copyCode(this)">Salin</button>
  `
  },
  
  {
  judul:"16. Class",
  isi:`
  <p><b>Penjelasan:</b> Class untuk banyak elemen.</p>
  <pre>
  .red{
   color:red;
  }
  </pre>
  <button class="btn" onclick="copyCode(this)">Salin</button>
  `
  },
  
  {
  judul:"17. ID",
  isi:`
  <p><b>Penjelasan:</b> ID bersifat unik.</p>
  <pre>
  #judul{
   color:blue;
  }
  </pre>
  <button class="btn" onclick="copyCode(this)">Salin</button>
  `
  },
  
  {
  judul:"18. Hover Effect",
  isi:`
  <p><b>Penjelasan:</b> Efek saat mouse diarahkan.</p>
  <pre>
  button:hover{
   background:yellow;
  }
  </pre>
  <button class="btn" onclick="copyCode(this)">Salin</button>
  `
  },
  
  {
  judul:"19. Width & Height",
  isi:`
  <p><b>Penjelasan:</b> Mengatur ukuran elemen.</p>
  <pre>
  img{
   width:200px;
   height:100px;
  }
  </pre>
  <button class="btn" onclick="copyCode(this)">Salin</button>
  `
  },
  
  {
  judul:"20. Position",
  isi:`
  <p><b>Penjelasan:</b> Position absolute untuk posisi bebas.</p>
  <pre>
  .box{
   position:absolute;
   top:20px;
  }
  </pre>
  <button class="btn" onclick="copyCode(this)">Salin</button>
  `
  },
  
  {
  judul:"21. Box Shadow",
  isi:`
  <p><b>Penjelasan:</b> Memberi bayangan.</p>
  <pre>
  div{
   box-shadow:0 0 10px black;
  }
  </pre>
  <button class="btn" onclick="copyCode(this)">Salin</button>
  `
  },
  
  {
  judul:"22. Gradient",
  isi:`
  <p><b>Penjelasan:</b> Background gradasi.</p>
  <pre>
  div{
   background:linear-gradient(red,blue);
  }
  </pre>
  <button class="btn" onclick="copyCode(this)">Salin</button>
  `
  },
  
  {
  judul:"23. Responsive Dasar",
  isi:`
  <p><b>Penjelasan:</b> Gunakan media query.</p>
  <pre>
  @media(max-width:600px){
   body{
    background:gray;
   }
  }
  </pre>
  <button class="btn" onclick="copyCode(this)">Salin</button>
  `
  },
  
  {
  judul:"24. Card Layout",
  isi:`
  <p><b>Penjelasan:</b> Contoh card sederhana.</p>
  <pre>
  .card{
   padding:20px;
   border-radius:10px;
   background:#222;
  }
  </pre>
  <button class="btn" onclick="copyCode(this)">Salin</button>
  `
  },
  
  {
  judul:"25. Mini Landing Page",
  isi:`
  <p><b>Penjelasan:</b> Contoh mini project.</p>
  <pre>
  &lt;h1&gt;Selamat Datang&lt;/h1&gt;
  &lt;p&gt;Website pertama saya 🚀&lt;/p&gt;
  &lt;button&gt;Klik Saya&lt;/button&gt;
  </pre>
  <button class="btn" onclick="copyCode(this)">Salin</button>
  `
  }
  
  ];

tutorialButtons.innerHTML="";
tutorials.forEach((t,i)=>{
  const btn=document.createElement("button");
  btn.className="btn";
  btn.textContent=(i+1)+"️⃣ "+t.judul;
  btn.onclick=()=>{
    tutorialContent.innerHTML=t.isi;
    tutorialModal.classList.remove("hidden");
  };
  tutorialButtons.appendChild(btn);
});

function openTutorial(){
  tutorialModal.classList.remove("hidden");
}
function closeTutorial(){
  tutorialModal.classList.add("hidden");
}