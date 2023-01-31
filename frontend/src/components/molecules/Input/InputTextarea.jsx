import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Textarea,
} from '@chakra-ui/react';

export default function InputTextarea({
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
  return (
    <FormControl isInvalid={isError}>
      <FormLabel>{label}</FormLabel>
      <Textarea
        variant={variant}
        placeholder={placeholder}
        focusBorderColor={color}
        ref={inputRef}
        fontSize={fontSize}
        maxH={'200px'}
      />
      {isError ? (
        <FormErrorMessage>{errorText}</FormErrorMessage>
      ) : (
        <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
}
