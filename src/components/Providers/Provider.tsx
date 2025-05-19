'use client';
import {FC, PropsWithChildren} from "react";
import QueryProvider from "@/providers/QueryProvider";

const Providers:  FC<PropsWithChildren> = ({children}) => (
        <QueryProvider>
            {children}
        </QueryProvider>
);

export default Providers;