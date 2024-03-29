new Vue({
  el: '#app',
  data() {
    return {
      sourceData: [javascript, typescript, react, vue, css, image, other, article],
      tabIndex: 0,
      searchText: ''
    }
  },
  computed: {
    filteredSearch() {
      return this.getFilter(this.sourceData[this.tabIndex]) 
    },
    placeholderText() {
      return `快速搜尋${this.sourceData[this.tabIndex].name}內容`;
    }
  },
  watch: {
    tabIndex(value) {
      localStorage.setItem('tabIndex', value);
    }
  },
  mounted() {
    // Sort the data from new to old.
    this.reverseArray(this.sourceData);

    // Get last viewed index.
    this.init();
  },
  methods: {
    init() {
      this.tabIndex = Number(localStorage.getItem('tabIndex')) || 0;;
    },
    reverseArray: arr => arr.forEach(({lists}) => lists.reverse()),
    getFilter({ lists }) {
      return lists.filter(({ name }) => {
        return name.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1;;
      });
    },
    handleSearch() {
      if (this.searchText === '' || this.filteredSearch.length < 1) {
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
    },
    linkClass(idx) {
      if (this.tabIndex === idx) {
        return ['text-light']
      } else {
        return ['text-dark']
      }
    }
  }
});
