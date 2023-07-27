import { useFormikContext } from 'formik';
import { Button } from 'react-bootstrap';

export default function ResetCamera() {
  const { values, setFieldValue } = useFormikContext();

  return (
    values.scene.focusOn !== 'center' && (
      <div
        style={{
          position: 'fixed',
          zIndex: 1001,
          bottom: 8,
          left: 8
        }}
      >
        <Button
          onClick={() => setFieldValue('scene.focusOn', 'center')}
          size="sm"
          className="mb-2"
        >
          Reset Camera
        </Button>
      </div>
    )
  );
}
