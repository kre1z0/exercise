import React from 'react';
import { softGreen, coolGreyTwo, redOrange } from '../../assets/theme';

const getColor = percent => {
    if (percent > 0) return softGreen;
    else if (percent === 0) return coolGreyTwo;
    else return redOrange;
};

const FilterPanelItem = ({
    isActive,
    onTouchTap,
    selected,
    item: { percent, id, label, value },
}) => {
    return (
        <div
            style={{
                backgroundColor: isActive ? getColor(percent) : 'transparent',
            }}
            onTouchTap={() => onTouchTap(id)}
            className={selected}
        >
            <span className="label">{label}:</span>
            <span className="value">{value}</span>
            <span
                className="percent"
                style={{
                    color: isActive ? '#fff' : getColor(percent),
                }}
            >
                ({percent}%)
            </span>
        </div>
    );
};

export default FilterPanelItem;
