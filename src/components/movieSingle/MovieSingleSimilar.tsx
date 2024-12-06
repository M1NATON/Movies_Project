import MovieCard from "../MovieCard"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { FaLongArrowAltRight, FaLongArrowAltLeft } from "react-icons/fa"
import { numScroll } from "../../features/numScroll"

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
          <h1 className={"text-center sm:text-start text-4xl mb-5"}>
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
