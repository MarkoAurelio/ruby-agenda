<template>
  <q-dialog
    v-model="open"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card class="bg-red text-white" style="width: 300px">
      <q-card-section>
        <div class="text-h6">Confirmar exclusão</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Tem certeza que deseja excluir? Esta ação não pode ser desfeita.
      </q-card-section>

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
  name: 'DeleteContactDialog',
  props: {
    isOpen: {
      type: Boolean,
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
