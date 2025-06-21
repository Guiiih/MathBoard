<template>
  <div class="result-wrapper">
    <div class="result-flex-container">
      <div class="result-container">
        <div v-if="resultado" class="result-content">
          <div class="result-output overflow-x-auto">
            <div v-html="resultado" class="result-output-inner"></div>
          </div>
          </div>
      </div>
    </div>
    </div>
</template>

<script>
// import Modal from './Modal.vue';
export default {
  // components: {
  //   Modal
  // },
  props: {
    resultado: {
      type: String,
      default: ''
    },
  },
  // data() {
  //   return {
  //     isModalOpen: false,
  //   };
  // },
  // methods: {
  //   openModal() {
  //     this.isModalOpen = true;
  //   }
  // }
}
</script>