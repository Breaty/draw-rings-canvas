import React from "react";
import logo from "./logo.svg";
import "./App.css";

const Draw: React.FC = () => {
	const ringCanvas = React.useRef<HTMLCanvasElement | null>(null);

	function drawRings(canvasDom: HTMLCanvasElement) {
		let ctx: CanvasRenderingContext2D | null = canvasDom.getContext("2d");
		if (ctx === null) return;

		ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);

		drawCricleParam(ctx, "red", 0, 50);
		drawCricleParam(ctx, "black", 51, 10);
		drawCricleParam(ctx, "orange", 62, 15);
		drawCricleParam(ctx, "orange", 78, 15);
		drawCricleParam(ctx, "orange", 94, 8);
	}

	/* 
    start 开始的百分比
    length  所占总的百分比
    lineWidth 线条宽度
    */
	function drawCricleParam(ctx: CanvasRenderingContext2D, color: string, start: number, length: number, lineWidth: number = 10) {
		/* 
            从135°  慢慢减少 按照百分比减少
            按照 270/100 每一份2.7度算
            135是绘制起点 左边第一个点
        */
		let unit = 2.7;

		let start_angle = 135 + start * unit;
		let end_angle = start_angle + length * unit;

		end_angle = Math.abs(end_angle);

		console.log(`-----\n角度范围：${start_angle} --> ${end_angle}\n------`);

		ctx.beginPath();
		ctx.arc(100, 100, 80, (start_angle * Math.PI) / 180, (end_angle * Math.PI) / 180);

		// ctx.closePath();
		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = color;
		ctx.stroke();
	}

	React.useEffect(() => {
		if (ringCanvas.current) {
			drawRings(ringCanvas.current);
		}
	});

	return (
		<div>
			<div className="chart-item">
				<canvas width="200px" height="200px" ref={ringCanvas}></canvas>
			</div>
		</div>
	);
};

function App() {
	const ringCanvas = React.useRef<HTMLCanvasElement | null>(null);

	return (
		<div className="App">
			<header className="App-header">
				<p>
				使用canvas绘制一个仿仪表盘的环形百分比图形
				</p>
			</header>
      <Draw></Draw>
		</div>
	);
}

export default App;
