"use client";
import { Box, Heading, Wrap, WrapItem } from "@chakra-ui/react";
import { getAllArticles } from "@/pages/services";
import { IArticle } from "@/types/commonTypes";
import { useEffect, useState } from "react";
import Article from "./components/Article";

export default function Home() {
  const [articles, setArticles] = useState<IArticle[]>([]);

  const deleteArticleLocaly = (id: string) => {
    setArticles((prevState) =>
      prevState.filter((item: IArticle) => item.id !== id)
    );
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
      <Heading as="h1">HOME PAGE</Heading>
      <Wrap>
        {articles.map(({ id, title, poster, description }: IArticle) => (
          <WrapItem key={id}>
            <Article
              id={id}
              title={title}
              poster={poster}
              description={description}
              deleteMethod={deleteArticleLocaly}
            />
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
}
