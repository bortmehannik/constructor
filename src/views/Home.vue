<template>
  <div class="home">
    <ul>
      <li v-for="(project, idx) in getProjects"
          :key="project.id"
      >
        Проект: <b>{{ ++idx }}</b>
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  data() {
    return {
      projects: []
    }
  },
  computed: {
    getProjects() {
      return this.$store.getters.projects
    }
  }
}
</script>

<style lang="scss">
  .home {
    ul {
      border: 1px solid rgba(0,0,0,.125);
      margin-top: 50px;
      list-style: none;
      font-size: 20px;
      li {
        padding: 10px 30px;
        &:nth-child(odd) {
          background: lightgray;
        }
      }
    }
  }
</style>
