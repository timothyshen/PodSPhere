import Comment from './Comment';
import { PublicationType, profileId, usePublications } from '@lens-protocol/react-web';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';



// Define the type for an individual comment
type CommentType = {
    id: string; // Assuming each comment has a unique ID
    profile_id: string;
    content: string;
    platform: string;
};

const CommentListLens = () => {
    const [publicationType, setPublicationType] = useState<PublicationType[]>([PublicationType.Post]);
    const { profileId } = useAuth();
    const {
        data: publications,
        beforeCount,
        hasMore,
        prev,
    } =
        usePublications({
            where: {
                from: [profileId],
                publicationTypes: publicationType,
            },
        })


    console.log("publications", publications);


    return (
        <div>
            {publications?.map((publication) => {
                return (
                    <Comment
                        key={publication.id}
                        //@ts-ignore
                        content={publication.metadata.content}
                        profileId={publication.by.id}
                        platform="spotify"
                        episodeTitle="test"
                        commentHash={publication.momoka.proof}
                    />
                );
            })}
        </div>
    );
};

export default CommentListLens;
