import { useFormikContext } from 'formik';
import { Form } from 'react-bootstrap';

import ArrayOptions from 'components/ArrayOptions';
import ColorPicker from 'components/ColorPicker';
import FormField from 'components/FormField';
import SidebarPane from 'components/SidebarPane';
import useMessages from 'hooks/useMessages';
import {
  connectorFinishes,
  housingTypes,
  heatshrinkColors,
  cerakoteColors,
  cncHousingFinishes,
  findById
} from 'utils';

export default function HostConnectorPane() {
  const { enableMessage } = useMessages();
  const { values, setFieldValue, setValues } = useFormikContext();

  return (
    <SidebarPane
      title="Host Connector"
      showFocus
      onFocus={() => setFieldValue('scene.focusOn', 'hostConnector')}
    >
      <Form>
        <FormField label="Connector Finish">
          <Form.Select
            onChange={(event) =>
              setFieldValue('hostConnector.connectorFinish', event.target.value)
            }
            value={values.hostConnector.connectorFinish}
          >
            <ArrayOptions array={connectorFinishes} />
          </Form.Select>
        </FormField>
        <FormField label="Housing Type">
          <Form.Switch
            className="text-light ms-3"
            label={
              findById(housingTypes, values.hostConnector.housingType).name
            }
            onChange={(event) =>
              setValues((values) => ({
                ...values,
                hostConnector: {
                  ...values.hostConnector,
                  housingType: event.target.checked ? 'cnc' : 'heatshrink',
                  subHousingType: event.target.checked ? 'Facet' : null,
                  housingFinish: event.target.checked
                    ? cncHousingFinishes[0].id
                    : null
                }
              }))
            }
            checked={values.hostConnector.housingType === 'cnc'}
          />
        </FormField>
        {values.hostConnector.housingType === 'heatshrink' ? (
          <Form.Group>
            <Form.Label className="text-light">Heatshrink Color</Form.Label>
            <ColorPicker
              colors={heatshrinkColors}
              onChange={(color) =>
                setFieldValue('hostConnector.heatshrinkColor', color)
              }
              value={values.hostConnector.heatshrinkColor}
            />
          </Form.Group>
        ) : (
          <Form.Group>
            <Form.Label className="text-light">Housing Finish</Form.Label>
            <Form.Select
              onChange={(event) => {
                setValues((values) => ({
                  ...values,
                  hostConnector: {
                    ...values.hostConnector,
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
              value={values.hostConnector.housingFinish}
            >
              <ArrayOptions array={cncHousingFinishes} />
            </Form.Select>
          </Form.Group>
        )}
        <FormField
          label="Cerakote Color"
          show={values.hostConnector.housingFinish === 'cerakote'}
        >
          <ColorPicker
            colors={cerakoteColors}
            onChange={(color) =>
              setFieldValue('hostConnector.cerakoteColor', color)
            }
            value={values.hostConnector.cerakoteColor}
          />
        </FormField>
      </Form>
    </SidebarPane>
  );
}
