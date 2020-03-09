/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import React, {useState} from 'react';
import {Button} from 'react-bootstrap';
import {useDispatch} from "react-redux";
import actions from "../../store/actions";

export interface SelectItem {
  property: string;
  title: string;
}

interface Select {
  items: SelectItem[];
  allowMany: boolean;
}

export const SelectBlock: React.FC<Select> = ({items, allowMany}) => {
  const [state, setState] = useState(new Map());

  const dispatch = useDispatch();

  const onSelect = (property: string) => {
    if (allowMany) {
      // We simply invert map property if allowMany is set up
      setState(new Map(state.set(property, !state.get(property))));
    } else {
      // We create a new map with one selected item if allowMany is forbidden
      const p = new Map();
      p.set(property, true);
      setState(p);
    }
    // dispatch(actions.events.sendEvent(property))
  };

  return (
    <div >
      {items.map(b => (
        <Button
          onClick={() => onSelect(b.property)}
          className={ state.get(b.property) ? 'statebutton pressed' : 'statebutton'}>
          {b.title}

        </Button>
      ))}
    </div>
  );
};
