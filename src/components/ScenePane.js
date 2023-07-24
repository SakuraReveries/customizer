import { Form } from 'react-bootstrap';
import { ChromePicker } from 'react-color';

import SidebarPane from 'components/SidebarPane';
import ArrayOptions from 'components/ArrayOptions';

import { backdropMaterials, environments } from 'utils';
import { useFormikContext } from 'formik';

export default function ScenePane() {
  const { values, setFieldValue } = useFormikContext();

  return (
    <SidebarPane title="Scene">
      <Form>
        <Form.Group className="mb-2">
          <Form.Label className="text-light">Background Color</Form.Label>
          <ChromePicker
            color={values.scene.bgColor}
            onChange={(color) => setFieldValue('scene.bgColor', color.hex)}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label className="text-light">Lighting</Form.Label>
          <Form.Select
            onChange={(event) =>
              setFieldValue('scene.environment', event.target.value)
            }
            value={values.scene.environment}
          >
            <ArrayOptions array={environments} />
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label className="text-light">Desk Material</Form.Label>
          <Form.Select
            onChange={(event) =>
              setFieldValue('scene.backdropMaterial', event.target.value)
            }
            value={values.scene.backdropMaterial}
          >
            <ArrayOptions array={backdropMaterials} />
          </Form.Select>
        </Form.Group>
      </Form>
    </SidebarPane>
  );
}
