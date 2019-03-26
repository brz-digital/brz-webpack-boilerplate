class Share {
  constructor() {
    this.providers = {
      'facebook' : 'https://www.facebook.com/sharer/sharer.php?u={refer}',
      'whatsapp' : 'https://api.whatsapp.com/send?text={title} {refer}',
      'google'   : 'https://plus.google.com/share?url={refer}',
      'twitter'  : 'https://twitter.com/intent/tweet?url={refer}&text={title}&wrap_links=true',
      'linkedin' : 'https://www.linkedin.com/shareArticle?mini=true&url={refer}&title={title}'
    };

    this.registerHandlers(document.querySelectorAll('.js-share'));
  }

  registerHandlers(buttons) {
    buttons.forEach(button => {
      button.onclick = event => this.handleOnClick(event);
    });
  }

  handleOnClick(event) {
    event.preventDefault();

    let share = event.target;
    let params = {
          provider    : share.dataset.provider || undefined,
          title       : encodeURIComponent(share.dataset.title) || null,
          description : encodeURIComponent(share.dataset.description) || null,
          refer       : encodeURIComponent(share.dataset.refer) || window.location.href
        };

    this.parseShareUrl(params);
  }

  getProviderTemplate(provider) {
    return this.providers[provider];
  }

  parseShareUrl(params) {
    let provider = this.getProviderTemplate(params.provider);

    if (provider == null) throw new TypeError(`Invalid provider "${params.provider}"`);

    return window.open(
      provider.replace(/\{([^}]+)}/g, function(m, key) {
        return params ? params[key] : '';
      })
    );
  }
}

export default Share;
