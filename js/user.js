function get(key){return JSON.parse(localStorage.getItem(key)||"[]")}
function set(key,value){localStorage.setItem(key,JSON.stringify(value))}
function current(){return JSON.parse(localStorage.getItem("dg_currentUser")||"null")}
const user=current();
if(!user||user.role!=="user"){window.location.href="index.html"}

function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
function toast(msg){const t=document.getElementById("toast");t.textContent=msg;t.style.display="block";setTimeout(()=>t.style.display="none",2200)}

function submitReport(e){
 e.preventDefault();
 const reports=get("dg_reports");
 reports.push({id:Date.now(),userEmail:user.email,userName:user.name,type:type.value,location:location.value,description:description.value,status:"Pending",createdAt:new Date().toLocaleString()});
 set("dg_reports",reports);e.target.reset();toast("Disaster report submitted successfully.");render();
}
function render(){
 document.getElementById("userName").textContent="👤 "+user.name;
 const reports=get("dg_reports").filter(r=>r.userEmail===user.email);
 totalReports.textContent=reports.length;pendingReports.textContent=reports.filter(r=>r.status==="Pending").length;resolvedReports.textContent=reports.filter(r=>r.status==="Resolved").length;
 document.getElementById("reports").innerHTML=reports.length?reports.map(r=>`<div class="row"><div><b>${esc(r.type)}</b> — ${esc(r.location)}<small>${esc(r.description)}<br>${esc(r.createdAt)}</small></div><span class="badge ${r.status.toLowerCase()}">${r.status}</span></div>`).join(""):"<p class='empty'>No reports submitted.</p>";
 document.getElementById("alerts").innerHTML=get("dg_alerts").map(a=>`<div class="alert"><b>⚠️ ${esc(a.title)}</b><p>${esc(a.message)}</p></div>`).join("");
 document.getElementById("resources").innerHTML=get("dg_resources").map(r=>`<div class="resource">${r.icon}<b>${esc(r.name)}</b><strong>${r.value}</strong><small>${esc(r.unit)}</small></div>`).join("");
}
function logout(){localStorage.removeItem("dg_currentUser");window.location.href="index.html"}
function openReport(){document.getElementById("type").focus()}
render();