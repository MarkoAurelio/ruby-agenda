<template>
  <q-dialog
    v-model="open"
    position="bottom"
    :persistent="!isSuccess"
    class="full-width q-px-none bottom-dialog"
  >
    <q-card
      class="full-width"
    >
      <q-card-section
        v-touch-swipe.mouse.down="isSuccess ? emitClose : undefined"
        class="flex justify-end non-selectable q-pa-none close-section"
      >
        <q-icon
          name="fa-light fa-xmark"
          class="cursor-pointer"
          size="20px"
          @click="emitClose"
          color="black"
        />
      </q-card-section>
      <q-card-section class="q-pa-none">
        <slot>
          <div
            class="column items-center no-wrap q-pt-none"
          >
            <div class="q-pb-md">
              <q-img
                width="80px"
                :src="statusIcon"
              />
            </div>
            <div class="q-py-md text-weight-bold text-h6 text-center">
              {{ statusMessage }}
            </div>
          </div>
        </slot>
      </q-card-section>
      <q-card-actions
        v-if="!btnHidden"
        class="full-width justify-around q-pt-lg q-pb-lg"
      >
        <q-btn
          class="action"
          :color="btnColor"
          :label="isSuccess ? $t('OK') : $t('CONFIRM')"
          unelevated
          :outline="!!actionStatus"
          :disable="disableBtn"
          @click="emitSubmit"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ResponseStatus } from '../utils/consts';

export default {
  name: 'BottomDialog',
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    negativeAction: {
      type: Boolean,
      required: false,
      default: false,
    },
    actionStatus: {
      type: String,
      required: false,
      default: '',
    },
    statusMessage: {
      type: String,
      required: false,
      default: '',
    },
    disableBtn: {
      type: Boolean,
      required: false,
    },
    btnHidden: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['close', 'submit'],
  computed: {
    btnColor() {
      const actionColor = this.negativeAction ? 'red' : 'primary';
      return this.actionStatus ? 'secondary' : actionColor;
    },
    statusIcon() {
      switch (this.actionStatus) {
        case ResponseStatus.WARNING:
          return 'images/warning.svg';
        case ResponseStatus.ERROR:
          return 'images/error.svg';
        case ResponseStatus.SUCCESS:
        default:
          return 'images/success.svg';
      }
    },
    open: {
      get() {
        return this.isOpen;
      },
      set() {
        this.emitClose();
      },
    },
    isSuccess() {
      return this.actionStatus === ResponseStatus.SUCCESS;
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
