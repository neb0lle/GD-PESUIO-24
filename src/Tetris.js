import { glMatrix, mat4, vec3 } from "gl-matrix";
import { Cube } from "./Model";

const ROWS = 20;
const COLS = 10;
const CUBE_SIZE = 1;

const board = Array.from({ length: ROWS }, () =>
	Array.from({ length: COLS }, () => Array(1).fill(null))
);

let currentPiece;
let isGameOver = false;

class Tetris {
	constructor(gl, shaderProgram) {
		this.gl = gl;
		this.shaderProgram = shaderProgram;
		this.model = new Cube(gl);
		this.model.setup();

		this.createPiece();
	}

	createPiece() {
		const shapes = [
			[[1, 1, 1, 1]],
			[[1, 1], [1, 1]],
			[[0, 1, 0], [1, 1, 1]],
			[[1, 0, 0], [1, 1, 1]],
			[[0, 0, 1], [1, 1, 1]],
			[[1, 1, 0], [0, 1, 1]],
			[[0, 1, 1], [1, 1, 0]]
		];

		const shape = shapes[Math.floor(Math.random() * shapes.length)];
		const color = vec3.fromValues(Math.random(), Math.random(), Math.random());
		currentPiece = {
			shape,
			color,
			position: { x: Math.floor(COLS / 2) - 1, y: ROWS - 1, z: 0 }
		};
	}

	movePiece(direction) {
		if (!isGameOver) {
			const { position } = currentPiece;
			switch (direction) {
				case 'left': position.x++; break;
				case 'right': position.x--; break;
				case 'down': position.y--; break;
				case 'rotateCW': this.rotatePiece(1); break;
				case 'rotateCCW': this.rotatePiece(-1); break;
			}
			if (this.checkCollision()) {
				switch (direction) {
					case 'left': position.x--; break;
					case 'right': position.x++; break;
					case 'down': position.y++; this.placePiece(); break;
					case 'rotateCW':
					case 'rotateCCW':
						this.rotatePiece(direction === 'rotateCW' ? -1 : 1);
						break;
				}
			}
		}
	}

	rotatePiece(direction) {
		const shape = currentPiece.shape;
		const newShape = shape[0].map((val, index) => shape.map(row => row[index]).reverse());
		if (direction < 0) {
			currentPiece.shape = newShape;
		} else {
			currentPiece.shape = newShape.reverse();
		}
	}

	checkCollision() {
		for (let y = 0; y < currentPiece.shape.length; y++) {
			for (let x = 0; x < currentPiece.shape[y].length; x++) {
				if (currentPiece.shape[y][x]) {
					const boardX = currentPiece.position.x + x;
					const boardY = currentPiece.position.y - y;
					const boardZ = currentPiece.position.z;

					if (
						boardX < 0 || boardX >= COLS ||
						boardY < 0 || boardY >= ROWS ||
						(boardY >= 0 && boardX >= 0 && boardX < COLS && boardZ >= 0 && boardZ < 1 && board[boardY][boardX][boardZ])
					) {
						return true;
					}
				}
			}
		}
		return false;
	}

	placePiece() {
		currentPiece.shape.forEach((row, y) => {
			row.forEach((cell, x) => {
				if (cell) {
					const boardX = currentPiece.position.x + x;
					const boardY = currentPiece.position.y - y;
					const boardZ = currentPiece.position.z;

					if (boardY >= 0 && boardY < ROWS && boardX >= 0 && boardX < COLS && boardZ >= 0 && boardZ < 1) {
						board[boardY][boardX][boardZ] = currentPiece.color;
					}
				}
			});
		});

		this.clearLayers();
		this.createPiece();
		this.checkGameOver();
	}

	clearLayers() {
		for (let y = ROWS - 1; y >= 0; y--) {
			if (board[y].every(row => row.every(cell => cell))) {
				for (let shiftY = y; shiftY < ROWS - 1; shiftY++) {
					board[shiftY] = board[shiftY + 1];
				}
				board[ROWS - 1] = Array.from({ length: COLS }, () => Array(1).fill(null));
			}
		}
	}

	checkGameOver() {
		if (this.checkCollision()) {
			isGameOver = true;
			alert("Game Over! Refresh to restart.");
		}
	}

	drawBoundary() {
		const boundaryColor = vec3.fromValues(0.5, 0.5, 0.5);
		const uColor = this.gl.getUniformLocation(this.shaderProgram.program, "uColor");
		const uMM = this.gl.getUniformLocation(this.shaderProgram.program, "uMM");

		this.gl.uniform3fv(uColor, boundaryColor);

		const boundariesY = [-1, ROWS];
		for (const boundaryY of boundariesY) {
			for (let x = -1; x <= COLS; x++) {
				const modelMatrix = mat4.create();
				mat4.translate(modelMatrix, modelMatrix, [x * CUBE_SIZE, boundaryY, 0]);
				this.gl.uniformMatrix4fv(uMM, false, modelMatrix);
				this.model.render();
			}
		}

		for (let y = 0; y < ROWS; y++) {
			const modelMatrix = mat4.create();
			mat4.translate(modelMatrix, modelMatrix, [-1, y * CUBE_SIZE, 0]);
			this.gl.uniformMatrix4fv(uMM, false, modelMatrix);
			this.model.render();
			mat4.translate(modelMatrix, modelMatrix, [COLS + 1, 0, 0]); // Move to right boundary
			this.gl.uniformMatrix4fv(uMM, false, modelMatrix);
			this.model.render();
		}
	}

	render() {
		const { gl, shaderProgram, model } = this;
		this.drawBoundary();

		for (let y = 0; y < ROWS; y++) {
			for (let x = 0; x < COLS; x++) {
				const z =0;
				if (board[y][x][z]) {
					const modelMatrix = mat4.create();
					mat4.translate(modelMatrix, modelMatrix, [
						x * CUBE_SIZE, y * CUBE_SIZE, 0
					]);
					gl.uniformMatrix4fv(
						gl.getUniformLocation(shaderProgram.program, "uMM"),
						false, modelMatrix
					);
					gl.uniform3fv(
						gl.getUniformLocation(shaderProgram.program, "uColor"),
						board[y][x][z]
					);
					model.render();
				}
			}
		}

		currentPiece.shape.forEach((row, y) => {
			row.forEach((cell, x) => {
				if (cell) {
					const modelMatrix = mat4.create();
					mat4.translate(modelMatrix, modelMatrix, [
						(currentPiece.position.x + x) * CUBE_SIZE,
						(currentPiece.position.y - y) * CUBE_SIZE,
						0
					]);
					gl.uniformMatrix4fv(
						gl.getUniformLocation(shaderProgram.program, "uMM"),
						false, modelMatrix
					);
					gl.uniform3fv(
						gl.getUniformLocation(shaderProgram.program, "uColor"),
						currentPiece.color
					);
					model.render();
				}
			});
		});
	}
}

export default Tetris;
