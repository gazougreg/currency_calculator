<template>
<!-- a component for all the pop up forms -->
    <div class="modal-slot-mask" :class="`modal-slot-mask--${modalId}`" v-if="isVisible">
        <div class="modal-slot">
            <div class="modal-slot-close">
                <button class="modal-slot-close__button" @click="hideContent">X</button>
            </div>
            <div class="modal-slot__body">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ModalSlot',
    props: {
        modalId: {
            type: String,
        },
    },
    data() {
        return {
            isVisible: false,
        };
    },
    methods: {
        showContent() {
            console.log('show content');
            this.isVisible = true;
        },
        hideContent() {
            this.isVisible = false;
        }
    },
    created() {
        this.$eventHub.$on(`open-${this.modalId}-modal`, this.showContent);
        this.$eventHub.$on(`close-${this.modalId}-modal`, this.hideContent);
    },
    beforeDestroy() {
        this.$eventHub.$off(`open-${this.modalId}-modal`);
        this.$eventHub.$off(`close-${this.modalId}-modal`);
    }
}
</script>

<style lang="scss" scoped>
.modal-slot-mask {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.4);
    display: flex;
    justify-content: center;
    align-items: center;
}
.modal-slot {
    background: white;
    width: 25rem;
    border-radius: 10px;

    &-close__button {
        text-align: center;
        height: 22px;
        width: 22px;
        float: right;
        padding: 4px;
        margin:5px;
        border-radius: 50%;
        background-color: rgba(220, 37, 20, 0.589);
        color: white;
        border: none;
    }
}
</style>
