// Mock du module
import {DamageCardBean, PlayerBean} from "./api";
import {
    useGetActivePlayerQuery,
    useGetPlayerCardsQuery,
    useGetPlayerHealthAndManaQuery,
    usePlayCardMutation,
    useSetActivePlayerMutation,
    useStartGameMutation
} from "./enhancedApi";

export function mockUseStartGameMutation() {
    const promiseWithUnwrap = {
        unwrap: () => {
            return Promise.resolve({
                data: {
                    message: "Game started successfully",
                },
            });
        },
    };
    const mockMutation = jest.fn().mockImplementation(() => promiseWithUnwrap);
    (useStartGameMutation as jest.Mock).mockReturnValue([mockMutation]);
}

export function expectStartGameCalledWith(playerOneName: string, playerTwoName: string) {
    const mockMutation = (useStartGameMutation as jest.Mock).mock.results[0].value[0];
    expect(mockMutation).toHaveBeenCalledWith({
        playerOneName,
        playerTwoName,
    });
}

export function mockUsePlayCardMutation() {
    const promiseWithUnwrap = {
        unwrap: () => {
            return Promise.resolve({
                data: {
                    message: "Card played successfully",
                },
            });
        },
    };
    const mockMutation = jest.fn().mockImplementation(() => promiseWithUnwrap);
    (usePlayCardMutation as jest.Mock).mockReturnValue([mockMutation]);
}

export function mockUsePlayCardMutationWithError() {
    const error = {
        data: {
            message: "An error occurred while playing the card",
        },
    }
    const promiseWithUnwrap = {
        unwrap: () => {
            return Promise.reject(error);
        },
    };
    const mockMutation = jest.fn().mockImplementation(() => promiseWithUnwrap);
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
    const promiseWithUnwrap = {
        unwrap: () => {
            return Promise.resolve({
                data: {
                    message: `Active player set to ${playerName} successfully!`,
                },
            });
        },
    };
    const mockMutation = jest.fn().mockImplementation(() => promiseWithUnwrap);
    (useSetActivePlayerMutation as jest.Mock).mockReturnValue([mockMutation]);
}

export function expectSetActivePlayerCalledWith(player: string) {
    const mockMutation = (useSetActivePlayerMutation as jest.Mock).mock.results[0].value[0];
    expect(mockMutation).toHaveBeenCalledWith({
        playerActiveBean: {
            name: player,
        },
    });
}

export function reset() {
    (useGetPlayerHealthAndManaQuery as jest.Mock).mockReset();
    (usePlayCardMutation as jest.Mock).mockReset();
    (useGetPlayerCardsQuery as jest.Mock).mockReset();
    (useGetActivePlayerQuery as jest.Mock).mockReset();
    (useSetActivePlayerMutation as jest.Mock).mockReset();
}