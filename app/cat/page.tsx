"use client";

import Image from "next/image";
import { FC, useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

enum CatBreed {
    scottishFold = "sfol",
    abyssinian = "abys",
    bengal = "beng",
}

const queryClient = new QueryClient();

const getCat = (breedId: string) =>
    fetch(
        `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${breedId}`,
        {
            headers: {
                "x-api-key": process.env.NEXT_PUBLIC_CAT_API_KEY!,
            },
        }
    ).then((res) => {
        if (res.status === 200) {
            return res.json();
        } else {
            return { error: "Something went wrong" };
        }
    });

export const useCatQuery = (currentBreed: string) =>
    useQuery({
        queryKey: ["cats", currentBreed],
        queryFn: () => getCat(currentBreed),
    });

const CatInner: FC = () => {
    const [currentBreed, setCurrentBreed] = useState<string>("abys");
    const { isLoading, data } = useCatQuery(currentBreed);

    const handleClick = (breedId: string) => {
        setCurrentBreed(breedId);
    };

    if (isLoading) {
        return <div className="mt-10 m-auto text-center">Cats are coming!</div>;
    }

    if (data.error) {
        return (
            <div className="mt-10 m-auto text-center">Cats could not come!</div>
        );
    }

    return (
        <div className="mt-10">
            <h1 className="m-auto text-2xl font-semibold text-center">
                Cat Filter
            </h1>

            <hr className="mt-10 mb-10" />

            <div className="flex">
                <nav className="ml-10">
                    <ul>
                        <li className="mb-1">
                            <button
                                onClick={() =>
                                    handleClick(CatBreed.scottishFold)
                                }
                            >
                                Scottish Fold
                            </button>
                        </li>
                        <li className="mb-1">
                            <button
                                onClick={() => handleClick(CatBreed.bengal)}
                            >
                                Bengal
                            </button>
                        </li>
                        <button
                            onClick={() => handleClick(CatBreed.abyssinian)}
                        >
                            Abyssinian
                        </button>
                    </ul>
                </nav>
                <div className="border ml-10">
                    {data?.map((cat: any) => {
                        if (!cat.breeds) {
                            return <div key={cat.id}>Randome Cats Came!</div>;
                        }
                        return (
                            <div key={cat.id}>
                                <Image
                                    src={cat.url}
                                    width={400}
                                    height={400}
                                    alt={cat.breeds[0].name}
                                    priority={false}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const Cat: FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <CatInner />
        </QueryClientProvider>
    );
};

export default Cat;
