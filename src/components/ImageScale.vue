<template>
    <div class="scale-container">
        <header></header>
        <main class="scale-image">

        </main>
        <footer></footer>
    </div>
</template>
<script setup lang='ts'>
</script>
<style lang='scss' scoped>
.scale-container {
    width: 550px;
    height: 700px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.scale-image {
    width: 100%;
    height: 550px;
    background-color: grey;
}
</style>