<template>
    <div v-if="isOpen" class="modal-overlay">
      <div class="modal-center-container">
        <div class="modal-content">
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
  },
  methods: {
    closeModal() {
      this.$emit("update:isOpen", false);
    },
  },
};
</script>