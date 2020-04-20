<template>
<div>
  <div v-if="isCreateNew">
    <input type="text"
      @keyup.enter="$event.target.blur()"
      @blur="saveNew"
      v-model="createNewValue"
    >
  </div>
  <div
      v-else
      class="select"
      v-out="hideOptions"
    >
      <div
        @click="onTags"
        class="select-tags">
        <div
          v-for="(tag, index) in tags"
          :key="index"
          class="select-tags__tag"
        >
          {{ tag.name }}
          <span
            @click="onCloseTag(tag)"
            class="select-tag-close"
          >&times;</span>
        </div>
        <input
          v-if="search"
          v-model="filterQuery"
          type="text"
          ref="search-input"
          class="select-tags__search"
          @input="onSearch"
        >
      </div>
    <select-options
      v-if="showOptions"
      :options="localOptions"
      @onOption="onOption"
      ref="select-options"
      @onCreateNew="onCreateNew"
      :createNew="createNew"
    />
  </div>
</div>
</template>

<script>
import SelectOptions from './SelectOptions'

export default {
  components: { SelectOptions },
  props: {
    options: {
      type: Array,
      default: () => []
    },
    search: {
      type: Boolean,
      default: false
    },
    createNew: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tags: [],
      createNewValue: [],
      localOptions: [],
      filterQuery: '',
      showOptions: false,
      isCreateNew: false
    }
  },
  watch: {
    options: {
      immediate: true,
      handler(value) {
        if(value.length) {
          this.localOptions = value
        }
      }
    }
  },
  methods: {
    onTags() {
      if(this.search) {
        this.setFocusOnSearchInput()
      }
      this.showOptions = true
    },
    onOption(option) {
      const isOptionInTags = () => this.tags.some(tag => tag.value === option.value)

      !isOptionInTags()
        ? this.tags.push(option)
        : ''

      this.localOptions = this.options
      this.filterQuery = ''
      this.setFocusOnSearchInput()
      this.$emit('onSelect', option)

    },
    onCloseTag(activeTag) {
      this.tags.forEach((tag, index, array) => {
        tag.value === activeTag.value
          ? array.splice(index, 1)
          : '' 
      })
    },
    onSearch() {
      this.localOptions = this.options.filter((option) => option.name.match(this.filterQuery))
    },
    setFocusOnSearchInput() {
      const searchInput = this.$refs['search-input']
      this.search ? searchInput.focus() : ''
    },
    hideOptions() {
      this.showOptions = false
    },
    onCreateNew() {
      this.showOptions = false
      this.isCreateNew = true
    },
    saveNew() {
      this.$emit('onSaveNew', this.createNewValue)
      this.createNewValue = ''
    }
  }
}
</script>

<style scoped>
.select {
  width: 300px;
  position: relative;
}
.select-tags {
  border: 1px solid #cacaca;
  min-height: 30px;
  border-radius: 7px;
  display: flex;
  align-items: center;
  padding: 5px;
  flex-wrap: wrap;
  margin-bottom: 6px;
}

.select-label {
  position: relative;
  border: 1px solid #cacaca;
  min-height: 30px;
  border-radius: 7px;
  display: flex;
  align-items: center;
  padding-left: 5px;
}
.select-label:before {
  position: absolute;
  content: '';
  width: 0;
  height: 0;
  right: 5px;
  border-style: solid;
  border-width: 5px 4px 0 4px;
  border-color: #616161 transparent transparent transparent;
}
.select-tags__tag {
  position: relative;
  padding: 4px 27px 4px 10px;
  background: #48bfeb;
  color: white;
  border-radius: 5px;
  margin: 0 5px 5px 0;
  display: inline-block;
}
.select-tag-close {
  background: #11a2d8;
  padding: 0 4px;
  border-radius: 6px;
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}
.select-tags__search {
  outline: none;
  border: none;
}
</style>