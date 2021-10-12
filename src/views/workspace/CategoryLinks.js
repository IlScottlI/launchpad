import * as React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Paper from '@mui/material/Paper';
import { Link } from '@reach/router';
const Circle = (props) => {
    const { item } = props;
    const shapeStyles = { backgroundColor: item.background, width: 'calc(15vh)', height: 'calc(15vh)' };
    const shapeCircleStyles = { borderRadius: '50%' };
    return (<>
        <Link to={item.path} target={item.target} rel="noreferrer" style={{ textDecoration: 'none' }}>
            <Box
                component="span"
                sx={{ ...shapeStyles, ...shapeCircleStyles }}
                style={{
                    textAlign: "center",
                    display: 'inline-grid',
                    alignContent: 'center',
                    justifyContent: 'center',
                    justifyItems: 'center',
                }}
            >
                <Div>{item.name}</Div>
            </Box>
        </Link>
    </>
    );
}


const ImageListItemStyled = styled(({ className, ...props }) => (
    <ImageListItem {...props} classes={{ classes: className }} style={{ alignItems: 'center' }} />
))``;

const Div = styled('div')(({ theme }) => ({
    fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
    fontSize: 'calc(1.5vh)',
    lineHeight: '1.75',
    letterSpacing: '0.02857em',
    alignmentBaseline: 'auto',
    padding: theme.spacing(1),
    alignmentBaseline: 'auto',
    color: 'white',
    fontWeight: 'bold',
}));


const Root = styled('div')(({ theme }) => ({
    padding: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {

    },
    [theme.breakpoints.up('md')]: {

    },
    [theme.breakpoints.up('lg')]: {

    },
    [theme.breakpoints.up('xl')]: {

    },
}));


export default function Links(props) {
    const { uniqueCategories , size, linkWorkspace } = props;
    const [cols, setCols] = React.useState();
    const [links, setLinks] = React.useState([]);
    React.useEffect(() => {
        if (size.width > 1900) {
            if(links.length < 10){
                setCols(links.length);
            } else {
                setCols(9);
            }
        } else if (size.width > 1000) {
            setCols(7);
        } else if (size.width > 700) {
            setCols(5);
        } else if (size.width > 500) {
            setCols(3);
        } else {
            setCols(3);
        }
    }, [size, links]);

    React.useEffect(() => {
        if(links){
            setCols(links.length);
        }
    }, [links]);

    React.useEffect(() => {
        if (uniqueCategories) {
            let links = [];
            for (let i = 0; i < uniqueCategories.length; i++) {
                const element = uniqueCategories[i];
                let background = 'gray';
                switch (element) {
                    case 'Safety':
                        background = '#ffc107'
                        break;
                    case 'Quality':
                        background = '#dc3545';
                        break;
                    case 'Production':
                        background = '#59118e';
                        break;
                    case 'Site':
                        background = '#17a2b8';
                        break;
                    case 'Stewardship':
                        background = 'blue';
                        break;
                    default:
                        break;
                }
                links.push({
                    id : i,
                    name: element,
                    background: background,
                    path: '/Workspace/'+element,
                    target: '_parent',
                });
                
            }
            setLinks(links);
        }
    }, [uniqueCategories]);

    return (
        <Root>
            {linkWorkspace ? <Typography variant="h4" sx={{textAlign:'center', fontSize: 'calc(4vh)', padding:'40px',textTransform:'uppercase',fontWeight:'600'}}>
                {linkWorkspace.name}
            </Typography> : <></>}
            <ImageList
                variant="quilted"
                cols={cols}
                sx={{justifyItems: 'center', justifySelf: 'auto'}}
            >
                {links.map((item) => (
                    <ImageListItemStyled key={item.id} >
                        <Circle item={item} />
                    </ImageListItemStyled>
                ))}
            </ImageList>
        </Root>


    );
}
