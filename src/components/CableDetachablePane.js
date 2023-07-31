import { useFormikContext } from 'formik';
import { Form } from 'react-bootstrap';

import ArrayOptions from 'components/ArrayOptions';
import ColorPicker from 'components/ColorPicker';
import DualColorPicker from 'components/DualColorPicker';
import FormField from 'components/FormField';
import SidebarPane from 'components/SidebarPane';
import useMessages from 'hooks/useMessages';
import {
  heatshrinkColors,
  cerakoteColors,
  cncHousingFinishes,
  alignmentDotColors
} from 'utils';

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
      showFocus
      onFocus={() => setFieldValue('scene.focusOn', 'cableConnector')}
    >
      <Form>
        <FormField label="Heatshrink?">
          <Form.Switch
            className="ms-3"
            checked={values.cableConnector.innerHeatshrink}
            onChange={(event) =>
              setValues((values) => ({
                ...values,
                cableConnector: {
                  ...values.cableConnector,
                  innerHeatshrink: event.target.checked,
                  hostSide: {
                    ...values.cableConnector.hostSide,
                    innerHeatshrinkColor: event.target.checked
                      ? heatshrinkColors[0].id
                      : null
                  },
                  deviceSide: {
                    ...values.cableConnector.deviceSide,
                    innerHeatshrinkColor: event.target.checked
                      ? heatshrinkColors[0].id
                      : null
                  }
                }
              }))
            }
          />
        </FormField>
        <FormField
          label="Heatshrink Color"
          help="Please select Host-side and Device-side colors."
          show={values.cableConnector.innerHeatshrink}
        >
          <DualColorPicker
            colors={heatshrinkColors.filter(({ id }) => id !== 'clear')}
            onChange={(type, color) =>
              setFieldValue(
                `cableConnector.${type}Side.innerHeatshrinkColor`,
                color
              )
            }
            hostValue={values.cableConnector.hostSide.innerHeatshrinkColor}
            deviceValue={values.cableConnector.deviceSide.innerHeatshrinkColor}
          />
        </FormField>
        <FormField label="Heatshrink Accents?">
          <Form.Switch
            className="ms-3"
            checked={values.cableConnector.collarHeatshrink}
            onChange={(event) =>
              setValues((values) => ({
                ...values,
                cableConnector: {
                  ...values.cableConnector,
                  collarHeatshrink: event.target.checked,
                  hostSide: {
                    ...values.cableConnector.hostSide,
                    collarHeatshrinkColor: event.target.checked
                      ? heatshrinkColors[0].id
                      : null
                  },
                  deviceSide: {
                    ...values.cableConnector.deviceSide,
                    collarHeatshrinkColor: event.target.checked
                      ? heatshrinkColors[0].id
                      : null
                  }
                }
              }))
            }
          />
        </FormField>
        <FormField
          label="Heatshrink Accents Color"
          help="Please select Host-side and Device-side colors."
          show={values.cableConnector.collarHeatshrink}
        >
          <DualColorPicker
            colors={heatshrinkColors.filter(({ id }) => id !== 'clear')}
            onChange={(type, color) =>
              setFieldValue(
                `cableConnector.${type}Side.collarHeatshrinkColor`,
                color
              )
            }
            hostValue={values.cableConnector.hostSide.collarHeatshrinkColor}
            deviceValue={values.cableConnector.deviceSide.collarHeatshrinkColor}
          />
        </FormField>
        <FormField label="Connector Finish">
          <Form.Select
            onChange={(event) => {
              setValues((values) => ({
                ...values,
                cableConnector: {
                  ...values.cableConnector,
                  finish: event.target.value,
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
            value={values.cableConnector.finish}
          >
            <ArrayOptions array={cncHousingFinishes} />
          </Form.Select>
        </FormField>
        <FormField
          label="Cerakote Color"
          show={values.cableConnector.finish === 'cerakote'}
        >
          <ColorPicker
            colors={cerakoteColors}
            onChange={(color) =>
              setFieldValue('cableConnector.cerakoteColor', color)
            }
            value={values.cableConnector.cerakoteColor}
          />
        </FormField>
        <FormField
          labe="Collar Accent?"
          show={values.cableConnector.finish === 'cerakote'}
        >
          <Form.Switch
            className="ms-3"
            checked={values.cableConnector.hostSide.collarAccent}
            onChange={(event) =>
              setValues((values) => ({
                ...values,
                cableConnector: {
                  ...values.cableConnector,
                  hostSide: {
                    ...values.cableConnector.hostSide,
                    collarAccent: event.target.checked,
                    collarAccentColor: event.target.checked
                      ? cerakoteColors[0].id
                      : null
                  }
                }
              }))
            }
          />
        </FormField>
        <FormField
          label="Collar Accent Color"
          show={
            values.cableConnector.finish === 'cerakote' &&
            values.cableConnector.hostSide.collarAccent
          }
        >
          <ColorPicker
            colors={cerakoteColors}
            onChange={(color) =>
              setFieldValue('cableConnector.hostSide.collarAccentColor', color)
            }
            value={values.cableConnector.hostSide.collarAccentColor}
          />
        </FormField>
        <FormField
          label="Alignment Dot Color"
          help="Please select Host-side and Device-side colors."
        >
          <DualColorPicker
            colors={alignmentDotColors}
            onChange={(type, color) =>
              setFieldValue(
                `cableConnector.${type}Side.alignmentDotColor`,
                color
              )
            }
            hostValue={values.cableConnector.hostSide.alignmentDotColor}
            deviceValue={values.cableConnector.deviceSide.alignmentDotColor}
          />
        </FormField>
      </Form>
    </SidebarPane>
  );
}
