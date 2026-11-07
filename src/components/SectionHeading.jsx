import { motion, useReducedMotion } from "framer-motion";

const headingReveal = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function SectionHeading({
  index,
  number,
  eyebrow,
  title,
  description,
  detail,
  tone = "default",
  light = false,
  align = "start",
}) {
  const reduceMotion = useReducedMotion();
  const sectionIndex = index ?? number;
  const supportingCopy = description ?? detail;
  const isLight = light || tone === "light";

  return (
    <motion.header
      className={`section-label section-label--${align} ${isLight ? "light" : ""}`}
      variants={headingReveal}
      initial={reduceMotion ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.13 }}
    >
      <div className="section-label-top">
        {sectionIndex && <span>{sectionIndex}</span>}
        <i aria-hidden="true" />
        {eyebrow}
      </div>
      <div className="section-label-bottom">
        <h2>{title}</h2>
        {supportingCopy && <p>{supportingCopy}</p>}
      </div>
    </motion.header>
  );
}
