import {
  Button,
  Card,
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

const MovieSingleWatch: React.FC<Props> = ({ id, title }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <Card className={'mb-20'}>
      <KinoboxPlayer kpId={id} />
    </Card>
  )
}

export default MovieSingleWatch
