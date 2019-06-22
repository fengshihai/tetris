import $ from 'jquery'
import env from '../env.js'

import '../assets/reset.css'
import '../assets/app.css'

import Ground from './Ground.js'
import Scoreboard from './Scoreboard.js'
import Preview from './Preview.js'
import Controller from './Controller.js'

// App 组件
export default class App {
  constructor() {
  }

  run() {
    console.log('App Run')

    // 初始化环境信息
    this._initEnv()
    // 渲染 app DOM
    this._render()
    // 初始化 Ground 战场
    this._initGround()
    // 初始化计分板
    this._initScoreboard()
    // 初始化预览框
    this._initPreview()
    // 初始化控制器
    this._initController()
  }

  // 初始化环境信息
  _initEnv() {
    // 屏幕尺寸
    env.screenWidth = $(window).width()
    env.screenHeight = $(window).height()

    // 战场尺寸
    env.groundHeight = env.screenHeight 
    env.groundWidth = env.groundHeight / 2

    // 战场位置
    env.groundTop = 0 
    env.groundLeft = (env.screenWidth - env.groundWidth) / 2

    // 格子尺寸
    env.blockWidth = env.groundWidth / 10
    env.blockHeight = env.groundHeight / 20
  }

  // 渲染 app DOM
  _render() {
    let template = `
    <div id="app" class="app" style="width: ${env.screenWidth}px;height: ${env.screenHeight}px"></div>
    `
    $('body').prepend(template)
  }

  // 初始化 Ground 战场
  _initGround() {
    new Ground()
  }

  _initScoreboard() {
    new Scoreboard()
  }
  _initPreview() {
    new Preview()
  }
  _initController() {
    new Controller()
  }

}
// 后边不应该具有任何代码