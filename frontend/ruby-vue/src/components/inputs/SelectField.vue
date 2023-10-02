<template>
  <div
    v-if="title"
    class="text-weight-medium"
  >
    {{ title }}
  </div>
  <q-select
    v-bind="$attrs"
    class="q-pt-sm"
    :model-value="modelValue"
    :options="filteredOptions"
    bg-color="white"
    dropdown-icon="fa-solid fa-chevron-down"
    clear-icon="fa-solid fa-xmark"
    :use-input="autocomplete"
    outlined
    input-debounce="0"
    no-error-icon
    @update:model-value="emitSelect"
  >
    <template #no-option>
      <q-item>
        <q-item-section class="text-primary-medium-grey">
          Nenhum resultado.
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
export default {
  name: 'SelectField',
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: [Object, Array],
      default: null,
    },
  },
  emits: ['update:model-value'],
  data() {
    return {
      filteredOptions: this.options,
    };
  },
  methods: {
    emitSelect(e) {
      this.$emit('update:model-value', e);
    },
  },
};
</script>

<style lang="scss" scoped>
  :deep(.q-field__append) {
    .q-icon{
      font-size: 14px !important;
    }
  }
</style>
