<script setup>
import { onMounted, onUnmounted } from "vue";

const titulo = "¿Quieres ser mi San Valentín? 💖";
const alsalir = "No te vayas 🥺";

const handleVisibilityChange = () => {
    document.title = document.hidden ? alsalir : titulo;
};

onMounted(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);
});

onUnmounted(() => {
    document.removeEventListener("visibilitychange", handleVisibilityChange);
});
</script>

<template>
    <div>
        <slot />
    </div>
</template>
