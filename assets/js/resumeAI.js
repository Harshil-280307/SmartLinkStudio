// resumeAI.js
// Exposes window.generateResumesSafely(formData, count)
// Replace the call in `callAI()` with your server-side proxy or direct provider endpoint.


window.generateResumesSafely = async function(formData,count=6){
// If you have a server endpoint to call (recommended) set it here
const SERVER_PROXY = null; // e.g. '/api/generateResume'
if(SERVER_PROXY){
const r = await fetch(SERVER_PROXY,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({form:formData,count})});
if(!r.ok) throw new Error('Server error');
return r.json();
}


// Client-side direct provider call - NOT recommended for production due to API keys in client
const PROVIDER = null; // 'openai' or 'gemini'
if(PROVIDER==='openai'){
// Example (commented):
//
