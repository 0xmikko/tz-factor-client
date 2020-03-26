import React from 'react';
import {Button} from 'react-bootstrap';

interface ToolbarButtonProps {
  title: string;
  onClick: () => void;
}

export const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  title,
  onClick,
}) => (
  <div className="d-none d-md-block">
    <Button
      className="btn-sm pd-x-15 btn-brand-01 btn-uppercase mg-l-10"
      onClick={onClick}>
      {title}
    </Button>
  </div>
);
