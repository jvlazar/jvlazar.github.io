let activeModal = null;
let activeProject = null;

function openTab(evt, tabName) {
  sessionStorage.clear();
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");

  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
    sessionStorage.removeItem(tablinks[i])
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";



  // save active tab to local storage
 
  sessionStorage.setItem("active", tabName);
}

function showModal(clicked_div){
  console.log(`clicked`);
  const project_name = clicked_div.id.replace("project_", "")
  activeProject = project_name;
  const modal = document.getElementById(`modal_${project_name}`);
  console.log(modal);
  modal.style.display = "flex";
  activeModal = modal;
  document.activeElement.blur()
}

// closing modal on clicking the span
const closeModal = function() {
  console.log(`closing ${activeModal.id}`);
  document.getElementById(activeModal.id).style.display = "none";
  activeModal = null;
}

// closing modal on clicking outside of it

function main(){

  window.addEventListener("click", function(e){
    let modal = activeModal;
    console.log(document.getElementById(modal.id).style.display);

    if (modal != null){
        if(document.getElementById(modal.id).contains(e.target)) {
        } 
        // if modal is open
        else if (document.getElementById(modal.id).style.display == "flex"){
          // closeModal();  
      }
    } else {
    }
  })
 
  window.addEventListener("load", (event) => {
    if (sessionStorage.getItem("active") == null){
      document.getElementById('about_button').click();
  } else {
    let activeTab = sessionStorage.getItem("active").substring(0, sessionStorage.getItem("active").indexOf('_')) + "_button";
    
    document.getElementById(activeTab).click();
  }

  });

}

main();

