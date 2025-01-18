let activeModal = null;
let activeProject = null;
let activeTab = null;
let projectData = null;
let menu = "inactive";

window.addEventListener('resize', function(){
  if (menu == "active"){
    if (window.innerWidth > 700 &&  document.getElementById("nav_bar_pages").style.display != "none"){
      document.getElementById("nav_bar_pages").style.display = "flex";
    } else {
      document.getElementById("nav_bar_pages").style.display = "block";
    }
  }

  if (activeModal != null){
    if (window.innerWidth > 700 &&  document.getElementById(activeModal.id).style.display != "none"){
      document.getElementById(activeModal.id).style.display = "grid";
    } else {
      document.getElementById(activeModal.id).style.display = "block";
    }
}
});

onload = (event) => {
  if (localStorage.getItem("active tab") != "null"){
    activeTab = localStorage.getItem("active tab");
    var li = document.getElementById(activeTab);
    li.classList.add(`name_card_para_active`);
  }
}

function myFunction() {
  var x = document.getElementById("nav_bar_pages");
  if (x.style.display === "block") {
    x.style.display = "none";
    menu = "inactive";
  } else {
    x.style.display = "block";
    menu = "active";
  }
} 

// set active tab
function setActive(page){
  // console.log(`clicked on ${page.id}`);
  if (page.id != "nav_bar_name"){
    activeTab = page.id;
  } else {
    activeTab = null;
  }
  localStorage.setItem("active tab", activeTab);
}




function showModal(clicked_div){
  activeProject = clicked_div.id.replace("project_", "");
  const modal = document.getElementById(`modal_${activeProject}`);
  if (window.innerWidth > 700){
    modal.style.display = "grid";
  } else {
    modal.style.display = "block";
  }
  activeModal = modal;
  document.getElementById(`${activeModal.id}_container`).style.display = "grid";
  document.activeElement.blur();
  showData();
  
}

// closing modal on clicking the span
function closeModal() {
  console.log(`clicking close span`);
  console.log(`trying to close ${activeModal.id}`);
  if (activeModal != null && (document.getElementById(activeModal.id).style.display == "grid" || document.getElementById(activeModal.id).style.display == "block")){
    console.log(`closing modal`);
    document.getElementById(activeModal.id).style.display = "none";
    document.getElementById(`${activeModal.id}_container`).style.display = "none";
  }

}


// close modal by clicking outside of it
window.onclick = function(event) {
  myModal = document.getElementById(`${activeModal.id}_container`);
  if (event.target == myModal) {
    myModal.style.display = "none";
  }
} 

async function showData(){
      let data = await fetch('./JS/project_specifics.json')
        .then(response => response.json());
        for (let index = 0; index < data.length; index++){
          if (data[index].modal == activeModal.id){
            document.getElementsByClassName("languages")[index].innerHTML = "<b>Languages:</b> " + data[index].language;
            document.getElementsByClassName("modal_info")[index].innerHTML ="<b>Project Description</b>: <br> " + data[index].description;
            document.getElementsByClassName("link")[index].href = data[index].link;
            if (data[index].tools != null){
              document.getElementsByClassName("tools")[index].innerHTML = "<b>Additional Tools:</b> " + data[index].tools;
            } else{
              document.getElementsByClassName("tools")[index].innerHTML = "<b>Additional Tools:</b> None";
            }
          }
        }     
}
  
 
