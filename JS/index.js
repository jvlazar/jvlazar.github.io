let activeModal = null;
let activeProject = null;
let activeTab = null;
let projectData = null;
let activeArtModal = null;
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

    if (activeTab == "name_card_art"){
      showArt();
    }
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
  console.log(`closing modal`);
  if (activeTab == "name_card_projects"){
    console.log(`clicking close span`);
    console.log(`trying to close ${activeModal.id}`);
    if (activeModal != null && (document.getElementById(activeModal.id).style.display == "grid" || document.getElementById(activeModal.id).style.display == "block")){
      console.log(`closing modal`);
      document.getElementById(activeModal.id).style.display = "none";
      document.getElementById(`${activeModal.id}_container`).style.display = "none";
    }
  } else if (activeTab == "name_card_art"){
    console.log(`in close modal function`);
    if (activeArtModal != null){
     
    }
  } 
  

}


// close modal by clicking outside of it
window.onclick = function(event) {
  if (localStorage.getItem("active tab") == "name_card_projects"){
    myModal = document.getElementById(`${activeModal.id}_container`);
    if (event.target == myModal) {
      myModal.style.display = "none";
    }

  } else if (localStorage.getItem("active tab") == "name_card_art"){
    myModal = document.getElementById(`${activeArtModal}`);
    if (event.target == myModal) {
      myModal.style.display = "none";
      activeArtModal = null;
    }

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
  

async function showArt(){
  let data = await fetch('./JS/art_links.json')
    .then(response => response.json());
    console.log(`showing art`);
    for (let index = 0; index < data.length; index++){
      const node = document.createElement("div");
      node.setAttribute("id", data[index].id);
      const image = document.createElement("img");
      image.setAttribute("src", `${data[index].link}`);
      image.setAttribute("id", `${data[index].id}`);
      image.setAttribute("width",  (data[index].width/10)+"px");
      image.setAttribute("height", (data[index].height/10)+"px");
      node.setAttribute("onclick", `showArtModal(${data[index].id})`);
      const info = document.createElement("div");
      info.setAttribute("id","info");


      // create modal info

      const artModal = document.createElement("div");
      artModal.setAttribute("class", "art_modal");
      artModal.setAttribute("id", `${data[index].id}_modal_container`);
      const artModalContent = document.createElement("div");
      artModalContent.setAttribute("class", "art_modal_content");
      artModalContent.setAttribute("id", `${data[index].id}_modal`);
      artModal.appendChild(artModalContent);
      // const closeSpan = document.createElement("span");
      // closeSpan.setAttribute("class", "close");
      // closeSpan.setAttribute("id", "close");
      // closeSpan.setAttribute("onclick", `closeModal()`);
      // closeSpan.innerHTML = "&times;";
      const fullImage = document.createElement("img");
      fullImage.setAttribute("src", `${data[index].link}`);
      fullImage.setAttribute("width", `${(data[index].width)/5}px`);
      fullImage.setAttribute("height", `${(data[index].height/5)}px`);
      
      // artModal.appendChild(closeSpan);
      artModal.appendChild(fullImage);
      node.appendChild(artModal);
      const title = document.createElement("p");
      title.innerHTML = data[index].title;






      const fanart = document.createElement("p");
      data[index].fanart != null ? fanart.innerHTML=data[index].fanart: null;
      info.appendChild(title);
      info.appendChild(fanart);
      node.appendChild(image);
      node.appendChild(info);
      document.getElementById("art").appendChild(node);
     

    }     
}
 
// create a modal for the art piece
function showArtModal (piece) {

  console.log(piece);
  console.log(piece.getElementsByClassName(`art_modal`));
  piece.getElementsByClassName(`art_modal`)[0].style.display = "block";
  activeArtModal =  piece.getElementsByClassName(`art_modal`)[0].id;
  console.log(`active art modal is ${activeArtModal}`);
}

