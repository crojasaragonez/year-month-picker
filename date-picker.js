class DatePicker extends HTMLElement {
  constructor(){
    super();
    // Shadow Root
    this._root = this.attachShadow({mode: 'open'});
    // Elements
    this.picker_input = null;
    this.picker_widget = null;
    this.accept_btn = null;
    this.month_btn = null;
    this.next_year_btn = null;
    this.today_btn = null;
    this.previous_year_btn = null;
    // Data
    this._show_picker = false;
    this._year = null;
    this._month = null;
    this.today();
  }

  today() {
    this._year = new Date().getFullYear();
    this._month = ("0" + new Date().getMonth()).slice(-2);
  }

  get value() {
    return `${this._year}-${this._month}`;
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
      #today_btn {
        flex-grow: 1;
      }
      input {
        box-sizing: border-box;
      }
    </style>
    <div class="picker-container">
        <input type="text" id="picker_input">
      <div class="picker-body">
        <div class="year-picker">
          <button id="previous-year"><</button>
          <button id="today_btn">Today</button>
          <button id="next-year">></button>
        </div>
        <div class="month-picker">
          <button class="month" value="01">Jan</button>
          <button class="month" value="02">Feb</button>
          <button class="month" value="03">Mar</button>
          <button class="month" value="04">Apr</button>
          <button class="month" value="05">May</button>
          <button class="month" value="06">Jun</button>
          <button class="month" value="07">Jul</button>
          <button class="month" value="08">Aug</button>
          <button class="month" value="09">Sep</button>
          <button class="month" value="10">Oct</button>
          <button class="month" value="11">Nov</button>
          <button class="month" value="12">Dec</button>
        </div>
        <div class="picker-footer">
          <button id="accept_btn">Accept</button>
        </div>
      </div>
    </div>`;
    this._initElements();
    this._setupEvents();
    this._render();
  }

  _initElements(){
    this.picker_input      = this._root.getElementById('picker_input');
    this.picker_widget     = this._root.querySelector('.picker-body');
    this.accept_btn        = this._root.getElementById('accept_btn');
    this.month_btn         = this._root.querySelectorAll('.month');
    this.today_btn         = this._root.getElementById('today_btn');
    this.next_year_btn     = this._root.getElementById('next-year');
    this.previous_year_btn = this._root.getElementById('previous-year');
  }

  _changeYearBy(number) {
    this._year += number;
    this._render();
  }

  _togglePicker(value) {
    this._show_picker = value;
    this._render();
  }

  _setupEvents(){
    this.today_btn.addEventListener('click', (event) => {
      this.today();
      this._render();
    });

    this.next_year_btn.addEventListener('click', (event) => this._changeYearBy(1));
    this.previous_year_btn.addEventListener('click', (event) => this._changeYearBy(-1));

    this.month_btn.forEach((btn) => {
      btn.addEventListener('click', (event) => {
        this._month = event.target.value;
        this._render();
      });
    });
    this.accept_btn.addEventListener('click', (event) => this._togglePicker(false));
    this.picker_input.addEventListener('focus', (event) => this._togglePicker(true));
  }

  _render(){
    if (this._show_picker) {
      this.picker_widget.style.display = 'block';
      this.picker_input.value = this.value;
    } else {
      this.picker_widget.style.display = 'none';
    }
  }
}

window.customElements.define('date-picker', DatePicker);