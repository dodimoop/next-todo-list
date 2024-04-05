import { Button, ButtonProps } from '@mui/material';

interface CustomButtonProps extends ButtonProps {
  children: React.ReactNode;
}

const ButtonPS: React.FC<CustomButtonProps> = ({ children, ...props }) => (
  <Button {...props}>
    {children}
  </Button>
);

export default ButtonPS;
