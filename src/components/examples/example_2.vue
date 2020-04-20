<template>
  <div>
    <div
      v-if="isLengthString"
      v-tooltip="{content: value, classes: 'truncate-tooltip'}"
    >
      {{ truncatedString }}
    </div>
    <div v-else>
      {{ value }}
    </div>
  </div>
</template>

<script>
import { VTooltip } from 'v-tooltip'

export default {
  directives: { tooltip: VTooltip },
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    countSymbols: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      truncatedString: '',
      lengthString: null
    }
  },
  computed: {
    isLengthString() {
      return this.lengthString > this.countSymbols
    }
  },
  mounted() {
    this.truncateString()
  },
  methods: {
    truncateString() {
      const BEGIN_SLICE = 0
      const valueToString = String(this.value)
      const truncatedString = valueToString.slice(BEGIN_SLICE, this.countSymbols)

      this.lengthString = valueToString.length

      this.setTruncatedString(truncatedString)
    },
    setTruncatedString(truncatedString) {
      let string = truncatedString

      if(this.isLengthString) {
        string = `${truncatedString}...`
      }

      this.truncatedString = string
    }
  }
}
</script>
