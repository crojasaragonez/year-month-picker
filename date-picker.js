class DatePicker extends HTMLElement {
  constructor(){
    super();
    // Shadow Root
    this._root = this.attachShadow({mode: 'open'});
    // Elements
    this.picker_input = null;
    this.picker_widget = null;
    this.accept_btn = null;
    this.cancel_btn = null;
    // Data
    this._months = {
      'Jan': '01',
      'Feb': '02',
      'Mar': '03',
      'Apr': '04',
      'May': '05',
      'Jun': '06',
      'Jul': '07',
      'Aug': '08',
      'Sep': '09',
      'Oct': '10',
      'Nov': '11',
      'Dec': '12'
    }
    this._show_picker = false;
    this._year = new Date().getFullYear();
    this._month = new Date().getMonth();
    this._value = `${this._year}-${this._month}`;
  }

  connectedCallback() {
    this._root.innerHTML = `
    <style>
      .picker-container {
        width: 200px;
      }
      .month-picker, .year-picker, .picker-footer {
        display: flex;
      }
      .month-picker{
        flex-wrap: wrap;
      }
      .picker-footer button{
        flex-grow: 1;
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
        <input type="text" id="picker_input">
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
        <div class="picker-footer">
          <button id="cancel_btn">Cancel</button>
          <button id="accept_btn">Accept</button>
        </div>
      </div>
    </div>`;
    this.picker_input = this._root.getElementById('picker_input');
    this.picker_widget = this._root.querySelector('.picker-body');
    this.accept_btn = this._root.getElementById('accept_btn');
    this.accept_btn.addEventListener('click', (event) => {
      this._show_picker = false;
      this.picker_input.value = this._value;
      this._render();
    });
    this.cancel_btn = this._root.getElementById('cancel_btn');
    this.cancel_btn.addEventListener('click', (event) => {
      this._show_picker = false;
      this._render();
    });
    this.picker_input.addEventListener('focus', (event) => {
      this._show_picker = true;
      this._render();
    });
    this._render();
  }

  _render(){
    if (this._show_picker) {
      this.picker_widget.style.display = 'block';
    } else {
      this.picker_widget.style.display = 'none';
    }
  }
}

window.customElements.define('date-picker', DatePicker);