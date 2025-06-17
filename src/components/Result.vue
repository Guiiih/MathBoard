<template>
  <div class="relative">
    <div class="flex justify-center">
      <div class="flex justify-center sm:place-items-center w-10/12 h-Table relative p-4 text-center rounded-lg sm:p-8 bg-brand-green text-white">
        <div v-if="resultado" class="text-sm sm:text-lg font-bold mt-4 sm:mt-0">
          <div v-html="resultado"></div>
          <button class="absolute bottom-2 right-2 p-2 bg-white text-green-light rounded-full" @click="openModal">
            <img src="../assets/images/icons8-pergunta.gif" class="h-6 " alt="Não Entendi">
          </button>
        </div>
      </div>
    </div>
    <modal :isOpen="isModalOpen" @update:isOpen="isModalOpen = $event" />
  </div>
</template>
<script>
import Modal from './Modal.vue'; 
export default {
  components: {
    Modal 
  },
  props: {
    resultado: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      isModalOpen: false, 
    };
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    }
  }
}
</script>