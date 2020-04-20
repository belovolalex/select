import Vue from 'vue'

Vue.directive('out', {

  bind: function (el, binding, vNode) {
    const handler = (e) => {
      if (!(el == e.target || el.contains(e.target))) {
            vNode.context[binding.expression](event)
          }
      }
      el.out = handler
      document.addEventListener('click', handler)
  },

  unbind: function (el) {
      document.removeEventListener('click', el.out)
      el.out = null
  }
})