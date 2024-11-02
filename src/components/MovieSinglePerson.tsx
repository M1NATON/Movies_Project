import React from "react"
import { Movie } from "../type/moviesType"
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader, ScrollShadow,
  useDisclosure,
  User
} from "@nextui-org/react"

type Props = {
  data: Movie
}

const MovieSinglePerson = ({ data }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <div className={"mb-10"}>
      <Button onPress={onOpen}>Актерский состав</Button>
      <Modal size={"3xl"} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Над проектом работали
              </ModalHeader>
              <ModalBody>
                <ScrollShadow orientation="horizontal" className={'h-[50vh]'}>
                  <div className="flex flex-wrap items-center mx-auto gap-5">
                    {data.persons.length > 0 &&
                      data.persons.map((item, idx) => (
                        <User
                          name={item.name}
                          description={item.profession}
                          avatarProps={{ src: item.photo }}
                          key={idx}
                        />
                      ))}
                  </div>
                </ScrollShadow>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default MovieSinglePerson
