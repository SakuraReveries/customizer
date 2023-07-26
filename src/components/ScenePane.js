import { Form } from 'react-bootstrap';

import SidebarPane from 'components/SidebarPane';
import ArrayOptions from 'components/ArrayOptions';

import { deskMaterials, environments } from 'utils';
import { useFormikContext } from 'formik';

export default function ScenePane() {
  const { values, setFieldValue } = useFormikContext();

  return (
    <SidebarPane title="Scene">
      <Form>
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
              setFieldValue('scene.deskMaterial', event.target.value)
            }
            value={values.scene.deskMaterial}
          >
            <ArrayOptions array={deskMaterials} />
          </Form.Select>
        </Form.Group>
      </Form>
    </SidebarPane>
  );
}
