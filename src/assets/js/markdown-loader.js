const markdown = require('markdown-it');

module.exports = function(src) {
  const md = markdown({
    html: true,
    linkify: true,
    typographer: true,
    highlight: function(str, lang) {
      return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`
    }
  })
  const html = md.render(src)

  return (
    `<template>\n` +
    `<div class="markdown">${html}</div>\n` +
    `</template>\n`
  )
}