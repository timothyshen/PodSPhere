import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition, faHome, faUser, faBell } from "@fortawesome/free-solid-svg-icons";

type IconContainerProps = {
    icon: IconDefinition;
    label: string;
};

const IconContainer = ({ icon, label }: IconContainerProps) => (
    <div className="w-10 h-10  rounded-full flex items-center justify-center hover:bg-zinc-300 cursor-pointer" aria-label={label}>
        <FontAwesomeIcon icon={icon} className="text-gray-500 text-2xl" />
    </div>
);

const Footer = ({ navigateToPage }: { navigateToPage: (page: React.SetStateAction<string>) => void }) => {

    return (
        <div className="min-h-[50px] w-full flex justify-around items-center bg-zinc-100">
            <div onClick={
                () => {
                    navigateToPage('UserHome');
                }

            }>
                <IconContainer icon={faHome} label="Home" />
            </div>
            <div onClick={
                () => {
                    navigateToPage('UserHome');
                }

            }>
                <IconContainer icon={faBell} label="Notifications" />
            </div>

            <div onClick={
                () => {
                    navigateToPage('Profile');
                }

            }>
                <IconContainer icon={faUser} label="Profile" />
            </div>

        </div>
    );
}


export default Footer;