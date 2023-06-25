import { render, renderHook, screen, waitFor } from "@testing-library/react";
import Cat, { useCatQuery } from "../page";
import { createWrapper, renderWithClient } from "@/tests/utils";
import { rest } from "msw";
import { server } from "@/tests/server";

describe("Cat Page", () => {
    it("renders as expected on success", async () => {
        await waitFor(async () => {
            const result = renderWithClient(<Cat />);
            expect(result.findByAltText(/fold/i)).toBeTruthy();
        });
    });

    it("renders as expected on loading", async () => {
        const result = renderWithClient(<Cat />);
        expect(result.findByAltText(/coming/i)).toBeTruthy();
    });

    it("renders as expected on error", async () => {
        server.use(
            rest.get("*", (req, res, ctx) => {
                return res(ctx.status(403));
            })
        );

        await waitFor(() => {
            const result = renderWithClient(<Cat />);
            expect(result.findByText(/could not come/i)).toBeTruthy();
        });
    });
});

describe("useCatQuery", () => {
    it("returs data on success", async () => {
        const { result } = renderHook(() => useCatQuery("abys"), {
            wrapper: createWrapper(),
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });
    });

    it("returns an error on api failure", async () => {
        server.use(
            rest.get("https://api.thecatapi.com/*", (req, res, ctx) => {
                return res(ctx.status(500));
            })
        );

        const { result } = renderHook(() => useCatQuery("abys"), {
            wrapper: createWrapper(),
        });

        await waitFor(() => {
            expect(result.current.data.error).toBe("Something went wrong");
        });
    });
});
