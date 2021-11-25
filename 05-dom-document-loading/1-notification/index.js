export default class NotificationMessage {
  static element;

  constructor(message = '', {
    duration = 1000,
    type = 'success'
  } = {}) {
    this.message = message;
    this.duration = duration;
    this.type = type;
    this.element = NotificationMessage.element;

    if (this.element) this.destroy();
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

  // Helper
  createStaticElement = (html) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    NotificationMessage.element = div.firstElementChild;

    return NotificationMessage.element;
  };

  show = (wrapper = document.body) => {
    this.element = this.createStaticElement(this.template);
    wrapper.append(this.element);

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

