<template>
  <div class="container mt-5">
    <div class="col-12 d-flex justify-content-center">
      <h1>TODO LIST</h1>
    </div>
    <!--Table-->
    <div class="col-12 d-flex justify-content-center">
      <table class="table table-dark table-striped">
        <!--Cabeçalho table-->
        <thead>
          <tr>
            <th scope="col">Título</th>
            <th scope="col">Data</th>
            <th scope="col">Descrição</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <!--Body table-->
        <tbody v-for="task in tasks" :key="task">
          <tr>
            <td scope="row">{{ task.title }}</td>
            <td>{{ task.data }}</td>
            <td>{{ task.description }}</td>
            <td>
              <button
                type="button"
                class="btn btn-danger mr-2"
                @click="remove(task)"
              >
                Remover
              </button>
              <button
                type="button"
                class="btn btn-warning"
                @click="update(task)"
              >
                Atualizar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="container d-flex justify-content-end">
      <button type="button" class="btn btn-primary" @click="showAlert">
        Adicionar
      </button>
    </div>

    <!-- Modal -->
  </div>
</template>

<style>
pre.teste {
  padding: 20px;
  white-space: pre-wrap;
}
</style>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { TaskDto } from "../dtos/taskDto";
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onActivated,
  onDeactivated,
  onErrorCaptured,
} from "vue";

@Options({
  data() {
    return {
      tasks: [],
    };
  },
  setup() {
    onMounted(() => {});
  },
  methods: {
    showAlert(): void {
      this.$swal
        .mixin({
          input: "text",
          confirmButtonText: "Próximo &rarr;",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          progressSteps: ["1", "2", "3"],
        })
        .queue([
          {
            title: "Título",
            text: "O que vamos fazer?",
          },
          {
            title: "Data",
            text: "Quando vamos realizar esta tarefa?",
          },
          {
            title: "Descrição",
            text:
              "Caso queira, você pode colocar uma descrição para esta tarefa ;)",
          },
        ])
        .then((result: any) => {
          if (result.value) {
            const item = result.value;
            this.$swal
              .fire({
                title: "Tudo pronto!",
                html: `
                  <p class="teste">Título:${result.value[0]}</p>
                  <p class="teste">Data:${result.value[1]}</p>
                  <p class="teste">Descrição:${result.value[2]}</p>
                `,
                showDenyButton: true,
                confirmButtonText: `Salvar`,
                denyButtonText: `Não salvar`,
                inputValue: "teste",
              })
              .then((result: any) => {
                if (result.isConfirmed) {
                  this.add(item);
                } else if (result.isDenied) {
                  return;
                }
              });
          }
        });
    },
    add(item: any): void {
      this.tasks.push(new TaskDto(item[0], item[1], item[2]));
      this.save();
    },
    load() {
      const tasks = localStorage.getItem("tasks");

      if (tasks) {
        this.tasks = JSON.parse(tasks);
      } else {
        this.tasks = [];
      }

      this.save();
    },
    save(): void {
      const task = JSON.stringify(this.tasks);
      localStorage.setItem("tasks", task);
    },
    remove(task: TaskDto): void {
      const index = this.tasks.indexOf(task);

      if (index !== -1) {
        this.tasks.splice(index, 1);
      }

      this.save();
    },
    update(task: TaskDto) {
      this.$swal
        .mixin({
          input: "text",
          confirmButtonText: "Próximo &rarr;",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          progressSteps: ["1", "2", "3"],
        })
        .queue([
          {
            title: "Título",
            text: "O que vamos fazer?",
            inputValue: task.title,
          },
          {
            title: "Data",
            text: "Quando vamos realizar esta tarefa?",
            inputValue: task.data,
          },
          {
            title: "Descrição",
            text:
              "Caso queira, você pode colocar uma descrição para esta tarefa ;)",
            inputValue: task.description,
          },
        ])
        .then((result: any) => {
          if (result.value) {
            const item = result.value;
            this.$swal
              .fire({
                title: "Tudo pronto!",
                html: `
                  <p class="teste">Título:${result.value[0]}</p>
                  <p class="teste">Data:${result.value[1]}</p>
                  <p class="teste">Descrição:${result.value[2]}</p>
                `,
                showDenyButton: true,
                confirmButtonText: `Salvar`,
                denyButtonText: `Não salvar`,
                inputValue: "teste",
              })
              .then((result: any) => {
                if (result.isConfirmed) {
                  const index = this.tasks.indexOf(task);
                  this.tasks[index] = new TaskDto(item[0], item[1], item[2]);
                  this.save();
                } else if (result.isDenied) {
                  return;
                }
              });
          }
        });
    },
  },
})
export default class Home extends Vue {}
</script>
