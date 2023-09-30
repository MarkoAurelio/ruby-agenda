<template>
  <div
    v-if="title"
    class="text-weight-medium"
  >
    {{ title }}
  </div>
  <q-input
    v-bind="$attrs"
    class="q-pt-sm"
    :model-value="modelValue"
    outlined
    no-error-icon
    bg-color="white"
    @update:model-value="emitContent"
  />
</template>

<script>
export default {
  name: 'TextField',
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
  },
  emits: ['update:model-value'],
  methods: {
    emitContent(e) {
      this.$emit('update:model-value', e);
    },
  },
};
</script>
