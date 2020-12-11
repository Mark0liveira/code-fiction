<template>
  <nav class="navbar navbar-light bg-dark">
    <a class="navbar-brand text-light">CODE-FICTION</a>
    <button
      @click="logout"
      class="btn btn-outline-dark my-2 my-sm-0 text-light"
    >
      Sair
    </button>
  </nav>
</template>

<script lang="ts">
import router from "@/router";
import { Options, Vue } from "vue-class-component";

@Options({
  methods: {
    logout(): void {
      localStorage.removeItem("logged");
      router.push("login");
    },
  },
})
export default class Navbar extends Vue {}
</script>
