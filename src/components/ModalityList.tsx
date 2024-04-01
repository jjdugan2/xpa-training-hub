import { Button, Stack } from "@chakra-ui/react";
import useModalities from "../hooks/useModalities";
import { defaultModalityId } from "../initialSettings";
import useContentQueryStore from "../storeContentQuery";

const ModalityList = () => {
  const { data, error } = useModalities();

  const selectedModality = useContentQueryStore((s) => s.contentQuery.modality);
  const setSelectedModality = useContentQueryStore((s) => s.setModality);

  if (error) return null;

  return (
    <>
      <Stack spacing={4} direction="row" align="center">
        {data?.results?.map((modality) => (
          <Button
            key={modality.id}
            colorScheme="gray"
            size="md"
            fontWeight={
              selectedModality?.id === undefined
                ? modality.id === defaultModalityId
                  ? "bold"
                  : "normal"
                : modality.id === selectedModality.id
                ? "bold"
                : "normal"
            }
            variant={
              selectedModality?.id === undefined
                ? modality.id === defaultModalityId
                  ? "solid"
                  : "outline"
                : modality.id === selectedModality.id
                ? "solid"
                : "outline"
            }
            onClick={() =>
              setSelectedModality({
                id: modality.id,
                name: modality.name,
                slug: modality.slug,
              })
            }
          >
            {modality.name}
          </Button>
        ))}
      </Stack>
    </>
  );
};

export default ModalityList;
