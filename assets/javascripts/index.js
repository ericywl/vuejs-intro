new Vue({
  el: "#app",
  // Data
  data: {
    header: "My To-Do List",
    newEntry: "",
    todos: []
  },
  computed: {
    unfinishedEntries() {
      return this.todos.filter(entry => !entry.isDone);
    }
  },
  // Watchers
  watch: {
    todos: {
      handler: function(newTodos) {
        sessionStorage.setItem("my-todo-list", JSON.stringify(newTodos));
      },
      // watch children of element
      deep: true
    }
  },
  // Methods
  methods: {
    addEntry() {
      const entry = this.newEntry;
      if (entry) {
        this.todos.push({ value: entry, isDone: false });
        this.newEntry = "";
      }
    },
    removeEntry: function(index) {
      this.todos.splice(index, 1);
    }
  },
  // Lifecycle hooks
  mounted() {
    let ssTodos;
    try {
      ssTodos = sessionStorage.getItem("my-todo-list");
      this.todos = JSON.parse(ssTodos);
    } catch (e) {
      console.log("Invalid JSON string: " + ssTodos);
    }
  }
});
