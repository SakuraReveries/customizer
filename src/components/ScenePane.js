import { Form } from 'react-bootstrap';
import { useFormikContext } from 'formik';
import { useCallback, useRef } from 'react';

import SidebarPane from 'components/SidebarPane';
import ArrayOptions from 'components/ArrayOptions';
import { deskMaterials, environments } from 'utils';

export default function ScenePane() {
  const canvasRef = useRef();
  const imgRef = useRef();
  const { values, setFieldValue } = useFormikContext();

  const handleFileChange = useCallback(
    (event) => {
      const [file] = event.target.files;
      const reader = new FileReader();

      reader.onload = (readEvent) => {
        if (imgRef.current) {
          imgRef.current.src = readEvent.target.result;
          imgRef.current.onload = () => {
            canvasRef.current.height = imgRef.current.height;
            canvasRef.current.width = imgRef.current.width;

            const ctx = canvasRef.current.getContext('2d');

            ctx.drawImage(imgRef.current, 0, 0);
            console.dir('updating mat texture');
            setFieldValue('scene.deskMatTexture', canvasRef.current);
          };
        }
      };
      reader.readAsDataURL(file);
    },
    [setFieldValue, imgRef]
  );

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
        <Form.Group className="mb-2">
          <Form.Label className="text-light">Desk Mat?</Form.Label>
          <Form.Switch
            onChange={(event) =>
              setFieldValue('scene.deskMat', event.target.checked)
            }
            checked={values.scene.deskMat}
          />
        </Form.Group>
        {values.scene.deskMat && (
          <Form.Group className="mb-2">
            <Form.Label className="text-light">Desk Mat Image</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>
        )}
        <canvas style={{ display: 'none' }} ref={canvasRef}></canvas>
        <img style={{ display: 'none' }} alt="" ref={imgRef}></img>
      </Form>
    </SidebarPane>
  );
}
