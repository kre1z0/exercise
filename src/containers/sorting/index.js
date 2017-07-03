import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import groupBy from 'lodash/groupBy';
import journals from '../../assets/data/journal.json';
import { natSort } from '../../helpers/sort';
import { Button } from 'reactstrap';

const DateBlock = ({ date, children }) =>
    <div className="date-block">
        <div style={{ color: 'red' }} className="inspections-item-date">
            {date}
        </div>
        {children}
    </div>;

const TaskItem = ({ name, id }) => {
    return (
        <div className="date-block">
            <span className="inspections-item-date">
                {name}
            </span>
            <span> - {id}</span>
        </div>
    );
};

class Sorting extends Component {
    render() {
        const tasks = groupBy(journals, 'year');
        const keysTasks = tasks && Object.keys(tasks).sort((a, b) => b - a);
        console.log('keysTasks', keysTasks);
        return (
            <Grid fluid>
                <Row>
                    <Col xs={6} md={3}>
                        <Button color="danger">Danger!</Button>
                        {keysTasks.map(date => {
                            const tasksInDate = tasks[
                                date
                            ].sort(({ name: a }, { name: b }) => natSort(a, b));
                            console.log('tasksInDate', tasksInDate);
                            return (
                                <DateBlock date={date} key={date + '-key'}>
                                    {' '}
                                    {tasksInDate &&
                                        tasksInDate.map((task, i) =>
                                            <TaskItem
                                                key={i + '-task'}
                                                {...task}
                                            />,
                                        )}
                                </DateBlock>
                            );
                        })}
                    </Col>
                </Row>
            </Grid>
        );
    }
}

const mapProps = ({ twitch }) => ({});

const mapActions = {};

export default connect(mapProps, mapActions)(Sorting);
