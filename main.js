let addbtn=document.querySelector(".add-button");
let modalC=document.querySelector(".modal");
let maincont=document.querySelector(".main-cont");
let textcont=document.querySelector(".text-area-cont");
let add=false;

addbtn.addEventListener("click",function(){
    add=!add;
    if(add)
    {
        modalC.style.display="flex";
    }
    else{
        modalC.style.display="none";
    }
})
modalC.addEventListener("keydown",(e)=>{
    console.log("yes");
    let key=e.key;
    if(key=="Shift")
    {
        createtask();
         modalC.style.display="none";
        textcont.value="";
    }
})

function createtask(){
    let ticketcont=document.createElement("div");
    ticketcont.setAttribute("class","ticket-cont");
    ticketcont.innerHTML=` <div class="ticket-col"></div>
    <div class="ticket-id">#RITM14753</div>
    <div class="ticket-area">Please unlock AD account</div>`
    maincont.appendChild(ticketcont);
}