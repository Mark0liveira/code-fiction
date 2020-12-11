<template>
  <div class="d-flex justify-content-end"></div>
  <form class="form-inline d-flex justify-content-end mt-2 mb-2">
    <input
      class="form-control mr-sm-2"
      type="search"
      placeholder="Pesquisar"
      aria-label="Search"
      v-model="val"
      @keyup="search(val)"
    />
  </form>
</template>

<script lang="ts">
import router from "@/router";
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    msg: String,
    tasks: [],
  },
  methods: {
    search(val: string): void {
      console.log(val);
      this.tasks = val
        ? this.tasks.filter(
            (task: any) =>
              task.title.includes(val) ||
              task.data.includes(val) ||
              task.description.includes(val)
          )
        : this.tasks;
    },
  },
})
export default class Search extends Vue {
  msg!: string;
}
</script>