import styles from "./BookCanvas.module.css";
import { useState, useRef, useEffect, useCallback} from "react";


const dummyNodeList = {
  '문학':{
    id:'문학',
    cx: 300, //center
    cy: 300,
    level: 0, //0,1,2
    img:null,
    par: null
  },
  '사회과학':
  {
    cx: 80, 
    cy: 80,
    level: 0,
    img:null, 
    par: null
  },
  '1984':{
    cx: 300, 
    cy: 20,
    level: 1, 
    img:null,
    par: '문학'
  }
};
const createNewNode = (node, canvasRef) => {

    const rad = node.level===0 ? 250 : node.level===1 ? 200 : 150;
    const color = node.level===0 ? "orange" : node.level===1 ? "blue" : "gray";
    return(
        <>
        {node.par && <path 
        key={node.id}
        d={`M${node.cx} ${node.cy} L${node.par.cx} ${node.par.cy}`}
        />}
        <circle cx={node.cx} cy={node.cy} r={rad} fill={color} />
        </>
        )
};
const createMap = () =>{

}

const BookCanvas = () => {

  const [nodeList,setNodeList] = useState(dummyNodeList); 
  const [svgMap,setsvgMap] = useState();
  const updatesvgMap = () =>{
    
  }
  const canvasRef = useRef();
  const [clientPos,setClientPos] = useState({x:0,y:0}); //실시간 커서위치인 e.client를 갱신하는값
  const [pos,setPos] = useState({left:0, top:0}); //canvas가 실제로 위치하는 좌표
 //clientX,Y: 보여지는 화면 기준 offset. offsetX,Y: 속한 Div 시작점 기준 offset

  const dragStartHandler = useCallback((e) =>{
    
    const blankCanvas = document.createElement('canvas');
    blankCanvas.classList.add("canvas");
    e.dataTransfer.setDragImage(blankCanvas, 0, 0);
    document.body.appendChild(blankCanvas);
    e.dataTransfer.effectAllowed = 'move'; // 투명 캔버스를 생성하여 글로벌 아이콘 제거

    const clientPosTemp = {x:e.clientX, y:e.clientY};
    // console.log("clientPosTemp", clientPosTemp);
    setClientPos(clientPosTemp);
},[]);
const dragHandler = useCallback((e) =>{
    
    const posTemp = {left: e.target.offsetLeft + (e.clientX - clientPos.x), //dx
        top:e.target.offsetTop + (e.clientY - clientPos.y)}; //dy
    setPos(posTemp);
    // console.log("e.target.offset: "+e.target.offsetLeft+ " "+ e.target.offsetTop);
    // console.log("e.client: "+e.clientX+" "+e.clientY);
    // console.log("clientPos: "+clientPos.x+" "+clientPos.y);
    // console.log("posTemp: "+posTemp.left+" "+posTemp.top);

    const clientPosTemp = {x:e.clientX, y:e.clientY};
    setClientPos(clientPosTemp);
},[clientPos]);
const dragOverHandler = useCallback((e) =>{
    e.preventDefault();
},[]);
const dragEndHandler = useCallback(() =>{

    const posTemp = { ...pos }; 
    if (pos.left>0) {
        posTemp.left = 0;
    }
    if(pos.top>0){
        posTemp.top = 0;
    }
    setPos(posTemp);

    // 캔버스 제거
    const canvases = document.getElementsByClassName("canvas");
    for (let i = 0; i < canvases.length; i++) {
    let canvas = canvases[i];
    canvas.parentNode?.removeChild(canvas);
    }
    // 캔버스로 인해 발생한 스크롤 방지 어트리뷰트 제거
    document.body.removeAttribute("style");
      
},[pos]);


  return (
    <div className={styles.canvas_wrapper}>
      <div className={styles.canvas} ref={canvasRef} width="2560" height="1600" 
        draggable onDragStart={(e) => dragStartHandler(e)} onDrag={(e) => dragHandler(e)}
        onDragOver={(e) => dragOverHandler(e)} onDragEnd={(e) => dragEndHandler(e)} style={{left:pos.left,top:pos.top}}></div>
    </div>
  );
};

export default BookCanvas;
