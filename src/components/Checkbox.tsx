import  { useEffect, useState } from "react"
import {
  Accordion,
  AccordionItem,
  Card,
  Checkbox as CheckboxNext,
  CheckboxGroup,
  Input,
  ScrollShadow,
} from "@nextui-org/react"
import { TypeMovieRu } from "../features/TypeMovieRu"

type Props = {
  title: string
  type: string
  list?: { name: string; slug: string }[]
  callbackValue: (data: {
    year?: string[]
    genres?: string[]
    type?: string[]
    countries?: string[]
  }) => void
  resetFilter: (resetFn: () => void) => void
  selectedValues: string[]
}

const Checkbox: React.FC<Props> = ({
  list,
  title,
  callbackValue,
  type,
  resetFilter,
  selectedValues,
}) => {
  const [valueCheck, setValueCheck] = useState<string[]>(selectedValues) // Инициализация значениями из фильтров
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [filteredList, setFilteredList] = useState(list)

  // Сброс состояния чекбоксов при сбросе фильтров
  useEffect(() => {
    resetFilter(() => setValueCheck([]))
  }, [resetFilter])

  // Фильтрация списка чекбоксов по поисковому запросу
  useEffect(() => {
    const filtered = list?.filter(
      item =>
        typeof item.name === "string" &&
        item.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredList(filtered)
  }, [searchTerm, list])



  useEffect(() => {
    if (valueCheck.length === 0) {
      callbackValue({ [type]: [] })
    }  else {
      callbackValue({ [type]: valueCheck })
    }
  }, [valueCheck, type, callbackValue])

  return (
    <Card className={"mb-5 p-2"}>
      <Accordion>
        <AccordionItem className={"w-full"} title={title}>
          <ScrollShadow
            orientation="horizontal"
            className={"max-h-[30vh] h-auto overflow-x-hidden"}
          >
            <CheckboxGroup
              className={"h-full"}
              value={valueCheck}
              onValueChange={setValueCheck}
            >
              <Input
                type="search"
                placeholder="Поиск"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              {filteredList?.map((item, i) => (
                <CheckboxNext key={i} value={item.name}>
                  {TypeMovieRu(item.name)}
                </CheckboxNext>
              ))}
            </CheckboxGroup>
          </ScrollShadow>
        </AccordionItem>
      </Accordion>
    </Card>
  )
}

export default Checkbox
