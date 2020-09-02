<template>
    <transition name="slide-fade">
        <slot></slot>
    </transition>   
</template>

<style lang="scss">

.slide-fade-enter {
  transform: translateX(-100px);
  opacity: 0;
}

.slide-fade-to {
  transform: translateX(0);
  opacity: 1;
}

.slide-fade-enter-active {
  transition: all .3s;
}

.slide-fade-leave-active {
  transition: all .3s;
}



.slide-fade-leave-to {
  width: 0;
  opacity: 0;
}
</style>