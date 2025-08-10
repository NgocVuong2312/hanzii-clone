import React  from "react";
import { useState } from "react";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primeicons/primeicons.css';
export const ItemCard=({icon,cont,state})=>{
    const imgSize = state === "1" ? "48px" : "24px";
    
    return(
        <div className="flex flex-row align-items-center h-auto w-full gap-2 border border-round-xl p-2 mb-1 h-3rem" style={{
            backgroundColor:"lightgray",
            
        }}>
            <img style={{ height: imgSize,
                width:imgSize
            }} src={icon}></img>
            <p>{cont}</p>
        </div>
    )
}
export const CmtCard=({cont,userName})=>{   
    const [like, setLike] = useState(0);
    const [dislike, setDislike] = useState(0);
    return(
        <div className="flex flex-column border-bottom-1">
            <p>
                {cont}
            </p>
            <div className="flex flex-row align-items-center justify-content-between gap-4">
                <div className="flex flex-row align-items-center gap-3">
                <i className="pi pi-thumbs-up
                " style={{fontSize:"1rem"}}
                onClick={()=>{setLike(like+1)
                    if(like==1){
                        setLike(0);
                    }
                if(dislike==1){
                    setDislike(0);
                }
                }}/>
                <p className="m-0">{like}</p>
                <i className="pi pi-thumbs-down
                " style={{fontSize:"1rem"}} onClick={()=>{setDislike(dislike+1); 
                if(like==1){
                    setLike(0);
                }
                if(dislike==1){
                    setDislike(0);}
                }}/>
                <p className="m-0">{dislike}</p>
                </div>
                <p className="m-0">{userName}</p>

            </div>
        </div>
    )
}