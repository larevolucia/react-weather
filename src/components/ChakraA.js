import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box
} from "@chakra-ui/react";

export default function ChakraA({ description, title, onClick }) {
  return (
    <Box position="fixed" top="20px" right="10px" zIndex="9999">
      <Alert
        onClick={onClick}
        status="error"
        variant="left-accent"
        borderRadius="md"
        boxShadow="lg"
      >
        <AlertIcon />
        <Box flex="1">
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>{description}</AlertDescription>
        </Box>
      </Alert>
    </Box>
  );
}
