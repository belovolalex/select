<template>
  <div id="app">
    <header-component :newCategory="newCategory" />
    <content-component>
        <select-component
          :options="selectOptions"
          @onSelect="onSelect"
        />
        <select-component
          :options="selectOptions"
          withTags
          @onSaveNew="onSaveNew"
          @onSelect="onSelect"
        />
        <select-component
          :options="selectOptions"
          withTags
          search
          @onSaveNew="onSaveNew"
          @onSelect="onSelect"
        />
        <select-component
          :options="selectOptions"
          withTags
          search
          createNew
          @onSaveNew="onSaveNew"
          @onSelect="onSelect"
        />
    </content-component>
  </div>
</template>

<script>
import SelectComponent from './components/ui/select/SelectComponent'
import { selectData } from './helpers/mockData'
import HeaderComponent from './components/HeaderComponent'
import ContentComponent from './components/ContentComponent'

export default {
  name: 'App',
  components: {
    HeaderComponent,
    ContentComponent,
    SelectComponent
  },
  data() {
    return {
      selectOptions: [],
      newCategory: ''
    }
  },
  created() {
    Object.assign(this.selectOptions, selectData)
  },
  methods: {
    onSaveNew(value) {
      this.newCategory = value
    },
    onSelect(value) {
      console.log('value', value)
    }
  }
}
</script>

<style>
body {
  font-family: sans-serif;
  font-size: 14px;
}
</style>
