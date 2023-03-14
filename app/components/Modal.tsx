import { addArticle, updateArticle } from "@/pages/services";
import { IArticle } from "@/types/commonTypes";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React from "react";
import { articleYupSchema } from "../utils/validationSchemas";

interface ICredentials {
  title: string;
  description: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalTitle: string;
  saveMethod: (article: IArticle) => void;
  credentials?: ICredentials;
  id?: string;
}

const ArticleModal = ({
  isOpen,
  onClose,
  modalTitle,
  saveMethod,
  credentials,
  id,
}: ModalProps) => {
  const initialValues = credentials
    ? credentials
    : {
        title: "",
        description: "",
      };

  const onSubmit = async (values: ICredentials) => {
    const articleData = {
      title: values.title,
      description: values.description,
    };
    const createdArticle =
      credentials && id
        ? await updateArticle(articleData, id)
        : await addArticle(articleData);
    saveMethod(createdArticle);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{modalTitle}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={initialValues}
            validationSchema={articleYupSchema}
            onSubmit={onSubmit}
            isSubmitting
          >
            {(formik) => (
              <Box as={Form} mx={"auto"} my={"5"}>
                <FormControl
                  isInvalid={
                    Boolean(formik.errors.title) && formik.touched.title
                  }
                >
                  <FormLabel htmlFor="article-title">Title</FormLabel>
                  <Field
                    as={Input}
                    id="article-title"
                    type="text"
                    name="title"
                    placeholder="Article Title"
                  />

                  <FormErrorMessage fontSize="xs" mt={0}>
                    {formik.errors.title}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={
                    Boolean(formik.errors.description) &&
                    formik.touched.description
                  }
                  mt={4}
                >
                  <FormLabel htmlFor="article-desc">Description</FormLabel>
                  <Field
                    as={Textarea}
                    id="article-desc"
                    name="description"
                    placeholder="Article Description"
                    resize={"vertical"}
                  />

                  <FormErrorMessage fontSize="xs" mt={0}>
                    {formik.errors.description}
                  </FormErrorMessage>
                </FormControl>
                <Box textAlign={"center"} mt={"5"}>
                  <Button
                    isDisabled={formik.isSubmitting}
                    colorScheme="green"
                    type="submit"
                    loadingText={"Saving"}
                    aria-label="save article"
                  >
                    Save It
                  </Button>
                </Box>
              </Box>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ArticleModal;
