export const cardClick = (name: string) => ({
  payload: {
    name,
  },
  type: 'UPDATE_SELECTED_CARD',
})
