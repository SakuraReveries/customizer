import PropTypes from 'prop-types';
import { Fragment, useContext } from 'react';
import {
  Button,
  Accordion,
  AccordionContext,
  useAccordionButton
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';

export default function SidebarPane({ children, title, onExpand }) {
  const { activeEventKey } = useContext(AccordionContext);
  const onClick = useAccordionButton(title, () => {
    if (onExpand) {
      onExpand();
    }
  });

  const isOpen = Array.isArray(activeEventKey)
    ? activeEventKey.includes(title)
    : activeEventKey === title;

  return (
    <Fragment>
      <Button
        className="h6 text-light w-100 d-flex align-items-center"
        onClick={onClick}
      >
        <span>{title}</span>
        <FontAwesomeIcon
          className="ms-auto"
          icon={isOpen ? faCaretUp : faCaretDown}
        />
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
  onExpand: PropTypes.func
};
