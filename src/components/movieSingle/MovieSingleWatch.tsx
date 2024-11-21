import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
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
        <Modal placement={'center'} classNames={{base: 'bg-[#18181b]'}} size={"5xl"} isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
                <ModalHeader className="flex flex-col gap-1">
                  <h1 className={'text-white'}>{title}</h1>
                </ModalHeader>
                <ModalBody>
                  <KinoboxPlayer kpId={id}/>
                </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    </div>
  )
}

export default MovieSingleWatch