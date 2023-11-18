import { Button } from "../ui/button"

const Toolbar = () => {
    return (
        <div className="grid-flow-row p-2">
            <Button className="text-gray-600 dark:text-gray-400" variant="ghost">
                <span className="sr-only">Bold</span>
                <svg
                    className=" w-4 h-4"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M14 12a4 4 0 0 0 0-8H6v8" />
                    <path d="M15 20a4 4 0 0 0 0-8H6v8Z" />
                </svg>
            </Button>
            <Button className="text-gray-600 dark:text-gray-400" variant="ghost">
                <span className="sr-only">Italic</span>
                <svg
                    className=" w-4 h-4"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <line x1="19" x2="10" y1="4" y2="4" />
                    <line x1="14" x2="5" y1="20" y2="20" />
                    <line x1="15" x2="9" y1="4" y2="20" />
                </svg>
            </Button>
            <Button className="text-gray-600 dark:text-gray-400" variant="ghost">
                <span className="sr-only">Underline</span>
                <svg
                    className=" w-4 h-4"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M6 4v6a6 6 0 0 0 12 0V4" />
                    <line x1="4" x2="20" y1="20" y2="20" />
                </svg>
            </Button>
            <Button className="text-gray-600 dark:text-gray-400" variant="ghost">
                <span className="sr-only">Left Align</span>
                <svg
                    className=" w-4 h-4"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <line x1="21" x2="3" y1="6" y2="6" />
                    <line x1="15" x2="3" y1="12" y2="12" />
                    <line x1="17" x2="3" y1="18" y2="18" />
                </svg>
            </Button>
            <Button className="text-gray-600 dark:text-gray-400" variant="ghost">
                <span className="sr-only">Center Align</span>
                <svg
                    className=" w-4 h-4"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <line x1="21" x2="3" y1="6" y2="6" />
                    <line x1="17" x2="7" y1="12" y2="12" />
                    <line x1="19" x2="5" y1="18" y2="18" />
                </svg>
            </Button>
            <Button className="text-gray-600 dark:text-gray-400" variant="ghost">
                <span className="sr-only">Right Align</span>
                <svg
                    className=" w-4 h-4"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <line x1="21" x2="3" y1="6" y2="6" />
                    <line x1="21" x2="9" y1="12" y2="12" />
                    <line x1="21" x2="7" y1="18" y2="18" />
                </svg>
            </Button>
        </div>
    )
}

export default Toolbar