class YearMonthPicker extends HTMLElement {
  constructor() {
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
  }

  today() {
    this._year = new Date().getFullYear();
    this._month = ('0' + (new Date().getMonth() + 1)).slice(-2);
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
      #previous-year, #next-year {
        width: 25%;
      }
      #today_btn {
        width: 50%;
      }
      input {
        box-sizing: border-box;
        width: 100%;
      }
    </style>
    <div class="picker-container">
      <input type="text" id="picker_input" pattern="\\d{4}-\\d{2}" placeholder="YYYY-MM">
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
    this.getAttribute('value') ? this._tryParseCurrentValue(this.getAttribute('value')) :
                               this.today();
  }

  _initElements() {
    this.picker_input = this._root.getElementById('picker_input');
    this.picker_widget = this._root.querySelector('.picker-body');
    this.accept_btn = this._root.getElementById('accept_btn');
    this.month_btn = this._root.querySelectorAll('.month');
    this.today_btn = this._root.getElementById('today_btn');
    this.next_year_btn = this._root.getElementById('next-year');
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

  _setupEvents() {
    this.today_btn.addEventListener('click', (event) => {
      this.today();
      this._render();
    });

    this.next_year_btn.addEventListener('click', (event) => this._changeYearBy(1));
    this.previous_year_btn.addEventListener('click', (event) => this._changeYearBy(-1));
    this.accept_btn.addEventListener('click', (event) => this._togglePicker(false));
    this.picker_input.addEventListener('focus', (event) => this._togglePicker(true));
    this.picker_input.addEventListener('change', (event) => this._tryParseCurrentValue(event.target.value));

    this.month_btn.forEach((btn) => {
      btn.addEventListener('click', (event) => {
        this._month = event.target.value;
        this._render();
      });
    });

    this.picker_input.addEventListener('keyup', (event) => {
      // when Enter key was pressed
      if (event.keyCode == 13) {
        this._togglePicker(false);
      }
    });
  }

  _tryParseCurrentValue(value) {
    const regexp = /(\d{4})-(\d{2})/g;
    const result = regexp.exec(value);
    if (!result) return;
    if (result[1]) {
      this._year = parseInt(result[1]);
    }
    if (result[2]) {
      this._month = result[2];
    }
  }

  _render() {
    if (this._show_picker) {
      this.picker_widget.style.display = 'block';
      this.picker_input.value = this.value;
      return;
    }
    this.picker_widget.style.display = 'none';
  }
}

window.customElements.define('year-month-picker', YearMonthPicker);
