import { useFormikContext } from 'formik';
import { Form } from 'react-bootstrap';

import SidebarPane from 'components/SidebarPane';
import ColorPicker from 'components/ColorPicker';
import {
  connectorFinishes,
  housingTypes,
  heatshrinkColors,
  cerakoteColors,
  cncHousingFinishes
} from 'utils';
import useMessages from 'hooks/useMessages';
import ArrayOptions from './ArrayOptions';

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
        <Form.Group className="mb-2">
          <Form.Label className="text-light">Connector Finish</Form.Label>
          <Form.Select
            onChange={(event) =>
              setFieldValue('hostConnector.connectorFinish', event.target.value)
            }
            value={values.hostConnector.connectorFinish}
          >
            <ArrayOptions array={connectorFinishes} />
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label className="text-light">Housing Type</Form.Label>
          <Form.Switch
            className="text-light ms-3"
            label={housingTypes[values.hostConnector.housingType]}
            onChange={(event) =>
              setValues((values) => ({
                ...values,
                hostConnector: {
                  ...values.hostConnector,
                  housingType: event.target.checked ? 'CNC' : 'Heatshrink',
                  subHousingType: event.target.checked ? 'Facet' : null,
                  housingFinish: event.target.checked
                    ? cncHousingFinishes[0].id
                    : null
                }
              }))
            }
            checked={values.hostConnector.housingType === 'CNC'}
          />
        </Form.Group>
        {values.hostConnector.housingType === 'Heatshrink' ? (
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
        {values.hostConnector.housingFinish === 'Cerakote' && (
          <Form.Group>
            <Form.Label className="text-light">Cerakote Color</Form.Label>
            <ColorPicker
              colors={cerakoteColors}
              onChange={(color) =>
                setFieldValue('hostConnector.cerakoteColor', color)
              }
              value={values.hostConnector.cerakoteColor}
            />
          </Form.Group>
        )}
      </Form>
    </SidebarPane>
  );
}
