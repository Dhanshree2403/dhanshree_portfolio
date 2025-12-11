// Typing Effect
const texts=["MCA Student","Full-Stack Developer","Android & IoT Enthusiast","Python Programmer"];
let count=0, index=0, currentText="", letter="";
(function type(){
  if(count===texts.length) count=0;
  currentText=texts[count];
  letter=currentText.slice(0,++index);
  document.querySelector(".typing").textContent=letter;
  if(letter.length===currentText.length){count++; index=0; setTimeout(type,1000);} else {setTimeout(type,150);}
})();

// Hamburger menu
function toggleMenu(){document.querySelector(".nav-links").classList.toggle("active");}

// Project Modal
const modal=document.getElementById("modal");
function openModal(id){
  modal.style.display="block";
  const title=document.getElementById("modal-title");
  const desc=document.getElementById("modal-desc");
  const img=document.getElementById("modal-img");
  const projectData={
    project1:{title:"To-Do List App", desc:"A simple Android app to manage tasks efficiently.", img:"images/to do list .jpg"},
    project2:{title:"Car Parking System IoT", desc:"Built an IoT-based Smart Car Parking System using Arduino to automate vehicle detection and real-time parking status display.", img:"images/car parcking.jpg"},
    project3:{title:"IoT Smart Home (Kotlin)", desc:"Developed a Kotlin-based IoT Smart Home Automation system with modular design for device integration and real-time automation.", img:"images/smart home iot.jpg"},
    project4:{title:"Smart Calculator", desc:"Python-based calculator with advanced math functions, expression evaluation, and history/undo support.", img:"smart caculator.jpg"},
    project5:{title:"Online Appointment Booking System", desc:"A web-based platform built with HTML, CSS, and JavaScript to schedule, manage, and confirm appointments easily.", img:"images/appoinment.jpg"},
    project6:{title:"Tic-Tac-Toe", desc:"Python-based console game featuring player turns, board display, and result validation.", img:"images/tic tak toe.jpg"},
    project7:{title:"ShopIndia", desc:"A responsive React e-commerce front-end showcasing Indian products with a clean UI, product browsing, cart, and checkout-ready flows.", img:"images/shopindia.jpg"}
  };
  title.textContent=projectData[id].title;
  desc.textContent=projectData[id].desc;
  img.src=projectData[id].img;
}
function closeModal(){modal.style.display="none";}
window.onclick=function(e){if(e.target===modal) closeModal();}

// Scroll animations
const sections=document.querySelectorAll("section");
function checkSections(){
  const triggerBottom=window.innerHeight*0.85;
  sections.forEach(section=>{
    const sectionTop=section.getBoundingClientRect().top;
    if(sectionTop<triggerBottom) section.classList.add("visible");
  });
}
window.addEventListener("scroll", checkSections);
window.addEventListener("load", checkSections);

// Projects-Skills Highlight + Lines
const skillMap={
  project1:["html","css","JavaScript"],
  project2:["IoT","Arduino","Kotlin"],
  project3:["IoT","Kotlin","Automation"],
  project4:["Python","Algorithms","GUI"],
  project5:["HTML","CSS","JavaScript"],
  project6:["Python","Logic"],
  project7:["React","html,css,js"]

};
const projectCards=document.querySelectorAll(".project-card");
const skillItems=document.querySelectorAll(".skills-list li");
const svg=document.getElementById("connections");
function drawLine(card,skillLi){
  const cardRect=card.getBoundingClientRect();
  const skillRect=skillLi.getBoundingClientRect();
  const x1=cardRect.left+cardRect.width/2+window.scrollX;
  const y1=cardRect.top+cardRect.height/2+window.scrollY;
  const x2=skillRect.left+skillRect.width/2+window.scrollX;
  const y2=skillRect.top+skillRect.height/2+window.scrollY;
  const line=document.createElementNS("http://www.w3.org/2000/svg","line");
  line.setAttribute("x1",x1); line.setAttribute("y1",y1);
  line.setAttribute("x2",x2); line.setAttribute("y2",y2);
  svg.appendChild(line);
  setTimeout(()=>{line.style.opacity=1;},10);
  return line;
}
let activeLines=[];
projectCards.forEach(card=>{
  card.addEventListener("mouseenter",()=>{
    const id=Object.keys(skillMap).find(k=>card.onclick.toString().includes(k));
    skillItems.forEach(li=>li.classList.remove("highlight"));
    activeLines.forEach(l=>l.remove());
    activeLines=[];
    if(id){
      skillMap[id].forEach(skill=>{
        const li=document.querySelector(`.skills-list li[data-skill="${skill}"]`);
        if(li){li.classList.add("highlight"); const line=drawLine(card,li); activeLines.push(line);}
      });
    }
  });
  card.addEventListener("mouseleave",()=>{
    skillItems.forEach(li=>li.classList.remove("highlight"));
    activeLines.forEach(l=>l.remove());
    activeLines=[];
  });
});
