import React, { Component } from 'react';
import { connect } from 'react-redux';
import groupBy from 'lodash/groupBy';
import journals from '../../assets/data/journal.json';
import { natSort } from '../../helpers/sort';
import { DropdownItem, Badge, Alert } from 'reactstrap';
import DropdownButton from '../../components/ui/dropdown-button';

import './sorting.scss';

const numbersArray = [2, 5, 18, 22, 55];

const textArray = [
    'Lorullam! Aliquid aspen odio veritatis voluptatem.',
    'Lorem ipsuae dolorem explicabo, illo pariatur placeat rerum similique ullam! Aliquid aspernatur eligendi, est harum impedit in odio veritatis voluptatem.',
    'Lorem ipsum  gdfgfdgdfgdfgdfgdfgdfg us ad atque beatae dolorem explicabo, illo pariatur placeat rerum similique ullam! Aliquid aspernatur eligendi, est harum impedit in odio veritatis voluptatem.',
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus ad atque beatae dolorem explicabo, illo pariatur placeat rerum similique ullam! Aliquid aspernatur eligendi, est harum impedit in odio veritatis voluptatem.',
    'atur placeat rerum similitatis voluptatem.',
    'Lorem ipsum dolor sit amet, consecfsdf  fsdfsd   fsfdsf fsdae dolorem explicabo, illo pariatur placeat rerum similique ullam! Aliquid aspernatur eligendi, est harum impedit in odio veritatis voluptatem.',
];

class Sorting extends Component {
    componentDidMount() {
        const ggwp = numbersArray.find(item => item > 15);
        console.log('ggwp', ggwp);
    }
    renderArrayFromNumber = () => {
        return Array.from({ length: 8 }, (_, index) =>
            <span key={index}><Badge>{index + 1}</Badge>{' '}</span>,
        );
    };
    renderBlocks = () => {
        return Array.from({ length: 6 }, (_, index) =>
            <div className="block" key={index}>
                {textArray[index]}
            </div>,
        );
    };
    sumOfAllValuesInTheArray = (array = [0]) => {
        return array.reduce((a, b) => {
            console.log('--> a', a);
            return a + b;
        });
    };
    getMinAndMaxValue = (min, max) => {
        const getMin = min => (acc, val) =>
            val < acc && val > min ? val : acc;

        const getMax = min => (acc, val) =>
            val > acc && val < min ? val : acc;

        const valueMin = numbersArray.reduce(getMax(min), 0);
        const valueMax = numbersArray.reduce(getMin(max), 55);
        return <span style={{ color: '#000' }}>{valueMin}{' '}{valueMax}</span>;
    };
    render() {
        const tasks = groupBy(journals, 'year');
        const keysTasks = tasks && Object.keys(tasks).sort((a, b) => b - a);
        return (
            <div>
                <div>
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
                <div>
                    <Alert color="success">
                        Cуммирование всех значений в массиве
                        {': '}
                        {this.sumOfAllValuesInTheArray(numbersArray)}
                    </Alert>
                </div>
                <div>
                    <Alert color="success">
                        Поиск ближайших чисел в массиве
                        {': '}
                        <div style={{ marginRight: 20 }}>
                            {'массив: '}
                            [
                            {numbersArray.map((number, index) => {
                                const comma = numbersArray.length === index + 1
                                    ? ''
                                    : ',';
                                return (
                                    <span
                                        style={{ color: '#000' }}
                                        key={number}
                                    >
                                        {number}{comma}
                                    </span>
                                );
                            })}
                            ]
                        </div>
                        {'ответ: '}
                        {this.getMinAndMaxValue(10, 15)}
                    </Alert>
                    <div className="wrapper">
                        {this.renderBlocks()}
                    </div>
                </div>
            </div>
        );
    }
}

const mapProps = ({ twitch }) => ({});

const mapActions = {};

export default connect(mapProps, mapActions)(Sorting);
