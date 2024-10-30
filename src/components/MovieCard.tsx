import React from "react"
import { Button, Card, CardBody, CardFooter, CardHeader, Image } from "@nextui-org/react"
import { Link } from "react-router-dom"


type Props = {
  title: string
  image: string
  id: number
}


const MovieCard:React.FC<Props> = ({title, image, id}) => {



  return (
    <Card
      isFooterBlurred
      radius="lg"
      className="border-none w-fit"
    >
      <Image
        alt="Woman listing to music"
        className=""
        height={400}
        src={`${image ? image : 'https://kinopoisk-ru.clstorage.net/I29EC2383/b4fcd1JJxW/ho67uO8uVU0jhNla133v0jPKcF_JfitHWyfK6x_aZz2XICg69LM0RGlEvGgjkh6vyAYYiboLvT2sNIqcoSaNQYKS87qsOFNReJXBUtc26dgrgWYeyGY0TmsI5MMu7gUJrAgPAOaqJ0VhQr9qPJNar9dJHpWGe_QViFK4pqI9uHebi_Hzih98eziM_XT1NdH_A4tQIoV-KnhOI9TXNN8nM60uPz7wuRMSXF68SgGXYrn7DCeFo2uBGIRin7eNJaxSmbjp4aoTQ3sdksFW9xft2zKGbCezeTRzZxLk2xbcCAmuPCwj9rk1LVh-l3w0rme--S0at7xpoRy5equnqB-9SJW31u6vL2RYDpfjSvM80-0qp1sEi10KX3sQ38o13CU4pyAPK-GXKD5TX7t9ArJnveotKo6zSbAnh0uQoK08inW_mOLAkxZweRqAwXXREtDeAIl7JY9aIVlGOsP2K8gGN5AKCRn5ligGWFOTVD2WS6XyIym2kHOGE7t-rI2iFaFRnJjA9YU-QW07ttVy5Cru8D-DbCKgQgRGRDLu0SjWGDmXLio4-7I5CUREm1wJuke9zAAdqJFNrAOAY6yhmRyjUI6Z-POpEn9nLbbVUMcB-e8GsG4nqnotaGUv9PI09QIdijoSJ_2MJztnZqVGA61_sPY1PquYVqUkikudlIIhnGSkvsXlqgFXdSG8_mTFBvX4CLN6J5d7LmVHIeH4K8EAE6oNDzrhiTI9Z12WUB6edK3QPj6vuFaSB7NtnJ6kL4dIlYTn5qQwZnU2nOVC5SPKwyuvaieLZQVnWQPf7jT1JjWmKD4JxJwqO31og0ofhUWq7QAHjLxzsAWhdKmdvii6Sbef796rAFNmFKj7Vv826t42gkgJpGABTk07z9EgxBgJqAkECue7Ni5lWZ1XC4tpr9oIKKmfXKEUvH-yiL4egnG-v-XbuCJzRjSU6WLmPPjBKat3H69yCmFaGcHoBd4AMIsXIDn-mj8jTlmJaiKTQrj2MCiNrV2EBaBLsqe5LpJwkpHTx6QPYmcTtuZKzBTMxyyDbiakYhdzYwL_8j3jLxKEKSgex5ciLElAo1I6hFi2-x4ckLVmnxiCb5eZqzqiR7uV7_SZAEJ0HpXvd_Iq79koi1AUt2wvR2Ed_dU_9hAylz08O-e3Bh9yeKt3BKxHmukiBI2oa6M-iUirloEdn3uVhcfwihx_bS-q3HXYBezGBKF1I7dECmtdPfDSCvU9N6YqACPFrDkacH6LdhmFd7HRJTu1sWm3BoFOjpisNZ9Pvq_v46oabE8Tjsx4-TXVzQyoVRmcVDhuXgX3yD_hGy22LDcBxrspGkdloWo2uHy2yw0LiIFnoz6ycLmrjwSNRL-p6dKXPmBcAbLJUu0K6dUMlUQls1IaQmcBzOAq0BoYizYOBciyATJcRr5UNIxEsPsPNLCjcJA1vn-Ij6M9mkGjv87AqAVfVAONyEvsKtDcEJx5OohYF1taA-f1P_0zPoQjPjfSiQgyU3GjfSKFRKX3CyejunGXMZN4mKKGCblXg4nb2JMnW004kcVB3hnL9C-dURuUTSFPXTLA9irSLxCtGxYJ_ogmAkNnm10cknqu-z06mqFsvx-gcZKeqQqDa7uq5M60El57EpD_Rv428t8XpnAWlUMzUEUvyuEq1yYBny41CciMHgxHYJJGHq1mmNckNa2gXZMkrVS2loE4hE2Dj-ntrgB-WBCv_nzAOsrjDZZMKIRfAE95P9TKH-MYHq4CLRTDuDoff0mDfTamR43IDCGhiW6fBYZ-qKeoGZ5GnYXO7oo-V3gWpOl08h74wQOORSexRwBtYRPu8DzYPB-mCwof9pQ_L1hHp2Qis2Cz_SULrqtzgQitXKiDlzu-bLOz8dyENk1PE6zJS9IK4vQ9tXUhiWIrelwv0cs-_g8YhyMsJNipBgNGfrlfKZBcrNcfCaKTRpw6oWOeiY8DoniSt_nNihxneAeiwHjHP8DFNYJpFKhGA0xsEsHXBtUbFIclMSDQiSIMTF6DXSaEcaTTEAOYklafCYROr6ScA5Fvo4rKwZIGZnYDiO92_jfs9A-CaxqAfRRtdhjQyQb1GSKNOxUq15YkIUhgh1YJu0u5xh8Fp61llT-keoqlnCaPba6l8vKZEntPD7THRNA96_ImklQdglsMWFAR6cM93D4yjAYTCuieCAxsYL5SBIh6qtAGPbOffbYzo0-CvYMnkEyjr-jekBhGSzqu23L5NNfmLI9kNaxUNWVXH9DOPcMMM7YnJAHUvD8bZG6EfyaMXb3GJT6NiHChE4BQl6O9D69rl4jL1q4bd2gbl8hDwAL1zS6jUTqsUCFTfB_v2w3oGjSsLQEn_Yg-OERfk18osUKY0hc5hJZSoim-XrmcqCaaWrGe8-CFL2VQGargUtUq6MUQoHokgWIIRWMi69Q_3yUBhAEuJcefJSFlXKV0AbZ7jO8rI7ehfo0Bs0m3jbQ_ok2AmfbztjV4bDGw6lLXGPHHCYJXFI5yOl5RB93bC-cFM6o8CRzatSklfk2ZSS21Xa3oMBqFtUCxNq5Vr5iaBJtYrJbX_LQhcH0wgutmzTXX0xKPQj2oZgdoRAfd5RnlLwGxHSMc1JElCVl6qGIfiFq93SwbqIFxhxioQpOgnAK5cIyq1NayDlhOIqHpQs0F48cosUQ7pHEJfEYYzvE_5QUQjSg1NPKaKD58Sb5zCLl8t_ASA6iRb58ggnmrg6c8nUych9TZpzZWaBW91X3tOc7hCJd0NahACFBkD9PpGOsnMrYFLDzZhT0JY2KpaiaGWpnWBRm3skyCH75rnaOrGIZog5L504wzV2o0vcB09hjn_i21QB2sQzBBYC7Vwy3zBSOVJxEc5rY6B2Rvt3YUkFSp3SIZjZ9lljGhT5y2rQiYWIO49MajE1NKD4_KXd4R6dEslFEmqEMPWF4F68AB0jscgiECO9OIFgRNfotEJaxEhNoOGYmMaroRvGE'}`}
        width={300}
      />
      <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <p className="text-medium w-fit text-white/80">{title}</p>\
        <Link to={`/movie/${id}`}>
          <Button className="text-tiny text-white bg-black/20" variant="flat" color="default" radius="lg" size="sm">
            Подробнее
          </Button>
        </Link>

      </CardFooter>
    </Card>
  )
}

export default MovieCard