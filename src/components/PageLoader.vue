<template>
    <div class="c-page-loader">
        <div class="c-page-loader__text">{{ text }}</div>
        <div class="c-page-loader__dots">
            <span class="c-page-loader__dot" ref="dot1"><font-awesome-icon :icon="['fa', 'circle']" /></span>
            <span class="c-page-loader__dot" ref="dot2"><font-awesome-icon :icon="['fa', 'circle']" /></span>
            <span class="c-page-loader__dot" ref="dot3"><font-awesome-icon :icon="['fa', 'circle']" /></span>
            <span class="c-page-loader__dot" ref="dot4"><font-awesome-icon :icon="['fa', 'circle']" /></span>
            <span class="c-page-loader__dot" ref="dot5"><font-awesome-icon :icon="['fa', 'circle']" /></span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PageLoader',
    props: [ 'text' ],
    data() {
        return {
            show: false,
            timer: null,
            counter: 1,
            dotNormalSize: ".5rem",
            dotBigSize: "1rem",
            speed: 500,
            dots: [],
            currentDot: null
        }
    },
    mounted() {

        this.dots = [
            this.$refs.dot1,
            this.$refs.dot2,
            this.$refs.dot3,
            this.$refs.dot4,
            this.$refs.dot5
        ];

        this.pulse();
    },
    methods: {
        pulse() {
            let state = 1;
            let counter = 0;
            let initialSize = .6
            let currentSize = initialSize;
            let maxSize = .8;
            let vel = 0;
            let accel = .05;

            this.dots.forEach( (dot) => {
                dot.style.fontSize = initialSize + 'rem';
            })

            window.setInterval( () => {

                vel += accel * state;

                currentSize += vel;

                if (state == 1 && currentSize >= maxSize) {
                    currentSize = maxSize;
                    state = -1;
                }

                if (state == -1 && currentSize <= initialSize) {
                    currentSize = initialSize;
                    this.dots[counter].style.fontSize = currentSize + "rem";
                    counter++ ;
                    currentSize = initialSize;
                    state = 1;
                    vel = 0;

                    if (counter >= this.dots.length) counter = 0;
                    return;
                }

                this.dots[counter].style.fontSize = currentSize + "rem";
            }, 100);
        }
    },
    beforeDestroy() {
        window.clearInterval(this.timer);
    }
}
</script>

<style lang="scss" scoped>
.c-page-loader {
    width: fit-content;
    margin: auto;
    margin-top: 20%;
    letter-spacing: .15rem;
    min-height: 90vh;
    

    &__text {
        margin-bottom: .2rem;
    }

    &__dots {
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    &__dot {
        color: #2778dc;
        margin-right: .5rem;
    }
}



</style>