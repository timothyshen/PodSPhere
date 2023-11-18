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


    console.log(publications);


    return (
        <div>
            <h1>hi</h1>
        </div>
    );
};

export default CommentListLens;
