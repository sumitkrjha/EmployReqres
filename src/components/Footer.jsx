import linkedin from "../assets/Linkedin.svg";

const Footer = () => {
  return (
    <>
      <h3 className="w-full flex items-center justify-center gap-2 font-bold font-mono text-xl">
        Developed by Sumit
        <a href="https://www.linkedin.com/in/-sumitkumarjha" target="_blank">
          <img
            src={linkedin}
            alt="Sumit's Linkedin"
            className="hover:scale-105"
          />
        </a>
      </h3>
    </>
  );
};

export default Footer;
