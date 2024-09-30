export enum MfaFlow {
  AccountRecovery = 'ACCOUNT_RECOVERY',
  BlockedAccountRecovery = 'BLOCKED_ACCOUNT',
  RegisterPage = 'REGISTER_PAGE',
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
  prevRoute: string;
};
