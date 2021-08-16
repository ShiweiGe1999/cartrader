import { GetStaticProps } from "next";
import { openDB } from "../openDB";
import { FaqModel } from "../../api/Faq";
import Card from "../components/Card";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";

interface FaqProps {
  faq: FaqModel[];
}

const useStyles = makeStyles({
  root: {
    marginTop: "2rem"
  }
})

export default function FAQ({ faq }: FaqProps) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Container>
        {faq.map((e) => {
          return (
            <Accordion key={e.id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{e.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{e.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Container>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const db = await openDB();
  const faq = await db.all("SELECT * FROM FAQ ORDER BY createDate DESC");
  return {
    props: { faq },
  };
};
