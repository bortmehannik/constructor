import Project from './projects_help'
export default {
    state: {
        projects: []
    },
    mutations: {
        newProject(state, payload) {
            state.projects.push(payload)
        }
    },
    actions: {
        async newProject({commit}, payload) {
            try {
                const project = new Project(
                    payload.name,
                    payload.id,
                    payload.url
                )
                commit('newProject', project)
            } catch (e) {
                alert(e)
            }
        }
    },
    getters: {
        projects (state) {
            return state.projects
        }
    }
}
