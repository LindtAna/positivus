class Chatbot {
  constructor(config) {
    const { root, replicas } = config;

    if (!root) throw new Error('Chatbot: the root key must be present in the provided data');
    if (!replicas) throw new Error('Chatbot: the replicas key must be present in the provided data.');

    this._$root = root;
    this._replicas = replicas;
    this._delay = 500;
    this._botIndex = 0;
    this._contentIndex = 1;
    this._start = true;
    this._params = {};
    this._active = false;

    this._addEventListeners();
  }

  init() {
    if (this._active) return;
    this._active = true;
    this._outputContent(this._delay);
  }

  _getData(target, id) {
    return this._replicas[target][id.toString()];
  }

  _outputContent(interval) {
    const botData = this._getData('bot', this._botIndex);
    const { human: userResponses, content: botContentTemplate } = botData;
    const $container = this._$root.querySelector('.chatbot__items');

    let botContent = Array.isArray(botContentTemplate)
      ? botContentTemplate.map(content => this._replacePlaceholders(content))
      : this._replacePlaceholders(botContentTemplate);

    const renderContent = () => {
      const $humanContent = userResponses
        .map(id => this._createButton(this._getData('human', id)))
        .join('');

      $container.insertAdjacentHTML('beforeend', this._createMessage('human', $humanContent));
      $container.scrollTop = $container.scrollHeight;
    };

    if (interval) {
      let times = 1;
      const renderBotMessages = message => {
        setTimeout(() => {
          $container.insertAdjacentHTML('beforeend', this._createMessage('bot', message));
          $container.scrollTop = $container.scrollHeight;
        }, interval * times++);
      };

      Array.isArray(botContent)
        ? botContent.forEach(renderBotMessages)
        : renderBotMessages(botContent);

      setTimeout(renderContent, interval * times);
    } else {
      if (Array.isArray(botContent)) {
        botContent.forEach(message => {
          $container.insertAdjacentHTML('beforeend', this._createMessage('bot', message));
        });
      } else {
        $container.insertAdjacentHTML('beforeend', this._createMessage('bot', botContent));
      }
      renderContent();
    }
  }

  _replacePlaceholders(content) {
    return Object.keys(this._params).reduce((result, key) => {
      return result.replaceAll(`{{${key}}}`, this._params[key]);
    }, content);
  }

  _createMessage(type, content, state = '') {
    return `<div class="chatbot__item chatbot__item_${type}"><div class="chatbot__content chatbot__content_${type}${state}">${content}</div></div>`;
  }

  _createButton({ bot, content }) {
    return `<button class="btn" type="button" data-bot-index="${bot}">${content}</button>`;
  }

  _addEventListeners() {
    this._$root.addEventListener('click', this._handleClick.bind(this));
  }

  _handleClick(event) {
    const $target = event.target;

    if ($target.dataset.botIndex) {
      this._handleBotIndex($target);
    } else if ($target.classList.contains('chatbot__close')) {
      this._closeChatbot();
    } else if ($target.classList.contains('chatbot__reset')) {
      this.reset();
    }
  }

  _handleBotIndex($target) {
    this._botIndex = Number($target.dataset.botIndex);
    const userResponse = this._humanResponseToDisabled($target);
    this._outputContent(this._delay);
  }

  _humanResponseToDisabled($target) {
    const $container = $target.closest('.chatbot__content_human');
    const content = $target.innerHTML;

    $container.innerHTML = content;
    $container.classList.remove('chatbot__content_human');
    $container.classList.add('chatbot__content_human-disabled');

    return content;
  }

  _closeChatbot() {
    this._$root.classList.add('chatbot_hidden');
    document.querySelector('.chatbot__icon').classList.remove('d-none');
  }

  reset() {
    this.constructor.resetTemplate();
    this._botIndex = 0;
    this._contentIndex = 1;
    this._start = true;
    this._params = {};
    this._active = false;
    localStorage.removeItem('chatbot');
    this.init();
  }

  static createTemplate() {
    const existingRoot = document.querySelector('.chatbot');
    if (existingRoot) return existingRoot;

    const chatbot = document.createElement('div');
    chatbot.className = 'chatbot chatbot_hidden';
    chatbot.innerHTML = `
      <div class="chatbot__header">
        <span class="chatbot__close"></span>Answers in Clicks<span class="chatbot__reset"></span>
      </div>
      <div class="chatbot__wrapper">
        <div class="chatbot__items"></div>
      </div>`;

    document.body.appendChild(chatbot);
    return chatbot;
  }

  static resetTemplate() {
    const $root = document.querySelector('.chatbot');
    if ($root) {
      $root.innerHTML = `
        <div class="chatbot__header">
          <span class="chatbot__close"></span>Answers in Clicks<span class="chatbot__reset"></span>
        </div>
        <div class="chatbot__wrapper">
          <div class="chatbot__items"></div>
        </div>`;
    }
  }
}
