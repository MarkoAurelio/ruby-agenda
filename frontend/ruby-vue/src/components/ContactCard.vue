<template>
  <q-card
    v-ripple
    class="full-width q-mb-xs non-selectable"
    @click="editContact"
  >
    <q-card-section
      class="card-content row q-pa-none full-height no-wrap"
    >
      <div class="content-col">
        <div class="contact-name ellipsis-2-lines">
          {{ name }}
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'ContactCard',
  components: { },
  props: {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    cpf: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
    };
  },
  computed: {
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
  .card-content {
    padding: 10px 10px 0px 10px;
  }

  .content-col {
    padding-left: 10px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    flex-grow: 1;
    color: grey;
    line-height: 100%;
    font-size: 14px;
    margin-bottom: 6px;
  }

  .contact-name {
    color: black;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    margin-bottom: 16px;
  }
</style>
