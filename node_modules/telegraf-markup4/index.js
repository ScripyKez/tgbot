const { Markup, Extra } = require('telegraf')

module.exports = {
  button: {
    callback: (text, action) => Markup.callbackButton(text, action),
    url: (text, url) => Markup.urlButton(text, url),
    switchToChat: (text, value) => Markup.switchToChatButton(text, value),
    webApp: (text, url) => ({ text, web_app: { url } }),
  },

  keyboard: {
    inline: (btns) => Extra.markup(Markup.inlineKeyboard(btns)),
    none: () => Extra.markup(Markup.removeKeyboard()),
    reply: (btns, oneTime = false) => {
      let markup = Markup.keyboard(btns)
      if (oneTime) markup = markup.oneTime()
      return markup.resize().extra()
    },
    gen: (btns, btnsPerLine) => {
      const result = [[]]

      btns.map((el) => {
        const last = result[result.length - 1]

        if (last.length >= btnsPerLine) {
          result.push([el])
        } else {
          last.push(el)
        }
      })

      return result
    },
  },
}
