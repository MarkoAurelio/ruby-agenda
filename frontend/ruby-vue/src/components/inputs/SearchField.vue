<template>
  <div
    v-if="title"
    class="text-weight-medium"
  >
    {{ title }}
  </div>
  <q-input
    v-bind="$attrs"
    :model-value="modelValue"
    type="search"
    outlined
    bg-color="white"
    class="full-width q-py-md"
    @update:model-value="emitSelect"
  >
    <template #prepend>
      <q-icon
        class="q-mx-xs"
        name="fa-solid fa-magnifying-glass"
        size="16px"
      />
    </template>
    <template
      v-if="modelValue"
      #append
    >
      <q-icon
        name="fa-solid fa-xmark"
        size="16px"
        class="cursor-pointer"
        @click="clearSearch"
      />
    </template>
  </q-input>
</template>

<script>
export default {
  name: 'SearchField',
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      default: null,
    },
    modelValue: {
      type: String,
      default: null,
    },
  },
  emits: ['update:model-value'],
  methods: {
    emitSelect(e) {
      this.$emit('update:model-value', e);
    },
    clearSearch() {
      this.$emit('update:model-value', '');
    },
  },
};
</script>

<style lang="scss" scoped>
  .q-icon {
    color: grey
  }
</style>
