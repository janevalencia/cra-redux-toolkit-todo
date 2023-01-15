import React from "react";
import {
    AiFillGithub,
    AiFillLinkedin,
    AiFillInstagram,
    AiFillMediumCircle,
} from "react-icons/ai";

// Define default Footer props.
const defaultFooterProps = {
    year: new Date().getFullYear(),
    author: "Jane Valencia",
};

// Define social media props.
type FooterProps = {
    github?: string;
    linkedin?: string;
    instagram?: string;
    medium?: string;
} & typeof defaultFooterProps;

// Render component.
const Footer = (props: FooterProps) => {
    return (
        <footer className="w-full min-h-[20vh] my-2 p-6 flex flex-col justify-between md:items-center md:flex-row gap-2 bg-slate-900 text-gray-200">
            <div className="mb-4">
                <h2 className="font-bold text-sm lg:text-base">
                    React-Redux Todo App
                </h2>
                <p className="text-xs md:text-sm">
                    Copyright &copy; {props.year} {props.author}.
                </p>
                <p className="text-xs md:text-sm">All rights reserved.</p>
            </div>
            <div className="mb-4 flex flex-col justify-between md:text-right gap-4">
                <div className="flex gap-2">
                    <a href={props.github} target="_blank" rel="noreferrer">
                        <AiFillGithub size={30} />
                    </a>
                    <a href={props.linkedin} target="_blank" rel="noreferrer">
                        <AiFillLinkedin size={30} />
                    </a>
                    <a href={props.instagram} target="_blank" rel="noreferrer">
                        <AiFillInstagram size={30} />
                    </a>
                    <a href={props.medium} target="_blank" rel="noreferrer">
                        <AiFillMediumCircle size={30} />
                    </a>
                </div>
            </div>
        </footer>
    );
};
Footer.defaultProps = defaultFooterProps;

export default Footer;