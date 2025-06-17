<template>
  <div class="relative">
    <div class="flex justify-center">

      <div class="flex justify-center sm:items-center w-11/12 md:w-10/12 min-h-Table relative p-4 sm:p-8 rounded-lg bg-brand-green text-white">
        
        <div v-if="resultado" class="text-sm sm:text-lg font-bold w-full">

          <div class="overflow-x-auto text-center">
            <div v-html="resultado" class="inline-block text-left"></div>
          </div>

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