<script setup>
import { ref, onMounted, nextTick, computed } from "vue";
import Gifs from "../components/Gifs.vue";
import BotonesRespuesta from "../components/BotonesRespuesta.vue";
import { respuestasNo } from "../assets/respuestas.js";
import Fiesta from "../components/Fiesta.vue";
import AppLayout from "../Layouts/AppLayout.vue";
import GitHub from "../components/GitHub.vue";

const props = defineProps({
    param: String,
});

const mostrarMensaje = ref(false);
const mensaje = ref("");
const gif = ref(
    "https://i.pinimg.com/originals/db/aa/c1/dbaac13f6278b91a15e480752b8a7242.gif"
);

const gifAceptar = ref(
    "https://i.pinimg.com/originals/9b/dc/c6/9bdcc6206c1d36a37149d31108c6bb41.gif"
);

const textoCompleto = "¿Quieres ser mi San Valentín? 💖";
const textoEscrito = ref("");
let indiceTexto = 0;
const respuestaSi = ref(false);

const respuestasMezcladas = ref([]);
const indiceNoActual = ref(0);

// Función para mezclar un array aleatoriamente (Fisher-Yates)
const mezclarArray = (array) => {
    let mezclado = [...array];
    for (let i = mezclado.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [mezclado[i], mezclado[j]] = [mezclado[j], mezclado[i]];
    }
    return mezclado;
};

onMounted(() => {
    // Mezclar respuestas al cargar la página
    respuestasMezcladas.value = mezclarArray(respuestasNo);

    // Efecto de escritura
    const efectoEscritura = setInterval(() => {
        if (indiceTexto < textoCompleto.length) {
            textoEscrito.value += textoCompleto[indiceTexto];
            indiceTexto++;
        } else {
            clearInterval(efectoEscritura);
        }
    }, 100);
});

const respuesta = async (respuesta) => {
    console.log(respuesta);
    mostrarMensaje.value = false; // Ocultar mensaje anterior antes de cambiarlo

    await nextTick(); // Esperar a que Vue actualice el DOM

    if (respuesta === "si") {
        respuestaSi.value = true;
        mensaje.value = "💞 Nuestro San Valentín será increíble. 💞";
        gif.value = gifAceptar.value;
    } else {
        // Seleccionar mensaje en orden sin repetir
        mensaje.value = respuestasMezcladas.value[indiceNoActual.value].texto;
        gif.value = respuestasMezcladas.value[indiceNoActual.value].gif;

        // Avanzar en la lista y reiniciar si se llega al final
        indiceNoActual.value++;
        if (indiceNoActual.value >= respuestasMezcladas.value.length) {
            respuestasMezcladas.value = mezclarArray(respuestasNo);
            indiceNoActual.value = 0;
        }
    }

    await nextTick(); // Asegurar que el cambio en el mensaje se refleje

    mostrarMensaje.value = true; // Mostrar el nuevo mensaje
};

const formatearNombre = computed(() => {
    if (!props.param) return "";

    return props.param
        .split("-")
        .map(
            (palabra) =>
                palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase()
        ) // Capitalizar
        .join(" "); // Unir con espacio
});
</script>

<template>
    <AppLayout>
        <Fiesta :respuesta="respuestaSi" />

        <main class="min-h-screen fondo flex items-center justify-center">
            <div class="xl:pr-130 select-none">
                <div
                    class="xl:w-md bg-white/60 xl:bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-10 m-3 shadow-2xl shadow-pink-500/50 text-center">
                    <div
                        class="absolute top-[-16px] left-6 bg-gray-300 text-black font-semibold py-1 px-4 rounded-full text-lg shadow-lg">
                        <i>{{ formatearNombre }}</i>
                        <span
                            class="absolute top-[-10px] right-[-8px] animate-bounce"
                            >🥰</span
                        >
                    </div>
                    <h1
                        class="text-2xl md:text-3xl font-bold text-pink-600 animate-pulse h-20 mx-10">
                        <span v-if="!respuestaSi">{{ textoEscrito }}</span>
                        <span v-else>Sabía que dirías que Sí 🥰</span>
                    </h1>

                    <Gifs :gif="gif" />

                    <transition name="fade">
                        <p
                            v-if="mostrarMensaje"
                            :class="{ 'animate-bounce': respuestaSi }"
                            class="mt-10 text-lg font-semibold text-gray-700">
                            {{ mensaje }}
                        </p>
                    </transition>

                    <!-- Componente de botones -->
                    <BotonesRespuesta
                        v-if="!respuestaSi"
                        :respuesta="respuesta" />

                    <p v-else class="mt-2 text-lg font-semibold text-pink-600">
                        <i>Gracias por aceptar 💘</i>
                    </p>
                </div>
            </div>
           <GitHub />
        </main>
    </AppLayout>
</template>

<style scoped>
.fondo {
    background-color: #E9E9E9;
    background-image: url("/img/bg_1.webp");
    background-size: cover;
    background-position: right;
    background-repeat: no-repeat;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
