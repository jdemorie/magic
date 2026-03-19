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
import {useWinnerName} from "../routes/game/useWinnerName";
import {useMessageNotification} from "../store/useMessageNotification";
import {NotificationType} from "../store/notificationSlice";

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

export function mockUsePlayCardMutationWithError(message: string, errorCode: string) {
    const error = {
        data: {
            message,
            errorCode,
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

export function mockUseWinnerName(winnerName?: string) {
    const mocked = useWinnerName as jest.Mock;
    mocked.mockReturnValue({winnerName, setWinnerName: jest.fn()});
}

export function mockUseMessageNotification(message?: string, type?: NotificationType) {
    const mocked = useMessageNotification as jest.Mock;
    mocked.mockReturnValue({notificationState: {message, type}, setNotificationState: jest.fn(), sendNotification: jest.fn(), contextHolder: null});
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
    (useWinnerName as jest.Mock).mockReset();
    (useMessageNotification as jest.Mock).mockReset();
}