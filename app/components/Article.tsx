import { removeArticle } from "@/pages/services";
import { IArticle } from "@/types/commonTypes";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  Heading,
  Stack,
  Text,
  chakra,
  IconButton,
  Button,
  LinkBox,
  LinkOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import ArticleModal from "./Modal";

type ArticleProps = IArticle & {
  deleteMethod: (id: string) => void;
  updateMethod: (article: IArticle) => void;
};

const Article = ({
  id,
  title,
  poster,
  description,
  deleteMethod,
  updateMethod,
}: ArticleProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const PosterImage = chakra(Image, {
    shouldForwardProp: (prop) =>
      ["width", "height", "priority", "placeholder", "src", "alt"].includes(
        prop
      ),
  });

  const deleteHandler = async (id: string) => {
    const res = await removeArticle(id);
    deleteMethod(id);
    console.log(res);
  };
  return (
    <LinkBox as="article">
      <Card
        maxW="sm"
        minH={"396px"}
        _hover={{ bgColor: "gray.600" }}
        transitionProperty={"background-color"}
        transitionDuration={"250ms"}
        transitionTimingFunction={"cubic-bezier(0.4, 0, 0.2, 1)"}
      >
        <CardBody>
          <PosterImage
            src={String(poster)}
            alt="Article logo"
            width={300}
            height={200}
            priority={true}
            placeholder="empty"
            borderRadius="lg"
            m="auto"
          />
          <Stack mt="6" spacing="3">
            <LinkOverlay as={Button} variant="link" onClick={onOpen}>
              <Heading size="md">{title}</Heading>
            </LinkOverlay>
            <ArticleModal
              isOpen={isOpen}
              onClose={onClose}
              modalTitle={"Change Article"}
              saveMethod={updateMethod}
              credentials={{ title, description }}
              id={id}
            />
            <Text noOfLines={4}>{description}</Text>
          </Stack>
        </CardBody>
        <IconButton
          colorScheme="red"
          aria-label="Search database"
          icon={<DeleteIcon />}
          onClick={() => deleteHandler(String(id))}
        />
      </Card>
    </LinkBox>
  );
};

export default Article;
