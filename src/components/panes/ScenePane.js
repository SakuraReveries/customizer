import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useFormikContext } from 'formik';
import { useCallback, useRef } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';

import ArrayOptions from 'components/forms/ArrayOptions';
import ColorPicker from 'components/forms/ColorPicker';
import FormField from 'components/forms/FormField';
import SidebarPane from 'components/panes/SidebarPane';
import { deskMatColors, deskMaterials, environments } from 'utils';

export default function ScenePane() {
  const canvasRef = useRef();
  const imgRef = useRef();
  const inputRef = useRef();
  const { values, setFieldValue, setValues } = useFormikContext();

  const handleFileChange = useCallback(
    (event) => {
      const [file] = event.target.files;
      const reader = new FileReader();

      reader.onload = (readEvent) => {
        if (imgRef.current) {
          setFieldValue('scene.deskMatTexture', null);
          imgRef.current.src = readEvent.target.result;
          imgRef.current.onload = () => {
            canvasRef.current.height = imgRef.current.height;
            canvasRef.current.width = imgRef.current.width;

            const ctx = canvasRef.current.getContext('2d');

            ctx.drawImage(imgRef.current, 0, 0);
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
        <FormField label="Lighting">
          <Form.Select
            onChange={(event) =>
              setFieldValue('scene.environment', event.target.value)
            }
            value={values.scene.environment}
          >
            <ArrayOptions array={environments} />
          </Form.Select>
        </FormField>
        <FormField label="Desk Material">
          <Form.Select
            onChange={(event) =>
              setFieldValue('scene.deskMaterial', event.target.value)
            }
            value={values.scene.deskMaterial}
          >
            <ArrayOptions array={deskMaterials} />
          </Form.Select>
        </FormField>
        <FormField label="Desk Mat?">
          <Form.Switch
            className="ms-3"
            onChange={(event) =>
              setValues((values) => ({
                ...values,
                scene: {
                  ...values.scene,
                  deskMat: event.target.checked,
                  deskMatColor: event.target.checked ? 'black' : null,
                  deskMatWidth: event.target.checked ? 24 : null,
                  deskMatHeight: event.target.checked ? 18 : null
                }
              }))
            }
            checked={values.scene.deskMat}
          />
        </FormField>
        <FormField
          label="Desk Mat Size"
          help="Measurements are in inches."
          show={values.scene.deskMat}
        >
          <InputGroup>
            <InputGroup.Text>Width</InputGroup.Text>
            <Form.Control
              type="number"
              min={12}
              max={64}
              value={values.scene.deskMatWidth}
              onChange={(event) =>
                setFieldValue(
                  'scene.deskMatWidth',
                  parseInt(event.target.value, 10)
                )
              }
              onBlur={(event) => {
                const value = parseInt(event.target.value, 10);

                setFieldValue(
                  'scene.deskMatWidth',
                  isNaN(value) ? 12 : Math.min(64, Math.max(12, value))
                );
              }}
            />
            <InputGroup.Text>Height</InputGroup.Text>
            <Form.Control
              type="number"
              min={12}
              max={48}
              value={values.scene.deskMatHeight}
              onChange={(event) =>
                setFieldValue(
                  'scene.deskMatHeight',
                  parseInt(event.target.value, 10)
                )
              }
              onBlur={(event) => {
                const value = parseInt(event.target.value, 10);

                setFieldValue(
                  'scene.deskMatHeight',
                  isNaN(value) ? 12 : Math.min(48, Math.max(12, value))
                );
              }}
            />
          </InputGroup>
        </FormField>
        <FormField
          label="Desk Mat Texture"
          help="Your images remain on your device. Crop a high-resolution photo for best results."
          show={values.scene.deskMat}
        >
          <InputGroup>
            <Form.Control
              ref={inputRef}
              type="file"
              onChange={handleFileChange}
            />
            <Button
              variant="danger"
              onClick={() => {
                inputRef.current.value = '';
                setFieldValue('scene.deskMatTexture', null);
              }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </InputGroup>
        </FormField>
        <FormField label="Desk Mat Color" show={values.scene.deskMat}>
          <ColorPicker
            colors={deskMatColors}
            value={values.scene.deskMatColor}
            onChange={(color) => setFieldValue('scene.deskMatColor', color)}
          />
        </FormField>
        <canvas style={{ display: 'none' }} ref={canvasRef}></canvas>
        <img style={{ display: 'none' }} alt="" ref={imgRef}></img>
      </Form>
    </SidebarPane>
  );
}
