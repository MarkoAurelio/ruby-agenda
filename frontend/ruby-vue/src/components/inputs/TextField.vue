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
  >
    <template v-if="searchable && modelValue" #append>
      <q-icon
        class="q-mx-xs cursor-pointer"
        name="fa-light fa-magnifying-glass"
        size="16px"
        @click="emitSearch"
      />
    </template>
  </q-input>
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
    searchable: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:model-value', 'search'],
  methods: {
    emitContent(e) {
      this.$emit('update:model-value', e);
    },
    emitSearch() {
      this.$emit('search');
    },
  },
};
</script>
