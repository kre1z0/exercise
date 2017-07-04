import React, { Component } from 'react';
import { connect } from 'react-redux';
import groupBy from 'lodash/groupBy';
import journals from '../../assets/data/journal.json';
import { natSort } from '../../helpers/sort';
import { DropdownItem, Badge, Alert } from 'reactstrap';
import DropdownButton from '../../components/ui/dropdown-button';

import styles from './sorting.scss';

class Sorting extends Component {
    renderArrayFromNumber = () => {
        return Array.from({ length: 8 }, (_, index) =>
            <span key={index}><Badge>{index + 1}</Badge>{' '}</span>,
        );
    };
    render() {
        const tasks = groupBy(journals, 'year');
        const keysTasks = tasks && Object.keys(tasks).sort((a, b) => b - a);
        return (
            <div>
                <div className={styles.sorting}>
                    {keysTasks.map(year => {
                        const tasksInDate = tasks[
                            year
                        ].sort(({ name: a }, { name: b }) => natSort(a, b));
                        return (
                            <DropdownButton year={year} key={year}>
                                {tasksInDate &&
                                    tasksInDate.map(({ name, id }) =>
                                        <DropdownItem key={id}>
                                            {name}
                                        </DropdownItem>,
                                    )}
                            </DropdownButton>
                        );
                    })}
                </div>
                <div>
                    <Alert color="success">
                        Генерирование последовательности чисел
                        {': '}
                        {this.renderArrayFromNumber()}
                    </Alert>
                </div>
            </div>
        );
    }
}

const mapProps = ({ twitch }) => ({});

const mapActions = {};

export default connect(mapProps, mapActions)(Sorting);
