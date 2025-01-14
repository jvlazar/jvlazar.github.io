let activeModal = null;
let activeProject = null;
let activeTab = null;
let projectData = null;


onload = (event) => {
  if (localStorage.getItem("active tab") != "null"){
    activeTab = localStorage.getItem("active tab");
    var li = document.getElementById(activeTab);
    li.classList.add(`name_card_para_active`);
  }
}


// set active tab
function setActive(page){
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
  modal.style.display = "grid";
  activeModal = modal;
  document.getElementById(`${activeModal.id}_container`).style.display = "grid";
  document.activeElement.blur();
  showData();
}

// closing modal on clicking the span
function closeModal() {
  if (activeModal != null && document.getElementById(activeModal.id).style.display == "grid"){
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
            document.getElementsByClassName("languages")[index].innerHTML = "Languages: " + data[index].language;
            document.getElementsByClassName("modal_info")[index].innerHTML ="Project Description: <br> " + data[index].description;
            document.getElementsByClassName("link")[index].href = data[index].link;
            if (data[index].tools != null){
              document.getElementsByClassName("tools")[index].innerHTML = "Additional Tools: " + data[index].tools;
            } else{
              document.getElementsByClassName("tools")[index].innerHTML = "Additional Tools: None";
            }
          }
        }     
}
  
 
