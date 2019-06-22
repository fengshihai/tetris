
// 形状的基础类（父类）
export default class Shape {

  constructor() {
    // 位置
    this.pos = [0, 5] 
    // 形状的索引
    this.blockIndex = 0
  }

  // 计算位置
  calBlockPos() {
    // 计算偏移的算法
    let method = this.blockOffset[this.blockIndex]
    // 返回计算得到的位置坐标集合
    return [
      [this.pos[0] + method[0][0], this.pos[1] + method[0][1]], 
      [this.pos[0] + method[1][0], this.pos[1] + method[1][1]], 
      [this.pos[0] + method[2][0], this.pos[1] + method[2][1]], 
      [this.pos[0] + method[3][0], this.pos[1] + method[3][1]], 
    ]
  }

  // 左移
  moveLeft() {
    this._posOld = [...this.pos]
    this.pos[1] -= 1
  }
  moveRight() {
    this._posOld = [...this.pos]
    this.pos[1] += 1
  }
  moveDown() {
    this._posOld = [...this.pos]
    this.pos[0] += 1
  }

  rollback() {
    this.pos = this._posOld
  }

  // 转换
  change() {
    ++ this.blockIndex
    // 判断索引值越界
    if (this.blockIndex >= this.blockOffset.length) {
      this.blockIndex = 0
    }
  }
}
