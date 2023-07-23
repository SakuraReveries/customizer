import { Form } from 'react-bootstrap';
import { ChromePicker } from 'react-color';

import SidebarPane from 'components/SidebarPane';
import ArrayOptions from 'components/ArrayOptions';

import { environments } from 'utils';
import { useFormikContext } from 'formik';

export default function OptionsPane() {
  const { values, setFieldValue } = useFormikContext();

  return (
    <SidebarPane title="Options">
      <Form>
        <Form.Group className="mb-2">
          <Form.Label className="text-light">Background Color</Form.Label>
          <ChromePicker
            color={values.scene.bgColor}
            onChange={(color) => setFieldValue('scene.bgColor', color.hex)}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label className="text-light">Lighting Environment</Form.Label>
          <Form.Select
            onChange={(event) =>
              setFieldValue('scene.environment', event.target.value)
            }
            value={values.scene.environment}
          >
            <ArrayOptions array={environments} />
          </Form.Select>
        </Form.Group>
      </Form>
    </SidebarPane>
  );
}
