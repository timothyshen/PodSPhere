
type PodcastProps = {
    title: string;
    description: string;
    image: string;
}

const Podcast = ({ title, description, image }: PodcastProps) => {

    return (
        <div className="max-w-[400px] mx-auto p-4 bg-white boarder-b border-amber-200 flex items-center gap-4">
            <div className="flex-shrink-0">
                <img
                    src={image}
                    alt="podcast"
                    className="h-[100px] w-[100px] object-cover rounded-full"
                />
            </div>
            <div className="flex-grow">
                <div className="text-lg font-semibold text-gray-800">
                    {title}
                </div>
                <div className="text-sm text-gray-600 mt-2">
                    {description}
                </div>
            </div>
        </div>
    )

}


export default Podcast