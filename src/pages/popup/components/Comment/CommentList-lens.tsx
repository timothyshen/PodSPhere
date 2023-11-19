import { PublicationType, profileId as useLensId, usePublications } from '@lens-protocol/react-web';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'; // Import necessary components

// Define the type for comment properties
type CommentProps = {
    username: string;
    commentText: string;
    platform: string;
    timestamp: string;
    userInterests: string[];
    isUserVerified: boolean;
};

const VerifiedBadge = () => {
    return (
        <span>Verified</span>
    );
};

const Comment: React.FC<CommentProps> = ({ username, commentText, platform, timestamp, userInterests, isUserVerified }) => {
    return (
        <div className="grid gap-6 mt-5">
            <div className="text-sm flex items-start gap-4">
                <Avatar className="w-10 h-10 border">
                    <AvatarImage alt={`@${username}`} />
                    <AvatarFallback>{username.substring(0, 2)}</AvatarFallback>
                    {isUserVerified && <VerifiedBadge />}
                </Avatar>
                <div className="grid gap-1.5">
                    <div className="flex items-center gap-2">
                        <div className="font-semibold">@{username}</div>
                        <div className="text-xs text-gray-500">{timestamp}</div>
                    </div>
                    <div>{commentText}</div>
                    <div className="text-xs text-gray-500">{userInterests.join(', ')}</div>
                    <div className="text-xs text-gray-500">{platform}</div>
                </div>
            </div>
        </div>
    );
};

const CommentListLens = () => {
    const [publicationType, setPublicationType] = useState<PublicationType[]>([PublicationType.Post]);


    const { profileId } = useAuth();
    const {
        data: publications,
    } =
        usePublications({
            where: {
                from: [profileId],
                publicationTypes: publicationType,
            },
        })

    console.log(publications);

    return (
        <div>
            {publications && publications.map((publication) => (
                <Comment
                    key={publication.id}
                    username={publication.by.id} // Or any other relevant field
                    //@ts-ignore
                    commentText={publication.metadata.content}
                    platform={publication.publishedOn.id} // Or any other relevant field
                    timestamp={new Date(publication.createdAt).toLocaleString()} // Format date as needed
                    userInterests={publication.by.interests || []}
                    isUserVerified={publication.by.onchainIdentity.proofOfHumanity || false}
                />
            ))}
        </div>
    );
};

export default CommentListLens;
