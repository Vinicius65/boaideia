import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { TGoal } from '../../types';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

const metas = [
    "Criar um míssel para o espaço",
    "Calcular tragetório de um asteróide",
    "Terminar a maldita documentação de um projeto",
]

export default function ProjectDetailsCP({ timeline }: { timeline: TGoal[] }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <ul style={{
                        width: "100%"
                    }}>
                        {timeline.map(meta => (
                            <li style={{
                                borderTop: "1px gray solid",
                                paddingTop: '1rem',
                                marginBottom: "1rem"
                            }}>
                                <h4>{meta.name}</h4>
                                <p style={{ margin: '1rem' }}>{meta.description}</p>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}>
                                    <small>Início da meta: <strong>{new Date(meta.startDate).toLocaleDateString('pt-BR')}</strong></small>
                                    <small>Fim da meta: <strong>{new Date(meta.expectedEndDate).toLocaleDateString("pt-BR")}</strong></small>
                                </div>
                            </li>
                        ))}
                    </ul>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}