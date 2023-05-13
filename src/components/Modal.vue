<template>
    <div v-if="isOpen" class="fixed inset-0 z-10 overflow-y-auto bg-opacity-50 bg-gray-900">
      <div class="flex justify-center items-center h-full">
        <div class="w-10/12 h-Table bg-white p-6 rounded-lg shadow-lg">
          <slot></slot>
          <button @click="closeModal" class="mt-4 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
            Close
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

  