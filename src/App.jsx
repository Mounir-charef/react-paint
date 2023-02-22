import {useRef, useEffect, useState} from "react";

function App() {
    const canvasRef = useRef(null);
    const contextRef = useRef(null),
        [isDrawing, setIsDrawing] = useState(false);
    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth * 2;
        canvas.height = window.innerHeight * 2;
        canvas.style.width = `100%`;
        canvas.style.height = `100%`;

        const ctx = canvas.getContext("2d");
        ctx.scale(2, 2);
        ctx.lineCap = "round";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 5;
        contextRef.current = ctx;
        window.addEventListener("resize", () => {
            canvas.width = window.innerWidth * 2;
            canvas.height = window.innerHeight * 2;
            canvas.style.width = `100%`;
            canvas.style.height = `100%`;
            ctx.scale(2, 2);
        });
    }, []);

    const startDrawing = ({nativeEvent}) => {
        const {offsetX, offsetY} = nativeEvent;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    }

    const endDrawing = () => {
        contextRef.current.closePath();
        setIsDrawing(false);
    }

    const draw = ({nativeEvent}) => {
        const {offsetX, offsetY} = nativeEvent;
        if (!isDrawing) {
            return;
        }
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
    }

  return (
    <canvas
        style={{backgroundColor: "white"}}
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseMove={draw}
        ref={canvasRef}
    />
  )
}

export default App
