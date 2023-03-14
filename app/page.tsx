"use client";
import {
  Box,
  Button,
  Heading,
  useDisclosure,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { getAllArticles } from "@/pages/services";
import { IArticle } from "@/types/commonTypes";
import { useEffect, useState } from "react";
import Article from "./components/Article";
import ArticleModal from "./components/Modal";

export default function Home() {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const deleteArticleLocaly = (id: string) => {
    setArticles((prevState) =>
      prevState.filter((item: IArticle) => item.id !== id)
    );
  };

  const addArticleLocaly = (article: IArticle) => {
    setArticles((prevState) => [article, ...prevState]);
  };

  const updateArticleLocaly = (article: IArticle) => {
    setArticles((prevState) => {
      const newArr = [...prevState];
      const index = newArr.findIndex((item) => item.id === article.id);
      newArr.splice(index, 1, article);
      return newArr;
    });
  };

  useEffect(() => {
    async function getArticles() {
      const data = await getAllArticles();
      setArticles(data);
    }
    getArticles();
  }, []);

  return (
    <Box as="main">
      <Heading as="h1" textAlign={"center"}>
        HOME PAGE
      </Heading>
      <Button colorScheme="green" onClick={onOpen}>
        Add Article
      </Button>
      <ArticleModal
        isOpen={isOpen}
        onClose={onClose}
        modalTitle={"Add New Article"}
        saveMethod={addArticleLocaly}
      />
      <Wrap spacing={"7"} justify="center">
        {articles.length === 0 ? (
          <Heading>There is no article yet, create a new one!</Heading>
        ) : (
          <>
            {articles.map(({ id, title, poster, description }: IArticle) => (
              <WrapItem key={id} maxW={"xs"}>
                <Article
                  id={id}
                  title={title}
                  poster={poster}
                  description={description}
                  deleteMethod={deleteArticleLocaly}
                  updateMethod={updateArticleLocaly}
                />
              </WrapItem>
            ))}
          </>
        )}
      </Wrap>
    </Box>
  );
}
