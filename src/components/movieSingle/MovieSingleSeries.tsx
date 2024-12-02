import React from "react"
import {
  Button, Card,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ScrollShadow,
  useDisclosure
} from "@nextui-org/react"
import { Movie } from "../../type/moviesType"


type Props = {
  data: Movie
}

const MovieSingleSeries = ({data}: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <div className={"mb-10 text-white"}>
      <Button onPress={onOpen}>Сезоны и количество серий</Button>
      <Modal className={'dark'} size={"3xl"} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalBody>
                <ScrollShadow orientation="horizontal" className={"h-[50vh]"}>
                  <div className="flex flex-wrap items-center mx-auto gap-5">
                    {data.isSeries &&
                      data.seasonsInfo.map(item => (
                        <Card className={"p-5 w-fit mb-4"}>
                          Сезон: {item.number}, серий: {item.episodesCount}
                        </Card>
                      ))}
                  </div>
                </ScrollShadow>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default MovieSingleSeries
