let activeModal = null;
let activeProject = null;
let activeTab = null;

// function openTab(evt, tabName) {
//   sessionStorage.clear();
//   var i, tabcontent, tablinks;
//   tabcontent = document.getElementsByClassName("tabcontent");
//   for (i = 0; i < tabcontent.length; i++) {
//     tabcontent[i].style.display = "none";
//   }
//   tablinks = document.getElementsByClassName("tablinks");

//   for (i = 0; i < tablinks.length; i++) {
//     tablinks[i].className = tablinks[i].className.replace(" active", "");
//     sessionStorage.removeItem(tablinks[i])
//   }
//   document.getElementById(tabName).style.display = "block";
//   evt.currentTarget.className += " active";

onload = (event) => {
  console.log(`window loaded`);
  console.log(`active from local storage is ${localStorage.getItem("active tab")}`);
  if (localStorage.getItem("active tab") != "null"){
    activeTab = localStorage.getItem("active tab");
    var li = document.getElementById(activeTab);
    console.log(li);
    li.classList.add(`name_card_para_active`);
  }
}

//   // save active tab to local storage
 
//   sessionStorage.setItem("active", tabName);
// }

// set active tab
function setActive(page){
  console.log(page.id);
  if (page.id != "nav_bar_name"){
    activeTab = page.id;
  } else {
    activeTab = null;
  }
  console.log(`setting new active to ${activeTab}`);
  localStorage.setItem("active tab", activeTab);
}




function showModal(clicked_div){
  const project_name = clicked_div.id.replace("project_", "")
  activeProject = project_name;
  const modal = document.getElementById(`modal_${project_name}`);
  modal.style.display = "flex";
  activeModal = modal;
  document.activeElement.blur()
}

// closing modal on clicking the span
function closeModal() {
  document.getElementById(activeModal.id).style.display = "none";
  activeModal = null;
}

// closing modal on clicking outside of it

function main(){
  

  window.addEventListener("click", function(e){
    if (activeTab == "name_card_projects"){
      let modal = activeModal;
      if (modal != null){
          if(document.getElementById(modal.id).contains(e.target)) {
          } 
          // if modal is open
          else if (document.getElementById(modal.id).style.display == "flex"){
            // closeModal();  
        }
      } else {
      }
      
    }
  })

  
  
 
  // window.addEventListener("load", (event) => {
  //   if (sessionStorage.getItem("active") == null){
  //     document.getElementById('about_button').click();
  // } else {
  //   let activeTab = sessionStorage.getItem("active").substring(0, sessionStorage.getItem("active").indexOf('_')) + "_button";
    
  //   document.getElementById(activeTab).click();
  // }

  // });

}

main();

