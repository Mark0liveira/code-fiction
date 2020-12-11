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
          <h5 class="card-title mb-4 mt-2">CODE-FICTION</h5>
          <!--Formulário-->
          <form>
            <!--Usuário-->
            <div class="form-group">
              <label>Usuário</label>
              <input
                type="text"
                class="form-control"
                aria-describedby="userHelp"
                placeholder="Usuário"
                v-model="user"
                @keyup.enter="signin(user, password)"
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
                @keyup.enter="signin(user, password)"
              />
            </div>
            <div class="form-group d-flex justify-content-end">
              <!--Cadastrar-->
              <label class="form-check-label">
                <router-link to="/register"
                  >Não possui cadastro?</router-link
                ></label
              >
            </div>
            <!--Button login-->
            <div class="d-flex justify-content-center align-self-center">
              <button
                @click="signin(user, password)"
                type="button"
                class="btn btn-primary"
              >
                Entrar
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
    signin(user: string, password: string): void {
      if (user || password) {
        const newUser = localStorage.getItem("user")
          ? localStorage.getItem("user")
          : null;
        if (this.user === "admin" && this.password === "admin") {
          router.push("home");
        } else if (newUser) {
          if (newUser[0] === user && newUser[1] === password) {
            router.push("home");
          }
        } else {
          this.showMessage = true;
          this.message = "Usuário ou senha inválidos!";
          return;
        }
      } else {
        this.showMessage = true;
        this.message = "Favor preencher todos os campos!";
      }
    },
  },
})
export default class Home extends Vue {}
</script>