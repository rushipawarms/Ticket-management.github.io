
let addbtn=document.querySelector(".add-button");
let removebtn=document.querySelector(".remove-button");
let modalC=document.querySelector(".modal");
let maincont=document.querySelector(".main-cont");
let textcont=document.querySelector(".text-area-cont");
let Allprioritycolor=document.querySelectorAll('.priority-col');
let priorityColors=["lightpink","lightblue","lightgreen","black"];
let modalcolor=priorityColors[priorityColors.length-1];
let prioritycolor=document.querySelectorAll(".color");
let ticketArray=[];
let add=false;
let removalflag=false;
if(localStorage.getItem("Tickets"))
{
    ticketArray=JSON.parse( localStorage.getItem("Tickets"));
    for(let i=0;i<ticketArray.length;i++)
    {
        createtask(ticketArray[i].modalcolor,ticketArray[i].text,ticketArray[i].ticketID);
    }
}
for(let i=0;i<Allprioritycolor.length;i++){
    Allprioritycolor[i].addEventListener("click",function(e){
        for(let j=0;j<Allprioritycolor.length;j++)
        {
            Allprioritycolor[j].classList.remove("border");
        }
        Allprioritycolor[i].classList.add("border");
        modalcolor=Allprioritycolor[i].classList[0];
        
    })
}
for(let i=0;i<prioritycolor.length;i++)
{
    
    prioritycolor[i].addEventListener("click",function(){
       
        let Ccolor=prioritycolor[i].classList[0];
        
        let filterTicket=ticketArray.filter((tickobj,idx)=>{
            return Ccolor===tickobj.modalcolor;
        })
        
      
        let previous=document.querySelectorAll(".ticket-cont");
       
        for(let k=0;k<previous.length;k++)
        {
            previous[k].remove();
        }
        for(let l=0;l<filterTicket.length;l++)
        {
           createtask(filterTicket[l].modalcolor,filterTicket[l].text,filterTicket[l].ticketID);
           
        }
    })
}
        let allticket=document.querySelector(".all-ticket")
             allticket.addEventListener("click", (e) => {
                let prevoiusfilter=document.querySelectorAll(".ticket-cont");
                for(let i=0;i<prevoiusfilter.length;i++)
                {
                    prevoiusfilter[i].remove();
                }
               for( let i=0;i<ticketArray.length;i++)
               {
                   createtask(ticketArray[i].modalcolor,ticketArray[i].text,ticketArray[i].ticketID);
               }
                
            })



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
removebtn.addEventListener("click",function(){
    if(!removalflag){
        removebtn.style.color="red";
    }
    else{
        removebtn.style.color="lightgrey";
    }
    removalflag=!removalflag;
})
modalC.addEventListener("keydown",(e)=>{
   
    let key=e.key;
    if(key=="Shift")
    {
        
        createtask(modalcolor, textcont.value);
         modalC.style.display="none";
        textcont.value="";
        for(let j=0;j<Allprioritycolor.length;j++)
        {
            Allprioritycolor[j].classList.remove("border");
        }
        Allprioritycolor[Allprioritycolor.length-1].classList.add("border");
        modalcolor= Allprioritycolor[Allprioritycolor.length-1].classList[0];
    }
})

function createtask(modalcolor,text,ticketID){
    let id=ticketID || shortid();
    
    let ticketcont=document.createElement("div");
    ticketcont.setAttribute("class","ticket-cont");
    ticketcont.innerHTML=` <div class="ticket-col ${modalcolor}"></div>
    <div class="ticket-id">Id: ${id}</div>
    <div class="ticket-area">${text}</div>
    <div class="ticket-lock">
        <i class="fas fa-lock"></i>
    </div>`
    maincont.appendChild(ticketcont);
    if(!ticketID)
    {
        ticketArray.push({modalcolor,text,ticketID:id});
        localStorage.setItem("Tickets",JSON.stringify(ticketArray));
    }
  
    handleRemoval(ticketcont,id);
    handlelock(ticketcont,id);
    handlecolor(ticketcont,id);
}
function handlelock(ticket,id)
{
    let tickLOCK=ticket.querySelector(".fas");
    let tickText=ticket.querySelector(".ticket-area");
    tickLOCK.addEventListener("click", function(){
        let idx=getidxfrominpurarray(id);
        if(tickLOCK.classList.contains("fa-lock")){
            tickLOCK.classList.remove("fa-lock");
            tickLOCK.classList.add("fa-lock-open");
            tickText.setAttribute("contenteditable" ,"true");
            
        }
        else{
            tickLOCK.classList.remove("fa-lock-open");
            tickLOCK.classList.add("fa-lock");
            tickText.setAttribute("contenteditable" ,"false");
        }
        ticketArray[idx].text=tickText.innerText;
        localStorage.setItem("Tickets",JSON.stringify(ticketArray));
    })
}
function handlecolor(ticket,id)
{
    let ticketcolor=ticket.querySelector(".ticket-col");
    ticketcolor.addEventListener("click",function(){
       let idx=getidxfrominpurarray(id);
        let currentTcolor=ticketcolor.classList[1];
        let CCidx;
        for(let i=0;i<priorityColors.length;i++)
        {
            if(priorityColors[i]===currentTcolor)
            {
                CCidx=i;
                console.log(CCidx);
            }
        }
        CCidx++;
        changeidx=CCidx%priorityColors.length;
        changeColor=priorityColors[changeidx];
        ticketcolor.classList.remove(currentTcolor);
        ticketcolor.classList.add(changeColor);
        ticketArray[idx].modalcolor=changeColor;
        localStorage.setItem("Tickets",JSON.stringify(ticketArray));
    })
  

}
function getidxfrominpurarray(id)
{
    for(let i=0;i<ticketArray.length;i++)
    {
        if(ticketArray[i].ticketID==id)
        {
            return i;
        }
    }
}
function handleRemoval(ticket,id)
{
    ticket.addEventListener("click",function(){
        let idx=getidxfrominpurarray(id);
        if(removalflag)
        {
            ticket.remove();
            ticketArray.splice(idx,1);
            localStorage.setItem("Tickets",JSON.stringify(ticketArray));
        }
    })
    
}