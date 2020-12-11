<template>
  <Navbar />
  <div class="container mt-5">
    <!--Title-->
    <div class="col-12 d-flex justify-content-center">
      <h1>MINHAS TAREFAS</h1>
    </div>
    <!--Search-->
    <form class="form-inline d-flex justify-content-end mt-3 mb-3">
      <input
        class="form-control mr-sm-2"
        type="text"
        placeholder="Pesquisar"
        aria-label="Search"
        v-model="val"
        @keyup="search(val)"
      />
    </form>
    <!--Table-->
    <div>
      <table class="table table-dark table-striped table-responsive-sm">
        <!--Cabeçalho table-->
        <thead>
          <tr>
            <th scope="col">Título</th>
            <th scope="col">Data</th>
            <th scope="col-2">Descrição</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <!--Body table-->
        <tbody v-for="task in tasks" :key="task">
          <tr>
            <td scope="col">{{ task.title }}</td>
            <td scope="col">{{ task.data }}</td>
            <td scope="col-4">{{ task.description }}</td>
            <td scope="col">
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
        <!--Zero results-->
        <tbody class="d-flex justify-content-center" v-if="tasks.length === 0">
          <p class="text-center mt-3">Nenhum resultado encontrado!</p>
        </tbody>
      </table>
      <!--Button adicionar-->
      <div class="d-flex justify-content-end">
        <button type="button" class="btn btn-primary" @click="create">
          Adicionar
        </button>
      </div>
    </div>

    <!-- Modal -->
  </div>
</template>

<style>
pre.modal-task {
  padding: 20px;
  white-space: pre-wrap;
}
</style>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { TaskDto } from "../dtos/taskDto";
import router from "@/router";
import Navbar from "@/components/Nav.vue";
import Search from "@/components/Search.vue";

@Options({
  components: {
    Navbar,
    Search,
  },
  data() {
    return {
      tasks: [],
    };
  },
  // Load screen
  beforeMount() {
    this.checkIfLogged();
    this.load();
  },
  computed: {},
  methods: {
    create(): void {
      this.buildSweetAlert();
    },
    add(item: any): void {
      this.tasks.push(new TaskDto(item[0], item[1], item[2]));
      this.save();
    },
    load(): any {
      const tasks = localStorage.getItem("tasks");

      if (tasks) {
        this.tasks = JSON.parse(tasks);
      } else {
        this.tasks = [];
      }

      this.save();

      return "";
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
    update(task: TaskDto): void {
      this.buildSweetAlert(task);
    },
    buildSweetAlert(task?: TaskDto): void {
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
            title: "Título*",
            text: "O que vamos fazer?",
            inputValue: task ? task.title : "",
            inputValidator: (value: any) => {
              if (!value) {
                return "Título é obrigatório!";
              }
            },
            inputAttributes: {
              maxlength: 30,
              autocapitalize: "off",
              autocorrect: "off",
            },
          },
          {
            title: "Data*",
            text: "Quando vamos realizar esta tarefa?",
            inputValue: task ? task.data : "",
            inputValidator: (value: any) => {
              if (!value) {
                return "Data é obrigatório!";
              }
              //eslint-disable-next-line
              const regex = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
              if (!regex.test(value)) {
                return "Data com formato incorreto, favor inserir uma data válida, ex: dd/mm/aaaa ou dd-mm-aaaa";
              }
            },
          },
          {
            title: "Descrição",
            text:
              "Caso queira, você pode colocar uma descrição para esta tarefa ;)",
            inputValue: task ? task.description : "",
            inputAttributes: {
              maxlength: 70,
              autocapitalize: "off",
              autocorrect: "off",
            },
          },
        ])
        .then((result: any) => {
          if (result.value) {
            const item = result.value;
            this.$swal
              .fire({
                title: "Tudo pronto!",
                html: `
                  <p class="modal-task">Título:${item[0]}</p>
                  <p class="modal-task">Data:${item[1]}</p>
                  <p class="modal-task">${
                    item[2] ? "Descrição: " + item[2] : ""
                  }</p>
                `,
                showDenyButton: true,
                confirmButtonText: `Salvar`,
                denyButtonText: `Não salvar`,
              })
              .then((result: any) => {
                if (result.isConfirmed) {
                  // Edit
                  if (task) {
                    const index = this.tasks.indexOf(task);
                    this.tasks[index] = new TaskDto(item[0], item[1], item[2]);
                    this.save();
                    // Create
                  } else {
                    this.add(item);
                  }
                } else if (result.isDenied) {
                  return;
                }
              });
          }
        });
    },
    checkIfLogged(): void {
      if (!localStorage.getItem("logged")) {
        router.push("login");
      }
    },
    search(val: string): void {
      const tasks = localStorage.getItem("tasks");
      if (val.length > 0) {
        if (tasks) {
          this.tasks = JSON.parse(tasks);
        } else {
          this.tasks = [];
        }
        this.tasks = this.tasks.filter(
          (task: any) =>
            task.title.includes(val) ||
            task.data.includes(val) ||
            task.description.includes(val)
        );
      } else {
        if (tasks) {
          this.tasks = JSON.parse(tasks);
        } else {
          this.tasks = [];
        }
      }
    },
  },
})
export default class Home extends Vue {}
</script>
