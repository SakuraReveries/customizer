import { Fragment } from 'react';
import { useFormikContext } from 'formik';
import { Form } from 'react-bootstrap';

import ArrayOptions from 'components/ArrayOptions';
import ColorPicker from 'components/ColorPicker';
import DualColorPicker from 'components/DualColorPicker';
import HelpTooltip from 'components/HelpTooltip';
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
        <Form.Group className="mb-2">
          <Form.Label className="text-light">Heatshrink?</Form.Label>
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
        </Form.Group>
        {values.cableConnector.innerHeatshrink && (
          <Form.Group className="mb-2">
            <Form.Label className="text-light">
              Heatshrink Color{' '}
              <HelpTooltip text="Please select Host-side and Device-side colors." />
            </Form.Label>
            <DualColorPicker
              colors={heatshrinkColors.filter(({ id }) => id !== 'clear')}
              onChange={(type, color) =>
                setFieldValue(
                  `cableConnector.${type}Side.innerHeatshrinkColor`,
                  color
                )
              }
              hostValue={values.cableConnector.hostSide.innerHeatshrinkColor}
              deviceValue={
                values.cableConnector.deviceSide.innerHeatshrinkColor
              }
            />
          </Form.Group>
        )}
        <Form.Group className="mb-2">
          <Form.Label className="text-light">Heatshrink Accents?</Form.Label>
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
        </Form.Group>
        {values.cableConnector.collarHeatshrink && (
          <Form.Group className="mb-2">
            <Form.Label className="text-light">
              Heatshrink Accents Color{' '}
              <HelpTooltip text="Please select Host-side and Device-side colors." />
            </Form.Label>
            <DualColorPicker
              colors={heatshrinkColors.filter(({ id }) => id !== 'clear')}
              onChange={(type, color) =>
                setFieldValue(
                  `cableConnector.${type}Side.collarHeatshrinkColor`,
                  color
                )
              }
              hostValue={values.cableConnector.hostSide.collarHeatshrinkColor}
              deviceValue={
                values.cableConnector.deviceSide.collarHeatshrinkColor
              }
            />
          </Form.Group>
        )}
        <Form.Group className="mb-2">
          <Form.Label className="text-light">Connector Finish</Form.Label>
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
        </Form.Group>
        {values.cableConnector.finish === 'cerakote' && (
          <Fragment>
            <Form.Group className="mb-2">
              <Form.Label className="text-light">Cerakote Color</Form.Label>
              <ColorPicker
                colors={cerakoteColors}
                onChange={(color) =>
                  setFieldValue('cableConnector.cerakoteColor', color)
                }
                value={values.cableConnector.cerakoteColor}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="text-light">Collar Accent?</Form.Label>
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
            </Form.Group>
            {values.cableConnector.hostSide.collarAccent && (
              <Form.Group className="mb-2">
                <Form.Label className="text-light">
                  Collar Accent Color
                </Form.Label>
                <ColorPicker
                  colors={cerakoteColors}
                  onChange={(color) =>
                    setFieldValue(
                      'cableConnector.hostSide.collarAccentColor',
                      color
                    )
                  }
                  value={values.cableConnector.hostSide.collarAccentColor}
                />
              </Form.Group>
            )}
          </Fragment>
        )}
        <Form.Group className="mb-2">
          <Form.Label className="text-light">
            Alignment Dot Color{' '}
            <HelpTooltip text="Please select Host-side and Device-side colors." />
          </Form.Label>
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
        </Form.Group>
      </Form>
    </SidebarPane>
  );
}
