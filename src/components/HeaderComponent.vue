<template>
  <div class="header">
    {{ newCategory }}
  </div>
</template>

<script>
export default {
  props: {
    newCategory: {
      type: String,
      default: ''
    }
  },
  data() {
    return {

    }
  }
}
</script>


<style scoped>
.header {
  width: 90%;
  margin: 0 auto 20px;
  height: 47px;
  background: #f2f2f2;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>