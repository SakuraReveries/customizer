import { Fragment } from 'react';
import { useFormikContext } from 'formik';
import { Alert, Form } from 'react-bootstrap';
import omit from 'lodash.omit';

import SidebarPane from 'components/SidebarPane';
import ObjectOptions from 'components/ObjectOptions';
import ColorPicker from 'components/ColorPicker';
import {
  cerakoteColors,
  connectorFinishes,
  ledColors,
  housingTypes,
  heatshrinkColors,
  cncHousingTypes,
  cncHousingFinishes
} from 'utils';

export default function DeviceConnectorPane() {
  const { values, setFieldValue, setValues } = useFormikContext();

  return (
    <SidebarPane title="Device Connector">
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
            <ObjectOptions object={connectorFinishes} />
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label className="text-light">Housing Type</Form.Label>
          <Form.Switch
            className="text-light ms-3"
            label={housingTypes[values.deviceConnector.housingType]}
            onChange={({ target: { checked } }) =>
              setValues((values) => ({
                ...values,
                deviceConnector: {
                  ...values.deviceConnector,
                  housingType: checked ? 'CNC' : 'Heatshrink',
                  subHousingType: checked ? 'MonoRing' : null,
                  housingFinish: checked ? 'Silver' : null,
                  ledColor: checked ? ledColors[0].id : null
                }
              }))
            }
            checked={values.deviceConnector.housingType === 'CNC'}
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
                onChange={(event) =>
                  setFieldValue(
                    'deviceConnector.subHousingType',
                    event.target.value
                  )
                }
                value={values.deviceConnector.subHousingType}
              >
                <ObjectOptions object={cncHousingTypes.USB_C} />
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="text-light">Housing Finish</Form.Label>
              <Form.Select
                onChange={(event) =>
                  setValues((values) => ({
                    ...values,
                    deviceConnector: {
                      ...values.deviceConnector,
                      housingFinish: event.target.value,
                      cerakoteColor:
                        event.target.value === 'Cerakote' ? 'black' : null
                    }
                  }))
                }
                value={values.deviceConnector.housingFinish}
              >
                <ObjectOptions
                  object={
                    values.deviceConnector.subHousingType === 'MonoRing'
                      ? omit(cncHousingFinishes, 'Gold')
                      : cncHousingFinishes
                  }
                />
              </Form.Select>
            </Form.Group>
            {values.deviceConnector.subHousingType === 'GlowRing' && (
              <Fragment>
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
                <Alert variant="info">
                  Glow CNC offers the option to enhance the cable with an LED
                  light, which can be either a static color or a non-addressable
                  RGB (meaning the RGB auto cycles at a predetermined speed
                  between colors without control over speed or color). When the
                  cable is powered off, the unique diffuser ring appears white,
                  but when powered on, it takes on the color of the Static or
                  RGB LED inside. Cool White is the most popular option for
                  these connectors. For static colors that are not achievable
                  with LED colors alone, please contact me to inquire about
                  custom dyed diffuser rings, which come at an additional cost.
                  These customized rings, paired with a white static LED, can
                  create unique accent colors for the Glow CNC when powered on
                  or off. Please note that the lighting cannot be disabled; if
                  the cable is connected to a power source, the LED will
                  activate. These cables do not have any accompanying software.
                </Alert>
              </Fragment>
            )}
          </Fragment>
        )}
        {values.deviceConnector.housingFinish === 'Cerakote' && (
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
