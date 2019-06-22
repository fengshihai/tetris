import $ from 'jquery'
import env from '../env.js'

import Shape from './Shape.js'
import ShapeL from './ShapeL.js'
import ShapeT from './ShapeT.js'
import ShapeJ from './ShapeJ.js'
import ShapeO from './ShapeO.js'
import ShapeI from './ShapeI.js'
import ShapeZ from './ShapeZ.js'
import ShapeS from './ShapeS.js'

// 战场组件
export default class Ground {
  constructor() {
    // 初始化边界
    this._initBoundary()
    // 初始化累积数据
    this._initStore()

    this._speed = 200

    // 渲染画布
    this._render()
    // 初始化画图上下文
    this._initCxt()
    // 生成背景
    this._drawBG()
    // 生成格子
    this._drawBlock()
    // 初始化操作事件
    this._initEvent()
  }
  // 渲染画布
  _render() {
    let template = `
    <canvas id="ground" class="ground" width="${env.groundWidth}" height="${env.groundHeight}"></canvas>
    `
    $('div#app').append(template)
    $('#ground').css({
      top: `${env.groundTop}px`,
      left: `${env.groundLeft}px`,
    })
  }

  _initCxt() {
    this.canvas = document.getElementById("ground")
    this.cxt = this.canvas.getContext("2d"); // 作画上下文
  }
  
  // 背景
  _drawBG() {
    // 创建一个渐变工具
    // 参数：从哪里填充到哪里的意思
    let grd = this.cxt.createLinearGradient(1, 0, 1, env.groundHeight);
    // 设置渐变颜色
    grd.addColorStop(0, "#AFC9F5");
    grd.addColorStop(1, "#032B71");
    // 将填充风格设置为渐变
    this.cxt.fillStyle = grd;
    // 渐变填充矩形
    this.cxt.fillRect(0, 0, 414, env.groundHeight);
  }

  // 画格子
  _drawBlock() {
    for (let r = 0; r < 20; ++ r) { // row 行循环
      for (let c = 0; c < 10; ++ c) { // 列 col
        // 框颜色和宽度
        this.cxt.strokeStyle = "#ffffff";
        this.cxt.lineWidth = 1;
        // 计算框的位置
        // 使用 X和Y表示，横轴纵轴
        let posX = c * env.blockHeight
        let posY = r * env.blockWidth
        // 无填充矩形
        this.cxt.strokeRect(posX, posY, env.blockWidth, env.blockHeight);

        // 判断当前的格子是否需要填充形状的颜色
        let color = this._store[r][c]
        if (color) {
          this.cxt.fillStyle = color
          this.cxt.fillRect(posX+1, posY+1, env.blockWidth-2, env.blockHeight-2);
        }

        // 判断当前活动形状
        if (this.activeShape) {
          let blockPos = this.activeShape.calBlockPos()
          let posArr = blockPos.map(ele=>ele[0]+'-'+ele[1])
          if (posArr.includes(r + '-' + c)) {
            this.cxt.fillStyle = this.activeShape.color
            this.cxt.fillRect(posX+1, posY+1, env.blockWidth-2, env.blockHeight-2);
          }
        }
  
      }
    }
  }

  // 初始化边界
  _initBoundary() {
    // 都是20
    this.boundary = new Array(10)
    this.boundary.fill(20, 0)
  }

  // 初始化累积
  _initStore() {

    this._store = new Array(20)
    for (let i = 0 ; i<20 ; ++i) {
      this._store[i] = (new Array(10)).fill(null, 0)
    }
  }

  // 重绘
  reDraw() {
    this._drawBG()
    this._drawBlock()
  }

  // 绑定事件
  _initEvent() {
    // 键盘事件
    $(window).keydown(event => {
      // console.log(event.keyCode)
      // this // App 对象
      // 键盘 a， <-
      if (65 == event.keyCode || 37 == event.keyCode) {
        this.moveLeft()
        event.preventDefault()
      }
      // 键盘 d，->
      else if (68 == event.keyCode || 39 == event.keyCode) {
        this.moveRight()
        event.preventDefault()
      }
      // 键盘空格或者上
      else if (87 == event.keyCode || 32 == event.keyCode) {
        this.change()
        event.preventDefault()
      }
      // 键盘Shift
      else if (16 == event.keyCode) {
        this.start()
        event.preventDefault()
      }
      // 键盘Shift
      else if (27 == event.keyCode) {
        this.pause()
        event.preventDefault()
      }
    })
  }

  // 判断是否越界
  isOverBoundary() {
    let over = false // 假设未越界
    // 获取当前形状的四个块的位置
    let blockPos = this.activeShape.calBlockPos()
    for (let i = 0; i<blockPos.length; ++i) {
      // 得到4个方块的新坐标
      let x = blockPos[i][0]
      let y = blockPos[i][1]
      // 下界的判断
      if (x >= this.boundary[y]) {
        over = true
        break
      }

      // 左右墙的判断
      if (y < 0 || y >= 10 ) {
        over = true
        break
      } 
      // console.log("y", over)
    }
    return over
  }

  // 新形状
  newShape() {
          // this.activeShape = new ShapeL() // 随机策略
      // this.activeShape = new ShapeT() // 随机策略
      // this.activeShape = new ShapeI() // 随机策略
      // this.activeShape = new ShapeJ() // 随机策略
      // this.activeShape = new ShapeO() // 随机策略
      // this.activeShape = new ShapeS() // 随机策略
      // this.activeShape = new ShapeZ() // 随机策略
      
      let shapes = [
        ShapeL, ShapeT, ShapeI, ShapeJ, ShapeO, ShapeS, ShapeZ
      ]
      // 
      let randomIndex = Math.floor(Math.random()*7) // 0 - 6
      this.activeShape = new shapes[randomIndex]() // 随机策略  
      this.activeShape.pos = [-1, 4]    
  }

  // 更新store
  _updateStore() {
    // 遍历全部的形状的块
    let blockPos = this.activeShape.calBlockPos()
    for (let i = 0; i<blockPos.length; ++i) {
      let r = blockPos[i][0], c = blockPos[i][1]
      if (r>=0 && c >=0 ) {
        this._store[r][c] = this.activeShape.color 
      }
    }
  }
  // 消除方块
  _erasureBlock() {
    // 遍历全部的块
    for (let r = 19; r>=0 ; --r) {
      // 从底行开始处理
      let isFull = true
      for (let c = 0; c<10; ++c) {
        isFull = isFull && this._store[r][c]
        // isFull  &&= this._store[r][c]
      }
      // 某行满了
      if (isFull) {
        // 消除，就是一个移动的操作，将上面的行向下移动
        this._moveRest(r)
        ++ r // 重新检测改行，改行是上面 的移动下来的
      }
    }
  }
  // 移动上面剩余的块
  _moveRest(row) {
    for (let r = row-1; r >=0 ; --r) {
      // r 需要移动的行的索引号
      // r+1 移动目标的索引号
      this._store[r+1] = this._store[r]
    }
    // 将第一行，索引为0的设置为初始化状态
    this._store[0] = (new Array(10)).fill(null, 0)
  }
    // 更新下边界
  _updateBoundary() {
    this.boundary.fill(20, 0)
    for (let r=19; r>=0; --r) {
      for (let c=0; c<10; ++c) {
        if (this._store[r][c]) {
          this.boundary[c] = r
        }
      }
    }
    // console.log(this._store)
    // console.log(this.boundary)
  }
  start() {
    // 在定时器不存在时，设置定时器
    if (! this._timer) {
      this._timer = setInterval(()=>{
        // console.log('游戏运行')
        // 活动形状需要初始化
        if (!this.activeShape) {
          this.newShape()
        }
        // 开始向下移动
        this.activeShape.moveDown()

        // 判断是否越界，若越界，将形状定在原来的位置上
        if (this.isOverBoundary()) {
          this.activeShape.rollback()

          // 更新累积数据
          this._updateStore() // store的更新，会带来行的消除

          // 消除方块
          this._erasureBlock()
          // 更新下边界
          this._updateBoundary()

          // 处理游戏结束
          if (this._isOver()) {
            console.log('游戏结束')
            this.pause()
            return
          }

          // 取消活动块
          this.activeShape = null
          // 新建活动块
          this.newShape()

          return;
        }
        this.reDraw()
      }, this._speed)
    }
  }
  _isOver() {
    for (let c = 0; c<10; ++c) {
      if (this.boundary[c] <= 0) {
        return true
      }
    }
    return false
  }
  pause() {
    if( this._timer) {
      clearInterval(this._timer)
      this._timer = null
    }
  }

  moveLeft() {
    if (this._timer) {
      // 移动
      this.activeShape.moveLeft()
      // 判断是否越界
      if (this.isOverBoundary()) {
        this.activeShape.rollback()
        return;
      }
      // 重绘
      this.reDraw()
    }
  }
  moveRight() {
    if (this._timer) {
      this.activeShape.moveRight()
      // 判断是否越界
      if (this.isOverBoundary()) {
        this.activeShape.rollback()
        return;
      }
      // 重绘
      this.reDraw()
    }
  }
  change() {
    if (this._timer) {
      this.activeShape.change()
      // 判断是否越界
      if (this.isOverBoundary()) {
        this.activeShape.rollback()
        return;
      }
      this.reDraw()
    }
  }

}