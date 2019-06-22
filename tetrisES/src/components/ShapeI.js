
import Shape from './Shape.js'

// 具体的形状类（子类，派生类，扩展类），继承自形状基类
export default class ShapeL extends Shape {

  constructor() {
    // 调用父类的构造方法
    super()

    // 子方块偏移位置
    this.blockOffset = [
      [[-1, 0], [0, 0], [1, 0], [2, 0]],
      [[0, -1], [0, 0], [0, 1], [0, 2]],
    ]
    // 颜色
    this.color = '#ff0000'
  }
}