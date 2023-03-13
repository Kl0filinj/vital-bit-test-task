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
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

type ArticleProps = IArticle & {
  deleteMethod: (id: string) => void;
};

const Article = ({
  id,
  title,
  poster,
  description,
  deleteMethod,
}: ArticleProps) => {
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
    <Card maxW="sm">
      <CardBody>
        <PosterImage
          src={String(poster)}
          alt="Green double couch with wooden legs"
          width={300}
          height={200}
          priority={true}
          placeholder={"empty"}
          borderRadius="lg"
          m={"auto"}
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{title}</Heading>
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
  );
};

export default Article;
