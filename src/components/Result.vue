<template>
  <div class="flex justify-center">
    <div class="w-10/12 h-Table fixed p-4 text-center rounded-lg sm:p-8 bg-brand-green text-white">
      <div v-if="resultado" class="text-xl font-bold mt-4">
        <div v-html="part1"></div>
        <div v-html="part2"></div>
        <div v-html="part3"></div>
        <div v-html="part4"></div>
        <div v-html="part5"></div>
        <div v-html="part6"></div>
        <div v-html="part7"></div>
        <div v-html="resultado"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    resultado: {
      type: String,
      default: ''
    },
    part1: {
      type: String,
      default: ''
    },
    part2: {
      type: String,
      default: ''
    },
    part3: {
      type: String,
      default: ''
    },
    part4: {
      type: String,
      default: ''
    },
    part5: {
      type: String,
      default: ''
    },
    part6: {
      type: String,
      default: ''
    },
    part7: {
      type: String,
      default: ''
    },
  }
}
</script>
