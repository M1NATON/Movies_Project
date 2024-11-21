import MovieCard from "../MovieCard"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { FaLongArrowAltRight, FaLongArrowAltLeft } from "react-icons/fa"

type Props = {
  data: [
    {
      name: string
      poster: { url: string }
      id: number
    },
  ]
}

const MovieSingleSimilar: React.FC<Props> = ({ data }) => {
  const numScroll = () => {
    if (window.screen.width < 800) {
      return 1
    } else if (window.screen.width < 1200) {
      return 2
    } else {
      return 4
    }
  }

  const settings = {
    slidesToShow: numScroll(),
    autoplay: true,
    speed: 500,
    slidesToScroll: numScroll(),
    nextArrow: <FaLongArrowAltRight color={"white"} />,
    prevArrow: <FaLongArrowAltLeft color={"white"} />,
  }

  return (
    <>
      {data && data?.length > 0 && (
        <div className="mb-20">
          <h1 className={"text-center sm:text-start text-4xl mb-10"}>
            Похожие
          </h1>
          <div className="slider-container">
            <Slider {...settings}>
              {data.map((item, idx) => (
                <div className="p-10">
                  <MovieCard
                    key={idx}
                    title={item.name}
                    image={item.poster.url}
                    id={item.id}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}
    </>
  )
}

export default MovieSingleSimilar
