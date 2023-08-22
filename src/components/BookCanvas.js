import styles from "./BookCanvas.module.css";
import { useState, useRef, useEffect } from "react";


const dummyNodeList = [
  {
    id:'문학',
    cx: 300, //center
    cy: 300,
    level: 0, //0,1,2
    img:null,
    par: null,
  },
  {
    id:'사회과학',
    cx: 80, 
    cy:80,
    level: 1,
    img:null, 
    par: '사회과학',
  },
  {
    id:'1984',
    cx: 300, 
    cy: 20,
    level: 1, 
    img:null,
    par: '문학',
  },
];
const addNode = (node, ctx, canvasRef) => {
    if(!ctx){
        console.log("ctx is null")
        return;
    }
    if(!canvasRef){
        console.log("canvas is null")
        return;
    }
    ctx.beginPath();
    ctx.arc(node.cx,node.cy,100,0,2*Math.PI);
    ctx.stroke();
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 0.1;
    ctx.fillStyle = 'skyblue';
    ctx.fill();
    if(node.level === 0){
        ctx.font = "30px NotoKR";
        ctx.fillText("aafnaf",node.cx,node.cy);
        console.log("dd");
    }
};

const BookCanvas = () => {
  const canvasRef = useRef();
//   const [canvasPos,setCanvasPos] = useRef({left:0,top:0});
  
  const [onPress,setOnPress] = useState(false);
  const onMouseDown = () => {
    setOnPress(true);
  }
  const onMouseUp = () => {
    setOnPress(false);
  }
  const onMouseMove = (e) =>{
    e.preventDefault();
    if(onPress===true){
    const pos = e.target.getBoundingClientRect();

    let mouseX = e.clientX;
    let mouseY = e.clientY;
    // canvasRef.current.styles.top = mouseY-canvasPos.top;
    // canvasRef.current.styles.left = mouseX-canvasPos.left;
    // setCanvasPos((prev)=> {return {left: mouseX-prev.left,top: mouseY-prev.top}});
    }
  }
  const [ctx, setCtx] = useState(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas.getContext) return <p>Something went wrong!</p>;
    const ctx = canvas.getContext("2d");
    setCtx(ctx);
}, []);

useEffect(()=>{
    // addNode(dummyNodeList[0],ctx,canvasRef);
},[ctx,dummyNodeList]);


  return (
    <div className={styles.canvas_wrapper}>
      <canvas className={styles.canvas} ref={canvasRef} width="2560" height="1600" onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseMove={onMouseMove} onMouseLeave={onMouseUp}></canvas>
    </div>
  );
};

export default BookCanvas;
