new Vue({
  el: '#app',
  data() {
    return {
      tabIndex: 0,
      sreachText: ''
    }
  },
  computed: {
    contents() {
      return [javascript, react, vue, css, image, other, article]
    },
    filteredSearch() {
      return [
        ...this.getFilter(javascript),
        ...this.getFilter(react),
        ...this.getFilter(vue),
        ...this.getFilter(css),
        ...this.getFilter(image),
        ...this.getFilter(other),
        ...this.getFilter(article)
      ]
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
    reverseArray: (...arr) => arr.forEach(arr => arr.reverse()),
    getFilter({ lists }) {
      return lists.filter(({ name }) => name.indexOf(this.sreachText) != -1);
    },
    handleSearch() {
      if (this.sreachText === '' || this.filteredSearch.length < 1) {
        this.makeToast('danger', '搜尋失敗。');
        return;
      }

      const { href } = this.filteredSearch[0] || { href: null };
      href && window.open(href, '_blank');
    },
    makeToast(variant = null, content = '') {
      this.$bvToast.toast(content, {
        title: '訊息',
        variant: variant,
        solid: true
      })
    }
  }
})
