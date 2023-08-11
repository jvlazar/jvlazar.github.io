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



function main(){

  
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

