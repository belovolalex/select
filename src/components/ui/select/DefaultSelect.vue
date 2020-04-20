<template>
  <div
    class="wrapper-selects" v-out="hideOptions">
    <div class="select">
      <div
        @click="showOptions = true"
        class="select-label"
      >
        {{ selectedOption.name }}
      </div>
      <select-options v-if="showOptions" :options="localOptions" @onOption="onOption" />
    </div>
    <div class="select">
      <div
        @click="showSubOptions = true"
        class="select-label"
      >
        {{ selectedOption.subOption.name }}
      </div>
      <select-options v-if="showSubOptions" :options="getSubOptions"  @onOption="onSubOption "/>
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
    }
  },
  data() {
    return {
      localOptions: [],
      showOptions: false,
      showSubOptions: false,
      selectedOption: {
        name: '',
        value: '',
        subOption: {
          name: '',
          value: ''
        }
      }
    }
  },
  computed: {
    getSubOptions() {
      const findOption = option => option.value === this.selectedOption.value
      const option = this.localOptions.find(option => findOption(option))

      return option && option.subOptions || []
    },
  },
  watch: {
    options: {
      immediate: true,
      handler(value) {
        if(value.length) {
          const { subOptions, ...option } = value[0]

          Object.assign(this.selectedOption, option, {subOption: subOptions[0]})
          this.localOptions = value
        }
      }
    }
  },
  methods: {
    onOption(option) {
      const { name, value, subOptions } = option
      
      Object.assign(this.selectedOption, {
        name,
        value,
        subOption: subOptions[0]
      })
      this.hideOptions()
      this.emitSelectedOption()
    },
    onSubOption(option) {
      this.selectedOption.subOption = option
      this.hideOptions()
      this.emitSelectedOption()
    },
    emitSelectedOption() {
      this.$emit('onSelect', this.selectedOption)
    },
    hideOptions() {
      this.showSubOptions = false
      this.showOptions = false
    }
  }
}
</script>

<style scoped>
.select {
  min-width: 250px;
  width: calc(50% - 10px);
  margin-right: 10px;
  position: relative;
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
.wrapper-selects {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
}
</style>