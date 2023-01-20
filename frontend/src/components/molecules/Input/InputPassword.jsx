import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function InputPassword({
  label,
  variant,
  color,
  placeholder,
  helperText,
  errorText,
  isError,
  inputRef,
  fontSize,
}) {
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow(!show);
  };

  return (
    <FormControl isInvalid={isError}>
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        <Input
          type={show ? "text" : "password"}
          variant={variant}
          focusBorderColor={color}
          placeholder={placeholder}
          ref={inputRef}
          fontSize={fontSize}
        />
        <InputRightElement>
          <Button size="sm" p="0" variant="ghost" onClick={toggleShow}>
            {show ? <ViewOffIcon /> : <ViewIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>
      {isError ? (
        <FormErrorMessage>{errorText}</FormErrorMessage>
      ) : (
        <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
}
