<template>
    <div v-if="isOpen" class="modal-overlay">
      <div class="modal-center-container">
        <div class="modal-content">
          <h2 v-if="title">{{ title }}</h2>
          <p v-if="question"><strong>{{ question }}</strong></p>
          <div v-if="explanation" v-html="explanation"></div>
          <slot></slot>
          <button @click="closeModal" class="modal-close-button">
            X
          </button>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    question: {
      type: String,
      default: '',
    },
    explanation: {
      type: String,
      default: '',
    },
  },
  methods: {
    closeModal() {
      this.$emit("update:isOpen", false);
    },
  },
};
</script>