export default (state = {}, action) => {
  switch (action.type) {
    case 'SIMPLE_ACTION':
      return {
        result: action.payload
      }
    case 'NEW_PAGE':
      return {
        result: 'NEW_PAGE'
      }
    default:
      return state
  }
}