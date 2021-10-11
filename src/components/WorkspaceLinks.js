import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Links from './workspace/Links';
import NavTabs from './workspace/NavTabs';
import Loader from './workspace/Loader';

const Accordion = styled((props) => (

  <MuiAccordion disableGutters elevation={0}  {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function WorkspaceLinks(props) {
  const { linkWorkspace, categories, size, setVarLoading, varLoading } = props;
  const [uniqueCategories, setUniqueCategories] = React.useState();
  const [expanded, setExpanded] = React.useState(localStorage.getItem('expanded'));

  React.useEffect(() => {
    let arr = [];
    try {
      if (linkWorkspace.link) {
        linkWorkspace.link.forEach(link => {
          link.category.forEach(category => {
            arr.push(category);
          });
        });
        let uniqueSet = new Set(arr);
        let backToArray = [...uniqueSet];
        setUniqueCategories(backToArray);
      }
    } catch (error) {
      arr = [];
    }
  }, [linkWorkspace]);

  React.useEffect(() => {
    if (expanded) {
      localStorage.setItem('expanded', expanded);
    }
  }, [expanded]);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const returnCategory = (id) => {
    const findCategory = (category) => {
      return category.id === id;
    }
    return categories.filter(findCategory)[0].name;
  }

  const returnCategoryLinks = (id) => {
    const findCategory = (link) => {
      return link.category.includes(id);
    }
    return linkWorkspace.link.filter(findCategory);
  }

  return (
    <div>{varLoading ? <Loader /> :
      <>
        {linkWorkspace ? <NavTabs linkWorkspace={linkWorkspace} /> : <></>}
        {uniqueCategories ? <>
          {uniqueCategories.map((id) => {
            return <Accordion key={id} expanded={expanded.toString() === id.toString()} onChange={handleChange(id)}>
              <AccordionSummary aria-controls="panel1d-content" id={id + "-header"}>
                <Typography>{returnCategory(id)}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Links links={returnCategoryLinks(id)} size={size} />
              </AccordionDetails>
            </Accordion>
          })
          }
        </> : <></>
        }
      </>
    }
    </div>
  );
}
