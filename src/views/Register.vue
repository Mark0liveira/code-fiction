<template>
  <div class="container align-items-center">
    <div class="row d-flex justify-content-center">
      <!--Alert erro-->
      <div v-show="showMessage" class="alert alert-danger col-6" role="alert">
        {{ message }}
      </div>
    </div>
    <div class="row d-flex justify-content-center">
      <!--Card-->
      <div class="card bg-dark col-6">
        <div class="card-body text-light">
          <button type="button" class="btn btn-primary mb-3">
            <router-link to="/login" class="text-light">Voltar</router-link>
          </button>
          <h5 class="card-title mb-4 mt-2">Cadastro</h5>
          <!--Formulário-->
          <form>
            <!--Usuario-->
            <div class="form-group">
              <label>Usuário</label>
              <input
                type="text"
                class="form-control"
                aria-describedby="userHelp"
                placeholder="Usuário"
                v-model="user"
                @keyup.enter="signin(user, password, repeatPassword)"
              />
            </div>
            <!--Senha-->
            <div class="form-group">
              <label>Senha</label>
              <input
                type="password"
                class="form-control"
                placeholder="Senha"
                v-model="password"
                @keyup.enter="signin(user, password, repeatPassword)"
              />
            </div>
            <!--Repetir senha-->
            <div class="form-group">
              <label>Repetir senha</label>
              <input
                type="password"
                class="form-control"
                placeholder="Senha"
                v-model="repeatPassword"
                @keyup.enter="signin(user, password, repeatPassword)"
              />
            </div>
            <!--Button cadastrar-->
            <div class="d-flex justify-content-center align-self-center">
              <button
                @click="signin(user, password, repeatPassword)"
                type="button"
                class="btn btn-primary"
              >
                Cadastrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.container {
  margin-top: 25vh;
}
</style>

<script lang="ts">
import router from "@/router";
import { Options, Vue } from "vue-class-component";

@Options({
  data() {
    return {
      showMessage: false,
      message: "",
    };
  },
  methods: {
    signin(user: string, password: string, repeatPassword: string): void {
      if (password === repeatPassword) {
        this.save(user, password);
        router.push("/login");
      } else {
        this.showMessage = true;
        this.message = "Favor preencher corretamente a senha!";
      }
    },
    save(user: string, password: string) {
      localStorage.setItem("user", JSON.stringify({ user, password }));
    },
  },
})
export default class Home extends Vue {}
</script>