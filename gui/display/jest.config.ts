// jest.config.ts

export default {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    transform: {
        "\\.[t]sx?$": ['ts-jest'],
    },
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
}
