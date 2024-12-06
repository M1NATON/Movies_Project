export const numScroll = () => {
  if (window.screen.width < 800) {
    return 1
  } else if (window.screen.width < 1200) {
    return 2
  } else {
    return 4
  }
}