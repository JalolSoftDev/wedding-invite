const bgm = document.getElementById("bgm");

function fadeInAudio(audio, target=1, step=0.05, interval=160){
  audio.volume = 0;
  const t = setInterval(() => {
    audio.volume = Math.min(target, audio.volume + step);
    if (audio.volume >= target) clearInterval(t);
  }, interval);
}

const openBtn = document.getElementById("openInvite");
const cover = document.getElementById("cover");
const invite = document.getElementById("invite");

if (openBtn && cover && invite) {
  openBtn.addEventListener("click", () => {
    // Start music on user gesture (mobile browsers require a click/tap)
    if (bgm) {
      bgm.play().then(() => fadeInAudio(bgm, 1)).catch(() => {});
    }

    cover.style.transition = "opacity .45s ease";
    cover.style.opacity = "0";
    setTimeout(() => {
      cover.style.display = "none";
      invite.classList.remove("hidden");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 450);
  });
}


function buildCalendar(year, monthIndex, selectedDay){
  const monthNames = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
  const dow = ['ПН','ВТ','СР','ЧТ','ПТ','СБ','ВС'];

  const first = new Date(year, monthIndex, 1);
  const last = new Date(year, monthIndex + 1, 0);
  const daysInMonth = last.getDate();

  // JS: Sunday=0..Saturday=6, we want Monday=0..Sunday=6
  let startIdx = (first.getDay() + 6) % 7;

  let html = '<div class="calendar">';
  html += '<div class="calHeader">';
  html += `<p class="calMonth">${monthNames[monthIndex]}</p>`;
  const mm = String(monthIndex+1).padStart(2,'0');
  const dd = String(selectedDay).padStart(2,'0');
  const yy = String(year).slice(-2);
  html += `<p class="calDate">${dd} / ${mm} / ${yy}</p>`;
  html += '<div class="calDivider"><span class="calDiamond"></span></div>';
  html += '</div>';

  html += '<div class="calGrid">';
  for(const d of dow){
    html += `<div class="calDow">${d}</div>`;
  }

  // leading blanks
  for(let i=0;i<startIdx;i++){
    html += `<div class="calDay calDay--muted"></div>`;
  }

  for(let day=1; day<=daysInMonth; day++){
    const isSelected = day === selectedDay;
    html += `<div class="calDay ${isSelected ? 'calDay--selected' : ''}">${day}</div>`;
  }

  html += '</div></div>';
  return html;
}
// buildCalendar(); // disabled: using calendar image


const calStyle = document.createElement("style");
calStyle.textContent = `
  .calendarWrap{ background:#fff; border:1px solid rgba(0,0,0,.08); border-radius:18px; padding:16px; max-width:460px; margin:18px auto 0; }
  .calTitle{ font-family:"Cormorant Garamond", serif; font-weight:600; text-align:center; font-size:22px; margin-bottom:12px; }
  .calGrid{ display:grid; grid-template-columns:repeat(7,1fr); gap:8px; }
  .calHead{ text-align:center; font-family:"Cormorant Garamond", serif; font-size:14px; color:rgba(0,0,0,.5); padding:6px 0; }
  .calCell{ text-align:center; font-family:"Cormorant Garamond", serif; font-size:16px; padding:10px 0; border-radius:12px; background: rgba(0,0,0,.03); color:#222; }
  .calEmpty{ background: transparent; }
  .calActive{ background:#000; color:#fff; font-weight:600; }
`;
document.head.appendChild(calStyle);

// countdown
const weddingDate = new Date(2026, 2, 25, 18, 0, 0);
function pad2(n){ return String(n).padStart(2,"0"); }

function tick(){
  const now = new Date();
  let diff = weddingDate - now;
  if(diff < 0) diff = 0;

  const totalSeconds = Math.floor(diff/1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  document.getElementById("cd_d").textContent = days;
  document.getElementById("cd_h").textContent = pad2(hours);
  document.getElementById("cd_m").textContent = pad2(mins);
  document.getElementById("cd_s").textContent = pad2(secs);
}
setInterval(tick, 1000);
tick();

// fade-in reveals
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add("is-visible"); });
}, { threshold: 0.14 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// RSVP URL
const rsvpUrl = ""; // вставь ссылку на Google Form, например: "https://forms.gle/XXXX"
const rsvpBtn = document.getElementById("rsvpBtn");
if(rsvpUrl && rsvpUrl.startsWith("http")){
  rsvpBtn.href = rsvpUrl;
} else {
  rsvpBtn.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Вставь ссылку на Google Form в app.js (переменная rsvpUrl).\n\nПотом перезагрузи страницу.");
  });
}
