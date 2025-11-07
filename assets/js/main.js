// main.js — light client behaviour: demo gallery, form navigation, render mock gallery
(function(){
const homeGallery = [{name:'Aisha Jain',role:'UI/UX Designer'},{name:'Rohit S',role:'Frontend Dev'},{name:'Priya K',role:'Product Designer'}];
function renderGallery(targetId,list){
const el=document.getElementById(targetId);
if(!el) return;
el.innerHTML=list.map(u=>`<div class="card"><strong>${u.name}</strong><p>${u.role}</p><a href='/resume-builder.html' class='btn-small'>Use</a></div>`).join('');
}
renderGallery('homeGallery',homeGallery);
renderGallery('exploreGrid',homeGallery.concat(homeGallery));


// Form navigation for resume-builder
const steps = Array.from(document.querySelectorAll('.step'));
let idx=0;
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const generateBtn = document.getElementById('generateBtn');
function showStep(i){
steps.forEach((s,si)=>{s.hidden = si!==i});
prevBtn.hidden = i===0;
nextBtn.hidden = i===steps.length-1;
if(i===steps.length-1) generateBtn.hidden=false; else generateBtn.hidden=true;
}
if(steps.length){showStep(0)}
if(prevBtn){prevBtn.addEventListener('click',()=>{idx=Math.max(0,idx-1);showStep(idx)});
}
if(nextBtn){nextBtn.addEventListener('click',()=>{idx=Math.min(steps.length-1,idx+1);showStep(idx)});
}


// Wire generate action
if(generateBtn){
generateBtn.addEventListener('click',async()=>{
generateBtn.disabled=true; generateBtn.textContent='Generating...';
const form = document.getElementById('resumeForm');
const fd = new FormData(form);
const data = Object.fromEntries(fd.entries());
try{
const versions = await window.generateResumesSafely(data,6);
renderResults(versions);
}catch(e){
console.error(e); alert('AI generation failed — see console.');
}finally{generateBtn.disabled=false;generateBtn.textContent='Generate 6 Resumes (AI)'}
});
}


function renderResults(list){
const out = document.getElementById('resultArea');
out.innerHTML = '<h3>Pick a resume version</h3>' + list.map((v,i)=>`
<div class='resume-card card'>
<h4>${v.title}</h4>
<div>${v.html}</div>
<div style='margin-top:8px'><button onclick='selectVersion(${i})'>Select</button></div>
</div>`).join('');
// expose select function globally
window.selectVersion = (i)=>{localStorage.setItem('sl_selected', JSON.stringify(list[i])); alert('Selected — saved locally. Click Publish to make page (or integrate Firebase).')}
}


})();
