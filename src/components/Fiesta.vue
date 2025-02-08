<script setup>
import { watch } from "vue";
import confetti from "canvas-confetti";

const props = defineProps({
    respuesta: Boolean, // Se recibe como prop
});

const lanzarConfetti = () => {
    const duration = 10 * 1000; // Duración de 10 segundos
    const endTime = Date.now() + duration;
    const colors = ["#ff4081", "#ff0000", "#ff69b4", "#ff1493"];
    
    const interval = setInterval(() => {
        if (Date.now() >= endTime) {
            clearInterval(interval); // Detener la animación después del tiempo definido
            return;
        }

        confetti({
            particleCount: 10,
            angle: 100,
            spread: 120,
            origin: { y: 0 },
            colors: colors,
            shapes: ["square", "circle"],
        });
        confetti({
            particleCount: 5,
            angle: 70,
            spread: 40,
            origin: { x: 0 },
            colors: colors,
            shapes: ["square", "circle"],
        });
        confetti({
            particleCount: 7,
            angle: 90,
            spread: 500,
            origin: { x: 1 },
            colors: colors,
            shapes: ["square", "circle"],
        });
        confetti({
            particleCount: 5,
            spread: 120,
            origin: { y: 0.6 }, // Aparece desde el centro
            colors: colors,
            shapes: ["square", "circle"],
        });
    }, 100); // Lanzar confetti cada 200ms
};

watch(
    () => props.respuesta,
    (respuesta) => {
        if (respuesta) {
            lanzarConfetti();
        }
    }
);
</script>

<template>
    <div></div>
</template>
