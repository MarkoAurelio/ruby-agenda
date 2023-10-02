<template>
  <div
    v-if="title"
    class="text-weight-medium row items-center"
  >
    {{ title }}
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
        :name="showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"
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
</style>
