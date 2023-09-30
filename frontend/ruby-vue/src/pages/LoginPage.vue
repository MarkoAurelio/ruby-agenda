<template>
  <q-layout view="lhh lpR lfr">
    <q-page-container>
      <q-page class="flex justify-center">
        <div class="fit container">
          <q-card>
            <q-card-section>
              <div class="column items-center">
                <q-img
                  width="120px"
                  src="~assets/icon-logo.svg"
                />
              </div>
            </q-card-section>
            <q-card-section>
              <form class="content">
                <text-field
                  v-model="auth.email"
                  :title="$t('EMAIL')"
                  :placeholder="$t('EMAIL_EXAMPLE')"
                  type="email"
                  autocomplete="username"
                  :rules="[validEmail]"
                />
                <password-field
                  v-model="auth.password"
                  class="q-pt-xs"
                  :title="$t('PASSWORD')"
                  :placeholder="$t('TYPE_PASSWORD')"
                  :autocomplete="'current-password'"
                />
                <div
                  class="footer"
                >
                  <q-btn
                    class="login-btn"
                    color="primary"
                    :label="$t('ENTER')"
                    unelevated
                    :disable="loginDisabled"
                    @click="doLogin"
                  />
                  <div
                    class="create-btn non-selectable cursor-pointer"
                    @click="handleCreateDialog"
                  >
                    {{ $t('CREATE_ACCOUNT') }}
                  </div>
                </div>
              </form>
            </q-card-section>
          </q-card>
        </div>
      </q-page>
      <bottom-dialog
        :is-open="dialogOpen"
        :disable-btn="createDisabled"
        @close="handleCreateDialog"
        @submit="createAccount"
      >
        <div>
          <div class="text-center">
            <div class="dialog-title">
              {{ $t('CREATE_ACCOUNT') }}
            </div>
          </div>
          <form class="content">
            <text-field
              v-model="account.name"
              class="q-pb-md"
              :title="$t('FULL_NAME')"
              :placeholder="$t('INSERT_NAME')"
              type="text"
              :autocomplete="'new-password'"
            />
            <text-field
              v-model="account.email"
              :title="$t('EMAIL')"
              :placeholder="$t('EMAIL_EXAMPLE')"
              type="email"
              :rules="[validEmail]"
              :autocomplete="'new-password'"
            />
            <password-field
              v-model="account.password"
              :title="$t('PASSWORD')"
              :placeholder="$t('TYPE_PASSWORD')"
              :autocomplete="'new-password'"
            />
          </form>
        </div>
      </bottom-dialog>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapStores } from 'pinia';
import PasswordField from 'components/inputs/PasswordField.vue';
import TextField from 'components/inputs/TextField.vue';
import BottomDialog from 'components/BottomDialog.vue';
import { useAuthStore } from '../stores/auth';
import Rules, { emailValidator } from '../utils/rules';

export default {
  name: 'LoginPage',
  components: { PasswordField, TextField, BottomDialog },
  data() {
    return {
      auth: {
        email: 'marko@dev.com',
        password: 'abc@123',
      },
      account: {
        name: '',
        email: '',
        password: '',
      },
      dialogOpen: false,
    };
  },
  computed: {
    ...mapStores(useAuthStore),
    isEmailValid() {
      return emailValidator(this.auth.email) || emailValidator(this.account.email);
    },
    loginDisabled() {
      return !(this.isEmailValid && !!this.auth.password);
    },
    createDisabled() {
      return !(this.isEmailValid && !!this.account.password && !!this.account.name);
    },
  },
  methods: {
    emailValidator,
    validEmail: Rules.validEmail,
    handleCreateDialog() {
      this.dialogOpen = !this.dialogOpen;
    },
    async doLogin() {
      await this.authStore.login(this.auth);
    },
    async createAccount() {
      await this.authStore.create(this.account);
    },
  },
};
</script>

<style lang="scss" scoped>
  .container {
    max-width: 500px;
    padding-top: 60px;
  }
  .content {
    width: 100%;
    padding-top: 60px;
  }
  .footer {
    padding-top: 42px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .login-btn {
    width: 200px;
  }
  .create-btn {
    padding-top: 20px;
    text-decoration: underline;
  }
  .dialog-title {
    font-size: 20px;
    font-weight: 700;
    margin-top: 30px;
    margin-bottom: 20px;
  }
</style>
