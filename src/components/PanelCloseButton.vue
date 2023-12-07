<template>
    <div class="panelButton " :class="panelButtonIcon" @mouseover="togglePanelButtonIcon('over')"
        @mouseleave="togglePanelButtonIcon('leave')" 
    />
</template>
<script setup lang='ts'>
const panelButtonIcon = ref('i-carbon-close-outline')
const togglePanelButtonIcon = (value: string) => {
    if (value === 'over')
        panelButtonIcon.value = 'i-carbon-close-filled'
    else if (value === 'leave')
        panelButtonIcon.value = 'i-carbon-close-outline'
}

</script>
<style lang='scss' scoped>
.panelButton {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 1.5rem;
    cursor: pointer;
}
</style>