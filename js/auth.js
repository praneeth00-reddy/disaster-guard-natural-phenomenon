const ADMIN_EMAIL="admin@disasterguard.com";
const ADMIN_PASSWORD="admin123";

function get(key){return JSON.parse(localStorage.getItem(key)||"[]")}
function set(key,value){localStorage.setItem(key,JSON.stringify(value))}
function showSignup(){document.getElementById("loginBox").classList.add("hidden");document.getElementById("signupBox").classList.remove("hidden")}
function showLogin(){document.getElementById("signupBox").classList.add("hidden");document.getElementById("loginBox").classList.remove("hidden")}

function seed(){
 if(!localStorage.getItem("dg_users"))set("dg_users",[]);
 if(!localStorage.getItem("dg_reports"))set("dg_reports",[]);
 if(!localStorage.getItem("dg_alerts"))set("dg_alerts",[
  {id:1,title:"Heavy Rainfall Alert",message:"Heavy rainfall expected in low-lying areas. Residents are advised to stay indoors."},
  {id:2,title:"Flood Risk",message:"Water levels are rising. Avoid unnecessary travel near rivers and low-lying areas."}
 ]);
 if(!localStorage.getItem("dg_resources"))set("dg_resources",[
  {name:"Medical Teams",icon:"🚑",value:18,unit:"Available"},
  {name:"Rescue Vehicles",icon:"🚒",value:12,unit:"Available"},
  {name:"Water Supplies",icon:"💧",value:2450,unit:"Units"},
  {name:"Safe Shelters",icon:"🏠",value:42,unit:"Active"}
 ]);
}
seed();

function signupUser(e){
 e.preventDefault();
 const name=signupName.value.trim(),email=signupEmail.value.trim().toLowerCase(),password=signupPassword.value;
 if(email===ADMIN_EMAIL){alert("This email is reserved for admin.");return}
 const users=get("dg_users");
 if(users.some(u=>u.email===email)){alert("Email already registered.");return}
 users.push({id:Date.now(),name,email,password,role:"user"});set("dg_users",users);
 alert("Signup successful. Please login.");e.target.reset();showLogin();
}
function loginUser(e){
 e.preventDefault();
 const email=loginEmail.value.trim().toLowerCase(),password=loginPassword.value;
 let user=null;
 if(email===ADMIN_EMAIL&&password===ADMIN_PASSWORD)user={name:"Administrator",email,role:"admin"};
 else user=get("dg_users").find(u=>u.email===email&&u.password===password);
 if(!user){alert("Invalid email or password.");return}
 localStorage.setItem("dg_currentUser",JSON.stringify(user));
 window.location.href=user.role==="admin"?"admin.html":"user.html";
}