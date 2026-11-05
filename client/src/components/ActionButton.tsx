import { useState } from 'react';
import '../styles/action-button.css';

interface ActionButtonProps {
  label: string;
  pendingLabel: string;
  isDisabled?: boolean;
  isSecondary?: boolean;
  onClick: () => Promise<void>;
}

function ActionButton({
  label,
  pendingLabel,
  isDisabled = false,
  isSecondary = false,
  onClick,
}: ActionButtonProps) {
  const [isPending, setIsPending] = useState<boolean>(false);

  const handleClick = async () => {
    setIsPending(true);
    await onClick();
    setIsPending(false);
  };

  return (
    <button
      className={`action-button ${isSecondary ? 'action-button_type_secondary' : ''}`}
      type="button"
      disabled={isDisabled || isPending}
      onClick={handleClick}
    >
      {isPending ? pendingLabel : label}
    </button>
  );
}

export default ActionButton;
