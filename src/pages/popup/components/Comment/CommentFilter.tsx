import { Button } from "../ui/button";

const CommentFilter = () => {
    return (
        <div className="flex gap-4">
            <Button className="py-1 px-3 rounded-md bg-gray-100 dark:bg-gray-800" variant="outline">
                All
            </Button>
            <Button className="py-1 px-3 rounded-md bg-gray-100 dark:bg-gray-800" variant="outline">
                Newest
            </Button>
            <Button className="py-1 px-3 rounded-md bg-gray-100 dark:bg-gray-800" variant="outline">
                Hottest
            </Button>
        </div>
    )
}

export default CommentFilter