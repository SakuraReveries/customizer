import useMessages from 'hooks/useMessages';
import { Alert } from 'react-bootstrap';

export default function Messages() {
  const { messages, disableMessage } = useMessages();

  return (
    <div
      style={{
        position: 'fixed',
        top: 8,
        left: 8,
        zIndex: 1000,
        width: 250,
        height: '100%',
        opacity: 0.6
      }}
    >
      {messages.alignmentDotColor && (
        <Alert
          variant="info"
          dismissible
          onClose={() => disableMessage('alignmentDotColor')}
        >
          For alignment dot colors not listed or custom color tones please
          contact me for a one on one consultation. Please note colors are an
          approximate representation of the real to life colors and can vary
          based on display and lighting conditions.
        </Alert>
      )}
      {messages.cerakoteColor && (
        <Alert
          variant="info"
          dismissible
          onClose={() => disableMessage('cerakoteColor')}
        >
          Please note colors are an approximate representation of the real to
          life colors and can vary based on display and lighting conditions.
        </Alert>
      )}
      {messages.glowCnc && (
        <Alert
          variant="info"
          dismissible
          onClose={() => disableMessage('glowCnc')}
        >
          Glow CNC provides options for LED colors in static or non-addressable
          RGB formats. The LED remains powered on when the cable is connected to
          a power source, and there is no software control over the RGB colors.
          The diffuser ring appears white when powered off but can be custom
          dyed. Feel free to reach out for custom dyed quotes or any
          connector-related inquiries before purchasing.
        </Alert>
      )}
    </div>
  );
}
