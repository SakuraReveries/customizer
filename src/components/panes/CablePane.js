import { useMemo } from 'react';
import { useFormikContext } from 'formik';
import { Form } from 'react-bootstrap';

import ColorPicker from 'components/forms/ColorPicker';
import FormField from 'components/forms/FormField';
import ObjectOptions from 'components/forms/ObjectOptions';
import SidebarPane from 'components/panes/SidebarPane';
import {
  cableTypes,
  mdpcxColors,
  techFlexColors,
  alignmentDotColors,
  mdpcxCarbonColors,
  mdpcxLiquidColors
} from 'utils';

export default function CablePane() {
  const { values, setFieldValue, setValues } = useFormikContext();

  const innerSleeveColors = useMemo(
    () =>
      values.cable.outerSleeveType !== null
        ? mdpcxColors
        : [...mdpcxColors, ...mdpcxCarbonColors],
    [values.cable.outerSleeveType]
  );
  const outerSleeveColors = useMemo(
    () => [...techFlexColors, ...mdpcxLiquidColors],
    []
  );

  return (
    <SidebarPane title="Cable">
      <Form>
        <FormField label="Type">
          <Form.Select
            onChange={(event) =>
              setValues((values) => ({
                ...values,
                cable: {
                  ...values.cable,
                  model: event.target.value
                },
                cableConnector: {
                  ...values.cableConnector,
                  hostSide: {
                    ...values.cableConnector.hostSide,
                    alignmentDotColor:
                      event.target.value !== 'Charger'
                        ? alignmentDotColors[0].id
                        : null
                  },
                  deviceSide: {
                    ...values.cableConnector.deviceSide,
                    alignmentDotColor:
                      event.target.value !== 'Charger'
                        ? alignmentDotColors[1].id
                        : null
                  }
                }
              }))
            }
            value={values.cable.model}
          >
            <ObjectOptions object={cableTypes} />
          </Form.Select>
        </FormField>
        <FormField label="Outer Sleeve?">
          <Form.Switch
            className="ms-3"
            onChange={(event) =>
              setValues((values) => ({
                ...values,
                cable: {
                  ...values.cable,
                  outerSleeveType: event.target.checked ? 'TechFlex' : null,
                  outerSleeveColor: event.target.checked
                    ? techFlexColors[0].id
                    : null
                }
              }))
            }
            checked={Boolean(values.cable.outerSleeveType)}
          />
        </FormField>
        <FormField
          label="Opal Sleeve?"
          show={values.cable.outerSleeveType === 'TechFlex'}
        >
          <Form.Switch
            className="text-light ms-3"
            onChange={(event) =>
              setFieldValue('cable.opalSleeve', event.target.checked)
            }
            checked={values.cable.opalSleeve}
          />
        </FormField>
        <FormField label="Base Sleeve Color">
          <ColorPicker
            colors={innerSleeveColors}
            onChange={(color) => setFieldValue('cable.innerSleeveColor', color)}
            value={values.cable.innerSleeveColor}
          />
        </FormField>
        <FormField
          label="Outer Sleeve Color"
          show={values.cable.outerSleeveType !== null}
        >
          <ColorPicker
            colors={outerSleeveColors}
            onChange={(color) => setFieldValue('cable.outerSleeveColor', color)}
            value={values.cable.outerSleeveColor}
          />
        </FormField>
      </Form>
    </SidebarPane>
  );
}
