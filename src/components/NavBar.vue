<template lang="">   
    <nav>
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <router-link to="/" class="flex items-center">
                <img src="../assets/images/MathBoard.svg" class="h-6 mr-3" alt="Math Logo" />
            </router-link>
        <div class="relative inline-block text-left">

            <button class="w-44 text-brand-green border font-medium rounded-lg text-sm px-4 py-2.5 flex justify-center items-center " type="button" @click.stop.prevent="toggle()">
                Opções
                <svg class="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>

            <div class="absolute z-10 my-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-52 " v-show="isOpen">
                <ul class="py-2 text-sm  text-brand-green">
                    <li>
                        <router-link to="/" class="block px-4 py-2 hover:text-green-700">Juros Simples</router-link>
                    </li>
                    <li>
                        <router-link to="/JurosComposto" class="block px-4 py-2 hover:text-green-700">Juros Composto</router-link>
                    </li>
                    <li>
                        <router-link to="/ValorInicialSimples" class="block px-4 py-2 hover:text-green-700">Valor Inicial Simples</router-link>
                    </li>
                    <li>
                        <router-link to="/ValorInicialComposto" class="block px-4 py-2 hover:text-green-700">Valor Inicial Composto</router-link>
                    </li>
                    
                    <li>
                        <router-link to="/AumentoCapitalSimples" class="block px-4 py-2 hover:text-green-700">Aumento Capital Simples</router-link>
                    </li>
                    <li>
                        <router-link to="/AumentoCapitalComposto" class="block px-4 py-2 hover:text-green-700">Aumento Capital Composto</router-link>
                    </li>
                </ul>
            </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    export:'NavBar',

    data() {
        return {
            isOpen: false,
        };
    },

    methods: {
        toggle() {
            this.isOpen = !this.isOpen;
        },
    },
    
};
</script>
