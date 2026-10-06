function get(key){return JSON.parse(localStorage.getItem(key)||"[]")}
function set(key,value){localStorage.setItem(key,JSON.stringify(value))}
const user=JSON.parse(localStorage.getItem("dg_currentUser")||"null");
if(!user||user.role!=="admin"){window.location.href="index.html"}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
function toast(msg){const t=document.getElementById("toast");t.textContent=msg;t.style.display="block";setTimeout(()=>t.style.display="none",2200)}

function render(){
 const reports=get("dg_reports"),users=get("dg_users");
 totalReports.textContent=reports.length;totalUsers.textContent=users.length;
 pendingReports.textContent=reports.filter(r=>r.status==="Pending").length;resolvedReports.textContent=reports.filter(r=>r.status==="Resolved").length;
 document.getElementById("adminReports").innerHTML=reports.length?reports.map(r=>`<div class="row"><div><b>${esc(r.type)}</b> — ${esc(r.location)}<small>By ${esc(r.userName)} (${esc(r.userEmail)})<br>${esc(r.description)}<br>${esc(r.createdAt)}</small></div><div class="actions"><span class="badge ${r.status.toLowerCase()}">${r.status}</span><button onclick="status(${r.id},'Resolved')">Resolve</button><button class="danger" onclick="status(${r.id},'Rejected')">Reject</button></div></div>`).join(""):"<p class='empty'>No reports available.</p>";
 document.getElementById("users").innerHTML=users.length?users.map(u=>`<div class="row"><span>👤 <b>${esc(u.name)}</b> — ${esc(u.email)}</span><span>User</span></div>`).join(""):"<p class='empty'>No users registered.</p>";
 document.getElementById("adminAlerts").innerHTML=get("dg_alerts").map(a=>`<div class="row"><span><b>${esc(a.title)}</b><small>${esc(a.message)}</small></span><button class="danger" onclick="deleteAlert(${a.id})">Delete</button></div>`).join("");
 document.getElementById("adminResources").innerHTML=get("dg_resources").map(r=>`<div class="row"><span>${r.icon} ${esc(r.name)}</span><b>${r.value} ${r.unit}</b></div>`).join("");
}
function status(id,value){const a=get("dg_reports"),r=a.find(x=>x.id===id);if(r)r.status=value;set("dg_reports",a);render();toast("Report status updated.")}
function addAlert(e){e.preventDefault();const a=get("dg_alerts");a.push({id:Date.now(),title:alertTitle.value,message:alertMessage.value});set("dg_alerts",a);e.target.reset();render();toast("Alert added.")}
function deleteAlert(id){set("dg_alerts",get("dg_alerts").filter(a=>a.id!==id));render();toast("Alert deleted.")}
function updateResource(e){e.preventDefault();const a=get("dg_resources"),r=a.find(x=>x.name===resourceName.value);if(r)r.value=Number(resourceValue.value);set("dg_resources",a);render();toast("Resource updated.")}
function logout(){localStorage.removeItem("dg_currentUser");window.location.href="index.html"}
render();