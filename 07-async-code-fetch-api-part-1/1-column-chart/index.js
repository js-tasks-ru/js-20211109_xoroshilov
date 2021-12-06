import fetchJson from './utils/fetch-json.js';

const BACKEND_URL = 'https://course-js.javascript.ru';

export default class ColumnChart {
  element;
  subElements = {};
  chartHeight = 50;

  constructor({
    label = '',
    range = {
      from: new Date(),
      to: new Date(),
    },
    link = '',
    url = '',
    formatHeading = value => value
  } = {}) {
    this.label = label;
    this.range = range;
    this.link = link;
    this.url = new URL(url, BACKEND_URL);
    this.formatHeading = formatHeading;

    this.render();
    this.update(this.range.from, this.range.to);
  }

  render() {
    this.element = this._createHtmlElement(this.template);
    this.subElements = this._getSubElements(this.element);
  }

  get template() {
    return `
      <div class="column-chart column-chart_loading" style="--chart-height: ${this.chartHeight}">
        <div class="column-chart__title">
          Total ${this.label}
          ${this._getLink()}
        </div>
        <div class="column-chart__container">
          <div data-element="header" class="column-chart__header"></div>
          <div data-element="body" class="column-chart__chart"></div>
        </div>
      </div>
    `;
  }

  async update(from, to) {
    this.element.classList.add('column-chart_loading');

    const data = await this.loadData(from, to);

    this._setNewRange(from, to);

    if (data && Object.values(data).length) {
      this.subElements.header.textContent = this._getHeaderValue(data);
      this.subElements.body.innerHTML = this._getColumns(data);

      this.element.classList.remove('column-chart_loading');
    }

    this.data = data;
    return this.data;
  }

  async loadData(from, to) {
    this.url.searchParams.set('from', from.toISOString());
    this.url.searchParams.set('to', to.toISOString());

    return await fetchJson(this.url);
  }

  // Private method
  _setNewRange(from, to) {
    this.range.from = from;
    this.range.to = to;
  }

  // Private method
  _getLink() {
    return this.link ? `<a class="column-chart__link" href="${this.link}">View all</a>` : '';
  }

  // Private method
  _getSubElements(element) {
    const elements = element.querySelectorAll('[data-element]');

    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;

      return accum;
    }, {});
  }

  // Private method
  _getHeaderValue(data) {
    return this.formatHeading(Object.values(data).reduce((accum, item) => (accum + item), 0));
  }

  // Private method
  _getColumns(data) {
    const maxValue = Math.max(...Object.values(data));

    return Object.entries(data).map(([key, value]) => {
      const scale = this.chartHeight / maxValue;
      const percent = (value / maxValue * 100).toFixed(0);
      const tooltip = `
      <span>
        <small>${key.toLocaleString('default', {dateStyle: 'medium'})}</small>
        <br>
        <strong>${percent}%</strong>
      </span>`;

      return `<div style="--value: ${Math.floor(value * scale)}" data-tooltip="${tooltip}"></div>`;
    }).join('');
  }

  // Private method: Simple Helper for proper creation of div blocks
  _createHtmlElement(html) {
    const div = document.createElement('div');
    div.innerHTML = html;

    return div.firstElementChild;
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
