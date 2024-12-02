
export const TypeMovieRu = (type: string) => {
  switch (type) {
    case 'animated-series':
      return 'мультсериал'
    case 'anime':
      return 'аниме'
    case 'cartoon':
      return 'мультфильм'
    case 'movie':
      return 'фильм'
    case 'tv-series':
      return 'сериал'
    default:
      return type
      break
  }
}