import { useFormikContext } from 'formik';
import { Form } from 'react-bootstrap';

import ArrayOptions from 'components/ArrayOptions';
import ColorPicker from 'components/ColorPicker';
import FormField from 'components/FormField';
import SidebarPane from 'components/SidebarPane';
import ObjectOptions from 'components/ObjectOptions';
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
        <FormField label="Connector Finish">
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
        </FormField>
        <FormField label="Housing Type">
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
        </FormField>
        <FormField
          label="Heatshrink Color"
          show={values.deviceConnector.housingType === 'heatshrink'}
        >
          <ColorPicker
            colors={heatshrinkColors}
            onChange={(color) =>
              setFieldValue('deviceConnector.heatshrinkColor', color)
            }
            value={values.deviceConnector.heatshrinkColor}
          />
        </FormField>
        <FormField
          label="CNC Housing Type"
          show={values.deviceConnector.housingType !== 'heatshrink'}
        >
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
        </FormField>
        <FormField
          label="Housing Finish"
          show={values.deviceConnector.housingType !== 'heatshrink'}
        >
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
                  ? cncHousingFinishes.filter((finish) => finish.id !== 'gold')
                  : cncHousingFinishes
              }
            />
          </Form.Select>
        </FormField>
        <FormField
          label="LED Color"
          show={
            values.deviceConnector.housingType !== 'heatshrink' &&
            values.deviceConnector.subHousingType === 'GlowRing'
          }
        >
          <ColorPicker
            colors={ledColors}
            onChange={(color) =>
              setFieldValue('deviceConnector.ledColor', color)
            }
            value={values.deviceConnector.ledColor}
          />
        </FormField>
        <FormField
          label="Cerakote Color"
          show={values.deviceConnector.housingFinish === 'cerakote'}
        >
          <ColorPicker
            colors={cerakoteColors}
            onChange={(color) =>
              setFieldValue('deviceConnector.cerakoteColor', color)
            }
            value={values.deviceConnector.cerakoteColor}
          />
        </FormField>
      </Form>
    </SidebarPane>
  );
}
