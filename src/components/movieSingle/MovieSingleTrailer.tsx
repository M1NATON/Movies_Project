import React from "react"
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ScrollShadow,
  useDisclosure,
} from "@nextui-org/react"
import { Movie } from "../../type/moviesType"

type Props = {
  data: Movie
}

const MovieSingleTrailer = ({ data }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <div className={"mb-10"}>
      <Button onPress={onOpen}>Смотреть трейлер</Button>
      <Modal size={"3xl"} className={'dark'} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">Трейлер</ModalHeader>
              <ModalBody>
                <ScrollShadow orientation="horizontal" className={"h-[50vh]"}>
                    <iframe
                      className={'w-full h-full'}
                      src={data.videos.trailers[0].url}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                </ScrollShadow>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default MovieSingleTrailer
