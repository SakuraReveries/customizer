import PropTypes from 'prop-types';
import { Fragment, useContext, useCallback } from 'react';
import {
  Button,
  Accordion,
  AccordionContext,
  useAccordionButton
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretUp,
  faCaretDown,
  faMagnifyingGlassArrowRight
} from '@fortawesome/free-solid-svg-icons';

export default function SidebarPane({
  children,
  title,
  onExpand,
  showFocus = false,
  onFocus
}) {
  const { activeEventKey } = useContext(AccordionContext);
  const isOpen = Array.isArray(activeEventKey)
    ? activeEventKey.includes(title)
    : activeEventKey === title;
  const onAccordionClick = useAccordionButton(title, () => {
    if (onExpand && !isOpen) {
      onExpand();
    }
  });
  const onFocusClick = useCallback(
    (event) => {
      event.stopPropagation();
      if (onFocus) {
        onFocus(title);
      }
    },
    [onFocus, title]
  );

  return (
    <Fragment>
      <Button
        as="span"
        className="h6 text-light w-100 d-flex align-items-center justify-content-end"
        onClick={onAccordionClick}
      >
        <span className="me-auto">{title}</span>
        {showFocus && (
          <Button
            size="sm"
            className="mx-2"
            style={{ backgroundColor: '#c46d89' }}
            onClick={onFocusClick}
            title={`Focus ${title}`}
          >
            <FontAwesomeIcon icon={faMagnifyingGlassArrowRight} fixedWidth />
          </Button>
        )}
        <FontAwesomeIcon icon={isOpen ? faCaretUp : faCaretDown} />
      </Button>
      <Accordion.Collapse eventKey={title}>
        <Fragment>
          {children}
          <hr className="border-white" />
        </Fragment>
      </Accordion.Collapse>
    </Fragment>
  );
}

SidebarPane.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  onExpand: PropTypes.func,
  showFocus: PropTypes.bool,
  onFocus: PropTypes.func,
  icon: PropTypes.object
};
