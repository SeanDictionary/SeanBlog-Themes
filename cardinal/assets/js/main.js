/**
 * Cardinal 主题脚本（主题级交互，纯展示，不碰平台 API）
 * - 深浅色切换 + cookie
 * - 顶栏滚动隐藏行为
 * - TOC 滚动高亮
 * - 返回顶部按钮显隐
 * - 评论跳转
 * - 评论回复 UX
 * - 代码块工具条：复制 / 自动换行切换
 * 平台行为（评论提交 / 搜索）由 /enhance.js 处理。
 */
;(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') fn()
    else document.addEventListener('DOMContentLoaded', fn)
  }

  // 右下角操作按钮动态堆叠：从上至下为返回顶部、主题切换、评论跳转
  function layoutFloatingButtons() {
    var buttons = [
      document.querySelector('[data-cf-back-to-top]'),
      document.querySelector('.cf-theme-toggle'),
      document.querySelector('[data-cf-comment-jump]'),
    ].filter(function (btn) {
      if (!btn) return false
      return !btn.classList.contains('cf-back-to-top') || btn.classList.contains('cf-visible')
    })
    var bottom = 24 + (buttons.length - 1) * 48
    buttons.forEach(function (btn) {
      btn.style.bottom = bottom + 'px'
      bottom -= 48
    })
  }

  // 初始化浮动按钮布局（返回顶部未渲染时也要执行，避免主题/评论按钮重叠）
  ready(function () {
    layoutFloatingButtons()
  })

  // 深浅色切换
  ready(function () {
    document.querySelectorAll('[data-sb-theme-toggle]').forEach(function (el) {
      el.addEventListener('click', function () {
        var cur = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'
        var next = cur === 'dark' ? 'light' : 'dark'
        document.documentElement.setAttribute('data-theme', next)
        document.documentElement.setAttribute('data-bs-theme', next)
        document.cookie = 'sb-theme=' + next + ';path=/;max-age=31536000;SameSite=Lax'
      })
    })
  })

  // 顶栏滚动隐藏（data-header=collapse-on-scroll）
  ready(function () {
    var header = document.querySelector('[data-cf-header]')
    if (!header || document.body.getAttribute('data-header') !== 'collapse-on-scroll') return
    var lastY = window.pageYOffset
    var ticking = false
    window.addEventListener('scroll', function () {
      if (ticking) return
      ticking = true
      requestAnimationFrame(function () {
        var y = window.pageYOffset
        if (y > lastY && y > 120) header.classList.add('cf-collapsed')
        else header.classList.remove('cf-collapsed')
        lastY = y
        ticking = false
      })
    }, { passive: true })
  })

  // TOC 滚动高亮
  ready(function () {
    var toc = document.querySelector('[data-sb-toc]')
    if (!toc) return
    var links = Array.prototype.slice.call(toc.querySelectorAll('a[href^="#"]'))
    if (!links.length) return
    var byId = {}
    links.forEach(function (a) {
      var id = a.getAttribute('href').slice(1)
      if (document.getElementById(id) && !byId[id]) byId[id] = a
    })
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          var a = byId[e.target.id]
          if (!a) return
          if (e.isIntersecting) {
            links.forEach(function (x) { x.removeAttribute('aria-current') })
            a.setAttribute('aria-current', 'true')
          }
        })
      }, { rootMargin: '0% 0% -75% 0%' })
      Object.keys(byId).forEach(function (id) {
        var t = document.getElementById(id)
        if (t) io.observe(t)
      })
    }
  })

  // 返回顶部按钮显隐
  ready(function () {
    var btn = document.querySelector('[data-cf-back-to-top]')
    if (!btn) return
    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 400) btn.classList.add('cf-visible')
      else btn.classList.remove('cf-visible')
      layoutFloatingButtons()
    }, { passive: true })
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
    layoutFloatingButtons()
  })

  // 跳转评论
  ready(function () {
    var btn = document.querySelector('[data-cf-comment-jump]')
    if (!btn) return
    btn.addEventListener('click', function () {
      var c = document.querySelector('#sb-comments')
      if (c) c.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  })

  // 评论回复 UX（设 parentId + banner + 聚焦；取消恢复）
  ready(function () {
    var form = document.querySelector('[data-sb-comment-form]')
    if (!form) return
    var parentInput = form.querySelector('[name=parentId]')
    var banner = form.querySelector('[data-sb-reply-banner]')
    var bannerText = form.querySelector('[data-sb-reply-text]')

    document.querySelectorAll('[data-sb-reply-to]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-sb-reply-to')
        var author = btn.getAttribute('data-sb-reply-author') || ''
        if (parentInput) parentInput.value = id
        if (banner && bannerText) {
          bannerText.textContent = '回复 @' + author
          banner.removeAttribute('hidden')
        }
        var ta = form.querySelector('textarea[name=content]')
        form.scrollIntoView({ behavior: 'smooth', block: 'center' })
        if (ta) setTimeout(function () { ta.focus() }, 300)
      })
    })

    var cancel = form.querySelector('[data-sb-reply-cancel]')
    if (cancel) cancel.addEventListener('click', function () {
      if (parentInput) parentInput.value = ''
      if (banner) banner.setAttribute('hidden', '')
    })
  })

  // 代码块工具条：复制 / 自动换行
  ready(function () {
    var pres = document.querySelectorAll('.cf-post-content pre')
    if (!pres.length) return
    function copyText(text, done) {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(function () { done(true) }, function () { done(false) })
        return
      }
      // 非安全上下文降级：隐藏 textarea + execCommand
      var ta = document.createElement('textarea')
      ta.value = text
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      var ok = false
      try { ok = document.execCommand('copy') } catch (e) {}
      document.body.removeChild(ta)
      done(ok)
    }
    // 生成带内联样式的高亮 HTML（外部编辑器无主题 CSS，必须内联颜色才能保留高亮）
    function buildStyledHtml(pre) {
      var clone = pre.cloneNode(true)
      var orig = [pre].concat(Array.prototype.slice.call(pre.querySelectorAll('*')))
      var cloned = [clone].concat(Array.prototype.slice.call(clone.querySelectorAll('*')))
      var preCs = getComputedStyle(pre)
      for (var i = 0; i < orig.length && i < cloned.length; i++) {
        var cs = getComputedStyle(orig[i])
        var style = 'color:' + cs.color + ';'
        if (cs.fontStyle === 'italic') style += 'font-style:italic;'
        cloned[i].setAttribute('style', style)
      }
      // 行结构：解包 .line 并以 <br> 显式换行（粘贴目标不保证支持 display:block / white-space:pre）
      var lineSpans = clone.querySelectorAll('span.line')
      for (var j = 0; j < lineSpans.length; j++) {
        var line = lineSpans[j]
        var br = document.createElement('br')
        line.parentNode.insertBefore(br, line.nextSibling)
        while (line.firstChild) line.parentNode.insertBefore(line.firstChild, line)
        line.parentNode.removeChild(line)
      }
      // 缩进保护：连续空格转 nbsp，避免粘贴目标折叠空白
      var walker = document.createTreeWalker(clone, NodeFilter.SHOW_TEXT)
      var texts = []
      while (walker.nextNode()) texts.push(walker.currentNode)
      for (var k = 0; k < texts.length; k++) {
        texts[k].nodeValue = texts[k].nodeValue.replace(/ {2}/g, '\u00a0\u00a0')
      }
      // 基础文字色取 code 元素（代码基础色定义在 code 上，而非继承的页面文字色）
      var codeEl = pre.querySelector('code')
      var baseColor = getComputedStyle(codeEl || pre).color
      clone.setAttribute('style', 'background:' + preCs.backgroundColor + ';color:' + baseColor + ';padding:1rem 1.25rem;font-family:' + preCs.fontFamily + ';font-size:' + preCs.fontSize + ';line-height:' + preCs.lineHeight + ';')
      return clone.outerHTML
    }
    // 降级：选区 + execCommand，同样可携带 text/html
    function copyRichFallback(html, text, done) {
      var container = document.createElement('div')
      container.innerHTML = html
      container.setAttribute('contenteditable', 'true')
      container.style.position = 'fixed'
      container.style.left = '-9999px'
      document.body.appendChild(container)
      var range = document.createRange()
      range.selectNodeContents(container)
      var sel = window.getSelection()
      sel.removeAllRanges()
      sel.addRange(range)
      var ok = false
      try { ok = document.execCommand('copy') } catch (e) {}
      sel.removeAllRanges()
      document.body.removeChild(container)
      if (!ok) copyText(text, done)
      else done(true)
    }
    Array.prototype.forEach.call(pres, function (pre) {
      if (pre.parentElement && pre.parentElement.classList.contains('cf-code-shell')) return // 防重复注入
      var shell = document.createElement('div')
      shell.className = 'cf-code-shell'
      pre.parentNode.insertBefore(shell, pre)
      shell.appendChild(pre)
      var bar = document.createElement('div')
      bar.className = 'cf-code-bar'
      var copyBtn = document.createElement('button')
      copyBtn.type = 'button'
      copyBtn.className = 'cf-code-btn'
      copyBtn.title = '复制代码'
      copyBtn.setAttribute('aria-label', '复制代码')
      copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i>'
      copyBtn.addEventListener('click', function () {
        function finish(ok) {
          copyBtn.innerHTML = ok ? '<i class="fa-solid fa-check"></i>' : '<i class="fa-solid fa-xmark"></i>'
          setTimeout(function () { copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i>' }, 1500)
        }
        var text = pre.innerText.replace(/\r\n/g, '\n').replace(/\n$/, '')
        // 优先富文本复制（text/plain + text/html），粘贴到富文本编辑器保留高亮
        if (navigator.clipboard && window.ClipboardItem && navigator.clipboard.write) {
          try {
            var item = new ClipboardItem({
              'text/plain': new Blob([text], { type: 'text/plain' }),
              'text/html': new Blob([buildStyledHtml(pre)], { type: 'text/html' }),
            })
            navigator.clipboard.write([item]).then(function () { finish(true) }, function () {
              if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(function () { finish(true) }, function () { finish(false) })
              else copyRichFallback(buildStyledHtml(pre), text, finish)
            })
            return
          } catch (e) {}
        }
        copyRichFallback(buildStyledHtml(pre), text, finish)
      })
      var wrapBtn = document.createElement('button')
      wrapBtn.type = 'button'
      wrapBtn.className = 'cf-code-btn'
      wrapBtn.title = '切换自动换行'
      wrapBtn.setAttribute('aria-label', '切换自动换行')
      wrapBtn.innerHTML = '<i class="fa-solid fa-text-width"></i>'
      wrapBtn.addEventListener('click', function () {
        var on = pre.classList.toggle('cf-code-wrapped')
        wrapBtn.classList.toggle('cf-active', on)
      })
      bar.appendChild(copyBtn)
      bar.appendChild(wrapBtn)
      shell.appendChild(bar)
    })
  })
})()
