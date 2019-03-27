
export const add = {
    state:{
      isEdit: false,
      operatorList: '',
      gameIden: '',
      gameOneItem: '',
      isRefresh: false
    },
    mutations:{
      openEditState (state, payload) {
        state.isEdit = true
      }, // 是否是编辑状态
      closeEditState (state, payload) {
        state.isEdit = false
      }, // 是否是编辑状态
      changeRefresh (state, payload) {
        state.isRefresh = payload.data
      }, // 是否是编辑状态
      storageOperatorList (state,payload) {
        state.operatorList = payload.data
      },
      gameOperatorIden (state,payload) {
        state.gameIden = payload.data
      },
      storageGameOneItem (state,payload) {
        state.gameOneItem = payload.data
      }
    },
    actions:{
    }
}
