<template>
  <div
    v-if="title"
    class="text-weight-medium row items-center"
  >
    {{ title }}
    <q-icon
      v-if="tooltip"
      name="fa-light fa-circle-info"
      class="cursor-pointer q-pl-xs"
      size="16px"
      :color="!isPasswordValid ? 'red': 'primary-dark-grey'"
      @click="handlePasswordDialog"
    />
  </div>
  <q-input
    v-bind="$attrs"
    class="q-pt-sm"
    :model-value="modelValue"
    :type="showPassword ? 'text' : 'password'"
    outlined
    :autocomplete="autocomplete"
    no-error-icon
    bg-color="white"
    @update:model-value="emitContent"
  >
    <template #append>
      <q-icon
        v-if="modelValue"
        :name="showPassword ? 'fa-light fa-eye-slash' : 'fa-light fa-eye'"
        class="cursor-pointer"
        size="16px"
        @click="showPassword = !showPassword"
      />
    </template>
  </q-input>
</template>

<script>
import { passwordValidator } from '../../utils/rules';

export default {
  name: 'PasswordField',
  inheritAttrs: false,
  props: {
    modelValue: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    tooltip: {
      type: Boolean,
      default: false,
    },
    autocomplete: {
      type: String,
      default: 'new-password',
    },
  },
  emits: ['update:model-value'],
  data() {
    return {
      dialogOpen: false,
      showPassword: false,
    };
  },
  computed: {
    isPasswordValid() {
      if (!this.modelValue) return true;
      return passwordValidator(this.modelValue);
    },
  },
  methods: {
    passwordValidator,
    emitContent(e) {
      this.$emit('update:model-value', e);
    },
    handlePasswordDialog() {
      this.dialogOpen = !this.dialogOpen;
    },
  },
};
</script>

<style lang="scss" scoped>
  .title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 20px;
    padding-top: 10px;
  }
  .list > * {
    padding-top: 4px;
  }
</style>
