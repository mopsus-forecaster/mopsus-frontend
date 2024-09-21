export enum MfaFlow {
  AccountRecovery = 'ACCOUNT_RECOVERY',
  BlockedAccountRecovery = 'BLOCKED_ACCOUNT',
}

export type MFAContainerProps = {
  code: MfaFlow;
  email?: string;
};

export type LoginCommonHeaderProps = {
  title: string;
};

export type MFAAuthenticatorProps = {
  email: string;
};
