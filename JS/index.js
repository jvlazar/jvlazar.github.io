// import data from "./project_specifics.json"
let activeModal = null;
let activeProject = null;
let activeTab = null;
let projectData = null;
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
  if (localStorage.getItem("active tab") != "null"){
    activeTab = localStorage.getItem("active tab");
    var li = document.getElementById(activeTab);
    li.classList.add(`name_card_para_active`);
  }
}

//   // save active tab to local storage
 
//   sessionStorage.setItem("active", tabName);
// }

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
  const project_name = clicked_div.id.replace("project_", "")
  activeProject = project_name;
  const modal = document.getElementById(`modal_${project_name}`);
  modal.style.display = "grid";
  activeModal = modal;
  document.activeElement.blur();

  showData();
}

// closing modal on clicking the span
function closeModal() {
  document.getElementById(activeModal.id).style.display = "none";
  document.getElementById("content").style.filter = "none";
  const ele = document.getElementsByClassName('project');
  for (let index = 0; index < ele.length; index++) {
    document.getElementById(ele[index].id).style.filter = "none";
  }
  activeModal = null;
}


async function showData(){
console.log(`active modal is ${activeModal.id}`);
    let data = await fetch('./JS/project_specifics.json')
      .then(response => response.json());
      for (let index = 0; index < data.length; index++){
        console.log(data[index].modal);
        if (data[index].modal == activeModal.id){
          console.log(`they are the same`);
          document.getElementsByClassName("languages")[index].innerHTML = data[index].language;
          document.getElementsByClassName("modal_info")[index].innerHTML = data[index].description;
          document.getElementsByClassName("link")[index].href = data[index].link;
          if (data[index].modal.tools != "null"){
            document.getElementsByClassName("tools")[index].innerHTML = data[index].tools;
          }
        }

      }

      
      // console.log(document.getElementsByClassName("modal_info")[0]);
      
     
}


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

