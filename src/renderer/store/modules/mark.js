const state = {
    files: [],
    editing: null,
    current: []
}

const mutations = {
    changeCurrentPath(state, files) {
        state.files = files
    },
    changeEditing(state, obj) {
        if (state.editing !== null) {
            state.editing = obj;
        }
    },
    saveCurrent(state) {
        state.editing.save = true;
    }
}

const actions = {
    changeCurrentPath(context, payload) {
        context.commit("changeCurrentPath", payload)
    },
    changeEditing(context, payload) {
        context.commit("changeEditing", payload);
    },
    saveCurrent(context,payload){
        context.commit("saveCurrent",payload);
    }
}

export default {
    state,
    mutations,
    actions
}