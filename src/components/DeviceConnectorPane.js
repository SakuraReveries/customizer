import { Fragment } from 'react';
import { useFormikContext } from 'formik';
import { Form } from 'react-bootstrap';

import SidebarPane from 'components/SidebarPane';
import ArrayOptions from 'components/ArrayOptions';
import ObjectOptions from 'components/ObjectOptions';
import ColorPicker from 'components/ColorPicker';
import useMessages from 'hooks/useMessages';
import {
  cerakoteColors,
  connectorFinishes,
  ledColors,
  housingTypes,
  heatshrinkColors,
  cncHousingTypes,
  cncHousingFinishes,
  findById
} from 'utils';

export default function DeviceConnectorPane() {
  const { enableMessage } = useMessages();
  const { values, setFieldValue, setValues } = useFormikContext();

  return (
    <SidebarPane
      title="Device Connector"
      showFocus
      onFocus={() => setFieldValue('scene.focusOn', 'deviceConnector')}
    >
      <Form>
        <Form.Group className="mb-2">
          <Form.Label className="text-light">Connector Finish</Form.Label>
          <Form.Select
            onChange={(event) =>
              setFieldValue(
                'deviceConnector.connectorFinish',
                event.target.value
              )
            }
            value={values.deviceConnector.connectorFinish}
          >
            <ArrayOptions array={connectorFinishes} />
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label className="text-light">Housing Type</Form.Label>
          <Form.Switch
            className="text-light ms-3"
            label={
              findById(housingTypes, values.deviceConnector.housingType).name
            }
            onChange={({ target: { checked } }) =>
              setValues((values) => ({
                ...values,
                deviceConnector: {
                  ...values.deviceConnector,
                  housingType: checked ? 'cnc' : 'heatshrink',
                  subHousingType: checked ? 'MonoRing' : null,
                  housingFinish: checked ? cncHousingFinishes[1].id : null,
                  ledColor: checked ? ledColors[0].id : null
                }
              }))
            }
            checked={values.deviceConnector.housingType === 'cnc'}
          />
        </Form.Group>
        {values.deviceConnector.housingType === 'Heatshrink' ? (
          <Form.Group className="mb-2">
            <Form.Label className="text-light">Heatshrink Color</Form.Label>
            <ColorPicker
              colors={heatshrinkColors}
              onChange={(color) =>
                setFieldValue('deviceConnector.heatshrinkColor', color)
              }
              value={values.deviceConnector.heatshrinkColor}
            />
          </Form.Group>
        ) : (
          <Fragment>
            <Form.Group className="mb-2">
              <Form.Label className="text-light">Housing Type</Form.Label>
              <Form.Select
                onChange={(event) => {
                  setFieldValue(
                    'deviceConnector.subHousingType',
                    event.target.value
                  );
                  if (event.target.value === 'GlowRing') {
                    enableMessage('glowCnc');
                  }
                }}
                value={values.deviceConnector.subHousingType}
              >
                <ObjectOptions object={cncHousingTypes.USB_C} />
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="text-light">Housing Finish</Form.Label>
              <Form.Select
                onChange={(event) => {
                  setValues((values) => ({
                    ...values,
                    deviceConnector: {
                      ...values.deviceConnector,
                      housingFinish: event.target.value,
                      cerakoteColor:
                        event.target.value === 'cerakote'
                          ? cerakoteColors[0].id
                          : null
                    }
                  }));
                  if (event.target.value === 'cerakote') {
                    enableMessage('cerakoteColor');
                  }
                }}
                value={values.deviceConnector.housingFinish}
              >
                <ObjectOptions
                  object={
                    values.deviceConnector.subHousingType === 'MonoRing'
                      ? cncHousingFinishes.filter(
                          (finish) => finish.id !== 'gold'
                        )
                      : cncHousingFinishes
                  }
                />
              </Form.Select>
            </Form.Group>
            {values.deviceConnector.subHousingType === 'GlowRing' && (
              <Form.Group className="mb-2">
                <Form.Label className="text-light">LED Color</Form.Label>
                <ColorPicker
                  colors={ledColors}
                  onChange={(color) =>
                    setFieldValue('deviceConnector.ledColor', color)
                  }
                  value={values.deviceConnector.ledColor}
                />
              </Form.Group>
            )}
          </Fragment>
        )}
        {values.deviceConnector.housingFinish === 'cerakote' && (
          <Form.Group>
            <Form.Label className="text-light">Cerakote Color</Form.Label>
            <ColorPicker
              colors={cerakoteColors}
              onChange={(color) =>
                setFieldValue('deviceConnector.cerakoteColor', color)
              }
              value={values.deviceConnector.cerakoteColor}
            />
          </Form.Group>
        )}
      </Form>
    </SidebarPane>
  );
}
