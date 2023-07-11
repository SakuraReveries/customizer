import PropTypes from 'prop-types';
import { Fragment, useContext } from 'react';
import {
  Row,
  Col,
  Button,
  Accordion,
  AccordionContext,
  useAccordionButton
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';

export default function SidebarPane({ children, title }) {
  const { activeEventKey } = useContext(AccordionContext);
  const onClick = useAccordionButton(title);

  return (
    <Fragment>
      <Row>
        <Col xs={12}>
          <Button
            className="h6 text-light w-100 d-flex align-items-center"
            onClick={onClick}
          >
            <span>{title}</span>
            <FontAwesomeIcon
              className="ms-auto"
              icon={activeEventKey === title ? faCaretUp : faCaretDown}
            />
          </Button>
        </Col>
      </Row>
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
  title: PropTypes.string.isRequired
};
