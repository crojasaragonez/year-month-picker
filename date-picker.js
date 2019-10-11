class DatePicker extends HTMLElement {
  constructor(){
    super();
    // Shadow Root
    this._root = this.attachShadow({mode: 'open'});
    // Elements
    this.picker_input = null;
  }

  connectedCallback(){
    this._root.innerHTML = `
    <style>
      .picker-container {
        width: 200px;
      }
      .year-picker{
        display: flex;
      }
      .month-picker{
        display: flex;
        flex-wrap: wrap;
      }
      .month{
        width: 25%;
      }
      #current-year {
        flex-grow: 1;
      }
    </style>
    <div class="picker-container">
      <div class="input-container">
        <input type="text">
      </div>
      <div class="picker-body">
        <div class="year-picker">
          <button id="previous-year"><</button>
          <button id="current-year">2019</button>
          <button id="next-year">></button>
        </div>
        <div class="month-picker">
          <button class="month">Jan</button>
          <button class="month">Feb</button>
          <button class="month">Mar</button>
          <button class="month">Apr</button>
          <button class="month">May</button>
          <button class="month">Jun</button>
          <button class="month">Jul</button>
          <button class="month">Aug</button>
          <button class="month">Sep</button>
          <button class="month">Oct</button>
          <button class="month">Nov</button>
          <button class="month">Dec</button>
        </div>
      </div>
    </div>`;
  }
}

window.customElements.define('date-picker', DatePicker);