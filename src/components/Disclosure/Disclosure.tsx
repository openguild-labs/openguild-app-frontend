import React, { useState } from "react";
import { BiSolidRightArrow } from "react-icons/bi";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { styled } from "@mui/material";

interface IDisclosureProps {
  title: React.ReactNode;
  description: string;
}

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(() => ({
  border: `1px solid rgb(107 114 128 / 0.2)`,
  zIndex: 0,
  borderRadius: "12px",
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled(MuiAccordionSummary)(({ theme }) => ({
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

function Disclosure({ title, description }: IDisclosureProps) {
  const [expanded, setExpanded] = useState(false);
  const haveDescription = description !== "";

  return (
    <Accordion
      expanded={expanded}
      onChange={() => {
        if (haveDescription) {
          setExpanded(!expanded);
        }
      }}
    >
      <AccordionSummary expandIcon={haveDescription && <BiSolidRightArrow size={12} className="text-base text-primary-color" />}>
        <div className="flex items-center justify-between w-full">
          <span className="text-start text-ellipsis line-clamp-1 w-full">{title}</span>
        </div>
      </AccordionSummary>
      {haveDescription && (
        <AccordionDetails>
          <div style={{ lineHeight: 2 }} className="p-1 text-sm text-wrap tiptap" dangerouslySetInnerHTML={{ __html: description }} />
        </AccordionDetails>
      )}
    </Accordion>
  );
}

export default Disclosure;
