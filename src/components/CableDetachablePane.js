import { Fragment } from 'react';
import { useFormikContext } from 'formik';
import { Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

import SidebarPane from 'components/SidebarPane';
import ColorPicker from 'components/ColorPicker';
import DualColorPicker from 'components/DualColorPicker';
import ObjectOptions from 'components/ObjectOptions';
import {
  heatshrinkColors,
  cerakoteColors,
  cncHousingFinishes,
  alignmentDotColors
} from 'utils';
import useMessages from 'hooks/useMessages';

export default function CableDetachablePane() {
  const { enableMessage } = useMessages();
  const { values, setFieldValue, setValues } = useFormikContext();

  if (values.cable.model == 'Charger') {
    return null;
  }

  return (
    <SidebarPane
      title="Cable Detachable"
      onExpand={() => enableMessage('alignmentDotColor')}
    >
      <Form>
        <Form.Group className="mb-2">
          <Form.Label className="text-light">Heatshrink?</Form.Label>
          <Form.Switch
            checked={values.cable.connector.innerHeatshrink}
            onChange={(event) =>
              setValues((values) => ({
                ...values,
                cable: {
                  ...values.cable,
                  connector: {
                    ...values.cable.connector,
                    innerHeatshrink: event.target.checked,
                    innerHeatshrinkHostColor: event.target.checked
                      ? heatshrinkColors[0].id
                      : null,
                    innerHeatshrinkDeviceColor: event.target.checked
                      ? heatshrinkColors[0].id
                      : null
                  }
                }
              }))
            }
          />
        </Form.Group>
        {values.cable.connector.innerHeatshrink && (
          <Form.Group className="mb-2">
            <Form.Label className="text-light">
              Heatshrink Color{' '}
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip>
                    Please select Host-side and Device-side colors.
                  </Tooltip>
                }
              >
                <FontAwesomeIcon icon={faQuestionCircle} fixedWidth />
              </OverlayTrigger>
            </Form.Label>
            <DualColorPicker
              colors={heatshrinkColors.filter(({ id }) => id !== 'clear')}
              onChange={(type, color) =>
                setFieldValue(
                  `cable.connector.innerHeatshrink${type[0].toUpperCase()}${type
                    .substring(1)
                    .toLowerCase()}Color`,
                  color
                )
              }
              hostValue={values.cable.connector.innerHeatshrinkHostColor}
              deviceValue={values.cable.connector.innerHeatshrinkDeviceColor}
            />
          </Form.Group>
        )}
        <Form.Group className="mb-2">
          <Form.Label className="text-light">Heatshrink Accents?</Form.Label>
          <Form.Switch
            checked={values.cable.connector.collarHeatshrink}
            onChange={(event) =>
              setValues((values) => ({
                ...values,
                cable: {
                  ...values.cable,
                  connector: {
                    ...values.cable.connector,
                    collarHeatshrink: event.target.checked,
                    collarHeatshrinkColor: event.target.checked
                      ? heatshrinkColors[0].id
                      : null
                  }
                }
              }))
            }
          />
        </Form.Group>
        {values.cable.connector.collarHeatshrink && (
          <Form.Group className="mb-2">
            <Form.Label className="text-light">
              Heatshrink Accents Color
            </Form.Label>
            <ColorPicker
              colors={heatshrinkColors.filter(({ id }) => id !== 'clear')}
              onChange={(color) =>
                setFieldValue('cable.connector.collarHeatshrinkColor', color)
              }
              value={values.cable.connector.collarHeatshrinkColor}
            />
          </Form.Group>
        )}
        <Form.Group className="mb-2">
          <Form.Label className="text-light">Connector Finish</Form.Label>
          <Form.Select
            onChange={(event) =>
              setValues((values) => ({
                ...values,
                cable: {
                  ...values.cable,
                  connector: {
                    ...values.cable.connector,
                    finish: event.target.value,
                    cerakoteColor:
                      event.target.value === 'Cerakote'
                        ? cerakoteColors[0].id
                        : null
                  }
                }
              }))
            }
            value={values.cable.connector.finish}
          >
            <ObjectOptions object={cncHousingFinishes} />
          </Form.Select>
        </Form.Group>
        {values.cable.connector.finish === 'Cerakote' && (
          <Fragment>
            <Form.Group className="mb-2">
              <Form.Label className="text-light">Cerakote Color</Form.Label>
              <ColorPicker
                colors={cerakoteColors}
                onChange={(color) =>
                  setFieldValue('cable.connector.cerakoteColor', color)
                }
                value={values.cable.connector.cerakoteColor}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="text-light">Accent Collar?</Form.Label>
              <Form.Switch
                checked={values.cable.connector.accentCollar}
                onChange={(event) =>
                  setValues((values) => ({
                    ...values,
                    cable: {
                      ...values.cable,
                      connector: {
                        ...values.cable.connector,
                        accentCollar: event.target.checked,
                        accentCollarColor: event.target.checked
                          ? cerakoteColors[0].id
                          : null
                      }
                    }
                  }))
                }
              />
            </Form.Group>
            {values.cable.connector.accentCollar && (
              <Form.Group className="mb-2">
                <Form.Label className="text-light">
                  Accent Collar Color
                </Form.Label>
                <ColorPicker
                  colors={cerakoteColors}
                  onChange={(color) =>
                    setFieldValue('cable.connector.accentCollarColor', color)
                  }
                  value={values.cable.connector.accentCollarColor}
                />
              </Form.Group>
            )}
          </Fragment>
        )}
        <Form.Group className="mb-2">
          <Form.Label className="text-light">
            Alignment Dot Color{' '}
            <OverlayTrigger
              placement="bottom"
              overlay={
                <Tooltip>
                  Please select Host-side and Device-side colors.
                </Tooltip>
              }
            >
              <FontAwesomeIcon icon={faQuestionCircle} fixedWidth />
            </OverlayTrigger>
          </Form.Label>
          <DualColorPicker
            colors={alignmentDotColors}
            onChange={(type, color) =>
              setFieldValue(`cable.connector.${type}DotColor`, color)
            }
            hostValue={values.cable.connector.hostDotColor}
            deviceValue={values.cable.connector.deviceDotColor}
          />
        </Form.Group>
      </Form>
    </SidebarPane>
  );
}
