'use client';
import { FC, PropsWithChildren } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClientConfig from './config';

const QueryProvider: FC<PropsWithChildren> = ({ children }) => (
    <QueryClientProvider client={queryClientConfig}>
        {children}
    </QueryClientProvider>
);

export default QueryProvider;
