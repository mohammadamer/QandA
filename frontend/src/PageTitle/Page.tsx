import React from 'react';
import { PageTitle } from './PageTitle';
interface Props {
    title?: string;
    children: React.ReactNode;
}

export const Page = ({ title, children }: Props) => (
    <div>
        {title && <PageTitle>{title}</PageTitle>}
        {children}
    </div>
);

// Impotant
// So, the children prop allows a consumer to render custom content within the
// component. This gives the component flexibility and makes it highly reusable.