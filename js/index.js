new Vue({
  el: '#app',
  data() {
    return {
      tabIndex: 0
    }
  },
  computed: {
    contents() {
      return [javascript, react, vue, css, image, other, article]
    }
  },
  watch: {
    tabIndex(value) {
      localStorage.setItem('tabIndex', value)
    }
  },
  beforeMount() {
    this.reverseArray(
      javascript.lists,
      react.lists,
      vue.lists,
      css.lists,
      image.lists,
      other.lists,
      article.lists
    )
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.tabIndex = Number(localStorage.getItem('tabIndex')) || 0
    },
    reverseArray: (...arr) => arr.forEach(arr => arr.reverse())
  }
})
