import MovieCard from "../MovieCard"

type Props = {
  data: [
    {
      name: string
      poster: { url: string }
      id: number
    },
  ]
}

const MovieSingleSimilar:React.FC<Props> = ({data}) => {
  return (
    <>
      {data && data?.length > 0 && (
        <div className="">
          <h1 className={"text-4xl mb-20"}>Похожие:</h1>
          <div className="flex flex-wrap mx-auto gap-20">
            {data.map((item, idx) => (
              <MovieCard
                key={idx}
                title={item.name}
                image={item.poster.url}
                id={item.id}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default MovieSingleSimilar