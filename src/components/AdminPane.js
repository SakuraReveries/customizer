import { Form } from 'react-bootstrap';
import { SketchPicker } from 'react-color';

import SidebarPane from 'components/SidebarPane';
import useAdminMode from 'hooks/useAdminMode';

export default function AdminPane() {
  const {
    adminMode,
    bgColor,
    innerSleeveColor,
    outerSleeveColor,
    outerSleeveOpacity,
    setBgColor,
    setInnerSleeveColor,
    setOuterSleeveColor,
    setOuterSleeveOpacity
  } = useAdminMode();

  if (!adminMode) {
    return null;
  }

  return (
    <SidebarPane title="Debug">
      <Form>
        <Form.Group className="mb-2">
          <Form.Label className="text-light">Background Color</Form.Label>
          <SketchPicker
            className="ms-3"
            disableAlpha
            presetColors={[]}
            color={bgColor}
            onChange={(color) => setBgColor(color.hex)}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label className="text-light">Inner Sleeve Color</Form.Label>
          <SketchPicker
            className="ms-3"
            disableAlpha
            presetColors={[]}
            color={innerSleeveColor}
            onChange={(color) => setInnerSleeveColor(color.hex)}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label className="text-light ">Outer Sleeve Color</Form.Label>
          <SketchPicker
            className="ms-3"
            disableAlpha
            presetColors={[]}
            color={outerSleeveColor}
            onChange={(color) => setOuterSleeveColor(color.hex)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className="text-light">Outer Sleeve Opacity</Form.Label>
          <Form.Range
            min={0}
            max={1.0}
            step={0.01}
            value={outerSleeveOpacity}
            onChange={(event) =>
              setOuterSleeveOpacity(parseFloat(event.target.value))
            }
          />
        </Form.Group>
      </Form>
    </SidebarPane>
  );
}
