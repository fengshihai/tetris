import $ from 'jquery'

export default class Scoreboard {

  constructor() {
    this._render()
  }

  _render() {
    let template = `
    <div id="scoreboard" class="scoreboard">计分板</div>
    `
    $('#app').append(template)
  }
}