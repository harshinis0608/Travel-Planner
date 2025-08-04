import React from "react";
import { useState } from "react";
import { useRef } from "react";
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import './App.css'
function Test(){
    const [input,setInput]=useState("");
    const [date,setDate]=useState("");
    const [destination,setDestination]=useState("");
    const [transportation,setTransportation]=useState("");
    const [todolist,setTodolist]=useState([]);
    const [buyInput,setbuyInput]=useState("");
    const [tobuy,setTobuy]=useState([]);
    const planner=useRef();
    function downloadPDF(){
        const input=planner.current;
        html2canvas(input).then((canvas)=>{
            const imgData=canvas.toDataURL("image/png");
            const pdf=new jsPDF("l","mm","a4");
            const imgProps=pdf.getImageProperties(imgData);
            const pdfWidth=pdf.internal.pageSize.getWidth();
            const pdfHeight=(imgProps.height * pdfWidth)/(imgProps.width);
            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save("travel-planner.pdf");
       })
    }
    function handleToBuy(){
        if(buyInput.trim()!==""){
            const newBuy={text:buyInput,completed:false}
            setTobuy([...tobuy,newBuy])
            setbuyInput("");
        }
    }
    function handleClick(){
        if(input!=""){
            const newinp={text:input,date:date,destination:destination,transportation:transportation,completed:false}
            setTodolist([...todolist,newinp]);
            setInput("");
            // setDate("");
            // setDestination("");
            // setTransportation("");
        }
    }

     function handle(i){
           const checking=[...tobuy];
           checking[i].completed=!checking[i].completed;
           setTobuy(checking);
    }
    function handleCheck(index){
           const check=[...todolist];
           check[index].completed=!check[index].completed;
           setTodolist(check);
    }
    function handleDelete(index){
        const del=[...todolist];
        del.splice(index,1);
        setTodolist(del);
    }
    function handledel(i){
        const d=[...tobuy];
        d.splice(i,1);
        setTobuy(d);
    }
    return(
<div className="overall">
    <div ref={planner} className="planner">
            <h2>Travel Planner</h2>
    <div className="inp-grp">
        <div className="daaate">
           <label htmlFor="">Date:</label>
            <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} /> 
             {date && <p className="visible-date"></p>}
            <br /> <br />
        </div>
        <div className="row-flex">
            <div className="container">
                <div className="left">
                    <div className="dest">
                              <label htmlFor="">Destination</label> <input type="text" value={destination} onChange={(e)=>setDestination(e.target.value)}  placeholder="Where do you want to go?"/> 
                              <br /> 
                    </div>
                    <div className="todo">
                        <div className="thing">
                            <label htmlFor="">Things to do</label>
                            <input type="text" value={input} onChange={(e)=>setInput(e.target.value)} placeholder="What do you want to do?"/> 
                            <button onClick={handleClick}className="do-but">Add</button>
                        </div> 
                           <ul style={{listStyleType:"none",padding:0}}>
                           {todolist.map((item,index)=>(
                            <li key={index}>
                            <input type="checkbox" checked={item.completed} onChange={()=>handleCheck(index)} />
                            <button className="li"  style={{textDecoration:item.completed? "line-through" : "none"}} onDoubleClick={()=>handleDelete(index)}>{item.text}</button>
                            </li> 
                             ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="middle">
                    <div className="transp">
                          <label htmlFor="">Transportation</label>
                           <select name="transp" value={transportation} onChange={(e)=>setTransportation(e.target.value)} id="">
                            <option value="">Select Transportation</option>
                            <option value="Bus">Bus</option>
                            <option value="Car">Car</option>
                            <option value="Flight">Flight</option>
                            <option value="Train">Train</option>
                           <option value="Bike">Bike</option>
                         </select>
                         <br /> 
                    </div>
                <div className="right">
                    <div className="tobuy">
                        <label htmlFor="">Things To Buy</label> <input type="text" value={buyInput} onChange={(e)=>setbuyInput(e.target.value)}  placeholder="What do you want to buy"/> <button onClick={handleToBuy}  className="buy-but">Add</button> 
                        <ul style={{listStyleType:"none",padding:0}}>
                        {tobuy.map((it,i)=>(
                        <li key={i}>
                        <input type="checkbox" checked={it.completed} onChange={()=>handle(i)} />
                        <button className="buy-li" style={{textDecoration:it.completed? "line-through":"none" }} onDoubleClick={()=>handledel(i)}>{it.text}</button>
                        </li>
                        ))}
                        </ul>
                        <br />
                    </div>
                    <div className="bud">
                        <label htmlFor="">Budget</label><input type="number" placeholder="What's the budget?"  />
                        <br /><br /> 
                    </div> 
                    <div className="ED">
                        <label htmlFor="">Expense Details</label> <textarea name="" id="" placeholder="Where did your money go? Add details here..."></textarea>
                    </div>
                </div>
                </div>
            </div>
    </div>
    
    <iframe
  title="Destination Map"
  src={`https://www.google.com/maps?q=${encodeURIComponent(destination)}&output=embed`}
  width="600px"
  height="300"
  style={{
    border: "0",
    borderRadius: "16px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    marginTop:"-200px",
    margin:"20px"
  }}
  allowFullScreen=""
  loading="lazy"
/>
</div>
<br />
    <button onClick={downloadPDF} className="down">Download as PDF</button>
</div>
    )
}
export default Test;