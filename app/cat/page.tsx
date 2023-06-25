"use client";

import { FC } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const queryClient = new QueryClient();

const CatInner: FC = () => {
    return <div>Boiler Plate</div>;
};

const Cat: FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <CatInner />
        </QueryClientProvider>
    );
};

export default Cat;
