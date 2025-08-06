import React from 'react';
import { PageTitle } from './PageTitle';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

interface Props {
    title?: string;
    children: React.ReactNode;
}

export const Page = ({ title, children }: Props) => (
    <div
        css={css`
        margin: 50px auto 20px auto;
        padding: 30px 20px;
        max-width: 600px;
        `}
    >
        {title && <PageTitle>{title}</PageTitle>}
        {children}
    </div>
);

// Impotant
// So, the children prop allows a consumer to render custom content within the
// component. This gives the component flexibility and makes it highly reusable.