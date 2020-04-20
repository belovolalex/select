<template>
  <div>
    <select-with-tags
      v-if="withTags"
      :options="localOptions[0]"
      :search="search"
      :createNew="createNew"
      @onSelect="onSelect"
      @onSaveNew="onSaveNew"
    />
    <div v-else>
      <div
        v-for="(localOption, index) in localOptions" :key="index"
        class="wrapper-select"
      >
        <default-select :options="localOption" @onSelect="onSelect" />
        <span @click="deleteSelect(index)" class="delete-select">
          &times;
        </span>
      </div>
      <button
        @click="addSelect"
        class="add-select">+ add select
      </button>
    </div>
  </div>
</template>

<script>
import DefaultSelect from './DefaultSelect'
import SelectWithTags from './SelectWithTags'

export default {
  name: 'Select',
  components: {
    DefaultSelect,
    SelectWithTags
  },
  props: {
    options: {
      type: Array,
      default: () => []
    },
    withTags: {
      type: Boolean,
      default: false
    },
    search: {
      type: Boolean,
      default: false
    },
    addTag: {
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
      localOptions: []
    }
  },
  watch: {
    options: {
      immediate: true,
      handler(value) {
        this.localOptions = value
      }
    }
  },
  methods: {
    addSelect() {
      this.localOptions.push([])
    },
    deleteSelect(index) {
      this.localOptions.splice(index, 1)
    },
    onSelect(value) {
      this.$emit('onSelect', value)
    },
    onSaveNew(value) {
      this.$emit('onSaveNew', value)
    }
  }
}
</script>

<style scoped>
.wrapper-select {
  margin-bottom: 4px;
  display: flex;
  align-items: center;
}
.add-select {
  margin-bottom: 20px;
  border: 1px solid #cacaca;
  background: white;
  color: rgb(48, 48, 48);
  padding: 7px 40px;
  border-radius: 7px;
  cursor: pointer;
  outline: none;
}
.add-select:active {
  border: 1px solid #a5a5a5;
}
.delete-select {
  cursor: pointer;
  justify-content: center;
  text-align: center;
  display: flex;
  height: 20px;
  width: 20px;
}
</style>