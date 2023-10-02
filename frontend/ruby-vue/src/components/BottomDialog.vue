<template>
  <q-dialog
    v-model="open"
    position="bottom"
    class="full-width q-px-none bottom-dialog"
  >
    <q-card
      class="full-width"
    >
      <q-card-section
        class="flex justify-end non-selectable q-pa-none close-section"
      >
        <q-icon
          name="fa-solid fa-xmark"
          class="cursor-pointer"
          size="20px"
          @click="emitClose"
          color="black"
        />
      </q-card-section>
      <q-card-section class="q-pa-none">
        <slot />
      </q-card-section>
      <q-card-actions
        v-if="!btnHidden"
        class="full-width justify-around q-pt-lg q-pb-lg"
      >
        <q-btn
          class="action"
          :color="'primary'"
          :label="'Confirmar'"
          unelevated
          :disable="disableBtn"
          @click="emitSubmit"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'BottomDialog',
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    disableBtn: {
      type: Boolean,
      required: false,
    },
  },
  emits: ['close', 'submit'],
  computed: {
    open: {
      get() {
        return this.isOpen;
      },
      set() {
        this.emitClose();
      },
    },
  },
  methods: {
    emitClose() {
      this.$emit('close');
    },
    emitSubmit() {
      this.$emit('submit');
    },
  },
};
</script>

<style lang="scss" scoped>
  .q-card {
    border-radius: 36px 36px 0 0;
    display: flex;
    flex-direction: column;
    padding: 0 30px 0 30px;
  }

  .close-section {
    padding-top: 30px;
  }

  .action {
    width: 200px;
  }
</style>
