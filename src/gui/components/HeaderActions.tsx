import { Burger, Button, Center, Container, createStyles, Group, Header, Menu } from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
import { Link, navigate } from 'gatsby';
import IconLabel from 'gui/svg/icon-label.svg';
import React from 'react';

const HEADER_HEIGHT = 60;
const RAINBOW_HEIGHT = 5;
const pages: { link: string; label: string; links?: { link: string; label: string }[] }[] = [
    { link: '/', label: 'Home' },
    { link: '/chat', label: 'Chat' },
    { link: '/roadmap', label: 'Roadmap' },
    { link: '/support', label: 'Unterstützen' },
    { link: '/about', label: 'Über uns' },
    { link: '/safety', label: 'Sicherheit' },
];

const useStyles = createStyles((theme) => {
    return {
        inner: {
            height: HEADER_HEIGHT - RAINBOW_HEIGHT,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },

        links: {
            [theme.fn.smallerThan('sm')]: {
                display: 'none',
            },
        },

        burger: {
            [theme.fn.largerThan('sm')]: {
                display: 'none',
            },
        },

        link: {
            display: 'block',
            lineHeight: 1,
            padding: '8px 12px',
            borderRadius: theme.radius.sm,
            textDecoration: 'none',
            color: theme.colors.foreground[0],
            fontSize: theme.fontSizes.sm,
            fontWeight: 500,

            '&:hover': {
                backgroundColor: theme.colors.background[6],
            },
        },

        image: {
            fill: theme.colors.foreground[0],
            height: 20,
        },

        rainbow: {
            position: 'absolute',
            maxHeight: RAINBOW_HEIGHT,
            minHeight: RAINBOW_HEIGHT,
            width: '100%',
            minWidth: 500,
        },

        button: {
            background: theme.colors.primaryAccent[2],
            color: theme.colors.background[9],
        },

        linkLabel: {
            marginRight: 5,
        },
    };
});

interface HeaderActionProps {
    action?: { link: string; label: string };
}

export default function HeaderAction({ action }: HeaderActionProps) {
    const { classes } = useStyles();
    const [opened, toggleOpened] = useBooleanToggle(false);

    const items = pages.map((link) => {
        const menuItems = link.links?.map((item) => <Menu.Item key={item.link}>{item.label}</Menu.Item>);

        if (menuItems) {
            return (
                <Menu
                    key={link.label}
                    trigger="hover"
                    delay={0}
                    transitionDuration={0}
                    placement="end"
                    gutter={1}
                    control={
                        <Link to={link.link} className={classes.link}>
                            <Center>
                                <span className={classes.linkLabel}>{link.label}</span>
                            </Center>
                        </Link>
                    }
                >
                    {menuItems}
                </Menu>
            );
        }

        return (
            <Link key={link.label} to={link.link} className={classes.link}>
                {link.label}
            </Link>
        );
    });

    return (
        <React.Fragment>
            <Header height={HEADER_HEIGHT} sx={{ borderBottom: 0 }}>
                <Container className={classes.inner} fluid>
                    <Group>
                        <Burger opened={opened} onClick={() => toggleOpened()} className={classes.burger} size="sm" />
                        <IconLabel className={classes.image} />
                    </Group>
                    <Group spacing={5} className={classes.links}>
                        {items}
                    </Group>
                    {typeof action !== 'undefined' ? (
                        <Button
                            className={classes.button}
                            radius="xl"
                            sx={{ height: 30 }}
                            onClick={() => {
                                navigate(action.link);
                            }}
                        >
                            {action.label}
                        </Button>
                    ) : null}
                </Container>
                {/* <Rainbow className={classes.rainbow} /> */}
            </Header>
        </React.Fragment>
    );
}
