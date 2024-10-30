import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import Login from "./Login"
import { userApi } from "../app/services/userApi"
import Input from "./Input"
import ErrorMessage from "./ErrorMessage"
import { Button, Link } from "@nextui-org/react"


type Props = {
  setSelected: (value: string) => void
}

type Register = {
  email: string
  password: string
  name: string
}


const Register:React.FC<Props> = ({setSelected}) => {


  const [register, {isLoading, status}] = userApi.useRegisterMutation()
  const [error, setError] = useState('')
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Register>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      name: ""
    }
  })

  const onSubmit = async (data:Register) => {
    try {
      await register(data).unwrap()
      setSelected('login')
    } catch (e) {
      if (e.status === 400) {
        setError('Данные email занят')
      }
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
        name={'name'}
        control={control}
        label={'Имя'}
        type={'text'}
        required={'Обязательное поле'}
      />
      <Input
        name={'password'}
        control={control}
        label={'Пароль'}
        type={'password'}
        required={'Обязательное поле'}
      />

      <ErrorMessage error={error} />

      <p className="text-center text-small">
        Есть аккаунта?{" "}
        <Link
          size={"sm"}
          className={"cursor-pointer "}
          onPress={() => setSelected("login")}
        >
          Войдите
        </Link>
      </p>

      <div className={"flex gap-2 justify-end"}>
        <Button
          fullWidth
          color={"primary"}
          type={"submit"}
          isLoading={isLoading}
        >
          Зарегистрироваться
        </Button>
      </div>
    </form>
  )
}

export default Register