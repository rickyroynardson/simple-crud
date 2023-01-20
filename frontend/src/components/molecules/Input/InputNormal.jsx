import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";

export default function InputNormal({
  label,
  type,
  variant,
  color,
  placeholder,
  helperText,
  errorText,
  isError,
  inputRef,
  fontSize,
}) {
  return (
    <FormControl isInvalid={isError}>
      <FormLabel>{label}</FormLabel>
      <Input
        type={type}
        variant={variant}
        placeholder={placeholder}
        focusBorderColor={color}
        ref={inputRef}
        fontSize={fontSize}
      />
      {isError ? (
        <FormErrorMessage>{errorText}</FormErrorMessage>
      ) : (
        <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
}
