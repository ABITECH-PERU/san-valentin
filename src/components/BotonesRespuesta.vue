<script setup>
import { ref } from "vue";

const props = defineProps({
    respuesta: Function, // Se recibe como prop
});

const invertir = ref(false);

const manejarClick = (opcion) => {
    invertir.value = !invertir.value;
    props.respuesta(opcion); // Emitir la respuesta
};
</script>

<template>
    <div
        :class="{ 'flex-row-reverse': invertir }"
        class="flex justify-center gap-8 mt-10">
        <button
            @click="manejarClick('si')"
            class="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-6 rounded-full text-lg transition-all duration-300 shadow-lg transform hover:scale-110">
            <span class="animate-pulse">Sí 💘</span>
        </button>
        <button
            @click="manejarClick('no')"
            class="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-6 rounded-full text-lg transition-all duration-300 shadow-lg transform hover:scale-110">
            No 💔
        </button>
    </div>
</template>
