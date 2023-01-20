import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from '@chakra-ui/react';

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
      />
      {isError ? (
        <FormErrorMessage>{errorText}</FormErrorMessage>
      ) : (
        <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
}
