export default class NotificationMessage {
  constructor(message = '', {
    duration = 1000,
    type = 'success'
  } = {}) {
    this.message = message;
    this.duration = duration;
    this.type = type;
    this.instance = document.querySelector('div.notification');

    this.initialize;
  }

  get initialize() {
    if (this.instance) {
      this.instance.remove();
    }

    this.element = createHtmlElement(this.template);
  }

  get template() {
    return `
      <div class="notification ${this.type}" style="--value:${this.duration / 1000}s">
        <div class="timer"></div>
        <div class="inner-wrapper">
          <div class="notification-header">${this.type}</div>
          <div class="notification-body">
            ${this.message}
          </div>
        </div>
      </div>
    `;
  }

  show = (wrapper) => {
    if (wrapper) {
      wrapper.innerHTML = this.element.outerHTML;
      document.body.append(wrapper);
    } else {
      document.body.append(this.element);
    }

    setTimeout(() => {
      this.destroy();
    }, this.duration);
  }

  remove = () => {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy = () => {
    this.remove();
    this.element = null;
  }
}

// Simple Helper for proper creation of div blocks
const createHtmlElement = (html) => {
  const div = document.createElement('div');
  div.innerHTML = html;

  return div.firstElementChild;
};
