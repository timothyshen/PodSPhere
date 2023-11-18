import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { IconDefinition, faHome } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faAngleDoubleUp } from "@fortawesome/free-solid-svg-icons";

type IconContainerProps = {
    icon: IconDefinition;
    label: string;
};

const IconContainer = ({ icon, label }: IconContainerProps) => (
    <div className="w-10 h-10  rounded-full flex items-center justify-center hover:bg-zinc-300 cursor-pointer" aria-label={label}>
        <FontAwesomeIcon icon={icon} className="text-gray-500 text-2xl" />
    </div>
);

const Footer = () => {

    return (
        <div className="min-h-[50px] w-full flex justify-around items-center bg-zinc-100">
            <div>
                <IconContainer icon={faHome} label="Home" />
            </div>
            <IconContainer icon={faAngleDoubleUp} label="Scroll Up" />
            <IconContainer icon={faBell} label="Notifications" />
        </div>
    );
}


export default Footer;