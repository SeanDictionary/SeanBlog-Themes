/**
 * Cardinal 主题脚本（主题级交互，纯展示，不碰平台 API）
 * - 深浅色切换 + cookie
 * - 顶栏滚动隐藏行为
 * - TOC 滚动高亮
 * - 返回顶部按钮显隐
 * - 评论跳转
 * - 评论回复 UX
 * 平台行为（评论提交 / 搜索）由 /enhance.js 处理。
 */
;(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') fn()
    else document.addEventListener('DOMContentLoaded', fn)
  }

  // 深浅色切换
  ready(function () {
    document.querySelectorAll('[data-sb-theme-toggle]').forEach(function (el) {
      el.addEventListener('click', function () {
        var cur = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'
        var next = cur === 'dark' ? 'light' : 'dark'
        document.documentElement.setAttribute('data-theme', next)
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

  // 侧边栏标签/分类「更多」弹窗
  ready(function () {
    function open(modal) { modal.hidden = false; document.body.style.overflow = 'hidden' }
    function close(modal) { modal.hidden = true; document.body.style.overflow = '' }
    document.querySelectorAll('[data-cf-open-modal]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var m = document.querySelector('[data-cf-modal="' + btn.getAttribute('data-cf-open-modal') + '"]')
        if (m) open(m)
      })
    })
    document.querySelectorAll('[data-cf-close-modal]').forEach(function (el) {
      el.addEventListener('click', function () {
        var m = el.closest('[data-cf-modal]')
        if (m) close(m)
      })
    })
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return
      document.querySelectorAll('[data-cf-modal]:not([hidden])').forEach(close)
    })
  })

  // 返回顶部按钮显隐
  ready(function () {
    var btn = document.querySelector('[data-cf-back-to-top]')
    if (!btn) return
    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 400) btn.classList.add('cf-visible')
      else btn.classList.remove('cf-visible')
    }, { passive: true })
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
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
})()
