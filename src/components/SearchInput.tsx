import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import useContentQueryStore from "../storeContentQuery";
import useTopicListFlybarToggleStore from "../storeTopicListFlybarToggle";

const SearchInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchInput, setSearchInput] = useState(""); // Local state to store the input value
  const setSearchText = useContentQueryStore((s) => s.setSearchText);
  const setFlybarToggle = useTopicListFlybarToggleStore(
    (s) => s.setTopicListFlybarToggle
  );
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchInput && inputRef.current) {
      inputRef.current.blur();
      setSearchText(searchInput);
      setFlybarToggle(false)
      setSearchInput("");
      navigate("/");
    }
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSearch();
      }}
    >
      <InputGroup>
        <InputLeftElement children={<BsSearch />} />
        <Input
          ref={inputRef}
          value={searchInput} // Use local state for value
          onChange={(e) => setSearchInput(e.target.value)} // Update local state, not search text directly
          borderRadius={20}
          placeholder="Search..."
          variant={"filled"}
        />
      </InputGroup>
    </form>
  );
};

export default SearchInput;
