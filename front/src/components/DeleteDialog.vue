<template>
  <q-dialog
    v-model="open"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card class="bg-red text-white" style="width: 300px">
      <q-card-section>
        <div class="text-h6">{{ title }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ warnMessage }}
      </q-card-section>
      <slot />
      <q-card-actions align="right" class="bg-white ">
        <q-btn flat label="Cancelar" @click="emitClose" color="primary"/>
        <q-btn
          label="Confirmar"
          flat
          color="red"
          @click="emitSubmit"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'DeleteDialog',
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    warnMessage: {
      type: String,
      required: true,
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
      this.emitClose();
    },
  },
};
</script>
