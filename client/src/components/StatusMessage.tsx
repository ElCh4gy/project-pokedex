import '../styles/status-message.css';

interface StatusMessageProps {
  text: string;
  isError?: boolean;
}

function StatusMessage({ text, isError = false }: StatusMessageProps) {
  return (
    <p
      className={`status-message ${isError ? 'status-message_type_error' : ''}`}
      role={isError ? 'alert' : 'status'}
    >
      {text}
    </p>
  );
}

export default StatusMessage;
