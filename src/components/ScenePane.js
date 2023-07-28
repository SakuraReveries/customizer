import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useFormikContext } from 'formik';
import { Fragment, useCallback, useRef } from 'react';

import ArrayOptions from 'components/ArrayOptions';
import HelpTooltip from 'components/HelpTooltip';
import SidebarPane from 'components/SidebarPane';
import { deskMaterials, environments } from 'utils';

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
            className="ms-3"
            onChange={(event) =>
              setValues((values) => ({
                ...values,
                scene: {
                  ...values.scene,
                  deskMat: event.target.checked,
                  deskMatWidth: event.target.checked ? 24 : null,
                  deskMatHeight: event.target.checked ? 18 : null
                }
              }))
            }
            checked={values.scene.deskMat}
          />
        </Form.Group>
        {values.scene.deskMat && (
          <Fragment>
            <Form.Group className="mb-2">
              <Form.Label className="text-light">
                Desk Mat Size
                <HelpTooltip text="Measurements are in inches." />
              </Form.Label>
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
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="text-light">
                Desk Mat Image{' '}
                <HelpTooltip text="Your images remain on your device. Crop a high-resolution photo for best results." />
              </Form.Label>
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
            </Form.Group>
          </Fragment>
        )}
        <canvas style={{ display: 'none' }} ref={canvasRef}></canvas>
        <img style={{ display: 'none' }} alt="" ref={imgRef}></img>
      </Form>
    </SidebarPane>
  );
}
