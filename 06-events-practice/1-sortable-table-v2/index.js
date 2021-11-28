export default class SortableTable {
  element;
  subElements = {};

  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = Array.isArray(data) ? data : data.data;

    this.render();
  }

  render() {
    this.element = createHtmlElement(this.template);
    this.subElements = this._getSubElements(this.element);
  }

  get template() {
    return `
      <div data-element="productsContainer" class="products-list__container">
        <div class="sortable-table">
          <div data-element="header" class="sortable-table__header sortable-table__row">
            ${this._getTableHeader(this.headerConfig)}
          </div>
          <div data-element="body" class="sortable-table__body">
            ${this._getTableRows(this.data)}
          </div>
        </div>
      </div>
    `;
  }

  // Private method
  _getTableHeader(config) {
    return config.map(item => {
      return `
        <div class="sortable-table__cell"
          data-id="${item.id}"
          data-sortable="${item.sortable}">
            <span>${item.title}</span>
            ${item.sortable ? this._getSortingArrow() : ''}
        </div>
      `;
    }).join('');
  }

  // Private method
  _getSortingArrow() {
    return `
      <span data-element="arrow" class="sortable-table__sort-arrow">
        <span class="sort-arrow"></span>
      </span>
    `;
  }

  // Private method
  _getTableRows(data) {
    return data.map(item => {
      return `
        <a href="/products/${item.id}" class="sortable-table__row">
          ${this._getRow(item)}
        </a>
      `;
    }).join('');
  }

  // Private method
  _getRow(item) {
    return this.headerConfig.map(cell => {
      if (!cell.template) {
        cell.template = (value) => `<div class="sortable-table__cell">${value}</div>`;
      }

      return cell.template(item[cell.id]);
    }).join('');
  }

  // Private method
  _getSubElements(element) {
    const result = {};
    const elements = element.querySelectorAll('[data-element]');

    for (const subElement of elements) {
      const name = subElement.dataset.element;

      result[name] = subElement;
    }

    return result;
  }

  sort(field, order) {
    const directions = {
      asc: 1,
      desc: -1
    };
    const direction = directions[order];

    const column = this.element.querySelector(`.sortable-table__cell[data-id="${field}"]`);
    column.setAttribute('data-order', order);

    const element = this.headerConfig.find(item => item.id === field);
    const elementType = element.sortType;

    const sortedItems = [...this.data].sort((a, b) => {
      if (elementType === 'string') return direction * a[field].localeCompare(b[field], ['ru', 'en'], {
        sensitivity: 'variant',
        caseFirst: 'upper'
      });
      if (elementType === 'number') return direction * (a[field] - b[field]);

      return this.data;
    });

    this.update(sortedItems);
  }

  update(data) {
    this.subElements.body.innerHTML = this._getTableRows(data);
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    this.element = null;
    this.subElements = {};
  }
}

// Helper for proper creation of div block
const createHtmlElement = (html) => {
  const div = document.createElement('div');
  div.innerHTML = html;

  return div.firstElementChild;
};
