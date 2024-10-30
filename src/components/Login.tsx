import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { userApi } from "../app/services/userApi"
import { Button, Link } from "@nextui-org/react"
import Input from "./Input"
import { useNavigate } from "react-router-dom"
import ErrorMessage from "./ErrorMessage"




type Props = {
  setSelected: (value: string) => void
}

type Login = {
  email: string
  password: string
}



const Login:React.FC<Props> = ({setSelected}) => {

  const [login, {isLoading}] = userApi.useLoginMutation()
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Login>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    }
  })


  const onSubmit = async (data:Login) => {
    try {
      await login(data).unwrap()
      navigate("/movies")
    } catch (e) {
      if(e.status ===401) setError("Неверные данные")
    }
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col gap-4"}>
      <Input
        name={'email'}
        control={control}
        label={'Email'}
        type={'email'}
        required={'Обязательное поле'}
      />
      <Input
        name={'password'}
        control={control}
        label={'Пароль'}
        type={'password'}
        required={'Обязательное поле'}
      />

      <ErrorMessage error={error}/>

      <p className="text-center text-small">
        Нет аккаунта?{" "}
        <Link
          size={"sm"}
          className={"cursor-pointer "}
          onPress={() => setSelected("sign-up")}
        >
          Зарегистрируйтесь
        </Link>
      </p>

      <div className={"flex gap-2 justify-end"}>
        <Button
          fullWidth
          color={"primary"}
          type={"submit"}
          isLoading={isLoading}
        >
          Войти
        </Button>
      </div>
    </form>
  )
}

export default Login