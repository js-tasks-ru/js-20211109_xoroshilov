export default class ColumnChart {
  constructor(
    {
      data = [],
      label = 'of something',
      value = 0,
      link = '',
      formatHeading = (value) => value
    } = {}
  )
  {
    this.data = data;
    this.label = label;
    this.value = value;
    this.link = link;
    this.chartHeight = 50;
    this.formatHeading = formatHeading;

    this.render();
  }

  render = () => {
    this.element = createHtmlElement(this.getTemplate({
      data: this._getColumnProps(this.data),
      label: this.label,
      value: this.value,
      link: this.link,
      height: this.chartHeight,
      formatHeading: this.formatHeading
    }));

    if (this.data.length === 0) this.element.classList.add("column-chart_loading");
  }

  initEventListeners = () => {}

  update = () => {
    this.render();
  }

  remove = () => {
    this.element.remove();
  }

  destroy = () => {
    this.remove();
  }

  getTemplate = ({ data, label, value, link, height, formatHeading } = {}) => {
    return `
      <div class="column-chart" style="--chart-height: ${height}">
        <div class="column-chart__title">
          Total ${label}
          <a class="column-chart__link" href="${link}">View all</a>
        </div>
        <div class="column-chart__container">
          <div data-element="header" class="column-chart__header">
            ${formatHeading(value)}
          </div>
          <div data-element="body" class="column-chart__chart">
            ${this._getColumns(data)}
          </div>
        </div>
      </div>
    `;
  }

  // Private method
  _getColumns = (columnsProps) => {
    let columns = ``;

    for (let i = 0; i < columnsProps.length; i++) {
      columns += `
        <div style="--value: ${columnsProps[i].value}" data-tooltip="${columnsProps[i].percent}"></div>
      `;
    }
    return columns;
  }

  // Private method
  _getColumnProps = (data) => {
    const maxValue = Math.max(...data);
    const scale = 50 / maxValue;

    return data.map(item => {
      return {
        percent: (item / maxValue * 100).toFixed(0) + '%',
        value: String(Math.floor(item * scale))
      };
    });
  }
}

// Simple Helper for proper creation of div blocks
const createHtmlElement = (html) => {
  const div = document.createElement('div');
  div.innerHTML = html;

  return div.firstElementChild;
};
