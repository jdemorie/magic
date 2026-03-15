// Mock du module
import {DamageCardBean, PlayerBean} from "./api";
import {
    useGetActivePlayerQuery,
    useGetPlayerCardsQuery,
    useGetPlayerHealthAndManaQuery,
    usePlayCardMutation,
    useSetActivePlayerMutation
} from "./enhancedApi";

export function mockUsePlayCardMutation() {
    const mockMutation = jest.fn().mockImplementation(() =>
        Promise.resolve({
            data: {
                message: `Card played successfully!`
            },
        }),
    );
    (usePlayCardMutation as jest.Mock).mockReturnValue([mockMutation]);
}

export function expectPlayCardCalledWith(playerName: string, cardIndex: number) {
    const mockMutation = (usePlayCardMutation as jest.Mock).mock.results[0].value[0];
    expect(mockMutation).toHaveBeenCalledWith({
        playerName,
        cardIndex,
    });
}

export function mockUseGetPlayerHealthAndManaQuery(playerOne: PlayerBean, playerTwo: PlayerBean) {
    const mocked = useGetPlayerHealthAndManaQuery as jest.Mock;
    mocked.mockReturnValue({data: playerOne}).mockReturnValue({data: playerTwo});
}

export function mockUseGetPlayerCardsQuery(cards: DamageCardBean[]) {
    const mocked = useGetPlayerCardsQuery as jest.Mock;
    mocked.mockReturnValue({data: cards});
}

export function mockUseGetPlayerCardsQueryImplementation(implementation: (args: { playerName: string }) => { data: DamageCardBean[] }) {
    const mocked = useGetPlayerCardsQuery as jest.Mock;
    mocked.mockImplementation(implementation);
}

export function mockUseGetActivePlayerQuery(playerName: string) {
    const mocked = useGetActivePlayerQuery as jest.Mock;
    mocked.mockReturnValue({data: {name: playerName}});
}

export function mockUseSetActivePlayerMutation(playerName: string) {
    const mockMutation = jest.fn().mockImplementation(() =>
        Promise.resolve({
            data: {
                message: `Active player set to ${playerName} successfully!`
            },
        }),
    );
    (useSetActivePlayerMutation as jest.Mock).mockReturnValue([mockMutation]);
}

export function reset() {
    (useGetPlayerHealthAndManaQuery as jest.Mock).mockReset();
    (usePlayCardMutation as jest.Mock).mockReset();
    (useGetPlayerCardsQuery as jest.Mock).mockReset();
    (useGetActivePlayerQuery as jest.Mock).mockReset();
    (useSetActivePlayerMutation as jest.Mock).mockReset();
}