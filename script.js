var chessBoard, arrCoord2; 
let board = []; 

class Board {
  constructor(config){
    this.options = {
      selector: document.querySelector("#board"),
      width: 400, 
      rows: document.getElementById('width').value,
      columns: document.getElementById('height').value,
      light: '#d1eefc',
      dark: '#1f1f21'
    };
    if(config) Object.assign(this.options, this.options, config); // если пришёл конфиг, 
    // то значит назначь объекту this.options - дефолтные значения this.options и добавь туда значение конфиг  
    this.draw();
    this.redraw();
  }

  draw() {
    let el = this.options.selector;
    let ctx = el.getContext("2d");
    let squareWidth = (this.options.rows > this.options.columns)? this.options.width / this.options.rows : this.options.width / this.options.columns ;
    let totalSquares = this.options.rows * this.options.columns;
    let i, x, y = -1;
    
  el.width = this.options.width;
  el.height = this.options.width;
       
  for (i = 0; i < totalSquares; i++){
         x++;
         if (i % this.options.rows == 0 ) {
           y++; 
           x = 0;
         }      
  ctx.beginPath();
  ctx.rect(x * squareWidth, y * squareWidth, squareWidth, squareWidth);
  ctx.fillStyle = this.options.light; 
  ctx.fill();
  ctx.stroke();
}}

redraw(){
  let xcoord, ycoord; 
  let j,u = 0; 
  let arrCoord = [];
  arrCoord2 = []; 
  let squarelength = (this.options.rows > this.options.columns)? this.options.width / this.options.rows : this.options.width / this.options.columns ;
  let q = (this.options.rows > this.options.columns)? this.options.rows : this.options.columns; 
  let z = (this.options.rows > this.options.columns)? this.options.columns : this.options.rows ; 
for (j = 0; j < this.options.columns; j++){
    for (u = 0; u < this.options.rows; u++){
        arrCoord.push([u,j]);
    }
   } 
arrCoord.forEach(x => arrCoord2.push(new Array 
  (Math.floor(x[0] * squarelength), 
   Math.floor((x[0] + 1) * squarelength), 
   Math.floor(x[1] * squarelength), 
   Math.floor((x[1] + 1) * squarelength),
   {done: false}
   )));
  let canvasElem = document.querySelector("#life-board"); 
canvasElem.addEventListener("mousedown", (e) => { 
  let rect = canvasElem.getBoundingClientRect(); 
  xcoord = e.clientX - rect.left; 
  ycoord  = e.clientY - rect.top; 
  let arrNum = arrCoord2.map(function(x,i) {if (Math.floor(xcoord) > x[0] 
    && Math.floor(xcoord) < x[1] 
    && Math.floor(ycoord) > x[2] 
    && Math.floor(ycoord) < x[3]){return i}}).filter(x => x != undefined)[0];

  //копируем draw, fuck DRY; 

    let el = this.options.selector;
    let ctx = el.getContext("2d");
    let squareWidth = (this.options.rows > this.options.columns)? this.options.width / this.options.rows : this.options.width / this.options.columns ;
    let totalSquares = this.options.rows * this.options.columns;
    let i, x, y = -1;
    
  el.width = this.options.width;
  el.height = this.options.width;
       
  for (i = 0; i < totalSquares; i++){
         x++;
         if (i % this.options.rows == 0 ) {
           y++; 
           x = 0;
         }      
  ctx.beginPath();
  ctx.rect(x * squareWidth, y * squareWidth, squareWidth, squareWidth);

  if (i == arrNum && arrCoord2[i][4].done == true) {ctx.fillStyle = this.options.light; arrCoord2[i][4].done = false} else {
    if (i == arrNum && arrCoord2[i][4].done == false) {ctx.fillStyle = this.options.dark; arrCoord2[i][4].done = true} else {
      if (arrCoord2[i][4].done == true) {ctx.fillStyle = this.options.dark;} else {
        ctx.fillStyle = this.options.light;
      } 
    } 
  } 
  ctx.fill();
  ctx.stroke();
}})}

animate(){

//копируем draw, fuck DRY; 
let el = this.options.selector;
let ctx = el.getContext("2d");
let squareWidth = (this.options.rows > this.options.columns)? this.options.width / this.options.rows : this.options.width / this.options.columns ;
let totalSquares = this.options.rows * this.options.columns;
let i, x, y = -1;

let j,k,u; 
let cl = clone(arrCoord2); 

if (board.length > 0) {board = iterate(board)} else{
  for (j = 0; j < this.options.columns; j++){
    for (u = 0; u < this.options.rows; u++){
        board.push([u,j]);}}; 

    for (k = 0; k < totalSquares; k++){board[k].push(cl[k][4])}
    board = iterate(board); 
  }




el.width = this.options.width;
el.height = this.options.width;

for (i = 0; i < totalSquares; i++){
     x++;
     if (i % this.options.rows == 0 ) {
       y++; 
       x = 0;
     }      
ctx.beginPath();
ctx.rect(x * squareWidth, y * squareWidth, squareWidth, squareWidth);
if (deepEqual(board[i][2].done,true)) {ctx.fillStyle = this.options.dark} else {ctx.fillStyle = this.options.light};
ctx.fill();
ctx.stroke();
}}}    

function populate(){
  chessBoard.animate();
} 

function endless(){
  let timerId = setInterval(()=> populate(),1000)
  timerId;
  let el = document.getElementById('stopKran'); 
  el.innerHTML = "<input type = 'button' value = 'Stop!'>";
  el.addEventListener("mousedown", (e) => {clearInterval(timerId)})}

function emptyBoard(){
    chessBoard = new Board({
    selector: document.querySelector("#life-board")})}

function clone (target, map = new WeakMap ()){
  if (typeof target === 'object') {
    let cloneTarget = Array.isArray(target) ? [] : {}; 
    if (map.get(target)){
      return map.get(target); 
    }
    map.set(target, cloneTarget); 
    for (const key in target){
      cloneTarget[key] = clone(target[key], map); 
    }
    return cloneTarget;
  } else {return target;}
}

function decoordinate(arr,squarelength){
  let h1 = clone(arr);
  let h2 = [];
  h1.forEach(x => h2.push([Math.floor(x[0] / squarelength), Math.floor(x[2] / squarelength), x[4]]));  
  return h2;
  }

  var deepEqual = function (x, y) {
    if (x === y) {return true;}
    else if ((typeof x == "object" && x != null) && (typeof y == "object" && y != null)) {
      if (Object.keys(x).length != Object.keys(y).length)
        return false;
        for (var prop in x) {
        if (y.hasOwnProperty(prop))
        { if (! deepEqual(x[prop], y[prop]))return false;}
        else return false;}
        return true;}
    else return false;}

function countLivingNeigbours (arr,cellChecked){
  let [x,y,z] = cellChecked;
  let r;
  r = arr.filter(j => 
    j[0] == x - 1 && j[1] == y - 1 && deepEqual (j[2].done, true) || 
    j[0] == x - 1 && j[1] == y && deepEqual(j[2].done, true) || 
    j[0] == x - 1 && j[1] == y + 1 && deepEqual(j[2].done, true) || 
    j[0] == x && j[1] == y + 1 && deepEqual(j[2].done, true) || 
    j[0] == x && j[1] == y - 1 && deepEqual(j[2].done, true) || 
    j[0] == x + 1  && j[1] == y - 1 && deepEqual(j[2].done, true)||
    j[0] == x + 1 && j[1] == y  && deepEqual(j[2].done, true) ||
    j[0] == x + 1 && j[1] == y + 1 && deepEqual(j[2].done, true)).length; 
    return r;    
}

function iterate(board){
  let x = clone(board); 
  for (i = 0; i < x.length; i++){
    if (countLivingNeigbours(board,board[i]) == 3 && deepEqual(board[i][2].done,false)){
      x[i][2].done = true;
    }  else {if (countLivingNeigbours(board,board[i]) >= 2 && countLivingNeigbours(board,board[i]) <= 3 && deepEqual(board[i][2].done,true))
    {x[i][2].done = true} else {x[i][2].done = false}}}
  return x;}  


