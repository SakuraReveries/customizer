import PropTypes from 'prop-types';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function HelpTooltip({ text, placement = 'bottom' }) {
  return (
    <OverlayTrigger placement={placement} overlay={<Tooltip>{text}</Tooltip>}>
      <FontAwesomeIcon icon={faQuestionCircle} fixedWidth />
    </OverlayTrigger>
  );
}

HelpTooltip.propTypes = {
  text: PropTypes.string.isRequired,
  placement: PropTypes.string
};
