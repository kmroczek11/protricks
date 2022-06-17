import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React from 'react';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Link from '@mui/material/Link';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon';

interface IconCardsProps {
    data: ReadonlyArray<{
        Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
            muiName: string;
        };
        name: string;
        content: string;
        path?: string;
    }>;
}

const IconCards: React.FC<IconCardsProps> = (props) => {
    const { data } = props;

    return (
        <Grid
            container
            spacing={5}
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            {data.map(({ Icon, name, content,path }, i) => (
                <Grid item xs={12} md={12 / data.length} key={i}>
                    <Link
                        key={i}
                        href={path}
                        underline="none"
                    >
                        <Card sx={{
                            position: 'relative',
                            textAlign: 'center',
                            maxWidth: 345
                        }}>
                            <CardActionArea sx={{ p: 5 }}>
                                <Icon sx={{ width: 100, height: 100 }} />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {name}
                                    </Typography>
                                    <Typography variant="body2" color="primary.dark">
                                        {content}
                                    </Typography>
                                </CardContent>
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <Typography variant="body2" color="secondary.main">
                                        Dowiedz się więcej
                                    </Typography>
                                    <ArrowRightIcon />
                                </Grid>
                            </CardActionArea>
                        </Card>
                    </Link>
                </Grid>
            ))}
        </Grid>
    );
}

export default IconCards;