<template>
  <ul
    v-if="options.length"
    class="select-options"
  >
    <li
      v-for="(option, index) in options"
      :key="index"
      @click="onOption(option)"
      :class="setSelectedOptionClass(option.value)"
      class="select-option"
    >
        {{ option.name }}
    </li>
    <li
      v-if="createNew"
      @click="$emit('onCreateNew')"
      class="select-option select-option--create"
    >Create new</li>
  </ul>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default: () => []
    },
    createNew: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onOption(option) {
      this.$emit('onOption', option)
    },
    setSelectedOptionClass(value) {
      const { tags } = this.$parent
      

      if(tags && tags.length) {
        return tags.some(tag => tag.value === value)
          ? 'select-active-option'
          : ''
      }
    }
  }
}
</script>

<style scoped>
ul, li {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
.select-options {
  position: absolute;
  background: white;
  z-index: 1;
  width: 100%;
  margin-top: 1px;
  border-radius: 7px;
  border: 1px solid #cacaca;
}
.select-option {
  cursor: pointer;
  padding: 5px;
}
.select-option:hover {
  background: #e0f6fe;
}
.select-option:first-child {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
.select-option:last-child {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
.select-active-option {
  background: #c2edff;
  pointer-events: none;
}
.select-option--create {
  color: #11a2d8;
}
</style>