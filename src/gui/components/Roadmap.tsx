import { createStyles, Text, Timeline } from '@mantine/core';
import React from 'react';

const BREAKPOINT = '@media (max-width: 755px)';

export interface Task {
    title: string;
    description: string;
    state: 'planned' | 'working on' | 'done';
    lastUpdate?: string;
    comment?: string;
}
const useStyles = createStyles((theme) => ({
    text: {
        color: theme.colors.foreground[0],
    },
    container: {
        backgroundColor: theme.colors.background[9],
    },
}));

const Content = ({ task }: { task: Task }) => {
    return (
        <React.Fragment>
            <Text color="dimmed" size="sm">
                {task.description}
            </Text>
            <Text size="xs" mt={4}>
                {task.lastUpdate} Status : {task.state}
            </Text>
        </React.Fragment>
    );
};

interface RoadmapProps {
    tasks: Task[];
}

export function Roadmap({ tasks }: RoadmapProps) {
    const { classes } = useStyles();

    return (
        <Timeline className={classes.text} bulletSize={24} lineWidth={2}>
            {tasks.map((task, key) => {
                return (
                    <Timeline.Item
                        active={task.state == 'working on' || task.state == 'done'}
                        lineActive={task.state == 'done'}
                        lineVariant="dashed"
                        className={classes.text}
                        key={key}
                        title={task.title}
                    >
                        <Content task={task} />
                    </Timeline.Item>
                );
            })}
        </Timeline>
    );
}
