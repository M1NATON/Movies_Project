import React from "react"
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react"
import KinoboxPlayer from "../KinoboxPlayer"


type Props = {
  id: number
  title: string
}

const MovieSingleWatch:React.FC<Props> = ({ id, title }) => {

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <div>
      <div className={"mb-10"}>
        <Button onPress={onOpen}>Смотреть фильм</Button>
        <Modal size={"3xl"} isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {onClose => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  <h1>{title}</h1>
                </ModalHeader>
                <ModalBody>
                  <KinoboxPlayer kpId={id}/>
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
    </div>
  )
}

export default MovieSingleWatch