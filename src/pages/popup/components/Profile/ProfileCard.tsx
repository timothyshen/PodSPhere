import { Profile } from '@lens-protocol/react-web';
import { ReactNode } from 'react';

import { ProfilePicture } from './ProfilePicture';

type ProfileCardProps = {
    profile: Profile;
    children?: ReactNode;
};

export function ProfileCard({ profile, children }: ProfileCardProps) {
    const { metadata } = profile;

    return (
        <article className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden p-5 mb-5">
            <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-800">Profile Information</h2>
                <p className="text-gray-600">ID: {profile.id}</p>
                <p className="text-gray-600">Handle: {profile.handle?.fullHandle}</p>
            </div>

            {metadata && (
                <div className="space-y-3">
                    <ProfilePicture picture={metadata.picture} />
                    <p className="font-semibold">Name: <span className="font-normal">{metadata.displayName}</span></p>
                    <p className="font-semibold">Bio: <span className="font-normal">{metadata.bio}</span></p>
                    <ul className="list-disc list-inside">
                        {(metadata.attributes ?? []).map((attribute) => (
                            <li key={attribute.key} className="font-semibold">
                                {attribute.key}: <span className="font-normal">{attribute.value}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="mt-4">
                {children}
            </div>
        </article>
    );
}

