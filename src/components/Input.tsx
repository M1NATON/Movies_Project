import React from "react"
import { Control, useController } from "react-hook-form"
import { Input as NextInput } from "@nextui-org/react"

type Props = {
  name: string
  label: string
  placeholder?: string
  type?: string
  control: Control<any>
  required?: string
  endContent?: JSX.Element
}

const Input: React.FC<Props> = ({
  name,
  label,
  placeholder,
  control,
  required = "",
  endContent,
  type,
}) => {
  const {
    field,
    fieldState: { invalid },
    formState: { errors },
  } = useController({
    name,
    control,
    rules: {
      required,
    },
  })

  return (
    <div>
      <NextInput
        id={name}
        label={label}
        type={type}
        placeholder={placeholder}
        value={field.value}
        name={field.name}
        isInvalid={invalid}
        onChange={field.onChange}
        onBlur={field.onBlur}
        errorMessage={`${errors[name]?.message ?? " "}`}
      />
    </div>
  )
}

export default Input
