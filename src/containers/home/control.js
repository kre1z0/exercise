import React from 'react';
import cn from 'classnames';

import styles from './control.scss';

const Control = ({ items, isActive, onTouchTap }) => {
    return (
        <ul className={styles.control}>
            {items.map(item => {
                const selected = cn('item', { selected: item === isActive });
                return (
                    <li
                        onTouchTap={() => onTouchTap(item)}
                        className={selected}
                        key={item}
                    >
                        {item}
                    </li>
                );
            })}
        </ul>
    );
};

export default Control;
